import  { Response } from "express";
import { scrapeStoreAvailability } from "scrapper/ecom";
import { sendNotification } from "telegram";

export function monitorHandler(_, res: Response) {
  try {
    scrapeStoreAvailability()
      .then(result => {
        if (result) {
          const antalyaStores = result.filter(el => {
            return el.includes("ANTALYA");
          })
            .map(el => el.replace(/\n/g, "").trim())
            .map(el => {
              const nameOfStoreIndex = el.indexOf("  ");
              const amountTemp = el.slice(0, -22);
              const amountIndex = amountTemp.lastIndexOf("  ");
              const amount = amountTemp.slice(amountIndex);

              return `
              STORE: \n ${el.slice(0, nameOfStoreIndex)} \n Amount: \n ${amount}
            `;
            });

          console.log("RESULT");
          console.log(result);

          const message = `
            Link: https://ux.mediamarkt.com.tr/stok-takip/index.html?id=1218695

            http://localhost:3000/monitor
            ${antalyaStores.join()}
          `;

          sendNotification(message);
          res.status(200).send(message);
          return;
        }

        res.status(200).end();
      })
      .catch(() => {
        res.status(500).send("scrape store error");
      });
  } catch (error) {
    res.status(500).send(error);
  }
}
