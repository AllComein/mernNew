


import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { Spinner } from "react-bootstrap";

import authService from "../../services/auth.service";

export default function BalanceInfos() {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTermUCC, setSearchTermUCC] = useState('');
  const [searchTermLocation, setSearchTermLocation] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [dataFound, setDataFound] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  // Calculate total pages
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  useEffect(() => {
    async function getRecords() {
      setLoading(true);
      try {
        const response = await fetch(`http://183.182.84.228:4005/stocklimits/`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          setLoading(false);
          return;
        }
        // const records = await response.json();
        // setRecords(records);
        // setFilteredRecords(records);

        const records = await response.json();
        // const currentusername = authService.getCurrentUser()
        // const filterRecords = records.filter(record => record.locn_cd === currentusername.username)

        const currentUser = authService.getCurrentUser();
        const allUsersResponse = await authService.getAllUsers();
        const currentUserDetails = allUsersResponse.find(user => user.username === currentUser.username);
  

          const viewableUsers = currentUserDetails.viewableUsers.split(',');

          // Filter letter data based on viewableUsers (locnid should match one of the viewable usernames)
          const filteredLetterData = records.filter(record =>
            viewableUsers.includes(record.locnid))

        setRecords(filteredLetterData);
        setFilteredRecords(filteredLetterData);










      } catch (error) {
        const message = `An error occurred: ${error.message}`;
        window.alert(message);
      } finally {
        setLoading(false);
      }
    }
    getRecords();
  }, []);

  function handleFilter() {
    let filtered = [...records];

    if (searchTermUCC) {
      const termsUCC = searchTermUCC.split(',').map(term => term.trim());
      filtered = filtered.filter(record =>
        termsUCC.some(term =>
          (record.Client_Code && record.Client_Code.toLowerCase().includes(term.toLowerCase())) ||
          (record.Client_Name && record.Client_Name.toLowerCase().includes(term.toLowerCase()))  ||
          (record.panno && record.panno.toLowerCase().includes(term.toLowerCase()))
        )
      );
    }

    if (searchTermLocation) {
      const termsLocation = searchTermLocation.split(',').map(term => term.trim());
      filtered = filtered.filter(record =>
        termsLocation.some(term =>
          (record.locnid && record.locnid.toLowerCase().includes(term.toLowerCase()))
        )
      );
    }

    setFilteredRecords(filtered);
    setDataFound(filtered.length > 0);
    setCurrentPage(1);
  }

  function handleDownload() {
    const sheetName = 'Filtered Trial Balance Records';
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    // Prepare the header row
    const header = [
      "Sno.",
      "Client Code",
      "Client Name",
      "Locnid",
      "Franchise Code",

     "Original Till Date Balance",
      "MTF Ledger Bal",
      "Normal Ledger Bal",
      "As On Month Accured Int",
      "Neo RMS Limit",

      "Fut Bill DrCr",
      "Cash Var Margin",
      "Derivatives Span",
      "Total Span Levied",
      "Peak Margin",

      "Mtf Funded Stock Market Value",
      "MTF SHORTAGE/EXCESS",
      "MTF Var Margin",
      "MTF MTM LOSS",
      "POA Stocks",
      "POA-Approved",
      "POA-Non Approved",
      "BALANCE AFTER MTF",
      "BALANCE AFTER SPAN",

      "POA-B-Hcut",
      "POA-B-Approved",
      "MF POA BHcut",

      "Free POA Stocks",
      "Free POA-Approved",
      "Free POA-Non Approved",
      "Free MF POA Stock",
      "Free MF POA BHcut",

      "Free POA-B-Hcut",
      "Free POA-B-Approved",
      "Free POA-B-Non-Approved",
  ];

  const data = [
    header,
    ...filteredRecords.map((record, index) => [
      index + 1, 
      record.Client_Code,
record.Client_Name,
record.locnid,
record.ks_frccode,

parseFloat(record.Original_Till_Date_Balance) || 0,
parseFloat(-record.MTF_Ledger_Bal) || 0,
parseFloat(record.Normal_Ledger_Bal) || 0,
// parseFloat(record.Normal_Ledger_Bal + record.Neo_RMS_Limit) || 0,
parseFloat(Math.max(0, record.Normal_Ledger_Bal + record.Neo_RMS_Limit)) || 0,
parseFloat(record.Neo_RMS_Limit) || 0,

         


parseFloat(record.Fut_Bill_DrCr) || 0,
parseFloat(record.Cash_Var_Margin) || 0,
parseFloat(record.Derivatives_Span) || 0,
parseFloat(record.Total_Span_Levied) || 0,
parseFloat(record.Peak_Margin) || 0,

parseFloat(record.Funded_Market_Value) || 0,
parseFloat(record.MTF_Ledger_Bal + record.Funded_Market_Value) || 0,
parseFloat(record.MTF_Var_Margin) || 0,
parseFloat(Math.min(record.MTF_Ledger_Bal + record.Funded_Market_Value, 0)) || 0,
parseFloat(record.POA_Stocks) || 0,
parseFloat(record.POA_Approved) || 0,
parseFloat(record.POA_Non_Approved) || 0,
parseFloat(record.POA_Stocks - record.MTF_Var_Margin - Math.min(record.MTF_Ledger_Bal + record.Funded_Market_Value, 0)) || 0,
parseFloat((record.POA_Stocks - record.MTF_Var_Margin - Math.min(record.MTF_Ledger_Bal + record.Funded_Market_Value, 0)) - Math.max(record.Total_Span_Levied, record.Peak_Margin)) || 0,

parseFloat(record.POA_B_Hcut) || 0,
parseFloat(record.POA_B_Approved) || 0,
parseFloat(record.MF_POA_Stock) || 0,
parseFloat(record.Free_POA_Stocks) || 0,
parseFloat(record.Free_POA_Approved) || 0,
parseFloat(record.Free_POA_Non_Approved) || 0,
parseFloat(record.Free_MF_POA_Stock) || 0,
parseFloat(record.Free_MF_POA_BHcut) || 0,
parseFloat(record.Free_POA_B_Hcut) || 0,
parseFloat(record.Free_POA_B_Approved) || 0,
parseFloat(record.Free_POA_B_Non_Approved) || 0,


// parseFloat(record.Fin_DrCr_NonMTF) || 0,
      
    ]),
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `Filtered_Balance_Info_Records_${formattedDate}.xlsx`);
}
  
  

  function handleRecordsPerPageChange(event) {
    setRecordsPerPage(Number(event.target.value));
    setCurrentPage(1);
  }

  function handlePageChange(direction) {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  function handleViewRecord(record) {
    setSelectedRecord(record);
  }

  function handleBack() {
    setSelectedRecord(null);
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleFilter();
  }

  // Inline styles
  const tableWrapperStyle = {
    maxHeight: '500px',
    overflowY: 'auto',
    border: '1px solid #ddd',
    marginBottom: '20px', // Add margin for spacing
    position: 'relative',
  };

  const thStyle = {
    position: 'sticky',
    top: 0,
    backgroundColor: '#fff',
    zIndex: 10,
    borderBottom: '2px solid #ddd',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '10px',
  };


  const date = new Date(records.length > 0 ? records[0].Date : null);
const formattedDate = records.length > 0 ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}` : "No data available";


  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Balance Information (Testing)</h1>
      <h2 style={{ textAlign: 'center' }}>{formattedDate}</h2>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search by UCC" 
          value={searchTermUCC} 
          onChange={(e) => setSearchTermUCC(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Search by Location" 
          value={searchTermLocation} 
          onChange={(e) => setSearchTermLocation(e.target.value)} 
        />
        <button onClick={handleSubmit} style={buttonStyle}>Filter</button>
        {/* <button onClick={handleDownload} style={buttonStyle}>Download Excel</button> */}
      </div>


      <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <select onChange={handleRecordsPerPageChange} value={recordsPerPage}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>Previous</button>
            <span> Page {currentPage} of {totalPages} </span>
            <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>Next</button>
          </div>

      {loading && <Spinner animation="border" />}

      {!loading && dataFound && (
        <>
          <div style={tableWrapperStyle}>
          <table style={tableStyle}>
            <thead>
                <tr>
                  <th style={thStyle}></th>
                  <th style={thStyle}>Client Code</th>
                <th style={thStyle}>Client Name</th>
                <th style={thStyle}>Locnid</th>
                <th style={thStyle}>Franchise Code</th>

                <th style={thStyle}>Original Till Date Balance</th>
                <th style={thStyle}>MTF Ledger Bal</th>
                <th style={thStyle}>Normal Ledger Bal</th>
                <th style={thStyle}>As On Month Accured Int</th>
                <th style={thStyle}>Neo RMS Limit</th>
                
                <th style={thStyle}>Fut Bill DrCr</th>
                <th style={thStyle}>Cash Var Margin</th>
                <th style={thStyle}>Derivatives Span</th>
                <th style={thStyle}>Total Span Levied</th>
                <th style={thStyle}>Peak Margin</th>
                
                <th style={thStyle}>Mtf Funded Stock Market Value</th>
                <th style={thStyle}>MTF SHORTAGE/EXCESS</th>
                <th style={thStyle}>MTF Var Margin</th>
                <th style={thStyle}>MTF MTM LOSS</th>
                <th style={thStyle}>POA Stocks</th>
                <th style={thStyle}>POA-Approved</th>
                <th style={thStyle}>POA-Non Approved</th>
                <th style={thStyle}>BALANCE AFTER MTF</th>
                <th style={thStyle}>BALANCE AFTER SPAN</th>
                
                <th style={thStyle}>POA-B-Hcut</th>
                <th style={thStyle}>POA-B-Approved</th>
                <th style={thStyle}>MF POA BHcut</th>
               
                <th style={thStyle}>Free POA Stocks</th>
                <th style={thStyle}>Free POA-Approved</th>
                <th style={thStyle}>Free POA-Non Approved</th>
                <th style={thStyle}>Free MF POA Stock</th>
                <th style={thStyle}>Free MF POA BHcut</th>
                
                <th style={thStyle}>Free POA-B-Hcut</th>
                <th style={thStyle}>Free POA-B-Approved</th>
                <th style={thStyle}>Free POA-B-Non-Approved</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((record, index) => (
                  <tr key={index}>
                    <td>Detail</td>
                    <td>{record.Client_Code}</td>
                    <td>{record.Client_Name}</td>
                    <td>{record.locnid}</td>
                    <td>{record.ks_frccode}</td>

                    
                    <td>{parseFloat(record.Original_Till_Date_Balance).toFixed(2)}</td>
                    {/* <td>{parseFloat(record.MTF_Ledger_Bal).toFixed(2)}</td> */}
                    <td>{parseFloat(-record.MTF_Ledger_Bal).toFixed(2)}</td>
                    <td>{parseFloat(record.Normal_Ledger_Bal).toFixed(2)}</td>
                    {/* <td>{parseFloat(record.Normal_Ledger_Bal + record.Neo_RMS_Limit).toFixed(2)}</td> */}
                    <td>{parseFloat(Math.max(0, record.Normal_Ledger_Bal + record.Neo_RMS_Limit)).toFixed(2)}</td>


                    <td>{parseFloat(record.Neo_RMS_Limit).toFixed(2)}</td>

                    <td>{parseFloat(record.Fut_Bill_DrCr).toFixed(2)}</td>
                    <td>{parseFloat(record.Cash_Var_Margin).toFixed(2)}</td>
                    <td>{parseFloat(record.Derivatives_Span).toFixed(2)}</td>
                    <td>{parseFloat(record.Total_Span_Levied).toFixed(2)}</td>
                    <td>{parseFloat(record.Peak_Margin).toFixed(2)}</td>

                    <td>{parseFloat(record.Funded_Market_Value).toFixed(2)}</td>
                    <td>{parseFloat(record.MTF_Ledger_Bal + record.Funded_Market_Value).toFixed(2)}</td>
                    <td>{parseFloat(record.MTF_Var_Margin).toFixed(2)}</td>
                    <td>{parseFloat(Math.min(record.MTF_Ledger_Bal + record.Funded_Market_Value, 0)).toFixed(2)}</td>
                    <td>{parseFloat(record.POA_Stocks).toFixed(2)}</td>
                    <td>{parseFloat(record.POA_Approved).toFixed(2)}</td>
                    <td>{parseFloat(record.POA_Non_Approved).toFixed(2)}</td>
                    <td>{parseFloat(record.POA_Stocks - record.MTF_Var_Margin - Math.min(record.MTF_Ledger_Bal + record.Funded_Market_Value, 0)).toFixed(2)}</td>
                    <td>{parseFloat((record.POA_Stocks - record.MTF_Var_Margin - Math.min(record.MTF_Ledger_Bal + record.Funded_Market_Value, 0)) - Math.max(record.Total_Span_Levied, record.Peak_Margin)).toFixed(2)}</td>

                    <td>{parseFloat(record.POA_B_Hcut).toFixed(2)}</td>
                    <td>{parseFloat(record.POA_B_Approved).toFixed(2)}</td>
                    <td>{parseFloat(record.MF_POA_Stock).toFixed(2)}</td>
                    <td>{parseFloat(record.Free_POA_Stocks).toFixed(2)}</td>
                    <td>{parseFloat(record.Free_POA_Approved).toFixed(2)}</td>
                    <td>{parseFloat(record.Free_POA_Non_Approved).toFixed(2)}</td>
                    <td>{parseFloat(record.Free_MF_POA_Stock).toFixed(2)}</td>
                    <td>{parseFloat(record.Free_MF_POA_BHcut).toFixed(2)}</td>
                    <td>{parseFloat(record.Free_POA_B_Hcut).toFixed(2)}</td>
                    <td>{parseFloat(record.Free_POA_B_Approved).toFixed(2)}</td>
                    <td>{parseFloat(record.Free_POA_B_Non_Approved).toFixed(2)}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          
        </>
      )}
    </div>
  );
}