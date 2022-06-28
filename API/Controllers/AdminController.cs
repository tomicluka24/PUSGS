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
    public class AdminController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IProductRepository _productRepository;

        public AdminController(UserManager<AppUser> userManager, IMapper mapper, IProductRepository productRepository)
        {
            _userManager = userManager;
            _mapper = mapper;
            _productRepository = productRepository;
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("add-product")]
        public async Task<ActionResult> AddProduct(AddProductDTO addProductDTO)
        {
            var product = _mapper.Map<Product>(addProductDTO);
            _productRepository.AddProduct(product);

            if (await _productRepository.SaveAllAsync()) return NoContent();
                return BadRequest("Failed to decline user");
        }
    }
}