using Microsoft.AspNetCore.Mvc;
using TaskTracker.Domain;

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
    }
}
