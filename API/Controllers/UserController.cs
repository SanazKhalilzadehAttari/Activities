using System.Threading.Tasks;
using Application.User;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  
    public class UserController:BaseApiController
    {
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Command query){
            return await Mediator.Send(query);
        }
          [AllowAnonymous]
          [HttpPost("register")]
        public async Task<ActionResult<User>> Register(Register.Command query){
            return await Mediator.Send(query);
        }
           
         [HttpGet]
        public async Task<ActionResult<User>> CurrentUser(){
            return await Mediator.Send(new CurrentUser.Command());
        }
    }
}