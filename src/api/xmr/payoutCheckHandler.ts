import { Response, Request } from "express";
import  { sendNotification } from "telegram/bot";
import got from "got";

const lastShareRegExp = new RegExp(/<tr>/g);
const shareListUrl = "https://mini.p2pool.observer/payouts/47bypsmSDWV4eReaVDQPH6MpyyxLQQvd99fKNmVFN1HzBW7XNALQAWPNyn3FUVegsJN9obEYiJWSx6Bb5KpbcUcF2YK1hhn";


let lastPayout = "";
scanLastPayout(true);

export async function payoutCheckHandler(_: Request, res: Response) {
  res.status(200).send("OK");
  try {
    await scanLastPayout();
  } catch (error) {
    sendNotification(`ERROR \n /xmr/share \n ${error}`);
  }
}

async function scanLastPayout(isBootCall = false) {
  const {body} = await got(shareListUrl);
  const lastShareIndex = [...body.matchAll(lastShareRegExp)][1]?.index || 0;
  if (lastShareIndex) {
    updatePayoutStr(body, lastShareIndex, isBootCall);
  }
}

function updatePayoutStr(
  body: string,
  lastShareIndex: number,
  isBootCall: boolean,
) {
  const result = body.slice(lastShareIndex);
  const endOfShareLineIdx = result.indexOf("</a></th>");
  if (endOfShareLineIdx !== -1) {
    const lastShareLine = result.slice(0, endOfShareLineIdx);

    if (lastPayout !== lastShareLine && !isBootCall) {
      lastPayout = lastShareLine;
      sendNotification(`!!! New payout ${shareListUrl}`);
    }
  }
}
