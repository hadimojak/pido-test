import React from 'react';

const ViewData = ({ data }: { data: any }) => {
  if (!data) return null;

  return (
    <div>
      <h3>Submitted Data</h3>
      <p>Total: {data.total}</p>
      <p>DateTime: {data.dateTime}</p>
      <p>Code: {data.code}</p>
      <img src={data.image} alt='Submitted' style={{ width: '200px', height: '200px' }} />
    </div>
  );
};

export default ViewData;
