import express from "express";
import axios from "axios";

const app = express();
const port = 3001;
const API_URL = "https://secrets-api.appbrewery.com";

// data to api
const yourUsername = "LeonardoTMV";
const yourPassword = "6221Bh[]";
const yourAPIKey = "7dbef3e7-50a6-44ed-b483-520453b0f888";
const yourBearerToken = "e3f37d3f-d340-4e10-82dc-eab766bc7a05";

app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.render("index.ejs", {content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try{
    const resultGot = await axios.get(API_URL+"/random");
    const resultToShow = resultGot.data;
    console.log(req.body);
    console.log(resultToShow);
    res.render("index.ejs", {
      content: JSON.stringify(resultToShow)
    });
  }catch(error){
    console.log(API_URL + "/random")
    res.status(404).send(error.message);
    console.log(`error: ${error.message}`);
  }
});

app.get("/basicAuth", async (req, res) => {
  try{
    const resultGot = await axios.get(API_URL+"/all?page=2", 
    {
      auth: {
          username: yourUsername,
          password: yourPassword,
        },
    });
    const resultToShow = resultGot.data;
    console.log(req.body);
    console.log(resultToShow);
    res.render("index.ejs", {
      content: JSON.stringify(resultToShow)
    });
  }catch(error){
    res.status(404).send(error.message);
    console.log(`error: ${error.message}`);
  }
});
app.get("/apiKey", async (req, res) => {
  try{
    const resultGot = await axios.get(API_URL+"/filter", 
    {
      params: {
        score: 5,
        apiKey: yourAPIKey
      }
    });
    const resultToShow = resultGot.data;
    res.render("index.ejs", {
      content: JSON.stringify(resultToShow)
    });
  }catch(error){
    res.status(404).send(error.message);
    console.log(`error: ${error.message}`);
  }
});

app.get("/bearerToken", async (req, res) => {
  try{
    const resultGot = await axios.get(API_URL+"/secrets/2", 
    {
      headers: {
        Authorization: yourBearerToken
      }
    });
    const resultToShow = resultGot.data;
    res.render("index.ejs", {
      content: JSON.string(resultToShow)
    });
  }catch(error){
    res.status(404).send(error.message);
    console.log(`error: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
