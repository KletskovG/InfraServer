import { log } from "logger/logger";
import { Balance } from "kraken/db/models/balance";
import { Deal } from "kraken/db/models/Deal";
import { getCurrentBalance } from "kraken/marketapi/getCurrentBalance";
import { getOpenOrders } from "kraken/marketapi/getOpenOrders";
import { getClosedOrders } from "kraken/marketapi/getClosedOrders";
import { IBalanceModel } from "types/kraken/IBalanceModel";
import { ILastDealModel } from "types/kraken/ILastDealModel";
import { IOrder } from "types/kraken/IKrakenResponse";

type TInitialInfo = {
  balance: IBalanceModel,
  lastDeal: ILastDealModel,
  activeOrder: IOrder,
  lastOrder: IOrder,
  // prices
}

export async function getInitialInfo() {
  const currentMarketBalance = await getCurrentBalance();
  const currentBalance = await Balance.findOne({});
  const info: Partial<TInitialInfo> = {};

  info.balance = currentBalance;

  // Create balance if it dont exists
  if (!currentBalance && currentMarketBalance) {
    const balance: IBalanceModel["currency"] = [];
    const topups = 0;

    for (const [name, value] of Object.entries(currentMarketBalance)) {
      balance.push({
        name,
        value,
      });
    }

    const preparedBalance = {
      currency: balance,
      topups,
    };

    Balance.create(preparedBalance);
    log("Info", `KRAKEN: Create new Balance ${JSON.stringify({currentMarketBalance, topups})}`);

    info.balance = preparedBalance;
  }

  const activeOrder = await getOpenOrders();
  const closedOrders = await getClosedOrders(0);

  if (closedOrders?.closed) {
    const lastOrderId = Object.keys(closedOrders.closed)[0];
    const lastOrder = closedOrders.closed[lastOrderId];
    info.lastOrder = lastOrder;
  }

  if (activeOrder?.open) {
    const currentOrderId = Object.keys(activeOrder.open)[0];
    info.activeOrder = activeOrder.open[currentOrderId];
  }

  const lastDeal = await Deal.findOne({});

  if (lastDeal) {
    info.lastDeal = lastDeal;
  }

  log("Info", `KRAKEN: getInitialInfo: ${info}`);
  return info;
}
