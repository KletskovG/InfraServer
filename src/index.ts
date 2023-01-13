import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { buildRouter } from "api/router";
import { getEnvVariable } from "utils/getEnvVariable";
import {
  log,
} from "logger/logger";
import { connectKrakenDB } from "kraken";
// import { monitorOrders } from "kraken/core/orders/monitorOrders";

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

connectKrakenDB()
  .then(() => {
    log("Important", "KRAKEN DB CONNECTED");
    // monitorOrders();
  })
  .catch(error => {
    log("Error", `DB ERROR: ${JSON.stringify(error.message)}`);
  });
