using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDTO>();
            CreateMap<RegisterDTO, AppUser>();
            CreateMap<MemberUpdateDTO, AppUser>();
            CreateMap<MemberVerifyDTO, AppUser>();
            CreateMap<MemberAcceptOrderDTO, AppUser>();
            CreateMap<AddProductDTO, Product>();
            CreateMap<Product, AddProductDTO>();
            CreateMap<NewOrderDTO, Order>();
            CreateMap<Order, NewOrderDTO>();
            CreateMap<Order, AcceptedOrderDTO>();
            CreateMap<AcceptedOrderDTO, Order>();
        }
    }
}