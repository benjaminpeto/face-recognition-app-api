const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const { response } = require("express");
require('dotenv').config();

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    connectionString: 'postgres://uuqpmvqpwvllob:f6eb05750ad08fdf4fae41294c6e3f1988d69e8d5cee5a79a841c5e71dcce8f4@ec2-23-21-4-7.compute-1.amazonaws.com:5432/d34tudd9ehfqcr',
    ssl: true
  },
});

const app = express();

// bodyParser, midware (has to be after express was called)

app.use(express.json());
app.use(cors());

// ROOT

app.get("/", (req, res) => {
  res.send("success");
});

// SIGN IN

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

// REGISTER

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

// PROFILE

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

// IMAGE

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

// CLARIFAI API

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

// PORT

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port: ${process.env.PORT}`);
});

/*
    STRUCTURE

/                --> res = this is working
/signin          --> POST = success/fail
/register        --> POST = user 
/profile/:userId --> GET = user
/image           --> PUT = user

*/
