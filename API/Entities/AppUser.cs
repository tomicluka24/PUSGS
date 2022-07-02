using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int> 
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string UserType { get; set; }
        public string PhotoUrl { get; set; }
        public string Verified { get; set; }
        [ForeignKey("FK_Order")]
        public int CurrentOrderId { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}