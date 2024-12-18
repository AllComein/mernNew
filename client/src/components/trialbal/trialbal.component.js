


import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { Spinner } from "react-bootstrap";

export default function Trialbal() {
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
        const response = await fetch(`http://183.182.84.228:4005/trialbal/`);
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
          (record.ks_ucc && record.ks_ucc.toLowerCase().includes(term.toLowerCase())) ||
          (record.clname && record.clname.toLowerCase().includes(term.toLowerCase()))
        )
      );
    }

    if (searchTermLocation) {
      const termsLocation = searchTermLocation.split(',').map(term => term.trim());
      filtered = filtered.filter(record =>
        termsLocation.some(term =>
          (record.locn_cd && record.locn_cd.toLowerCase().includes(term.toLowerCase()))
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
      "Sno.", "Location Cd(B1)", "BrCd(A)", "Branch Name (A1)", "LocationID (B)",
      "ESL UCC (C)", "KSL UCC(D)", "Client Name(E)", "LedgerBalance (With Ini+ExpMgn+Mtf)- (F)",
      "MTF Funding Value -(F4)", "Accrued Interest -(F5)" ,"Total Un Billed-(G)", "Unclear Amt-(H)", 
      "Total Balance -(I=F+G+H-F4)", "IniMgn-(J)+ExpMgn-(K)+AddlMgn-(L)", 
      "Net Value-M=I-(J+K+L)", "Pledge Value P1&P3 (Normal Pledge)-(O)", 
      "Funded Pledge Todays Value P2(MTF)-(P)","MtM = MTF Funding Value - MTF Funded Todays Value -(Px=F4-P)", "Benificiary Holding Value-(Q)", 
      "MF,SGB,T-Bill Etc-(R)", "Delivered Amt-(S)", 
      "Total Holding Value-(V=O+P+Q+R+S)", "Net Holding Value-(W=V-M)", 
      "Net Margin based on Pledge-(X=O+P+R-F)", "Auction Debit 150% -(N)", 
      "MCX Ledger balance -(F1)", "NCDEX Ledger balance -(F2)", 
      "NSECDS Ledger balance -(F3)"
    ];
  
    const data = [
      header,
      ...filteredRecords.map((record, index) => [
        index + 1, record.locn_cd, record.brcd, record.brname, record.locn_id, 
        record.eslucc, record.ks_ucc, record.clname, 
        parseFloat(record.ledg_bal) || 0, // Ensure it's treated as float
        parseFloat(record.mtf_fndbl) || 0,
        parseFloat(record.accrd_int) || 0,  
        parseFloat(record.open_obl) || 0, 
        parseFloat(record.unclr_cq) || 0, 
        parseFloat(record.net_ledbal) || 0, 
        parseFloat(record.tot_mgn) || 0, 
        parseFloat(record.nlb_mgn) || 0, 
        parseFloat(record.nrml_coll) || 0, 
        parseFloat(record.mtf_fndstk) || 0,
        parseFloat(record.mtf_mtmdif) || 0,
        parseFloat(record.dpbo_hldg) || 0, 
        parseFloat(record.mf_sgb_tb) || 0, 
        parseFloat(record.delvd_amt) || 0, 
        parseFloat(record.tot_soh) || 0, 
        parseFloat(record.netmargin) || 0, 
        parseFloat(record.nmgnboplg) || 0, 
        parseFloat(record.auc_jv150) || 0, 
        parseFloat(record.mcxledger) || 0, 
        parseFloat(record.ncdledger) || 0, 
        parseFloat(record.ncdsledger) || 0
      ]),
    ];
  
    // // Calculate totals for specified columns
    // const totals = filteredRecords.reduce((acc, record) => {
    //   acc.ledg_bal += parseFloat(record.ledg_bal) || 0;
    //   acc.mtf_fndbl += parseFloat(record.mtf_fndbl) || 0;
    //   acc.open_obl += parseFloat(record.open_obl) || 0;
    //   acc.unclr_cq += parseFloat(record.unclr_cq) || 0;
    //   acc.net_ledbal += parseFloat(record.net_ledbal) || 0;
    //   acc.tot_mgn += parseFloat(record.tot_mgn) || 0;
    //   acc.nlb_mgn += parseFloat(record.nlb_mgn) || 0;
    //   acc.nrml_coll += parseFloat(record.nrml_coll) || 0;
    //   acc.mtf_fndstk += parseFloat(record.mtf_fndstk) || 0;
    //   acc.dpbo_hldg += parseFloat(record.dpbo_hldg) || 0;
    //   acc.mf_sgb_tb += parseFloat(record.mf_sgb_tb) || 0;
    //   acc.delvd_amt += parseFloat(record.delvd_amt) || 0;
    //   acc.tot_soh += parseFloat(record.tot_soh) || 0;
    //   acc.netmargin += parseFloat(record.netmargin) || 0;
    //   acc.nmgnboplg += parseFloat(record.nmgnboplg) || 0;
    //   acc.auc_jv150 += parseFloat(record.auc_jv150) || 0;
    //   acc.mcxledger += parseFloat(record.mcxledger) || 0;
    //   acc.ncdledger += parseFloat(record.ncdledger) || 0;
    //   acc.ncdsledger += parseFloat(record.ncdsledger) || 0;
    //   return acc;
    // }, {
    //   ledg_bal: 0, mtf_fndbl: 0, open_obl: 0, unclr_cq: 0, net_ledbal: 0,
    //   tot_mgn: 0, nlb_mgn: 0, nrml_coll: 0, mtf_fndstk: 0, dpbo_hldg: 0,
    //   mf_sgb_tb: 0, delvd_amt: 0, tot_soh: 0, netmargin: 0, nmgnboplg: 0,
    //   auc_jv150: 0, mcxledger: 0, ncdledger: 0, ncdsledger: 0
    // });
  
    // // Add totals row to the data
    // const totalsRow = [
    //   '', '', '', '', '', '', '', '', // Empty for non-total columns
    //   totals.ledg_bal, totals.mtf_fndbl, totals.open_obl, totals.unclr_cq,
    //   totals.net_ledbal, totals.tot_mgn, totals.nlb_mgn, totals.nrml_coll,
    //   totals.mtf_fndstk, totals.dpbo_hldg, totals.mf_sgb_tb, totals.delvd_amt,
    //   totals.tot_soh, totals.netmargin, totals.nmgnboplg, totals.auc_jv150,
    //   totals.mcxledger, totals.ncdledger, totals.ncdsledger
    // ];
  
    // data.push(totalsRow); // Append totals row
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `Filtered_TrialBalance_Records_${formattedDate}.xlsx`);
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
  // const totals = {
  //   ledg_bal: currentRecords.reduce((acc, record) => acc + (parseFloat(record.ledg_bal) || 0), 0),
  //   mtf_fndbl: currentRecords.reduce((acc, record) => acc + (parseFloat(record.mtf_fndbl) || 0), 0),
  //   open_obl: currentRecords.reduce((acc, record) => acc + (parseFloat(record.open_obl) || 0), 0),
  //   unclr_cq: currentRecords.reduce((acc, record) => acc + (parseFloat(record.unclr_cq) || 0), 0),
  //   net_ledbal: currentRecords.reduce((acc, record) => acc + (parseFloat(record.net_ledbal) || 0), 0),
  //   tot_mgn: currentRecords.reduce((acc, record) => acc + (parseFloat(record.tot_mgn) || 0), 0),
  //   nlb_mgn: currentRecords.reduce((acc, record) => acc + (parseFloat(record.nlb_mgn) || 0), 0),
  //   nrml_coll: currentRecords.reduce((acc, record) => acc + (parseFloat(record.nrml_coll) || 0), 0),
  //   mtf_fndstk: currentRecords.reduce((acc, record) => acc + (parseFloat(record.mtf_fndstk) || 0), 0),
  //   dpbo_hldg: currentRecords.reduce((acc, record) => acc + (parseFloat(record.dpbo_hldg) || 0), 0),
  //   mf_sgb_tb: currentRecords.reduce((acc, record) => acc + (parseFloat(record.mf_sgb_tb) || 0), 0),
  //   delvd_amt: currentRecords.reduce((acc, record) => acc + (parseFloat(record.delvd_amt) || 0), 0),
  //   tot_soh: currentRecords.reduce((acc, record) => acc + (parseFloat(record.tot_soh) || 0), 0),
  //   netmargin: currentRecords.reduce((acc, record) => acc + (parseFloat(record.netmargin) || 0), 0),
  //   nmgnboplg: currentRecords.reduce((acc, record) => acc + (parseFloat(record.nmgnboplg) || 0), 0),
  //   auc_jv150: currentRecords.reduce((acc, record) => acc + (parseFloat(record.auc_jv150) || 0), 0),
  //   mcxledger: currentRecords.reduce((acc, record) => acc + (parseFloat(record.mcxledger) || 0), 0),
  //   ncdledger: currentRecords.reduce((acc, record) => acc + (parseFloat(record.ncdledger) || 0), 0),
  //   ncdsledger: currentRecords.reduce((acc, record) => acc + (parseFloat(record.ncdsledger) || 0), 0),
  // };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Trial Balance</h1>
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
                  <th style={thStyle}></th>
                  <th style={thStyle}>_Location Cd(B1)</th>
                  <th style={thStyle}>_BrCd(A)</th>
                  <th style={thStyle}>Branch Name (A1)</th>
                  <th style={thStyle}>LocationID (B)</th>
                  <th style={thStyle}>ESL UCC (C)</th>
                  <th style={thStyle}>KSL UCC(D)</th>
                  <th style={thStyle}>Client Name(E)</th>
                  <th style={thStyle}>LedgerBalance (With Ini+ExpMgn+Mtf)- (F)</th>
                  <th style={thStyle}>MTF Funding Value -(F4)</th>
                  <th style={thStyle}>Accrued Interest -(F5)</th>
                  <th style={thStyle}>Total Un Billed-(G)</th>
                  <th style={thStyle}> Unclear Amt-(H)</th>
                  <th style={thStyle}>Total Balance -(I=F+G+H-F4)</th>
                  <th style={thStyle}>IniMgn-(J)+ExpMgn-(K)+AddlMgn-(L)</th>
                  <th style={thStyle}>Net Value-M=I-(J+K+L)</th>
                  <th style={thStyle}>Pledge Value P1&P3 (Normal Pledge)-(O)</th>
                  <th style={thStyle}>Funded Pledge Todays Value P2(MTF)-(P)</th>
                  <th style={thStyle}>MtM = MTF Funding Value - MTF Funded Todays Value -(Px=F4-P)</th>
                  <th style={thStyle}>Benificiary Holding Value-(Q)</th>
                  <th style={thStyle}>MF,SGB,T-Bill Etc-(R)</th>
                  <th style={thStyle}>Delivered Amt-(S)</th>
                  <th style={thStyle}>Total Holding Value-(V=O+P+Q+R+S)</th>
                  <th style={thStyle}>Net Holding Value-(W=V-M)</th>
                  <th style={thStyle}>Net Margin based on Pledge-(X=O+P+R-F)</th>
                  <th style={thStyle}>Auction Debit 150% -(N)</th>
                  <th style={thStyle}>MCX Ledger balance -(F1)</th>
                  <th style={thStyle}>NCDEX Ledger balance -(F2)</th>
                  <th style={thStyle}>NSECDS Ledger balance -(F3)</th>

                </tr>
                {/* Total Row */}
                {/* <tr>
                  <td style={thStyle}>Total</td>
                  <td style={thStyle}></td>
                  <td style={thStyle}></td>
                  <td style={thStyle}></td>
                  <td style={thStyle}></td>
                  <td style={thStyle}></td>
                  <td style={thStyle}></td>
                  <td style={thStyle}></td>
                  <td style={thStyle}>{totals.ledg_bal}</td>
                  <td style={thStyle}>{totals.mtf_fndbl}</td>
                  <td style={thStyle}>{totals.open_obl}</td>
                  <td style={thStyle}>{totals.unclr_cq}</td>
                  <td style={thStyle}>{totals.net_ledbal}</td>
                  <td style={thStyle}>{totals.tot_mgn}</td>
                  <td style={thStyle}>{totals.nlb_mgn}</td>
                  <td style={thStyle}>{totals.nrml_coll}</td>
                  <td style={thStyle}>{totals.mtf_fndstk}</td>
                  <td style={thStyle}>{totals.dpbo_hldg}</td>
                  <td style={thStyle}>{totals.mf_sgb_tb}</td>
                  <td style={thStyle}>{totals.delvd_amt}</td>
                  <td style={thStyle}>{totals.tot_soh}</td>
                  <td style={thStyle}>{totals.netmargin}</td>
                  <td style={thStyle}>{totals.nmgnboplg}</td>
                  <td style={thStyle}>{totals.auc_jv150}</td>
                  <td style={thStyle}>{totals.mcxledger}</td>
                  <td style={thStyle}>{totals.ncdledger}</td>
                  <td style={thStyle}>{totals.ncdsledger}</td>
                </tr> */}
              </thead>
              <tbody>
                {currentRecords.map((record, index) => (
                  <tr key={index}>
                    <td>Detail</td>
                    <td>{record.locn_cd}</td>
                    <td>{record.brcd}</td>
                    <td>{record.brname}</td>
                    <td>{record.locn_id}</td>
                    <td>{record.eslucc}</td>
                    <td>{record.ks_ucc}</td>
                    <td>{record.clname}</td>
                    <td>{record.ledg_bal}</td>
                    <td>{record.mtf_fndbl}</td>
                    <td>{record.accrd_int}</td>
                    <td>{record.open_obl}</td>
                    <td>{record.unclr_cq}</td>
                    <td>{record.net_ledbal}</td>
                    <td>{record.tot_mgn}</td>
                    <td>{record.nlb_mgn}</td>
                    <td>{record.nrml_coll}</td>
                    <td>{record.mtf_fndstk}</td>
                    <td>{record.mtf_mtmdif}</td>
                    <td>{record.dpbo_hldg}</td>
                    <td>{record.mf_sgb_tb}</td>
                    <td>{record.delvd_amt}</td>
                    <td>{record.tot_soh}</td>
                    <td>{record.netmargin}</td>
                    <td>{record.nmgnboplg}</td>
                    <td>{record.auc_jv150}</td>
                    <td>{record.mcxledger}</td>
                    <td>{record.ncdledger}</td>
                    <td>{record.ncdsledger}</td>
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