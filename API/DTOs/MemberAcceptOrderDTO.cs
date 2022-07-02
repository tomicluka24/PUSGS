using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MemberAcceptOrderDTO
    {
         public string Username { get; set; }
         public int CurrentOrderId { get; set; }
    }
}