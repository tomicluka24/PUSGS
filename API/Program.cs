using System.Text;
using API.Data;
using API.Data.Migrations;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

 


var builder = WebApplication.CreateBuilder(args);


    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
    builder.Services.AddApplicationServices(builder.Configuration);
    builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("CloudinarySettings"));
    builder.Services.AddScoped<ITokenService, TokenService>();
    builder.Services.AddScoped<IUserRepository, UserRepository>();
    builder.Services.AddScoped<IPhotoService, PhotoService>();
    builder.Services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
    builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
    {
        builder.WithOrigins("https://localhost:4200").AllowAnyMethod().AllowAnyHeader();
    }));
    builder.Services.AddIdentityServices(builder.Configuration);
    var emailConfig = builder.Configuration.GetSection("EmailConfiguration").Get<EmailConfiguration>();
    builder.Services.AddSingleton(emailConfig);
    builder.Services.AddScoped<IEmailSender, EmailSender>();


var app = builder.Build();
    using var scope = app.Services.CreateScope();
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<DataContext>();
        var userManager = services.GetRequiredService<UserManager<AppUser>>();
        var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
        await context.Database.MigrateAsync();
        await Seed.SeedUsers(userManager, roleManager);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occured during migration");
    }

    if (app.Environment.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();  // initially was without this line, do i need it?
        app.UseSwagger();
        app.UseSwaggerUI();
        
    }

        app.UseMiddleware<ExceptionMiddleware>();   // both development and production mode
        app.UseCors("corsapp");
        app.UseHttpsRedirection();
        app.UseAuthentication();
        app.UseAuthorization();
    
    app.MapControllers();
    await app.RunAsync();