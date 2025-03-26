import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BsCopy } from "react-icons/bs";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Turnover() {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]); // Raw data from API
  const [calculatedRecords, setCalculatedRecords] = useState([]); // Processed data
  const [filter, setFilter] = useState({
    fromDate: "",
    toDate: "",
    date: "",
    locnid: "",
    usercode: [],
  });

  const [uniqueDates, setUniqueDates] = useState([]);
  const [uniqueLocnids, setUniqueLocnids] = useState([]);
  const usercodesList = [
    "OMNAP00527", "OMN391", "EXCADMIN", "OMNAP00677", "OMNAP00754",
    "OMNAP00684", "731NEK", "OMNAP00749", "OMNAP00860", "OMNAP00909",
    "OMNAP00653", "OMN850", "OMN396", "OMNAP00745", "OMN897",
    "731PKK", "OMN633", "OMNAP00619", "OMNAP00505", "731CHS",
    "OMNAP00816", "022BHO", "079HSM", "OMN064", "OMNAP00578",
    "OMNAP00587", "OMN321", "OMNAP00755", "OMN339", "OMNAP00753",
    "731JYO", "731PWB", "731JKM", "OMN075", "OMNAP00700", "OMN560",
    "OMNAP00804", "OMN526", "080VEE", "080ASK", "022ABR", "OMN148",
    "OMNAP00630", "OMN252", "OMNAP00544", "OMNAP00771", "OMNAP00736",
    "OMN756", "OMN786", "OMN933", "OMN629", "OMN014", "OMNAP00433",
    "OMN572", "OMN748", "OMN475", "OMNAP00434", "OMNAP00511",
    "OMNAP00513", "OMN678", "OMNAP00701", "OMN769", "OMNAP00751",
    "OMN835", "OMN639", "OMN279", "OMNAP00509", "OMNAP00636",
    "OMNAP00759", "OMNAP00679", "OMN762", "OMNAP00607", "OMNAP00647",
    "731ANH", "731RBJ", "731BAP", "OMN141", "OMNAP00765", "OMNAP00888",
    "731SRP", "OMNAP00715", "OMNAP00720", "OMNAP00795"
  ];

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(`http://183.182.84.228:4005/dealslip/`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setRecords(data);
        processData(data);
      } catch (error) {
        alert(`Failed to fetch data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const processData = (data) => {
    const { fromDate, toDate, locnid, usercode } = filter;
    const groupedData = {};

    // Convert locnid and usercode filters into arrays
    const locnidList = locnid ? locnid.split(",").map((id) => id.trim()) : [];
    const usercodeList = usercode.length ? usercode : [];

    // Convert date input from 'dd-mm-yyyy' to 'YYYYMMDD'
  //   const formatDate = (dateStr) => {
  //     if (!dateStr) return null;
  //     const parts = dateStr.split("-");
  //     return `${parts[2]}-${parts[1]}-${parts[0]}`; // Convert dd-mm-yyyy → yyyy-mm-dd
  // };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

    const fromDateFormatted = formatDate(fromDate);
    const toDateFormatted = formatDate(toDate);

    const filteredRecords = data.filter((record) => {
        const recordDate = record.date; // Already in 'YYYYMMDD' format

        // Check if the record date is within the given range
        const matchesDate = 
            (!fromDateFormatted || recordDate >= fromDateFormatted) &&
            (!toDateFormatted || recordDate <= toDateFormatted);

        const matchesLocnid =
            locnidList.length === 0 || locnidList.includes(record.locnid);
        const matchesUsercode =
            usercodeList.length === 0 || usercodeList.includes(record.usercode);
        
        return matchesDate && matchesLocnid && matchesUsercode;
    });

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
          mtf: 0,
          mtm: 0,
        };
      }

      // Turnover calculations
      const turnover = tradedqty * (avgprice + stk);

      if (["NSE", "BSE"].includes(exchange) && !["FUTSTK", "OPTIDX", "OPTSTK", "FUTIDX"].includes(segment)) {
        groupedData[groupKey].all_nse_bse_turnover += turnover;
        if (!isOMNUser) {
          groupedData[groupKey].without_omn_nse_bse_turnover += turnover;
        }
      }

      if (["FUTSTK", "OPTIDX", "OPTSTK", "FUTIDX"].includes(segment)) {
        groupedData[groupKey].all_derivative_turnover += turnover;
        if (!isOMNUser) {
          groupedData[groupKey].without_omn_derivative_turnover += turnover;
        }
      }

      if (["FUTSTK", "FUTIDX"].includes(segment)) {
        groupedData[groupKey].all_future_turnover += turnover;
        if (!isOMNUser) {
          groupedData[groupKey].without_omn_future_turnover += turnover;
        }
      }

      if (["OPTIDX", "OPTSTK"].includes(segment)) {
        groupedData[groupKey].all_opt_turnover_with_stk += turnover;
        groupedData[groupKey].all_opt_turnover_without_stk += tradedqty * avgprice;
        if (!isOMNUser) {
          groupedData[groupKey].without_omn_opt_turnover_with_stk += turnover;
          groupedData[groupKey].without_omn_opt_turnover_without_stk += tradedqty * avgprice;
        }
      }

      const mtf = parseFloat(record.mtf || 0);
      const mtm = parseFloat(record.mtm || 0);

      if (groupedData[groupKey].mtf === 0 && mtf !== 0) {
        groupedData[groupKey].mtf = mtf;
      }
      if (groupedData[groupKey].mtm === 0 && mtm !== 0) {
        groupedData[groupKey].mtm = mtm;
      }
    });

    const processedData = Object.values(groupedData).sort((a, b) => new Date(b.date) - new Date(a.date));
    setCalculatedRecords(processedData);

    const dates = Array.from(new Set(processedData.map((record) => record.date)));
    setUniqueDates(dates);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    processData(records);
  };

  const handleUsercodeChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFilter((prevFilter) => ({
      ...prevFilter,
      usercode: selectedOptions,
    }));
  };


  // Function to download filtered data as CSV
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(calculatedRecords);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "FilteredData");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    saveAs(data, "FilteredData.xlsx");
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
  
    const rowData = 
    `Kotak Turnover Dated ${record.date}
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
MTF Funding Value(T-1): ${formatToLakhsOrCrores(record.mtf)}
MTM Value(T-1): ${formatToLakhsOrCrores(record.mtm)}`;
  
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

  const handleClearFilters = () => {
    setFilter({ date: "", locnid: "", usercode: [] , fromDate: "" , toDate: "" });
    processData(records); // Reload full dataset
  };


    // Pagination functions
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = calculatedRecords.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(calculatedRecords.length / recordsPerPage);
    const availableUsercodes = usercodesList.filter((code) =>
  records.some((record) => record.usercode === code)
);

const uniquelocnid = Array.from(new Set(records.map(record => record.locnid)));

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
            {/* <label>
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
            </label> */}


<label>From Date:</label>
      <input type="date" name="fromDate" value={filter.fromDate} onChange={handleFilterChange} />

      <label>To Date:</label>
      <input type="date" name="toDate" value={filter.toDate} onChange={handleFilterChange} />

            <label>
              Location ID:
              <input
                type="text"
                name="locnid"
                value={filter.locnid}
                onChange={handleFilterChange}
                list="locnid-list"
                placeholder="Enter locnid (comma separated)"
                style={{ marginLeft: "10px", marginRight: "20px" }}
              />
              <datalist id="locnid-list">
                {uniquelocnid.map((locnid) => (
                  <option key={locnid} value={locnid}>{locnid}</option>
                ))}
              </datalist>
            </label>

            {/* Multi-select for usercode */}
            <label>
              User Code:
              <input
                type="text"
                name="usercode"
                value={filter.usercode}
                onChange={handleFilterChange}
                list="usercode-list"
                placeholder="Enter user codes (comma separated)"
                style={{ marginLeft: "10px", marginRight: "20px" }}
              />
             <datalist id="usercode-list">
                {availableUsercodes.map((code) => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </datalist>
            </label>

            <button onClick={handleFilterSubmit}>Submit</button>

          <button onClick={handleClearFilters}>Clear Filter</button>

          <button onClick={downloadExcel} disabled={!calculatedRecords.length}>Download CSV</button>
        </div>
      )}

      {!loading && calculatedRecords.length > 0 && (
<>
<button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
<span> Page {currentPage} of {totalPages} </span>
<button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
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
              <th>MTF Funding Value(T-1)</th>
              <th>MTM Value(T-1)</th>
            </tr>
          </thead>
          <tbody>
            {calculatedRecords.map((record, index) => (
              <tr key={index}>
                <td>
                <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#007bff",
                    }}
                    onClick={() => handleCopy(record)}
                  >
                    <BsCopy size={20} />
                  </button>
                  {/* <button onClick={() => handleCopy(record)}><BsCopy/></button> */}
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
                <td>{record.mtf}</td>
                <td>{record.mtm}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
      )}
      {!loading && calculatedRecords.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No data available for display. Please adjust your filters.
        </p>
      )}
    </div>
  );
}






  // const processData = (data) => {
  //   const { date } = filter;
  //   const groupedData = {};
  //   const filteredRecords = data.filter((record) => !date || record.date === date);

  //   filteredRecords.forEach((record) => {
  //     const date = record.date;
  //     const avgprice = parseFloat(record.avgprice || 0);
  //     const stk = parseFloat(record.stk || 0);
  //     const tradedqty = parseFloat(record.tradedqty || 0);
  //     const segment = record.segment;
  //     const exchange = record.exchange;
  //     const usercode = record.usercode || "";

  //     const isOMNUser = usercode.startsWith("OMN");
  //     const groupKey = `${date}`;

  //     if (!groupedData[groupKey]) {
  //       groupedData[groupKey] = {
  //         date,
  //         all_nse_bse_turnover: 0,
  //         without_omn_nse_bse_turnover: 0,
  //         all_derivative_turnover: 0,
  //         without_omn_derivative_turnover: 0,
  //         all_future_turnover: 0,
  //         without_omn_future_turnover: 0,
  //         all_opt_turnover_with_stk: 0,
  //         all_opt_turnover_without_stk: 0,
  //         without_omn_opt_turnover_with_stk: 0,
  //         without_omn_opt_turnover_without_stk: 0,
  //       };
  //     }

  //     if (["NSE", "BSE"].includes(exchange)) {
  //       if (!["FUTSTK", "OPTIDX", "OPTSTK", "FUTIDX"].includes(segment)) {
  //         const turnover = tradedqty * (avgprice + stk);
  //         groupedData[groupKey].all_nse_bse_turnover += turnover;
  //         if (!isOMNUser) {
  //           groupedData[groupKey].without_omn_nse_bse_turnover += turnover;
  //         }
  //       }
  //     }

  //     if (["FUTSTK", "OPTIDX", "OPTSTK", "FUTIDX"].includes(segment)) {
  //       const turnover = tradedqty * (avgprice + stk);
  //       groupedData[groupKey].all_derivative_turnover += turnover;
  //       if (!isOMNUser) {
  //         groupedData[groupKey].without_omn_derivative_turnover += turnover;
  //       }
  //     }

  //     if (["FUTSTK", "FUTIDX"].includes(segment)) {
  //       const turnover = tradedqty * (avgprice + stk);
  //       groupedData[groupKey].all_future_turnover += turnover;
  //       if (!isOMNUser) {
  //         groupedData[groupKey].without_omn_future_turnover += turnover;
  //       }
  //     }
  //     if (["OPTIDX", "OPTSTK"].includes(segment)) {
  //       const turnover = tradedqty * (avgprice + stk);
  //       const turnovers = tradedqty * avgprice;
  //       groupedData[groupKey].all_opt_turnover_with_stk += turnover;
  //       if (!isOMNUser) {
  //         groupedData[groupKey].without_omn_opt_turnover_with_stk += turnover;
  //       }
  //       groupedData[groupKey].all_opt_turnover_without_stk += turnovers;
  //       if (!isOMNUser) {
  //         groupedData[groupKey].without_omn_opt_turnover_without_stk += turnovers;
  //       }
  //     }
  //   });

  //   const processedData = Object.values(groupedData).sort((a, b) => new Date(a.date) - new Date(b.date));
  //   setCalculatedRecords(processedData);
  //   const dates = Array.from(new Set(processedData.map((record) => record.date)));
  //   setUniqueDates(dates);
  // };








































// import React, { useEffect, useState } from "react";
// import { Spinner } from "react-bootstrap";
// import { BsCopy } from "react-icons/bs";

// export default function Turnover() {
//   const [loading, setLoading] = useState(false);
//   const [records, setRecords] = useState([]); // Raw data from API
//   const [calculatedRecords, setCalculatedRecords] = useState([]); // Processed data
//   const [filter, setFilter] = useState({
//     date: "", // Filter for date
//   });
//   const [uniqueDates, setUniqueDates] = useState([]); // Store unique dates

//   useEffect(() => {
//     async function fetchData() {
//       setLoading(true);
//       try {
//         const response = await fetch(`http://183.182.84.228:4005/dealslip/`);
//         if (!response.ok) {
//           throw new Error(`Error: ${response.statusText}`);
//         }
//         const data = await response.json();
//         setRecords(data); // Save raw data to state
//         processData(data); // Process data
//       } catch (error) {
//         alert(`Failed to fetch data: ${error.message}`);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, []);


//   const processData = (data) => {
//     const { date } = filter;
//     const groupedData = {};
//     const filteredRecords = data.filter((record) => !date || record.date === date);

  
//     filteredRecords.forEach((record) => {
//       const date = record.date;
//       const avgprice = parseFloat(record.avgprice || 0);
//       const stk = parseFloat(record.stk || 0);
//       const tradedqty = parseFloat(record.tradedqty || 0);
//       const segment = record.segment;
//       const exchange = record.exchange;
//       const usercode = record.usercode || "";
//       const locnid = record.locnid;
  
//       const isOMNUser = usercode.startsWith("OMN");
//       const groupKey = `${date}`;
  
//       if (!groupedData[groupKey]) {
//         groupedData[groupKey] = {
//           date,
//           all_nse_bse_turnover: 0,
//           without_omn_nse_bse_turnover: 0,
//           all_derivative_turnover: 0,
//           without_omn_derivative_turnover: 0,
//           all_future_turnover: 0,
//           without_omn_future_turnover: 0,
//           all_opt_turnover_with_stk: 0,
//           all_opt_turnover_without_stk: 0,
//           without_omn_opt_turnover_with_stk: 0,
//           without_omn_opt_turnover_without_stk: 0,
//           mtf: 0,  // Initialize mtf to 0
//           mtm: 0,  // Initialize mtm to 0
//           direct_client_turnover: 0, // New column
//           indirect_client_turnover: 0, // New column
//         };
//       }
  
//       // Handle turnover calculations
//       if (["NSE", "BSE"].includes(exchange)) {
//         if (!["FUTSTK", "OPTIDX", "OPTSTK", "FUTIDX"].includes(segment)) {
//           const turnover = tradedqty * (avgprice + stk);
//           groupedData[groupKey].all_nse_bse_turnover += turnover;
//           if (!isOMNUser) {
//             groupedData[groupKey].without_omn_nse_bse_turnover += turnover;
//           }
//         }
//       }
  
//       if (["FUTSTK", "OPTIDX", "OPTSTK", "FUTIDX"].includes(segment)) {
//         const turnover = tradedqty * (avgprice + stk);
//         groupedData[groupKey].all_derivative_turnover += turnover;
//         if (!isOMNUser) {
//           groupedData[groupKey].without_omn_derivative_turnover += turnover;
//         }
//       }
  
//       if (["FUTSTK", "FUTIDX"].includes(segment)) {
//         const turnover = tradedqty * (avgprice + stk);
//         groupedData[groupKey].all_future_turnover += turnover;
//         if (!isOMNUser) {
//           groupedData[groupKey].without_omn_future_turnover += turnover;
//         }
//       }
//       if (["OPTIDX", "OPTSTK"].includes(segment)) {
//         const turnover = tradedqty * (avgprice + stk);
//         const turnovers = tradedqty * avgprice;
//         groupedData[groupKey].all_opt_turnover_with_stk += turnover;
//         if (!isOMNUser) {
//           groupedData[groupKey].without_omn_opt_turnover_with_stk += turnover;
//         }
//         groupedData[groupKey].all_opt_turnover_without_stk += turnovers;
//         if (!isOMNUser) {
//           groupedData[groupKey].without_omn_opt_turnover_without_stk += turnovers;
//         }
//       }

//       if (["E640", "E740", "E110", "E224", "EX01"].includes(locnid)) {
//         const turnover = tradedqty * (avgprice + stk);
//         groupedData[groupKey].direct_client_turnover += turnover;
//       } else if (!["E640", "E740", "E110", "E224", "EX01"].includes(locnid)){
//         const turnover = tradedqty * (avgprice + stk);
//         groupedData[groupKey].indirect_client_turnover += turnover;
//       }
  
//       // Add mtf and mtm values
//       const mtf = parseFloat(record.mtf || 0);
//       const mtm = parseFloat(record.mtm || 0);
  
//       // Only add the first non-zero mtf and mtm value
//       if (groupedData[groupKey].mtf === 0 && mtf !== 0) {
//         groupedData[groupKey].mtf = mtf;
//       }
  
//       if (groupedData[groupKey].mtm === 0 && mtm !== 0) {
//         groupedData[groupKey].mtm = mtm;
//       }
//     });
  
//     const processedData = Object.values(groupedData).sort((a, b) => new Date(b.date) - new Date(a.date));
//     setCalculatedRecords(processedData);
//     const dates = Array.from(new Set(processedData.map((record) => record.date)));
//     setUniqueDates(dates);


//   };
  

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilter({ ...filter, [name]: value });
//   };

//   const handleFilterSubmit = (e) => {
//     e.preventDefault();
//     processData(records);
//   };

//   // Function to copy a row's data to clipboard
//   const handleCopy = (record) => {
//     const formatToLakhsOrCrores = (value) => {
//       if (value >= 10000000) {
//         return `${(value / 10000000).toFixed(2)} Cr`;
//       } else if (value >= 100000) {
//         return `${(value / 100000).toFixed(2)} Lc`;
//       }
//       return `${value.toFixed(2)}`;
//     };
  
//     const rowData = 
//     `Kotak Turnover Dated ${record.date}
// All NSE/BSE Turnover: ${formatToLakhsOrCrores(record.all_nse_bse_turnover)}
// Mobile NSE/BSE Turnover: ${formatToLakhsOrCrores(record.without_omn_nse_bse_turnover)}
// All Derivative Turnover: ${formatToLakhsOrCrores(record.all_derivative_turnover)}
// Mobile Derivative Turnover: ${formatToLakhsOrCrores(record.without_omn_derivative_turnover)}
// All Future Turnover: ${formatToLakhsOrCrores(record.all_future_turnover)}
// Mobile Future Turnover: ${formatToLakhsOrCrores(record.without_omn_future_turnover)}
// All Option with Stk Turnover: ${formatToLakhsOrCrores(record.all_opt_turnover_with_stk)}
// Mobile Option with Stk Turnover: ${formatToLakhsOrCrores(record.without_omn_opt_turnover_with_stk)}
// All Option without Stk Turnover: ${formatToLakhsOrCrores(record.all_opt_turnover_without_stk)}
// Mobile Option without Stk Turnover: ${formatToLakhsOrCrores(record.without_omn_opt_turnover_without_stk)}
// MTF Funding Value(T-1): ${formatToLakhsOrCrores(record.mtf)}
// MTM Value(T-1): ${formatToLakhsOrCrores(record.mtm)}
// direct_client_turnover: ${formatToLakhsOrCrores(record.direct_client_turnover)}
// indirect_client_turnover: ${formatToLakhsOrCrores(record.indirect_client_turnover)}`;
  
//     // Check if the Clipboard API is available
//     if (navigator.clipboard && navigator.clipboard.writeText) {
//       navigator.clipboard.writeText(rowData.trim())
//         .then(() => {
//           alert("Row data copied to clipboard!");
//         })
//         .catch((err) => {
//           console.error("Clipboard write failed: ", err);
//           fallbackCopyTextToClipboard(rowData.trim());
//         });
//     } else {
//       // Fallback if Clipboard API is not available
//       fallbackCopyTextToClipboard(rowData.trim());
//     }
//   };
  
//   // Fallback function using a temporary textarea
//   const fallbackCopyTextToClipboard = (text) => {
//     const textArea = document.createElement("textarea");
//     textArea.value = text;
//     textArea.style.position = "fixed"; // Avoid scrolling to the bottom
//     document.body.appendChild(textArea);
//     textArea.focus();
//     textArea.select();
//     try {
//       document.execCommand("copy");
//       alert("Row data copied to clipboard!");
//     } catch (err) {
//       console.error("Fallback: Copy to clipboard failed", err);
//       alert("Copy failed. Please select the text manually.");
//     }
//     document.body.removeChild(textArea);
//   };
  
  

//   return (
//     <div style={{ padding: "20px" }}>
//       <h3 style={{ textAlign: "center" }}>Trades Turnover Summary</h3>
//       {loading && (
//         <div style={{ textAlign: "center", marginTop: "20px" }}>
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       )}
//       {!loading && (
//         <div style={{ marginBottom: "20px" }}>
//           <form onSubmit={handleFilterSubmit}>
//             <label>
//               Date:
//               <select
//                 name="date"
//                 value={filter.date}
//                 onChange={handleFilterChange}
//                 style={{ marginLeft: "10px", marginRight: "20px" }}
//               >
//                 <option value="">Select Date</option>
//                 {uniqueDates.map((date, index) => (
//                   <option key={index} value={date}>
//                     {new Date(date).toLocaleDateString()}
//                   </option>
//                 ))}
//               </select>
//             </label>
//             <button type="submit">Submit</button>
//           </form>
//         </div>
//       )}

//       {!loading && calculatedRecords.length > 0 && (
//         <table
//           border="1"
//           style={{
//             width: "100%",
//             textAlign: "center",
//             marginTop: "20px",
//             borderCollapse: "collapse",
//           }}
//         >
//           <thead>
//             <tr style={{ backgroundColor: "#f2f2f2" }}>
//             <th>Copy</th>
//               <th>Date</th>
//               <th>All NSE/BSE Turnover</th>
//               <th>Mobile NSE/BSE Turnover</th>
//               <th>All Derivative Turnover</th>
//               <th>Mobile Derivative Turnover</th>
//               <th>All Future Turnover</th>
//               <th>Mobile Future Turnover</th>
//               <th>All Option with Stk Turnover</th>
//               <th>Mobile Option with Stk Turnover</th>
//               <th>All Option without Stk Turnover</th>
//               <th>Mobile Option without Stk Turnover</th>
//               <th>MTF Funding Value(T-1)</th>
//               <th>MTM Value(T-1)</th>
//               <th>direct_client_turnover</th>
//               <th>indirect_client_turnover</th>
//             </tr>
//           </thead>
//           <tbody>
//             {calculatedRecords.map((record, index) => (
//               <tr key={index}>
//                 <td>
//                 <button
//                     style={{
//                       background: "none",
//                       border: "none",
//                       cursor: "pointer",
//                       color: "#007bff",
//                     }}
//                     onClick={() => handleCopy(record)}
//                   >
//                     <BsCopy size={20} />
//                   </button>
//                   {/* <button onClick={() => handleCopy(record)}><BsCopy/></button> */}
//                 </td>
//                 <td>{record.date}</td>
//                 <td>{record.all_nse_bse_turnover.toFixed(2)}</td>
//                 <td>{record.without_omn_nse_bse_turnover.toFixed(2)}</td>
//                 <td>{record.all_derivative_turnover.toFixed(2)}</td>
//                 <td>{record.without_omn_derivative_turnover.toFixed(2)}</td>
//                 <td>{record.all_future_turnover.toFixed(2)}</td>
//                 <td>{record.without_omn_future_turnover.toFixed(2)}</td>
//                 <td>{record.all_opt_turnover_with_stk.toFixed(2)}</td>
//                 <td>{record.without_omn_opt_turnover_with_stk.toFixed(2)}</td>
//                 <td>{record.all_opt_turnover_without_stk.toFixed(2)}</td>
//                 <td>{record.without_omn_opt_turnover_without_stk.toFixed(2)}</td>
//                 <td>{record.mtf}</td>
//                 <td>{record.mtm}</td>
//                 <td>{record.direct_client_turnover}</td>
//                 <td>{record.indirect_client_turnover}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//       {!loading && calculatedRecords.length === 0 && (
//         <p style={{ textAlign: "center", marginTop: "20px" }}>
//           No data available for display. Please adjust your filters.
//         </p>
//       )}
//     </div>
//   );
// }






//   // const processData = (data) => {
//   //   const { date } = filter;
//   //   const groupedData = {};
//   //   const filteredRecords = data.filter((record) => !date || record.date === date);

//   //   filteredRecords.forEach((record) => {
//   //     const date = record.date;
//   //     const avgprice = parseFloat(record.avgprice || 0);
//   //     const stk = parseFloat(record.stk || 0);
//   //     const tradedqty = parseFloat(record.tradedqty || 0);
//   //     const segment = record.segment;
//   //     const exchange = record.exchange;
//   //     const usercode = record.usercode || "";

//   //     const isOMNUser = usercode.startsWith("OMN");
//   //     const groupKey = `${date}`;

//   //     if (!groupedData[groupKey]) {
//   //       groupedData[groupKey] = {
//   //         date,
//   //         all_nse_bse_turnover: 0,
//   //         without_omn_nse_bse_turnover: 0,
//   //         all_derivative_turnover: 0,
//   //         without_omn_derivative_turnover: 0,
//   //         all_future_turnover: 0,
//   //         without_omn_future_turnover: 0,
//   //         all_opt_turnover_with_stk: 0,
//   //         all_opt_turnover_without_stk: 0,
//   //         without_omn_opt_turnover_with_stk: 0,
//   //         without_omn_opt_turnover_without_stk: 0,
//   //       };
//   //     }

//   //     if (["NSE", "BSE"].includes(exchange)) {
//   //       if (!["FUTSTK", "OPTIDX", "OPTSTK", "FUTIDX"].includes(segment)) {
//   //         const turnover = tradedqty * (avgprice + stk);
//   //         groupedData[groupKey].all_nse_bse_turnover += turnover;
//   //         if (!isOMNUser) {
//   //           groupedData[groupKey].without_omn_nse_bse_turnover += turnover;
//   //         }
//   //       }
//   //     }

//   //     if (["FUTSTK", "OPTIDX", "OPTSTK", "FUTIDX"].includes(segment)) {
//   //       const turnover = tradedqty * (avgprice + stk);
//   //       groupedData[groupKey].all_derivative_turnover += turnover;
//   //       if (!isOMNUser) {
//   //         groupedData[groupKey].without_omn_derivative_turnover += turnover;
//   //       }
//   //     }

//   //     if (["FUTSTK", "FUTIDX"].includes(segment)) {
//   //       const turnover = tradedqty * (avgprice + stk);
//   //       groupedData[groupKey].all_future_turnover += turnover;
//   //       if (!isOMNUser) {
//   //         groupedData[groupKey].without_omn_future_turnover += turnover;
//   //       }
//   //     }
//   //     if (["OPTIDX", "OPTSTK"].includes(segment)) {
//   //       const turnover = tradedqty * (avgprice + stk);
//   //       const turnovers = tradedqty * avgprice;
//   //       groupedData[groupKey].all_opt_turnover_with_stk += turnover;
//   //       if (!isOMNUser) {
//   //         groupedData[groupKey].without_omn_opt_turnover_with_stk += turnover;
//   //       }
//   //       groupedData[groupKey].all_opt_turnover_without_stk += turnovers;
//   //       if (!isOMNUser) {
//   //         groupedData[groupKey].without_omn_opt_turnover_without_stk += turnovers;
//   //       }
//   //     }
//   //   });

//   //   const processedData = Object.values(groupedData).sort((a, b) => new Date(a.date) - new Date(b.date));
//   //   setCalculatedRecords(processedData);
//   //   const dates = Array.from(new Set(processedData.map((record) => record.date)));
//   //   setUniqueDates(dates);
//   // };
