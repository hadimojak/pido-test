import React, { useEffect, useState } from "react";

interface Data {
  total: number;
  dateTime: string;
  code: string;
  image: string;
}

interface ViewDataProps {
  id: string; // Accept id as a prop to fetch the data
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
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/fetch/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        console.log({ response });

        // setData(response);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
  });

  return (
    <div>
      {/* //   <h3>Submitted Data</h3>
    //   <p>Total: {data.total}</p>
    //   <p>DateTime: {data.dateTime}</p>
    //   <p>Code: {data.code}</p>
    //   <img src={data.image} alt="Submitted" style={{ width: "200px", height: "200px" }} /> */}
    </div>
  );
};

export default ViewData;
