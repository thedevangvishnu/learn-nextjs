import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getDataFromToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);

    return (decoded as JwtPayload).id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
