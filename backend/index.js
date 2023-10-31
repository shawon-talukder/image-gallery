// dependencies
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const imageRouter = require("./routes/imageRouter");

// internal dependencies

// model scaffolding
const app = express();

// configuration
dotenv.config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("short"));

// routes
app.use("/api/v1/image", imageRouter)

// server port
app.listen(port, ()=>{
    console.log(`app listening on port: http://localhost:${port}`);
})
