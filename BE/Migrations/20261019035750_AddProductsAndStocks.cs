using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BE.Migrations
{
    /// <inheritdoc />
    public partial class AddProductsAndStocks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Products",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Products");

            migrationBuilder.AddColumn<string>(
                name: "ProductCode",
                table: "Products",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "UnitPrice",
                table: "Products",
                type: "numeric(10,2)",
                precision: 10,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Products",
                table: "Products",
                column: "ProductCode");

            migrationBuilder.CreateTable(
                name: "Stocks",
                columns: table => new
                {
                    ProductCode = table.Column<string>(type: "text", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stocks", x => x.ProductCode);
                    table.ForeignKey(
                        name: "FK_Stocks_Products_ProductCode",
                        column: x => x.ProductCode,
                        principalTable: "Products",
                        principalColumn: "ProductCode",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ProductCode", "Name", "UnitPrice" },
                values: new object[,]
                {
                    { "P001", "Coca-Cola", 20m },
                    { "P002", "Pepsi", 20m },
                    { "P003", "น้ำเปล่า", 10m },
                    { "P004", "ชาเขียว", 25m },
                    { "P005", "กาแฟกระป๋อง", 18m },
                    { "P006", "นมสด", 22m },
                    { "P007", "ขนมปัง", 35m },
                    { "P008", "บะหมี่กึ่งสำเร็จรูป", 8m },
                    { "P009", "มันฝรั่งทอด", 30m },
                    { "P010", "ช็อกโกแลต", 45m },
                });

            migrationBuilder.InsertData(
                table: "Stocks",
                columns: new[] { "ProductCode", "Quantity" },
                values: new object[,]
                {
                    { "P001", 100 },
                    { "P002", 80 },
                    { "P003", 150 },
                    { "P004", 2 },
                    { "P005", 45 },
                    { "P006", 30 },
                    { "P007", 25 },
                    { "P008", 200 },
                    { "P009", 40 },
                    { "P010", 0 },
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Stocks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Products",
                table: "Products");

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "ProductCode",
                keyColumnType: "text",
                keyValue: "P001");

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "ProductCode",
                keyColumnType: "text",
                keyValue: "P002");

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "ProductCode",
                keyColumnType: "text",
                keyValue: "P003");

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "ProductCode",
                keyColumnType: "text",
                keyValue: "P004");

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "ProductCode",
                keyColumnType: "text",
                keyValue: "P005");

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "ProductCode",
                keyColumnType: "text",
                keyValue: "P006");

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "ProductCode",
                keyColumnType: "text",
                keyValue: "P007");

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "ProductCode",
                keyColumnType: "text",
                keyValue: "P008");

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "ProductCode",
                keyColumnType: "text",
                keyValue: "P009");

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "ProductCode",
                keyColumnType: "text",
                keyValue: "P010");

            migrationBuilder.DropColumn(
                name: "ProductCode",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "UnitPrice",
                table: "Products");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Products",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Products",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Products",
                table: "Products",
                column: "Id");
        }
    }
}
