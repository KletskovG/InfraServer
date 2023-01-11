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
  // const result = await getPairInfo(KRAKEN_ACTIVE_PAIR);
  // console.log(result);

  // const balance = await getCurrentBalance();
  // console.log(balance);

  // const closedOrders = await getClosedOrders(0);
  // console.log(closedOrders);

  // const openOrders = await getOpenOrders();
  // console.log(openOrders);

  // const balance = await getCurrentBalance();
  // const currentPrice = await getPairInfo(KRAKEN_ACTIVE_PAIR);
  // console.log("CURRENT PRICE");
  // console.log(currentPrice[KRAKEN_ACTIVE_PAIR])

  // const balanceToBuy = ceilNumber(balance.ZEUR, 2) * KRAKEN_BALANCE_BUY;
  // console.log("BALANCE TO BUYT", balanceToBuy);
  // const buyAmount = ceilNumber(balanceToBuy, 2) / ceilNumber(currentPrice[KRAKEN_ACTIVE_PAIR].price, 6);
  // console.log(buyAmount);
  // const addOrderResult = await addOrder({
  //   validate: false,
  //   type: "buy",
  //   ordertype: "market",
  //   volume: String(ceilNumber(buyAmount, 4)),
  //   pair: KRAKEN_ACTIVE_PAIR,
  // });
  // console.log(addOrderResult);

  // const buyPrice = 74.71;
  // const balance = await getCurrentBalance();
  // const addOrderResult = await addOrder({
  //   type: "sell",
  //   validate: false,
  //   ordertype: "take-profit",
  //   volume: String(balance.XLTC),
  //   pair: KRAKEN_ACTIVE_PAIR,
  //   price: String(ceilNumber(buyPrice * KRAKEN_PROFIT, 2)),
  // });
  // log("Important", `Set Take profit order: ${JSON.stringify(addOrderResult.descr)} TXID: ${addOrderResult.txid}`);

  // const result = await cancelAllOrders();
  // console.log(result)
};

getInfo();
connectKrakenDB()
  .then(() => {
    log("Important", "KRAKEN DB CONNECTED");
  })
  .catch(error => {
    log("Error", `DB ERROR: ${JSON.stringify(error.message)}`);
  });
