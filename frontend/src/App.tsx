import React, { useState } from "react";
import Form from "./components/Form";
import ViewData from "./components/ViewData";
import "./App.css";

function App() {
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [id, setId] = useState('');
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <h1>Vite + React</h1>
      <div>
        <h1>Form Submission</h1>
        <Form setSubmittedData={setSubmittedData} />

        <h1>view Data</h1>
        <input type="text" placeholder="enter id" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={() => setId(inputValue)}>fetch Data</button>
        <ViewData id={id} />
      </div>
    </>
  );
}

export default App;
