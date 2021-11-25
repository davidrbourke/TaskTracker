using System;

namespace TaskTracker.Domain.Models
{
    public class SequenceChange
    {
        public DateTime TrackerDayDateTime { get; set; }
        public Guid ChangedTrackerTaskId { get; set; }
        public bool IsChangedUp { get; set; }
    }
}
