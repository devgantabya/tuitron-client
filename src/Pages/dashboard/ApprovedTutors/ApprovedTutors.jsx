import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaRegTrashAlt, FaCheck } from "react-icons/fa";
import { MdOutlinePersonRemove } from "react-icons/md";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ApprovedTutors = () => {
  const axiosSecure = useAxiosSecure();
  const { data: tutors = [], refetch } = useQuery({
    queryKey: ["tutors", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutors");
      return res.data;
    },
  });

  const handleApproveTutor = (id) => {
    const updatedInfo = { status: "approved" };
    axiosSecure.patch(`/tutors/${id}`, updatedInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-right",
          icon: "success",
          title: "Tutor has been approved.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleRejectTutor = (id) => {
    const updatedInfo = { status: "rejected" };
    axiosSecure.patch(`/tutors/${id}`, updatedInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-right",
          icon: "info",
          title: "Tutor has been rejected.",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const handleDeleteTutor = (id) => {
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
        axiosSecure.delete(`/tutors/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire("Deleted!", "Tutor has been deleted.", "success");
          }
        });
      }
    });
  };

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Pending Tutors: ({tutors.length})
      </h2>

      {tutors.length === 0 ? (
        <p>Don't have any pending tutors.</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Experience</th>
                  <th>Expected Salary</th>
                  <th>Availability</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tutors.map((tutor, index) => (
                  <tr key={tutor._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div>
                        <h3 className="font-bold">{tutor.name}</h3>
                        <p className="text-sm opacity-50">
                          {tutor.tutor_email}
                        </p>
                      </div>
                    </td>
                    <td>{tutor.experienceYears}</td>
                    <td>{tutor.tuitionPreferences.expectedSalary}</td>
                    <td>{tutor.tuitionPreferences.availability}</td>
                    <td>{tutor.status}</td>

                    <td className="flex gap-2">
                      <button
                        onClick={() => handleApproveTutor(tutor._id)}
                        className="btn btn-sm btn-squire hover:bg-green-600 hover:text-white"
                      >
                        <FaCheck size={18} />
                      </button>
                      <button
                        onClick={() => handleRejectTutor(tutor._id)}
                        className="btn btn-sm btn-squire hover:bg-orange-600 hover:text-white"
                      >
                        <MdOutlinePersonRemove size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteTutor(tutor._id)}
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
            {tutors.map((tutor) => (
              <div
                key={tutor._id}
                className="border rounded-lg p-4 shadow-sm bg-base-100"
              >
                <h3 className="font-semibold text-lg">{tutor.name}</h3>

                <p className="text-sm">{tutor.tutor_email}</p>
                <p className="text-sm">
                  <b>Experience:</b> {tutor.experienceYears}
                </p>
                <p className="text-sm">
                  <b>Expected Salary:</b>{" "}
                  {tutor.tuitionPreferences.expectedSalary}
                </p>
                <p className="text-sm">
                  <b>Availability:</b> {tutor.tuitionPreferences.availability}
                </p>
                <p className="text-sm">
                  <b>Status:</b> {tutor.status}
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleApproveTutor(tutor._id)}
                    className="flex-1 btn btn-sm bg-green-600 text-white"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRejectTutor(tutor._id)}
                    className="flex-1 btn btn-sm bg-orange-600 text-white"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleDeleteTutor(tutor._id)}
                    className="flex-1 btn btn-sm bg-red-600 text-white"
                  >
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

export default ApprovedTutors;
