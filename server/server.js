// FOR ENV FILE
require('dotenv').config()

// FOR EXPRESS
const express = require("express");
const db = require("../server/database");
const app = express();
const axios = require("axios")


// SO ONE DOMAIN CAN BE QUERIED BY ANOTHER
const cors = require("cors");
app.use(cors());


// ATTACHES BODY OF JSON FILE TO REQ OBJECT FOR CRUD FUNCTIONS
app.use(express.json());

// DEFINE PORT
const port = process.env.PORT || 3001;

// GET CURRENT WEATHER FOR A LOCATION VIA OWM
app.get
(
    "/api/v1/weather/:latitude/:longitude", async (req, res) =>
    {
        try 
        {
            const {data} = await axios({
                method: "get",
                url: `https://api.openweathermap.org/data/2.5/weather?lat=${req.params.latitude}&lon=${req.params.longitude}&appid=${process.env.OWMKEY}&units=imperial`
            });
            res.json(data);
    
        }
        catch (error)
        {
            console.log(error);
        }
    }
)

// GET 5 DAY FORECAST FOR A LOCATION VIA OWM
app.get
(
    "/api/v1/forecast/:latitude/:longitude", async (req, res) =>
    {
        try 
        {
            const {data} = await axios({
                method: "get",
                url: `https://api.openweathermap.org/data/2.5/forecast?lat=${req.params.latitude}&lon=${req.params.longitude}&appid=${process.env.OWMKEY}&units=imperial&`
            });
            res.json(data);
    
        }
        catch (error)
        {
            console.log(error);
        }
    }
)

// GET 5 DAY HISTORY FOR A LOCATION VIA OWM
app.get
(
    "/api/v1/history/:latitude/:longitude", async (req, res) =>
    {
        try 
        {
            const {data} = await axios({
                method: "get",
                url: `https://api.openweathermap.org/data/2.5/history/city?lat=${req.params.latitude}&lon=${req.params.longitude}&appid=${process.env.OWMKEY}&units=imperial&`
            });
            res.json(data);
    
        }
        catch (error)
        {
            console.log(error);
        }
    }
)

// RANDOM GET MAP
app.get
(
    "/map", async (req, res) =>
    {
       try
       {
            const {data} = await axios({
            method: "get",
            url: 'https://maps.googleapis.com/maps/api/staticmap?center=40.714%2c%20-73.998&zoom=12&size=400x400&key=' + process.env.GMKEY,
            });
            res.json(data);
       }
       catch (error)
       {
            console.log(error);
       } 
    }
)

// GET A SPECIFIC PLACE
app.get
(
    "/place", async (req, res) =>
    {
       try
       {
            const {data} = await axios({
            method: "get",
            url: 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=burgers+chelsea+manhattan+new+york+city&type=restaurant&key=' + gKey,
            });
            res.json(data);
       }
       catch (error)
       {
            console.log(error);
       } 
    }
)

//STARTUP
app.listen
(port, () => 
    {
        console.log(`SERVER UP ON PORT ${port}`);
    }
);

// GET ALL LOCATIONS
app.get
(
    "/api/v1/locations", async (req, res) =>
    {
        try
        {
            const results = await db.query
            ("SELECT locations.id, locations.name, locations.category, locations.latitude, locations.longitude, locations.country, states.name  AS state \
            FROM locations, states \
            WHERE locations.state_id = states.id \
            ORDER BY states.name");

            res.status(200).json
            ({
                status: "success",
                results: results.rows.length,
                data:
                {
                    locations: results.rows
                }
            })
        }
        catch (error)
        {
            console.log(error);
        }
    }
);


// GET ALL LOCATIONS FROM A SPECIFIC STATE
app.get
(
    "/api/v1/locations/fromstate/:state", async (req, res) =>
    {
        try 
        {
            const results = await db.query
            ("SELECT locations.id, locations.name, locations.category, locations.latitude, locations.longitude, locations.country, states.name AS state FROM locations, states \
            WHERE locations.state_id = states.id \
            AND states.name = $1", [req.params.state]);
            res.status(200).json
            ({
                status: "success",
                data:
                {
                    locations: results.rows
                }
            });
        }
        catch (error)
        {
            console.log(error);
        }
    }
);

// GET ALL STATES
app.get
(
    "/api/v1/locations/states", async (req, res) =>
    {
        try 
        {
            const results = await db.query("SELECT name FROM states");

            res.status(200).json
            ({
                status: "success",
                states: results.rows
            });
        }
        catch (error)
        {
            console.log(error);
        }
    }
);

// GET ALL LOCATIONS OF A SPECIFIC CATEGORY
app.get
(
    "/api/v1/locations/fromcategory/:category", async (req, res) =>
    {
        try 
        {
            const results = await db.query("SELECT * FROM locations where category = $1", 
            [req.params.category]);

            res.status(200).json
            ({
                status: "success",
                data:
                {
                    locations: results.rows
                }
            });
        }
        catch (error)
        {
            console.log(error);
        }
    }
);

// GET A SPECIFIC LOCATION
app.get
(
    "/api/v1/locations/:id", async (req, res) =>
    {
        try 
        {
            const results = await db.query
            ("SELECT locations.id, locations.name, locations.category, locations.latitude, locations.longitude, locations.country, states.name AS state FROM locations, states \
            WHERE locations.id = $1 AND states.id = locations.state_id", 
            [req.params.id]);

            res.status(200).json
            ({
                status: "success",
                data:
                {
                    location: results.rows[0]
                }
            });
        }
        catch (error)
        {
            console.log(error);
        }
    }
);


// CREATE A NEW LOCATION
app.post
(
    "/api/v1/locations", async (req, res) =>
    {
        try
        {
            const results = await db.query("INSERT INTO locations (name, category, latitude, longitude, state, country",
            [req.body.name, req.body.category, req.body.latitude, req.body.longitude, req.body.state, req.body.country]);
            
            res.status(201).json
            ({
                status: "success",
                data:
                {
                    location: results.rows[0],
                }
            })
        }
        catch (error)
        {
            console.log(error);
        }
    }
);

// UPDATE A LOCATION
app.put
(
    "/api/v1/locations/:id", async (req, res) =>
    {
        try
        {
            const results = await db.query("UPDATE restaurants SET name = $1, category = $2, latitude = $3, longitude = $4, state = $5, country = $6 WHERE id = $7 returning *", 
            [req.body.name, req.body.category, req.body.latitude, req.body.longitude, req.body.state, req.body.country, req.params.id]);

            //console.log(results);

            res.status(200).json
            ({
                status: "success",
                data:
                {
                    restaurant: results.rows[0],
                }
            })
        }

        catch (error)
        {
            console.log(error);
        }
    }
);

// DELETE A LOCATION
app.delete
(
    "/api/v1/locations/:id", async (req, res) =>
    {
        try
        {
            const results = await db.query("DELETE from locations WHERE id = $1",
            [req.params.id]);

            res.status(200).json
            ({
                status: "success",
            })
        }

        catch (error)
        {
            console.log(error);
        }
    }
);