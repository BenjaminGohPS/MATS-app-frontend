import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import MedicineCard from "../components/MedicineCard";
import { useNavigate } from "react-router-dom";

const Medicines = () => {
  const queryClient = useQueryClient();
  const medicineNameRef = useRef();
  const medicineExpiryRef = useRef();
  const quantityRef = useRef();
  const dosageRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const userIdRef = useRef();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    if (!accessToken) {
      toast.error("You need to be logged in to view this page.");
      navigate("/login");
    }
  }, [accessToken, navigate]);

  const getMedicine = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/MATS/meds", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: "Bearer " + accessToken,
      },
    });

    if (!res.ok) {
      throw new Error("error getting medicine data");
    }

    const data = await res.json();
    return data;
  };

  const queryMedicine = useQuery({
    queryKey: ["medicines"],
    queryFn: getMedicine,
  });

  const getMedicineByUserId = async (userId) => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + "MATS/meds/" + userId,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: "Bearer " + accessToken,
        },
      }
    );
    if (!res.ok) {
      throw new Error("error getting medicine data");
    }

    const data = await res.json();
    return data;
  };

  const mutationMedicineByUserId = useMutation({
    mutationFn: getMedicineByUserId,
    onSuccess: () => {
      queryClient.invalidateQueries({ getMedicine });
    },
  });

  // add medicine
  const addMedicine = async () => {
    if (
      !medicineNameRef.current.value ||
      !medicineExpiryRef.current.value ||
      !quantityRef.current.value ||
      !dosageRef.current.value ||
      !startDateRef.current.value ||
      !endDateRef.current.value ||
      (userRole === "1" && !userIdRef.current.value)
    ) {
      return;
    }

    const res = await fetch(import.meta.env.VITE_SERVER + "/MATS/meds", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        medicine_name: medicineNameRef.current.value,
        medicine_expiry: medicineExpiryRef.current.value,
        quantity: quantityRef.current.value,
        daily_dosage: dosageRef.current.value,
        start_date: startDateRef.current.value,
        end_date: endDateRef.current.value,
        user_id: userRole === "1" ? userIdRef.current.value : undefined,
      }),
    });

    if (!res.ok) {
      throw new Error("Error adding medicine");
    }

    const data = await res.json();
    return data;
  };

  const mutationAddMedicine = useMutation({
    mutationFn: addMedicine,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["medicines"]);
      toast.success(data.msg || "Medicine added successfully");
      if (medicineNameRef.current) medicineNameRef.current.value = "";
      if (medicineExpiryRef.current) medicineExpiryRef.current.value = "";
      if (quantityRef.current) quantityRef.current.value = "";
      if (dosageRef.current) dosageRef.current.value = "";
      if (startDateRef.current) startDateRef.current.value = "";
      if (startDateRef.current) endDateRef.current.value = "";
      if (userIdRef.current) userIdRef.current.value = "";
    },
    onError: (error) => {
      toast.error(
        error.msg || "Failed to add medicine. Make sure all fields are entered"
      );
    },
  });

  // delete medicine
  const deleteMedicine = async (medicineId) => {
    const res = await fetch(`${import.meta.env.VITE_SERVER}/MATS/meds`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        medicine_id: medicineId,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      toast.error(error.message || "Failed to delete medicine");
    } else {
      queryClient.invalidateQueries(["medicines"]);
    }
  };

  if (queryMedicine.isLoading) return <div>Loading medicines...</div>;
  if (queryMedicine.isError)
    return <div>Error: {queryMedicine.error.message}</div>;

  return (
    <div className="p-4 bg-softWhite">
      <h2 className="text-2xl font-bold text-darkGray mb-4">Medicines</h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-darkGray mb-2">
          Add Medicine
        </h3>
        <div className="space-y-2">
          <input
            type="text"
            ref={medicineNameRef}
            placeholder="Medicine Name"
            className="border border-lightGray p-2 rounded w-full"
          />
          <input
            type="text"
            ref={medicineExpiryRef}
            placeholder="Medicine Expiry"
            className="border border-lightGray p-2 rounded w-full"
          />
          <input
            type="text"
            ref={quantityRef}
            placeholder="Quantity"
            className="border border-lightGray p-2 rounded w-full"
          />
          <input
            type="text"
            ref={dosageRef}
            placeholder="Daily Dosage"
            className="border border-lightGray p-2 rounded w-full"
          />
          <input
            type="text"
            ref={startDateRef}
            placeholder="Start Date"
            className="border border-lightGray p-2 rounded w-full"
          />
          <input
            type="text"
            ref={endDateRef}
            placeholder="End Date"
            className="border border-lightGray p-2 rounded w-full"
          />
          {userRole === "1" && (
            <div>
              <label>Assign User ID</label>
              <input
                type="text"
                ref={userIdRef}
                placeholder="User ID"
                className="border border-lightGray p-2 rounded w-full"
              />
            </div>
          )}
          <button
            onClick={() => {
              mutationAddMedicine.mutate();
            }}
            className="btn-edit"
          >
            Add Medicine
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-darkGray mb-2">
          Your Medicines
        </h3>
        {queryMedicine.isSuccess && queryMedicine.data.length === 0 ? (
          <p>No medicines found.</p>
        ) : (
          <div>
            {queryMedicine.data.map((medicine) => {
              const userMedicine = medicine.medicines_users[0];
              const quantity = userMedicine ? userMedicine.quantity : "0";
              const dosage = userMedicine ? userMedicine.daily_dosage : "0";

              return (
                <MedicineCard
                  key={medicine.medicine_id}
                  medicine={medicine}
                  quantity={quantity}
                  dosage={dosage}
                  onDelete={() => deleteMedicine(medicine.medicine_id)} // Pass the delete function as a prop
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default Medicines;
