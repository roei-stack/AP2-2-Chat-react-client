using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class User
    {
        [Key]
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        public string Nickname { get; set; }
        private List<Contact> Contacts { get; set; } = new List<Contact>();

        public void AddContact(string id, string nickname, string server)
        {
            this.Contacts.Add(new Contact { Id = id, Nickname = nickname, Server = server});
        }

        public Contact GetContact(string contactUsername)
        {
            return Contacts.Find(x => x.Id == contactUsername);
        }

        public IEnumerable<Contact> GetContacts()
        {
            return Contacts;
        }

        public void DeleteContact(string contactUsername)
        {
            Contacts.Remove(GetContact(contactUsername));
        }

        public List<string[]> GetContactsJson()
        {
            var list = new List<string[]>();
            foreach (var contact in Contacts) 
            {
                list.Add(new string[] {
                    $"\"id\":\"{contact.Id}\",",
                    $"\"name\":\"{contact.Nickname}\",",
                    $"\"server\":\"{contact.Server}\",",
                    $"\"last\":\"{contact.GetLastMessage().Text}\",",
                    $"\"lastdate\":\"{contact.GetLastMessage().Time}\","
                });
            }
            return list;
        }
    }
}