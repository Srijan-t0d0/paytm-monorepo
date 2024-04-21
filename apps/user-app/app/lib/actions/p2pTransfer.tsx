"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: string) {
  console.log(new Date());
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;
  if (!from) {
    return {
      message: "Error while sending amount",
    };
  }
  const toUser = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });
  if (!toUser) {
    return {
      message: "User not found",
    };
  }
  await prisma.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
    const fromBalance = await tx.balance.findUnique({
      where: { userId: Number(from) },
    });
    if (!fromBalance || fromBalance.amount < Number(amount)) {
      throw new Error("Insufficient funds");
    }
    await new Promise((r) => setTimeout(r, 4000));
    await tx.balance.update({
      where: { userId: Number(from) },
      data: { amount: { decrement: Number(amount) } },
    });

    await tx.balance.update({
      where: { userId: toUser.id },
      data: { amount: { increment: Number(amount) } },
    });

    await tx.p2pTransfer.create({
      data: {
        amount: Number(amount),
        timestamp: new Date(),
        fromUserId: Number(from),
        toUserId: toUser.id,
      },
    });
  });
}
