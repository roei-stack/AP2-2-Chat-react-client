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
        private static List<User> users = new List<User>()
        {
            new User() { Username = "1", Password = "a1", Nickname = "bob"},
            new User() { Username = "2", Password = "a1", Nickname = "robi"},
            new User() { Username = "3", Password = "a1", Nickname = "shimi"},
            new User() { Username = "bob", Password = "a1", Nickname = "bob"}
        };
        /*
        public UserService()
        {
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
                        }
                        if (user2.GetContact(user1.Username) == null)
                        {
                            user2.AddContact(user1.Username, user1.Username, server);
                        }
                        user1.GetContact(user2.Username).SendMessage(true, $"hello {user2.Nickname}");
                        user2.GetContact(user1.Username).SendMessage(false, $"hello {user2.Nickname}");
                        user2.GetContact(user1.Username).SendMessage(true, $"thanks {user1.Nickname}");
                        user1.GetContact(user2.Username).SendMessage(false, $"thanks {user1.Nickname}");
                    }
                }
            }
        }*/

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
