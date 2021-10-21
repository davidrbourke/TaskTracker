using System.Collections.Generic;
using TaskTracker.Domain.Models;

namespace TaskTracker.Domain
{
    public interface IPad
    {
        IEnumerable<TrackerDay> GetTrackerDays();
        void AddTrackerTask(TrackerTask trackerTask);
    }
}
