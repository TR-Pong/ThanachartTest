namespace BE.Models;

public class Product
{
    public string ProductCode { get; set; } = "";
    public string Name { get; set; } = "";
    public decimal UnitPrice { get; set; }

    public Stock? Stock { get; set; }
}