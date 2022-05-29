using Domain;
using Microsoft.AspNetCore.Mvc;
using Services;
using System.Net;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorisKnowsAllApi.Controllers
{
    [Route("api")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly UserService service;
        private string url;

        public ContactsController()
        {
            this.service = new UserService();
            this.url = string.Format("{0}://{1}",
                       HttpContext.Request.Scheme, HttpContext.Request.Host);
        }
        
        // GET: api/contacts/
        // returns a list of the connected user's contacts
        [HttpGet("contacts")]
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
        [HttpPost("contacts")]
        public void Create([FromBody] Contact contact)
        {
            Response.StatusCode = 304;
            var username = HttpContext.Session.GetString("username");
            if (username == null)
            {
                // Please no hakk
                return;
            }
            var user = service.Get(username);
            if (user == null)
            {
                // How the fuck did you even get here?
                return;
            }

            // you cant add yourself as a user
            if (username == contact.id)
            {
                // No friends?
                return;
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
                // This contact is already registered
                return;
            }
            user.AddContact(contact.id, contact.name, contact.server);
            // todo call invite
            Response.StatusCode = 201;
        }

        /******************************************************************/
        // GET api/contacts/:id
        [HttpGet("contacts/{id}")]
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
        
        
        [HttpPut("contacts/{id}")]
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

        [HttpDelete("contacts/{id}")]
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

        /******************************************************************/
        // GET api/contacts/:id/messages
        [HttpGet("contacts/{id}/messages")]
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
        [HttpPost("contacts/{id}/messages")]
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

        /******************************************************************/
        [HttpGet("contacts/{id}/messages/{id2}")]
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


        [HttpPut("contacts/{id}/messages/{id2}")]
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

        [HttpDelete("contacts/{id}/messages/{id2}")]
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

        /******************************************************************/
        [HttpPost("intitations")]
        public void Invitation([FromBody] Invitation invitation)
        {
            // we received an invite from a user in another server
            // so we will add 'from' as a contact for 'to'
            var user = service.Get(invitation.to);
            if (user == null)
            {
                // 404 user not found
                Response.StatusCode = 404;
                return;
            }

            if (user.GetContact(invitation.from) != null)
            {
                // 304 not modified - as contact already exist
                Response.StatusCode = 304;
                return;
            }

            // 201 - created contact
            Response.StatusCode = 201;
            user.AddContact(invitation.from, invitation.from, invitation.server);
        }


        [HttpPost("transfer")]
        public void Transfer([FromBody] Transfer transfer)
        {
            // we received a transfer from a user in another server, with a message contect
            // so we will foward the message to the destination
            var user = service.Get(transfer.to);
            if (user == null)
            {
                // 404 user not found
                Response.StatusCode = 404;
                return;
            }
            Contact contact = user.GetContact(transfer.from);
            if (contact == null)
            {
                // 404 contact not found
                Response.StatusCode = 404;
                return;
            }
            // 201 - created message
            contact.SendMessage(false, transfer.contect);
            Response.StatusCode = 201;
        }
    }
}
