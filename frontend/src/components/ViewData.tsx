import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define a type for the data we are expecting from the backend
interface Data {
  total: number;
  dateTime: string;
  code: string;
  image: string;
}

interface ViewDataProps {
  id: string;
}

const ViewData: React.FC<ViewDataProps> = ({ id }) => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<Data>(`${import.meta.env.VITE_BACKEND_URL}/fetch/${id}`);
        setData(response.data);
      } catch (err) {

        setError('Error fetching data from the backend');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Fetch data when `id` changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Submitted Data</h3>
      {data ? (
        <>
          <p>Total: {data.total}</p>
          <p>DateTime: {data.dateTime}</p>
          <p>Code: {data.code}</p>
          <img src={data.image} alt="Submitted" style={{ width: '200px', height: '200px' }} />
        </>
      ) : (
        <p>No data found for this ID</p>
      )}
    </div>
  );
};

export default ViewData;
