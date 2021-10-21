using Microsoft.AspNetCore.Mvc;
using TaskTracker.Domain;
using TaskTracker.Domain.Models;

namespace TaskTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PadController : Controller
    {
        private readonly IPad _pad;

        public PadController(IPad pad)
        {
            _pad = pad;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var trackerDays = _pad.GetTrackerDays();
            return Ok(trackerDays);
        }

        [HttpGet]
        [Route("GetById")]
        public IActionResult GetById(int taskId)
        {
            return Ok();
        }

        [HttpPost]
        public IActionResult Post(TrackerTask trackerTask)
        {
            _pad.AddTrackerTask(trackerTask);
            return CreatedAtAction(nameof(GetById), 1);
        }
    }
}
