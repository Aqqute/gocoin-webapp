import download from "../../public/images/download.svg";

function formatReadableDate(isoString) {
  const date = new Date(isoString);
  const options = { day: "numeric", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
}

export default function TransactionsTable({ data, isDark }) {
  return (
    <div className="overflow-x-auto w-full">
      <table
        className={`min-w-full border-collapse ${
          isDark ? "text-black": "text:white"
        }`}
      >
        {/* Table Head */}
        <thead>
          <tr className="">
            <th className="px-4 py-3 text-sm font-medium">Date</th>
            <th className="px-4 py-3 text-sm font-medium">Type</th>
            <th className="px-4 py-3 text-sm font-medium">Amount</th>
            <th className="px-4 py-3 text-sm font-medium">Method</th>
            <th className="px-4 py-3 text-sm font-medium">Status</th>
            <th className="px-4 py-3 text-sm font-medium">Invoice</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`border-b transition-colors capitalize ${
                isDark
                  ? "border-gray-700"
                  : "border-gray-200 "
              }`}
            >
              <td className="px-4 py-3 text-sm">{formatReadableDate(item.createdAt)}</td>
              <td className="px-4 py-3 text-sm">{item.type}</td>
              <td className="px-4 py-3 text-sm">${item.amount}</td>
              <td className="px-4 py-3 text-sm">{item.method}</td>
              <td className="px-4 py-3 text-sm">
                <span
                  className={`font-bold capitalize ${
                    item.status.toLowerCase() === "completed"
                      ? "text-[#53A653]"
                      : "text-yellow-500"
                  }`}
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
