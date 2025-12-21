import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { FaRegTrashAlt, FaUserMinus, FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleUserDelete = async (userId) => {
    try {
      const response = await axiosSecure.delete(`/users/${userId}`);
      if (response.data.deletedCount > 0) {
        Swal.fire({
          position: "top-right",
          icon: "success",
          title: "User deleted successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleMakeAdmin = async (user) => {
    const roleInfo = { role: "admin" };

    try {
      const res = await axiosSecure.patch(`/users/${user._id}`, roleInfo);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-right",
          icon: "success",
          title: `${user.displayName} is an Admin Now!`,
          showConfirmButton: false,
          timer: 2000,
        });
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    } catch (error) {
      console.error("Error making user admin:", error);
    }
  };

  const handleRemoveAdmin = async (user) => {
    const roleInfo = { role: "user" };

    try {
      const res = await axiosSecure.patch(`/users/${user._id}`, roleInfo);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-right",
          icon: "success",
          title: `${user.displayName} is a User Now!`,
          showConfirmButton: false,
          timer: 2000,
        });
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    } catch (error) {
      console.error("Error removing user admin:", error);
    }
  };

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users: {users.length}</h2>

      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <>
          <div>
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Admin Actions</th>
                  <th>Other Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div>
                          <img
                            src={user.photoURL}
                            alt={user.displayName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {user.displayName}
                          </h3>
                          <p className="text-sm">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>
                      {user.role === "admin" ? (
                        <button
                          onClick={() => handleRemoveAdmin(user)}
                          className="btn btn-sm btn-square hover:bg-red-600 hover:text-white"
                        >
                          <FaUserMinus size={18} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="btn btn-sm btn-square hover:bg-blue-600 hover:text-white"
                        >
                          <FaUserPlus size={18} />
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleUserDelete(user._id)}
                        className="btn btn-sm btn-square hover:bg-red-600 hover:text-white"
                      >
                        <FaRegTrashAlt size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export default UsersManagement;
