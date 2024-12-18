

import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BsCopy } from "react-icons/bs";

export default function Turnover() {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]); // Raw data from API
  const [calculatedRecords, setCalculatedRecords] = useState([]); // Processed data
  const [filter, setFilter] = useState({
    date: "", // Filter for date
  });
  const [uniqueDates, setUniqueDates] = useState([]); // Store unique dates

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(`http://183.182.84.228:4005/dealslip/`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setRecords(data); // Save raw data to state
        processData(data); // Process data
      } catch (error) {
        alert(`Failed to fetch data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const processData = (data) => {
    const { date } = filter;
    const groupedData = {};
    const filteredRecords = data.filter((record) => !date || record.date === date);

    filteredRecords.forEach((record) => {
      const date = record.date;
      const avgprice = parseFloat(record.avgprice || 0);
      const stk = parseFloat(record.stk || 0);
      const tradedqty = parseFloat(record.tradedqty || 0);
      const segment = record.segment;
      const exchange = record.exchange;
      const usercode = record.usercode || "";

      const isOMNUser = usercode.startsWith("OMN");
      const groupKey = `${date}`;

      if (!groupedData[groupKey]) {
        groupedData[groupKey] = {
          date,
          all_nse_bse_turnover: 0,
          without_omn_nse_bse_turnover: 0,
          all_derivative_turnover: 0,
          without_omn_derivative_turnover: 0,
          all_future_turnover: 0,
          without_omn_future_turnover: 0,
          all_opt_turnover_with_stk: 0,
          all_opt_turnover_without_stk: 0,
          without_omn_opt_turnover_with_stk: 0,
          without_omn_opt_turnover_without_stk: 0,
        };
      }

      if (["NSE", "BSE"].includes(exchange)) {
        if (!["FUTSTK", "OPTIDX", "OPTSTK", "FUTIDX"].includes(segment)) {
          const turnover = tradedqty * (avgprice + stk);
          groupedData[groupKey].all_nse_bse_turnover += turnover;
          if (!isOMNUser) {
            groupedData[groupKey].without_omn_nse_bse_turnover += turnover;
          }
        }
      }

      if (["FUTSTK", "OPTIDX", "OPTSTK", "FUTIDX"].includes(segment)) {
        const turnover = tradedqty * (avgprice + stk);
        groupedData[groupKey].all_derivative_turnover += turnover;
        if (!isOMNUser) {
          groupedData[groupKey].without_omn_derivative_turnover += turnover;
        }
      }

      if (["FUTSTK", "FUTIDX"].includes(segment)) {
        const turnover = tradedqty * (avgprice + stk);
        groupedData[groupKey].all_future_turnover += turnover;
        if (!isOMNUser) {
          groupedData[groupKey].without_omn_future_turnover += turnover;
        }
      }
      if (["OPTIDX", "OPTSTK"].includes(segment)) {
        const turnover = tradedqty * (avgprice + stk);
        const turnovers = tradedqty * avgprice;
        groupedData[groupKey].all_opt_turnover_with_stk += turnover;
        if (!isOMNUser) {
          groupedData[groupKey].without_omn_opt_turnover_with_stk += turnover;
        }
        groupedData[groupKey].all_opt_turnover_without_stk += turnovers;
        if (!isOMNUser) {
          groupedData[groupKey].without_omn_opt_turnover_without_stk += turnovers;
        }
      }
    });

    const processedData = Object.values(groupedData).sort((a, b) => new Date(a.date) - new Date(b.date));
    setCalculatedRecords(processedData);
    const dates = Array.from(new Set(processedData.map((record) => record.date)));
    setUniqueDates(dates);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    processData(records);
  };

  // Function to copy a row's data to clipboard
  const handleCopy = (record) => {
    const formatToLakhsOrCrores = (value) => {
      if (value >= 10000000) {
        return `${(value / 10000000).toFixed(2)} Cr`;
      } else if (value >= 100000) {
        return `${(value / 100000).toFixed(2)} Lc`;
      }
      return `${value.toFixed(2)}`;
    };
  
    const rowData = `
  Kotak Turnover Dated ${record.date}
  All NSE/BSE Turnover: ${formatToLakhsOrCrores(record.all_nse_bse_turnover)}
  Mobile NSE/BSE Turnover: ${formatToLakhsOrCrores(record.without_omn_nse_bse_turnover)}
  All Derivative Turnover: ${formatToLakhsOrCrores(record.all_derivative_turnover)}
  Mobile Derivative Turnover: ${formatToLakhsOrCrores(record.without_omn_derivative_turnover)}
  All Future Turnover: ${formatToLakhsOrCrores(record.all_future_turnover)}
  Mobile Future Turnover: ${formatToLakhsOrCrores(record.without_omn_future_turnover)}
  All Option with Stk Turnover: ${formatToLakhsOrCrores(record.all_opt_turnover_with_stk)}
  Mobile Option with Stk Turnover: ${formatToLakhsOrCrores(record.without_omn_opt_turnover_with_stk)}
  All Option without Stk Turnover: ${formatToLakhsOrCrores(record.all_opt_turnover_without_stk)}
  Mobile Option without Stk Turnover: ${formatToLakhsOrCrores(record.without_omn_opt_turnover_without_stk)}
    `;
  
    // Check if the Clipboard API is available
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(rowData.trim())
        .then(() => {
          alert("Row data copied to clipboard!");
        })
        .catch((err) => {
          console.error("Clipboard write failed: ", err);
          fallbackCopyTextToClipboard(rowData.trim());
        });
    } else {
      // Fallback if Clipboard API is not available
      fallbackCopyTextToClipboard(rowData.trim());
    }
  };
  
  // Fallback function using a temporary textarea
  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; // Avoid scrolling to the bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      alert("Row data copied to clipboard!");
    } catch (err) {
      console.error("Fallback: Copy to clipboard failed", err);
      alert("Copy failed. Please select the text manually.");
    }
    document.body.removeChild(textArea);
  };
  
  

  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ textAlign: "center" }}>Trades Turnover Summary</h3>
      {loading && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {!loading && (
        <div style={{ marginBottom: "20px" }}>
          <form onSubmit={handleFilterSubmit}>
            <label>
              Date:
              <select
                name="date"
                value={filter.date}
                onChange={handleFilterChange}
                style={{ marginLeft: "10px", marginRight: "20px" }}
              >
                <option value="">Select Date</option>
                {uniqueDates.map((date, index) => (
                  <option key={index} value={date}>
                    {new Date(date).toLocaleDateString()}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {!loading && calculatedRecords.length > 0 && (
        <table
          border="1"
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: "20px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>Copy</th>
              <th>Date</th>
              <th>All NSE/BSE Turnover</th>
              <th>Mobile NSE/BSE Turnover</th>
              <th>All Derivative Turnover</th>
              <th>Mobile Derivative Turnover</th>
              <th>All Future Turnover</th>
              <th>Mobile Future Turnover</th>
              <th>All Option with Stk Turnover</th>
              <th>Mobile Option with Stk Turnover</th>
              <th>All Option without Stk Turnover</th>
              <th>Mobile Option without Stk Turnover</th>
            </tr>
          </thead>
          <tbody>
            {calculatedRecords.map((record, index) => (
              <tr key={index}>
                <td>
                  <button onClick={() => handleCopy(record)}><BsCopy/></button>
                </td>
                <td>{record.date}</td>
                <td>{record.all_nse_bse_turnover.toFixed(2)}</td>
                <td>{record.without_omn_nse_bse_turnover.toFixed(2)}</td>
                <td>{record.all_derivative_turnover.toFixed(2)}</td>
                <td>{record.without_omn_derivative_turnover.toFixed(2)}</td>
                <td>{record.all_future_turnover.toFixed(2)}</td>
                <td>{record.without_omn_future_turnover.toFixed(2)}</td>
                <td>{record.all_opt_turnover_with_stk.toFixed(2)}</td>
                <td>{record.without_omn_opt_turnover_with_stk.toFixed(2)}</td>
                <td>{record.all_opt_turnover_without_stk.toFixed(2)}</td>
                <td>{record.without_omn_opt_turnover_without_stk.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && calculatedRecords.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No data available for display. Please adjust your filters.
        </p>
      )}
    </div>
  );
}
