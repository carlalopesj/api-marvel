import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import md5 from "md5";

const app = express();
const port = 3000;

app.use(express.static("public"));

const time = Number(new Date());
const hash = md5(time + privateKey + publicKey);

const url = 'http://gateway.marvel.com/v1/public/';

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/character", async (req, res) => {
    try {
        const response = await axios.get(`${url}/characters?ts=${time}&apikey=${publicKey}&hash=${hash}&limit=50`);
        console.log(response.data.data.results);

        const filteredResults = response.data.data.results.filter(character => {
            return !character.thumbnail.path.includes("/image_not_available");
        });

        res.render("character.ejs", {
            id : filteredResults
        });
    } catch (error) {
        console.log(error);
    }
});

app.get("/comic", async (req, res) => {
    try {
        const response = await axios.get(`${url}/comics?ts=${time}&apikey=${publicKey}&hash=${hash}&limit=50`);
        console.log(response.data.data.results);

        const filteredResults = response.data.data.results.filter(character => {
            return !character.thumbnail.path.includes("/image_not_available");
        });
        
        res.render("comic.ejs", {
            id: filteredResults
        });
    } catch (error) {
        console.log(error);
    }
});

app.get("/event", async (req, res) => {
    try {
        const response = await axios.get(`${url}/events?ts=${time}&apikey=${publicKey}&hash=${hash}&limit=50`);
        console.log(response.data.data.results);
        const filteredResults = response.data.data.results.filter(character => {
            return !character.thumbnail.path.includes("/image_not_available");
        });
        res.render("event.ejs", {
            id : filteredResults
        });
    } catch (error) {
        console.log(error);
    }
});

app.get("/serie", async (req, res) => {
    try {
        const response = await axios.get(`${url}/events?ts=${time}&apikey=${publicKey}&hash=${hash}&limit=70`);
        console.log(response.data.data.results);
        const filteredResults = response.data.data.results.filter(character => {
            return !character.thumbnail.path.includes("/image_not_available");
        });
        res.render("serie.ejs", {
            id : filteredResults
        });
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})