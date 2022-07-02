using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AcceptedOrderDTO
    {
        public int Id { get; set; }
        public int DelivererId { get; set; }
        public string Accepted { get; set; }
    }
}