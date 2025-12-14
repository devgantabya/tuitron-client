import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Payment = () => {
  const { tuitionId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: tuition } = useQuery({
    queryKey: ["tuitions", tuitionId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions/${tuitionId}`);
      return res.data;
    },
  });

  const handlePayment2 = async () => {
    const paymentInfo = {
      salary: tuition.salary,
      tuitionId: tuition._id,
      studentEmail: tuition.postedBy.email,
      subject: tuition.subject,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-blue-600"></span>
      </div>
    );
  }

  return (
    <div>
      <h1>
        Pay {tuition.salary} for {tuition.subject} Tutor
      </h1>
      <button
        onClick={handlePayment2}
        className="btn bg-blue-600 hover:bg-blue-700 text-white text-xl"
      >
        Pay
      </button>
    </div>
  );
};

export default Payment;
