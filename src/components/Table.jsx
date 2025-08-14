import download from "../../public/images/download.svg";


export default function TransactionsTable ({ data }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border-collapse">
        {/* Table Head */}
        <thead>
          <tr className="bg-[#FFF6E6] text-left">
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Date</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Type</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Amount</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Method</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Status</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Invoice</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-3 text-sm text-gray-700">{item.date}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{item.type}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{item.amount}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{item.method}</td>
              <td className="px-4 py-3 text-sm">
                <span
                  className={`${
                    item.status === "completed" || item.status === "Completed"
                      ? "text-[#53A653]"
                      : "text-yellow-500"
                  } font-bold capitalize`}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                <button className="text-orange-500 hover:text-orange-600 cursor-pointer">
                  <img src={download} alt="Download" className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
