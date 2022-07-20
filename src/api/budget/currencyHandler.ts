import { Request, Response } from "express";
import got from "got";

const cbrCourseUrl = "http://www.cbr.ru/scripts/XML_daily.asp?date_req=";

type TCurrencyResult = {
  currencyName: string;
  date: string;
  value: string;
}

type CurrencyRequestParams = {
  currency: string;
  month: string;
  year: string;
}

type CurrencyRequestQuery = {
  date?: string;
}

type CurrencyRequest = Request<CurrencyRequestParams, any, any, CurrencyRequestQuery>;

export async function currencyHandler(req: CurrencyRequest, res: Response): Promise<TCurrencyResult[]> {
  const { currency, month, year } = req.params;
  const { date } = req.query;

  const currentDate = new Date();
  const result: TCurrencyResult[] = [];

  const fetchLinks: string[] = [];

  const START_OF_MONTH = 1;

  const endDate = date ? Number(date) : currentDate.getDate();

  for (let i = START_OF_MONTH; i <= endDate; i ++) {
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
    fetchLinks.push(link);
  }

  const data: TCurrencyResult[] | [] = await Promise.all(
    fetchLinks.map(link => {
      console.log(`FETCHING ${link}`);
      return got(link);
    }),
  )
    .then(responses => {
      return responses.map<TCurrencyResult>((data, index) => ({
        currencyName: currency.toUpperCase(),
        date: `${index + 1}/${month}/${year}`,
        value: getCurrencyValue(data.body, currency),
      }));
    })
    .catch(() => []);

  res.status(200).send(JSON.stringify(data));
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
