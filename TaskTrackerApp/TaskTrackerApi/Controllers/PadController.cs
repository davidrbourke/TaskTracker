﻿using Microsoft.AspNetCore.Mvc;
using System;
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
        public IActionResult Index([FromQuery]DateTime taskDate)
        {
            var trackerDays = _pad.GetTrackerDay(taskDate);
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

        [HttpPut]
        public IActionResult Put(TrackerTask trackerTask)
        {
            _pad.UpdateTrackerTask(trackerTask);
            return CreatedAtAction(nameof(GetById), 1);
        }

        [HttpPost]
        [Route("SequenceChanged")]
        public IActionResult SequenceChanged(SequenceChange sequenceChange)
        {
            _pad.SequenceChanged(sequenceChange);
            return Ok(1);
        }
    }
}
