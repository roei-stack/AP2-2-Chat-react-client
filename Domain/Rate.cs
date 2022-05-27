using System.ComponentModel.DataAnnotations;

namespace BorisWeb.Models
{
    public class Rate
    {
        [Key]
        [Required]
        public string Username { get; set; }

        [Required]
        [Range(1, 5)]
        public int Rating { get; set; } = 1;

        [MaxLength(100)]
        public string Feedback { get; set; }

        public DateTime date { get; set;}
    }
}
