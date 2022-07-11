using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, IMapper mapper)
        {
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if (await UserUsernameExists(registerDTO.Username))
                return BadRequest("Username is taken");

            if (await UserEmailExists(registerDTO.Email))
                return BadRequest("Account with this email already exists");


            var user = _mapper.Map<AppUser>(registerDTO);

            user.PhotoUrl = user.PhotoUrl.Replace("C:\\fakepath\\", "http://127.0.0.1:8887/Slike/");
            
            if (registerDTO.UserType == "Deliverer")
                user.Verified = "False";
            else
                user.Verified = "True";        

            user.UserName = registerDTO.Username.ToLower();
            user.Email = registerDTO.Email.ToLower();

            var result = await _userManager.CreateAsync(user, registerDTO.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            if (user.UserType == "Admin")
            {
                var roleResult = await _userManager.AddToRoleAsync(user, "Admin");
                if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);
            }
            if (user.UserType == "Consumer")
            {
                var roleResult = await _userManager.AddToRoleAsync(user, "Consumer");
                if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);
            }
            if (user.UserType == "Deliverer")
            {
                var roleResult = await _userManager.AddToRoleAsync(user, "Deliverer");
                if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);
            }


            return new UserDTO
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                PhotoUrl = user.PhotoUrl
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(x => x.Email == loginDTO.Email.ToLower());

            if (user == null)
                return Unauthorized("Invalid Email");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);

            if (!result.Succeeded) return Unauthorized();

            return new UserDTO
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                PhotoUrl = user.PhotoUrl
            };
        }

        [HttpPost("socialLogin")]
        public async Task<ActionResult<UserDTO>> SocialLogin(LoginDTO loginDTO)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(x => x.Email == loginDTO.Email.ToLower());

            if (user == null)
                return Unauthorized("Invalid Email");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);

            if (!result.Succeeded) return Unauthorized();

            return new UserDTO
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                PhotoUrl = user.PhotoUrl
            };
        }

        private async Task<bool> UserUsernameExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }

        private async Task<bool> UserEmailExists(string email)
        {
            return await _userManager.Users.AnyAsync(x => x.Email == email.ToLower());
        }
    }
}