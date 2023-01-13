import { getOpenOrders } from "kraken/marketapi/getOpenOrders";
import { getClosedOrders } from "kraken/marketapi/getClosedOrders";
import { Deal } from "kraken/db/models/deal";
import { log } from "logger/logger";
import type { IOrder } from "types/kraken/IKrakenResponse";
import type { Document } from "mongoose";
import type { IDealModel } from "types/kraken/ILastDealModel";
import { getPairInfo } from "kraken/marketapi/getPairInfo";

export async function monitorOrders() {
  const openOrders = await getOpenOrders();
  const closedOrders = await getClosedOrders();
  const ordersToMonitor = await Deal.find({});


  findSuccessDeals(closedOrders.closed, ordersToMonitor);
  console.log(openOrders);
  checkStatusOfOpenOrders(openOrders.open, ordersToMonitor);
  return;
}

function findSuccessDeals(
  closedOrders: Record<string, IOrder> | null,
  ordersToMonitor: (Document<unknown, any, IDealModel> & IDealModel)[] | null,
) {
  if (!closedOrders || !ordersToMonitor) {
    return;
  }

  const closedOrderKeys = Object.keys(closedOrders);

  ordersToMonitor.forEach(order => {
    const isDesiredOrderClosed = closedOrderKeys.some(key => key === order.orderId);

    if (isDesiredOrderClosed) {
      const closedOrder = closedOrders[order.orderId];
      const profit = ((Number(closedOrder.cost) - Number(closedOrder.fee)) / order.buyPrice).toFixed(2);
      log("Important", `SUCCESS DEAL: ${order.ticker} +${profit}`);
    }
  });
}

async function checkStatusOfOpenOrders(
  openOrders: Record<string, IOrder> | null,
  ordersToMonitor: (Document<unknown, any, IDealModel> & IDealModel)[] | null,
) {
  if (!openOrders || !ordersToMonitor) {
    return;
  }
  const pairs = ordersToMonitor.map(order => order.ticker).join(",");
  const orderPrices = await getPairInfo(pairs);
  console.log(orderPrices);
}
