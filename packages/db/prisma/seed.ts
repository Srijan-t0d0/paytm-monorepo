import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { number: "1111111111" },
    update: {},
    create: {
      number: "111111111",
      password: "password",
      name: "user1",
      Balance: {
        create: {
          amount: 20000,
          locked: 0,
        },
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "token___1",
          provider: "HDFC bank",
        },
      },
    },
  });
  const user2 = await prisma.user.upsert({
    where: { number: "0000000000" },
    update: {},
    create: {
      number: "0000000000",
      password: "password",
      name: "user2",
      Balance: {
        create: {
          amount: 2000,
          locked: 0,
        },
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 2000,
          token: "token___2",
          provider: "HDFC bank",
        },
      },
    },
  });
  console.log(user1, user2);
}
main().then(async () => {
  prisma.$disconnect();
});
