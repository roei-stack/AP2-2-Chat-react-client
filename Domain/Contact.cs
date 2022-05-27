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
        public string ContactUsername { get; set; }
        public ICollection<Message> Messages { get; set; } = new List<Message>();
    }
}
