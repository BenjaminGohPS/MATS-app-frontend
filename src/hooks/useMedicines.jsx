// querimport { useQuery } from "@tanstack/react-query";

// const fetchMedicines = async () => {
//   const res = await fetch("MATS/meds");
//   // const res = await fetch(import.meta.env.VITE_SERVER + endpoint, {
//   //   method,
//   //   headers: {
//   //     "content-Type": "application/json",
//   //   },
//   //   body: JSON.stringify(body),
//   // });

//   // const data = await res.json()

//   if (!res.ok) {
//     throw new Error("error getting medicine info");
//   }

//   return res.json();
// };

// const useMedicine = () => {
//   return useQuery(["medicine", fetchMedicines]);
// };

// const queryMedicine = useQuery({
//   queryKey: ['medicine'],
//   queryFn: fetchMedicines
// })


// export default { queryMedicine };

// // try out this method first
