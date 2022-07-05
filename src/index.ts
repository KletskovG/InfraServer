import bodyParser from "body-parser";
import express from "express";
import router from "api/router";
import { getEnvVariable } from "utils/getEnvVariable";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(router);

app.listen(getEnvVariable("PORT"), () => {
  console.log(
    `Infra server is up and running
      http://localhost:${getEnvVariable("PORT")}`
  );
});
