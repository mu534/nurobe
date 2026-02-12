import { payments } from "../../data/hotelData";

export function PaymentHistory() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h3 className="text-lg">Payment History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                Booking ID
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                Method
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">#{payment.id}</td>
                <td className="px-6 py-4 text-sm">BK-{payment.bookingId}</td>
                <td className="px-6 py-4 text-green-600">${payment.amount}</td>
                <td className="px-6 py-4 text-sm">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm">{payment.method}</td>
                <td className="px-6 py-4">
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
