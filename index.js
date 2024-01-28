import express from "express";
import axios from "axios";
import "dotenv/config";

const app = express();
const port = 3001;
const API_URL = "https://secrets-api.appbrewery.com";

// data to api
const apiUsername = process.env.API_USERNAME;
const apiPassword = process.env.API_PASSWORD;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const resultGot = await axios.get(API_URL + "/random");
    const resultToShow = resultGot.data;
    console.log(req.body);
    console.log(resultToShow);
    res.render("index.ejs", {
      content: JSON.stringify(resultToShow),
    });
  } catch (error) {
    console.log(API_URL + "/random");
    res.status(404).send(error.message);
    console.log(`error: ${error.message}`);
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const resultGot = await axios.get(API_URL + "/all?page=2", {
      auth: {
        username: apiUsername,
        password: apiPassword,
      },
    });
    const resultToShow = resultGot.data;
    console.log(req.body);
    console.log(resultToShow);
    res.render("index.ejs", {
      content: JSON.stringify(resultToShow),
    });
  } catch (error) {
    res.status(404).send(error.message);
    console.log(`error: ${error.message}`);
  }
});
app.get("/apiKey", async (req, res) => {
  try {
    const resultGot = await axios.get(API_URL + "/filter", {
      params: {
        score: 5,
        apiKey: yourAPIKey,
      },
    });
    const resultToShow = resultGot.data;
    res.render("index.ejs", {
      content: JSON.stringify(resultToShow),
    });
  } catch (error) {
    res.status(404).send(error.message);
    console.log(`error: ${error.message}`);
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
    const resultGot = await axios.get(API_URL + "/secrets/2", {
      headers: {
        Authorization: yourBearerToken,
      },
    });
    const resultToShow = resultGot.data;
    res.render("index.ejs", {
      content: JSON.string(resultToShow),
    });
  } catch (error) {
    res.status(404).send(error.message);
    console.log(`error: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
