import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import MedicineCard from "../components/MedicineCard";

const Medicines = () => {
  const queryClient = useQueryClient();
  const medicineNameRef = useRef();
  const medicineExpiryRef = useRef();
  const quantityRef = useRef();
  const dosageRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();

  //for testing
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMmVlNWYyOC0zMDNiLTRkYjUtOWFjNS0xNTFhNTNlMzJmZmIiLCJlbWFpbCI6ImJlbmphbWluQGdtYWlsLmNvbSIsInJvbGVfaWQiOjIsImlhdCI6MTczMzY4NTg2OCwiZXhwIjoxNzMzNzM5ODY4LCJqdGkiOiJhNGE2ZTE0OC1iNWRmLTQyOGEtOWI4YS1kMTYyYmMxNDU4ZGIifQ.5jbpuFWHF8K83m-GKaNK3FF462tR8Zx18U6SgiaGMx0";

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

  //const queryMedicine = useQuery({
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
      !endDateRef.current.value
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
      }),
    });

    if (!res.ok) {
      throw new Error("Error adding medicine");
    }

    const data = await res.json();
    return data;
  };

  //  const mutationAddMedicine = useMutation({
  const mutationAddMedicine = useMutation({
    mutationFn: addMedicine,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["medicines"]);
      toast.success(data.msg || "Medicine added successfully");
      medicineNameRef.current.value = "";
      medicineExpiryRef.current.value = "";
      quantityRef.current.value = "";
      dosageRef.current.value = "";
      startDateRef.current.value = "";
      endDateRef.current.value = "";
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

        // i have to include a way for admin to delete. but admin must have additional field to input the user_id. work on it tmr
        // user_id: userId,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      toast.error(error.msg || "Failed to delete medicine");
    } else {
      const data = await res.json();
      //   toast.success(data.msg || "Medicine deleted successfully");
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
          <button
            onClick={() => {
              mutationAddMedicine.mutate();
            }}
            // className="text-softBlue hover:text-[#4D8BD9] transition"
            // test className="bg-softBlue hover:text-[#4D8BD9] transition rounded"
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

/* WORKINGS

 {JSON.stringify(queryMedicine.data)}
 


 
*/
