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
    public class ConsumerController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IProductRepository _productRepository;
        private readonly IOrderRepository _orderRepository;

        public ConsumerController(UserManager<AppUser> userManager, IMapper mapper, IProductRepository productRepository, IOrderRepository orderRepository)
        {
            _userManager = userManager;
            _mapper = mapper;
            _productRepository = productRepository;
            _orderRepository = orderRepository;
        }

        [Authorize(Policy = "RequireConsumerRole")]
        [HttpGet("menu")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsAsync()
        {
            var products = await _productRepository.GetProductsAsync();

            return Ok(products);
        }

        
        [HttpGet("social-user-menu")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsAsyncAsSocialUser()
        {
            var products = await _productRepository.GetProductsAsync();

            return Ok(products);
        }

        [Authorize(Policy = "RequireConsumerRole")]
        [HttpPost("place-order")]
        public async Task<ActionResult> PlaceOrder(NewOrderDTO newOrderDTO)
        {
            var order = _mapper.Map<Order>(newOrderDTO);
            _orderRepository.PlaceOrder(order);

            if (await _orderRepository.SaveAllAsync()) return NoContent();
                return BadRequest("Failed to place new order");
        }



        [HttpPost("place-order-as-social-user")]
        public async Task<ActionResult> PlaceOrderAsSocialUser(NewOrderDTO newOrderDTO)
        {
            
            var order = _mapper.Map<Order>(newOrderDTO);
            _orderRepository.PlaceOrder(order);

            if (await _orderRepository.SaveAllAsync()) return NoContent();
                return BadRequest("Failed to place new order");
        }

        [Authorize(Policy = "RequireConsumerRole")]
        [HttpGet("current-order/{id}")]
        public async Task<ActionResult<Order>> GetOrder(string id)
        {
            return await _orderRepository.GetOrderByIdAsync(id);
        }

        [Authorize(Policy = "RequireConsumerRole")]
        [HttpPut("RecieveOrder")]
        public async Task<ActionResult> RecieveOrder(DeliveredOrderDTO deliveredOrderDTO)
        {
            var order = await _orderRepository.GetOrderByIdAsync(deliveredOrderDTO.Id.ToString());

            _mapper.Map(deliveredOrderDTO, order);

            _orderRepository.Update(order);

            if (await _orderRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to recieve order");
        }

        [Authorize(Policy = "RequireConsumerRole")]
        [HttpGet("previous-orders")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrderssAsync()
        {
            var orders = await _orderRepository.GetOrdersAsync();

            return Ok(orders);
        }


    }
}