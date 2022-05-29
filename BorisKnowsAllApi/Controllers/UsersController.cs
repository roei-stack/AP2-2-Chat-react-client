using Domain;
using Microsoft.AspNetCore.Mvc;
using Services;
using System.Net;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorisKnowsAllApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService service;

        public UsersController()
        {
            service = new UserService();
        }

        [HttpPost, Route("Login")]
        public void Login([FromBody] User user)
        {
            var u = service.Get(user.Username);
            if (u == null)
            {
                Response.StatusCode = 404;
                return;
            }

            if (u.Password != user.Password)
            {
                Response.StatusCode = 404;
                return;
            }
            // correct details
            //HttpContext.Session.SetString("username", u.Username);
            Response.StatusCode = 200;
        }

        
        [HttpPost, Route("Signup")]
        public void Signup([FromBody] User user)
        {
            if (service.Get(user.Username) != null)
            {
                Response.StatusCode = 404;
                return;
            }
            // maybe HttpContext.Session.Clear();
            service.Create(user.Username, user.Password, user.Nickname);
            Response.StatusCode = 200;
        }
    }
}
