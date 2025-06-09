import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function Profile() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/users/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data.reports);
    };
    fetchData();
  }, []);

  const chartData = {
    labels: reports.map(r => new Date(r.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: "Reports",
        data: reports.map(() => 1),
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Report History</h2>
      <ul className="space-y-2 mb-8">
        {reports.map((report) => (
          <li key={report._id} className="p-2 border rounded">
            <p>{report.filename}</p>
            <p>Date: {new Date(report.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
      <div>
        <h3 className="text-lg font-semibold mb-2">Reports Chart</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
}
