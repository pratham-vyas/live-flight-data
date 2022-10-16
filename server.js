const axios = require("axios").default;
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
const PORT = 8001;

const codeCheck = (req,res,next) => {
    console.log("here",req.params)
    const {ids}=req.params

    if(ids.length === 4) {
       return next()
    }

    res.send("wrong code")
}

app.get("/flight/:ids", codeCheck , async (req, res) => {
  try {
    console.log("here1")
    const ids = req.params.ids;
    const axios = require("axios");

    const options = {
      method: "GET",
      url: `https://aerodatabox.p.rapidapi.com/flights/airports/icao/${ids}/2022-10-16T20:00/2022-10-17T08:00`,
      params: {
        withLeg: "true",
      },
      headers: {
        "X-RapidAPI-Key": "efb7d357e5msh090d0cae7d8b0c3p1e7708jsn6ae9471b176f",
        "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
      },
    };
    console.log(options)

    const data = await axios.request(options);
    console.log(data)

res.send(data.data)
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log("running on PORT " + PORT));
