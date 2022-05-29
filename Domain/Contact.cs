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
        public string id { get; set; }

        // nickname
        public string name { get; set; }

        // server url
        public string server { get; set;}

        public string last { get; set; } = null;
        public string lastdate { get; set; } = null;

        private int idCounter = 0;

        private ICollection<Message> Messages { get; set; } = new List<Message>();

        public void SendMessage(bool sent, string content, DateTime created)
        {
            Message msg = new Message() {
                id = this.idCounter,
                sent = true,
                contect = "hi how r ya",
                created = DateTime.Now
            };
            Messages.Add(msg);
            last = msg.contect;
            lastdate = msg.contect.ToString();
            idCounter++;
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
                if (message.id == messageId)
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
