using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;

namespace Services
{
    public class UserService
    {
        private static List<User> users;

        public UserService()
        {
            if (users != null)
            {
                return;
            }
            users = new List<User>()
            {
                new User() { Username = "robi", Password = "a1", Nickname = "robi"},
                new User() { Username = "shimi", Password = "a1", Nickname = "shimi"},
                new User() { Username = "bob", Password = "a1", Nickname = "bob"}
            };
            foreach (User user1 in users)
            {
                foreach (User user2 in users)
                {
                    if (user1.Username != user2.Username)
                    {
                        string server = "https://localhost:7007";
                        if (user1.GetContact(user2.Username) == null)
                        {
                            user1.AddContact(user2.Username, user2.Username, server);
                            user1.GetContact(user2.Username)
                                .SendMessage(true, $"hello {user2.Nickname}");
                        }
                    }
                }
            }
            foreach (User user in users)
            {
                foreach (Contact contact in user.GetContacts())
                {
                    Get(contact.id).GetContact(user.Username)
                        .SendMessage(false, $"hello {contact.id}");
                    Get(contact.id).GetContact(user.Username)
                        .SendMessage(true, $"thanks {user.Nickname}");
                    user.GetContact(contact.id)
                        .SendMessage(false, $"thanks {user.Nickname}");
                }
            }
            users.Add(new User() { Username = "bobi", Password = "a1", Nickname = "bobi" });
        }

        public User Get(string username)
        {
            return users.Find(x => x.Username == username);
        }

        public void Create(string username, string password, string nickname)
        {
            if (Get(username) != null)
            {
                return;
            }

            User user = new User()
            {
                Username = username,
                Password = password,
                Nickname = nickname
            };
            users.Add(user);
        }

        public bool IsEmpty()
        {
            return users.Count == 0;
        }
    }
}
