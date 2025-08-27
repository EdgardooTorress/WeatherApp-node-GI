// import the geocode and forecats function
const geocode = require("./geocode");
const forecast = require("./forecast");
const { error } = require("console");

const address = process.argv[2];

//check if the user provide an address in the terminal
if (!address) {
  console.log("Please provide an address");

} else {                                             /// = {} setting default value to empty object just in case no value is provide destructuring the obect
  geocode(address, (error, {latitude, longitude,location}= {}) => {
    if (error) {
      return console.log(error);
    }

    forecast(latitude,longitude, (error, forecastData) => { // once we have the cordinates call the forecast function
      if (error) {
        return console.log(error); // log the error if ther eir an error
      }

      console.log(location);// log the location and the forecast in the terminal
      console.log(forecastData);
    });
  });
}
