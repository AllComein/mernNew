
import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { Spinner } from "react-bootstrap";

export default function Thirtyday() {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTermUCC, setSearchTermUCC] = useState('');
  const [searchTermLocation, setSearchTermLocation] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [dataFound, setDataFound] = useState(true);
  const [searchTermDays, setSearchTermDays] = useState(''); // New state for days_from_today filter

  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  // Calculate total pages
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  useEffect(() => {
    async function getRecords() {
      setLoading(true);
      try {
        const response = await fetch(`http://183.182.84.228:4005/kslledger/`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          setLoading(false);
          return;
        }
        const records = await response.json();
        setRecords(records);
        setFilteredRecords(records);
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
          (record.kslucc && record.kslucc.toLowerCase().includes(term.toLowerCase())) ||
          (record.clname && record.clname.toLowerCase().includes(term.toLowerCase()))
        )
      );
    }
  
    if (searchTermLocation) {
      const termsLocation = searchTermLocation.split(',').map(term => term.trim());
      filtered = filtered.filter(record =>
        termsLocation.some(term =>
          (record.es_locnid && record.es_locnid.toLowerCase().includes(term.toLowerCase()))
        )
      );
    }
  
    // Filter by days_from_today if specified
    if (searchTermDays) {
      filtered = filtered.filter(record => record.days_from_today === parseInt(searchTermDays));
    }
  
    setFilteredRecords(filtered);
    setDataFound(filtered.length > 0);
    setCurrentPage(1);
  }
  

  function handleDownload() {
    const sheetName = 'Filtered 30 DayLedger Records';
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    // Prepare the header row
    const header = [
      "Sno.","ES Location Code",	"Branch",	"ES UCC",	"KS UCC",	"Client Name",	"Pann No,",	"KS KRA Status",	"KS PTT Status",	"KS Location ID",	"KS e-Mail ID",	"Ks Mobile No,",	"LedgerBalance",	"KS Lst Trd",	"KS CLNT Introduction Date",	"Days"
    ];
  
    const data = [
      header,
      ...filteredRecords.map((record, index) => [
        index + 1, record.es_locnid,	record.brcd,	record.ucc,	record.kslucc,	record.clname,	record.ks_panno,	record.ks_krasts,	record.ks_pttsts,	record.locationid,	record.ks_emailid,	record.ks_mobile,	parseFloat(record.ks_ledgerbal),	record.ks_lstrdt,	record.ks_introdt,	record.days_from_today
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `Filtered_30DayLedger_Records_${formattedDate}.xlsx`);
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

  // Calculate totals for specified columns

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Trial Balance</h1>
      {/* <div style={{ textAlign: 'center', marginBottom: '20px' }}>
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
        <button onClick={handleDownload} style={buttonStyle}>Download Excel</button>
      </div> */}

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
  <input
    type="number"
    placeholder="Days from Today"
    value={searchTermDays}
    onChange={(e) => setSearchTermDays(e.target.value)}  // Handle changes to days_from_today input
  />
  <button onClick={handleSubmit} style={buttonStyle}>Filter</button>
  <button onClick={handleDownload} style={buttonStyle}>Download Excel</button>
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
                  <th style={thStyle}>ES Location Code</th>
                  <th style={thStyle}>Branch</th>
                  <th style={thStyle}>ES UCC</th>
                  <th style={thStyle}>KS UCC</th>
                  <th style={thStyle}>Client Name</th>
                  <th style={thStyle}>Pann No.</th>
                  <th style={thStyle}>KS KRA Status</th>
                  <th style={thStyle}>KS PTT Status</th>
                  <th style={thStyle}>LedgerBalance</th>
                  <th style={thStyle}>KS Lst Trd</th>
                  <th style={thStyle}>KS CLNT Introduction Date</th>
                  <th style={thStyle}>Days</th>
                  <th style={thStyle}>KS Location ID</th>
                  <th style={thStyle}>KS e-Mail ID</th>
                  <th style={thStyle}>Ks Mobile No.</th>
                </tr>        
              </thead>
              <tbody>
                {currentRecords.map((record, index) => (
                  <tr key={index}>
                    <td>{record.es_locnid}</td>
                    <td>{record.brcd}</td>
                    <td>{record.ucc}</td>
                    <td>{record.kslucc}</td>
                    <td>{record.clname}</td>
                    <td>{record.ks_panno}</td>
                    <td>{record.ks_krasts}</td>
                    <td>{record.ks_pttsts}</td>
                    <td>{record.ks_ledgerbal}</td>
                    <td>{record.ks_lstrdt}</td>
                    <td>{record.ks_introdt}</td>
                    <td>{record.days_from_today}</td>
                    <td>{record.locationid}</td>
                    <td>{record.ks_emailid}</td>
                    <td>{record.ks_mobile}</td>
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
