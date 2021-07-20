const express = require("express");
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const authRoute = require('./routes/auth');
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const catsRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

// CREATE SERVER
const app = express();
app.use(express.json())

// Connect to DB

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true
 }).then(
   console.log("Connected to DB")
 ).catch(err => console.log(err));





// MULTER 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "client/public/images")
  }, filename: (req, file, cb) => {
    cb(null, req.body.name)
  }
})

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req, res) =>{
  res.status(200).json("file has been uploaded")
})

// // Middleware
// app.use(express.static('client/public'));

// ROUTES
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute )
app.use("/api/posts", postsRoute)
app.use("/api/categories", catsRoute)


// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000 

app.listen(PORT, () => {
  console.log("backend is running")
})