using Domain;
using Microsoft.AspNetCore.Mvc;
using Services;
using System.Net;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorisKnowsAllApi.Controllers
{
    [Route("api/contacts")]
    [ApiController]
    public class ContactsController : ControllerBase
    {

        private readonly UserService service;

        public ContactsController()
        {
            service = new UserService();
        }
        
        // GET: api/contacts/
        // returns a list of the connected user's contacts
        [HttpGet]
        public IEnumerable<Contact> GetAll()
        {
            var username = HttpContext.Session.GetString("username");
            if (username == null)
            { 
                return Enumerable.Empty<Contact>(); 
            }
            var user = service.Get(username);
            if (user == null)
            {
                return Enumerable.Empty<Contact>();
            }
            return user.GetContacts();
        }
        
        // POST: api/contacts/
        // adds a new contact
        [HttpPost]
        public HttpResponseMessage Create([FromBody] Contact contact)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.NotModified;
            var username = HttpContext.Session.GetString("username");
            if (username == null)
            {
                response.ReasonPhrase = "Please no hakk";
                return response;
            }
            var user = service.Get(username);
            if (user == null)
            {
                response.ReasonPhrase = "How the fuck did you even get here?";
                return response;
            }

            // you cant add yourself as a user
            if (username == contact.id)
            {
                response.ReasonPhrase = "No friends?";
                return response;
            }

            // check if contact is not a real user
            if (service.Get(contact.id) == null)
            {
                response.ReasonPhrase = "The contact does not exist";
                return response;
            }

            // check if contact already exists
            if (user.GetContact(contact.id) != null)
            {
                response.ReasonPhrase = "This contact is already registered";
                return response;
            }

            user.AddContact(contact.id, contact.name, contact.server);
            response.StatusCode = HttpStatusCode.Created;
            return response;
        }
        
        // GET api/contacts/:id
        [HttpGet("{id}")]
        public Contact GetContact(string id)
        {
            var username = HttpContext.Session.GetString("username");
            var user = service.Get(username);
            if (user == null)
            {
                return null;
            }
            return user.GetContact(id);
        }
        /*
        [HttpPut("{id}")]
        public void EditContact(string id)
        {

        }

        [HttpDelete("{id}")]
        public void DeleteContact(string id)
        {

        }


        // GET api/contacts/:id/messages
        [HttpGet(Name = "{id}/messages")]
        public IEnumerable<Message> GetContactMessages(string id)
        {
            //return messages of the 'id' contact
            return null;
        }

        // POST api/contacts/:id/messages
        [HttpPost(Name = "{id}/messages")]
        public void PostContactMessage(string id)
        {

        }

        [HttpGet("{id}/messages/{id2}")]
        public Message GetMessage(string id, int id2)
        {
            return null;
        }


        [HttpPut("{id}/messages/{id2}")]
        public void EditMessage(string id, int id2)
        {

        }

        [HttpDelete("{id}/messages/{id2}")]
        public void DeleteMessage(string id, int id2)
        {

        }
        */
    }
}
