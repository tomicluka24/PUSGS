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
        public readonly IEmailSender _emailSender;
        private readonly IProductRepository _productRepository;
        private readonly IOrderRepository _orderRepository;
        public UsersController(IUserRepository userRepository, IMapper mapper, IProductRepository productRepository,
         IPhotoService photoService, IEmailSender emailSender, IOrderRepository orderRepository)
        {
            _photoService = photoService;
            _mapper = mapper;
            _userRepository = userRepository;
            _emailSender = emailSender;
            _productRepository = productRepository;
            _orderRepository = orderRepository;
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
        public async Task<ActionResult> VerifyUser(MemberVerifyDTO memberVerifyDTO)
        {
            var user = await _userRepository.GetUserByUsernameAsync(memberVerifyDTO.Username);
            var message = new Message(new string[] {memberVerifyDTO.Email}, "Delivery App - Profile verification",
                                      memberVerifyDTO.Username + " Your Delivery App account is verified. You can now start with your first delivery :)");

            _mapper.Map(memberVerifyDTO, user);

            _userRepository.Update(user);

            _emailSender.SendEmail(message);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to validate user");
        }

        [HttpPut("DeclineUser")]
        public async Task<ActionResult> DeclineUser(MemberVerifyDTO memberVerifyDTO)
        {
            var user = await _userRepository.GetUserByUsernameAsync(memberVerifyDTO.Username);
            var message = new Message(new string[] {memberVerifyDTO.Email}, "Delivery App - Profile verification",
                                      memberVerifyDTO.Username + " Your Delivery App account is declined. If admin verifies your account in future, we will notify you!");

            _mapper.Map(memberVerifyDTO, user);

            _userRepository.Update(user);

            _emailSender.SendEmail(message);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to decline user");
        }

        [HttpPut("AcceptOrder")]
        public async Task<ActionResult> AcceptOrder(MemberAcceptOrderDTO memberAcceptOrderDTO)
        {
            var user = await _userRepository.GetUserByUsernameAsync(memberAcceptOrderDTO.Username);

            _mapper.Map(memberAcceptOrderDTO, user);

            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to accept order");
        }

        [HttpPut("DeliverOrder")]
        public async Task<ActionResult> DeliverOrder(MemberAcceptOrderDTO memberAcceptOrderDTO)
        {
            var user = await _userRepository.GetUserByUsernameAsync(memberAcceptOrderDTO.Username);

            _mapper.Map(memberAcceptOrderDTO, user);

            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to accept order");
        }

        [AllowAnonymous]
        [HttpPost("place-order-as-social-user")]
        public async Task<ActionResult> PlaceOrderAsSocialUser(NewOrderDTO newOrderDTO)
        {
            var order = _mapper.Map<Order>(newOrderDTO);
            _orderRepository.PlaceOrder(order);

            if (await _orderRepository.SaveAllAsync()) return NoContent();
                return BadRequest("Failed to place new order");
        }
    }
} 