using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class NewOrderDTO
    {
        public int Id { get; set; }
        public int ConsumerId { get; set; }
        public int DelivererId { get; set; }
        public int ProductId { get; set; }
        public string Accepted { get; set; }
        public string Delivered { get; set; }
        [Required]
        public string ProductName { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public string DeliveryAddress { get; set; }
         [Required]
        public string Comment { get; set; }
        [Required]
        public int Price { get; set; }

    }
}