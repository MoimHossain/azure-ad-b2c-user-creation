

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Admiral.Web.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Management.Graph.RBAC.Fluent.Models;
using web;

namespace Admiral.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ProdGraphClient graph;
        private readonly MaerskAdGraphClient maerskAd;
        private readonly string AdminGroupID = "1fefd66d-9f89-45f9-96ef-b3d42874bf04";

        public UserController(ProdGraphClient database, 
            MaerskAdGraphClient maerskAd)
        {
            this.graph = database;
            this.maerskAd = maerskAd;
        }

        [Authorize]
        [HttpGet()]
        [Route("search/{searchKey}")]
        public async Task<IEnumerable<UserInner>> ListAsync(string searchKey)
        {
            var response = await maerskAd.IsGroupMember(this.AdminGroupID, User);
            if (response)
            {
                var data = await graph.GetUsersAsync(searchKey);
                return await Task.FromResult(data);
            }


            return await Task.FromResult(new List<UserInner>());
        }

        [Authorize]
        [HttpPost()]
        [Route("create")]
        public async Task<object> Create([FromBody]UserInfo user)
        {
            var response = await maerskAd.IsGroupMember(this.AdminGroupID, User);
            if(response )
            {
                var data = await graph.CreateUserAsync(user);
                return await Task.FromResult(data);
            }           

            return await Task.FromResult(new { Success = false });
        }        
    }
    public class UserInfo
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }
}