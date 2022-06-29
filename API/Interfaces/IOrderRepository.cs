using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IOrderRepository
    {
        void PlaceOrder (Order product);
        Task<IEnumerable<Order>> GetOrdersAsync();
        Task<bool> SaveAllAsync();
    }
}