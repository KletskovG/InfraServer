import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { buildRouter } from "api/router";
import { getEnvVariable } from "utils/getEnvVariable";
import {
  log,
} from "logger/logger";
import { connectKrakenDB } from "kraken";


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

app.use(buildRouter());

const PORT = getEnvVariable("PORT") || 3000;
console.log(PORT);
app.listen(PORT, () => {
  log(
    "Important",
    `Infra server is up and running http://localhost:${PORT}`
  );
});

const getInfo = async () => {
  // const result = await getPairInfo("");
  // const currentTimestamp = Math.floor(new Date().getTime() / 1000);
  // const tickers: IPriceModel[] = [];
  // for (const [ticker, value] of Object.entries(result)) {
  //   tickers.push({
  //     ticker,
  //     price: value.price,
  //     timestamp: currentTimestamp,
  //   });
  // }

  // Price.insertMany(tickers)
  //   .then((result) => {
  //     log("Important", );
  //   })
  //   .catch(err => {
  //     log("Error", JSON.stringify(err));
  //   })
};


connectKrakenDB()
  .then(() => {
    log("Important", "KRAKEN DB CONNECTED");
    getInfo();
  })
  .catch(error => {
    log("Error", `DB ERROR: ${JSON.stringify(error.message)}`);
  });
