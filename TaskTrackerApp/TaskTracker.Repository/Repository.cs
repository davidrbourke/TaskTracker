using System.IO;
using System.Text.Json;

namespace TaskTracker.Repository
{
    public class Repository : IRepository
    {
        public void Save(TaskItemsEntity padEntity)
        {
            var state = JsonSerializer.Serialize(padEntity);

            File.WriteAllText("appState.json", state);
        }

        public TaskItemsEntity Load()
        {
            var state = File.ReadAllText("appState.json");
            if (state == "")
            {
                return new TaskItemsEntity();
            }

            return JsonSerializer.Deserialize<TaskItemsEntity>(state);
        }
    }
}
