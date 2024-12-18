import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { Spinner } from "react-bootstrap";
import authService from "../../services/auth.service";

export default function LedgerDetails() {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTermUCC, setSearchTermUCC] = useState('');
  const [searchTermLocation, setSearchTermLocation] = useState('');
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
        const response = await fetch(`http://183.182.84.228:4005/ledgertur/`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          setLoading(false);
          return;
        }
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
          (record.cli_cod && record.cli_cod.toLowerCase().includes(term.toLowerCase())) ||
          (record.clname && record.clname.toLowerCase().includes(term.toLowerCase()))
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

    // Sort records by day and month from lgr_date
    filtered.sort((a, b) => {
      const [dayA, monthA] = a.lgr_date.split('-').reverse();
      const [dayB, monthB] = b.lgr_date.split('-').reverse();
      return monthA - monthB || dayA - dayB;
    });

    setFilteredRecords(filtered);
    setDataFound(filtered.length > 0);
    setCurrentPage(1);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  function handleDownload() {
    const sheetName = 'Ledger Details';
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    const header = [
      "Sno.", "KS Location", "LocationID","ESL UCC (C)", "KSL UCC(D)", "Client Name(E)","exchcode","lgr_date",	"vouch_no",	"narr",	"trn_type",	"cheq_no",	"dr_amt",	"cr_amt",	"cum_bal",	"intamt",	"docno",
    ];
  
    const data = [
      header,
      ...filteredRecords.map((record, index) => [
        index + 1,
        record.ks_locnid ,record.locnid ,record.eslucc ,record.cli_cod ,record.clname,
        record.exchcode,	formatDate(record.lgr_date),	record.vouch_no,	record.narr,	record.trn_type,	record.cheq_no,	record.dr_amt,	record.cr_amt,	record.cum_bal,	record.intamt,	record.docno
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `Ledger_Details_${formattedDate}.xlsx`);
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

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Ledger Details</h1>
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
        <button onClick={handleFilter} style={buttonStyle}>Filter</button>
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
        <div style={tableWrapperStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Exch code</th>
                <th style={thStyle}>Esl UCC</th>
                <th style={thStyle}>UCC code</th>
                <th style={thStyle}>Ledger Date</th>
                <th style={thStyle}>Vouch No.</th>
                <th style={thStyle}>narr</th>
                <th style={thStyle}>trn type</th>
                <th style={thStyle}>Cheq No.</th>
                <th style={thStyle}>Dr amt</th>
                <th style={thStyle}>Cr amt</th>
                <th style={thStyle}>cum bal</th>
                <th style={thStyle}>initial Amount</th>
                <th style={thStyle}>docno</th>
                <th style={thStyle}>Locnid</th>
                <th style={thStyle}>Kotak location</th>
                <th style={thStyle}>Client Name</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.exchcode}</td>
                  <td>{record.eslucc}</td>
                  <td>{record.cli_cod}</td>
                  <td>{formatDate(record.lgr_date)}</td>
                    <td>{record.vouch_no}</td>
                    <td>{record.narr}</td>
                    <td>{record.trn_type}</td>
                    <td>{record.cheq_no}</td>
                    <td>{record.dr_amt}</td>
                    <td>{record.cr_amt}</td>
                    <td>{record.cum_bal}</td>
                    <td>{record.intamt}</td>
                    <td>{record.docno}</td>
                    <td>{record.locnid}</td>
                    <td>{record.ks_locnid}</td>
                    <td>{record.clname}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      )}
    </div>
  );
}