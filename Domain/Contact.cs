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
        public string id { get; set; }

        // nickname
        public string name { get; set; }

        // server url
        public string server { get; set;}

        public string last { get; set; } = null;
        public DateTime lastdate { get; set; }

        private int idCounter = 0;

        private ICollection<Message> Messages { get; set; } = new List<Message>();

        public void SendMessage(bool sent, string content)
        {
            Message msg = new Message() {
                id = this.idCounter,
                sent = sent,
                content = content,
                created = DateTime.Now
            };
            Messages.Add(msg);
            last = msg.content;
            lastdate = msg.created;
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

        public void RemoveMessage(int messageId)
        {
            Messages.Remove(GetMessage(messageId));
        }
    }
}
