
using BE.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(
        DbContextOptions<AppDbContext> options
    ) : base(options) { }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Stock> Stocks => Set<Stock>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(p => p.ProductCode);

            entity.Property(p => p.UnitPrice)
                .HasPrecision(10, 2);

            entity.HasOne(p => p.Stock)
                .WithOne(s => s.Product)
                .HasForeignKey<Stock>(s => s.ProductCode);

            entity.HasData(
                new Product { ProductCode = "P001", Name = "Coca-Cola", UnitPrice = 20 },
                new Product { ProductCode = "P002", Name = "Pepsi", UnitPrice = 20 },
                new Product { ProductCode = "P003", Name = "น้ำเปล่า", UnitPrice = 10 },
                new Product { ProductCode = "P004", Name = "ชาเขียว", UnitPrice = 25 },
                new Product { ProductCode = "P005", Name = "กาแฟกระป๋อง", UnitPrice = 18 },
                new Product { ProductCode = "P006", Name = "นมสด", UnitPrice = 22 },
                new Product { ProductCode = "P007", Name = "ขนมปัง", UnitPrice = 35 },
                new Product { ProductCode = "P008", Name = "บะหมี่กึ่งสำเร็จรูป", UnitPrice = 8 },
                new Product { ProductCode = "P009", Name = "มันฝรั่งทอด", UnitPrice = 30 },
                new Product { ProductCode = "P010", Name = "ช็อกโกแลต", UnitPrice = 45 }
            );
        });

        modelBuilder.Entity<Stock>(entity =>
        {
            entity.HasKey(s => s.ProductCode);

            entity.HasData(
                new Stock { ProductCode = "P001", Quantity = 100 },
                new Stock { ProductCode = "P002", Quantity = 80 },
                new Stock { ProductCode = "P003", Quantity = 150 },
                new Stock { ProductCode = "P004", Quantity = 2 },
                new Stock { ProductCode = "P005", Quantity = 45 },
                new Stock { ProductCode = "P006", Quantity = 30 },
                new Stock { ProductCode = "P007", Quantity = 25 },
                new Stock { ProductCode = "P008", Quantity = 200 },
                new Stock { ProductCode = "P009", Quantity = 40 },
                new Stock { ProductCode = "P010", Quantity = 0 }
            );
        });
    }
}
