using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using API.Extensions;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public readonly IPhotoService _photoService;
        public UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService)
        {
            _photoService = photoService;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();

            return Ok(users);
        }

        [HttpGet("{username}", Name="GetUser")]
        public async Task<ActionResult<MemberDTO>> GetUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);
        }

        [HttpPut("UpdateUser")]
        public async Task<ActionResult> UpdateUser(MemberUpdateDTO memberUpdateDto)
        {
            memberUpdateDto.PhotoUrl = memberUpdateDto.PhotoUrl.Replace("C:\\fakepath\\", "http://127.0.0.1:8887/Slike/");

            var user = await _userRepository.GetUserByUsernameAsync(memberUpdateDto.Username);
            user.PhotoUrl = user.PhotoUrl.Replace("C:\\fakepath\\", "http://127.0.0.1:8887/Slike/");
            _mapper.Map(memberUpdateDto, user);

            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update user");
        }

        [HttpPut("VerifyUser")]
        public async Task<ActionResult> VerifyUser(MemberUpdateDTO memberUpdateDto)
        {
            var user = await _userRepository.GetUserByUsernameAsync(memberUpdateDto.Username);

            _mapper.Map(memberUpdateDto, user);

            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to validate user");
        }

        [HttpPut("DeclineUser")]
        public async Task<ActionResult> DeclineUser(MemberUpdateDTO memberUpdateDto)
        {
            var user = await _userRepository.GetUserByUsernameAsync(memberUpdateDto.Username);

            _mapper.Map(memberUpdateDto, user);

            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to decline user");
        }


        // [HttpPost("add-photo")]
        // public async Task<ActionResult<string>> AddPhoto(IFormFile file)
        // {
        //     var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

        //     var result = await _photoService.AddPhotoAsync(file);

        //     if (result.Error != null) return BadRequest(result.Error.Message);

        //     user.PhotoUrl  = result.SecureUrl.AbsoluteUri;

        //     if (await _userRepository.SaveAllAsync())
        //         return  CreatedAtRoute("GetUser", new {username = user.UserName}, user.PhotoUrl);

        //     return BadRequest("Problem adding photo");
        // }

        
    }
} 