using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Domain;
using Services;

namespace BorisWeb.Controllers
{
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
              return View(service.GetAll());
        }

        // GET: Rates/Details/5
        public IActionResult Details(string username)
        {
            if (username == null || service.IsEmpty())
            {
                return NotFound();
            }
            var rate = service.Get(username);

            if (rate == null)
            {
                return NotFound();
            }

            return View(rate);
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
        public IActionResult Create([Bind("Username,Rating,Feedback,Date")] Rate rate)
        {
            if (ModelState.IsValid)
            {
                service.Create(rate.Username, rate.Rating, rate.Feedback);
                return RedirectToAction(nameof(Index));
            }
            return View(rate);
        }

        // GET: Rates/Edit/5
        public IActionResult Edit(string username)
        {
            if (username == null || service.IsEmpty())
            {
                return NotFound();
            }

            var rate = service.Get(username);
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
        public IActionResult Edit(string username, [Bind("Username,Rating,Feedback,Date")] Rate rate)
        {
            if (username != rate.Username)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                // in video: 2:01:00
                service.Edit(username, rate.Rating, rate.Feedback);
                return RedirectToAction(nameof(Index));
            }
            return View(rate);
        }

        // GET: Rates/Delete/5
        public IActionResult Delete(string username)
        {
            if (username == null || service.IsEmpty())
            {
                return NotFound();
            }

            var rate = service.Get(username);
            if (rate == null)
            {
                return NotFound();
            }

            return View(rate);
        }

        // POST: Rates/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(string username)
        {
            if (service.IsEmpty())
            {
                return Problem("Entity set 'BorisWebContext.Rate'  is null.");
            }
            var rate = service.Get(username);

            if (rate != null)
            {
                service.Delete(username);
            }
            //await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
    }
}
