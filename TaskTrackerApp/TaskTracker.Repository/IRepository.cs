namespace TaskTracker.Repository
{
    public interface IRepository
    {
        void Save(TaskItemsEntity padEntity);
        TaskItemsEntity Load();
    }
}
