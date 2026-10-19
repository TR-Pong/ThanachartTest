
namespace BE.Models;

public class Stock
{
    public string ProductCode { get; set; } = "";
    public int Quantity { get; set; }

    public Product Product { get; set; } = null!;
}
