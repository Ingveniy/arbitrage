import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import rootRouter from "./routes/index.js";
import bodyParser from "body-parser";
import { Server as HttpServer } from "http";
import { Server as HttpsServer } from "https";
import { Server as SocketServer } from "socket.io";
import ccxt from "ccxt.pro";

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
const https = new HttpsServer(app);

const io = new SocketServer(
  process.env.NODE_ENV === "production" ? https : http,
  { cors: { origin: "*" } }
);

(async function start() {
  try {
    await mongoose.connect("mongodb://root:qwe123@localhost:27017/cryptopult", {
      useNewUrlParser: true,
    });

    http.listen(PORT, () => {
      console.log("Server has been started on port", PORT);
      console.log(io, "io");
    });

    // ccxt module
    io.on("connection", (socket) => {
      console.log("user connected");

      socket.on("getAvailableExchanges", async (_, callback) => {
        const exhanges = await ccxt.exchanges;

        callback({ data: exhanges });
      });

      socket.on("getAllExchangePairs", async (args, callback) => {
        const { exchangeName } = args;
        let exchange = new ccxt[exchangeName]();
        const markets = await exchange.loadMarkets();
        const symbols = await Object.keys(markets);

        callback({ data: symbols });
      });

      socket.on("getExchangeMarketByPairs", async (args, callback) => {
        const { exchangeName, pairNames } = args;
        let exchange = new ccxt[exchangeName]();
        const response = await exchange.fetchTickers(pairNames);

        callback({ data: response });
      });

      socket.on("disconnect", function () {});
    });
  } catch (e) {
    console.log("Error", e);
  }
})();
