import React, { useState } from 'react';
import Form from './components/Form';
import ViewData from './components/ViewData';

const App = () => {
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleSubmit = async (formData: any) => {
    const response = await fetch('http://localhost:4000/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setSubmittedData(data.data);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} />
      <ViewData data={submittedData} />
    </div>
  );
};

export default App;
