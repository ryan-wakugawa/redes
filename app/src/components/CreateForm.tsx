import { useState } from "react";

export default function CreateForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    try {
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      }).then(
        async (response) => {
          console.log(await response.json());
        }
      );
    } catch (error) {
        console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-around w-full">
      <h1 className="text-lg">Create Form</h1>
      <div className="flex flex-row items-center justify-around w-full">
        <form>
          <label htmlFor="name">Nome:</label>
          <input
            className="input"
            type="text"
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
