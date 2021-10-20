namespace TaskTracker.Repository
{
    public interface IRepository
    {
        void Save(PadEntity padEntity);
        PadEntity Load();
    }
}
