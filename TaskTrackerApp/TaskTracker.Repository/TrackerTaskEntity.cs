using System;

namespace TaskTracker.Repository
{
    public class TrackerTaskEntity
    {
        public Guid Id { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }
        public string TrackerTaskName { get; set; }
        public string TrackerTaskDescription { get; set; }
        public int Sequence { get; set; }
        public int Status { get; set; }
        public bool Deleted { get; set; }
    }
}
