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
        };
        

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
