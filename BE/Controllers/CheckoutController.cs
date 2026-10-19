
using BE.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BE.Controllers;

public record CheckoutItem(
    string ProductCode,
    int Quantity
);

public record CheckoutRequest(
    List<CheckoutItem> Items
);

[ApiController]
[Route("api/checkout")]
public class CheckoutController : ControllerBase
{
    private readonly AppDbContext _context;

    public CheckoutController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Checkout(
        [FromBody] CheckoutRequest request)
    {
        if (request.Items == null || request.Items.Count == 0)
        {
            return BadRequest(new
            {
                message = "ไม่มีสินค้าในตะกร้า"
            });
        }

        if (request.Items.Any(x =>
            string.IsNullOrWhiteSpace(x.ProductCode) ||
            x.Quantity <= 0))
        {
            return BadRequest(new
            {
                message = "ข้อมูลสินค้าไม่ถูกต้อง"
            });
        }

        var items = request.Items
            .GroupBy(x => x.ProductCode)
            .Select(g => new
            {
                ProductCode = g.Key,
                Quantity = g.Sum(x => (long)x.Quantity)
            })
            .OrderBy(x => x.ProductCode)
            .ToList();

        if (items.Any(x => x.Quantity > int.MaxValue))
        {
            return BadRequest(new
            {
                message = "จำนวนสินค้าไม่ถูกต้อง"
            });
        }

        await using var transaction =
            await _context.Database.BeginTransactionAsync();

        foreach (var item in items)
        {
            var quantity = (int)item.Quantity;
            var affectedRows = await _context.Stocks
                .Where(s =>
                    s.ProductCode == item.ProductCode &&
                    s.Quantity >= quantity)
                .ExecuteUpdateAsync(setters =>
                    setters.SetProperty(
                        s => s.Quantity,
                        s => s.Quantity - quantity
                    )
                );

            if (affectedRows == 0)
            {
                var available = await _context.Stocks
                    .AsNoTracking()
                    .Where(s => s.ProductCode == item.ProductCode)
                    .Select(s => (int?)s.Quantity)
                    .FirstOrDefaultAsync();
                if (available == null)
                {
                    return NotFound(new
                    {
                        code = "PRODUCT_NOT_FOUND",
                        productCode = item.ProductCode,
                        message = "ไม่พบข้อมูล Stock ของสินค้า"
                    });
                }

                return Conflict(new
                {
                    code = "INSUFFICIENT_STOCK",
                    productCode = item.ProductCode,
                    requestedQuantity = quantity,
                    availableQuantity = available.Value,
                    message = "สินค้าในสต็อกไม่เพียงพอ"
                });
            }
        }

        await transaction.CommitAsync();

        return Ok(new
        {
            message = "Checkout สำเร็จ ตัด Stock เรียบร้อย"
        });
    }
}
