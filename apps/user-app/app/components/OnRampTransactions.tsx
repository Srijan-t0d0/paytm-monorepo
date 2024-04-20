import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center py-8 dark:text-slate-400">
          No Recent transactions
        </div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div className="pt-2 flex flex-col gap-3">
        {transactions.map((t) => (
          <div className="flex justify-between">
            <div>
              <div className="text-sm dark:text-slate-100">Received INR</div>
              <div className="text-slate-600 dark:text-slate-400 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center dark:text-[#9d74fb]">
              + Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
