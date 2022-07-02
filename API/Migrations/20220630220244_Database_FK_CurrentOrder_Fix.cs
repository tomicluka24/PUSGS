using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class Database_FK_CurrentOrder_Fix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddForeignKey(
            name: "FK_CurrentOrderId",
            table: "AspNetUsers",
            column: "CurrentOrderId",
            principalTable: "Orders",
            principalColumn: "Id",
            onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
