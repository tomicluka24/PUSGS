using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, int, 
        IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>, 
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext()
        {
        }
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Product> Menu { get; set; }
        public DbSet<Order> Orders { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            if (!options.IsConfigured)
            {
                options.UseSqlite("Data source=deliveryapp.db");
            }
        }
    
        protected override void OnModelCreating(ModelBuilder builder)
        {
                base.OnModelCreating(builder);        

                builder.Entity<AppUser>().Ignore(c => c.AccessFailedCount)
                                           .Ignore(c=> c.LockoutEnabled)
                                           .Ignore(c=>c.PhoneNumber)
                                           .Ignore(c=>c.PhoneNumberConfirmed)
                                           .Ignore(c=>c.LockoutEnd)
                                           .Ignore(c=>c.ConcurrencyStamp)
                                           .Ignore(c=>c.EmailConfirmed)
                                           .Ignore(c=>c.SecurityStamp)
                                           .Ignore(c=>c.TwoFactorEnabled);
                builder.Entity<IdentityUser>().ToTable("Users");
                builder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

                builder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();
        }
    }
}