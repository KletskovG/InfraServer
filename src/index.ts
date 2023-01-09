import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { buildRouter } from "api/router";
import { getEnvVariable } from "utils/getEnvVariable";
import {
  log,
} from "logger/logger";
// import { connectKrakenDB } from "kraken";
// import { getCurrentBalance } from "kraken/marketapi/getCurrentBalance";
// import { getStakebleList } from "kraken/marketapi/getStakebleList";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(buildRouter());
app.use(cors());

const PORT = getEnvVariable("PORT") || 3000;
console.log(PORT);
app.listen(PORT, () => {
  log(
    "Important",
    `Infra server is up and running http://localhost:${PORT}`
  );
});

// connectKrakenDB()
//   .then(() => {
//     getStakebleList();
//     getCurrentBalance();
//   })
//   .catch(error => {
//     console.log("DB ERROPR");
//     console.log(error);
//   });
