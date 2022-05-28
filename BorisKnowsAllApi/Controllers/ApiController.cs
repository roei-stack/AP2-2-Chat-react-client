using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace BorisKnowsAllApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApiController : ControllerBase
    {
        private static UserService service = new UserService();
        private static string username = "bob";

        [HttpGet]
        public IEnumerable<Contact> contacts()
        {
            return service.Get(username).GetContacts();
        }

        [HttpPost]
        public void contacts([Bind("ContactUsername")] Contact contact)
        {
            service.Get(username).AddContact(contact.ContactUsername);
        }
    }
}
