import { Transaction } from "@/app/types";
import priceFormatter from "@/app/utils/price-formatter";
import { FiEye } from "react-icons/fi";

const transactionData = [
  {
    date: "23/02/2026 19:32",
    customer: "John Doe",
    contact: "08231223123",
    total: "450.000",
    status: "Pending",
  },
  {
    date: "23/02/2026 13:32",
    customer: "Delon Marx",
    contact: "08823291231",
    total: "753.000",
    status: "Paid",
  },
  {
    date: "23/02/2026 13:32",
    customer: "Delon Marx",
    contact: "08823291231",
    total: "753.000",
    status: "Rejected",
  },
];

type TransactionTableProps = {
    onViewDetails: (transaction: Transaction) => void;
    transactions: Transaction[];
}

const TransactionTable = ({onViewDetails, transactions}:TransactionTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-500";

      case "paid":
        return "bg-green-100 text-green-800 border-green-500";

      case "rejected":
        return "bg-red-100 text-red-800 border-red-500";

      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 font-semibold">Date</th>
            <th className="px-6 py-4 font-semibold">Customer</th>
            <th className="px-6 py-4 font-semibold">Contact</th>
            <th className="px-6 py-4 font-semibold">Total</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((data) => (
            <tr
              key={data._id}
              className="border-b border-gray-200 last:border-b-0"
            >
              <td className="px-6 py-4 font-medium whitespace-nowrap">
                {new Date(data.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>

              <td className="px-6 py-4 font-medium">
                {data.customerName}
              </td>

              <td className="px-6 py-4 font-medium">
                {data.customerContact}
              </td>

              <td className="px-6 py-4 font-medium">
                {priceFormatter(parseInt(data.totalPayment))}
              </td>

              <td className="px-6 py-4">
                <div
                  className={`inline-flex items-center px-4 py-1 rounded-full border text-sm font-medium ${getStatusColor(
                    data.status
                  )}`}
                >
                  {data.status}
                </div>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <button onClick={() => onViewDetails(data)} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 w-fit py-1 px-2 rounded-md">
                    <FiEye size={18} />
                    View Details
                  </button>

                  
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;