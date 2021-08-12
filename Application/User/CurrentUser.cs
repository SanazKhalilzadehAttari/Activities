using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Application.User
{
    public class CurrentUser
    {
              public class Command : IRequest<User>{
        }
      
        public class Handler : IRequestHandler<Command,User>
        {
                private readonly IHttpContextAccessor _httpContextAccessor;
                private readonly UserManager<AppUser> _userManager;
                private readonly IJwtGenerator _jwtGenerator;
                private readonly IUserAccessor _userAccessor;
            public Handler(UserManager<AppUser> userManager,IJwtGenerator jwtGenerator,
            IUserAccessor userAccessor,IHttpContextAccessor httpContextAccessor)
            {
                _userManager = userManager;
                _jwtGenerator =jwtGenerator;
                _userAccessor = userAccessor;
                _httpContextAccessor = httpContextAccessor;

            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                string userName = _httpContextAccessor.HttpContext.User?
                                .Claims?.FirstOrDefault(x=>x.Type == ClaimTypes.NameIdentifier)?.Value;
               
                 var user = await _userManager.FindByNameAsync(userName);
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
