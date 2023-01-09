import { Response } from "express";
import { readLogs } from "logger/logger";
import { IRequest } from "src/types";

type TReadLogsQuery = {
  since: string;
}

export async function readLogsHandler(req: IRequest<any, TReadLogsQuery>, res: Response) {
  const sinceMinutes = Number(req.query.since) || 0;
  const logs = await readLogs(sinceMinutes ? sinceMinutes : undefined);

  res.send(JSON.stringify(logs));
}
