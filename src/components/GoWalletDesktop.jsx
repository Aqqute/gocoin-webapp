import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Download } from "lucide-react";

const GoWalletDesktop = ({ isDark, balance, transactions }) => {
  return (
    <div className="hidden lg:flex">
      <div className="h-screen sticky top-0">
        <Sidebar />
      </div>

      <div
        className={`flex-1 flex flex-col max-h-screen overflow-hidden ${
          isDark ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <Topbar />
        <div
          className={`p-4 overflow-y-auto ${isDark ? "bg-black" : "bg-white"}`}
        >
          {/* Wallet Cards */}
          <h1 className="text-xl font-bold mb-3">Your Wallets</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {["GoToken", "Metamask", "Solana"].map((name, index) => (
              <div
                key={index}
                className={`rounded-xl p-4 ${
                  isDark ? "bg-[#1e1e1e]" : "bg-gray-100"
                }`}
              >
                <p className="text-xs">{name} Balance</p>
                <p className="text-2xl mt-1 font-semibold">
                  {Number(balance).toFixed(4)}
                </p>
                <p className="text-sm mt-1 text-right">~$20.00</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="overflow-x-auto">
              <div className="flex gap-4 w-max">
                {[
                  { title: "Withdraw", subtitle: "Select withdrawal method" },
                  {
                    title: "Receive payments",
                    subtitle: "Choose a method to receive payments",
                  },
                  {
                    title: "Send Payments",
                    subtitle: "Choose a method to send payments",
                  },
                  {
                    title: "Swap",
                    subtitle: "Swap between currencies e.g BTC to ETH",
                  },
                ].map((action, idx) => (
                  <div
                    key={idx}
                    className={`min-w-[180px] rounded-xl p-4 shrink-0 ${
                      isDark ? "bg-[#1e1e1e]" : "bg-gray-100"
                    }`}
                  >
                    <p className="font-medium">{action.title}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {action.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-orange-100 text-gray-700">
                    <th className="py-3 px-4 font-semibold">Date</th>
                    <th className="py-3 px-4 font-semibold">Type</th>
                    <th className="py-3 px-4 font-semibold">Amount</th>
                    <th className="py-3 px-4 font-semibold">Method</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, idx) => (
                    <tr
                      key={tx._id || idx}
                      className="border-t border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4">
                        {new Date(tx.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-3 px-4 capitalize">
                        {tx.type.replace("_", " ")}
                      </td>
                      <td className="py-3 px-4">
                        ₦{tx.amountNGN?.toLocaleString() || "8,000"}
                      </td>
                      <td className="py-3 px-4">{tx.method || "Visa 4893"}</td>
                      <td className="py-3 px-4 text-green-600 font-medium">
                        Completed
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-orange-500 hover:text-orange-600 text-lg">
                          <Download />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {transactions.length === 0 && (
                <p className="text-sm text-center py-6 text-gray-500">
                  No transactions found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoWalletDesktop;
