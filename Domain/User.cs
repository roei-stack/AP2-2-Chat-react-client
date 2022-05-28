﻿using System;
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
        private ICollection<Contact> Contacts { get; set; } = new List<Contact>();

        public void AddContact(string contactUsername)
        {
            this.Contacts.Add(new Contact { ContactUsername = contactUsername });
        }

        public Contact GetContact(string contactUsername)
        {
            foreach (Contact contact in Contacts)
            {
                if (contact.ContactUsername == contactUsername)
                {
                    return contact;
                }
            }
            return null;
        }

        public ICollection<Contact> GetContacts()
        {
            return Contacts;
        }

        public void DeleteContact(string contactUsername)
        {
            Contacts.Remove(GetContact(contactUsername));
        }
    }
}