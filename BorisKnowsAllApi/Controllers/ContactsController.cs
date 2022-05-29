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

        public ContactsController()
        {
            this.service = new UserService();
        }
        
        // GET: api/contacts/
        // returns a list of the connected user's contacts
        [HttpGet("contacts/{username}")]
        public IEnumerable<Contact> GetAll(string username)
        {
            if (string.IsNullOrEmpty(username))
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
        [HttpPost("contacts/{username}")]
        public void Create(string username, [FromBody] Contact contact)
        {
            string url = string.Format("{0}://{1}",
                       HttpContext.Request.Scheme, HttpContext.Request.Host);
            Response.StatusCode = 304;
            if (string.IsNullOrEmpty(username))
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

            
          /*  // calling invite on other server
            var content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("from", username),
                new KeyValuePair<string, string>("to", contact.id),
                new KeyValuePair<string, string>("server", url)
            });
            var httpClient = new HttpClient();
            var response = httpClient.PostAsync($"{contact.server}/api/invitations", content);
            Console.WriteLine(response.Status);*/

            Response.StatusCode = 201;
        }

        /******************************************************************/
        // GET api/contacts/:id
        [HttpGet("contacts/{username}/{id}")]
        public Contact GetContact(string username, string id)
        {
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
        
        
        [HttpPut("contacts/{username}/{id}")]
        public void EditContact(string username, string id, [FromBody] Contact contact)
        {
            // update the contact
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

        [HttpDelete("contacts/{username}/{id}")]
        public void DeleteContact(string username, string id)
        {
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
        [HttpGet("contacts/{username}/{id}/messages")]
        public IEnumerable<Message> GetContactMessages(string username, string id)
        {
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
        [HttpPost("contacts/{username}/{id}/messages")]
        public void PostContactMessage(string username, string id, [FromBody] string content)
        {
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
            contact.SendMessage(true, content);
            // todo call transfer

            /*
            // calling invite on other server
            string url = string.Format("{0}://{1}",
                       HttpContext.Request.Scheme, HttpContext.Request.Host);
            var payload = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("from", username),
                new KeyValuePair<string, string>("to", contact.id),
                new KeyValuePair<string, string>("content", content)
            });
            var httpClient = new HttpClient();
            var response = await httpClient.PostAsync($"{contact.server}/api/transfer", content);
            Console.WriteLine(response.StatusCode);*/
        }

        /******************************************************************/
        [HttpGet("contacts/{username}/{id}/messages/{id2}")]
        public Message GetMessage(string username, string id, int id2)
        {
            // return id2 message
            IEnumerable <Message> list = GetContactMessages(username, id);
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


        [HttpPut("contacts/{username}/{id}/messages/{id2}")]
        public void EditMessage(string username, string id, int id2, [FromBody] string content)
        {
            // update a message
            Message message = GetMessage(username, id, id2);
            if (message == null)
            {
                Response.StatusCode = 304;
                return;
            }
            message.content = content;
            Response.StatusCode = 204;
        }


        [HttpDelete("contacts/{username}/{id}/messages/{id2}")]
        public void DeleteMessage(string username, string id, int id2)
        {
            // delete the message with that id
            Message message = GetMessage(username, id, id2);
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
