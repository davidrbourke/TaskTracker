using System;
using System.Collections.Generic;
using System.Linq;
using TaskTracker.Domain.Models;
using TaskTracker.Repository;

namespace TaskTracker.Domain
{
    public class Pad : IPad
    {
        private IEnumerable<TrackerDay> _trackerDays;
        private readonly IRepository _repository;
        public Pad(IRepository repository)
        {
            _repository = repository;
            LoadPad();
        }

        public IEnumerable<TrackerDay> GetTrackerDays()
        {
            return this._trackerDays;
        }

        private void LoadPad()
        {
            // Sample data
            this._trackerDays = new List<TrackerDay>()
            {
                new TrackerDay
                {
                    Id = 1,
                    TrackerDayDateTime = DateTime.Now,
                    TrackerTasks = new List<TrackerTask>
                    {
                        new TrackerTask
                        {
                            Id = 1,
                            TrackerTaskName = "Do something 1"
                        }
                    }
                }
            };

            var padEntities = _repository.Load();
            _trackerDays = MapToTrackerDays(padEntities);
        }

        private PadEntity MapToPadEntity(Pad pad)
        {
            var padEntity = new PadEntity
            {
                TrackerDayEntities = _trackerDays.Select(td => new TrackerDayEntity
                {
                    Id = td.Id,
                    TrackerDayDateTime = td.TrackerDayDateTime,
                    TrackerTasks = td.TrackerTasks.Select(tt => new TrackerTaskEntity
                    {
                        Id = tt.Id,
                        TrackerTaskName = tt.TrackerTaskName,
                        TrackerTaskDescription = tt.TrackerTaskDescription,
                        StartDateTime = tt.StartDateTime,
                        EndDateTime = tt.EndDateTime
                    }).ToList()
                }).ToList()
            };

            return padEntity;
        }

        private IEnumerable<TrackerDay> MapToTrackerDays(PadEntity padEntity)
        {
            return padEntity.TrackerDayEntities.Select(td => new TrackerDay
            {
                Id = td.Id,
                TrackerDayDateTime = td.TrackerDayDateTime,
                TrackerTasks = td.TrackerTasks.Select(tt => new TrackerTask
                {
                    Id = tt.Id,
                    TrackerTaskName = tt.TrackerTaskName,
                    TrackerTaskDescription = tt.TrackerTaskDescription,
                    StartDateTime = tt.StartDateTime,
                    EndDateTime = tt.EndDateTime
                }).ToList()
            }).ToList();
        }
    }
}
