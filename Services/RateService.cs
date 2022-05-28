
using BorisWeb.Models;

namespace BorisWeb.Services 
{
    public class RateService
    {

        private static List<Rate> rates = new List<Rate>();
        public List<Rate> GetAll() {
            return rates;
        }

        public Rate Get(string Name) {
            return rates.Find(x => x.Name == Name);
        }

        public void Create(string Name, int rating, string feedback) {
            if (Get(Name) != null) {
                return;
            }
            rates.Add(new Rate() { Name = Name, Rating = rating, Feedback = feedback });
        }

        public bool IsEmpty()
        {
            return rates.Count == 0;
        }

        public void Edit(string Name, int rating, string feedback) {
            Rate rate = Get(Name);
            rate.Rating = rating;
            rate.Feedback = feedback;
        }

        public void Delete(string Name) {
            rates.Remove(Get(Name));
        }
    }
}
