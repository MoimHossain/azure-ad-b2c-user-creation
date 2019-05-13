using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Admiral.Web.Controllers;

namespace web
{
    public class PreProdGraphClient : GraphClient
    {

        public PreProdGraphClient(AzureAutomationConfig config) : base(config)
        {
   
        }
    }

    public class ProdGraphClient : GraphClient
    {

        public ProdGraphClient(AzureAutomationConfig config) : base(config)
        {
    
        }

    }

    public class MaerskAdGraphClient : GraphClient
    {

        public MaerskAdGraphClient(AzureAutomationConfig config) : base(config)
        {

        }

    }
}
