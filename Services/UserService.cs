using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;

namespace Services
{
    internal class UserService
    {
        private static List<User> Users = new List<User>();
        
        // return the user with the given username
        public User Get(string username)
        {
            return Users.Find(x => x.Username == username);
        }

        public void Create(string username, string password, string nickname)
        {
            User user = new User() { Username = username, Password = password, Nickname = nickname };

        }
    }
}
