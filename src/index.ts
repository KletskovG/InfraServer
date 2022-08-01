import bodyParser from "body-parser";
import express from "express";
import router from "api/router";
import { getEnvVariable } from "utils/getEnvVariable";
import { sendNotification } from "telegram";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(router);

const PORT = getEnvVariable("PORT");
app.listen(PORT, () => {
  console.log(
    `Infra server is up and running
      http://localhost:${PORT}`
  );
  sendNotification("Infra server is booted");
});
