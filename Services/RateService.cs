
using BorisWeb.Models;

namespace BorisWeb.Services 
{
    public class RateService 
    {

        private static List<Rate> rates = new List<Rate>();
        public List<Rate> GetAll() {
            return rates;
        }

        public Rate Get(string username) {
            return rates.Find(x => x.Username == username);
        }

        public void Create(string username, int rating, string feedback) {
            if (Get(username) != null) {
                return;
            }
            rates.Add(new Rate() { Username = username, Rating = rating, Feedback = feedback });
        }

        public bool IsEmpty()
        {
            return rates.Count == 0;
        }

        public void Edit(string username, int rating, string feedback) {
            Rate rate = Get(username);
            rate.Rating = rating;
            rate.Feedback = feedback;
        }

        public void Delete(string username) {
            rates.Remove(Get(username));
        }
    }
}
