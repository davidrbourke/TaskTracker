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

        public TrackerDay GetTrackerDay(DateTime taskDate)
        {
            var trackerDay = this._trackerDays.Where(t => t.TrackerDayDateTime.Date == taskDate.Date).FirstOrDefault();
            if (trackerDay == null)
            {
                return new TrackerDay();
            }
            trackerDay.TrackerTasks = trackerDay.TrackerTasks.Where(t => t.Deleted == false).ToList();
            return trackerDay;         
        }

        private void LoadPad()
        {
            var padEntities = _repository.Load();
            if (padEntities.TrackerDayEntities == null)
            {
                _trackerDays = new List<TrackerDay>();
            }
            else
            {
                _trackerDays = MapToTrackerDays(padEntities);
            }
        }

        public void AddTrackerTask(TrackerTask trackerTask)
        {
            // load trackerday
            var trackerDayDate = trackerTask.StartDateTime.Date;
            trackerTask.Id = Guid.NewGuid();
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

            var nextSequence = trackerDay.TrackerTasks.Count() + 1;
            trackerTask.Sequence = nextSequence;

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
                        EndDateTime = tt.EndDateTime,
                        Status = tt.Status,
                        Deleted = tt.Deleted,
                        Sequence = tt.Sequence
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
                    EndDateTime = tt.EndDateTime,
                    Status = tt.Status,
                    Deleted = tt.Deleted,
                    Sequence = tt.Sequence
                }).ToList()
            }).ToList();
        }

        public void UpdateTrackerTask(TrackerTask trackerTask)
        {
            // load trackerday
            var trackerDayDate = trackerTask.StartDateTime.Date;
            //if not found, create tracker day

            var trackerDay = _trackerDays.FirstOrDefault(t => t.TrackerDayDateTime.Date == trackerDayDate);
            var foundTask = trackerDay.TrackerTasks.Single(t => t.Id == trackerTask.Id);
            foundTask.Status = trackerTask.Status;
            foundTask.Deleted = trackerTask.Deleted;

            _repository.Save(MapToPadEntity(this));
        }
    }
}
