import { Request, Response, NextFunction } from "express";

import accountSchema from "../schemas/user.schema";

export default async function middlwares(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const rToken = request.cookies.token;

  // Import Account Details
  const account = await accountSchema.findOne({ rToken, isBanned: false });

  // set isAuthorized property
  if (account) {
    // request["isAuthorized"] = true;
    // request.isAuthorized = true;
    // see express/index.d.ts
    return;
  }

  // set account property
  //   if (account) request.account = account;
  // request.coolk
  return next();
}
