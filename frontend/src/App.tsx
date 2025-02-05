import React, { useState } from "react";
import Form from "./components/Form";
import ViewData from "./components/ViewData";
import "./App.css";

function App() {
  const [submittedData, setSubmittedData] = useState<any>(null);

  return (
    <>
      <h1>Vite + React</h1>
      <div>
        <h1>Form Submission</h1>
        <Form setSubmittedData={setSubmittedData} />
        {<ViewData data={submittedData} />}
      </div>
    </>
  );
}

export default App;
