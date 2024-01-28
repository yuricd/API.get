import axios from "axios";
import express from "express";
const port = 3002;

const app = express();
const API_URL = "https://secrets-api.appbrewery.com";

app.get("/", (req, res) =>{
    res.render("index.ejs", {
        content: "API response"
    });
});


app.listen(port, () =>{
    console.log(`listening on port ${port}`);
});