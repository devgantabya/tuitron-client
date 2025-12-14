import React from "react";
import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div>
      <h1>Payment is cancelled. Please try again</h1>
      <Link
        to="/dashboard/my-tuitions"
        className="btn bg-blue-600 hover:bg-blue-700 text-white"
      >
        Try Again
      </Link>
    </div>
  );
};

export default PaymentCancelled;
