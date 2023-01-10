import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { buildRouter } from "api/router";
import { getEnvVariable } from "utils/getEnvVariable";
import {
  log,
} from "logger/logger";
// import { connectKrakenDB } from "kraken";
import { getPairInfo } from "kraken/marketapi/getPairInfo";
import { getCurrentBalance } from "kraken/marketapi/getCurrentBalance";
import { KRAKEN_ACTIVE_PAIR } from "./const";

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
  const result = await getPairInfo(KRAKEN_ACTIVE_PAIR);
  console.log(result);

  const balance = await getCurrentBalance();
  console.log(balance);
};

getInfo();
// connectKrakenDB()
//   .then(() => {
//     getStakebleList();
//   })
//   .catch(error => {
//     console.log("DB ERROPR");
//     console.log(error);
//   });
