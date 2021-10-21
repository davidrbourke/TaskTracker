using System;
using System.Collections.Generic;

namespace TaskTracker.Domain.Models
{
    public class TrackerDay
    {
        public int Id { get; set; }
        public DateTime TrackerDayDateTime { get; set; }
        public IList<TrackerTask> TrackerTasks { get; set; }
    }
}
