using Microsoft.AspNetCore.Mvc;
using Services;
using Domain;

namespace BorisKnowsAllApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private static UserService service = new UserService();
        public User Get()
        {
            service.Create("bob", "a1", "bob");
            return service.Get("bob");
        }
    }
}
