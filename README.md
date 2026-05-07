# hse-compliance-dashboard

> React dashboard for visualising scaffolding inspection logs, PPE compliance rates, and site incident trends — built for construction and industrial HSE teams.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Chart.js](https://img.shields.io/badge/Chart.js-4-FF6384?logo=chartdotjs)

---

## Overview

`hse-compliance-dashboard` is a frontend web application that gives site supervisors and HSE officers a live view of inspection data across multiple scaffolding sites. It surfaces PPE compliance rates, hazard counts, inspection pass/fail status, and trend lines — all in one place.

Built to align with **ISO 45001:2018** health and safety management principles, the dashboard was inspired by real-world experience logging and reviewing compliance data in petrochemical environments.

---

## Features

- **Inspection log table** — filterable by pass/fail status and site name
- **Hazard bar chart** — colour-coded by outcome (green = pass, red = fail)
- **Trend line chart** — hazard count over time across inspection dates
- **Summary stat cards** — total inspections, pass count, fail count, PPE compliance rate
- **REST API integration** — connects to any backend returning the inspection schema below
- Responsive layout — works on tablet and desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| Charts | Chart.js 4 + react-chartjs-2 |
| Build Tool | Vite 5 |
| Styling | Inline CSS (no framework dependency) |
| Data | Mock data (swap for real API endpoint) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/your-handle/hse-compliance-dashboard.git
cd hse-compliance-dashboard
npm install
npm run dev
```

Visit `http://localhost:5173`

### Build for production

```bash
npm run build
```

---

## API Contract

The dashboard expects inspection records in this shape:

```json
{
  "id": 1,
  "site": "Block A",
  "date": "2025-01-10",
  "ppeCompliant": true,
  "hazards": 2,
  "status": "pass"
}
```

To connect a real backend, replace the `MOCK_INSPECTIONS` array in `src/App.jsx` with a `fetch` call to your API:

```js
const res = await fetch("https://your-api.com/inspections");
const data = await res.json();
setInspections(data);
```

---

## Project Structure

```
hse-compliance-dashboard/
├── src/
│   ├── App.jsx          # Main dashboard component
│   ├── StatCard.jsx     # Reusable metric card
│   └── main.jsx         # Entry point
├── public/
├── package.json
└── vite.config.js
```

---

## Roadmap

- [ ] Connect to `hse-inspection-logger` TypeScript API
- [ ] Add date range filter
- [ ] Export inspection log to CSV
- [ ] Role-based access (supervisor vs read-only)
- [ ] Mobile responsive layout

---

## Background

This project was built to demonstrate practical application of HSE domain knowledge in a software context. The data model and risk thresholds are informed by two years of hands-on scaffolding and compliance work in petrochemical environments in Nigeria, and by CITB and ISO 45001 frameworks.

---

## License

MIT — free to use and adapt for non-commercial HSE tooling.
