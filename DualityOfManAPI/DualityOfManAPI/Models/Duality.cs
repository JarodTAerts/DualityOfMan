using System;
using System.Collections.Generic;
using System.Text;

namespace DualityOfManAPI.Models
{
    /// <summary>
    /// This is a class that represents a duality object like the ones stored in the CosmosDB on Azure.
    /// </summary>
    public class Duality
    {
        // Represents the first duality in the meme or the left text
        public string Duality1 { get; set; }

        // Represents the second duality in the meme or the second text
        public string Duality2 { get; set; }

        // Represents the number of negative votes for this particular meme
        public int Boo { get; set; }

        // Represents the number of positive votes for this particular meme
        public int Woo { get; set; }
    }
}
