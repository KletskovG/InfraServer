import bodyParser from "body-parser";
import express from "express";
import { buildRouter } from "api/router";
import { getEnvVariable } from "utils/getEnvVariable";
import { sendNotification } from "telegram";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(buildRouter());

const PORT = getEnvVariable("PORT");
console.log(PORT);
app.listen(PORT, () => {
  console.log(
    `Infra server is up and running // UPDATED
      http://localhost:${PORT}`
  );
  sendNotification("Infra server is booted with deploy command");
});
