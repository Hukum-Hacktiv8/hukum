import { RegisterFormData } from "./form";

export const registerUser = async (data: RegisterFormData) => {
  // ! merubah data sesuai dengan yang dibutuhkan backend
  const userInput = {
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role,
    profile: {
      address: data.address,
      birth: data.birthDate,
    },
  };

  const response = await fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  });

  // ? untuk mengetahui data yang diinput sesuai atau tidak
  // console.log("data:", userInput);

  // ! mengembalikan response ke client
  return response.json();
};
