using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Linq;

namespace Application.User
{
    public class CurrentUser
    {
              public class Command : IRequest<User>{
        }
      
        public class Handler : IRequestHandler<Command,User>
        {
              private readonly UserManager<AppUser> _userManager;
                private readonly IJwtGenerator _jwtGenerator;
                 private readonly IUserAccessor _userAccessor;
            public Handler(UserManager<AppUser> userManager,IJwtGenerator jwtGenerator,
            IUserAccessor userAccessor)
            {
                _userManager = userManager;
                _jwtGenerator =jwtGenerator;
                 _userAccessor = userAccessor;

            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
               
                 var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUserName());
                         return  new User{
                             DisplayName = user.DisplayName,
                             Token=_jwtGenerator.CreateToken(user),
                             UserName = user.UserName,
                             Image = null
                         };
            } 
                   
         }

    }
       
}
