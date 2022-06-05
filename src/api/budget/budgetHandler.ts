import { Request, Response } from "express";

export function budgetHandler(req: Request, res: Response) {
  const { category, column } = req.params;

  const startCell = 2;
  const endCell = 32;
  const courseColumn = "L";
  let sum = "SUM(\n";

  for (let i = startCell; i < endCell; i++) {
    sum += `(${column}${i}*${courseColumn}${i});\n`;
  }

  sum += ")";

  const result = `
        CONCATENATE(
            "${category} ";
            ${sum}
        )
    `;

  res.status(200).send(result);
}
