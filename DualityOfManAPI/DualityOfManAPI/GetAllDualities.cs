using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using System.Net.Http;
using System.Collections.Generic;
using System.Net;
using DualityOfManAPI.Models;

namespace DualityOfManAPI
{
    /// <summary>
    /// This is a Function that gets all of the dualities from the dualities collection and returns them to the caller.
    /// </summary>
    public static class GetAllDualities
    {
        [FunctionName("GetAllDualities")]
        public static HttpResponseMessage Run(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequestMessage req,
    [CosmosDB(databaseName: "DualityOfMan", 
            collectionName: "dualities", 
            ConnectionStringSetting = "CosmosDBConnection", 
            SqlQuery = "SELECT * FROM dualities ORDER BY dualities._ts DESC")]
        IEnumerable<Duality> dualities)
        {
            // Return the dualities
            return req.CreateResponse(HttpStatusCode.OK, dualities);

            /**
             * Most of the work for this function is automatically carried out in the signature.
             */
        }

    }
}
