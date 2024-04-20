import express from "express";
import db from "@repo/db/client";
const app = express();
const PORT = 3003;

interface PaymentInfo {
  token: string;
}

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
  console.log(req.body);

  const paymentInfo: PaymentInfo = {
    token: req.body.token,
  };
  try {
    let tempTransaction = await db.onRampTransaction.findFirst({
      where: { token: paymentInfo.token },
    });
    if (!tempTransaction) {
      res.status(404).json({ message: "transaction does not exists" });
    }
    if (tempTransaction?.status === "Processing") {
      const updatedTransaction = await db.$transaction([
        db.balance.updateMany({
          where: { userId: Number(tempTransaction.userId) },
          data: {
            amount: {
              increment: Number(tempTransaction.amount),
            },
          },
        }),

        db.onRampTransaction.updateMany({
          where: {
            token: paymentInfo.token,
          },
          data: {
            status: "Success",
          },
        }),
      ]);
      res.json({
        message: "Captured",
      });
    } else {
      res
        .status(200)
        .json({ message: `transaction status is ${tempTransaction?.status}` });
    }
  } catch (error) {
    console.log(error);
    console.log("error");
  }
});

app.listen(PORT, () => {
  console.log(`Webhook server is running on ${PORT}`);
});
