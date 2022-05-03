using System.Text;
using API.Data;
using API.Extensions;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
    
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
    builder.Services.AddApplicationServices(builder.Configuration);
    // builder.Services.AddScoped<ITokenService, TokenService>();
    // builder.Services.AddDbContext<DataContext>(options =>
    //         {
    //             options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
    //         });
    builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
    {
        builder.WithOrigins("https://localhost:4200").AllowAnyMethod().AllowAnyHeader();
    }));
    builder.Services.AddIdentityServices(builder.Configuration);

    // builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => 
    // {
    //     options.TokenValidationParameters = new TokenValidationParameters
    //     {
    //         ValidateIssuerSigningKey = true,
    //         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])),
    //         ValidateIssuer = false,
    //         ValidateAudience = false
    //     };
    // });
    








    var app = builder.Build();
    
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
        
    }
       //app cors
        app.UseCors("corsapp");
        app.UseHttpsRedirection();
        app.UseAuthentication();
        app.UseAuthorization();
        //app.UseCors(prodCorsPolicy);
    
    
    
    app.MapControllers();
    
    app.Run();