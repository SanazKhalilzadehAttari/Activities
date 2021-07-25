using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.Validator;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest<User>{
        public string DisplayName { get; set; }
        public string UserName { get; set; }
         public string Email { get; set; }
         public string Password { get; set; }
        }
       public class QueryValidator:AbstractValidator<Command>{
           public QueryValidator(){
               RuleFor(x => x.DisplayName).NotEmpty();
               RuleFor(x => x.UserName).NotEmpty();
               RuleFor(x => x.Email).NotEmpty().EmailAddress();
               RuleFor(x =>x.Password).Password();
           }
       }
        public class Handler : IRequestHandler<Command,User>
        {
              private readonly UserManager<AppUser> _userManager;
               private readonly DataContext _dataContext;
                private readonly IJwtGenerator _jwtGenerator;
            public Handler(UserManager<AppUser> userManager,
            DataContext dataContext,IJwtGenerator jwtGenerator)
            {
                _userManager = userManager;
                _dataContext = dataContext;
                _jwtGenerator =jwtGenerator;

            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
             if(await  _dataContext.Users.AnyAsync(x=> x.Email == request.Email)){
                      new AppExceptions(404,"Bad request,Email Already Exist", null);
             }
               if(await  _dataContext.Users.AnyAsync(x=> x.UserName == request.UserName)){
                      new AppExceptions(404,"Bad request,UserName Already Exist", null);
             }
               var user = new AppUser {
                   DisplayName=request.DisplayName,
                   Email= request.Email,
                   UserName = request.UserName,
                
               };
               
         var result = await _userManager.CreateAsync(user,request.Password);
        
         if(!result.Succeeded){
               new AppExceptions(500,"problem create user ") ;    
               
             
         }
          return new User{
                             DisplayName = user.DisplayName,
                             Token=_jwtGenerator.CreateToken(user),
                             UserName = user.UserName,
                             Image = null
                         };
                   
            }
        }
      
    }
}