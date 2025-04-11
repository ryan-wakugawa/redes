import { useState } from "react";
import api from "../lib/axios";

export default function CreateForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await api.post("/users", {
        name,
        email,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-around w-full m-4">
      <form className="flex flex-row items-center justify-around w-full">
        <label htmlFor="name">Nome:</label>
        <input
          className="input border border-gray-300 w-full mx-2 p-1 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          type="text"
          onChange={(event) => setName(event.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          className="input border border-gray-300 w-full mx-2 p-1 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          type="email"
          id="email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <button
          className="text-white bg-sky-500 hover:bg-sky-600 rounded-md px-2 py-1"
          type="button"
          onClick={() => handleSubmit()}
        >
          Criar
        </button>
      </form>
    </div>
  );
}
