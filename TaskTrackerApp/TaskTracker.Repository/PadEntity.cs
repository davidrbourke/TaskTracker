using System.Collections.Generic;

namespace TaskTracker.Repository
{
    public class PadEntity
    {
        public IEnumerable<TrackerDayEntity> TrackerDayEntities { get; set; }
    }
}
