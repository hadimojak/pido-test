import React, { useState } from "react";

interface FormProps {
  setSubmittedData: (data: any) => void;
}

const Form: React.FC<FormProps> = ({ setSubmittedData }) => {
  const [id, setId] = useState("");
  const [total, setTotal] = useState("");
  const [code, setCode] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dateTime = new Date().toISOString();
    const formData = { id, total, dateTime, code, image };

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setSubmittedData(data.data);
    setId("");
    setTotal("");
    setCode("");
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit Form</h2>
      <input placeholder="_id" value={id}
        type="text"
        onChange={(e) => setId(e.target.value)} />
      <input placeholder="Total" value={total}
        type='number'
        onChange={(e) => setTotal(e.target.value)} />
      <input placeholder="Code" value={code}
        type="number"
        onChange={(e) => setCode(e.target.value)} />
      <input placeholder="Image (base64)" value={image}
        onChange={(e) => setImage(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
