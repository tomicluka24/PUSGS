using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _context;

        public BuggyController(DataContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret text"; 
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()  // modify return value
        {
            var thing = _context.Users.Find(-1);    // modify

            if (thing == null) return NotFound();

            return Ok(thing);
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError() // modify return value
        {
            var thing = _context.Users.Find(-1);    // modify

            var thingToReturn = thing.ToString(); 

            return thingToReturn;
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return "This was not a good request"; 
        }
    }
}