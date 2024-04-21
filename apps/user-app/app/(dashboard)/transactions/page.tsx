import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session.user?.id) {
    return <div>Refresh the page</div>;
  }
  const userId = Number(session.user.id);
  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      OR: [{ fromUserId: userId }, { toUserId: userId }],
    },
  });

  console.log(transactions);
  if (!transactions) {
    return <div>You have no transactions</div>;
  }

  return (
    <div className="flex flex-col pt-10  w-full items-center divide-y-2  divide-slate-600">
      {transactions.map((t) => {
        if (t.fromUserId === userId) {
          return (
            <div className="dark:text-red-400 text-red-700 flex justify-between w-[50vw] py-2">
              <div>
                <div className="text-xl font-semibold">Sent</div>
                <div className="text-xs font-light text-red-500 text-opacity-75">
                  {t.timestamp.toLocaleString()}
                </div>
              </div>
              <div>Rs {t.amount / 100}</div>
            </div>
          );
        } else {
          return (
            <div className="dark:text-green-400 text-green-700 flex justify-between w-[50vw] py-2">
              <div>
                <div className="text-xl font-semibold">Recived</div>
                <div className="text-xs font-light text-green-600">
                  {t.timestamp.toLocaleString()}
                </div>
              </div>
              <div>Rs {t.amount / 100}</div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Page;
