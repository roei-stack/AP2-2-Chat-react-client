﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;

namespace Services
{
    public class UserService
    {
        private static List<User> Users = new List<User>();
        
        public User Get(string username)
        {
            return Users.Find(x => x.Username == username);
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
            Users.Add(user);
        }

        public bool IsEmpty()
        {
            return Users.Count == 0;
        }
    }
}
