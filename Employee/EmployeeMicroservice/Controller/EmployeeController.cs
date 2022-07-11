using EmployeeMicroservice.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Newtonsoft.Json;
using OfferMicroservice.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeMicroservice.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        OfferHelper _api = new OfferHelper();
        public static List<Employee> Employees;

        public EmployeeController()
        {
            Employees = new List<Employee>()
            {
                new Employee{EmployeeId=2121183, EmployeeName="Anchal", Password="12345"},
                new Employee{EmployeeId=2121509, EmployeeName="Srikanth", Password="12345"},
                new Employee{EmployeeId=2122962, EmployeeName="Nazeer", Password="12345"},
                new Employee{EmployeeId=104, EmployeeName="Nitish", Password="12345"},
                new Employee{EmployeeId=105, EmployeeName="Sirisha", Password="12345"},
                new Employee{EmployeeId=201, EmployeeName="test", Password="12345"},

            };
        }
        [HttpGet]
        [Route("GetEmployeeList")]
        public ActionResult<List<Employee>> GetEmployeeList()
        {
            return Employees;
        }

        //View All Offers
        [HttpGet()]
        [Route("ViewEmployeeOffers/{employeeId}")]
        public async Task<ActionResult<IList<OfferData>>> ViewEmployeeOffers(int employeeId)
        {
            
            List<OfferData> offers = new List<OfferData>();
            HttpClient client = _api.Initial();
            HttpResponseMessage res = await client.GetAsync("api/Offer/GetOffersList");

           

            if (res.IsSuccessStatusCode)
            {
                var results = res.Content.ReadAsStringAsync().Result;
                offers = JsonConvert.DeserializeObject<List<OfferData>>(results);
            }
            var employeeOffers = offers.Where(c => c.EmployeeId == employeeId).ToList();

            if (employeeOffers.Count == 0)
            {
                return NotFound("No offers found");
            }
            return employeeOffers;

        }

        

        [HttpGet]
        [Route("ViewMostLikedOffers/{employeeId}")]
        public async Task<ActionResult<IList<OfferData>>> ViewMostLikedOffers(int employeeId)
        {

            List<OfferData> offers = new List<OfferData>();
            HttpClient client = _api.Initial();
            HttpResponseMessage res = await client.GetAsync("api/Offer/GetOffersList");
            if (res.IsSuccessStatusCode)
            {
                var results = res.Content.ReadAsStringAsync().Result;
                offers = JsonConvert.DeserializeObject<List<OfferData>>(results);
            }
            var offer = (from c in offers where c.EmployeeId==employeeId orderby c.Likes descending select c).Take(3).ToList();
            //List<OfferProvider> lists = offers.ToList();
            if(offer.Count==0)
            {
                return NotFound("No Offers Found");
            }
            return offer;

        }

        [HttpGet]
        [Route("GetPointsList")]
        public async Task<List<PointsData>> GetPointsList()
        {
            List<PointsData> offers = new List<PointsData>();
            HttpClient client = _api.Initial();
            HttpResponseMessage res = await client.GetAsync("api/points");
            if (res.IsSuccessStatusCode)
            {
                var results = res.Content.ReadAsStringAsync().Result;
                offers = JsonConvert.DeserializeObject<List<PointsData>>(results);
            }

            //List<OfferDto> lists = offers.ToList();
            return offers;
        }
    }
}
