using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class DelivererController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IProductRepository _productRepository;
        private readonly IOrderRepository _orderRepository;

        public DelivererController(UserManager<AppUser> userManager, IMapper mapper, IProductRepository productRepository, IOrderRepository orderRepository)
        {
            _userManager = userManager;
            _mapper = mapper;
            _productRepository = productRepository;
            _orderRepository = orderRepository;
        }

        [Authorize(Policy = "RequireDelivererRole")]
        [HttpGet("new-orders")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrderssAsync()
        {
            var orders = await _orderRepository.GetOrdersAsync();
            
            var newOrders = orders.Where(o => o.Accepted == "False");
            

            return Ok(newOrders);
        }

        [Authorize(Policy = "RequireDelivererRole")]
        [HttpPut("AcceptOrder")]
        public async Task<ActionResult> AcceptOrder(AcceptedOrderDTO acceptedOrderDto)
        {
            var order = await _orderRepository.GetOrderByIdAsync(acceptedOrderDto.Id.ToString());

            _mapper.Map(acceptedOrderDto, order);

            _orderRepository.Update(order);

            if (await _orderRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to validate user");
        }
        
        [Authorize(Policy = "RequireDelivererRole")]
        [HttpGet("current-order/{id}")]
        public async Task<ActionResult<Order>> GetOrder(string id)
        {
            return await _orderRepository.GetOrderByIdAsync(id);
        }
    }
}