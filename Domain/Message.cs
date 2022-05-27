using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Message
    {
        [Key]
        public int MessageId { get; set; }
        public string Text { get; set; }
        // true if called from the sender, false otherwise
        public bool IsSender { get; set; }
        public DateTime Time { get; set; } = DateTime.Now;
    }
}
