using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace web
{
    public static class TokenHelper
    {
        public static string WindowsGraph = "https://graph.windows.net";

        public static async Task<AuthenticationResult>
            GetAccessToken(AzureAutomationConfig config)
        {
            var authority = $"https://login.microsoftonline.com/{config.TenantId}";
            var authContext = new AuthenticationContext(authority);
            var token = await authContext.AcquireTokenAsync(
                WindowsGraph,
                new ClientCredential(
                    config.ClientID,
                    config.ClientSecret));
            return token;
        }

        public static Action<HttpClient> GetAzureManagementApiHeaderFormatter(
            this AuthenticationResult token)
        {
            return new Action<HttpClient>((httpClient) =>
            {
                httpClient.DefaultRequestHeaders.Accept.Clear();
                httpClient.DefaultRequestHeaders.Accept
                .Add(new MediaTypeWithQualityHeaderValue("application/json"));
                httpClient.DefaultRequestHeaders.Authorization
                    = new AuthenticationHeaderValue("Bearer", token.AccessToken);
            });
        }
    }

    public class AzureAutomationConfig
    {
        public AzureAutomationConfig()
        {

        }

        public string Resource { get; set; }
        public string TenantId { get; set; }
        public string ClientID { get; set; }
        public string ClientSecret { get; set; }       
    }
}
