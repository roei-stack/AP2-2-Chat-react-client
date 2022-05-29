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
                Response.StatusCode = 404;
                return null; 
            }
            var user = service.Get(username);
            if (user == null)
            {
                Response.StatusCode = 404;
                return null;
            }
            Response.StatusCode = 200;
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

            /*
             * contact does not have to be from this server
            // check if contact is not a real user
            var c = service.Get(contact.id);
            if (c == null)
            {
                response.ReasonPhrase = "The contact does not exist";
                return response;
            }*/
            // check if contact already exists
            if (user.GetContact(contact.id) != null)
            {
                response.ReasonPhrase = "This contact is already registered";
                return response;
            }

            user.AddContact(contact.id, contact.name, contact.server);
            // todo call invite
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
                Response.StatusCode = 404;
                return null;
            }
            Contact contact = user.GetContact(id);
            if (contact == null)
            {
                Response.StatusCode = 404;
                return null;
            }
            Response.StatusCode = 200;
            return user.GetContact(id);
        }
        
        
        [HttpPut("{id}")]
        public void EditContact(string id, [FromBody] Contact contact)
        {
            // update the contact
            var username = HttpContext.Session.GetString("username");
            var user = service.Get(username);
            if (user == null)
            {
                Response.StatusCode = 304;
                return;
            }

            Contact c = user.GetContact(id);
            if (c == null)
            {
                Response.StatusCode = 304;
                return;
            }
            // modify contact
            c.name = contact.name;
            c.server = contact.server;
            Response.StatusCode = 204;
        }

        [HttpDelete("{id}")]
        public void DeleteContact(string id)
        {
            var username = HttpContext.Session.GetString("username");
            var user = service.Get(username);
            if (user == null)
            {
                Response.StatusCode = 304;
                return;
            }
            if (user.GetContact(id) == null)
            {
                Response.StatusCode = 304;
                return;
            }
            user.DeleteContact(id);
            Response.StatusCode = 204;
        }

        
        // GET api/contacts/:id/messages
        [HttpGet("{id}/messages")]
        public IEnumerable<Message> GetContactMessages(string id)
        {
            var username = HttpContext.Session.GetString("username");
            var user = service.Get(username);
            if (user == null)
            {
                Response.StatusCode = 404;
                return null;
            }

            var contact = user.GetContact(id);
            if (contact == null)
            {
                Response.StatusCode = 404;
                return null;
            }
            Response.StatusCode = 200;
            //return messages of the 'id' contact
            return contact.GetAllMessages();
        }

        
        // POST api/contacts/:id/messages
        [HttpPost("{id}/messages")]
        public void PostContactMessage(string id, [FromBody] string contect)
        {
            var username = HttpContext.Session.GetString("username");
            var user = service.Get(username);
            if (user == null)
            {
                Response.StatusCode = 404;
                return;
            }

            var contact = user.GetContact(id);
            if (contact == null)
            {
                Response.StatusCode = 404;
                return;
            }
            Response.StatusCode = 201;
            contact.SendMessage(true, contect);
            // todo call transfer
        }


        [HttpGet("{id}/messages/{id2}")]
        public Message GetMessage(string id, int id2)
        {
            // return id2 message
            IEnumerable <Message> list = GetContactMessages(id);
            if (list == null)
            {
                Response.StatusCode = 404;
                return null;
            }
            
            Message message = list.ElementAtOrDefault(id2);
            if (message == null)
            {
                Response.StatusCode = 404;
                return null;
            }
            Response.StatusCode = 200;
            return message;
        }


        [HttpPut("{id}/messages/{id2}")]
        public void EditMessage(string id, int id2, [FromBody] string content)
        {
            // update a message
            Message message = GetMessage(id, id2);
            if (message == null)
            {
                Response.StatusCode = 304;
                return;
            }
            message.contect = content;
            Response.StatusCode = 204;
        }

        [HttpDelete("{id}/messages/{id2}")]
        public void DeleteMessage(string id, int id2)
        {
            // delete the message with that id
            Message message = GetMessage(id, id2);
            if (message == null)
            {
                Response.StatusCode = 304;
                return;
            }
            service.Get(HttpContext.Session.GetString("username")).
                GetContact(id).RemoveMessage(id2);
            Response.StatusCode = 204;
        }
    }
}
