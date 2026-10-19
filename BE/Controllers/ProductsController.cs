
using BE.Data;
using BE.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BE.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _context.Products
            .AsNoTracking()
            .Select(p => new
            {
                p.ProductCode,
                p.Name,
                p.UnitPrice,
                StockQuantity = p.Stock != null
                    ? p.Stock.Quantity
                    : 0
            })
            .OrderBy(p => p.ProductCode)
            .ToListAsync();

        return Ok(products);
    }

    [HttpGet("{code}")]
    public async Task<IActionResult> GetByCode(string code)
    {
        var product = await _context.Products
            .AsNoTracking()
            .Where(p => p.ProductCode == code)
            .Select(p => new
            {
                p.ProductCode,
                p.Name,
                p.UnitPrice,
                StockQuantity = p.Stock != null
                    ? p.Stock.Quantity
                    : 0
            })
            .FirstOrDefaultAsync();

        if (product == null)
            return NotFound(new { message = "Product not found" });

        return Ok(product);
    }
}
