const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//setting up home route
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {
const query = req.body.cityName;
const apiKey = "9638b96eb3fcf18f5b4944681493a593";
const units = "imperial";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

https.get(url, function(response) {
console.log(response.statusCode);

response.on("data", function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp
    const desc = weatherData.weather[0].description
    const icon = weatherData.weather[0].icon
    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    res.write("<p>The weather is currently " + desc + "</p>");
    res.write("<h1>The temperature in " + query + " is " + temp + "degrees F</h1>");
    res.write("<img src=" + imageURL +">");
    res.send();
    
   
    // console.log(temp, desc);
});
})

})

//sets up server
app.listen(3000, function() {
    console.log("Server started on port 3000.");
});