using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class MemberDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string UserType { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string PhotoUrl { get; set; }
        public string Verified { get; set; }

    }
}