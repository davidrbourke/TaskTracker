using System;
using System.Collections.Generic;
using System.Linq;
using TaskTracker.Domain.Models;
using TaskTracker.Repository;

namespace TaskTracker.Domain
{
    public class Pad : IPad
    {
        private IList<TrackerDay> _trackerDays;
        private readonly IRepository _repository;
        public Pad(IRepository repository)
        {
            _repository = repository;
            LoadPad();
        }

        public IEnumerable<TrackerDay> GetTrackerDays(DateTime taskDate)
        {
            return this._trackerDays.Where(t => t.TrackerDayDateTime.Date == taskDate.Date);
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

        public void AddTrackerTask(TrackerTask trackerTask)
        {
            // load trackerday
            var trackerDayDate = trackerTask.StartDateTime.Date;
            //if not found, create tracker day

            var trackerDay = _trackerDays.FirstOrDefault(t => t.TrackerDayDateTime.Date == trackerDayDate);
            if (trackerDay == null)
            {
                trackerDay = new TrackerDay
                {
                    TrackerDayDateTime = trackerTask.StartDateTime.Date,
                    TrackerTasks = new List<TrackerTask>()
                };
                _trackerDays.Add(trackerDay);
            }

            // add task to day
            trackerDay.TrackerTasks.Add(trackerTask);

            _repository.Save(MapToPadEntity(this));
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

        private IList<TrackerDay> MapToTrackerDays(PadEntity padEntity)
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
