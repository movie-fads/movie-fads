const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const PORT = 3000;
const userController = require("./controllers/userController.js");
// const dotenv = require('dotenv')
// const {OAuth2Client} = require('google-auth-library')
// const { REACT_APP_GOOGLE_CLIENT_ID } = require('../client/constants/private.js')

// dotenv.config()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../build")));

app.post('/api/google-login', userController.GoogleAuth, userController.createUser, userController.setCookie, (req, res) => {
  const { name, picture } = res.locals
  return res.status(201).json({ name, picture })
})

// handle rerouting to login page
app.get('/app', (req, res) => {
  return res.redirect('/')
});

// NEED CONTROLLER
const MONGO_URI =
  "mongodb+srv://chloecourt:moviefads@cluster0.2rbmk.mongodb.net/moviefads?retryWrites=true&w=majority";
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "moviefads",
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// ROUTE HANDLERS
//add POST USER endpoint to add new user to database
app.post("/user", userController.createUser, (req, res) => {
  return res.status(200).json(res.locals.createUser);
});

app.get('/verifyUser/:email',userController.verifyUser, (req, res)=> {
  return res.status(200).json(res.locals.user); 
}); 

//add GET USER endpoint
app.get("/:username", userController.getUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

//remote DELETE USER endpoint
app.delete("/:username", userController.deleteUser, (req, res) => {
  return res.status(200).send(`User Deleted! : ${res.locals.deleteUser}`);
});

//add PUT Media endpoint to update user's media list array
app.put("/:username", userController.addMedia, (req, res) => {
  return res.status(200).json(res.locals.addedMedia);
});

app.put("/changeMedia/:username", userController.updateMedia, (req, res) => {
  return res.status(200).json(res.locals.updatedMedia);
});


//add to movie to favorites
// app.put("/addFavorite/:id/:userId", userController.addMedia, userController.updateMedia, (req, res) => {
//   return res.status(200).json(res.locals.newFavorite);
// });

// Unknown route handler
// app.get("*", (req, res) => res.redirect('/'));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
