import { Request, Response } from "express";
import got from "got";

const cbrCourseUrl = "http://www.cbr.ru/scripts/XML_daily.asp?date_req=";

type TCurrencyResult = {
  currencyName: string;
  date: string;
  value: string;
}

export async function currencyHandler(req: Request, res: Response): Promise<TCurrencyResult[]> {
  const { currency, month, year } = req.params;
  const date = new Date();
  const result: TCurrencyResult[] = [];

  for (let i = 1; i <= date.getDate(); i++) {
    let day = `${i}`;
    let requestMonth = `${month}`;

    if (i < 10) {
      day = `0${day}`;
    }

    if (Number(requestMonth) < 10) {

      requestMonth = `0${requestMonth}`;
    }

    const requestDate = `${day}/${requestMonth}/${year}`;
    const link = `${cbrCourseUrl}${requestDate}`;
    console.log(`Fetching currency for ${link}`);

    const data = await got(`${cbrCourseUrl}${requestDate}`);
    const currencyValue = getCurrencyValue(data.body, currency.toUpperCase());

    result.push({
      currencyName: currency.toUpperCase(),
      date: requestDate,
      value: currencyValue,
    });
  }

  res.status(200).send(JSON.stringify(result));
  return result;
}

function getCurrencyValue(serverCtx: string, currencyName: string): string {
  const currencyIndex = serverCtx.indexOf(currencyName);

  if (currencyIndex === -1) {
    return "0";
  }

  const currencyString = serverCtx.slice(currencyIndex);
  const valueStart = currencyString.indexOf("<Value>");
  const valueEnd = currencyString.indexOf("</Value>");

  if (valueStart === -1 || valueEnd === -1) {
    return "0";
  }

  return currencyString.slice(valueStart + 7, valueEnd);
}
