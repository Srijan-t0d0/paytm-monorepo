import { NextResponse } from "next/server";
import { PrismaClient } from "@repo/db/client";

const client = new PrismaClient();

export const GET = async () => {
  try {
    await client.user.create({
      data: {
        email: "asd",
        name: "adsads",
      },
    });
  } catch (error) {
    return NextResponse.json({
      message: error,
    });
  }
  return NextResponse.json({
    message: "hi there",
  });
};
