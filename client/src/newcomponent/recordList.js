// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Record = (props) => (
//   <tr>
//     <td>{props.record.name}</td>
//     <td>{props.record.position}</td>
//     <td>{props.record.level}</td>
//     <td>
//       <Link className="btn btn-link" to={`/edit/${props.record._id}`}>
//         Edit
//       </Link>{" "}
//       |{" "}
//       <button
//         className="btn btn-link"
//         onClick={() => {
//           props.deleteRecord(props.record._id);
//         }}
//       >
//         Delete
//       </button>
//     </td>
//   </tr>
// );

// export default function RecordList() {
//   const [records, setRecords] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     // Fetch records when the component mounts
//     async function fetchRecords() {
//       try {
//         const response = await fetch("http://localhost:5050/record/");
//         if (!response.ok) {
//           throw new Error(`Failed to fetch records: ${response.statusText}`);
//         }
//         const data = await response.json();
//         setRecords(data);
//       } catch (error) {
//         console.error(error);
//         // Handle error, e.g., display an error message to the user
//       }
//     }

//     fetchRecords();
//   }, []);

//   // Delete a record
//   async function deleteRecord(id) {
//     try {
//       const response = await fetch(`http://localhost:5050/record/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to delete record: ${response.statusText}`);
//       }

//       // Update the state to remove the deleted record
//       const newRecords = records.filter((record) => record._id !== id);
//       setRecords(newRecords);
//     } catch (error) {
//       console.error(error);
//       // Handle error, e.g., display an error message to the user
//     }
//   }

//   // Filter records based on the search term
//   const filteredRecords = records.filter(
//     (record) =>
//       record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       record.position.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <h3>Record List</h3>
//       {/* Search Bar */}
//       <input
//         type="text"
//         placeholder="Search by name or position"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <table className="table table-striped" style={{ marginTop: 20 }}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Position</th>
//             <th>Level</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredRecords.map((record) => (
//             <Record
//               record={record}
//               deleteRecord={() => deleteRecord(record._id)}
//               key={record._id}
//             />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }





















// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import * as XLSX from "xlsx";
// import "./record.css";

// // Record component for rendering each row in the table
// const Record = (props) => (
//   <tr>
//     <td>
//       <input
//         type="checkbox"
//         onChange={(e) => {
//           props.toggleSelectedRecord(props.record, e.target.checked);
//         }}
//       />
//     </td>
//     <td>{props.record.clname}</td>
//     <td>{props.record.ucc}</td>
//     <td>{props.record.panno}</td>

//     <td>
//       <button
//         className="btn btn-link"
//         onClick={() => {
//           props.viewRecord(props.record);
//         }}
//       >
//         View
//       </button>
//       <button
//         className="btn btn-link"
//         onClick={() => {
//           props.printRecord(props.record);
//         }}
//       >
//         Print
//       </button>
//     </td>
//   </tr>
// );

// // RecordList component
// export default function RecordList() {
//   // State variables
//   const [records, setRecords] = useState([]);
//   const [initialFetchComplete, setInitialFetchComplete] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [viewRecordDetails, setViewRecordDetails] = useState(null);
//   const [excelData, setExcelData] = useState(null);
//   const [excelDataForView, setExcelDataForView] = useState(null);
//   const [selectedRecords, setSelectedRecords] = useState([]);

//   let history = useNavigate();

//   // Fetch records on initial mount
//   useEffect(() => {
//     async function getRecords() {
//       const response = await fetch(`http://202.54.6.34:4000/record/`);

//       if (!response.ok) {
//         const message = `An error occurred: ${response.statusText}`;
//         window.alert(message);
//         return;
//       }

//       const records = await response.json();
//       setRecords(records);
//       setInitialFetchComplete(true);
//     }

//     if (!initialFetchComplete) {
//       getRecords();
//     }

//     return;
//   }, [initialFetchComplete]);

//   // Function to delete a record
//   async function deleteRecord(id) {
//     await fetch(`http://202.54.6.34:4000/record/${id}`, {
//       method: "DELETE",
//     });

//     const newRecords = records.filter((el) => el._id !== id);
//     setRecords(newRecords);
//   }


//   function toggleSelectedRecord(record, isChecked) {
//     if (isChecked) {
//       setSelectedRecords((prev) => [...prev, record]);
//     } else {
//       setSelectedRecords((prev) => prev.filter((r) => r._id !== record._id));
//     }
//   }

  
//   // Function to print a record
//   function printRecord(records) {
//     records.forEach((record) => {
//     const printWindow = window.open("");
//     printWindow.document.write(` <html>
//           <head>
//           <title>.</title>
//           <style>
//       body {
//         text-align: center;
//         transform: scale(0.8);
//         transform-origin: top center;
//       }

//       table {
//         border-collapse: collapse;
//         width: 100%;
//         margin: 0 auto;
//         border: 2px solid black;
//       }

//       th, td {
//         border: 1px solid #dddddd;
//         text-align: center;
//         padding: 8px;
//         border: 2px solid black;
//       }

//       th {
//         background-color: #f2f2f2;
//         border: 2px solid black;
//       }

//       /* Set A4 size paper */
//       @media print {
//         body {
//           width: 210mm;
//           height: 297mm;
//         }
//       }
//     </style>

//           </head>
//           <body>         
//           <h4>Closer Information Report For Client Transfer</h4>
//     <table  class="1">
//       <thead>
//         <tr>
//           <th>  </th>
//           <th>Ucc</th>
//           <th>Name</th>
//           <th>AP NAME/SERIES</th>
//           <th>AP TERMINAL ID</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <th>INFO.</th>
//           <td>${record.ucc|| 'NR'}</td>
//           <td>${record.clname|| 'NR'}</td>
//           <td>${record.brname|| 'NR'}</td>
//           <td>${record.neoid||"Not alloted"},${record.odinid||"Not alloted"}</td>
//         </tr>
//       </tbody>
//     </table>

//     <h4>Check POINT - KOTAK -1</h4>
//     <table class="2">
    
//       <thead>
//         <tr>
//         <th></th>
//         <th>Client A/c Open In Kotak</th>
//           <th colSpan="6">Segment activation in kotak</th>
//           <th>Esl DP Mapped In Kotak</th>
//           <th>Location At Kotak</th>
//         </tr>
//         <tr>
//           <th></th>
//           <td></td>
//           <th colspan="2">Cash</th>
//           <th colspan="2">F&O</th>
//           <th colspan="2">Others(cds,mcx,ncdex)</th>
//           <th></th>
//           <th></th>
//         </tr>
//         <tr>
//           <th></th>
//           <td></td>
//           <th>ESL</th>
//           <th>KSL</th>
//           <th>ESL</th>
//           <th>KSL</th>
//           <th>ESL</th>
//           <th>KSL</th>
//           <th></th>
//           <th></th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//         <th>INFO.</th>
//         <td>${record.kslucc|| 'NR'}</td>
//         <td>${record.es_nsecm|| 'NR'}</td>
//         <td>${record.ks_nsecm|| 'NR'}</td>
//           <td>${record.es_nsefo|| 'NR'}</td>
//           <td>${record.ks_nsefo|| 'NR'}</td>
//           <td>${record.es_nsecds|| 'NR'},${record.es_mcx|| 'NR'} , ${record.es_ncdex|| 'NR'}</td>
//           <td>${record.ks_nsecds|| 'NR'},${record.ks_mcx|| 'NR'} , ${record.ks_ncdex|| 'NR'}</td>
//           <td>${record.esdp_map|| "Not MAP"}</td>
//           <td>${record.locationid|| 'NR'}</td>
//         </tr>
//         <tr>
//         <th>SIGN</th>
//         <td></td>
//         <td></td>
//         <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//         </tr>
//       </tbody>
//     </table>


//     <h4>Check Point - DP/DMAT - 2</h4>    
//     <table class="3">

//       <thead>
//         <tr>
//           <th></th>
//           <th>Cash Equivalant Holding</th>
//           <th>Pending CORP. Action</th>
//           <th>Portfolio Reconsilation</th>
//           <th>DP Holding</th>
//           <th>Pledge Value</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <th>INFO.</th>
//           <td>${record.es_ccol|| 'NR'}</td>
//           <td>${record.es_corpact === 1 ? 'True' :'False'}</td>
//           <td>${record.es_pfreco|| 'NR'}</td>
//           <td>${record.es_dphldg|| 'NR'}</td>
//           <td>${record.es_pledval|| 'NR'}</td>
//         </tr>
//         <tr>
//           <th>SIGN</th>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//         </tr>
//       </tbody>
//     </table>


//     <h4>Check Point - FROM CLIENT - 3</h4>
//     <table class="4">
   
//       <thead>
//         <tr>
//           <th></th>
//           <th>Kotak Bank A/C Add in Client Netbanking</th>
//           <th>Pending IPO Application</th>
//           <th>Pending Claim Of IEPF/Other</th>
//           <th colSpan="2">Existing Trading Platform Information</th>
       
//         </tr>
//         <tr>
//         <th></th>
//         <th></th>
//         <th></th>
//         <th></th>
//         <th>Self</th>
//         <th>Ap</th>
      
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <th>INFO.</th>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
          
//         </tr>
//         <tr>
//           <th>SIGN</th>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
          
//         </tr>
//       </tbody>
//     </table>



//     <h4>Check Point - BEFORE CLOSER - 4</h4>
//     <table class="5">
//       <thead>
//         <tr>
//           <th></th>
//           <th colSpan="3">Position</th>
//           <th colSpan="2">Account Balance ESL</th>
//           <th>Last Trade Date </th>
//           <th>F&O Margin</th>
//           <th>Confirm Correct Mapped</th>
          
//         </tr>
//         <tr>
//         <th></th>
//         <th>CASH</th>
//         <th>F&O</th>
//         <th>MTF</th>
//         <th>Dp</th>
//         <th>Trading</th>
//         <th></th>
//         <th></th>
//         <th></th>
        
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <th>INFO.</th>
//           <td></td>
//           <td>${record.es_opnpos === 1 ? 'True' :'False' || '-'}</td>
//           <td>${record.es_mtfpos === 1 ? "True" : "False" || '-'}</td>
//           <td>${record.es_dpledg|| 'NR'}</td>
//           <td>${record.es_ledbal|| 'NR'}</td>
//           <td>${record.es_lstrdt|| 'NR'}</td>
//           <td>${record.es_margin||"NIL"}</td>
//           <td></td>
          
//         </tr>
//         <tr>
//           <th>SIGN</th>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
        
//         </tr>
//         <tr colSpan="9">
//         <th colSpan="9"> Note : Checked All Information Now Proceed For Clouser &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//         <input type="text"  placeholder="SIGN"></input></th>
//         </tr>
//       </tbody>
//     </table>


//     <h4>Check Point - CLOSER PROCDURED - 5</h4>
//     <table class="6">
//       <thead>
//         <tr>
//           <th></th>
//           <th>Unpledge Shares</th>
//           <th>Suspend Client On ODIN</th>
//           <th>DP Closer Transfer</th>
//           <th>Realese Of fund From Exchange(If Credit)</th>
//           <th>Credit Balance TRF to Client</th>
//           <th>Closer A/C In Exchange</th>
          
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <th>INFO.</th>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
          
//         </tr>
//         <tr>
//           <th>SIGN</th>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
          
//         </tr>
//       </tbody>
//     </table>
    
//     </body>
//            </html>`);
//     printWindow.document.close();
//     printWindow.print();
//   });
// }
  
//   // Function to set the details for viewing a record
  
//   function viewRecord(record) {
//     setViewRecordDetails(record);
//     // Hide search bar and download buttons when viewing record
//     setSearchTerm("");
//     // document.getElementById("searchBar").classList.add("hidden");
//     // document.getElementById("downloadButton").classList.add("hidden");
//   }

//   // Function to filter records based on search term
//   function filteredRecords() {
//     if (searchTerm.trim() === "") {
//       return null;
//     } else {
//       return records
//         .filter((record) =>
//           record.ucc &&
//           typeof record.ucc === "string" &&
//           record.ucc.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//         .map((record) => (
//           <Record
//             record={record}
//             deleteRecord={() => deleteRecord(record._id)}
//             printRecord={() => printRecord(record)}
//             viewRecord={() => viewRecord(record)}
//             key={record._id}
//           />
//         ));
//     }
//   }

//   // Function to navigate to edit page
//   function editRecord(record) {
//     history(`/edit/${record.id}`);
//   }

//   // Function to generate Excel data for all records
//   const generateAndDownloadView = () => {
//     const data = [
//       ["priority",	"barcode",	"brcd",	"ucc",	"kslucc",	"clname",	"ks_dpid_a",	"ksdp_boid",	"dp_ratecd",	"catg",	"panno",	"neoid",	"odinid",	"bossid",	"locationid",	"es_locnid",	"eckyc_no",	"k_platform",	"ks_clusrid",	"ks_ralfno",	"ks_ralncm",	"ks_dpid_b",	"ks_dpboid",	"esdp_map",	"es_dpboid",	"ks_nomn",	"ks_relwapc",	"es_nomn",	"es_relwapc",	"ks_clsts",	"es_clsts",	"ac_closed",	"ks_nsecm",	"es_nsecm",	"is_mtchncm",	"ks_bsecm",	"es_bsecm",	"is_mtchbcm",	"ks_nsefo",	"es_nsefo",	"is_mtchnfo",	"ks_nsecds",	"es_nsecds",	"is_mtchcds",	"ks_mcx",	"es_mcx",	"is_mtchmcx",	"ks_ncdex",	"es_ncdex",	"is_mtchncd",	"ks_emailid",	"es_email",	"is_mtch_em",	"ks_emrel",	"es_emrel",	"ks_mobile",	"es_mobile",	"is_mtch_mo",	"ks_mobrel",	"es_mobrel",	"es_netbkg",	"ks_lstrdt",	"es_lstrdt",	"closer_trf",	"es_mtfpos",	"es_opnpos",	"es_margin",	"es_ledbal",	"es_dpledg",	"es_dphldg",	"es_ccol",	"es_nccol",	"es_pledval",	"es_corpact",	"es_pfreco",	"cmbkgsts",	"fobkgsts",	"cobkgsts",	"cdsbkgsts",	"brname"
//       ],
//       ...records.map((record) => [record.priority,record.barcode	,record.brcd	,record.ucc	,record.kslucc	,record.clname	,record.ks_dpid_a	,record.ksdp_boid	,record.dp_ratecd	,record.catg	,record.panno	,record.neoid	,record.odinid	,record.bossid	,record.locationid	,record.es_locnid	,record.eckyc_no	,record.k_platform	,record.ks_clusrid	,record.ks_ralfno	,record.ks_ralncm	,record.ks_dpid_b	,record.ks_dpboid	,record.esdp_map	,record.es_dpboid	,record.ks_nomn	,record.ks_relwapc	,record.es_nomn	,record.es_relwapc	,record.ks_clsts	,record.es_clsts	,record.ac_closed	,record.ks_nsecm	,record.es_nsecm	,record.is_mtchncm	,record.ks_bsecm	,record.es_bsecm	,record.is_mtchbcm	,record.ks_nsefo	,record.es_nsefo	,record.is_mtchnfo	,record.ks_nsecds	,record.es_nsecds	,record.is_mtchcds	,record.ks_mcx	,record.es_mcx	,record.is_mtchmcx	,record.ks_ncdex	,record.es_ncdex	,record.is_mtchncd	,record.ks_emailid	,record.es_email	,record.is_mtch_em	,record.ks_emrel	,record.es_emrel	,record.ks_mobile	,record.es_mobile	,record.is_mtch_mo	,record.ks_mobrel	,record.es_mobrel	,record.es_netbkg	,record.ks_lstrdt	,record.es_lstrdt	,record.closer_trf	,record.es_mtfpos	,record.es_opnpos	,record.es_margin	,record.es_ledbal	,record.es_dpledg	,record.es_dphldg	,record.es_ccol	,record.es_nccol	,record.es_pledval	,record.es_corpact	,record.es_pfreco	,record.cmbkgsts	,record.fobkgsts	,record.cobkgsts	,record.cdsbkgsts	,record.brname
//       ]),
//     ];

//     setExcelData(data);
//     if (excelData) {
//       const ws = XLSX.utils.aoa_to_sheet(excelData);
//       const wb = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//       XLSX.writeFile(wb, "records.xls");
//     }
//   };

//   // Function to download Excel for all records


//   // Function to generate Excel data for the viewed record

//     const generateAndDownloadExcelForView = (record) => {
//       const data = [
//         ["priority",	"barcode",	"brcd",	"ucc",	"kslucc",	"clname",	"ks_dpid_a",	"ksdp_boid",	"dp_ratecd",	"catg",	"panno",	"neoid",	"odinid",	"bossid",	"locationid",	"es_locnid",	"eckyc_no",	"k_platform",	"ks_clusrid",	"ks_ralfno",	"ks_ralncm",	"ks_dpid_b",	"ks_dpboid",	"esdp_map",	"es_dpboid",	"ks_nomn",	"ks_relwapc",	"es_nomn",	"es_relwapc",	"ks_clsts",	"es_clsts",	"ac_closed",	"ks_nsecm",	"es_nsecm",	"is_mtchncm",	"ks_bsecm",	"es_bsecm",	"is_mtchbcm",	"ks_nsefo",	"es_nsefo",	"is_mtchnfo",	"ks_nsecds",	"es_nsecds",	"is_mtchcds",	"ks_mcx",	"es_mcx",	"is_mtchmcx",	"ks_ncdex",	"es_ncdex",	"is_mtchncd",	"ks_emailid",	"es_email",	"is_mtch_em",	"ks_emrel",	"es_emrel",	"ks_mobile",	"es_mobile",	"is_mtch_mo",	"ks_mobrel",	"es_mobrel",	"es_netbkg",	"ks_lstrdt",	"es_lstrdt",	"closer_trf",	"es_mtfpos",	"es_opnpos",	"es_margin",	"es_ledbal",	"es_dpledg",	"es_dphldg",	"es_ccol",	"es_nccol",	"es_pledval",	"es_corpact",	"es_pfreco",	"cmbkgsts",	"fobkgsts",	"cobkgsts",	"cdsbkgsts",	"brname"
//       ],
//         [record.priority,record.barcode	,record.brcd	,record.ucc	,record.kslucc	,record.clname	,record.ks_dpid_a	,record.ksdp_boid	,record.dp_ratecd	,record.catg	,record.panno	,record.neoid	,record.odinid	,record.bossid	,record.locationid	,record.es_locnid	,record.eckyc_no	,record.k_platform	,record.ks_clusrid	,record.ks_ralfno	,record.ks_ralncm	,record.ks_dpid_b	,record.ks_dpboid	,record.esdp_map	,record.es_dpboid	,record.ks_nomn	,record.ks_relwapc	,record.es_nomn	,record.es_relwapc	,record.ks_clsts	,record.es_clsts	,record.ac_closed	,record.ks_nsecm	,record.es_nsecm	,record.is_mtchncm	,record.ks_bsecm	,record.es_bsecm	,record.is_mtchbcm	,record.ks_nsefo	,record.es_nsefo	,record.is_mtchnfo	,record.ks_nsecds	,record.es_nsecds	,record.is_mtchcds	,record.ks_mcx	,record.es_mcx	,record.is_mtchmcx	,record.ks_ncdex	,record.es_ncdex	,record.is_mtchncd	,record.ks_emailid	,record.es_email	,record.is_mtch_em	,record.ks_emrel	,record.es_emrel	,record.ks_mobile	,record.es_mobile	,record.is_mtch_mo	,record.ks_mobrel	,record.es_mobrel	,record.es_netbkg	,record.ks_lstrdt	,record.es_lstrdt	,record.closer_trf	,record.es_mtfpos	,record.es_opnpos	,record.es_margin	,record.es_ledbal	,record.es_dpledg	,record.es_dphldg	,record.es_ccol	,record.es_nccol	,record.es_pledval	,record.es_corpact	,record.es_pfreco	,record.cmbkgsts	,record.fobkgsts	,record.cobkgsts	,record.cdsbkgsts	,record.brname
//         ],
//       ];
  
//       const ws = XLSX.utils.aoa_to_sheet(data);
//       const wb = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//       XLSX.writeFile(wb, "tables.xls");
//   };

//   // Function to go back to the list view
//   const backToList = () => {
//     // Show search bar and download buttons when going back to the list
//     setSearchTerm("");
//     setViewRecordDetails(null);
//   };

// // Function to replace empty or undefined values with "-"
// // const  = (value) => (value && value.trim() !== "" ? value.trim() : "---");

//   return (
//     <div>
      
//       {viewRecordDetails ? null : (
//         <div>
//           <h3>Exclusive Record List</h3>
//           <input
//             type="text"
//             placeholder="Search by Position"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             id="searchBar"
//           />

// <button onClick={() => generateAndDownloadView()}>
//             Generate and Download Excel
//           </button>
//         </div>
//       )}

//       {viewRecordDetails ? (
//         <div>
//           <h3>Details for {viewRecordDetails.clname}</h3>
//           {/* Displaying record details */}
//           <h4>Closer Information Report For Client Transfer</h4>
//     <table  class="1">
//       <thead>
//         <tr>
//           <th>  </th>
//           <th>Ucc</th>
//           <th>Name</th>
//           <th>AP NAME/SERIES</th>
//           <th>AP TERMINAL ID</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <th>INFO.</th>
//           <td>{(viewRecordDetails.ucc|| 'NR')}</td>
//           <td>{(viewRecordDetails.clname|| 'NR')}</td>
//           <td>{viewRecordDetails.brname|| 'NR'}</td>
//           <td>{(viewRecordDetails.neoid||"Not alloted")},{(viewRecordDetails.odinid||"Not alloted")}</td>
//         </tr>
//       </tbody>
//     </table>

//     <h4>Check POINT - KOTAK -1</h4>
//     <table class="2">
    
//       <thead>
//         <tr>
//         <th></th>
//         <th>Client A/c Open In Kotak</th>
//           <th colSpan="6">Segment activation in kotak</th>
//           <th>Esl DP Mapped In Kotak</th>
//           <th>Location At Kotak</th>
//         </tr>
//         <tr>
//           <th></th>
//           <td></td>
//           <th colspan="2">Cash</th>
//           <th colspan="2">F&O</th>
//           <th colspan="2">Others(cds,mcx,ncdex)</th>
//           <th></th>
//           <th></th>
//         </tr>
//         <tr>
//           <th></th>
//           <td></td>
//           <th>ESL</th>
//           <th>KSL</th>
//           <th>ESL</th>
//           <th>KSL</th>
//           <th>ESL</th>
//           <th>KSL</th>
//           <th></th>
//           <th></th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//         <th>INFO.</th>
//         <td>{(viewRecordDetails.kslucc|| 'NR')}</td>
//         <td>{(viewRecordDetails.es_nsecm|| 'NR')}</td>
//         <td>{(viewRecordDetails.ks_nsecm|| 'NR')}</td>
//           <td>{(viewRecordDetails.es_nsefo|| 'NR')}</td>
//           <td>{(viewRecordDetails.ks_nsefo|| 'NR')}</td>
//           <td>{(viewRecordDetails.es_nsecds|| 'NR')},{(viewRecordDetails.es_mcx|| 'NR')} , {(viewRecordDetails.es_ncdex|| 'NR')}</td>
//           <td>{(viewRecordDetails.ks_nsecds|| 'NR')},{(viewRecordDetails.ks_mcx|| 'NR')} , {(viewRecordDetails.ks_ncdex|| 'NR')}</td>
//           <td>{(viewRecordDetails.esdp_map|| "Not MAP")}</td>
//           <td>{(viewRecordDetails.locationid|| 'NR')}</td>
//         </tr>
//         <tr>
//         <th>SIGN</th>
//         <td></td>
//         <td></td>
//         <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//         </tr>
//       </tbody>
//     </table>


//     <h4>Check Point - DP/DMAT - 2</h4>    
//     <table class="3">

//       <thead>
//         <tr>
//           <th></th>
//           <th>Cash Equivalant Holding</th>
//           <th>Pending CORP. Action</th>
//           <th>Portfolio Reconsilation</th>
//           <th>DP Holding</th>
//           <th>Pledge Value</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <th>INFO.</th>
//           <td>{(viewRecordDetails.es_ccol|| 'NR')}</td>
//           <td>{viewRecordDetails.es_corpact === 1 ? 'True' :'False'}</td>
//           <td>{(viewRecordDetails.es_pfreco|| 'NR')}</td>
//           <td>{(viewRecordDetails.es_dphldg|| 'NR')}</td>
//           <td>{(viewRecordDetails.es_pledval|| 'NR')}</td>
//         </tr>
//         <tr>
//           <th>SIGN</th>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//         </tr>
//       </tbody>
//     </table>


//     <h4>Check Point - FROM CLIENT - 3</h4>
//     <table class="4">
   
//       <thead>
//         <tr>
//           <th></th>
//           <th>Kotak Bank A/C Add in Client Netbanking</th>
//           <th>Pending IPO Application</th>
//           <th>Pending Claim Of IEPF/Other</th>
//           <th colSpan="2">Existing Trading Platform Information</th>
         
//         </tr>
//         <tr>
//         <th></th>
//         <th></th>
//         <th></th>
//         <th></th>
//         <th>Self</th>
//         <th>Ap</th>
       
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <th>INFO.</th>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
         
//         </tr>
//         <tr>
//           <th>SIGN</th>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
          
//         </tr>
//       </tbody>
//     </table>



//     <h4>Check Point - BEFORE CLOSER - 4</h4>
//     <table class="5">
//       <thead>
//         <tr>
//           <th></th>
//           <th colSpan="3">Position</th>
//           <th colSpan="2">Account Balance ESL</th>
//           <th>Last Trade Date </th>
//           <th>F&O Margin</th>
//           <th>Confirm Correct Mapped</th>
          
//         </tr>
//         <tr>
//         <th></th>
//         <th>CASH</th>
//         <th>F&O</th>
//         <th>MTF</th>
//         <th>Dp</th>
//         <th>Trading</th>
//         <th></th>
//         <th></th>
//         <th></th>
        
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <th>INFO.</th>
//           <td></td>
//           <td>{(viewRecordDetails.es_opnpos === 1 ? 'True' :'False' || '-')}</td>
//           <td>{viewRecordDetails.es_mtfpos === 1 ? "True" : "False" || '-'}</td>
//           <td>{(viewRecordDetails.es_dpledg|| 'NR')}</td>
//           <td>{(viewRecordDetails.es_ledbal|| 'NR')}</td>
//           <td>{(viewRecordDetails.es_lstrdt|| 'NR')}</td>
//           <td>{(viewRecordDetails.es_margin||"NIL")}</td>
//           <td></td>
         
//         </tr>
//         <tr>
//           <th>SIGN</th>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
          
//         </tr>
//         <tr colSpan="9">
//         <th colSpan="9"> Note : Checked All Information Now Proceed For Clouser &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//         <input type="text"  placeholder="SIGN"></input></th>
//         </tr>
//       </tbody>
//     </table>


//     <h4>Check Point - CLOSER PROCDURED - 5</h4>
//     <table class="6">
//       <thead>
//         <tr>
//           <th></th>
//           <th>Unpledge Shares</th>
//           <th>Suspend Client On ODIN</th>
//           <th>DP Closer Transfer</th>
//           <th>Realese Of fund From Exchange(If Credit)</th>
//           <th>Credit Balance TRF to Client</th>
//           <th>Closer A/C In Exchange</th>
          
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <th>INFO.</th>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
          
//         </tr>
//         <tr>
//           <th>SIGN</th>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
          
//         </tr>
//       </tbody>
//     </table>

//           {/* Buttons for the specific record */}
//           {/* <button onClick={() => editRecord(viewRecordDetails)}>Edit</button> */}
//           <button onClick={() => printRecord(viewRecordDetails)}>Print</button>

//           {/* Button for generating and downloading Excel for the specific record */}
//           <button onClick={() => generateAndDownloadExcelForView(viewRecordDetails)}>
//             Generate and Download Excel
//           </button>

//           <button onClick={backToList}>Back</button>
//         </div>
//       ) : (
//         <table className="table table-striped" style={{ marginTop: 20 }}>
//           <thead>
//             <tr>
              
//               <th>Name</th>
//               <th>Ucc</th>
//               <th>Pan</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>{filteredRecords()}
//           <button onClick={() => printRecord(selectedRecords)}>Print Selected</button></tbody>
//         </table>
//       )}
//     </div>
//   );
// }
















import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import "./record.css";

// Record component for rendering each row in the table
const Record = (props) => {
  const { record } = props;

  const showCheckbox = !record.ac_closed; // Check if ac_closed is not present

  const handleCheckboxChange = (e) => {
    if (record.ac_closed) {
      alert("Checkbox cannot be selected for records with ac_closed present");
    } else {
      props.toggleSelectedRecord(record, e.target.checked);
    }
  };

  return (
    <tr>
      <td>
        {showCheckbox ? (
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
          />
        ) : (
          "Ac_Closed"
        )}
      </td>
      <td>{record.clname}</td>
      <td>{record.ucc}</td>
      <td>{record.kslucc}</td>
      <td>{record.panno}</td>
      <td>{record.locationid}</td>
      <td>{record.closer_trf}</td>
      <td>
        <button
          className="btn btn-link"
          onClick={() => {
            props.viewRecord(record);
          }}
        >
          View
        </button>
        <button
          className="btn btn-link"
          onClick={() => {
            props.printRecord(record);
          }}
        >
          Print
        </button>
      </td>
    </tr>
  );
};


// RecordList component
export default function RecordList() {
  // State variables
  const [records, setRecords] = useState([]);
  const [initialFetchComplete, setInitialFetchComplete] = useState(false);
  const [showEmptyCloserTrf, setShowEmptyCloserTrf] = useState(false);
  const [viewRecordDetails, setViewRecordDetails] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [excelDataForView, setExcelDataForView] = useState(null);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const [closerTrfStatus, setCloserTrfStatus] = useState("all"); // Default to show all records
  const [isOpen, setIsOpen] = useState(false);
  const [kslStatus, setkslStatus] = useState("all"); // Default to show all records



  let history = useNavigate();

  // Fetch records on initial mount
  useEffect(() => {
    async function getRecords() {
      try {
        setLoading(true); // Set loading to true before starting the fetch
        const response = await fetch(`http://183.182.84.228:4005/record/`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
        const records = await response.json();
        setRecords(records);
        setInitialFetchComplete(true);
      } finally {
        setLoading(false); // Set loading to false after fetch completes (success or error)
      }
    }

    if (!initialFetchComplete) {
      getRecords();
    }


    document.addEventListener("keydown", handleKeyPress);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };

  }, [initialFetchComplete]);




  const handleKeyPress = (event) => {
    if (event.key === "Escape") {
      backToList(null)
    }
  };

  // Function to delete a record
  async function deleteRecord(id) {
    await fetch(`http://183.182.84.228:4005/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }


  function toggleSelectedRecord(record, isChecked) {
    if (isChecked) {
      setSelectedRecords((prev) => [...prev, record]);
    } else {
      setSelectedRecords((prev) => prev.filter((r) => r._id !== record._id));
    }
  }

  
  // Function to print a record
  function printRecord(records) {
    // If only one record is selected, convert it to an array
    if (!Array.isArray(records)) {
      records = [records];
    }
  
    const printWindow = window.open("", "_blank");
    if (printWindow && printWindow.document) {
      records.forEach((record, index) => {
        const currentDate = new Date(); // Get current date and time
      const formattedDate = `Updated Date and Time : ${record.run_date}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        Print Date and Time${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
        printWindow.document.write(`
          <html>
            <head>
              <title>Print page ${index+1}</title>
              <style>
                body {
                  text-align: center;
                  transform: scale(0.8);
                 
                }
                table {
                  border-collapse: collapse;
                  width: 100%;
                  margin: 0 auto;
                  border: 2px solid black;
                }
                th, td {
                  border: 1px solid #dddddd;
                  text-align: center;
                  padding: 0px;
                  border: 2px solid black;
                }
                th {
                  background-color: #f2f2f2;
                  border: 2px solid black;
                }
           
              </style>
            </head>
              <body>         
              <h4>Closer Information Report For Client Transfer</h4>
              
              <table  class="1">
       <thead>
         <tr>
           <th>  </th>
           <th>Ucc</th>
           <th>Name</th>
           <th>KRA Status</th>
           <th>KRA Inactive Reason</th>
           <th>AP NAME/SERIES</th>
           <th>AP TERMINAL ID</th>
         </tr>
       </thead>
       <tbody>
    
         <tr>
           <th>INFO.</th>
           <td>${(record.ucc|| 'NR')}</td>
           <td>${(record.clname|| 'NR')}</td>
           <td>${record.ks_krasts}</td>
           <td>${record.ks_krarem}</td>
           <td>${record.brname|| 'NR'}</td>
           <td>${(record.neoid||"Not alloted")},${(record.odinid||"Not alloted")}</td>
         </tr>
      
       </tbody>
     </table>
 
     <h4>Check POINT - KOTAK -1</h4>
     <table class="2">
    
      <thead>
        <tr>
        <th></th>
        <th>UCC Open(Kotak)</th>
          <th colSpan="9">Segment Activation(Kotak)</th>
          <th>Esl DP Mapped(Kotak)</th>
          <th>No.Of Esl DP Mapped(Kotak)</th>
          <th>Location At Kotak</th>
        </tr>
        <tr>
          <th></th>
          <td></td>
          <th colspan="3">Cash</th>
          <th colspan="3">F&O</th>
          <th colspan="3">Others(cds,mcx,ncdex)</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <th></th>
          <td></td>
          <th>ESL</th>
          <th>KSL</th>
          <th>Status</th>
          <th>ESL</th>
          <th>KSL</th>
          <th>Status</th>
          <th>ESL</th>
          <th>KSL</th>
          <th>Status</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
        <th>INFO.</th>
        <td>${(record.kslucc|| 'NR')}</td>
        <td>${(record.es_nsecm )}</td>
        <td>${(record.ks_nsecm|| 'NR')}</td>
        <td>${(record.ptt_nsecm|| 'NR')}</td>
          <td>${(record.es_nsefo|| 'NR')}</td>
          <td>${(record.ks_nsefo|| 'NR')}</td>
          <td>${(record.ptt_nsefo|| 'NR')}</td>
          <td>${(record.es_nsecds|| 'NR')},${(record.es_mcx|| 'NR')} , ${(record.es_ncdex|| 'NR')}</td>
          <td>${(record.ks_nsecds|| 'NR')},${(record.ks_mcx|| 'NR')} , ${(record.ks_ncdex|| 'NR')}</td>
          <td>${(record.ptt_nsecds|| 'NR')},${(record.ptt_mcx|| 'NR')} , ${(record.ptt_ncdex|| 'NR')}</td>
          <td>${(record.esdp_map|| "Not MAP")}</td>
          <td>${(record.es_nodpac|| "Not MAP")}</td>
          <td>${(record.locationid|| 'NR')}</td>
        </tr>
        <tr>
        <th>SIGN</th>
        <td></td>
        <td></td>
        <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
 
 
     <h4>Check Point - DP/DMAT - 2</h4>    
     <table class="3">
 
       <thead>
         <tr>
           <th></th>
           <th>Cash Equivalant Holding</th>
           <th>Pending CORP. Action</th>
           <th>Portfolio Reconsilation</th>
           <th>DP Holding</th>
           <th>Pledge Value</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <th>INFO.</th>
           <td>${(record.es_ccol|| 'NO')}</td>
           <td>${record.es_corpact}</td>
           <td>${(record.es_pfreco|| 'NO')}</td>
           <td>${(record.es_dphldg|| 'NO')}</td>
           <td>${(record.es_pledval|| 'NO')}</td>
         </tr>
         <tr>
           <th>SIGN</th>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
         </tr>
       

       </tbody>
     </table>
 
 
     <h4>Check Point - FROM CLIENT - 3</h4>
     <table class="4">
    
       <thead>
         <tr>
           <th></th>
           <th>Kotak Bank A/C Add in Client Netbanking</th>
           <th>Pending IPO Application</th>
           <th>Pending Claim Of IEPF/Other</th>
           <th colSpan="2">Existing Trading Platform Information</th>
          
         </tr>
         <tr>
         <th></th>
         <th></th>
         <th></th>
         <th></th>
         <th>Self</th>
         <th>Ap</th>
        
         </tr>
       </thead>
       <tbody>
         <tr>
           <th>INFO.</th>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
          
         </tr>
         <tr>
           <th>SIGN</th>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           
         </tr>
       </tbody>
     </table>
 
 
 
     <h4>Check Point - BEFORE CLOSER - 4</h4>
     <table class="5">
       <thead>
         <tr>
           <th></th>
           <th colSpan="3">Position</th>
           <th colSpan="2">Account Balance ESL</th>
           <th>Last Trade Date </th>
           <th>F&O Margin</th>
           <th>Confirm Correct Mapped</th>
           <th>Kotak Account Tradable</th>
           
         </tr>
         <tr>
         <th></th>
         <th>CASH</th>
         <th>F&O</th>
         <th>MTF</th>
         <th>Dp</th>
         <th>Trading</th>
         <th></th>
         <th></th>
         <th></th>
         <th></th>
         
         </tr>
       </thead>
       <tbody>
       

         <tr>
           <th>INFO.</th>
           <td></td>
           <td>${(record.es_opnpos === 1 ? 'Yes' :'No' || '-')}</td>
           <td>${record.es_mtfpos === 1 ? "Yes" : "No" || '-'}</td>
           <td>${(record.es_dpledg|| 'NIL')}</td>
           <td>${(record.es_ledbal|| 'NIL')}</td>
           <td>${(record.es_lstrdt|| 'NIL')}</td>
           <td>${(record.es_margin||"NIL")}</td>
           <td></td>
           <td></td>
           
          
         </tr>
         <tr>
           <th>SIGN</th>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           
         </tr>
         <tr colSpan="10">
         <th colSpan="10"> Note : Checked All Information Now Proceed For Clouser &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <input type="text"  placeholder="SIGN"></input></th>
         </tr>
         
       </tbody>
     </table>
 
 
     <h4>Check Point - CLOSER PROCDURED - 5</h4>
     <table class="6">
       <thead>
         <tr>
           <th></th>
           <th>Unpledge Shares</th>
           <th>Suspend Client On ODIN</th>
           <th>DP Closer Transfer</th>
           <th>Realese Of fund From Exchange(If Credit)</th>
           <th>Credit Balance TRF to Client</th>
           <th>Closer A/C In Exchange</th>
           
         </tr>
       </thead>
       <tbody>
         <tr>
           <th>INFO.</th>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           
         </tr>
         <tr>
           <th>SIGN</th>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           
         </tr>
       </tbody>
     </table>
        <p>${formattedDate}</p>
        <div style="page-break-after: always;"></div> <!-- Page break after each record -->
        </body>
               </html>`);
              });
              printWindow.document.close();
              printWindow.onload = function() {
                printWindow.print();
              }
            } else {
              console.log("Failed to open print window.");
            }
          }
  // Function to set the details for viewing a record
  
  function viewRecord(record) {
    setViewRecordDetails(record);
    // Hide search bar and download buttons when viewing record
    setSearchTerm("");
    // document.getElementById("searchBar").classList.add("hidden");
    // document.getElementById("downloadButton").classList.add("hidden");
  }

  // Function to filter records based on search term
 // Function to filter records based on search term
 const toggleShowEmptyCloserTrf = () => {
  setShowEmptyCloserTrf((prev) => !prev);
};

// Function to filter records based on search term and checkbox state
function filteredRecords() {
  const terms = searchTerm.split(',');
  const selectedRecordsSet = new Set(selectedRecords.map((record) => record._id));

  let filtered = records.filter((record) =>
    terms.some((term) =>
      ((record.locationid && record.locationid.toLowerCase().includes(term.toLowerCase().trim())) ||
        (record.ucc && record.ucc.toLowerCase().includes(term.toLowerCase().trim())) ||
        (record.kslucc && record.kslucc.toLowerCase().includes(term.toLowerCase().trim())) ||
      (record.panno && record.panno.toLowerCase().includes(term.toLowerCase().trim()))) ||
      (record.clname && record.clname.toLowerCase().includes(term.toLowerCase().trim())) ||
      false // Add a fallback to handle cases where the property is undefined
    )
  );

  if (closerTrfStatus === "done") {
    filtered = filtered.filter((record) => record.closer_trf);
  } else if (closerTrfStatus === "notDone") {
    filtered = filtered.filter((record) => !record.closer_trf);
  }


  if (kslStatus === "done") {
    filtered = filtered.filter((record) => record.kslucc);
  } else if (kslStatus === "notDone") {
    filtered = filtered.filter((record) => !record.kslucc);
  }
  
  const sortedRecords = filtered.sort((a, b) => {
    const aIsSelected = selectedRecordsSet.has(a._id);
    const bIsSelected = selectedRecordsSet.has(b._id);

    if (aIsSelected && !bIsSelected) {
      return -1;
    } else if (!aIsSelected && bIsSelected) {
      return 1;
    } else {
      return 0;
    }
  });

  return sortedRecords.map((record) => (
    <Record
      record={record}
      deleteRecord={() => deleteRecord(record._id)}
      printRecord={() => printRecord(record)}
      viewRecord={() => viewRecord(record)}
      toggleSelectedRecord={toggleSelectedRecord}
      key={record._id}
    />
  ));
}




  // Function to navigate to edit page
  function editRecord(record) {
    history(`/edit/${record.id}`);
  }

  // Function to generate Excel data for all records
  // Function to generate Excel data for selected records
const generateAndDownloadView = () => {
  const data = [
    ["priority", "barcode", "brcd", "ucc", "kslucc"],
    ...selectedRecords.map((record) => [record.priority, record.barcode, record.brcd, record.ucc, record.kslucc]),
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "selected_records.xls");
};


  // Function to download Excel for all records


  // Function to generate Excel data for the viewed record

    const generateAndDownloadExcelForView = (record) => {
      const data = [
        ["priority",	"barcode",	"brcd",	"ucc",	"kslucc"],
        [record.priority,record.barcode,record.brcd,record.ucc,record.kslucc],
      ];
  
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "tables.xls");
  };

  // Function to go back to the list view
  const backToList = () => {
    // Show search bar and download buttons when going back to the list
    setSearchTerm("");
    setViewRecordDetails(null);
  };

// Function to replace empty or undefined values with "-"
// const  = (value) => (value && value.trim() !== "" ? value.trim() : "---");
function clearSearchAndSelection() {
  setSearchTerm(""); // Clear the search field
  setSelectedRecords([]); // Uncheck all checkboxes
}

function updateSearchBar(selectedRecords) {
  const searchValue = selectedRecords.map((record) => record.ucc).join(', ');
  setSearchTerm(searchValue);
}

// Function to clear selected records
function clearSelectedRecords() {
  setSelectedRecords([]);
  setSearchTerm("");
}







return (
  
  <div>
      
    {viewRecordDetails ? (
      <div>
       <h3>Details for {viewRecordDetails.clname}</h3>
          {/* Displaying record details */}
          <h4>Closer Information Report For Client Transfer</h4>
          <table  class="1">
       <thead>
         <tr>
           <th>  </th>
           <th>Ucc</th>
           <th>Name</th>
           <th>KRA Status</th>
           <th>KRA Inactive Reason</th>
           <th>AP NAME/SERIES</th>
           <th>AP TERMINAL ID</th>
         </tr>
       </thead>
       <tbody>
    
         <tr>
           <th>INFO.</th>
           <td>{(viewRecordDetails.ucc|| 'NR')}</td>
           <td>{(viewRecordDetails.clname|| 'NR')}</td>
           <td>{viewRecordDetails.ks_krasts}</td>
           <td>{viewRecordDetails.ks_krarem}</td>
           <td>{viewRecordDetails.brname|| 'NR'}</td>
           <td>{(viewRecordDetails.neoid||"Not alloted")},{(viewRecordDetails.odinid||"Not alloted")}</td>
         </tr>
      
       </tbody>
     </table>
 
     <h4>Check POINT - KOTAK -1</h4>
     <table class="2">
    
      <thead>
        <tr>
        <th></th>
        <th>UCC Open(Kotak)</th>
          <th colSpan="9">Segment Activation(Kotak)</th>
          <th>Esl DP Mapped(Kotak)</th>
          <th>No.Of Esl DP Mapped(Kotak)</th>
          <th>Location At Kotak</th>
        </tr>
        <tr>
          <th></th>
          <td></td>
          <th colspan="3">Cash</th>
          <th colspan="3">F&O</th>
          <th colspan="3">Others(cds,mcx,ncdex)</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <th></th>
          <td></td>
          <th>ESL</th>
          <th>KSL</th>
          <th>Status</th>
          <th>ESL</th>
          <th>KSL</th>
          <th>Status</th>
          <th>ESL</th>
          <th>KSL</th>
          <th>Status</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
        <th>INFO.</th>
        <td>{(viewRecordDetails.kslucc|| 'NR')}</td>
        <td>{(viewRecordDetails.es_nsecm )}</td>
        <td>{(viewRecordDetails.ks_nsecm|| 'NR')}</td>
        <td>{(viewRecordDetails.ptt_nsecm|| 'NR')}</td>
          <td>{(viewRecordDetails.es_nsefo|| 'NR')}</td>
          <td>{(viewRecordDetails.ks_nsefo|| 'NR')}</td>
          <td>{(viewRecordDetails.ptt_nsefo|| 'NR')}</td>
          <td>{(viewRecordDetails.es_nsecds|| 'NR')},{(viewRecordDetails.es_mcx|| 'NR')} , {(viewRecordDetails.es_ncdex|| 'NR')}</td>
          <td>{(viewRecordDetails.ks_nsecds|| 'NR')},{(viewRecordDetails.ks_mcx|| 'NR')} , {(viewRecordDetails.ks_ncdex|| 'NR')}</td>
          <td>{(viewRecordDetails.ptt_nsecds|| 'NR')},{(viewRecordDetails.ptt_mcx|| 'NR')} , {(viewRecordDetails.ptt_ncdex|| 'NR')}</td>
          <td>{(viewRecordDetails.esdp_map|| "Not MAP")}</td>
          <td>{(viewRecordDetails.es_nodpac|| "Not MAP")}</td>
          <td>{(viewRecordDetails.locationid|| 'NR')}</td>
        </tr>
        <tr>
        <th>SIGN</th>
        <td></td>
        <td></td>
        <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
 
 
     <h4>Check Point - DP/DMAT - 2</h4>    
     <table class="3">
 
       <thead>
         <tr>
           <th></th>
           <th>Cash Equivalant Holding</th>
           <th>Pending CORP. Action</th>
           <th>Portfolio Reconsilation</th>
           <th>DP Holding</th>
           <th>Pledge Value</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <th>INFO.</th>
           <td>{(viewRecordDetails.es_ccol|| 'NO')}</td>
           <td>{viewRecordDetails.es_corpact}</td>
           <td>{(viewRecordDetails.es_pfreco|| 'NO')}</td>
           <td>{(viewRecordDetails.es_dphldg|| 'NO')}</td>
           <td>{(viewRecordDetails.es_pledval|| 'NO')}</td>
         </tr>
         <tr>
           <th>SIGN</th>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
         </tr>
       

       </tbody>
     </table>
 
 
     <h4>Check Point - FROM CLIENT - 3</h4>
     <table class="4">
    
       <thead>
         <tr>
           <th></th>
           <th>Kotak Bank A/C Add in Client Netbanking</th>
           <th>Pending IPO Application</th>
           <th>Pending Claim Of IEPF/Other</th>
           <th colSpan="2">Existing Trading Platform Information</th>
          
         </tr>
         <tr>
         <th></th>
         <th></th>
         <th></th>
         <th></th>
         <th>Self</th>
         <th>Ap</th>
        
         </tr>
       </thead>
       <tbody>
         <tr>
           <th>INFO.</th>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
          
         </tr>
         <tr>
           <th>SIGN</th>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           
         </tr>
       </tbody>
     </table>
 
 
 
     <h4>Check Point - BEFORE CLOSER - 4</h4>
     <table class="5">
       <thead>
         <tr>
           <th></th>
           <th colSpan="3">Position</th>
           <th colSpan="2">Account Balance ESL</th>
           <th>Last Trade Date </th>
           <th>F&O Margin</th>
           <th>Confirm Correct Mapped</th>
           <th>Kotak Account Tradable</th>
           
         </tr>
         <tr>
         <th></th>
         <th>CASH</th>
         <th>F&O</th>
         <th>MTF</th>
         <th>Dp</th>
         <th>Trading</th>
         <th></th>
         <th></th>
         <th></th>
         <th></th>
         
         </tr>
       </thead>
       <tbody>
       

         <tr>
           <th>INFO.</th>
           <td></td>
           <td>{(viewRecordDetails.es_opnpos === 1 ? 'Yes' :'No' || '-')}</td>
           <td>{viewRecordDetails.es_mtfpos === 1 ? "Yes" : "No" || '-'}</td>
           <td>{(viewRecordDetails.es_dpledg|| 'NIL')}</td>
           <td>{(viewRecordDetails.es_ledbal|| 'NIL')}</td>
           <td>{(viewRecordDetails.es_lstrdt|| 'NIL')}</td>
           <td>{(viewRecordDetails.es_margin||"NIL")}</td>
           <td></td>
           <td></td>
           
          
         </tr>
         <tr>
           <th>SIGN</th>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           
         </tr>
         <tr colSpan="10">
         <th colSpan="10"> Note : Checked All Information Now Proceed For Clouser &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <input type="text"  placeholder="SIGN"></input></th>
         </tr>
         
       </tbody>
     </table>
 
 
     <h4>Check Point - CLOSER PROCDURED - 5</h4>
     <table class="6">
       <thead>
         <tr>
           <th></th>
           <th>Unpledge Shares</th>
           <th>Suspend Client On ODIN</th>
           <th>DP Closer Transfer</th>
           <th>Realese Of fund From Exchange(If Credit)</th>
           <th>Credit Balance TRF to Client</th>
           <th>Closer A/C In Exchange</th>
           
         </tr>
       </thead>
       <tbody>
         <tr>
           <th>INFO.</th>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           
         </tr>
         <tr>
           <th>SIGN</th>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           
         </tr>
       </tbody>
     </table>



          {/* Buttons for the specific record */}
          {/* <button onClick={() => editRecord(viewRecordDetails)}>Edit</button> */}
          <button onClick={() => printRecord(viewRecordDetails)}>Print</button>

          {/* Button for generating and downloading Excel for the specific record */}
          <button onClick={() => generateAndDownloadExcelForView(viewRecordDetails)}>
            Generate and Download Excel
          </button>

          <button onClick={backToList}>Back</button>
      </div>
    ) : (
      <div>
        <h3>Exclusive Closer Info</h3>
        <input
          type="text"
          placeholder="Search by Position"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (e.target.value === '') {
              backToList();
            }
          }}
          id="searchBar"
        />

        {selectedRecords.length > 0 && (
          <div>
            <strong>Selected Records:</strong> {selectedRecords.map((record) => record.ucc).join(', ')}
            <button onClick={clearSelectedRecords}>Clear Selection</button>
          </div>
        )}

        <button onClick={() => generateAndDownloadView()}>Generate and Download Excel</button>
        <button onClick={() => printRecord(selectedRecords)}>Print Selected</button>
        <button onClick={clearSearchAndSelection}>Clear</button><br/>
        <h3><strong>Updated Date</strong> {records.length > 0 && records[0].run_date ? records[0].run_date : 'N/A'}</h3>

        <h5 >
        <div className="dropdown">
      <button className="dropbtn">Is Closer Transfer Done ?</button>
      <div className="dropdown-content">
        <button onClick={() => setCloserTrfStatus("done")}>Yes</button>
        <button onClick={() => setCloserTrfStatus("notDone")}>No</button>
        <button onClick={() => setCloserTrfStatus("all")}>All</button>
      </div>
    </div>
    <div className="dropdown">
      <button className="dropbtn">Is Ksucc Ope ?</button>
      <div className="dropdown-content">
        <button onClick={() => setkslStatus("done")}>Yes</button>
        <button onClick={() => setkslStatus("notDone")}>No</button>
        <button onClick={() => setkslStatus("all")}>All</button>
      </div>
    </div>
      </h5>
      <table className="table table-striped table-scroll" style={{ marginTop: 100 , textalign: 'center' }}>
  <thead>
    <tr>
      <th>Select</th>
      <th>Name</th>
      <th>Ucc</th>
      <th>Ksl_Ucc</th>
      <th>Pan</th>
      <th>LocationId</th>
      <th>Closer Transfer</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>{filteredRecords()}</tbody>
</table>

        {loading && (
        <div className="loading-central-circle"></div>
      )}
      </div>
    )}
  </div>
);
}


// Secound way to add multiple tables in single file

// ... (other imports and code)

// export default function RecordList() {
//   // ... (other state and functions)

//   // Function to generate and download Excel for the viewed record
//   const generateAndDownloadExcelForView = (record) => {
//     const data = [
//       ["Name", "Ucc", "PAN Number"],
//       [record.ksluccnm, record.ucc, record.panno],
//     ];

//     const ws = XLSX.utils.aoa_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

//     // Add similar tables and data to the Excel file (customize as needed)
//     // Table 2
//     const dataTable2 = [
//       ["Header1", "Header2", "Header3"],
//       ["Data1", "Data2", "Data3"],
//     ];
//     const wsTable2 = XLSX.utils.aoa_to_sheet(dataTable2);
//     XLSX.utils.book_append_sheet(wb, wsTable2, "Table2");

//     // Table 3
//     const dataTable3 = [
//       ["HeaderA", "HeaderB", "HeaderC"],
//       ["DataA", "DataB", "DataC"],
//     ];
//     const wsTable3 = XLSX.utils.aoa_to_sheet(dataTable3);
//     XLSX.utils.book_append_sheet(wb, wsTable3, "Table3");

//     // ... Add more tables as needed

//     XLSX.writeFile(wb, "record_details_with_tables.xls");
//   };

//   // ... (other code)

//   return (
//     <div>
//       <h3>Record List</h3>
//       {/* ... (other code) */}

//       {viewRecordDetails ? (
//         <div>
//           <h3>Details for {viewRecordDetails.ksluccnm}</h3>
//           {/* Displaying record details */}
//           {/* ... (other code) */}

//           {/* Buttons for the specific record */}
//           <button onClick={() => editRecord(viewRecordDetails)}>Edit</button>
//           <button onClick={() => printRecord(viewRecordDetails)}>Print</button>

//           {/* Button for generating and downloading Excel for the specific record */}
//           <button onClick={() => generateAndDownloadExcelForView(viewRecordDetails)}>
//             Generate and Download Excel
//           </button>

//           <button onClick={backToList}>Back</button>
//         </div>
//       ) : (
//         <table className="table table-striped" style={{ marginTop: 20 }}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Ucc</th>
//               <th>Pan</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>{filteredRecords()}</tbody>
//         </table>
//       )}
//     </div>
//   );
// }




























