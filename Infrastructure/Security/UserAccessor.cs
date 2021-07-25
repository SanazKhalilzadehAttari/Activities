using System.Linq;
using System.Security.Claims;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting.Internal;
 

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor

    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserAccessor(IHttpContextAccessor httpContextAccessor )
        {
            httpContextAccessor = _httpContextAccessor;
        }

        public string GetCurrentUserName()
        {

        string userName = _httpContextAccessor.HttpContext.User?
           .Claims?.FirstOrDefault(x=>x.Type == ClaimTypes.NameIdentifier)?.Value;
    
         
          return userName;
        }
    }
}