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
              return View(service.GetAll());
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
                service.Create(rate.Name, rate.Rating, rate.Feedback);
                return RedirectToAction(nameof(Index));
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
