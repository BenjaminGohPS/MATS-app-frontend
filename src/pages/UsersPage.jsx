import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!accessToken) {
      toast.error("You need to be logged in to view this page.");
      navigate("/login");
    }
  }, [accessToken, navigate]);

  const getUsers = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/MATS/users", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: "Bearer " + accessToken,
      },
    });

    if (!res.ok) {
      throw new Error("error getting user data");
    }

    const data = await res.json();
    return data;
  };

  const queryUsers = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const updateUserRole = async ({ userId, newRoleId }) => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + `/MATS/users/${userId}/role`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify({ userId, newRoleId }),
      }
    );

    if (!res.ok) {
      throw new Error("error updating user role");
    }

    return res.json();
  };

  const mutation = useMutation({
    mutationFn: updateUserRole,
    onSuccess: (data) => {
      toast.success(data.msg || "User role updated successfully");
      queryClient.invalidateQueries("users");
    },
    onError: (error) => {
      toast.error(error.msg || "Failed to update user role");
    },
  });

  const handleRoleChange = (userId, newRoleId) => {
    mutation.mutate({ userId, newRoleId });
  };

  if (queryUsers.isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner">Loading...</div>
      </div>
    );
  }
  if (queryUsers.isError) return <div>Error: {queryUsers.error.message}</div>;

  return (
    <div className="p-6 bg-softWhite">
      <h2 className="text-3xl font-bold mb-6 text-darkGray">Managing Users</h2>
      <table className="min-w-full table-auto bg-white border border-lightGray shadow-md rounded-md">
        <thead>
          <tr className="bg-softLavender text-left">
            <th className="py-2 px-4 text-darkGray">ID</th>
            <th className="py-2 px-4 text-darkGray">Email</th>
            <th className="py-2 px-4 text-darkGray">Role</th>
            <th className="py-2 px-4 text-darkGray">Actions</th>
          </tr>
        </thead>
        <tbody>
          {queryUsers.data.map((user) => (
            <tr
              key={user.id}
              className={`border-t ${user.id === userId ? "bg-softGreen" : ""}`} // Highlight current user row with a green shade
            >
              <td className="py-2 px-4 text-darkGray">{user.id}</td>
              <td className="py-2 px-4 text-darkGray">{user.email}</td>
              <td className="py-2 px-4 text-darkGray">
                {user.role_id === 1 ? "Admin" : "User"}
              </td>
              <td className="py-2 px-4 flex items-center">
                {user.id === userId ? (
                  <span className="black italic">
                    You can't change your own role
                  </span>
                ) : (
                  <>
                    <button
                      onClick={() => handleRoleChange(user.id, 1)} // Make Admin
                      disabled={user.role_id === 1}
                      className="bg-softBlue text-white px-4 py-2 rounded-md hover:bg-softGreen disabled:bg-lightGray mr-2"
                    >
                      Make Admin
                    </button>
                    <button
                      onClick={() => handleRoleChange(user.id, 2)} // Make User
                      disabled={user.role_id === 2}
                      className="bg-softBlue text-white px-4 py-2 rounded-md hover:bg-softGreen disabled:bg-lightGray"
                    >
                      Make User
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
