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

        public ConsumerController(UserManager<AppUser> userManager, IMapper mapper, IProductRepository productRepository)
        {
            _userManager = userManager;
            _mapper = mapper;
            _productRepository = productRepository;
        }

        // [Authorize(Policy = "RequireConsumerRole")]
        [HttpGet("menu")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsAsync()
        {
            var products = await _productRepository.GetProductsAsync();

            return Ok(products);
        }
    }
}