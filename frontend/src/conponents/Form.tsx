import React, { useState } from 'react';

const Form = ({ onSubmit }: { onSubmit: (formData: any) => void }) => {
  const [total, setTotal] = useState('');
  const [code, setCode] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async () => {
    const dateTime = new Date().toISOString();
    const formData = { total, dateTime, code, image };

    onSubmit(formData);
  };

  return (
    <div>
      <h2>Submit Form</h2>
      <input placeholder='Total' onChange={e => setTotal(e.target.value)} />
      <input placeholder='Code' onChange={e => setCode(e.target.value)} />
      <input placeholder='Image (base64)' onChange={e => setImage(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Form;
