using System.Threading;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;
using System;
using System.Threading.Tasks;
using System.Net;
using Application.Core;
using Application.Interfaces;
using System.Linq;

namespace Application.User
{
    public class Login
    {
       public class Command : IRequest<User>{
         public string Email { get; set; }
         public string Password { get; set; }
        }
       public class QueryValidator:AbstractValidator<Command>{
           public QueryValidator(){
               RuleFor(x => x.Email).NotEmpty();
               RuleFor(x =>x.Password).NotEmpty();
           }
       }
        public class Handler : IRequestHandler<Command,User>
        {
              private readonly UserManager<AppUser> _userManager;
               private readonly SignInManager<AppUser> _signInManager;
                private readonly IJwtGenerator _jwtGenerator;
            public Handler(UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,IJwtGenerator jwtGenerator)
            {
                _userManager = userManager;
                _signInManager = signInManager;
                _jwtGenerator =jwtGenerator;

            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
               
              var user =  _userManager.Users.FirstOrDefault(x=> x.Email == request.Email);
                var result = await _signInManager.CheckPasswordSignInAsync(user,request.Password,false);
                  if(user == null){
                   throw new AppExceptions(401,"User Excption",null);
                    }
                    if(result.Succeeded){
                          return new User{
                             DisplayName = user.DisplayName,
                             Token=_jwtGenerator.CreateToken(user),
                             UserName = user.UserName,
                             Image = null
                         };
                       
                    }
                      throw new AppExceptions(401,"User Excption",null);
                     
                       
              
              
                   
            }
        }
      
    } 
 }
