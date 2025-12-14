import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { CiSquareMore } from "react-icons/ci";
import Swal from "sweetalert2";

const MyTuitions = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: tuitions = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myTuitions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (authLoading || isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const handleTuitionDelete = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/tuitions/${id}`).then((res) => {
          console.log(res.data);

          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your tuition has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handlePayment = async (tuition) => {
    const paymentInfo = {
      salary: tuition.salary,
      tuitionId: tuition._id,
      studentEmail: tuition.postedBy.email,
      subject: tuition.subject,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.assign(res.data.url);
  };

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        My Tuition Posts ({tuitions.length})
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {tuitions.length === 0 ? (
        <p>No tuition posts found.</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Class</th>
                  <th>Subjects</th>
                  <th>Location</th>
                  <th>Budget(৳)</th>
                  <th>Payment Status</th>
                  <th>Posted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tuitions.map((tuition, index) => (
                  <tr key={tuition._id}>
                    <td>{index + 1}</td>
                    <td>{tuition.course}</td>
                    <td>{tuition.subject}</td>
                    <td>{tuition.contact.location}</td>
                    <td>{tuition.salary}</td>
                    <td>
                      {tuition.paymentStatus ? (
                        <span className="text-green-600 font-bold">Paid</span>
                      ) : (
                        <button
                          onClick={() => handlePayment(tuition)}
                          className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Pay
                        </button>
                      )}
                    </td>
                    <td>
                      {tuition.createdAt
                        ? new Date(tuition.createdAt).toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="flex gap-2">
                      <Link
                        to={`/tuitions/${tuition._id}`}
                        className="btn btn-sm btn-squire text-bold hover:bg-blue-600 hover:text-white"
                      >
                        <CiSquareMore size={20} />
                      </Link>
                      <Link
                        to={`/tuitions/edit/${tuition._id}`}
                        className="btn btn-sm btn-squire hover:bg-green-600 hover:text-white"
                      >
                        <FaRegEdit size={20} />
                      </Link>
                      <button
                        onClick={() => handleTuitionDelete(tuition._id)}
                        className="btn btn-sm btn-squire hover:bg-red-600 hover:text-white"
                      >
                        <FaRegTrashAlt size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-5">
            {tuitions.map((tuition) => (
              <div
                key={tuition._id}
                className="border rounded-lg p-4 shadow-sm bg-base-100"
              >
                <h3 className="font-semibold text-lg">{tuition.course}</h3>

                <p className="text-sm">
                  <b>Subject:</b> {tuition.subject}
                </p>
                <p className="text-sm">
                  <b>Budget(৳):</b> {tuition.salary}
                </p>
                <p className="text-sm">
                  <b>Payment Status:</b>{" "}
                  {tuition.paymentStatus ? (
                    <span className="bg-green-600 text-white">Paid</span>
                  ) : (
                    <button
                      onClick={() => handlePayment(tuition)}
                      className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Pay
                    </button>
                  )}
                </p>
                <p className="text-sm">
                  <b>Posted:</b>{" "}
                  {tuition.createdAt
                    ? new Date(tuition.createdAt).toLocaleString()
                    : "N/A"}
                </p>
                <p className="text-sm">
                  <b>Location:</b> {tuition.contact.location}
                </p>

                <div className="flex gap-2 mt-3">
                  <Link
                    to={`/tuitions/${tuition._id}`}
                    className="flex-1 btn btn-sm bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Details
                  </Link>
                  <Link
                    to={`/tuitions/edit/${tuition._id}`}
                    className="flex-1 btn btn-sm bg-green-600 hover:bg-green-700 text-white"
                  >
                    Edit
                  </Link>
                  <button className="flex-1 btn btn-sm bg-red-600 hover:bg-red-700 text-white">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default MyTuitions;
