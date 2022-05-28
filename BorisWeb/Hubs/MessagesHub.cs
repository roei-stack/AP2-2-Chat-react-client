using Microsoft.AspNetCore.SignalR;
using Domain;
namespace BorisWeb.Hubs
{
    public class MessagesHub : Hub
    {
        public async Task SignalMessage(Message message)
        {
            await Clients.All.SendAsync("NewMessage", message);
        }
    }
}
