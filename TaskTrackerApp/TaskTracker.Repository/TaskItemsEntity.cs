using System.Collections.Generic;

namespace TaskTracker.Repository
{
    public class TaskItemsEntity
    {
        public IEnumerable<TrackerDayEntity> TrackerDayEntities { get; set; }
    }
}
