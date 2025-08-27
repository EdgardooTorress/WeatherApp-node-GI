const http = require("http");  // import the http module from node
const { emitWarning } = require("process");
const url =
  "http://api.weatherstack.com/current?access_key=5792a51a52f9f3810bd0f02d28c91b9a&query=45,-75&units=f";

const request = http.request(url, (response) => {
  let data = "";

  response.on("data", (chunk) => {
    data = data + chunk.toString() // convert buffer to string
    console.log(chunk)
  });
  response.on("end", () => {
    const body = JSON.parse(data) // parse the full JSON string into an object
    console.log(body)
  });
});

// handle low level errors like not internet
request.on('error', (error)=> {
    console.log('Error', error)
})

request.end() // end the request if we dont use it request never finish