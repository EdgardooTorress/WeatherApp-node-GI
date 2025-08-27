const path = require("path"); // Help us to get the path of the file
const express = require("express");
const hbs = require("hbs");
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs"); // get handlebarss set up
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)); // a way to customize the server, we can use our HTML

app.get("", (req, res) => {
  res.render("index", {
    // needs to match up with the name of the handlerbar
    title: "Weather",
    name: "Edgardo Torres",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Edgardo Torres",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    message: "Here we help you",
  });
});

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'You must provide an address!'
    })
  }
geocode(req.query.address,(error,{latitude, longitude, location}= {})=>{
  if(error){
    return res.send({error})
  }
  forecast(latitude, longitude, (error, forecastData)=>{
    if(error){
      return res.send({error})
    }
    res.send({
      forecast: forecastData,
      location,
      address: req.query.address
    })
  })

})

});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search)

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  // 404 errors for articles
  res.render("404", {
    title: "404",
    name: "Edgardo Torres",
    errorMessage: " Help Article not found",
  });
});

app.get("*", (req, res) => {
  // handler for 404 errors
  // everything is a match is used to match those pages that are not listed
  res.render("404", {
    title: "404",
    name: "Edgardo Torres",
    errorMessage: "page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});




// app.get('', (req, res) =>{ // setting the help page that have a function with 2 parameters req and response
//     res.send('') // we can send HTML
// })
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
