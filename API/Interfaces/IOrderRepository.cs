using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
namespace API.Interfaces
{
    public interface IOrderRepository
    {
        void PlaceOrder (Order product);
        void Update(Order order);
        Task<IEnumerable<Order>> GetOrdersAsync();
        Task<bool> SaveAllAsync();
        Task<Order> GetOrderByIdAsync(string id);
    }
}