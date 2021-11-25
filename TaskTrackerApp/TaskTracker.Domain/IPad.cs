using System;
using TaskTracker.Domain.Models;

namespace TaskTracker.Domain
{
    public interface IPad
    {
        TrackerDay GetTrackerDay(DateTime taskDate);
        void AddTrackerTask(TrackerTask trackerTask);
        void UpdateTrackerTask(TrackerTask trackerTask);
        void SequenceChanged(SequenceChange sequenceChange);
    }
}
