import { connect } from "@/dbconfig/db";
import User from "@/models/userSchema";
import { getUserFromtoken } from "@/utils/getUserFromToken";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connect();
  let id = await getUserFromtoken(req);

  let user = await User.findOne({ _id: id });

  return NextResponse.json({ data: user }, { sucess: true });
}
