// src/App.jsx
import { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, LineElement, PointElement, Title, Tooltip, Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const MOCK_INSPECTIONS = [
  { id: 1, site: "Block A", date: "2025-01-10", ppeCompliant: true, hazards: 2, status: "pass" },
  { id: 2, site: "Block B", date: "2025-01-12", ppeCompliant: false, hazards: 5, status: "fail" },
  { id: 3, site: "Block C", date: "2025-01-15", ppeCompliant: true, hazards: 1, status: "pass" },
  { id: 4, site: "Block A", date: "2025-01-18", ppeCompliant: true, hazards: 0, status: "pass" },
  { id: 5, site: "Block D", date: "2025-01-20", ppeCompliant: false, hazards: 7, status: "fail" },
  { id: 6, site: "Block B", date: "2025-01-22", ppeCompliant: true, hazards: 3, status: "pass" },
];

function StatCard({ label, value, color }) {
  return (
    <div style={{ background: "#f8f9fa", borderRadius: 8, padding: "1rem 1.5rem", textAlign: "center", border: `2px solid ${color}` }}>
      <p style={{ margin: 0, fontSize: 13, color: "#666" }}>{label}</p>
      <p style={{ margin: 0, fontSize: 28, fontWeight: 600, color }}>{value}</p>
    </div>
  );
}

export default function App() {
  const [inspections, setInspections] = useState(MOCK_INSPECTIONS);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? inspections : inspections.filter(i => i.status === filter);

  const passCount = inspections.filter(i => i.status === "pass").length;
  const failCount = inspections.filter(i => i.status === "fail").length;
  const ppeRate = Math.round((inspections.filter(i => i.ppeCompliant).length / inspections.length) * 100);
  const totalHazards = inspections.reduce((sum, i) => sum + i.hazards, 0);

  const barData = {
    labels: inspections.map(i => i.site),
    datasets: [{
      label: "Hazards Identified",
      data: inspections.map(i => i.hazards),
      backgroundColor: inspections.map(i => i.status === "fail" ? "#e74c3c" : "#2ecc71"),
    }]
  };

  const lineData = {
    labels: inspections.map(i => i.date),
    datasets: [{
      label: "Hazard Count Over Time",
      data: inspections.map(i => i.hazards),
      borderColor: "#3498db",
      tension: 0.3,
      fill: false,
    }]
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 1000, margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ color: "#1a3557" }}>HSE Compliance Dashboard</h1>
      <p style={{ color: "#555" }}>Scaffolding site inspection overview — ISO 45001 aligned</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: "2rem" }}>
        <StatCard label="Total Inspections" value={inspections.length} color="#3498db" />
        <StatCard label="Passed" value={passCount} color="#2ecc71" />
        <StatCard label="Failed" value={failCount} color="#e74c3c" />
        <StatCard label="PPE Compliance" value={`${ppeRate}%`} color="#f39c12" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: "2rem" }}>
        <div style={{ background: "#fff", borderRadius: 8, padding: "1rem", border: "1px solid #eee" }}>
          <h3>Hazards by Site</h3>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
        <div style={{ background: "#fff", borderRadius: 8, padding: "1rem", border: "1px solid #eee" }}>
          <h3>Hazard Trend</h3>
          <Line data={lineData} options={{ responsive: true }} />
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #eee", padding: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ margin: 0 }}>Inspection Log</h3>
          <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: "4px 10px", borderRadius: 6 }}>
            <option value="all">All</option>
            <option value="pass">Pass</option>
            <option value="fail">Fail</option>
          </select>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f1f3f5" }}>
              {["ID", "Site", "Date", "PPE OK", "Hazards", "Status"].map(h => (
                <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => (
              <tr key={row.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px 12px" }}>{row.id}</td>
                <td style={{ padding: "8px 12px" }}>{row.site}</td>
                <td style={{ padding: "8px 12px" }}>{row.date}</td>
                <td style={{ padding: "8px 12px" }}>{row.ppeCompliant ? "✅" : "❌"}</td>
                <td style={{ padding: "8px 12px" }}>{row.hazards}</td>
                <td style={{ padding: "8px 12px" }}>
                  <span style={{
                    background: row.status === "pass" ? "#d4efdf" : "#fadbd8",
                    color: row.status === "pass" ? "#1e8449" : "#c0392b",
                    padding: "2px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600
                  }}>{row.status.toUpperCase()}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
