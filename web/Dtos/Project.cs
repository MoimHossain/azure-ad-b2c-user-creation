using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Admiral.Web.Dtos
{
    public class Project
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ProductOwner { get; set; }
        public string EngineeringOwner { get; set; }
    }
}
