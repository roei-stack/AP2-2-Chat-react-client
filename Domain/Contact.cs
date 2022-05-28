using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Contact
    {
        [Key]
        [Required]
        public string Id { get; set; }

        // nickname
        public string Nickname { get; set; }

        // server url
        public string Server { get; set;}

        private ICollection<Message> Messages { get; set; } = new List<Message>();

        public void SendMessage(Message message)
        {
            Messages.Add(message);
        }

        public Message GetLastMessage()
        {
            if (Messages.Count == 0)
            {
                return null;
            }
            return Messages.Last();
        }

        public Message GetMessage(int messageId)
        {
            foreach (Message message in Messages)
            {
                if (message.MessageId == messageId)
                {
                    return message;
                }
            }
            return null;
        }

        public ICollection<Message> GetAllMessages()
        {
            return Messages;
        }
    }   
}
