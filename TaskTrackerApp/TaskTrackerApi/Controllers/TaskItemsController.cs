using Microsoft.AspNetCore.Mvc;
using System;
using TaskTracker.Domain;
using TaskTracker.Domain.Models;

namespace TaskTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskItemsController : Controller
    {
        private readonly ITaskItems _taskItems;

        public TaskItemsController(ITaskItems taskItems)
        {
            _taskItems = taskItems;
        }

        [HttpGet]
        public IActionResult Index([FromQuery]DateTime taskDate)
        {
            var trackerDays = _taskItems.GetTrackerDay(taskDate);
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
            _taskItems.AddTrackerTask(trackerTask);
            return CreatedAtAction(nameof(GetById), 1);
        }

        [HttpPut]
        public IActionResult Put(TrackerTask trackerTask)
        {
            _taskItems.UpdateTrackerTask(trackerTask);
            return CreatedAtAction(nameof(GetById), 1);
        }

        [HttpPost]
        [Route("SequenceChanged")]
        public IActionResult SequenceChanged(SequenceChange sequenceChange)
        {
            _taskItems.SequenceChanged(sequenceChange);
            return Ok(1);
        }
    }
}
