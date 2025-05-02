import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import * as XLSX from 'xlsx';

export default function Brokrage() {
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [allRecords, setAllRecords] = useState({ porteq: [], portfu: [], portop: [], portcom: [] });
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [database, setDatabase] = useState(localStorage.getItem("database") || "");
  const [calculationType, setCalculationType] = useState("Slab"); // Default is Slab
  // const [percentage, setPercentage] = useState({ squp: 0.02, dlbrok: 0.2 });
  const [percentage, setPercentage] = useState({
    eq: { squp_slab: 0.02, dlbrok_slab: 0.2, squp_perc: 10, dlbrok_perc: 10 },
    fu: { squp_slab: 0.02, dlbrok_slab: 0.2, squp_perc: 10, dlbrok_perc: 10 },
    op: { squp_slab: 0.02, dlbrok_slab: 0.2, squp_perc: 10, dlbrok_perc: 10 },
    com: { squp_slab: 0.02, dlbrok_slab: 0.2, squp_perc: 10, dlbrok_perc: 10 }
  });
  
  const [previewMode, setPreviewMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [clientCodeFilter, setClientCodeFilter] = useState("");
  const [locnidFilter, setLocnidFilter] = useState("");
  const [locnidFilter1, setLocnidFilter1] = useState("");
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 50; // Number of records per page

  // Load stored percentages when component mounts
  // useEffect(() => {
  //   setPercentage({
  //     squp: parseFloat(localStorage.getItem("squp")) || 0.02,
  //     dlbrok: parseFloat(localStorage.getItem("dlbrok")) || 0.2,
  //   });
  // }, []);




  // useEffect(() => {
  //   setPercentage({
  //     eq: {
  //       squp: parseFloat(localStorage.getItem("eq_squp")) || 0.02,
  //       dlbrok: parseFloat(localStorage.getItem("eq_dlbrok")) || 0.2,
  //     },
  //     fu: {
  //       squp: parseFloat(localStorage.getItem("fu_squp")) || 0.02,
  //       dlbrok: parseFloat(localStorage.getItem("fu_dlbrok")) || 0.2,
  //     },
  //     op: {
  //       squp: parseFloat(localStorage.getItem("op_squp")) || 0.02,
  //       dlbrok: parseFloat(localStorage.getItem("op_dlbrok")) || 0.2,
  //     },
  //     com: {
  //       squp: parseFloat(localStorage.getItem("com_squp")) || 0.02,
  //       dlbrok: parseFloat(localStorage.getItem("com_dlbrok")) || 0.2,
  //     },
  //   });
  // }, []);


  useEffect(() => {
    const storedType = localStorage.getItem("calculationType") || "Slab";
    setCalculationType(storedType);
  
    setPercentage({
      eq: {
        squp_slab: parseFloat(localStorage.getItem("eq_squp_slab")) || 0.02,
        dlbrok_slab: parseFloat(localStorage.getItem("eq_dlbrok_slab")) || 0.2,
        squp_perc: parseFloat(localStorage.getItem("eq_squp_perc")) || 10,
        dlbrok_perc: parseFloat(localStorage.getItem("eq_dlbrok_perc")) || 10,
      },
      fu: {
        squp_slab: parseFloat(localStorage.getItem("fu_squp_slab")) || 0.02,
        dlbrok_slab: parseFloat(localStorage.getItem("fu_dlbrok_slab")) || 0.2,
        squp_perc: parseFloat(localStorage.getItem("fu_squp_perc")) || 10,
        dlbrok_perc: parseFloat(localStorage.getItem("fu_dlbrok_perc")) || 10,
      },
      op: {
        squp_slab: parseFloat(localStorage.getItem("op_squp_slab")) || 0.02,
        dlbrok_slab: parseFloat(localStorage.getItem("op_dlbrok_slab")) || 0.2,
        squp_perc: parseFloat(localStorage.getItem("op_squp_perc")) || 10,
        dlbrok_perc: parseFloat(localStorage.getItem("op_dlbrok_perc")) || 10,
      },
      com: {
        squp_slab: parseFloat(localStorage.getItem("com_squp_slab")) || 0.02,
        dlbrok_slab: parseFloat(localStorage.getItem("com_dlbrok_slab")) || 0.2,
        squp_perc: parseFloat(localStorage.getItem("com_squp_perc")) || 10,
        dlbrok_perc: parseFloat(localStorage.getItem("com_dlbrok_perc")) || 10,
      },
    });
  }, []);
  
  

  const updatePercentage = (type) => {
    if (type === "Slab") {
      setPercentage({
        eq: { squp: 0.02, dlbrok: 0.2 },
        fu: { squp: 0.02, dlbrok: 0.2 },
        op: { squp: 0.02, dlbrok: 0.2 },
        com: { squp: 0.02, dlbrok: 0.2 },
      });
    } else {
      setPercentage({
        eq: { squp: 10, dlbrok: 10 },
        fu: { squp: 10, dlbrok: 10 },
        op: { squp: 10, dlbrok: 10 },
        com: { squp: 10, dlbrok: 10 },
      });
    }
  };

  // const handleRowCalculationChange = (e, segment) => {
  //   const newType = e.target.value;
  
  //   setPercentage((prev) => {
  //     const updated = {
  //       ...prev,
  //       [segment]: { ...prev[segment], calculationType: newType },
  //     };
  
  //     localStorage.setItem(`${segment}_calculationType`, newType); // Store row-specific selection
  //     return updated;
  //   });
  // };


   // State to track calculation type for each segment
   const [rowCalculationType, setRowCalculationType] = useState({
    eq: "Slab",
    fu: "Slab",
    op: "Slab",
    com: "Slab"
  });

  // Load from localStorage on mount
  useEffect(() => {
    const storedTypes = JSON.parse(localStorage.getItem("rowCalculationType")) || {};
    setRowCalculationType(prev => ({ ...prev, ...storedTypes }));
  }, []);

  // Handle Calculation Type Change for each row
  const handleRowCalculationChange = (segment, type) => {
    setRowCalculationType(prev => {
      const updated = { ...prev, [segment]: type };
      localStorage.setItem("rowCalculationType", JSON.stringify(updated)); // Save to localStorage
      return updated;
    });
  };

  // Handle percentage/slab value change
  const handlePercentageChange = (e, field, segment) => {
    let value = e.target.value.trim() === "" ? "" : parseFloat(e.target.value);

    setPercentage(prev => {
      const updated = {
        ...prev,
        [segment]: { ...prev[segment], [field]: value }
      };

      localStorage.setItem(`${segment}_${field}`, value); // Store value
      return updated;
    });
  };


  useEffect(() => {
    async function fetchAllData() {
      setLoading(true);
      try {
        const [eqResponse, fuResponse, opResponse, comResponse] = await Promise.all([
          fetch("http://183.182.84.228:4005/saudabook/"),
          fetch("http://183.182.84.228:4005/saudabookdev/"),
          fetch("http://183.182.84.228:4005/saudabookdev/"),
          fetch("http://183.182.84.228:4005/saudabookcom/"),
        ]);

        if (!eqResponse.ok || !fuResponse.ok || !opResponse.ok || !comResponse.ok) {
          throw new Error("Error fetching data from one or more sources.");
        }

        const [eqRecords, fuRecords, opRecords, comRecords] = await Promise.all([
          eqResponse.json(),
          fuResponse.json(),
          opResponse.json(),
          comResponse.json(),
        ]);


        const allowedTypes = ['FUTIDX', 'FUTSTK'];
        const filterfurecords = fuRecords.filter(record => allowedTypes.includes(record.instrument_type));
        const notallowedTypes = ['OPTIDX', 'OPTSTK'];
        const filteroprecords = opRecords.filter(record => notallowedTypes.includes(record.instrument_type));


        setAllRecords({ porteq: eqRecords, portfu: filterfurecords, portop: filteroprecords, portcom: comRecords });
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchAllData();
  }, []);







  // const handleSubmit = () => {
  //   if (!database) {
  //     alert("Please select a database");
  //     return;
  //   }
  
  //   if (!allRecords[database] || allRecords[database].length === 0) {
  //     alert("No data available for the selected segment.");
  //     return;
  //   }

  //         // Map database to corresponding segment
  // const segmentMap = {
  //   porteq: "eq",
  //   portfu: "fu",
  //   portop: "op",
  //   portcom: "com",
  // };

  // const segment = segmentMap[database]; // Get segment from the database
  
  //   setProcessing(true);
  //   setTimeout(() => {
  //     try {
  //       let records = allRecords[database];

  //       // Convert date input to YYYYMMDD format for comparison
  //       const formatDateToYYYYMMDD = (dateStr) => {
  //         if (!dateStr) return null;
  //         const date = new Date(dateStr);
  //         const year = date.getFullYear();
  //         const month = String(date.getMonth() + 1).padStart(2, "0");
  //         const day = String(date.getDate()).padStart(2, "0");
  //         return `${year}${month}${day}`;
  //       };
        
  //       const fromDateFormatted = formatDateToYYYYMMDD(fromDate);
  //       const toDateFormatted = formatDateToYYYYMMDD(toDate);


  
  //       // Convert comma-separated filters into arrays
  //       const clientCodeList = clientCodeFilter
  //         ? clientCodeFilter.split(",").map(code => code.trim().toUpperCase())
  //         : [];
  //       const locnidList = locnidFilter
  //         ? locnidFilter.split(",").map(loc => loc.trim().toUpperCase())
  //         : [];
  //         const locnidList1 = locnidFilter1
  //         ? locnidFilter1.split(",").map(loc1 => loc1.trim().toUpperCase())
  //         : [];
  
  
  //       // Apply filters
  //       if (clientCodeList.length > 0 || locnidList.length > 0|| locnidList1.length > 0 || fromDate || toDate) {
  //         records = records.filter(record => {
  //           const clientCode = (record.client_code || "").trim().toUpperCase();
  //           const clientLocation = (record.Clientlocation || "").trim().toUpperCase();
  //           const locnid = (record.locnid || "").trim().toUpperCase();
  //           const tradeDate = String(record.trade_date).trim(); // Ensure trade_date is a string
  //           const matchesDate =
  //               (!fromDateFormatted || tradeDate >= fromDateFormatted) &&
  //               (!toDateFormatted || tradeDate <= toDateFormatted);
  
  //           return (
  //             (clientCodeList.length === 0 || clientCodeList.includes(clientCode)) &&
  //             (locnidList.length === 0 || locnidList.includes(clientLocation)) &&
  //             (locnidList1.length === 0 || locnidList1.includes(locnid)) &&
  //             matchesDate
  //           );
  //         });
  //       }
  

  
  //       const groupedData = records.reduce((acc, record) => {
  //         const clientCode = record.client_code || "N/A";
  //         const cl_name = record.cl_name || "N/A";
  //         const Clientlocation = record.Clientlocation || "N/A";
  //         const locnid = record.locnid || "N/A";
  
  //         if (!acc[clientCode]) {
  //           acc[clientCode] = {
  //             client_code: clientCode,
  //             cl_name: cl_name,
  //             Clientlocation: Clientlocation,
  //             locnid: locnid,
  //             squp: 0,
  //             dlbrok: 0,
  //             volsqup: 0,
  //             voldlbrok: 0,
  //             broksqup: 0,
  //             brokdlv: 0,
  //             diff_squp: 0,
  //             diff_dlbrok: 0,
  //           };
  //         }
  
  //         const { squp_delv_flag, brokerage_per_unit, trade_quantity, market_rate } = record;
  
  //         // if (squp_delv_flag === 0) {
  //         //   acc[clientCode].squp += brokerage_per_unit * trade_quantity;
  //         //   acc[clientCode].volsqup += market_rate * trade_quantity;
  //         //   acc[clientCode].broksqup += (market_rate * trade_quantity) * (percentage[segment].squp / 100);
  //         // } else if (squp_delv_flag === 1) {
  //         //   acc[clientCode].dlbrok += brokerage_per_unit * trade_quantity;
  //         //   acc[clientCode].voldlbrok += market_rate * trade_quantity;
  //         //   acc[clientCode].brokdlv += (market_rate * trade_quantity) * (percentage[segment].dlbrok / 100);
  //         // }



  //         if (calculationType) {
  //           // Slab-based calculation
  //           if (squp_delv_flag === 0) {
  //             acc[clientCode].squp += brokerage_per_unit * trade_quantity;
  //             acc[clientCode].volsqup += market_rate * trade_quantity;
  //             acc[clientCode].broksqup += (market_rate * trade_quantity) * (percentage[segment].squp_slab / 100);
  //           } else if (squp_delv_flag === 1) {
  //             acc[clientCode].dlbrok += brokerage_per_unit * trade_quantity;
  //             acc[clientCode].voldlbrok += market_rate * trade_quantity;
  //             acc[clientCode].brokdlv += (market_rate * trade_quantity) * (percentage[segment].dlbrok_slab / 100);
  //           }
  //         } else {
  //           // Percentage-based calculation
  //           if (squp_delv_flag === 0) {
  //             acc[clientCode].squp += brokerage_per_unit * trade_quantity;
  //             acc[clientCode].volsqup += market_rate * trade_quantity;
  //             acc[clientCode].broksqup += (brokerage_per_unit * trade_quantity) * (percentage[segment].squp_perc / 100);
  //           } else if (squp_delv_flag === 1) {
  //             acc[clientCode].dlbrok += brokerage_per_unit * trade_quantity;
  //             acc[clientCode].voldlbrok += market_rate * trade_quantity;
  //             acc[clientCode].brokdlv += (brokerage_per_unit * trade_quantity) * (percentage[segment].dlbrok_perc / 100);
  //           }
  //         }






  
  //         acc[clientCode].diff_squp = acc[clientCode].squp - acc[clientCode].broksqup;
  //         acc[clientCode].diff_dlbrok = acc[clientCode].dlbrok - acc[clientCode].brokdlv;
  
  //         return acc;
  //       }, {});
  
  //       setFilteredRecords(Object.values(groupedData));
  //       setPreviewMode(true);
  //     } catch (error) {
  //       console.error("Error processing data:", error);
  //       alert("Error processing data. Please try again.");
  //     } finally {
  //       setProcessing(false);
  //     }
  //   }, 500);
  // };




  const handleSubmit = () => {
    if (!database) {
      alert("Please select a database");
      return;
    }
  
    if (!allRecords[database] || allRecords[database].length === 0) {
      alert("No data available for the selected segment.");
      return;
    }
  
    // Map database to corresponding segment
    const segmentMap = {
      porteq: "eq",
      portfu: "fu",
      portop: "op",
      portcom: "com",
    };
  
    const segment = segmentMap[database]; // Get segment from the database
  
    setProcessing(true);
    setTimeout(() => {
      try {
        let records = allRecords[database];
  
        // Convert date input to YYYYMMDD format for comparison
        const formatDateToYYYYMMDD = (dateStr) => {
          if (!dateStr) return null;
          const date = new Date(dateStr);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}${month}${day}`;
        };
  
        const fromDateFormatted = formatDateToYYYYMMDD(fromDate);
        const toDateFormatted = formatDateToYYYYMMDD(toDate);
  
        // Convert comma-separated filters into arrays
        const clientCodeList = clientCodeFilter
          ? clientCodeFilter.split(",").map(code => code.trim().toUpperCase())
          : [];
        const locnidList = locnidFilter
          ? locnidFilter.split(",").map(loc => loc.trim().toUpperCase())
          : [];
        const locnidList1 = locnidFilter1
          ? locnidFilter1.split(",").map(loc1 => loc1.trim().toUpperCase())
          : [];
  
        // Apply filters
        if (clientCodeList.length > 0 || locnidList.length > 0 || locnidList1.length > 0 || fromDate || toDate) {
          records = records.filter(record => {
            const clientCode = (record.client_code || "").trim().toUpperCase();
            const clientLocation = (record.Clientlocation || "").trim().toUpperCase();
            const locnid = (record.locnid || "").trim().toUpperCase();
            const tradeDate = String(record.trade_date).trim(); // Ensure trade_date is a string
            const matchesDate =
              (!fromDateFormatted || tradeDate >= fromDateFormatted) &&
              (!toDateFormatted || tradeDate <= toDateFormatted);
  
            return (
              (clientCodeList.length === 0 || clientCodeList.includes(clientCode)) &&
              (locnidList.length === 0 || locnidList.includes(clientLocation)) &&
              (locnidList1.length === 0 || locnidList1.includes(locnid)) &&
              matchesDate
            );
          });
        }
  
        const groupedData = records.reduce((acc, record) => {
          const clientCode = record.client_code || "N/A";
          const cl_name = record.cl_name || "N/A";
          const Clientlocation = record.Clientlocation || "N/A";
          const locnid = record.locnid || "N/A";
  
          if (!acc[clientCode]) {
            acc[clientCode] = {
              client_code: clientCode,
              cl_name: cl_name,
              Clientlocation: Clientlocation,
              locnid: locnid,
              squp: 0,
              dlbrok: 0,
              volsqup: 0,
              voldlbrok: 0,
              broksqup: 0,
              brokdlv: 0,
              diff_squp: 0,
              diff_dlbrok: 0,
            };
          }
  
          const { squp_delv_flag, brokerage_per_unit, trade_quantity, market_rate } = record;
  
          // Determine calculation type for the segment
          const calcType = rowCalculationType[segment];
  
          if (calcType === "Slab") {
            // Slab-based calculation
            if (squp_delv_flag === 0) {
              acc[clientCode].squp += brokerage_per_unit * trade_quantity;
              acc[clientCode].volsqup += market_rate * trade_quantity;
              acc[clientCode].broksqup += (market_rate * trade_quantity) * (percentage[segment].squp_slab / 100);
            } else if (squp_delv_flag === 1) {
              acc[clientCode].dlbrok += brokerage_per_unit * trade_quantity;
              acc[clientCode].voldlbrok += market_rate * trade_quantity;
              acc[clientCode].brokdlv += (market_rate * trade_quantity) * (percentage[segment].dlbrok_slab / 100);
            }
          } else {
            // Percentage-based calculation
            if (squp_delv_flag === 0) {
              acc[clientCode].squp += brokerage_per_unit * trade_quantity;
              acc[clientCode].volsqup += market_rate * trade_quantity;
              acc[clientCode].broksqup += (brokerage_per_unit * trade_quantity) * (percentage[segment].squp_perc / 100);
            } else if (squp_delv_flag === 1) {
              acc[clientCode].dlbrok += brokerage_per_unit * trade_quantity;
              acc[clientCode].voldlbrok += market_rate * trade_quantity;
              acc[clientCode].brokdlv += (brokerage_per_unit * trade_quantity) * (percentage[segment].dlbrok_perc / 100);
            }
          }
  
          acc[clientCode].diff_squp = acc[clientCode].squp - acc[clientCode].broksqup;
          acc[clientCode].diff_dlbrok = acc[clientCode].dlbrok - acc[clientCode].brokdlv;
  
          return acc;
        }, {});
  
        setFilteredRecords(Object.values(groupedData));
        setPreviewMode(true);
      } catch (error) {
        console.error("Error processing data:", error);
        alert("Error processing data. Please try again.");
      } finally {
        setProcessing(false);
      }
    }, 500);
  };
  
  

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // const handlePercentageChange = (e, key) => {
  //   let value = e.target.value.trim() === "" ? '' : parseFloat(e.target.value);
  //   setPercentage((prev) => {
  //     const updated = { ...prev, [key]: value };
  //     localStorage.setItem(key, value);
  //     return updated;
  //   });
  // };



  // const handlePercentageChange = (e, type, segment) => {
  //   let value = e.target.value.trim() === "" ? '' : parseFloat(e.target.value);
  
  //   setPercentage(prev => {
  //     const updated = {
  //       ...prev,
  //       [segment]: { ...prev[segment], [type]: value }
  //     };
  
  //     localStorage.setItem(`${segment}_${type}`, value); // Store value
  
  //     return updated;
  //   });
  // };


  // const handlePercentageChange = (e, type, segment) => {
  //   let value = e.target.value.trim() === "" ? '' : parseFloat(e.target.value);
  
  //   setPercentage(prev => {
  //     const updated = {
  //       ...prev,
  //       [segment]: { ...prev[segment], [type]: value }
  //     };
  
  //     localStorage.setItem(`${segment}_${type}`, value); // Store value
  
  //     return updated;
  //   });
  // };



  const handleDatabaseChange = (e) => {
    const value = e.target.value;
    setDatabase(value);
    localStorage.setItem("database", value);
  };

  // Filter and paginate records
  const searchedRecords = filteredRecords.filter((record) =>
    (record.client_code?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (record.cl_name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (record.Clientlocation?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );
  
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = searchedRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const nextPage = () => {
    if (currentPage < Math.ceil(searchedRecords.length / recordsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };









  function downloadEQ() {
    const sheetName = 'Brokerage Records EQ';
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    // Determine calculation type for EQ segment
    const calcType = rowCalculationType.eq; // Get calculation type for EQ
    const squpLabel = calcType === "Slab" ? `Squp Brokerage (${percentage.eq.squp_slab}% Slab)` : `Squp Brokerage (${percentage.eq.squp_perc}%)`;
    const dlbrokLabel = calcType === "Slab" ? `Delivery Brokerage (${percentage.eq.dlbrok_slab}% Slab)` : `Delivery Brokerage (${percentage.eq.dlbrok_perc}%)`;
  
    const data = [
      ["Sno.", "Client Code", "Client Name", "Client Location", "LocnID", "Squp Brokerage", "Delivery Brokerage", "Squp Volume", "Delivery Volume", squpLabel, dlbrokLabel, "Diff Squp", "Diff Delivery"],
      ...searchedRecords.map((record, index) => [
        index + 1,
        record.client_code || "",
        record.cl_name || "",
        record.Clientlocation || "",
        record.locnid || "",
        parseFloat((record.squp ?? 0).toFixed(2)),
        parseFloat((record.dlbrok ?? 0).toFixed(2)),
        parseFloat((record.volsqup ?? 0).toFixed(2)),
        parseFloat((record.voldlbrok ?? 0).toFixed(2)),
        parseFloat((record.broksqup ?? 0).toFixed(2)),
        parseFloat((record.brokdlv ?? 0).toFixed(2)),
        parseFloat((record.diff_squp ?? 0).toFixed(2)),
        parseFloat((record.diff_dlbrok ?? 0).toFixed(2)),
      ]),
    ];
  
    // Add a blank row before the total row
    data.push([]);
  
    // Compute Totals
    const totalRow = [
      "Total", "", "", "", "",
      searchedRecords.reduce((sum, record) => sum + (record.squp ?? 0), 0).toFixed(2),
      searchedRecords.reduce((sum, record) => sum + (record.dlbrok ?? 0), 0).toFixed(2),
      searchedRecords.reduce((sum, record) => sum + (record.volsqup ?? 0), 0).toFixed(2),
      searchedRecords.reduce((sum, record) => sum + (record.voldlbrok ?? 0), 0).toFixed(2),
      searchedRecords.reduce((sum, record) => sum + (record.broksqup ?? 0), 0).toFixed(2),
      searchedRecords.reduce((sum, record) => sum + (record.brokdlv ?? 0), 0).toFixed(2),
      searchedRecords.reduce((sum, record) => sum + (record.diff_squp ?? 0), 0).toFixed(2),
      searchedRecords.reduce((sum, record) => sum + (record.diff_dlbrok ?? 0), 0).toFixed(2),
    ];
  
    // Append total row after the blank row
    data.push(totalRow);
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `Brokerage_Records_EQ_${formattedDate}.xlsx`);
  }


function downloadFU() {
  const sheetName = 'Brokerage Records FUTURE';
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  const wb = XLSX.utils.book_new();

  // Determine calculation type for EQ segment
  const calcType = rowCalculationType.eq; // Get calculation type for EQ
  const squpLabel = calcType === "Slab" ? `Squp Brokerage (${percentage.eq.squp_slab}% Slab)` : `Squp Brokerage (${percentage.eq.squp_perc}%)`;
  const dlbrokLabel = calcType === "Slab" ? `Delivery Brokerage (${percentage.eq.dlbrok_slab}% Slab)` : `Delivery Brokerage (${percentage.eq.dlbrok_perc}%)`;

  const data = [
    ["Sno.", "Client Code", "Client Name", "Client Location", "LocnID", "Squp Brokerage", "Delivery Brokerage", "Squp Volume", "Delivery Volume", squpLabel, dlbrokLabel, "Diff Squp", "Diff Delivery"],
    ...searchedRecords.map((record, index) => [
      index + 1,
      record.client_code || "",
      record.cl_name || "",
      record.Clientlocation || "",
      record.locnid || "",
      parseFloat((record.squp ?? 0).toFixed(2)),
      parseFloat((record.dlbrok ?? 0).toFixed(2)),
      parseFloat((record.volsqup ?? 0).toFixed(2)),
      parseFloat((record.voldlbrok ?? 0).toFixed(2)),
      parseFloat((record.broksqup ?? 0).toFixed(2)),
      parseFloat((record.brokdlv ?? 0).toFixed(2)),
      parseFloat((record.diff_squp ?? 0).toFixed(2)),
      parseFloat((record.diff_dlbrok ?? 0).toFixed(2)),
    ]),
  ];

  // Add a blank row before the total row
  data.push([]);

  // Compute Totals
  const totalRow = [
    "Total", "", "", "", "",
    searchedRecords.reduce((sum, record) => sum + (record.squp ?? 0), 0).toFixed(2),
    searchedRecords.reduce((sum, record) => sum + (record.dlbrok ?? 0), 0).toFixed(2),
    searchedRecords.reduce((sum, record) => sum + (record.volsqup ?? 0), 0).toFixed(2),
    searchedRecords.reduce((sum, record) => sum + (record.voldlbrok ?? 0), 0).toFixed(2),
    searchedRecords.reduce((sum, record) => sum + (record.broksqup ?? 0), 0).toFixed(2),
    searchedRecords.reduce((sum, record) => sum + (record.brokdlv ?? 0), 0).toFixed(2),
    searchedRecords.reduce((sum, record) => sum + (record.diff_squp ?? 0), 0).toFixed(2),
    searchedRecords.reduce((sum, record) => sum + (record.diff_dlbrok ?? 0), 0).toFixed(2),
  ];

  // Append total row after the blank row
  data.push(totalRow);

  const ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `Brokerage_Records_FUTURE_${formattedDate}.xlsx`);
}




function downloadOP() {
  const sheetName = 'Brokerage Records OPTION';
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  const wb = XLSX.utils.book_new();

  // Determine calculation type for EQ segment
  const calcType = rowCalculationType.eq; // Get calculation type for EQ
  const squpLabel = calcType === "Slab" ? `Squp Brokerage (${percentage.eq.squp_slab}% Slab)` : `Squp Brokerage (${percentage.eq.squp_perc}%)`;
  const dlbrokLabel = calcType === "Slab" ? `Delivery Brokerage (${percentage.eq.dlbrok_slab}% Slab)` : `Delivery Brokerage (${percentage.eq.dlbrok_perc}%)`;

  const data = [
    ["Sno.", "Client Code", "Client Name", "Client Location", "LocnID", "Squp Brokerage", "Delivery Brokerage", "Squp Volume", "Delivery Volume", squpLabel, dlbrokLabel, "Diff Squp", "Diff Delivery"],
    ...searchedRecords.map((record, index) => [
      index + 1,
      record.client_code || "",
      record.cl_name || "",
      record.Clientlocation || "",
      record.locnid || "",
      parseFloat((record.squp ?? 0).toFixed(2)),
      parseFloat((record.dlbrok ?? 0).toFixed(2)),
      parseFloat((record.volsqup ?? 0).toFixed(2)),
      parseFloat((record.voldlbrok ?? 0).toFixed(2)),
      parseFloat((record.broksqup ?? 0).toFixed(2)),
      parseFloat((record.brokdlv ?? 0).toFixed(2)),
      parseFloat((record.diff_squp ?? 0).toFixed(2)),
      parseFloat((record.diff_dlbrok ?? 0).toFixed(2)),
    ]),
  ];

  // Add a blank row before the total row
  data.push([]);

  // Compute Totals
  const totalRow = [
    "Total", "", "", "", "",
    searchedRecords.reduce((sum, record) => sum + (record.squp ?? 0), 0).toFixed(2),
    searchedRecords.reduce((sum, record) => sum + (record.dlbrok ?? 0), 0).toFixed(2),
    searchedRecords.reduce((sum, record) => sum + (record.volsqup ?? 0), 0).toFixed(2),
    searchedRecords.reduce((sum, record) => sum + (record.voldlbrok ?? 0), 0).toFixed(2),
    searchedRecords.reduce((sum, record) => sum + (record.broksqup ?? 0), 0).toFixed(2),
    searchedRecords.reduce((sum, record) => sum + (record.brokdlv ?? 0), 0).toFixed(2),
    searchedRecords.reduce((sum, record) => sum + (record.diff_squp ?? 0), 0).toFixed(2),
    searchedRecords.reduce((sum, record) => sum + (record.diff_dlbrok ?? 0), 0).toFixed(2),
  ];

  // Append total row after the blank row
  data.push(totalRow);

  const ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `Brokerage_Records_OPTION_${formattedDate}.xlsx`);
}



function downloadCOM() {
  const sheetName = 'Brokerage Records COM';
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  const wb = XLSX.utils.book_new();

  // Determine calculation type for EQ segment
  const calcType = rowCalculationType.eq; // Get calculation type for EQ
  const squpLabel = calcType === "Slab" ? `Squp Brokerage (${percentage.eq.squp_slab}% Slab)` : `Squp Brokerage (${percentage.eq.squp_perc}%)`;
  const dlbrokLabel = calcType === "Slab" ? `Delivery Brokerage (${percentage.eq.dlbrok_slab}% Slab)` : `Delivery Brokerage (${percentage.eq.dlbrok_perc}%)`;

  const data = [
    ["Sno.", "Client Code", "Client Name", "Client Location", "LocnID", "Squp Brokerage", "Delivery Brokerage", "Squp Volume", "Delivery Volume", squpLabel, dlbrokLabel, "Diff Squp", "Diff Delivery"],
    ...searchedRecords.map((record, index) => [
      index + 1,
      record.client_code || "",
      record.cl_name || "",
      record.Clientlocation || "",
      record.locnid || "",
      parseFloat((record.squp ?? 0).toFixed(2)),
      parseFloat((record.dlbrok ?? 0).toFixed(2)),
      parseFloat((record.volsqup ?? 0).toFixed(2)),
      parseFloat((record.voldlbrok ?? 0).toFixed(2)),
      parseFloat((record.broksqup ?? 0).toFixed(2)),
      parseFloat((record.brokdlv ?? 0).toFixed(2)),
      parseFloat((record.diff_squp ?? 0).toFixed(2)),
      parseFloat((record.diff_dlbrok ?? 0).toFixed(2)),
    ]),
  ];

  // Add a blank row before the total row
  data.push([]);

  // Compute Totals
  const totalRow = [
    "Total", "", "", "", "",
    searchedRecords.reduce((sum, record) => sum + (record.squp ?? 0), 0).toFixed(2),
    searchedRecords.reduce((sum, record) => sum + (record.dlbrok ?? 0), 0).toFixed(2),
    searchedRecords.reduce((sum, record) => sum + (record.volsqup ?? 0), 0).toFixed(2),
    searchedRecords.reduce((sum, record) => sum + (record.voldlbrok ?? 0), 0).toFixed(2),
    searchedRecords.reduce((sum, record) => sum + (record.broksqup ?? 0), 0).toFixed(2),
    searchedRecords.reduce((sum, record) => sum + (record.brokdlv ?? 0), 0).toFixed(2),
    searchedRecords.reduce((sum, record) => sum + (record.diff_squp ?? 0), 0).toFixed(2),
    searchedRecords.reduce((sum, record) => sum + (record.diff_dlbrok ?? 0), 0).toFixed(2),
  ];

  // Append total row after the blank row
  data.push(totalRow);

  const ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `Brokerage_Records_COM_${formattedDate}.xlsx`);
}








// function downloadAll() {
//   const currentDate = new Date();
//   const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
//   const wb = XLSX.utils.book_new();

//   if (!allRecords) {
//     alert("No data available for download.");
//     return;
//   }

//   // Map database to corresponding segment
//   const segmentMap = {
//     porteq: "eq",
//     portfu: "fu",
//     portop: "op",
//     portcom: "com",
//   };

//   const segment = segmentMap[database]; // Get segment from the database



//   const filterRecords = (records) => {
//     if (!records || records.length === 0) return [];

//     let filteredRecords = records;

//     /// Convert date input to YYYYMMDD format for comparison
//     const formatDateToYYYYMMDD = (dateStr) => {
//       if (!dateStr) return null;
//       const date = new Date(dateStr);
//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, "0");
//       const day = String(date.getDate()).padStart(2, "0");
//       return `${year}${month}${day}`;
//     };
    
//     const fromDateFormatted = formatDateToYYYYMMDD(fromDate);
//     const toDateFormatted = formatDateToYYYYMMDD(toDate);



//     // Convert comma-separated filters into arrays
//     const clientCodeList = clientCodeFilter
//       ? clientCodeFilter.split(",").map(code => code.trim().toUpperCase())
//       : [];
//     const locnidList = locnidFilter
//       ? locnidFilter.split(",").map(loc => loc.trim().toUpperCase())
//       : [];
//       const locnidList1 = locnidFilter1
//       ? locnidFilter1.split(",").map(loc1 => loc1.trim().toUpperCase())
//       : [];


//     // Apply filters
//     if (clientCodeList.length > 0 || locnidList.length > 0 || locnidList1.length > 0 || fromDate || toDate) {
//       records = records.filter(record => {
//         const clientCode = (record.client_code || "").trim().toUpperCase();
//         const clientLocation = (record.Clientlocation || "").trim().toUpperCase();
//         const locnid = (record.locnid || "").trim().toUpperCase();
//         const tradeDate = String(record.trade_date).trim(); // Ensure trade_date is a string
//         const matchesDate =
//             (!fromDateFormatted || tradeDate >= fromDateFormatted) &&
//             (!toDateFormatted || tradeDate <= toDateFormatted);

//         return (
//           (clientCodeList.length === 0 || clientCodeList.includes(clientCode)) &&
//           (locnidList.length === 0 || locnidList.includes(clientLocation)) &&
//           (locnidList1.length === 0 || locnidList1.includes(locnid)) &&
//           matchesDate
//         );
//       });
//     }

//     return Object.values(
//       filteredRecords.reduce((acc, record) => {
//         const clientCode = record.client_code || "N/A";
//           const cl_name = record.cl_name || "N/A";
//           const Clientlocation = record.Clientlocation || "N/A";
//           const locnid = record.locnid || "N/A";
  
//           if (!acc[clientCode]) {
//             acc[clientCode] = {
//               client_code: clientCode,
//               cl_name: cl_name,
//               Clientlocation: Clientlocation,
//               locnid: locnid,
//               squp: 0,
//               dlbrok: 0,
//               volsqup: 0,
//               voldlbrok: 0,
//               broksqup: 0,
//               brokdlv: 0,
//               diff_squp: 0,
//               diff_dlbrok: 0,
//             };
//           }
  
//           const { squp_delv_flag, brokerage_per_unit, trade_quantity, market_rate } = record;
  
//           if (squp_delv_flag === 0) {
//             acc[clientCode].squp += brokerage_per_unit * trade_quantity;
//             acc[clientCode].volsqup += market_rate * trade_quantity;
//             acc[clientCode].broksqup += (market_rate * trade_quantity) * (percentage[segment].squp / 100);
//           } else if (squp_delv_flag === 1) {
//             acc[clientCode].dlbrok += brokerage_per_unit * trade_quantity;
//             acc[clientCode].voldlbrok += market_rate * trade_quantity;
//             acc[clientCode].brokdlv += (market_rate * trade_quantity) * (percentage[segment].dlbrok / 100);
//           }
  
//           acc[clientCode].diff_squp = acc[clientCode].squp - acc[clientCode].broksqup;
//           acc[clientCode].diff_dlbrok = acc[clientCode].dlbrok - acc[clientCode].brokdlv;
  
//           return acc;
//       }, {})
//     );
//   };

//   const createSheet = (records, sheetName) => {
//     const data = [
//       ["Sno.", "Client Code", "Client Name", "Client Location", "LocnID", "Squp Brokerage", "Delivery Brokerage", "Squp Volume", "Delivery Volume", `Squp Brokerage (${percentage[segment].squp}%)`, `Delivery Brokerage (${percentage[segment].dlbrok}%)`, "Diff Squp", "Diff Delivery"],
//       ...records.map((record, index) => [
//         index + 1,
//         record.client_code || "",
//         record.cl_name || "",
//         record.Clientlocation || "",
//         record.locnid || "",
//         parseFloat((record.squp ?? 0).toFixed(2)),
//         parseFloat((record.dlbrok ?? 0).toFixed(2)),
//         parseFloat((record.volsqup ?? 0).toFixed(2)),
//         parseFloat((record.voldlbrok ?? 0).toFixed(2)),
//         parseFloat((record.broksqup ?? 0).toFixed(2)),
//         parseFloat((record.brokdlv ?? 0).toFixed(2)),
//         parseFloat((record.diff_squp ?? 0).toFixed(2)),
//         parseFloat((record.diff_dlbrok ?? 0).toFixed(2)),
//       ]),
//     ];
//     return XLSX.utils.aoa_to_sheet(data);
//   };

//   // Apply filtering to each dataset and add to workbook
//   XLSX.utils.book_append_sheet(wb, createSheet(filterRecords(allRecords.porteq, "eq"), "Brokerage EQ", "eq"), "Brokerage EQ");
//   XLSX.utils.book_append_sheet(wb, createSheet(filterRecords(allRecords.portfu, "fu"), "Brokerage FU", "fu"), "Brokerage FU");
//   XLSX.utils.book_append_sheet(wb, createSheet(filterRecords(allRecords.portop, "op"), "Brokerage OP", "op"), "Brokerage OP");
//   XLSX.utils.book_append_sheet(wb, createSheet(filterRecords(allRecords.portcom, "com"), "Brokerage COM", "com"), "Brokerage COM");

//   XLSX.writeFile(wb, `Filtered_Brokerage_Records_ALL_${formattedDate}.xlsx`);
// }



function downloadAll() {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  const wb = XLSX.utils.book_new();

  if (!allRecords) {
    alert("No data available for download.");
    return;
  }

  // Map database keys to corresponding segments
  const segmentMap = {
    porteq: "eq",
    portfu: "fu",
    portop: "op",
    portcom: "com",
  };

  const filterRecords = (records, segment) => {
    if (!records || records.length === 0) return [];

    let filteredRecords = records;

    // Convert date input to YYYYMMDD format for comparison
    const formatDateToYYYYMMDD = (dateStr) => {
      if (!dateStr) return null;
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}${month}${day}`;
    };

    const fromDateFormatted = formatDateToYYYYMMDD(fromDate);
    const toDateFormatted = formatDateToYYYYMMDD(toDate);

    // Convert comma-separated filters into arrays
    const clientCodeList = clientCodeFilter
      ? clientCodeFilter.split(",").map(code => code.trim().toUpperCase())
      : [];
    const locnidList = locnidFilter
      ? locnidFilter.split(",").map(loc => loc.trim().toUpperCase())
      : [];
    const locnidList1 = locnidFilter1
      ? locnidFilter1.split(",").map(loc1 => loc1.trim().toUpperCase())
      : [];

    // Apply filters
    if (clientCodeList.length > 0 || locnidList.length > 0 || locnidList1.length > 0 || fromDate || toDate) {
      filteredRecords = filteredRecords.filter(record => {
        const clientCode = (record.client_code || "").trim().toUpperCase();
        const clientLocation = (record.Clientlocation || "").trim().toUpperCase();
        const locnid = (record.locnid || "").trim().toUpperCase();
        const tradeDate = String(record.trade_date).trim(); // Ensure trade_date is a string
        const matchesDate =
          (!fromDateFormatted || tradeDate >= fromDateFormatted) &&
          (!toDateFormatted || tradeDate <= toDateFormatted);

        return (
          (clientCodeList.length === 0 || clientCodeList.includes(clientCode)) &&
          (locnidList.length === 0 || locnidList.includes(clientLocation)) &&
          (locnidList1.length === 0 || locnidList1.includes(locnid)) &&
          matchesDate
        );
      });
    }

    return Object.values(
      filteredRecords.reduce((acc, record) => {
        const clientCode = record.client_code || "N/A";
        const cl_name = record.cl_name || "N/A";
        const Clientlocation = record.Clientlocation || "N/A";
        const locnid = record.locnid || "N/A";

        if (!acc[clientCode]) {
          acc[clientCode] = {
            client_code: clientCode,
            cl_name: cl_name,
            Clientlocation: Clientlocation,
            locnid: locnid,
            squp: 0,
            dlbrok: 0,
            volsqup: 0,
            voldlbrok: 0,
            broksqup: 0,
            brokdlv: 0,
            diff_squp: 0,
            diff_dlbrok: 0,
          };
        }

        const { squp_delv_flag, brokerage_per_unit, trade_quantity, market_rate } = record;

        // Determine calculation type for the segment
        const calcType = rowCalculationType[segment];

        if (calcType === "Slab") {
          // Slab-based calculation
          if (squp_delv_flag === 0) {
            acc[clientCode].squp += brokerage_per_unit * trade_quantity;
            acc[clientCode].volsqup += market_rate * trade_quantity;
            acc[clientCode].broksqup += (market_rate * trade_quantity) * (percentage[segment].squp_slab / 100);
          } else if (squp_delv_flag === 1) {
            acc[clientCode].dlbrok += brokerage_per_unit * trade_quantity;
            acc[clientCode].voldlbrok += market_rate * trade_quantity;
            acc[clientCode].brokdlv += (market_rate * trade_quantity) * (percentage[segment].dlbrok_slab / 100);
          }
        } else {
          // Percentage-based calculation
          if (squp_delv_flag === 0) {
            acc[clientCode].squp += brokerage_per_unit * trade_quantity;
            acc[clientCode].volsqup += market_rate * trade_quantity;
            acc[clientCode].broksqup += (brokerage_per_unit * trade_quantity) * (percentage[segment].squp_perc / 100);
          } else if (squp_delv_flag === 1) {
            acc[clientCode].dlbrok += brokerage_per_unit * trade_quantity;
            acc[clientCode].voldlbrok += market_rate * trade_quantity;
            acc[clientCode].brokdlv += (brokerage_per_unit * trade_quantity) * (percentage[segment].dlbrok_perc / 100);
          }
        }

        acc[clientCode].diff_squp = acc[clientCode].squp - acc[clientCode].broksqup;
        acc[clientCode].diff_dlbrok = acc[clientCode].dlbrok - acc[clientCode].brokdlv;

        return acc;
      }, {})
    );
  };

  const createSheet = (records, sheetName, segment) => {
    const calcType = rowCalculationType[segment]; // Get calculation type for the segment
    const squpLabel = calcType === "Slab" ? `Squp Brokerage (${percentage[segment].squp_slab}% Slab)` : `Squp Brokerage (${percentage[segment].squp_perc}%)`;
    const dlbrokLabel = calcType === "Slab" ? `Delivery Brokerage (${percentage[segment].dlbrok_slab}% Slab)` : `Delivery Brokerage (${percentage[segment].dlbrok_perc}%)`;

    const data = [
      ["Sno.", "Client Code", "Client Name", "Client Location", "LocnID", "Squp Brokerage", "Total Brokerage", "Squp Volume", "Delivery Volume", "Total Volume", squpLabel, dlbrokLabel, "Total Brokerage Modify", "Difference Squp", "Difference Delivery", "Difference Total Brokerage"],
      ...records.map((record, index) => [
        index + 1,
        record.client_code || "",
        record.cl_name || "",
        record.Clientlocation || "",
        record.locnid || "",
        parseFloat((record.squp ?? 0).toFixed(2)),
        parseFloat((record.dlbrok ?? 0).toFixed(2)),

        parseFloat(((record.squp + record.dlbrok) ?? 0).toFixed(2)),

        parseFloat((record.volsqup ?? 0).toFixed(2)),
        parseFloat((record.voldlbrok ?? 0).toFixed(2)),

        parseFloat(((record.volsqup + record.voldlbrok) ?? 0).toFixed(2)),
        
        parseFloat((record.broksqup ?? 0).toFixed(2)),
        parseFloat((record.brokdlv ?? 0).toFixed(2)),

        parseFloat(((record.broksqup + record.brokdlv) ?? 0).toFixed(2)),

        parseFloat((record.diff_squp ?? 0).toFixed(2)),
        parseFloat((record.diff_dlbrok ?? 0).toFixed(2)),

        parseFloat(((record.squp + record.dlbrok) ?? 0) - ((record.broksqup + record.brokdlv) ?? 0).toFixed(2)),

      ]),
    ];

    // Add a blank row before the total row
    data.push([]);

    // Compute Totals
    const totalRow = [
      "Total", "", "", "", "",
      parseFloat(records.reduce((sum, record) => sum + (record.squp ?? 0), 0).toFixed(2)),
      parseFloat(records.reduce((sum, record) => sum + (record.dlbrok ?? 0), 0).toFixed(2)),

      parseFloat(records.reduce((sum, record) => sum + ((record.squp + record.dlbrok) ?? 0,0)).toFixed(2)),
      
      parseFloat(records.reduce((sum, record) => sum + (record.volsqup ?? 0), 0).toFixed(2)),
      parseFloat(records.reduce((sum, record) => sum + (record.voldlbrok ?? 0), 0).toFixed(2)),

      parseFloat((records.reduce((sum, record) => sum + (record.volsqup + record.voldlbrok) ?? 0,0)).toFixed(2)),

      parseFloat(records.reduce((sum, record) => sum + (record.broksqup ?? 0), 0).toFixed(2)),
      parseFloat(records.reduce((sum, record) => sum + (record.brokdlv ?? 0), 0).toFixed(2)),

      parseFloat((records.reduce((sum, record) => sum + (record.broksqup + record.brokdlv) ?? 0,0)).toFixed(2)),

      parseFloat(records.reduce((sum, record) => sum + (record.diff_squp ?? 0), 0).toFixed(2)),
      parseFloat(records.reduce((sum, record) => sum + (record.diff_dlbrok ?? 0), 0).toFixed(2)),

      parseFloat(records.reduce((sum, record) => sum + ((record.squp + record.dlbrok) - (record.broksqup + record.brokdlv) ?? 0,0)).toFixed(2)),
    ];

    // Append total row after the blank row
    data.push(totalRow);

    return XLSX.utils.aoa_to_sheet(data);
  };

  // Apply filtering to each dataset and add to workbook
  Object.keys(segmentMap).forEach((dbKey) => {
    const segment = segmentMap[dbKey]; // Get correct segment for each dataset
    const records = filterRecords(allRecords[dbKey], segment);
    if (records.length > 0) {
      const sheetName = `Brokerage ${segment.toUpperCase()}`;
      XLSX.utils.book_append_sheet(wb, createSheet(records, sheetName, segment), sheetName);
    }
  });

  XLSX.writeFile(wb, `Filtered_Brokerage_Records_ALL_${formattedDate}.xlsx`);
}










  function handleDownload() {
    switch (database) {
      case 'porteq':
        downloadEQ();
        break;
      case 'portfu':
        downloadFU();
        break;
        case 'portop':
        downloadOP();
        break;
      case 'portcom':
        downloadCOM();
        break;
      default:
        alert('Please select a valid database');
    }
  }




            // Map database to corresponding segment
            const segmentMap = {
              porteq: "eq",
              portfu: "fu",
              portop: "op",
              portcom: "com",
            };
          
            const segment = segmentMap[database]; // Get segment from the database









  const uniquelocn = Array.from(new Set(filteredRecords && filteredRecords.map(record => record.Clientlocation)));
  const uniquelocn1 = Array.from(new Set(filteredRecords && filteredRecords.map(record => record.locnid)));
  const uniqueUccs = Array.from(new Set(filteredRecords && filteredRecords.map(record => record.client_code)));

  return (
    <div>
      {!previewMode ? (
        <>
          <h3>Brokerage from 01/04/2024 To 28/03/2025</h3>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <>
              <label>Segment: </label>
              <select value={database} onChange={handleDatabaseChange}>
                <option value="">Select Segment</option>
                <option value="porteq">EQ</option>
                <option value="portfu">FU</option>
                <option value="portop">OP</option>
                <option value="portcom">COM</option>
              </select>
              <br />

              {/* <label>Select Calculation Type:</label>
                <select value={calculationType} onChange={handleCalculationChange}>
                  <option value="Slab">Slab</option>
                  <option value="Percentage">Percentage</option>
                </select>
                <br /> */}

              <label>From Date:</label>
<input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />

      <label>To Date:</label>
      <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
      <br />
              
              <label>Client Code (Comma-Separated): </label>
              <input
                type="text"
                  list="symbol-list"
                  value={clientCodeFilter}
                  onChange={(e) => setClientCodeFilter(e.target.value)}
                  placeholder="Enter Client Code"
                />
                <datalist id="symbol-list">
                  {uniqueUccs.map((client_code) => (
                      <option key={client_code} value={client_code}>
                        {client_code}
                      </option>
                  ))}
                </datalist>
              <br />

              <label>Kotak Location ID (Comma-Separated): </label>
              <input
              type="text"
                list="symbol"
                value={locnidFilter}
                onChange={(e) => setLocnidFilter(e.target.value)}
                placeholder="Enter Location IDs (e.g., L01, L02)"
              />
              <datalist id="symbol">
                {uniquelocn.map((client_location) => (
                    <option key={client_location} value={client_location}>
                      {client_location}
                    </option>
                ))}
              </datalist>
              <br />

              <label>ESL Locnid (Comma-Separated): </label>
              <input
              type="text"
                list="symbols"
                value={locnidFilter1}
                onChange={(e) => setLocnidFilter1(e.target.value)}
                placeholder="Enter LocnIDs (e.g., L01, L02)"
              />
              <datalist id="symbols">
                {uniquelocn1.map((locnid) => (
                    <option key={locnid} value={locnid}>
                      {locnid}
                    </option>
                ))}
              </datalist>
              <br />

              {/* <table>
  <thead>
    <tr>
      <th>Segment</th>
      <th>Squp %</th>
      <th>Dlbrok %</th>
    </tr>
  </thead>
  <tbody>
    {["eq", "fu", "op", "com"].map((segment) => (
      <tr key={segment}>
        <td>{segment.toUpperCase()}</td>
        <td>
          <input
            type="number"
            value={percentage[segment]?.squp}  // ✅ Use optional chaining to prevent errors
            step="0.001"
            onChange={(e) => handlePercentageChange(e, "squp", segment)}
          />
        </td>
        <td>
          <input
            type="number"
            value={percentage[segment]?.dlbrok}  // ✅ Use optional chaining to prevent errors
            step="0.001"
            onChange={(e) => handlePercentageChange(e, "dlbrok", segment)}
          />
        </td>
      </tr>
    ))}
  </tbody>
</table> */}


<table border="1">
      <thead>
        <tr>
          <th>Segment</th>
          <th>Calculation Type</th>
          <th>Squp Slab %</th>
          <th>Dlbrok Slab %</th>
          <th>Squp %</th>
          <th>Dlbrok %</th>
        </tr>
      </thead>
      <tbody>
        {["eq", "fu", "op", "com"].map((segment) => (
          <tr key={segment}>
            <td>{segment.toUpperCase()}</td>

            {/* Dropdown to select calculation type */}
            <td>
              <select
                value={rowCalculationType[segment]}
                onChange={(e) => handleRowCalculationChange(segment, e.target.value)}
              >
                <option value="Slab">Slab</option>
                <option value="Percentage">Percentage</option>
              </select>
            </td>

            {/* Squp Slab % */}
            <td>
              <input
                type="number"
                value={percentage[segment]?.squp_slab || ""}
                step="0.001"
                onChange={(e) => handlePercentageChange(e, "squp_slab", segment)}
                disabled={rowCalculationType[segment] !== "Slab"} // Disable if Percentage is selected
              />
            </td>

            {/* Dlbrok Slab % */}
            <td>
              <input
                type="number"
                value={percentage[segment]?.dlbrok_slab || ""}
                step="0.001"
                onChange={(e) => handlePercentageChange(e, "dlbrok_slab", segment)}
                disabled={rowCalculationType[segment] !== "Slab"} // Disable if Percentage is selected
              />
            </td>

            {/* Squp % */}
            <td>
              <input
                type="number"
                value={percentage[segment]?.squp_perc || ""}
                step="0.001"
                onChange={(e) => handlePercentageChange(e, "squp_perc", segment)}
                disabled={rowCalculationType[segment] !== "Percentage"} // Disable if Slab is selected
              />
            </td>

            {/* Dlbrok % */}
            <td>
              <input
                type="number"
                value={percentage[segment]?.dlbrok_perc || ""}
                step="0.001"
                onChange={(e) => handlePercentageChange(e, "dlbrok_perc", segment)}
                disabled={rowCalculationType[segment] !== "Percentage"} // Disable if Slab is selected
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>




              <button onClick={handleSubmit} disabled={processing}>
                {processing ? <Spinner animation="border" size="sm" /> : "Submit"}
              </button>

              <button onClick={downloadAll}>Download All</button>
            </>
          )}
        </>
      ) : (
        <>
          <button onClick={() => setPreviewMode(false)}>Back</button>
          <h3>Filtered Records</h3>

          <input type="text" placeholder="Search Client Code" value={searchQuery} onChange={handleSearchChange} />
          <button onClick={handleDownload}>Download</button>

          <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          <span> Page {currentPage} of {Math.ceil(searchedRecords.length / recordsPerPage)} </span>
          <button onClick={nextPage} disabled={indexOfLastRecord >= searchedRecords.length}>Next</button>

          <div style={{ maxHeight: "500px", overflowY: "auto", border: "1px solid #ddd" }}>
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr>
        <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Client Code</th>
        <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Client Name</th>
        <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Client Location</th>
        <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>LocnID</th>
        <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Calculation Type</th>
        <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Squp Brokrage</th>
        <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Dilevery Brokrage</th>
        <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Total Brokrage</th>
        <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Squp Volume</th>
        <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Dilevery Volume</th>
        <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Total Volume</th>
        <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Squp Brokrage ({rowCalculationType[segment] === "Slab" ? percentage[segment].squp_slab + "% Slab" : percentage[segment].squp_perc + "%"})</th>
        <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Dilevery Brokrage ({rowCalculationType[segment] === "Slab" ? percentage[segment].dlbrok_slab + "% Slab" : percentage[segment].dlbrok_perc + "%"})</th>
        <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Total Brokrage Modify</th>
        <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Difference Squp</th>
        <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Difference Dilevery</th>
        <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Difference Total Brokrage</th>
      </tr>
    </thead>
    <tbody>
      {currentRecords.length > 0 ? currentRecords.map((record, index) => (
        <tr key={index}>
          <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{record.client_code}</td>
          <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{record.cl_name}</td>
          <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{record.Clientlocation}</td>
          <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{record.locnid}</td>
          <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{rowCalculationType[segment]}</td>
          <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{record.squp.toFixed(2)}</td>
          <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{record.dlbrok.toFixed(2)}</td>

          <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{(record.squp + record.dlbrok).toFixed(2)}</td>

          <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{record.volsqup.toFixed(2)}</td>
          <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{record.voldlbrok.toFixed(2)}</td>

          <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{(record.volsqup + record.voldlbrok).toFixed(2)}</td>

          <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{record.broksqup.toFixed(2)}</td>
          <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{record.brokdlv.toFixed(2)}</td>

          <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{(record.broksqup + record.brokdlv).toFixed(2)}</td>

          <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{record.diff_squp.toFixed(2)}</td>
          <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{record.diff_dlbrok.toFixed(2)}</td>

          <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{((record.squp + record.dlbrok).toFixed(2) - (record.broksqup + record.brokdlv).toFixed(2)).toFixed(2)}</td>

        </tr>
      )) : (
        <tr>
          <td colSpan="13" style={{ padding: "8px", textAlign: "center" }}>No records available</td>
        </tr>
      )}
    </tbody>
  </table>
</div>
        </>
      )}
    </div>
  );
}



































// import React, { useEffect, useState } from "react";
// import { Spinner } from "react-bootstrap";
// import * as XLSX from 'xlsx';

// export default function Brokrage() {
//   const [loading, setLoading] = useState(false);
//   const [processing, setProcessing] = useState(false);
//   const [allRecords, setAllRecords] = useState({ porteq: [], portfu: [], portop: [], portcom: [] });
//   const [filteredRecords, setFilteredRecords] = useState([]);
//   const [database, setDatabase] = useState(localStorage.getItem("database") || "");
//   const [calculationType, setCalculationType] = useState("Slab"); // Default is Slab
//   // const [percentage, setPercentage] = useState({ squp: 0.02, dlbrok: 0.2 });
//   const [percentage, setPercentage] = useState({
//     eq: { squp_slab: 0.02, dlbrok_slab: 0.2, squp_perc: 10, dlbrok_perc: 10 },
//     fu: { squp_slab: 0.02, dlbrok_slab: 0.2, squp_perc: 10, dlbrok_perc: 10 },
//     op: { squp_slab: 0.02, dlbrok_slab: 0.2, squp_perc: 10, dlbrok_perc: 10 },
//     com: { squp_slab: 0.02, dlbrok_slab: 0.2, squp_perc: 10, dlbrok_perc: 10 }
//   });
  
//   const [previewMode, setPreviewMode] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [clientCodeFilter, setClientCodeFilter] = useState("");
//   const [locnidFilter, setLocnidFilter] = useState("");
//   const [locnidFilter1, setLocnidFilter1] = useState("");
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 50; // Number of records per page

//   // Load stored percentages when component mounts
//   // useEffect(() => {
//   //   setPercentage({
//   //     squp: parseFloat(localStorage.getItem("squp")) || 0.02,
//   //     dlbrok: parseFloat(localStorage.getItem("dlbrok")) || 0.2,
//   //   });
//   // }, []);




//   // useEffect(() => {
//   //   setPercentage({
//   //     eq: {
//   //       squp: parseFloat(localStorage.getItem("eq_squp")) || 0.02,
//   //       dlbrok: parseFloat(localStorage.getItem("eq_dlbrok")) || 0.2,
//   //     },
//   //     fu: {
//   //       squp: parseFloat(localStorage.getItem("fu_squp")) || 0.02,
//   //       dlbrok: parseFloat(localStorage.getItem("fu_dlbrok")) || 0.2,
//   //     },
//   //     op: {
//   //       squp: parseFloat(localStorage.getItem("op_squp")) || 0.02,
//   //       dlbrok: parseFloat(localStorage.getItem("op_dlbrok")) || 0.2,
//   //     },
//   //     com: {
//   //       squp: parseFloat(localStorage.getItem("com_squp")) || 0.02,
//   //       dlbrok: parseFloat(localStorage.getItem("com_dlbrok")) || 0.2,
//   //     },
//   //   });
//   // }, []);


//   useEffect(() => {
//     const storedType = localStorage.getItem("calculationType") || "Slab";
//     setCalculationType(storedType);
  
//     setPercentage({
//       eq: {
//         squp_slab: parseFloat(localStorage.getItem("eq_squp_slab")) || 0.02,
//         dlbrok_slab: parseFloat(localStorage.getItem("eq_dlbrok_slab")) || 0.2,
//         squp_perc: parseFloat(localStorage.getItem("eq_squp_perc")) || 10,
//         dlbrok_perc: parseFloat(localStorage.getItem("eq_dlbrok_perc")) || 10,
//       },
//       fu: {
//         squp_slab: parseFloat(localStorage.getItem("fu_squp_slab")) || 0.02,
//         dlbrok_slab: parseFloat(localStorage.getItem("fu_dlbrok_slab")) || 0.2,
//         squp_perc: parseFloat(localStorage.getItem("fu_squp_perc")) || 10,
//         dlbrok_perc: parseFloat(localStorage.getItem("fu_dlbrok_perc")) || 10,
//       },
//       op: {
//         squp_slab: parseFloat(localStorage.getItem("op_squp_slab")) || 0.02,
//         dlbrok_slab: parseFloat(localStorage.getItem("op_dlbrok_slab")) || 0.2,
//         squp_perc: parseFloat(localStorage.getItem("op_squp_perc")) || 10,
//         dlbrok_perc: parseFloat(localStorage.getItem("op_dlbrok_perc")) || 10,
//       },
//       com: {
//         squp_slab: parseFloat(localStorage.getItem("com_squp_slab")) || 0.02,
//         dlbrok_slab: parseFloat(localStorage.getItem("com_dlbrok_slab")) || 0.2,
//         squp_perc: parseFloat(localStorage.getItem("com_squp_perc")) || 10,
//         dlbrok_perc: parseFloat(localStorage.getItem("com_dlbrok_perc")) || 10,
//       },
//     });
//   }, []);
  
  

//   const updatePercentage = (type) => {
//     if (type === "Slab") {
//       setPercentage({
//         eq: { squp: 0.02, dlbrok: 0.2 },
//         fu: { squp: 0.02, dlbrok: 0.2 },
//         op: { squp: 0.02, dlbrok: 0.2 },
//         com: { squp: 0.02, dlbrok: 0.2 },
//       });
//     } else {
//       setPercentage({
//         eq: { squp: 10, dlbrok: 10 },
//         fu: { squp: 10, dlbrok: 10 },
//         op: { squp: 10, dlbrok: 10 },
//         com: { squp: 10, dlbrok: 10 },
//       });
//     }
//   };

//   // const handleRowCalculationChange = (e, segment) => {
//   //   const newType = e.target.value;
  
//   //   setPercentage((prev) => {
//   //     const updated = {
//   //       ...prev,
//   //       [segment]: { ...prev[segment], calculationType: newType },
//   //     };
  
//   //     localStorage.setItem(`${segment}_calculationType`, newType); // Store row-specific selection
//   //     return updated;
//   //   });
//   // };


//    // State to track calculation type for each segment
//    const [rowCalculationType, setRowCalculationType] = useState({
//     eq: "Slab",
//     fu: "Slab",
//     op: "Slab",
//     com: "Slab"
//   });

//   // Load from localStorage on mount
//   useEffect(() => {
//     const storedTypes = JSON.parse(localStorage.getItem("rowCalculationType")) || {};
//     setRowCalculationType(prev => ({ ...prev, ...storedTypes }));
//   }, []);

//   // Handle Calculation Type Change for each row
//   const handleRowCalculationChange = (segment, type) => {
//     setRowCalculationType(prev => {
//       const updated = { ...prev, [segment]: type };
//       localStorage.setItem("rowCalculationType", JSON.stringify(updated)); // Save to localStorage
//       return updated;
//     });
//   };

//   // Handle percentage/slab value change
//   const handlePercentageChange = (e, field, segment) => {
//     let value = e.target.value.trim() === "" ? "" : parseFloat(e.target.value);

//     setPercentage(prev => {
//       const updated = {
//         ...prev,
//         [segment]: { ...prev[segment], [field]: value }
//       };

//       localStorage.setItem(`${segment}_${field}`, value); // Store value
//       return updated;
//     });
//   };


//   useEffect(() => {
//     async function fetchAllData() {
//       setLoading(true);
//       try {
//         const [eqResponse, fuResponse, opResponse, comResponse] = await Promise.all([
//           fetch("http://183.182.84.228:4005/saudabook/"),
//           fetch("http://183.182.84.228:4005/saudabookdev/"),
//           fetch("http://183.182.84.228:4005/saudabookdev/"),
//           fetch("http://183.182.84.228:4005/saudabookcom/"),
//         ]);

//         if (!eqResponse.ok || !fuResponse.ok || !opResponse.ok || !comResponse.ok) {
//           throw new Error("Error fetching data from one or more sources.");
//         }

//         const [eqRecords, fuRecords, opRecords, comRecords] = await Promise.all([
//           eqResponse.json(),
//           fuResponse.json(),
//           opResponse.json(),
//           comResponse.json(),
//         ]);


//         const allowedTypes = ['FUTIDX', 'FUTSTK'];
//         const filterfurecords = fuRecords.filter(record => allowedTypes.includes(record.instrument_type));
//         const notallowedTypes = ['OPTIDX', 'OPTSTK'];
//         const filteroprecords = opRecords.filter(record => notallowedTypes.includes(record.instrument_type));


//         setAllRecords({ porteq: eqRecords, portfu: filterfurecords, portop: filteroprecords, portcom: comRecords });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         alert("Error fetching data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchAllData();
//   }, []);







//   const handleSubmit = () => {
//     if (!database) {
//       alert("Please select a database");
//       return;
//     }
  
//     if (!allRecords[database] || allRecords[database].length === 0) {
//       alert("No data available for the selected segment.");
//       return;
//     }

//           // Map database to corresponding segment
//   const segmentMap = {
//     porteq: "eq",
//     portfu: "fu",
//     portop: "op",
//     portcom: "com",
//   };

//   const segment = segmentMap[database]; // Get segment from the database
  
//     setProcessing(true);
//     setTimeout(() => {
//       try {
//         let records = allRecords[database];

//         // Convert date input to YYYYMMDD format for comparison
//         const formatDateToYYYYMMDD = (dateStr) => {
//           if (!dateStr) return null;
//           const date = new Date(dateStr);
//           const year = date.getFullYear();
//           const month = String(date.getMonth() + 1).padStart(2, "0");
//           const day = String(date.getDate()).padStart(2, "0");
//           return `${year}${month}${day}`;
//         };
        
//         const fromDateFormatted = formatDateToYYYYMMDD(fromDate);
//         const toDateFormatted = formatDateToYYYYMMDD(toDate);


  
//         // Convert comma-separated filters into arrays
//         const clientCodeList = clientCodeFilter
//           ? clientCodeFilter.split(",").map(code => code.trim().toUpperCase())
//           : [];
//         const locnidList = locnidFilter
//           ? locnidFilter.split(",").map(loc => loc.trim().toUpperCase())
//           : [];
//           const locnidList1 = locnidFilter1
//           ? locnidFilter1.split(",").map(loc1 => loc1.trim().toUpperCase())
//           : [];
  
  
//         // Apply filters
//         if (clientCodeList.length > 0 || locnidList.length > 0|| locnidList1.length > 0 || fromDate || toDate) {
//           records = records.filter(record => {
//             const clientCode = (record.client_code || "").trim().toUpperCase();
//             const clientLocation = (record.Clientlocation || "").trim().toUpperCase();
//             const locnid = (record.locnid || "").trim().toUpperCase();
//             const tradeDate = String(record.trade_date).trim(); // Ensure trade_date is a string
//             const matchesDate =
//                 (!fromDateFormatted || tradeDate >= fromDateFormatted) &&
//                 (!toDateFormatted || tradeDate <= toDateFormatted);
  
//             return (
//               (clientCodeList.length === 0 || clientCodeList.includes(clientCode)) &&
//               (locnidList.length === 0 || locnidList.includes(clientLocation)) &&
//               (locnidList1.length === 0 || locnidList1.includes(locnid)) &&
//               matchesDate
//             );
//           });
//         }
  

  
//         const groupedData = records.reduce((acc, record) => {
//           const clientCode = record.client_code || "N/A";
//           const cl_name = record.cl_name || "N/A";
//           const Clientlocation = record.Clientlocation || "N/A";
//           const locnid = record.locnid || "N/A";
  
//           if (!acc[clientCode]) {
//             acc[clientCode] = {
//               client_code: clientCode,
//               cl_name: cl_name,
//               Clientlocation: Clientlocation,
//               locnid: locnid,
//               squp: 0,
//               dlbrok: 0,
//               volsqup: 0,
//               voldlbrok: 0,
//               broksqup: 0,
//               brokdlv: 0,
//               diff_squp: 0,
//               diff_dlbrok: 0,
//             };
//           }
  
//           const { squp_delv_flag, brokerage_per_unit, trade_quantity, market_rate } = record;
  
//           // if (squp_delv_flag === 0) {
//           //   acc[clientCode].squp += brokerage_per_unit * trade_quantity;
//           //   acc[clientCode].volsqup += market_rate * trade_quantity;
//           //   acc[clientCode].broksqup += (market_rate * trade_quantity) * (percentage[segment].squp / 100);
//           // } else if (squp_delv_flag === 1) {
//           //   acc[clientCode].dlbrok += brokerage_per_unit * trade_quantity;
//           //   acc[clientCode].voldlbrok += market_rate * trade_quantity;
//           //   acc[clientCode].brokdlv += (market_rate * trade_quantity) * (percentage[segment].dlbrok / 100);
//           // }



//           if (calculationType) {
//             // Slab-based calculation
//             if (squp_delv_flag === 0) {
//               acc[clientCode].squp += brokerage_per_unit * trade_quantity;
//               acc[clientCode].volsqup += market_rate * trade_quantity;
//               acc[clientCode].broksqup += (market_rate * trade_quantity) * (percentage[segment].squp_slab / 100);
//             } else if (squp_delv_flag === 1) {
//               acc[clientCode].dlbrok += brokerage_per_unit * trade_quantity;
//               acc[clientCode].voldlbrok += market_rate * trade_quantity;
//               acc[clientCode].brokdlv += (market_rate * trade_quantity) * (percentage[segment].dlbrok_slab / 100);
//             }
//           } else {
//             // Percentage-based calculation
//             if (squp_delv_flag === 0) {
//               acc[clientCode].squp += brokerage_per_unit * trade_quantity;
//               acc[clientCode].volsqup += market_rate * trade_quantity;
//               acc[clientCode].broksqup += (brokerage_per_unit * trade_quantity) * (percentage[segment].squp_perc / 100);
//             } else if (squp_delv_flag === 1) {
//               acc[clientCode].dlbrok += brokerage_per_unit * trade_quantity;
//               acc[clientCode].voldlbrok += market_rate * trade_quantity;
//               acc[clientCode].brokdlv += (brokerage_per_unit * trade_quantity) * (percentage[segment].dlbrok_perc / 100);
//             }
//           }

//           acc[clientCode].diff_squp = acc[clientCode].squp - acc[clientCode].broksqup;
//           acc[clientCode].diff_dlbrok = acc[clientCode].dlbrok - acc[clientCode].brokdlv;
  
//           return acc;
//         }, {});
  
//         setFilteredRecords(Object.values(groupedData));
//         setPreviewMode(true);
//       } catch (error) {
//         console.error("Error processing data:", error);
//         alert("Error processing data. Please try again.");
//       } finally {
//         setProcessing(false);
//       }
//     }, 500);
//   };
  
  

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // const handlePercentageChange = (e, key) => {
//   //   let value = e.target.value.trim() === "" ? '' : parseFloat(e.target.value);
//   //   setPercentage((prev) => {
//   //     const updated = { ...prev, [key]: value };
//   //     localStorage.setItem(key, value);
//   //     return updated;
//   //   });
//   // };



//   // const handlePercentageChange = (e, type, segment) => {
//   //   let value = e.target.value.trim() === "" ? '' : parseFloat(e.target.value);
  
//   //   setPercentage(prev => {
//   //     const updated = {
//   //       ...prev,
//   //       [segment]: { ...prev[segment], [type]: value }
//   //     };
  
//   //     localStorage.setItem(`${segment}_${type}`, value); // Store value
  
//   //     return updated;
//   //   });
//   // };


//   // const handlePercentageChange = (e, type, segment) => {
//   //   let value = e.target.value.trim() === "" ? '' : parseFloat(e.target.value);
  
//   //   setPercentage(prev => {
//   //     const updated = {
//   //       ...prev,
//   //       [segment]: { ...prev[segment], [type]: value }
//   //     };
  
//   //     localStorage.setItem(`${segment}_${type}`, value); // Store value
  
//   //     return updated;
//   //   });
//   // };



//   const handleDatabaseChange = (e) => {
//     const value = e.target.value;
//     setDatabase(value);
//     localStorage.setItem("database", value);
//   };

//   // Filter and paginate records
//   const searchedRecords = filteredRecords.filter((record) =>
//     (record.client_code?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
//     (record.cl_name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
//     (record.Clientlocation?.toLowerCase() || "").includes(searchQuery.toLowerCase())
//   );
  
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = searchedRecords.slice(indexOfFirstRecord, indexOfLastRecord);

//   const nextPage = () => {
//     if (currentPage < Math.ceil(searchedRecords.length / recordsPerPage)) {
//       setCurrentPage((prev) => prev + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prev) => prev - 1);
//     }
//   };









//   function downloadEQ() {
//     const sheetName = 'Brokerage Records EQ';
//     const currentDate = new Date();
//     const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
//     const wb = XLSX.utils.book_new();

//     const data = [
//         ["Sno.","Client Code","client name","Client location","locnID","Squp Brokrage","Dilevery Brokrage","Squp Volume","Dilevery Volume",`Squp Brokerage (${calculationType ? percentage.eq.squp_slab : percentage.eq.squp_perc}%)`,`Delivery Brokerage (${calculationType ? percentage.eq.dlbrok_slab : percentage.eq.dlbrok_perc}%)`,"Diff Squp","Diff Dilevery"],
//         ...searchedRecords.map((record, index) => [
//           index + 1, 
//           record.client_code,
//           record.cl_name,
//           record.Clientlocation,
//           record.locnid,
//           parseFloat(record.squp.toFixed(2)),
//           parseFloat(record.dlbrok.toFixed(2)),
//           parseFloat(record.volsqup.toFixed(2)),
//           parseFloat(record.voldlbrok.toFixed(2)),
//           parseFloat(calculationType ? record.broksqup.toFixed(2) : record.broksqup.toFixed(2)),
//           parseFloat(calculationType ? record.brokdlv.toFixed(2) : record.brokdlv.toFixed(2)),
//           parseFloat(record.diff_squp.toFixed(2)),
//           parseFloat(record.diff_dlbrok.toFixed(2))
//       ]),
//     ];

//     const ws = XLSX.utils.aoa_to_sheet(data);
//     XLSX.utils.book_append_sheet(wb, ws, sheetName);
//     XLSX.writeFile(wb, `Brokerage_Records_EQ_${formattedDate}.xlsx`);
// }


// function downloadFU() {
//   const sheetName = 'Brokerage Records FUTURE';
//   const currentDate = new Date();
//   const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
//   const wb = XLSX.utils.book_new();

//   const data = [
//       ["Sno.","Client Code","client name","Client location","locnID","Squp Brokrage","Dilevery Brokrage","Squp Volume","Dilevery Volume",`Squp Brokrage(${percentage.fu.squp})`,`Dilevery Brokrage (${percentage.fu.dlbrok})`,"Diff Squp","Diff Dilevery"],
//       ...searchedRecords.map((record, index) => [
//         index + 1, 
//         record.client_code,
//         record.cl_name,
//         record.Clientlocation,
//         record.locnid,
//         parseFloat(record.squp.toFixed(2)),
//         parseFloat(record.dlbrok.toFixed(2)),
//         parseFloat(record.volsqup.toFixed(2)),
//         parseFloat(record.voldlbrok.toFixed(2)),
//         parseFloat(calculationType ? record.broksqup.toFixed(2) : record.broksqup.toFixed(2)),
//         parseFloat(calculationType ? record.brokdlv.toFixed(2) : record.brokdlv.toFixed(2)),
//         parseFloat(record.diff_squp.toFixed(2)),
//         parseFloat(record.diff_dlbrok.toFixed(2))
//     ]),
//   ];

//   const ws = XLSX.utils.aoa_to_sheet(data);
//   XLSX.utils.book_append_sheet(wb, ws, sheetName);
//   XLSX.writeFile(wb, `Brokerage_Records_FUTURE_${formattedDate}.xlsx`);
// }




// function downloadOP() {
//   const sheetName = 'Brokerage Records OPTION';
//   const currentDate = new Date();
//   const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
//   const wb = XLSX.utils.book_new();

//   const data = [
//       ["Sno.","Client Code","client name","Client location","locnID","Squp Brokrage","Dilevery Brokrage","Squp Volume","Dilevery Volume",`Squp Brokrage(${percentage.op.squp})`,`Dilevery Brokrage (${percentage.op.dlbrok})`,"Diff Squp","Diff Dilevery"],
//       ...searchedRecords.map((record, index) => [
//         index + 1, 
//         record.client_code,
//         record.cl_name,
//         record.Clientlocation,
//         record.locnid,
//         parseFloat(record.squp.toFixed(2)),
//         parseFloat(record.dlbrok.toFixed(2)),
//         parseFloat(record.volsqup.toFixed(2)),
//         parseFloat(record.voldlbrok.toFixed(2)),
//         parseFloat(calculationType ? record.broksqup.toFixed(2) : record.broksqup.toFixed(2)),
//         parseFloat(calculationType ? record.brokdlv.toFixed(2) : record.brokdlv.toFixed(2)),
//         parseFloat(record.diff_squp.toFixed(2)),
//         parseFloat(record.diff_dlbrok.toFixed(2))
//     ]),
//   ];

//   const ws = XLSX.utils.aoa_to_sheet(data);
//   XLSX.utils.book_append_sheet(wb, ws, sheetName);
//   XLSX.writeFile(wb, `Brokerage_Records_OPTION_${formattedDate}.xlsx`);
// }



// function downloadCOM() {
//   const sheetName = 'Brokerage Records COM';
//   const currentDate = new Date();
//   const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
//   const wb = XLSX.utils.book_new();

//   const data = [
//       ["Sno.","Client Code","client name","Client location","locnID","Squp Brokrage","Dilevery Brokrage","Squp Volume","Dilevery Volume",`Squp Brokrage(${percentage.com.squp})`,`Dilevery Brokrage (${percentage.com.dlbrok})`,"Diff Squp","Diff Dilevery"],
//       ...searchedRecords.map((record, index) => [
//         index + 1, 
//         record.client_code,
//         record.cl_name,
//         record.Clientlocation,
//         record.locnid,
//         parseFloat(record.squp.toFixed(2)),
//         parseFloat(record.dlbrok.toFixed(2)),
//         parseFloat(record.volsqup.toFixed(2)),
//         parseFloat(record.voldlbrok.toFixed(2)),
//         parseFloat(calculationType ? record.broksqup.toFixed(2) : record.broksqup.toFixed(2)),
//         parseFloat(calculationType ? record.brokdlv.toFixed(2) : record.brokdlv.toFixed(2)),
//         parseFloat(record.diff_squp.toFixed(2)),
//         parseFloat(record.diff_dlbrok.toFixed(2))
//     ]),
//   ];

//   const ws = XLSX.utils.aoa_to_sheet(data);
//   XLSX.utils.book_append_sheet(wb, ws, sheetName);
//   XLSX.writeFile(wb, `Brokerage_Records_COM_${formattedDate}.xlsx`);
// }








// // function downloadAll() {
// //   const currentDate = new Date();
// //   const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
// //   const wb = XLSX.utils.book_new();

// //   if (!allRecords) {
// //     alert("No data available for download.");
// //     return;
// //   }

// //   // Map database to corresponding segment
// //   const segmentMap = {
// //     porteq: "eq",
// //     portfu: "fu",
// //     portop: "op",
// //     portcom: "com",
// //   };

// //   const segment = segmentMap[database]; // Get segment from the database



// //   const filterRecords = (records) => {
// //     if (!records || records.length === 0) return [];

// //     let filteredRecords = records;

// //     /// Convert date input to YYYYMMDD format for comparison
// //     const formatDateToYYYYMMDD = (dateStr) => {
// //       if (!dateStr) return null;
// //       const date = new Date(dateStr);
// //       const year = date.getFullYear();
// //       const month = String(date.getMonth() + 1).padStart(2, "0");
// //       const day = String(date.getDate()).padStart(2, "0");
// //       return `${year}${month}${day}`;
// //     };
    
// //     const fromDateFormatted = formatDateToYYYYMMDD(fromDate);
// //     const toDateFormatted = formatDateToYYYYMMDD(toDate);



// //     // Convert comma-separated filters into arrays
// //     const clientCodeList = clientCodeFilter
// //       ? clientCodeFilter.split(",").map(code => code.trim().toUpperCase())
// //       : [];
// //     const locnidList = locnidFilter
// //       ? locnidFilter.split(",").map(loc => loc.trim().toUpperCase())
// //       : [];
// //       const locnidList1 = locnidFilter1
// //       ? locnidFilter1.split(",").map(loc1 => loc1.trim().toUpperCase())
// //       : [];


// //     // Apply filters
// //     if (clientCodeList.length > 0 || locnidList.length > 0 || locnidList1.length > 0 || fromDate || toDate) {
// //       records = records.filter(record => {
// //         const clientCode = (record.client_code || "").trim().toUpperCase();
// //         const clientLocation = (record.Clientlocation || "").trim().toUpperCase();
// //         const locnid = (record.locnid || "").trim().toUpperCase();
// //         const tradeDate = String(record.trade_date).trim(); // Ensure trade_date is a string
// //         const matchesDate =
// //             (!fromDateFormatted || tradeDate >= fromDateFormatted) &&
// //             (!toDateFormatted || tradeDate <= toDateFormatted);

// //         return (
// //           (clientCodeList.length === 0 || clientCodeList.includes(clientCode)) &&
// //           (locnidList.length === 0 || locnidList.includes(clientLocation)) &&
// //           (locnidList1.length === 0 || locnidList1.includes(locnid)) &&
// //           matchesDate
// //         );
// //       });
// //     }

// //     return Object.values(
// //       filteredRecords.reduce((acc, record) => {
// //         const clientCode = record.client_code || "N/A";
// //           const cl_name = record.cl_name || "N/A";
// //           const Clientlocation = record.Clientlocation || "N/A";
// //           const locnid = record.locnid || "N/A";
  
// //           if (!acc[clientCode]) {
// //             acc[clientCode] = {
// //               client_code: clientCode,
// //               cl_name: cl_name,
// //               Clientlocation: Clientlocation,
// //               locnid: locnid,
// //               squp: 0,
// //               dlbrok: 0,
// //               volsqup: 0,
// //               voldlbrok: 0,
// //               broksqup: 0,
// //               brokdlv: 0,
// //               diff_squp: 0,
// //               diff_dlbrok: 0,
// //             };
// //           }
  
// //           const { squp_delv_flag, brokerage_per_unit, trade_quantity, market_rate } = record;
  
// //           if (squp_delv_flag === 0) {
// //             acc[clientCode].squp += brokerage_per_unit * trade_quantity;
// //             acc[clientCode].volsqup += market_rate * trade_quantity;
// //             acc[clientCode].broksqup += (market_rate * trade_quantity) * (percentage[segment].squp / 100);
// //           } else if (squp_delv_flag === 1) {
// //             acc[clientCode].dlbrok += brokerage_per_unit * trade_quantity;
// //             acc[clientCode].voldlbrok += market_rate * trade_quantity;
// //             acc[clientCode].brokdlv += (market_rate * trade_quantity) * (percentage[segment].dlbrok / 100);
// //           }
  
// //           acc[clientCode].diff_squp = acc[clientCode].squp - acc[clientCode].broksqup;
// //           acc[clientCode].diff_dlbrok = acc[clientCode].dlbrok - acc[clientCode].brokdlv;
  
// //           return acc;
// //       }, {})
// //     );
// //   };

// //   const createSheet = (records, sheetName) => {
// //     const data = [
// //       ["Sno.", "Client Code", "Client Name", "Client Location", "LocnID", "Squp Brokerage", "Delivery Brokerage", "Squp Volume", "Delivery Volume", `Squp Brokerage (${percentage[segment].squp}%)`, `Delivery Brokerage (${percentage[segment].dlbrok}%)`, "Diff Squp", "Diff Delivery"],
// //       ...records.map((record, index) => [
// //         index + 1,
// //         record.client_code || "",
// //         record.cl_name || "",
// //         record.Clientlocation || "",
// //         record.locnid || "",
// //         parseFloat((record.squp ?? 0).toFixed(2)),
// //         parseFloat((record.dlbrok ?? 0).toFixed(2)),
// //         parseFloat((record.volsqup ?? 0).toFixed(2)),
// //         parseFloat((record.voldlbrok ?? 0).toFixed(2)),
// //         parseFloat((record.broksqup ?? 0).toFixed(2)),
// //         parseFloat((record.brokdlv ?? 0).toFixed(2)),
// //         parseFloat((record.diff_squp ?? 0).toFixed(2)),
// //         parseFloat((record.diff_dlbrok ?? 0).toFixed(2)),
// //       ]),
// //     ];
// //     return XLSX.utils.aoa_to_sheet(data);
// //   };

// //   // Apply filtering to each dataset and add to workbook
// //   XLSX.utils.book_append_sheet(wb, createSheet(filterRecords(allRecords.porteq, "eq"), "Brokerage EQ", "eq"), "Brokerage EQ");
// //   XLSX.utils.book_append_sheet(wb, createSheet(filterRecords(allRecords.portfu, "fu"), "Brokerage FU", "fu"), "Brokerage FU");
// //   XLSX.utils.book_append_sheet(wb, createSheet(filterRecords(allRecords.portop, "op"), "Brokerage OP", "op"), "Brokerage OP");
// //   XLSX.utils.book_append_sheet(wb, createSheet(filterRecords(allRecords.portcom, "com"), "Brokerage COM", "com"), "Brokerage COM");

// //   XLSX.writeFile(wb, `Filtered_Brokerage_Records_ALL_${formattedDate}.xlsx`);
// // }



// function downloadAll() {
//   const currentDate = new Date();
//   const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
//   const wb = XLSX.utils.book_new();

//   if (!allRecords) {
//     alert("No data available for download.");
//     return;
//   }

//   // Map database keys to corresponding segments
//   const segmentMap = {
//     porteq: "eq",
//     portfu: "fu",
//     portop: "op",
//     portcom: "com",
//   };

//   const filterRecords = (records, segment) => {
//     if (!records || records.length === 0) return [];

//     let filteredRecords = records;

//     /// Convert date input to YYYYMMDD format for comparison
//     const formatDateToYYYYMMDD = (dateStr) => {
//       if (!dateStr) return null;
//       const date = new Date(dateStr);
//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, "0");
//       const day = String(date.getDate()).padStart(2, "0");
//       return `${year}${month}${day}`;
//     };

//     const fromDateFormatted = formatDateToYYYYMMDD(fromDate);
//     const toDateFormatted = formatDateToYYYYMMDD(toDate);

//     // Convert comma-separated filters into arrays
//     const clientCodeList = clientCodeFilter
//       ? clientCodeFilter.split(",").map(code => code.trim().toUpperCase())
//       : [];
//     const locnidList = locnidFilter
//       ? locnidFilter.split(",").map(loc => loc.trim().toUpperCase())
//       : [];
//     const locnidList1 = locnidFilter1
//       ? locnidFilter1.split(",").map(loc1 => loc1.trim().toUpperCase())
//       : [];

//     // Apply filters
//     if (clientCodeList.length > 0 || locnidList.length > 0 || locnidList1.length > 0 || fromDate || toDate) {
//       records = records.filter(record => {
//         const clientCode = (record.client_code || "").trim().toUpperCase();
//         const clientLocation = (record.Clientlocation || "").trim().toUpperCase();
//         const locnid = (record.locnid || "").trim().toUpperCase();
//         const tradeDate = String(record.trade_date).trim(); // Ensure trade_date is a string
//         const matchesDate =
//           (!fromDateFormatted || tradeDate >= fromDateFormatted) &&
//           (!toDateFormatted || tradeDate <= toDateFormatted);

//         return (
//           (clientCodeList.length === 0 || clientCodeList.includes(clientCode)) &&
//           (locnidList.length === 0 || locnidList.includes(clientLocation)) &&
//           (locnidList1.length === 0 || locnidList1.includes(locnid)) &&
//           matchesDate
//         );
//       });
//     }

//     return Object.values(
//       records.reduce((acc, record) => {
//         const clientCode = record.client_code || "N/A";
//         const cl_name = record.cl_name || "N/A";
//         const Clientlocation = record.Clientlocation || "N/A";
//         const locnid = record.locnid || "N/A";

//         if (!acc[clientCode]) {
//           acc[clientCode] = {
//             client_code: clientCode,
//             cl_name: cl_name,
//             Clientlocation: Clientlocation,
//             locnid: locnid,
//             squp: 0,
//             dlbrok: 0,
//             volsqup: 0,
//             voldlbrok: 0,
//             broksqup: 0,
//             brokdlv: 0,
//             diff_squp: 0,
//             diff_dlbrok: 0,
//           };
//         }

//         const { squp_delv_flag, brokerage_per_unit, trade_quantity, market_rate } = record;

//         if (calculationType) {
//           // Slab-based calculation
//           if (squp_delv_flag === 0) {
//             acc[clientCode].squp += brokerage_per_unit * trade_quantity;
//             acc[clientCode].volsqup += market_rate * trade_quantity;
//             acc[clientCode].broksqup += (market_rate * trade_quantity) * (percentage[segment].squp_slab / 100);
//           } else if (squp_delv_flag === 1) {
//             acc[clientCode].dlbrok += brokerage_per_unit * trade_quantity;
//             acc[clientCode].voldlbrok += market_rate * trade_quantity;
//             acc[clientCode].brokdlv += (market_rate * trade_quantity) * (percentage[segment].dlbrok_slab / 100);
//           }
//         } else {
//           // Percentage-based calculation
//           if (squp_delv_flag === 0) {
//             acc[clientCode].squp += brokerage_per_unit * trade_quantity;
//             acc[clientCode].volsqup += market_rate * trade_quantity;
//             acc[clientCode].broksqup += (brokerage_per_unit * trade_quantity) * (percentage[segment].squp_perc / 100);
//           } else if (squp_delv_flag === 1) {
//             acc[clientCode].dlbrok += brokerage_per_unit * trade_quantity;
//             acc[clientCode].voldlbrok += market_rate * trade_quantity;
//             acc[clientCode].brokdlv += (brokerage_per_unit * trade_quantity) * (percentage[segment].dlbrok_perc / 100);
//           }
//         }

//         acc[clientCode].diff_squp = acc[clientCode].squp - acc[clientCode].broksqup;
//         acc[clientCode].diff_dlbrok = acc[clientCode].dlbrok - acc[clientCode].brokdlv;

//         return acc;
//       }, {})
//     );
//   };

//   const createSheet = (records, sheetName, segment) => {
//     const data = [
//       ["Sno.", "Client Code", "Client Name", "Client Location", "LocnID", "Squp Brokerage", "Delivery Brokerage", "Squp Volume", "Delivery Volume", `Squp Brokerage (${percentage[segment].squp}%)`, `Delivery Brokerage (${percentage[segment].dlbrok}%)`, "Diff Squp", "Diff Delivery"],
//       ...records.map((record, index) => [
//         index + 1,
//         record.client_code || "",
//         record.cl_name || "",
//         record.Clientlocation || "",
//         record.locnid || "",
//         parseFloat((record.squp ?? 0).toFixed(2)),
//         parseFloat((record.dlbrok ?? 0).toFixed(2)),
//         parseFloat((record.volsqup ?? 0).toFixed(2)),
//         parseFloat((record.voldlbrok ?? 0).toFixed(2)),
//         parseFloat((record.broksqup ?? 0).toFixed(2)),
//         parseFloat((record.brokdlv ?? 0).toFixed(2)),
//         parseFloat((record.diff_squp ?? 0).toFixed(2)),
//         parseFloat((record.diff_dlbrok ?? 0).toFixed(2)),
//       ]),
//     ];

//  // Add a blank row before the total row
//  data.push([]);

//  // Compute Totals
//  const totalRow = [
//    "Total", "", "", "", "",
//    records.reduce((sum, record) => sum + (record.squp ?? 0), 0).toFixed(2),
//    records.reduce((sum, record) => sum + (record.dlbrok ?? 0), 0).toFixed(2),
//    records.reduce((sum, record) => sum + (record.volsqup ?? 0), 0).toFixed(2),
//    records.reduce((sum, record) => sum + (record.voldlbrok ?? 0), 0).toFixed(2),
//    records.reduce((sum, record) => sum + (record.broksqup ?? 0), 0).toFixed(2),
//    records.reduce((sum, record) => sum + (record.brokdlv ?? 0), 0).toFixed(2),
//    records.reduce((sum, record) => sum + (record.diff_squp ?? 0), 0).toFixed(2),
//    records.reduce((sum, record) => sum + (record.diff_dlbrok ?? 0), 0).toFixed(2),
//  ];

//  // Append total row after the blank row
//  data.push(totalRow);

//  return XLSX.utils.aoa_to_sheet(data);




//     // return XLSX.utils.aoa_to_sheet(data);
//   };

//   // Apply filtering to each dataset and add to workbook
//   Object.keys(segmentMap).forEach((dbKey) => {
//     const segment = segmentMap[dbKey]; // Get correct segment for each dataset
//     const records = filterRecords(allRecords[dbKey], segment);
//     if (records.length > 0) {
//       const sheetName = `Brokerage ${segment.toUpperCase()}`;
//       XLSX.utils.book_append_sheet(wb, createSheet(records, sheetName, segment), sheetName);
//     }
//   });

//   XLSX.writeFile(wb, `Filtered_Brokerage_Records_ALL_${formattedDate}.xlsx`);
// }











//   function handleDownload() {
//     switch (database) {
//       case 'porteq':
//         downloadEQ();
//         break;
//       case 'portfu':
//         downloadFU();
//         break;
//         case 'portop':
//         downloadOP();
//         break;
//       case 'portcom':
//         downloadCOM();
//         break;
//       default:
//         alert('Please select a valid database');
//     }
//   }




//             // Map database to corresponding segment
//             const segmentMap = {
//               porteq: "eq",
//               portfu: "fu",
//               portop: "op",
//               portcom: "com",
//             };
          
//             const segment = segmentMap[database]; // Get segment from the database









//   const uniquelocn = Array.from(new Set(filteredRecords && filteredRecords.map(record => record.Clientlocation)));
//   const uniquelocn1 = Array.from(new Set(filteredRecords && filteredRecords.map(record => record.locnid)));
//   const uniqueUccs = Array.from(new Set(filteredRecords && filteredRecords.map(record => record.client_code)));

//   return (
//     <div>
//       {!previewMode ? (
//         <>
//           <h3>Brokerage from 01/04/2024 To 28/02/2025</h3>
//           {loading ? (
//             <Spinner animation="border" />
//           ) : (
//             <>
//               <label>Segment: </label>
//               <select value={database} onChange={handleDatabaseChange}>
//                 <option value="">Select Segment</option>
//                 <option value="porteq">EQ</option>
//                 <option value="portfu">FU</option>
//                 <option value="portop">OP</option>
//                 <option value="portcom">COM</option>
//               </select>
//               <br />

//               {/* <label>Select Calculation Type:</label>
//                 <select value={calculationType} onChange={handleCalculationChange}>
//                   <option value="Slab">Slab</option>
//                   <option value="Percentage">Percentage</option>
//                 </select>
//                 <br /> */}

//               <label>From Date:</label>
// <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />

//       <label>To Date:</label>
//       <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
//       <br />
              
//               <label>Client Code (Comma-Separated): </label>
//               <input
//                 type="text"
//                   list="symbol-list"
//                   value={clientCodeFilter}
//                   onChange={(e) => setClientCodeFilter(e.target.value)}
//                   placeholder="Enter Client Code"
//                 />
//                 <datalist id="symbol-list">
//                   {uniqueUccs.map((client_code) => (
//                       <option key={client_code} value={client_code}>
//                         {client_code}
//                       </option>
//                   ))}
//                 </datalist>
//               <br />

//               <label>Kotak Location ID (Comma-Separated): </label>
//               <input
//               type="text"
//                 list="symbol"
//                 value={locnidFilter}
//                 onChange={(e) => setLocnidFilter(e.target.value)}
//                 placeholder="Enter Location IDs (e.g., L01, L02)"
//               />
//               <datalist id="symbol">
//                 {uniquelocn.map((client_location) => (
//                     <option key={client_location} value={client_location}>
//                       {client_location}
//                     </option>
//                 ))}
//               </datalist>
//               <br />

//               <label>ESL Locnid (Comma-Separated): </label>
//               <input
//               type="text"
//                 list="symbols"
//                 value={locnidFilter1}
//                 onChange={(e) => setLocnidFilter1(e.target.value)}
//                 placeholder="Enter LocnIDs (e.g., L01, L02)"
//               />
//               <datalist id="symbols">
//                 {uniquelocn1.map((locnid) => (
//                     <option key={locnid} value={locnid}>
//                       {locnid}
//                     </option>
//                 ))}
//               </datalist>
//               <br />

//               {/* <table>
//   <thead>
//     <tr>
//       <th>Segment</th>
//       <th>Squp %</th>
//       <th>Dlbrok %</th>
//     </tr>
//   </thead>
//   <tbody>
//     {["eq", "fu", "op", "com"].map((segment) => (
//       <tr key={segment}>
//         <td>{segment.toUpperCase()}</td>
//         <td>
//           <input
//             type="number"
//             value={percentage[segment]?.squp}  // ✅ Use optional chaining to prevent errors
//             step="0.001"
//             onChange={(e) => handlePercentageChange(e, "squp", segment)}
//           />
//         </td>
//         <td>
//           <input
//             type="number"
//             value={percentage[segment]?.dlbrok}  // ✅ Use optional chaining to prevent errors
//             step="0.001"
//             onChange={(e) => handlePercentageChange(e, "dlbrok", segment)}
//           />
//         </td>
//       </tr>
//     ))}
//   </tbody>
// </table> */}


// <table border="1">
//       <thead>
//         <tr>
//           <th>Segment</th>
//           <th>Calculation Type</th>
//           <th>Squp Slab %</th>
//           <th>Dlbrok Slab %</th>
//           <th>Squp %</th>
//           <th>Dlbrok %</th>
//         </tr>
//       </thead>
//       <tbody>
//         {["eq", "fu", "op", "com"].map((segment) => (
//           <tr key={segment}>
//             <td>{segment.toUpperCase()}</td>

//             {/* Dropdown to select calculation type */}
//             <td>
//               <select
//                 value={rowCalculationType[segment]}
//                 onChange={(e) => handleRowCalculationChange(segment, e.target.value)}
//               >
//                 <option value="Slab">Slab</option>
//                 <option value="Percentage">Percentage</option>
//               </select>
//             </td>

//             {/* Squp Slab % */}
//             <td>
//               <input
//                 type="number"
//                 value={percentage[segment]?.squp_slab || ""}
//                 step="0.001"
//                 onChange={(e) => handlePercentageChange(e, "squp_slab", segment)}
//                 disabled={rowCalculationType[segment] !== "Slab"} // Disable if Percentage is selected
//               />
//             </td>

//             {/* Dlbrok Slab % */}
//             <td>
//               <input
//                 type="number"
//                 value={percentage[segment]?.dlbrok_slab || ""}
//                 step="0.001"
//                 onChange={(e) => handlePercentageChange(e, "dlbrok_slab", segment)}
//                 disabled={rowCalculationType[segment] !== "Slab"} // Disable if Percentage is selected
//               />
//             </td>

//             {/* Squp % */}
//             <td>
//               <input
//                 type="number"
//                 value={percentage[segment]?.squp_perc || ""}
//                 step="0.001"
//                 onChange={(e) => handlePercentageChange(e, "squp_perc", segment)}
//                 disabled={rowCalculationType[segment] !== "Percentage"} // Disable if Slab is selected
//               />
//             </td>

//             {/* Dlbrok % */}
//             <td>
//               <input
//                 type="number"
//                 value={percentage[segment]?.dlbrok_perc || ""}
//                 step="0.001"
//                 onChange={(e) => handlePercentageChange(e, "dlbrok_perc", segment)}
//                 disabled={rowCalculationType[segment] !== "Percentage"} // Disable if Slab is selected
//               />
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>




//               <button onClick={handleSubmit} disabled={processing}>
//                 {processing ? <Spinner animation="border" size="sm" /> : "Submit"}
//               </button>

//               <button onClick={downloadAll}>Download All</button>
//             </>
//           )}
//         </>
//       ) : (
//         <>
//           <button onClick={() => setPreviewMode(false)}>Back</button>
//           <h3>Filtered Records</h3>

//           <input type="text" placeholder="Search Client Code" value={searchQuery} onChange={handleSearchChange} />
//           <button onClick={handleDownload}>Download</button>

//           <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
//           <span> Page {currentPage} of {Math.ceil(searchedRecords.length / recordsPerPage)} </span>
//           <button onClick={nextPage} disabled={indexOfLastRecord >= searchedRecords.length}>Next</button>

//           <div style={{ maxHeight: "500px", overflowY: "auto", border: "1px solid #ddd" }}>
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr>
//               <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Client Code</th>
//               <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>client name</th>
//               <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Client location</th>
//               <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>locnID</th>
//               <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Squp Brokrage</th>
//               <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Dilevery Brokrage</th>
//               <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Squp Volume</th>
//               <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Dilevery Volume</th>
//               <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Squp Brokrage ({percentage[segment].squp})</th>
//               <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Dilevery Brokrage ({percentage[segment].dlbrok})</th>
//               <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Diff Squp</th>
//               <th style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1, padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Diff Dilevery</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentRecords.length > 0 ? currentRecords.map((record, index) => (
//               <tr key={index}>
//                 <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{record.client_code}</td>
//                 <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{record.cl_name}</td>
//                 <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{record.Clientlocation}</td>
//                 <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{record.locnid}</td>
//                 <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{record.squp.toFixed(2)}</td>
//                 <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{record.dlbrok.toFixed(2)}</td>
//                 <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{record.volsqup.toFixed(2)}</td>
//                 <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{record.voldlbrok.toFixed(2)}</td>
//                 <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{record.broksqup.toFixed(2)}</td>
//                 <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{record.brokdlv.toFixed(2)}</td>
//                 <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{record.diff_squp.toFixed(2)}</td>
//                 <td style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{record.diff_dlbrok.toFixed(2)}</td>
//               </tr>
//             )) : (
//               <tr>
//                 <td colSpan="11" style={{ padding: "8px", textAlign: "center" }}>No records available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//         </>
//       )}
//     </div>
//   );
// }

