// Express
const express = require("express")
const app = express();

// Mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/BlogManagement");

// BLog_Setup Middleware
const isBlog = require('./middlewares/isBlog');
app.use(isBlog.isBlog);

// Admin Route Setup Middleware
const admin_route = require("./routes/adminRoute");
app.use('/', admin_route);

const user_route = require("./routes/userRoute");
app.use('/', user_route)

const blog_route = require("./routes/blogRoute");
app.use('/', blog_route)

// Listenning App 
app.listen(3000, () => {
    console.log("Server is running...");
});