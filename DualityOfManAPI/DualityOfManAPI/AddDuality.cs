using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net.Http;
using DualityOfManAPI.Models;
using System.Net;

namespace DualityOfManAPI
{
    /// <summary>
    /// This is an Azure function that will add a duality to the database whenever a user creates one in the website. 
    /// It is triggered by an HTTP Post request and expects a <see cref="Duality"/> Duality object.The exact database that it will insert into is defined in the local.settings
    /// </summary>
    public static class AddDuality
    {
        [FunctionName("AddDuality")]
        public static HttpResponseMessage Run(
    [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)]HttpRequestMessage req,
    [CosmosDB(
        databaseName: "DualityOfMan",
        collectionName: "dualities",
        ConnectionStringSetting = "CosmosDBConnection")]
    out Duality duality,
    ILogger log)
        {
            // Get the content from the request body and put it into a Duality object
            var content = req.Content;
            string jsonContent = content.ReadAsStringAsync().Result;
            duality = JsonConvert.DeserializeObject<Duality>(jsonContent);

            // Log that things were successful
            log.LogInformation($"C# Queue trigger function inserted one duality into system");

            // Return success message
            return new HttpResponseMessage(HttpStatusCode.Created);

            /**
             * It seems odd that there is no point in this function that the duality is actually "inserted" into the database.
             * That is because the inserting is automatically taken care of by the trigger and "out" command seen in the Run method
             * signature.
             */
        }

    }
}
