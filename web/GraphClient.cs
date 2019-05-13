using Admiral.Web.Controllers;
using Microsoft.Azure.Management.Graph.RBAC.Fluent;
using Microsoft.Azure.Management.Graph.RBAC.Fluent.Models;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Microsoft.Rest;
using Microsoft.Rest.Azure.OData;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace web
{
    public abstract class GraphClient
    {
        private readonly AzureAutomationConfig config;

        protected GraphClient(AzureAutomationConfig config)
        {
            this.config = config;
        }

        public async Task<GraphRbacManagementClient> GetAdGraphClientAsync(                )
        {
            var token = await TokenHelper
                .GetAccessToken(this.config);
            var windowsGraph =
                new GraphRbacManagementClient(new TokenCredentials(token.AccessToken));
            windowsGraph.TenantID = config.TenantId;
            return windowsGraph;
        }

        public async Task<IEnumerable<UserInner>> GetUsersAsync(string searchKey)
        {
            var client = await GetAdGraphClientAsync();

            var users = await client.Users
                .ListAsync(new ODataQuery<UserInner>(
                    user=> user.DisplayName.StartsWith(searchKey)));

            return users;
        }


        public async Task<bool> IsGroupMember(string adminGroupID, ClaimsPrincipal user)
        {
            var claims = user.Claims;

            var claim = claims.FirstOrDefault(c => c.Type.Equals("http://schemas.microsoft.com/identity/claims/objectidentifier"));
            if(claim != null )
            {
                var id = Guid.Empty;
                if(Guid.TryParse(claim.Value, out id))
                {
                    var client = await GetAdGraphClientAsync();

                    var member = await client.Groups.IsMemberOfAsync(
                        new CheckGroupMembershipParameters(adminGroupID, id.ToString()));
                    return member.Value.HasValue ? member.Value.Value : false;
                }
            }
            return false;
        }
        public async Task<object> CreateUserAsync(Admiral.Web.Controllers.UserInfo user)
        {
            try
            {
                var client = await GetAdGraphClientAsync();
                await SendGraphPostRequest(JsonConvert.SerializeObject(new {
                    accountEnabled =  true,
                    signInNames = new List<object>
                    {
                        new {
                            type = "emailAddress",
                            value = user.Email
                        }
                    } ,
                    creationType = "LocalAccount",
                    displayName = $"{user.FirstName} {user.LastName}",
                    mailNickname = $"{user.FirstName}{user.LastName}",
                    passwordProfile = new {
                        password = "Maersk@1234!",
                        forceChangePasswordNextLogin = false
                    },
                    passwordPolicies = "DisablePasswordExpiration"
                }));
                return new { Success = true };
            }
            catch (Exception ex)
            {
                return new { Success = false };
            }
        }

        private async Task<string> SendGraphPostRequest(string json)
        {
            var token = await TokenHelper
                 .GetAccessToken(this.config);
            string aadGraphEndpoint = "https://graph.windows.net/";
            string aadGraphVersion = "api-version=1.6";

            var http = new HttpClient();
            string url = aadGraphEndpoint + this.config.TenantId + "/users" + "?" + aadGraphVersion;
            

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, url);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token.AccessToken);
            request.Content = new StringContent(json, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await http.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                string error = await response.Content.ReadAsStringAsync();
                object formatted = JsonConvert.DeserializeObject(error);
                throw new WebException("Error Calling the Graph API: \n" + JsonConvert.SerializeObject(formatted, Formatting.Indented));
            }


            return await response.Content.ReadAsStringAsync();
        }
    }
}
