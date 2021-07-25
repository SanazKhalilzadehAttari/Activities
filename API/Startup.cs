using System.Collections.Generic;
using System.Text;
using API.Extensions;
using API.Middleware;
using Application.Activities;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation.AspNetCore;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;

        public Startup(IConfiguration config)
        {
           _config = config;

        }



        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers(opt => {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            }).AddFluentValidation(cfg =>{
                cfg.RegisterValidatorsFromAssemblyContaining<Create>();
            });
            services.AddApplicationServices(_config);
            var builder = services.AddIdentityCore<AppUser>();
            var identityBuilder = new IdentityBuilder(builder.UserType,builder.Services);
           identityBuilder.AddEntityFrameworkStores<DataContext>();
           identityBuilder.AddSignInManager<SignInManager<AppUser>>();
           var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));
           services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
           .AddJwtBearer(Opt=>
           {
               Opt.TokenValidationParameters = new TokenValidationParameters
               {
                   ValidateIssuerSigningKey = true,
                   IssuerSigningKey = key,
                   ValidateAudience = false,
                   ValidateIssuer = false
               };
           });
           services.AddScoped<IJwtGenerator,JwtGenerator>();
           services.AddScoped<IUserAccessor,UserAccessor>();

            } 

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();

            if (env.IsDevelopment())
            {
           
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }

            //  app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors("CorsPolicy");
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }

  
}
