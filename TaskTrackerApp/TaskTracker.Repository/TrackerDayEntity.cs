using System;
using System.Collections.Generic;

namespace TaskTracker.Repository
{
    public class TrackerDayEntity
    {
        public int Id { get; set; }
        public DateTime TrackerDayDateTime { get; set; }
        public IEnumerable<TrackerTaskEntity> TrackerTasks { get; set; }
    }
}
