using System;
using System.Collections.Generic;
using System.Linq;
using TaskTracker.Domain.Models;
using TaskTracker.Repository;
using Mapster;

namespace TaskTracker.Domain
{
    public class TaskItems : ITaskItems
    {
        private IList<TrackerDay> _trackerDays;
        private readonly IRepository _repository;
        public TaskItems(IRepository repository)
        {
            _repository = repository;
            LoadTaskItems();
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

        private void LoadTaskItems()
        {
            var taskItemsEntity = _repository.Load();
            if (taskItemsEntity.TrackerDayEntities == null)
            {
                _trackerDays = new List<TrackerDay>();
            }
            else
            {
                _trackerDays = MapToTrackerDays(taskItemsEntity);
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

            _repository.Save(MapToTaskItemsEntity(this));
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
            foundTask.TrackerTaskName = trackerTask.TrackerTaskName;

            _repository.Save(MapToTaskItemsEntity(this));
        }

        public void SequenceChanged(SequenceChange sequenceChange)
        {
            var nextSequenceNumber = sequenceChange.IsChangedUp ? -1 : 1;

            var trackerDay = _trackerDays.FirstOrDefault(t => t.TrackerDayDateTime.Date == sequenceChange.TrackerDayDateTime.Date);
            var foundTask = trackerDay.TrackerTasks.Single(t => t.Id == sequenceChange.ChangedTrackerTaskId);
            var nextTask = trackerDay.TrackerTasks.SingleOrDefault(t => t.Sequence == foundTask.Sequence + nextSequenceNumber);

            if (nextTask != null)
            {
                if (sequenceChange.IsChangedUp)
                {
                    foundTask.Sequence -= 1;
                    nextTask.Sequence += 1;
                }
                else
                {
                    foundTask.Sequence += 1;
                    nextTask.Sequence -= 1;
                }
            }

            _repository.Save(MapToTaskItemsEntity(this));
        }

        private TaskItemsEntity MapToTaskItemsEntity(TaskItems taskItems)
        {
            var taskItemsEntity = new TaskItemsEntity
            {
                TrackerDayEntities = _trackerDays.AsQueryable().ProjectToType<TrackerDayEntity>().ToList()
            };

            return taskItemsEntity;
        }

        private IList<TrackerDay> MapToTrackerDays(TaskItemsEntity taskItemsEntity)
        {
            return taskItemsEntity.TrackerDayEntities.AsQueryable().ProjectToType<TrackerDay>().ToList();
        }
    }
}
