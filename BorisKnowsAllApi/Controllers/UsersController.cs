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
        public HttpResponseMessage Login([FromBody] User user)
        {
            var u = service.Get(user.Username);
            if (u == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            }

            if (u.Password != user.Password)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            }
            // correct details
            HttpContext.Session.SetString("username", u.Username);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        
        [HttpPost, Route("Signin")]
        public HttpResponseMessage Signup([FromBody] User user)
        {
            if (service.Get(user.Username) != null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            }
            service.Create(user.Username, user.Password, user.Nickname);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

    }
}
