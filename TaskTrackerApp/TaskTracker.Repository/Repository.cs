using System.IO;
using System.Text.Json;

namespace TaskTracker.Repository
{
    public class Repository : IRepository
    {
        public void Save(PadEntity padEntity)
        {
            var state = JsonSerializer.Serialize(padEntity);

            File.WriteAllText("appState.json", state);
        }

        public PadEntity Load()
        {
            var state = File.ReadAllText("appState.json");
            if (state == "")
            {
                return new PadEntity();
            }

            return JsonSerializer.Deserialize<PadEntity>(state);
        }
    }
}
