require("dotenv").config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var chatRoomsRouter = require("./routes/chatRooms");

var app = express();
const server = require("http").Server(app);
// const io = require("socket.io")(server);
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",    
      methods: ["GET", "POST"],
    },
  });


io.on("connection", (socket) => {
    console.log("We have a new connection!!");

    socket.on("disconnect", () => {
        console.log("User has left!!!");
    })
})


// connect to mongodb
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => console.log("connected to mongodb"))
  .catch((err) => console.log(err.message));

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/chatRooms", chatRoomsRouter);

app.use((req, res, next) => {
  res.io = io;
  next();
});

module.exports = { app, server };
