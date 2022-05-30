using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Transfer
    {
        [Required]
        public string from { get; set; }

        [Required]
        public string to { get; set; }

        [Required]
        public string content { get; set; }
    }
}
