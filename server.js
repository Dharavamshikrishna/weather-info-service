const express = require('express');
const http = require('http');
const url = require('url');

const app = express();
const port = 3010;

//Weatherstack API key
const API_KEY = '1a260754fd15f039730fd064518c1a04'; 


// app.get('/api/hello', (req, res) => {
   
//     res.json({ message: 'Hello, world!' });
//   });
app.get('/api/weather/:location', (req, res) => {
    const location = req.params.location;

    
    const apiUrl = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${location}`;

   
    http.get(apiUrl, (apiRes) => {
        let data = '';

        
        apiRes.on('data', (chunk) => {
            data += chunk;
        });

       
        apiRes.on('end', () => {
            
            res.json({message:"weather report fetched successfully", data:JSON.parse(data)});
        });

    }).on('error', (err) => {
        console.error(err);
        res.status(500).send('Error fetching weather data');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
