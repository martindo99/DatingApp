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
        public ActionResult<String> GetSecret()
        {
            return "Secret text";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var things = _context.Users.Find(-1);

            if (things == null) return NotFound();

            return things;

        }

        [HttpGet("server-error")]
        public ActionResult<String> GetServerError()
        {
            var things = _context.Users.Find(-1);

            var thingToReturn = things.ToString();

            return thingToReturn;
        }

        [HttpGet("bad-request")]
        public ActionResult<String> GetBadRequest()
        {
            return BadRequest("Bad Request");
        }
    }
}