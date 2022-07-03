import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import rootRouter from "./routes/index.js";
import bodyParser from "body-parser";
import { Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";

const PORT = process.env.PORT || 3004;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// CORS policy
app.use(cors({ origin: false }));
// Connect all routes
app.use("/api", rootRouter);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

const http = new HttpServer(app);
const io = new SocketServer(http, { cors: { origin: "*" } });

(async function start() {
  try {
    await mongoose.connect("mongodb://root:qwe123@localhost:27017/cryptopult", {
      useNewUrlParser: true,
    });

    http.listen(PORT, () => {
      console.log("Server has been started on port", PORT);
    });

    io.on("connection", (socket) => {
      console.log("user connected");

      socket.on("getAvailableExchanges", (_, callback) => {
        callback({ data: ["exmo", "binance"] });
      });

      socket.on("getAllExchangePairs", (args, callback) => {
        const { exchangeName } = args;
        callback({ data: ["exmo", "binance"] });
      });

      socket.on("getExchangeMarketByPairs", (args, callback) => {
        const { exchangeName, pairs } = args;

        callback({ data: ["exmo", "binance"] });
      });

      socket.on("disconnect", function () {});
    });
  } catch (e) {
    console.log("Error", e);
  }
})();
