using Admiral.Web.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Admiral.Web
{
    public class Database
    {
        private List<Project> projects = new List<Project>
        {
            new Project
            {
                Id = "E77765C2-55B9-4101-84B7-779A7C79F4D9",
                Name = "Demo Project",
                Description = "My Project",
                EngineeringOwner = "John Wong",
                ProductOwner = "Lisa Beth"
            },
            new Project
            {
                Id = "8722DACD-FD2F-46F7-AC9C-C6A613A6DF7E",
                Name = "Storage",
                Description = "My storage project",
                EngineeringOwner = "John Wong",
                ProductOwner = "Lisa Beth"
            }
        };


        public List<Project> GetProjects()
        {
            return this.projects;
        }
    }
}
