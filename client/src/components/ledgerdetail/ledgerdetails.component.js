

import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { Spinner } from "react-bootstrap";
import authService from "../../services/auth.service";

export default function LedgerDetail() {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTermUCC, setSearchTermUCC] = useState('');
  const [searchTermLocation, setSearchTermLocation] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [dataFound, setDataFound] = useState(true);

const [searchTermVouchNo, setSearchTermVouchNo] = useState('');

const [searchTermExchCode, setSearchTermExchCode] = useState('');
const [searchTermTrnType, setSearchTermTrnType] = useState('');
const [uniqueExchCodes, setUniqueExchCodes] = useState([]);
const [uniqueTrnTypes, setUniqueTrnTypes] = useState([]);
const [showExchDropdown, setShowExchDropdown] = useState(false);
const [showTrnDropdown, setShowTrnDropdown] = useState(false);

const [uniqueUcc, setUniqueUcc] = useState([]);
const [uniqueLocation, setUniqueLocation] = useState([]);



  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  // const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

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

                const currentUser = authService.getCurrentUser();
        const allUsersResponse = await authService.getAllUsers();
        const currentUserDetails = allUsersResponse.find(user => user.username === currentUser.username);
  

          const viewableUsers = currentUserDetails.viewableUsers.split(',');

          // Filter letter data based on viewableUsers (locnid should match one of the viewable usernames)
          const filteredLetterData = records.filter(record =>
            viewableUsers.includes(record.locnid))
        
        const filterdata = filteredLetterData.filter(record => record.trn_type.trim() !== 'OPBAL')
        const exchCodes = [...new Set(filteredLetterData.map(record => record.exchcode))];
        const trnTypes = [...new Set(filteredLetterData.map(record => record.trn_type))];

        const cli_cod = [...new Set(filteredLetterData.map(record => record.cli_cod))];
        const location = [...new Set(filteredLetterData.map(record => record.locnid))];
        
        setRecords(filterdata);
        setFilteredRecords(addOpeningBalances(filterdata));
         
  
        setUniqueExchCodes(exchCodes);
        setUniqueTrnTypes(trnTypes);
        setUniqueUcc(cli_cod);
        setUniqueLocation(location);

      } catch (error) {
        const message = `An error occurred: ${error.message}`;
        window.alert(message);
      } finally {
        setLoading(false);
      }
    
       
      
    }
    getRecords();
  }, []);




//   useEffect(() => {
//     async function getRecords() {
//       setLoading(true);
//       try {
//         const response = await fetch(`http://183.182.84.228:4005/ledgertur/`);
//         if (!response.ok) {
//           const message = `An error occurred: ${response.statusText}`;
//           window.alert(message);
//           setLoading(false);
//           return;
//         }
//         const records = await response.json();
//         // const currentusername = authService.getCurrentUser()
//         // const filterRecords = records.filter(record => record.locn_cd === currentusername.username)

//         const currentUser = authService.getCurrentUser();
//         const allUsersResponse = await authService.getAllUsers();
//         const currentUserDetails = allUsersResponse.find(user => user.username === currentUser.username);
  

//           const viewableUsers = currentUserDetails.viewableUsers.split(',');

//           // Filter letter data based on viewableUsers (locnid should match one of the viewable usernames)
//           const filteredLetterData = records.filter(record =>
//             viewableUsers.includes(record.locnid))

//         setRecords(filteredLetterData);
//         setFilteredRecords(filteredLetterData);
//       } catch (error) {
//         const message = `An error occurred: ${error.message}`;
//         window.alert(message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     getRecords();
//   }, []);






  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }



  function addOpeningBalances(records, fromDate, toDate) {
    const groupedRecords = records.reduce((acc, record) => {
      (acc[record.cli_cod] = acc[record.cli_cod] || []).push(record);
      return acc;
    }, {});
  
    const result = [];
    for (const cli_cod in groupedRecords) {
      const firstRecord = groupedRecords[cli_cod].reduce((earliest, rec) => {
        return !earliest || new Date(rec.lgr_date) < new Date(earliest.lgr_date) ? rec : earliest;
      }, null);
  
      // Check if date filters are applied
      const cumlativeValue = (fromDate && toDate)
        ? (firstRecord ? (firstRecord.cumlative - (firstRecord.dr_amt - firstRecord.cr_amt)) : 0)
        : 0;  // Set to 0 if no date filter is selected
  
      result.push({
        cli_cod,
        cumlative: cumlativeValue,
        lgr_date: firstRecord ? firstRecord.lgr_date : 0,
        exchcode: null,
        eslucc: null,
        vouch_no: null,
        narr: "Opening Balance",
        trn_type: null,
        cheq_no: null,
        dr_amt: null,
        cr_amt: null,
        cum_bal: null,
        intamt: null,
        docno: null,
        locnid: null,
        ks_locnid: null,
        clname: null
      });
  
      result.push(...groupedRecords[cli_cod]);
    }
  
    return result;
  }
  


 // Track if any filter has been interacted with
const [isFilterInteracted, setIsFilterInteracted] = useState(false);

// function handleFilter() {
//   let filtered = [...records];
//   let isFilterApplied = false;

//   // Check if any filter has been interacted with
//   if (searchTermUCC || searchTermLocation || searchTermVouchNo || searchTermExchCode || searchTermTrnType || (fromDate && toDate)) {
//     setIsFilterInteracted(true);
//   }

//   // If no filters have been applied and there's no interaction, return no records
//   if (!isFilterInteracted) {
//     setFilteredRecords([]);  // Empty array to show no records
//     setDataFound(false);      // Indicate no data was found
//     setCurrentPage(1);        // Reset to page 1
//     return;                   // Exit early
//   }

//   // Handle UCC filter
//   if (searchTermUCC) {
//     const termsUCC = searchTermUCC.split(',').map(term => term.trim());
//     filtered = filtered.filter(record =>
//       termsUCC.some(term =>
//         (record.cli_cod && record.cli_cod.toLowerCase().includes(term.toLowerCase())) ||
//         (record.clname && record.clname.toLowerCase().includes(term.toLowerCase()))
//       )
//     );
//     isFilterApplied = true;
//   }

//   // Handle Location filter
//   if (searchTermLocation) {
//     const termsLocation = searchTermLocation.split(',').map(term => term.trim());
//     filtered = filtered.filter(record =>
//       termsLocation.some(term =>
//         (record.locnid && record.locnid.toLowerCase().includes(term.toLowerCase()))
//       )
//     );
//     isFilterApplied = true;
//   }

//   // Handle Voucher Number filter
//   if (searchTermVouchNo) {
//     filtered = filtered.filter(record =>
//       record.narr && record.narr.toLowerCase().includes(searchTermVouchNo.toLowerCase())
//     );
//     isFilterApplied = true;
//   }

//   // Handle Exchange Code filter
//   if (searchTermExchCode) {
//     filtered = filtered.filter(record =>
//       record.exchcode.toLowerCase().includes(searchTermExchCode.toLowerCase())
//     );
//     isFilterApplied = true;
//   }

//   // Handle Transaction Type filter
//   if (searchTermTrnType) {
//     filtered = filtered.filter(record =>
//       record.trn_type.toLowerCase().includes(searchTermTrnType.toLowerCase())
//     );
//     isFilterApplied = true;
//   }

//   // Handle Date Range filter
//   if (fromDate && toDate) {
//     filtered = filtered.filter(record => {
//       const recordDate = new Date(record.lgr_date);
//       return recordDate >= new Date(fromDate) && recordDate <= new Date(toDate);
//     });
//     isFilterApplied = true;
//   }

//   // If no filters are applied after all the checks, return no records
//   if (!isFilterApplied) {
//     setFilteredRecords([]);  // Empty array to show no records
//     setDataFound(false);      // Indicate no data was found
//     setCurrentPage(1);        // Reset to page 1
//     return;                   // Exit early
//   }

//   // Sort filtered records
//   filtered.sort((a, b) => {
//     if (a.cli_cod > b.cli_cod) return -1;
//     if (a.cli_cod < b.cli_cod) return 1;

//     if (a.lgr_date < b.lgr_date) return -1;
//     if (a.lgr_date > b.lgr_date) return 1;

//     if (a.vouch_no < b.vouch_no) return -1;
//     if (a.vouch_no > b.vouch_no) return 1;

//     return a.exchcode.localeCompare(b.exchcode);
//   });

//   // Add opening balances and update filtered records
//   setFilteredRecords(addOpeningBalances(filtered, fromDate, toDate));
//   setDataFound(filtered.length > 0);  // Show data found status
//   setCurrentPage(1);                  // Reset to page 1
// }


const [filterTriggered, setFilterTriggered] = useState(false);

function handleFilter() {
  setFilterTriggered(prev => !prev); // Toggle state to trigger filtering
}



useEffect(() => {
  let filtered = [...records];
  let isFilterApplied = false;

  if (searchTermUCC || searchTermLocation || searchTermVouchNo || searchTermExchCode || searchTermTrnType || (fromDate && toDate)) {
    setIsFilterInteracted(true);
  }

  // if (!isFilterInteracted) {
  //   setFilteredRecords([]);
  //   setDataFound(false);
  //   setCurrentPage(1);
  //   return;
  // }

  if (searchTermUCC) {
    const termsUCC = searchTermUCC.split(',').map(term => term.trim());
    filtered = filtered.filter(record =>
      termsUCC.some(term =>
        (record.cli_cod && record.cli_cod.toLowerCase().includes(term.toLowerCase())) ||
        (record.clname && record.clname.toLowerCase().includes(term.toLowerCase()))
      )
    );
    isFilterApplied = true;
  }

  if (searchTermLocation) {
    const termsLocation = searchTermLocation.split(',').map(term => term.trim());
    filtered = filtered.filter(record =>
      termsLocation.some(term =>
        (record.locnid && record.locnid.toLowerCase().includes(term.toLowerCase()))
      )
    );
    isFilterApplied = true;
  }

  if (searchTermVouchNo) {
    filtered = filtered.filter(record =>
      record.narr && record.narr.toLowerCase().includes(searchTermVouchNo.toLowerCase())
    );
    isFilterApplied = true;
  }

  if (searchTermExchCode) {
    filtered = filtered.filter(record =>
      record.exchcode.toLowerCase().includes(searchTermExchCode.toLowerCase())
    );
    isFilterApplied = true;
  }

  if (searchTermTrnType) {
    filtered = filtered.filter(record =>
      record.trn_type.toLowerCase().includes(searchTermTrnType.toLowerCase())
    );
    isFilterApplied = true;
  }

  if (fromDate && toDate) {
    filtered = filtered.filter(record => {
      const recordDate = new Date(record.lgr_date);
      return recordDate >= new Date(fromDate) && recordDate <= new Date(toDate);
    });
    isFilterApplied = true;
  }

  // if (!isFilterApplied) {
  //   setFilteredRecords([]);
  //   setDataFound(false);
  //   setCurrentPage(1);
  //   return;
  // }

  filtered.sort((a, b) => {
    if (a.cli_cod > b.cli_cod) return -1;
    if (a.cli_cod < b.cli_cod) return 1;
    if (a.lgr_date < b.lgr_date) return -1;
    if (a.lgr_date > b.lgr_date) return 1;
    if (a.vouch_no < b.vouch_no) return -1;
    if (a.vouch_no > b.vouch_no) return 1;
    return a.exchcode.localeCompare(b.exchcode);
  });

  setFilteredRecords(addOpeningBalances(filtered, fromDate, toDate));
  setDataFound(filtered.length > 0);
  setCurrentPage(1);
}, [filterTriggered]); // Run filtering whenever filterTriggered changes



  

  function handleDownload() {
    const sheetName = 'Ledger Details';
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();

    const header = [
      "Sno.", "KS Location", "LocationID", "ESL UCC (C)", "KSL UCC(D)", "Client Name(E)",
      "exchcode", "lgr_date", "vouch_no", "narr", "trn_type", "cheq_no",
      "dr_amt", "cr_amt", "cumlative", "cum_bal", "intamt", "docno",
    ];

    const sortedRecords = [...filteredRecords];

    const data = [
      header,
      ...sortedRecords.map((record, index) => [
        index + 1,
        record.ks_locnid, record.locnid, record.eslucc, record.cli_cod, record.clname,
        record.exchcode, record.lgr_date ? formatDate(record.lgr_date) : '', record.vouch_no, record.narr,
        record.trn_type, record.cheq_no, record.dr_amt, record.cr_amt, record.cumlative,
        record.cum_bal, record.intamt, record.docno
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


  function groupByCliCod(records) {
    const grouped = {};
    const summary = [];
  
    records.forEach(record => {
      if (!grouped[record.cli_cod]) {
        grouped[record.cli_cod] = [];
      }
      grouped[record.cli_cod].push(record);
  
      if (grouped[record.cli_cod].length === 2) {
        // Store only the second record for summary
        summary.push({ 
          cli_code: record.cli_cod, 
          eslucc: record.eslucc, 
          locnid: record.locnid, 
          ks_locnid: record.ks_locnid, 
          clname: record.clname 
        });
      }
    });
  
    return {
      groupedRecords: Object.entries(grouped).map(([cli_cod, records]) => ({
        cli_cod,
        records,
      })),
      summaryTable: summary
    };
  }
  
  

  const { groupedRecords, summaryTable } = groupByCliCod(filteredRecords);
  const totalPages = groupedRecords.length; 
  const currentPageData = groupedRecords[currentPage - 1] || {}; 
  const currentCliCode = currentPageData.cli_cod || null;
  const currentRecords = currentPageData.records || [];
  
  // Find summary row for current cli_code
  const currentSummary = summaryTable.find(row => row.cli_code === currentCliCode) || {};




// const calculateSumsByCliCod = (data) => {
//   const sumsByCliCod = data.reduce((acc, record) => {
//     const cliCod = record.cli_cod;

//     if (!acc[cliCod]) {
//       acc[cliCod] = { totalDrCum: 0, totalCrCum: 0 };
//     }

//     acc[cliCod].totalDrCum += parseFloat(record.dr_amt) || 0;
//     acc[cliCod].totalCrCum += parseFloat(record.cr_amt) || 0;

//     return acc;
//   }, {});

//   return sumsByCliCod;
// };





const calculateSumsByCliCod = (data) => {
  const sumsByCliCod = data.reduce((acc, record) => {
    const cliCod = record.cli_cod;

    if (!acc[cliCod]) {
      acc[cliCod] = { totalDrCum: 0, totalCrCum: 0 };
    }

    // Add the opening balance only once (if it's the "Opening Balance" entry)
    if (record.narr === "Opening Balance" && record.cumlative) {
      acc[cliCod].totalDrCum += parseFloat(record.cumlative) || 0;
    }

    // Sum debit and credit amounts
    acc[cliCod].totalDrCum += parseFloat(record.dr_amt) || 0;
    acc[cliCod].totalCrCum += parseFloat(record.cr_amt) || 0;

    return acc;
  }, {});

  return sumsByCliCod;
};

const sumsByCliCod = calculateSumsByCliCod(currentRecords);

  


// Clear Filter Function
function clearFilter() {
  setSearchTermUCC('');
  setSearchTermLocation('');
  setSearchTermVouchNo('');
  setSearchTermExchCode('');
  setSearchTermTrnType('');
  setFromDate('');
  setToDate('');
  setIsFilterInteracted(false);  // Reset interaction state
  setFilteredRecords([]);        // Clear filtered records
  setDataFound(false);           // Reset data found state
  setCurrentPage(1);             // Reset pagination
}



  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Ledger Details</h1>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />

        <input
    type="text"
    placeholder="Search by Location"
    value={searchTermLocation}
    onChange={(e) => setSearchTermLocation(e.target.value)}
    list="location-list"
    style={{ marginRight: '10px' }}
  />
  <datalist id="location-list">
    {uniqueLocation.map((locnid, index) => (
      <option key={index} value={locnid}>
        {locnid}
      </option>
    ))}
  </datalist>

  <input
    type="text"
    placeholder="Search by Ucc"
    value={searchTermUCC}
    onChange={(e) => setSearchTermUCC(e.target.value)}
    list="ucc-list"
    style={{ marginRight: '10px' }}
  />
  <datalist id="ucc-list">
    {uniqueUcc.map((cli_cod, index) => (
      <option key={index} value={cli_cod}>
        {cli_cod}
      </option>
    ))}
  </datalist>


        <input type="text" placeholder="Search by narr" value={searchTermVouchNo} onChange={(e) => setSearchTermVouchNo(e.target.value)} />

  <input
    type="text"
    placeholder="Search by Exch Code"
    value={searchTermExchCode}
    onChange={(e) => setSearchTermExchCode(e.target.value)}
    list="exchcode-list"
    style={{ marginRight: '10px' }}
  />
  <datalist id="exchcode-list">
    {uniqueExchCodes.map((exchcode, index) => (
      <option key={index} value={exchcode}>
        {exchcode}
      </option>
    ))}
  </datalist>

  <input
    type="text"
    placeholder="Search by Trn Type"
    value={searchTermTrnType}
    onChange={(e) => setSearchTermTrnType(e.target.value)}
    list="tran_type-list"
    style={{ marginRight: '10px' }}
  />
  <datalist id="tran_type-list">
    {uniqueTrnTypes.map((trn_type, index) => (
      <option key={index} value={trn_type}>
        {trn_type}
      </option>
    ))}
  </datalist>

        <button onClick={handleFilter}>Filter</button>
        <button onClick={clearFilter}>Clear Filter</button>
        <button onClick={handleDownload}>Download Excel</button>
        
      </div>
<button
  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
  disabled={currentPage === 1}
>
  Previous
</button>

<span> Page {currentPage} of {totalPages} (Cli Code: {groupedRecords[currentPage - 1]?.cli_cod || 'N/A'}) </span>

<button
  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
  disabled={currentPage === totalPages}
>
  Next
</button>



      <div style={{ textAlign: 'center' }}>
      {loading && <Spinner animation="border" />}
      {!loading && <h3>Filter To Show Records</h3>}
</div>

      {!loading && dataFound && isFilterInteracted && (
        <>
        {currentCliCode && (
      <table border="1" style={{ width: "100%", marginBottom: "10px" }}>
        <thead>
          <tr>
            <th>Cli Code</th>
            <th>ESLUCC</th>
            <th>Locnid</th>
            <th>KS Locnid</th>
            <th>Client Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{currentSummary.cli_code}</td>
            <td>{currentSummary.eslucc}</td>
            <td>{currentSummary.locnid}</td>
            <td>{currentSummary.ks_locnid}</td>
            <td>{currentSummary.clname}</td>
          </tr>
        </tbody>
      </table>
    )}
        <div style={{ maxHeight: '500px', overflowY: 'auto', border: '1px solid #ddd' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
  <thead>
    <tr>
      <th style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>Exch code</th>
      <th style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>Ledger Date</th>
      <th style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>Vouch No.</th>
      <th style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>narr</th>
      <th style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>trn type</th>
      <th style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>Cheq No.</th>
      <th style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>Dr amt</th>
      <th style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>Cr amt</th>
      <th style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>Running Balance</th>
      <th style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>docno</th>
    </tr>
  </thead>
  <tbody>
    {currentRecords.map((record, index) => (
      <tr key={index} style={record.clname === "Opening Balance" ? { fontWeight: 'bold', backgroundColor: '#f0f0f0' } : {}}>
        <td>{record.exchcode}</td>
        <td>{record.lgr_date ? formatDate(record.lgr_date) : ''}</td>
        <td>{record.vouch_no}</td>
        <td>{record.narr}</td>
        <td>{record.trn_type}</td>
        <td>{record.cheq_no}</td>
        <td>{record.dr_amt}</td>
        <td>{record.cr_amt}</td>
        <td>{record.cumlative}</td>
        <td>{record.docno}</td>
      </tr>
    ))}
  </tbody>
</table>



        </div>

        <table border="1" style={{ width: "100%", marginTop: "10px" }}>
  <thead>
    <tr>
      <th>Cli_Cod</th>
      <th>Total Dr Cum</th>
      <th>Total Cr Cum</th>
      <th>Final Running Balance</th>
    </tr>
  </thead>
  <tbody>
    {Object.entries(sumsByCliCod).map(([cliCod, { totalDrCum, totalCrCum }]) => (
      <tr key={cliCod}>
        <td>{cliCod}</td>
        <td>{totalDrCum.toFixed(2)}</td>
        <td>{totalCrCum.toFixed(2)}</td>
        <td>{(totalDrCum-totalCrCum).toFixed(2)}</td>
      </tr>
    ))}
  </tbody>
</table>


</>
      )}
    </div>
  );
}




// import React, { useEffect, useState } from "react";
// import * as XLSX from 'xlsx';
// import { Spinner } from "react-bootstrap";
// import authService from "../../services/auth.service";

// export default function LedgerDetails() {
//   const [loading, setLoading] = useState(false);
//   const [records, setRecords] = useState([]);
//   const [filteredRecords, setFilteredRecords] = useState([]);
//   const [searchTermUCC, setSearchTermUCC] = useState('');
//   const [searchTermLocation, setSearchTermLocation] = useState('');
//   const [dataFound, setDataFound] = useState(true);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [recordsPerPage, setRecordsPerPage] = useState(10);

//   // Calculate total pages
//   const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

//   useEffect(() => {
//     async function getRecords() {
//       setLoading(true);
//       try {
//         const response = await fetch(`http://183.182.84.228:4005/ledgertur/`);
//         if (!response.ok) {
//           const message = `An error occurred: ${response.statusText}`;
//           window.alert(message);
//           setLoading(false);
//           return;
//         }
//         const records = await response.json();
//         // const currentusername = authService.getCurrentUser()
//         // const filterRecords = records.filter(record => record.locn_cd === currentusername.username)

//         const currentUser = authService.getCurrentUser();
//         const allUsersResponse = await authService.getAllUsers();
//         const currentUserDetails = allUsersResponse.find(user => user.username === currentUser.username);
  

//           const viewableUsers = currentUserDetails.viewableUsers.split(',');

//           // Filter letter data based on viewableUsers (locnid should match one of the viewable usernames)
//           const filteredLetterData = records.filter(record =>
//             viewableUsers.includes(record.locnid))

//         setRecords(filteredLetterData);
//         setFilteredRecords(filteredLetterData);
//       } catch (error) {
//         const message = `An error occurred: ${error.message}`;
//         window.alert(message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     getRecords();
//   }, []);

//   function handleFilter() {
//     let filtered = [...records];

//     if (searchTermUCC) {
//       const termsUCC = searchTermUCC.split(',').map(term => term.trim());
//       filtered = filtered.filter(record =>
//         termsUCC.some(term =>
//           (record.cli_cod && record.cli_cod.toLowerCase().includes(term.toLowerCase())) ||
//           (record.clname && record.clname.toLowerCase().includes(term.toLowerCase()))
//         )
//       );
//     }

//     if (searchTermLocation) {
//       const termsLocation = searchTermLocation.split(',').map(term => term.trim());
//       filtered = filtered.filter(record =>
//         termsLocation.some(term =>
//           (record.locnid && record.locnid.toLowerCase().includes(term.toLowerCase()))
//         )
//       );
//     }

//     // Sort records by day and month from lgr_date
//     filtered.sort((a, b) => {
//       const [dayA, monthA] = a.lgr_date.split('-').reverse();
//       const [dayB, monthB] = b.lgr_date.split('-').reverse();
//       return monthA - monthB || dayA - dayB;
//     });

//     setFilteredRecords(filtered);
//     setDataFound(filtered.length > 0);
//     setCurrentPage(1);
//   }

//   function formatDate(dateString) {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   }

//   function handleDownload() {
//     const sheetName = 'Ledger Details';
//     const currentDate = new Date();
//     const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
//     const wb = XLSX.utils.book_new();
  
//     const header = [
//       "Sno.", "KS Location", "LocationID","ESL UCC (C)", "KSL UCC(D)", "Client Name(E)","exchcode","lgr_date",	"vouch_no",	"narr",	"trn_type",	"cheq_no",	"dr_amt",	"cr_amt",	"cum_bal",	"intamt",	"docno",
//     ];
  
//     const data = [
//       header,
//       ...filteredRecords.map((record, index) => [
//         index + 1,
//         record.ks_locnid ,record.locnid ,record.eslucc ,record.cli_cod ,record.clname,
//         record.exchcode,	formatDate(record.lgr_date),	record.vouch_no,	record.narr,	record.trn_type,	record.cheq_no,	record.dr_amt,	record.cr_amt,	record.cum_bal,	record.intamt,	record.docno
//       ]),
//     ];
//     const ws = XLSX.utils.aoa_to_sheet(data);
//     XLSX.utils.book_append_sheet(wb, ws, sheetName);
//     XLSX.writeFile(wb, `Ledger_Details_${formattedDate}.xlsx`);
//   }

//   function handleRecordsPerPageChange(event) {
//     setRecordsPerPage(Number(event.target.value));
//     setCurrentPage(1);
//   }

//   function handlePageChange(direction) {
//     if (direction === 'next' && currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     } else if (direction === 'prev' && currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   }

//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);



//   const tableWrapperStyle = {
//     maxHeight: '500px',
//     overflowY: 'auto',
//     border: '1px solid #ddd',
//     marginBottom: '20px', // Add margin for spacing
//     position: 'relative',
//   };

//   const thStyle = {
//     position: 'sticky',
//     top: 0,
//     backgroundColor: '#fff',
//     zIndex: 10,
//     borderBottom: '2px solid #ddd',
//   };

//   const tableStyle = {
//     width: '100%',
//     borderCollapse: 'collapse',
//   };

//   const buttonStyle = {
//     padding: '10px 15px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     marginBottom: '10px',
//   };

//   return (
//     <div>
//       <h1 style={{ textAlign: 'center' }}>Ledger Details</h1>
//       <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//         <input 
//           type="text" 
//           placeholder="Search by UCC" 
//           value={searchTermUCC} 
//           onChange={(e) => setSearchTermUCC(e.target.value)} 
//         />
//         {/* <input 
//           type="text" 
//           placeholder="Search by Location" 
//           value={searchTermLocation} 
//           onChange={(e) => setSearchTermLocation(e.target.value)} 
//         /> */}
//         <button onClick={handleFilter} style={buttonStyle}>Filter</button>
//         <button onClick={handleDownload} style={buttonStyle}>Download Excel</button>
//       </div>

//       <div style={{ marginTop: '20px', textAlign: 'center' }}>
//         <select onChange={handleRecordsPerPageChange} value={recordsPerPage}>
//           <option value={10}>10</option>
//           <option value={25}>25</option>
//           <option value={50}>50</option>
//           <option value={100}>100</option>
//         </select>
//         <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>Previous</button>
//         <span> Page {currentPage} of {totalPages} </span>
//         <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>Next</button>
//       </div>

//       {loading && <Spinner animation="border" />}

//       {!loading && dataFound && (
//         <div style={tableWrapperStyle}>
//           <table style={tableStyle}>
//             <thead>
//               <tr>
//                 <th style={thStyle}>Exch code</th>
//                 <th style={thStyle}>Esl UCC</th>
//                 <th style={thStyle}>UCC code</th>
//                 <th style={thStyle}>Ledger Date</th>
//                 <th style={thStyle}>Vouch No.</th>
//                 <th style={thStyle}>narr</th>
//                 <th style={thStyle}>trn type</th>
//                 <th style={thStyle}>Cheq No.</th>
//                 <th style={thStyle}>Dr amt</th>
//                 <th style={thStyle}>Cr amt</th>
//                 <th style={thStyle}>cum bal</th>
//                 <th style={thStyle}>initial Amount</th>
//                 <th style={thStyle}>docno</th>
//                 <th style={thStyle}>Locnid</th>
//                 <th style={thStyle}>Kotak location</th>
//                 <th style={thStyle}>Client Name</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentRecords.map((record, index) => (
//                 <tr key={index}>
//                   <td>{record.exchcode}</td>
//                   <td>{record.eslucc}</td>
//                   <td>{record.cli_cod}</td>
//                   <td>{formatDate(record.lgr_date)}</td>
//                     <td>{record.vouch_no}</td>
//                     <td>{record.narr}</td>
//                     <td>{record.trn_type}</td>
//                     <td>{record.cheq_no}</td>
//                     <td>{record.dr_amt}</td>
//                     <td>{record.cr_amt}</td>
//                     <td>{record.cum_bal}</td>
//                     <td>{record.intamt}</td>
//                     <td>{record.docno}</td>
//                     <td>{record.locnid}</td>
//                     <td>{record.ks_locnid}</td>
//                     <td>{record.clname}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//       )}
//     </div>
//   );
// }