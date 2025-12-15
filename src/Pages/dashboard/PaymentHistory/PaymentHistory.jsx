import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });
  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Payment History ({payments.length})
      </h2>

      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Subject</th>
                  <th>Transaction ID</th>
                  <th>Amount (৳)</th>
                  <th>Status</th>
                  <th>Paid At</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment._id}>
                    <td>{index + 1}</td>
                    <td>{payment.subject}</td>
                    <td>{payment.transactionId}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.paymentStatus}</td>
                    <td>
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-5">
            {payments.map((payment) => (
              <div
                key={payment._id}
                className="border rounded-lg p-4 shadow-sm bg-base-100"
              >
                <h3 className="font-semibold text-lg">{payment.subject}</h3>

                <p className="text-sm">
                  <b>Transaction ID:</b> {payment.transactionId}
                </p>
                <p className="text-sm">
                  <b>Amount(৳):</b> {payment.amount}
                </p>
                <p className="text-sm">
                  <b>Status:</b> {payment.paymentStatus}
                </p>
                <p className="text-sm">
                  <b>Paid At:</b>{" "}
                  {payment.paidAt
                    ? new Date(payment.paidAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default PaymentHistory;
