using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using BorisWeb.Models;
using BorisWeb.Services;

namespace BorisWeb.Controllers
{
    // id parameter == name
    public class RatesController : Controller
    {
        private readonly RateService service;

        public RatesController()
        {
            service = new RateService();
        }

        // GET: Rates
        public IActionResult Index()
        {
            ViewData["average"] = "There are no rates yet";
            if (0 != service.GetAll().Count)
            {
                ViewData["average"] = service.GetAverage();
            }
            return View(service.GetAll());
        }

        [HttpPost]
        public IActionResult Index(string text = null)
        {
            ViewData["average"] = "There are no rates yet";
            if (null == text)
            {
                if (0 != service.GetAll().Count)
                {
                    ViewData["average"] = service.GetAverage();
                }
                return View(service.GetAll());
            }
            IEnumerable<Rate> rates = from   rate in service.GetAll()
                                      where  rate.Name.Contains(text) ||
                                             rate.Feedback.Contains(text)
                                      select rate;
            if (rates.Count() == 0)
            {
                ViewData["average"] = "0 rates for your search, no average";
                ViewData["empty"] = "empty";
            }
            else
            {
                ViewData["average"] = service.GetAverage(rates);
            }
            return View(rates);
        }

        // GET: Rates/Details/bob
        public IActionResult Details(string id)
        {
            if (id == null || service.IsEmpty())
            {
                return NotFound();
            }
            var rate = service.Get(id);

            if (rate == null)
            {
                return NotFound();
            }

            return View(rate);
        }

        public IActionResult Search(string query)
        {
            var rates = service.GetAll().Where(rate => rate.Name.Contains(query));
            return Json(rates);
        }

        // GET: Rates/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Rates/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create([Bind("Name,Rating,Feedback,Date")] Rate rate)
        {
            if (ModelState.IsValid)
            {
                var u = service.Get(rate.Name);
                if (u != null)
                {
                    ViewData["Error"] = "This name already exists";
                }
                else
                {
                    service.Create(rate.Name, rate.Rating, rate.Feedback);
                    return RedirectToAction(nameof(Index));
                }
            }
            return View(rate);
        }

        // GET: Rates/Edit/5
        public IActionResult Edit(string id)
        {
            if (id == null || service.IsEmpty())
            {
                return NotFound();
            }

            var rate = service.Get(id);
            if (rate == null)
            {
                return NotFound();
            }
            return View(rate);
        }

        // POST: Rates/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(string id, [Bind("Name,Rating,Feedback,Date")] Rate rate)
        {
            if (id != rate.Name)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                // in video: 2:01:00
                service.Edit(id, rate.Rating, rate.Feedback);
                return RedirectToAction(nameof(Index));
            }
            return View(rate);
        }

        // GET: Rates/Delete/5
        public IActionResult Delete(string id)
        {
            if (id == null || service.IsEmpty())
            {
                return NotFound();
            }

            var rate = service.Get(id);
            if (rate == null)
            {
                return NotFound();
            }

            return View(rate);
        }

        // POST: Rates/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(string id)
        {
            if (service.IsEmpty())
            {
                return Problem("Entity set 'BorisWebContext.Rate'  is null.");
            }
            var rate = service.Get(id);

            if (rate != null)
            {
                service.Delete(id);
            }
            //await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

    }
}
