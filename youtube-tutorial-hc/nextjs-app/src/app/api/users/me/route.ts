import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connectToMongo } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connectToMongo();

export const GET = async (request: NextRequest) => {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    return NextResponse.json({ message: "User found!", user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
