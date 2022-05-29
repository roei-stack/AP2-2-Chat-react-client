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
        public void AddContact(string id, string name, string server)
        {
            this.Contacts.Add(new Contact { id = id, name = name, server = server});
        }

        public Contact GetContact(string contactUsername)
        {
            return Contacts.Find(x => x.id == contactUsername);
        }

        public List<Contact> GetContacts()
        {
            return Contacts;
        }

        public void DeleteContact(string contactUsername)
        {
            Contacts.Remove(GetContact(contactUsername));
        }
    }
}