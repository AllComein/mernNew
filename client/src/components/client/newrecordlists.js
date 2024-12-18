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
//       const response = await fetch(`http://202.54.6.1:4000/record/`);

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
//     await fetch(`http://202.54.6.1:4000/record/${id}`, {
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
import AuthService from "../../services/auth.service";

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
      <td>{record.ks_mobile}</td>
      <td>{record.es_mobile}</td>
      <td>{record.ks_emailid}</td>
      <td>{record.es_email}</td>
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
  const [details, setdetails] = useState([]);
  const [datas, setdatas] = useState([]);
  const [prerecords, setprerecords] = useState([]);
  const [prerecordss, setprerecordss] = useState([]);
  const [prerecordsss, setprerecordsss] = useState([]);

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
  const [showHoverTable, setShowHoverTable] = useState(false);
  const [showHoverTable1, setShowHoverTable1] = useState(false);
  const [portStatus, setportStatus] = useState("all");
  const [dateStatus, setdateStatus] = useState("all");

  
  const [remarks, setremarks] = useState([]);

  const [inputValue, setInputValue] = useState([]);
  const [inputText, setInputText] = useState([]);
  const [inputDate, setInputDate] = useState([]);
  const [remark, setRemark] = useState([]);

  const [showHoverTable2, setShowHoverTable2] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeRowIndex, setActiveRowIndex] = useState(null); 
  const [activeISIN, setActiveISIN] = useState(null);
  const [activeUCC, setActiveUCC] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingRemark, setEditingRemark] = useState('');
  const [editingText, setEditingText] = useState('');
  const [editingDate, setEditingDate] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [progress, setProgress] = useState(0);


  const [filtered, setFiltered] = useState(records);
  const [userRecords, setUserRecords] = useState([]);




  let history = useNavigate();

  // Fetch records on initial mount
  // useEffect(() => {
  //   async function getRecords() {
  //     try {
  //       setLoading(true); // Set loading to true before starting the fetch
  //       const response = await fetch(`http://183.182.84.228:4005/record/`);
  //       if (!response.ok) {
  //         const message = `An error occurred: ${response.statusText}`;
  //         window.alert(message);
  //         return;
  //       }
  //       const records = await response.json();
  //       setRecords(records);
  //       setInitialFetchComplete(true);
  //     } finally {
  //       setLoading(false); // Set loading to false after fetch completes (success or error)
  //     }
  //   }

  //   if (!initialFetchComplete) {
  //     getRecords();
  //   }


  //   document.addEventListener("keydown", handleKeyPress);

  //   // Remove event listener when component unmounts
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyPress);
  //   };

  // }, [initialFetchComplete]);






  // useEffect(() => {
  //   async function getdetails() {
  //     try {
  //       setLoading(true); // Set loading to true before starting the fetch
  //       const response = await fetch(`http://183.182.84.228:4005/esdpsoh/`);
  //       if (!response.ok) {
  //         const message = `An error occurred: ${response.statusText}`;
  //         window.alert(message);
  //         return;
  //       }
  //       const details = await response.json();
  //       setdetails(details);
  //       setInitialFetchComplete(true);
  //     } finally {
  //       setLoading(false); // Set loading to false after fetch completes (success or error)
  //     }
  //   }

  //   if (!initialFetchComplete) {
  //     getdetails();
  //   }


  //   document.addEventListener("keydown", handleKeyPress);

  //   // Remove event listener when component unmounts
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyPress);
  //   };

  // }, [initialFetchComplete]);




  // useEffect(() => {
  //   async function getdetails() {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(`http://183.182.84.228:4005/esdpsoh/`);
  //       if (!response.ok) {
  //         const message = `An error occurred: ${response.statusText}`;
  //         window.alert(message);
  //         return;
  //       }
  //       const details = await response.json();
  //       setdetails(details);
  //       setInitialFetchComplete(true);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   if (!initialFetchComplete) {
  //     getdetails();
  //   }

  //   document.addEventListener("keydown", handleKeyPress);

  //   return () => {
  //     document.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, [initialFetchComplete, details]);
  




  
  // useEffect(() => {
  //   async function getUserRecords() {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(`http://183.182.84.228:4005/userrecords`);
  //       if (!response.ok) {
  //         const message = `An error occurred: ${response.statusText}`;
  //         window.alert(message);
  //         return;
  //       }
  //       const userRecords = await response.json();
  //       setUserRecords(userRecords);
  //       setInitialFetchComplete(true);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   if (!initialFetchComplete) {
  //     getUserRecords();
  //   }

  //   document.addEventListener("keydown", handleKeyPress);

  //   return () => {
  //     document.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, [initialFetchComplete, userRecords]);







  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setProgress(0);
  
        const urls = [
          'http://183.182.84.228:4005/record/',
          'http://183.182.84.228:4005/predetail/',
          'http://183.182.84.228:4005/esdpsoh/',
          'http://183.182.84.228:4005/pfdiff/',
          'http://183.182.84.228:4005/pfdiffrems/',
          'http://183.182.84.228:4005/userrecords',
          'http://183.182.84.228:4005/predetails/',
          'http://183.182.84.228:4005/predetailss/'
        ];
  
        const allResponses = await Promise.all(urls.map(async (url, index) => {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            setProgress((index + 1) / urls.length * 100);
            return response;
          } catch (error) {
            console.error(`There was an error with fetch request at ${url}: ${error}`);
          }
        }));
        
  
        if (allResponses.some(response => !response.ok)) {
          const message = `An error occurred: ${allResponses.find(response => !response.ok).statusText}`;
          window.alert(message);
          return;
        }
  
        const [records,prerecords, details, datas, remarks,userRecords,prerecordss,prerecordsss] = await Promise.all(allResponses.map(response => response.json()));
  
        setRecords(records);
        setprerecords(prerecords);
        setdetails(details);
        setdatas(datas);
        setremarks(remarks);
        setUserRecords(userRecords);
        setprerecordss(prerecordss);
        setprerecordsss(prerecordsss);
        setInitialFetchComplete(true);
      } finally {
        setLoading(false);
      }
    }
  
    if (!initialFetchComplete) {
      fetchData();
    }
  
    document.addEventListener("keydown", handleKeyPress);
  
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [initialFetchComplete]);


  

  const handleRemarkChange = (index, event) => {
    let remarks = [...inputValue];
    remarks[index] = event.target.value;
    setInputValue(remarks);
  };

  const handleTextChange = (index, event) => {
    let texts = [...inputText];
    texts[index] = event.target.value;
    setInputText(texts);
  };
  
  const handleDateChange = (index, event) => {
    let dates = [...inputDate];
    dates[index] = event.target.value;
    setInputDate(dates);
  };
  
  const cancelRemark = (index) => {
    setInputValue(inputValue.filter((_, i) => i !== index));
    setInputText(inputText.filter((_, i) => i !== index));
    setInputDate(inputDate.filter((_, i) => i !== index));
  };
  

  const updateRemark = (UCC, ISIN,	kslucc,	SCRIP,	OPN_PF_QTY,	CLS_PF_QTY,	HOLDING_QTY,	DIFF,	NO_OF_DIFF) => {
    AuthService.updateUserRemark(UCC, ISIN,	kslucc,	SCRIP,	OPN_PF_QTY,	CLS_PF_QTY,	HOLDING_QTY,	DIFF,	NO_OF_DIFF, inputValue ,inputText , inputDate)
      .then(() => {
        console.log('Remarks updated successfully');
        // After updating the remark, fetch the data from the 'pfdiffrems' URL.
        return fetch('http://183.182.84.228:4005/pfdiffrems/');
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(remarks => {
        setremarks(remarks);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  







  const handleRemarkChanges = (event) => {
    const newValue = event.target.value;
    if (!newValue || /^\d+\.?\d*$/.test(newValue)) {
      setEditingRemark(newValue);
    }
  };
  
  const handleTextChanges = (event) => {
    const newValue = event.target.value;
    if (!newValue || /^\d+\.?\d*$/.test(newValue)) {
      setEditingText(newValue);
    }
  };
  
  
  const handleDateChanges = (event) => {
    setEditingDate(event.target.value);
  };  

  const editRemark = (id, remark, text, date) => {
    AuthService.editUserRemark(id, remark, text, date)
      .then(() => {
        console.log('Remarks updated successfully');
        alert('Remarks updated successfully');
        // After editing the remark, fetch the data from the 'pfdiffrems' URL.
        return fetch('http://183.182.84.228:4005/pfdiffrems/');
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(remarks => {
        setremarks(remarks);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error:', error);
      });
  };
  
















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
                @page {
                  margin: 0;
              }
              @media print {
                body {
                    margin-top: 0px;
                }
                .asd{
                  margin-top: 5px;
                }
                
            }
           
              </style>
            </head>
              <body >         
              <h4>Closer Information Report For Client Transfer</h4>
              
              <table  class="1">
       <thead>
         <tr>
           <th>  </th>
           <th>Closer Transfer</th>
           <th>Ucc</th>
           <th>Name</th>     
           <th>AP NAME/SERIES</th>
           <th>AP TERMINAL ID</th>
         </tr>
       </thead>
       <tbody>
    
         <tr>
           <th>INFO.</th>
           <td>${record.closer_trf}</td>
           <td>${(record.ucc|| 'NR')}</td>
           <td>${(record.clname|| 'NR')}</td>
           <td>${record.brname|| 'NR'}</td>
           <td>${(record.neoid||"Not alloted")},${(record.odinid||"Not alloted")}</td>
         </tr>
      
       </tbody>
     </table>

     <table  class="asd">
       <thead>
         <tr>
           <th>  </th>
           <th>KRA Status</th>
           <th>PTT Status</th>
           <th>KRA/PTT Reason</th>
           <th>Kotak KRA/PTT e-mail Sent</th>
<th>Kotak PTT e-mail Recd</th>
<th>Kotak KRA/PTT RM</th>
<th>Kotak KRA/PTT e-mail Sent Remarks</th>

         </tr>
       </thead>
       <tbody>
    
         <tr>
           <th>INFO.</th>
           <td>${record.ks_krasts}</td>
           <td>${record.ks_pttsts}</td>
           <td>${record.ks_krarem}</td>
           <td>${record.ks_emsent}</td>
<td>${record.ks_emrecd}</td>
<td>${record.ks_rm}</td>
<td>${record.ks_krptrem}</td>

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
      (record.ks_mobile && record.ks_mobile.toLowerCase().includes(term.toLowerCase().trim())) ||
      (record.ks_emailid && record.ks_emailid.toLowerCase().includes(term.toLowerCase().trim())) ||
      (record.es_mobile && record.es_mobile.toLowerCase().includes(term.toLowerCase().trim())) ||
      (record.es_email && record.es_email.toLowerCase().includes(term.toLowerCase().trim())) ||
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

  if (portStatus === "done") {
    filtered = filtered.filter((record) => record.es_pfreco.toLowerCase().includes('yes'));
  } else if (portStatus === "notDone") {
    filtered = filtered.filter((record) => record.es_pfreco.toLowerCase().includes('no'));
  } else if (portStatus === "blank") {
    filtered = filtered.filter((record) => !record.es_pfreco);
  }

  if (dateStatus === "done") {
    filtered = filtered.filter((record) => record.ksl_date);
  } else if (dateStatus === "notDone") {
    filtered = filtered.filter((record) => !record.ksl_date);
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
// const generateAndDownloadView = () => {
//   const data = [
//     ["S.No.", "Priority",	"BarCode",	"Branch",	"ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koshlandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
//         /* Add other headers as needed */],
//         ...filtered.map((record, index) => [
//           index + 1, record.priority,	record.barcode,	record.brcd,	record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
//           /* Add other fields as needed */
//         ]),
//     // ["priority", "barcode", "brcd", "ucc", "kslucc"],
//     // ...selectedRecords.map((record) => [record.priority, record.barcode, record.brcd, record.ucc, record.kslucc]),
//   ];

//   const ws = XLSX.utils.aoa_to_sheet(data);
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//   XLSX.writeFile(wb, "selected_records.xls");
// };


function generateAndDownloadView() {
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

  // Apply additional filters (closerTrfStatus, kslStatus, portStatus, dateStatus)
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

  if (portStatus === "done") {
    filtered = filtered.filter((record) => record.es_pfreco.toLowerCase().includes('yes'));
  } else if (portStatus === "notDone") {
    filtered = filtered.filter((record) => record.es_pfreco.toLowerCase().includes('no'));
  } else if (portStatus === "blank") {
    filtered = filtered.filter((record) => !record.es_pfreco);
  }

  if (dateStatus === "done") {
    filtered = filtered.filter((record) => record.ksl_date);
  } else if (dateStatus === "notDone") {
    filtered = filtered.filter((record) => !record.ksl_date);
  }

  // Create the downloadable view (e.g., Excel file) using the filtered records
  const data = [
       ["S.No.", "Priority",	"BarCode",	"Branch",	"ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koshlandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
        /* Add other headers as needed */],
        ...filtered.map((record, index) => [
          index + 1, record.priority,	record.barcode,	record.brcd,	record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
          /* Add other fields as needed */
        ]),
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "records.xls");
}




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

  const esdpsohexcel = () => {
    const data = [
      ["Name","Kslucc",	"ucc",	"bse_scrid",	"nse_scrid",	"isin",	"exch",	"acid",	"boid",	"psn",	"qty",	"stno",	"ageing",	"clgrate",	"haircut",	"cash_col",	"ncash_col",	"mktval",	"pldg_seg",	"tyopldg",	"pldgexp",	"corpact",	"markrec",	"loginid",	"creatdt",	"editdt",
    ],
    ...details.filter((record) => record.ucc === viewRecordDetails.ucc).map((record) =>[record.ucctext ,record.kslucc, 	record.ucc , 	record.bse_scrid , 	record.nse_scrid , 	record.fil1 , 	record.isin , 	record.exch , 	record.acid , 	record.boid , 	record.psn , 	record.qty , 	record.stno , 	record.ageing , 	record.clgrate , 	record.haircut , 	record.cash_col , 	record.ncash_col , 	record.mktval , 	record.pldg_seg , 	record.tyopldg , 	record.pldgexp , 	record.corpact , 	record.markrec , 	record.loginid , 	record.creatdt , 	record.editdt , 
      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "es_dpsoh.xls");
};





const pfdiffexcel = () => {
  const data = [
    ["PF_UNI",	"UCC",	"SCRIP",	"ISIN",	"OPN_PF_QTY",	"CLS_PF_QTY",	"HOLDING_QTY",	"DIFF",	"NO OF DIFF",	"STATUS",
  ],
  ...datas.filter((record) => record.UCC === viewRecordDetails.ucc).map((record) =>[record.PF_UNI,	record.UCC,	record.SCRIP,	record.ISIN,	record.OPN_PF_QTY,	record.CLS_PF_QTY,	record.HOLDING_QTY,	record.DIFF,	record.NO_OF_DIFF,	record.STATUS,
  ]),
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "pf_diff.xls");
};

function applyFilter1(record) {
  return record.closer_trf && record.es_pfreco.toLowerCase().includes('no') && !record.ksl_date;
}

// async function handleMail1() {
//   const filtered = filteredRecords(records);
//   if (!filtered || filtered.length === 0) return;


//   const message = `Dear Sir/Madam,

// Please find the attached file with the filtered AL Registration Form data.

// Regards,
// Thank You`;

//   const kslucc = records.kslucc;

//   // Get the current date
//   const currentDate = new Date();
//   const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

//   // Set the filename with kslucc and current date
//   const filename = `closer1_${formattedDate}.xlsx`;

//   // Generate XLSX file content with filtered data
//   const wsData = [
//     ["priority", "barcode", "brcd", "ucc", "kslucc"],
//     ...records.filter(applyFilter1).map((record) => [record.priority, record.barcode, record.brcd, record.ucc, record.kslucc]),
//   ];
//   const ws = XLSX.utils.aoa_to_sheet(wsData);
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//   const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
//   const xlsxFile = new Blob([wbout], { type: 'application/octet-stream' });

//   const file = new File([xlsxFile], filename, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

//   setMailerState((prevState) => ({
//     ...prevState,
//     name: 'record1.clname',
//     recipients: '',
//     message: message,
//     file: file,
//   }));
// }




function applyFilter2(record) {
  return record.closer_trf && !record.es_pfreco && !record.ksl_date;
}

// async function handleMail2() {
//   const filtered = filteredRecords(records);
//   if (!filtered || filtered.length === 0) return;


//   const message = `Dear Sir/Madam,

// Please find the attached file with the filtered AL Registration Form data.

// Regards,
// Thank You`;

//   const kslucc = records.kslucc;

//   // Get the current date
//   const currentDate = new Date();
//   const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

//   // Set the filename with kslucc and current date
//   const filename = `closer2_${formattedDate}.xlsx`;

//   // Generate XLSX file content with filtered data
//   const wsData = [
//     ["priority", "barcode", "brcd", "ucc", "kslucc"],
//     ...records.filter(applyFilter2).map((record) => [record.priority, record.barcode, record.brcd, record.ucc, record.kslucc]),
//   ];
//   const ws = XLSX.utils.aoa_to_sheet(wsData);
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//   const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
//   const xlsxFile = new Blob([wbout], { type: 'application/octet-stream' });

//   const file = new File([xlsxFile], filename, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

//   setMailerState((prevState) => ({
//     ...prevState,
//     name: 'record1.clname',
//     recipients: '',
//     message: message,
//     file: file,
//   }));
// }





function applyFilter3(record) {
  return record.closer_trf && record.es_pfreco.toLowerCase().includes('yes') && !record.ksl_date;
}


function applyFilter4(record) {
  const a = record.ks_pttsts !== 'UCC DONE' 
  const b = record.ks_krasts !== 'KRA DONE'
  return record.kslucc && a && b &&  !record.ac_closed;
}


function applyFilter5(record) {
  return record.barcode.length !== 14  && !record.kslucc && !record.ac_closed ;
}


function applyFilter6(record) {
  return record.barcode.length === 14  && !record.kslucc && !record.ac_closed ;
}

// async function handleMail3() {
//   const filtered = filteredRecords(records);
//   if (!filtered || filtered.length === 0) return;


//   const message = `Dear Sir/Madam,

// Please find the attached file with the filtered AL Registration Form data.

// Regards,
// Thank You`;

//   const kslucc = records.kslucc;

//   // Get the current date
//   const currentDate = new Date();
//   const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

//   // Set the filename with kslucc and current date
//   const filename = `closer3_${formattedDate}.xlsx`;

//   // Generate XLSX file content with filtered data
//   const wsData = [
//     ["priority", "barcode", "brcd", "ucc", "kslucc"],
//     ...records.filter(applyFilter3).map((record) => [record.priority, record.barcode, record.brcd, record.ucc, record.kslucc]),
//   ];
//   const ws = XLSX.utils.aoa_to_sheet(wsData);
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//   const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
//   const xlsxFile = new Blob([wbout], { type: 'application/octet-stream' });

//   const file = new File([xlsxFile], filename, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

//   setMailerState((prevState) => ({
//     ...prevState,
//     name: 'record1.clname',
//     recipients: '',
//     message: message,
//     file: file,
//   }));
// }


const mailexcel1 = () => {
  const filters = [applyFilter1, applyFilter2 , applyFilter3]; // Add your filters here
  const sheetNames = ['clsr-tally', 'clsr-pf-sts-not-exist', 'clsr-pf-diff']; // Add your sheet names here
  const Values = ['EXCLUSIVE DP CLOSER DONE, PORTFOIL STATUS NO DIFF. , NOT SENT TO KOTAK ', 'EXCLUSIVE DP CLOSER DONE, PORTFOIL STATUS NOT FOUND, NOT SENT TO KOTAK ', 'EXCLUSIVE DP CLOSER DONE, PORTFOIL IN DIFF, NOT SENT TO KOTAK '];
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  const wb = XLSX.utils.book_new();

  for (let i = 0; i < filters.length; i++) {
    const filtered = records.filter(filters[i]);

    const data = [
      [Values[i]],
      ["S.No.","Priority",	"Branch",	"ESUCC",	"KSUCC",	"ClientName",	"KSKRAStatus",	"KSPTTStatus",	"ESDPCloserTrftoKS",	"pfsentdate",	"pfrectify",	"ESPortFolioRecon",	"BranchName",
    ],
      ...filtered.map((record,index) => [index+1,record.priority ,	record.brcd ,	record.ucc ,	record.kslucc ,	record.clname ,	record.ks_krasts ,	record.ks_pttsts ,	record.closer_trf ,	record.ksl_date ,	record.kslstatus ,	record.es_pfreco ,	record.brname ,
      ]),    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetNames[i]);
  }

  XLSX.writeFile(wb, `Exclusive Closer Done , Kotak PortFolio Pending_${formattedDate}.xls`);
};


const mailexcel2 = () => {
  const filters = [applyFilter4, applyFilter5 , applyFilter6]; // Add your filters here
  const sheetNames = [ 'KSUCC-OPN-KRAPNDG' , 'ucc-without-barcode--sts-pndg' , 'ucc-with-barcode-sts-pndg']; // Add your sheet names here
  const Values = ['Exclusive - Kotak Ucc Open - KRA Pending', 'Exclusive - Esl Client Acitve & Kotak Ucc Status is Still Pending for Barcode Generation', 'Exclusive - Esl Client Acitve & Kotak Ucc Status is Still Pending & Barcode Already Generated'];
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  const wb = XLSX.utils.book_new();

  for (let i = 0; i < filters.length; i++) {
    const filtered = records.filter(filters[i]);

    const data = [
      [Values[i]],
      ["S.No.","Priority" ,	"BarCode" ,	"Branch" ,	"ES UCC" ,	"KS UCC" ,	"Client Name" ,	"KS KRA Status" ,	"KS PTT Status" ,	"KS KRA/PTT Remarks" ,	"KS KRA/PTT e-mail Sent" ,	"KS PTT e-mail Recd" ,	"KS KRA/PTT RM" ,	"KS KRA/PTT e-mail Sent Remarks" ,	"3i Status 1	","3i Status 2	","Other Status	","Multiple Email/Mobile"	,"Kotak Remark(s)" ,	"Category" ,	"Pan No" ,	"ES Ckyc No" ,	"KS DP Id" ,	"Ks Dp BoId" ,	"KS Client Sts" ,	"ES Client Sts" ,	"Back Office Current Status" ,	"Ks Email Sent to Client" ,	"Ks e-Sign Status" ,	"Ks e-Sign Remarks" ,	"KS e-Mail ID" ,	"ES e-Mail ID" ,	"KS/ES e-Mail ID Match" ,	"Ks Mobile No." ,	"Es Mobile No." ,	"Ks / Es Mobile Match" ,	"Es Net Brokerage" ,	"KS Lst Trd" ,	"ES Lst Trd" ,	"ES DP Closer Trf to KS" ,	"pf sent date" ,	"pf rectify" ,	"ES Mtf Position" ,	"ES F&o Open Position" ,	"ES Margin" ,	"ES Ledger Balance" ,	"ES Ledger Balance" ,	"ES DP Holding" ,	"ES Cash Colletral" ,	"Non-CashColleteral" ,	"Es Pledge Value" ,	"Es Corp Action" ,	"ES PortFolio Recon" ,	"Branch Name" ,	"Family Group" ,	"Report Date" ,
    ],
      ...filtered.map((record,index) => [index+1,record.priority ,	record.barcode ,	record.brcd ,	record.ucc ,	record.kslucc ,	record.clname , 	record.ks_krasts ,	record.ks_pttsts ,	record.ks_krarem ,	record.ks_emsent ,	record.ks_emrecd ,	record.ks_rm ,	record.ks_krptrem ,	record.sts1_3i	,record.sts2_3i	,record.ks_othsts	,record.mult_emmo	,record.ks_allrem,	record.catg ,	record.panno ,	record.eckyc_no ,	record.ks_dpid ,	record.ks_dpboid ,	record.ks_clsts ,	record.es_clsts ,	record.bo_clsts ,	record.ks_emtocl ,	record.ks_esign ,	record.ks_essts ,	record.ks_emailid ,	record.es_email ,	record.is_mtch_em ,	record.ks_mobile ,	record.es_mobile ,	record.is_mtch_mo ,	record.es_netbkg ,	record.ks_lstrdt ,	record.es_lstrdt ,	record.closer_trf ,	record.ksl_date ,	record.kslstatus ,	record.es_mtfpos ,	record.es_opnpos ,	record.es_margin ,	record.es_ledbal ,	record.es_dpledg ,	record.es_dphldg ,	record.es_ccol ,	record.es_nccol ,	record.es_pledval ,	record.es_corpact ,	record.es_pfreco ,	record.brname ,	record.family_grp ,	record.run_date ,
      ]),    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetNames[i]);
  }

  XLSX.writeFile(wb, `Exclusive Active But Not Tradable in Kotak_${formattedDate}.xls`);
};





















//filters
function filter9(record){
  const b = record.ks_krasts.trim().toLowerCase() !== 'kra done';
  return  record.ac_closed === ''  &&   record.ks_esign.startsWith('Existing') &&  b ;
}

function filter1(record){
  const status = record.ks_pttsts.trim().toLowerCase();
 const c = status !== 'ucc done';
  return record.ac_closed === '' && record.kslucc &&  c ;
}

function filter2(record){
  const b = record.ks_krasts.trim().toLowerCase() !== 'kra done';
  return record.ac_closed === '' && record.kslucc && b ;
}
function filter3(record){
  const b = record.ks_pttsts.startsWith('UCC Pending');
  return record.ac_closed === ''  && (filter1(record) || filter2(record) && b);
}
function filter4(record){
  const b = filter1(record) || filter2(record);
  return  b;
}
function filter5(record){
  const a = record.sts1_3i !== '';
  const b = !record.sts1_3i.startsWith('DVU Form Return');
  const c = !record.sts1_3i.startsWith('Not Send to 3i');
  const d = !record.sts1_3i.toLowerCase().includes('super qc done');;
  return record.kslucc === '' && a && b && c && d; // Use '&&' to combine conditions
}
function filter6(record){
  const a = record.kslucc === '';
  const b = record.sts1_3i.startsWith('CODED');
  return record.ac_closed === ''  && b && a // Use '&&' to combine conditions
}
function filter7(record){
  // const a = record.ks_sts1 && !record.ks_sts1.startsWith('PENDING FROM RAHUL');
  const b = record.ks_sts1 && record.ks_sts1.startsWith('FORM DISPATCH');
  const c = record.ks_sts1 && record.ks_sts1.startsWith('KSL');
  const d = record.ks_sts1 && record.ks_sts1.startsWith('PENDING FROM KSL');
  const e = record.ks_sts1 && record.ks_sts1.startsWith('Pending With KSL');
  const f = record.ks_sts1 && record.ks_sts1.startsWith('KOTAK');
  return  b || c || d || e || f  ;
}
function filter8(record){
  const a = record.sts1_3i.startsWith('DVU Form Return')
  const b = record.sts1_3i.startsWith('Not Send to 3i')
  const c = record.sts1_3i === ''
  return a || b || c;
}
function filter10(record){
  const a = record.ks_sts1 && record.ks_sts1.startsWith('PENDING FROM RAHUL');
  const b = record.ks_sts1 && record.ks_sts1.startsWith('FORM DISPATCH');
  const c = record.ks_sts1 && record.ks_sts1.startsWith('KSL');
  const d = record.ks_sts1 && record.ks_sts1.startsWith('PENDING FROM KSL');
  const e = record.ks_sts1 && record.ks_sts1.startsWith('Pending With KSL');
  const f = record.ks_sts1 && record.ks_sts1.startsWith('KOTAK');
  return a || b || c || d || e || f  ;
}
function filter13 (record){
  const b = record.ks_pttsts.trim().toLowerCase() === 'ucc pending';
  const d = record.ks_pttsts.trim().toLowerCase() === 'ucc not done';
  return  b || d;
}
function filter14 (record){
  const b = record.ks_krasts.trim().toLowerCase() === 'kra pending';
  const d = record.ks_krasts.trim().toLowerCase() === 'kra not done';
  return  b || d;
}
function filter141(record){
  const a = filter1(record) || filter2(record)
  const b = record.ks_pttsts.trim().toLowerCase() === 'ucc done'
  const c = !record.ks_krarem.toLowerCase().includes('dormant');
  return a && b && c
}
function filter123(record){
  const a = record.ks_pttsts.trim().toLowerCase() === 'ucc done';
  const b = record.ks_krasts.trim().toLowerCase() === 'kra done';
  const c = !record.es_dpboid.startsWith('12043300');
  const d = record.ks_lstrdt
  const e = record.es_lstrdt
  return record.ac_closed === '' && record.kslucc && a && b && record.closer_trf === '' && c && d && e;
}
























// tradeable account
function applyFilter7(record) {
  const a = record.ks_pttsts.trim().toLowerCase() === 'ucc done';
  const b = record.ks_krasts.trim().toLowerCase() === 'kra done';
  return  record.ac_closed === ''  &&  record.kslucc && a && b ;
}

function applyFilter10(record) {
  const a = record.ks_pttsts.trim().toLowerCase() === 'ucc done';
  const b = record.ks_krasts.trim().toLowerCase() === 'kra done';
  return record.ac_closed === ''  && record.kslucc && a && b && record.closer_trf === '' && !filter123(record);
}
function applyFilter24(record) {
  const a = record.ks_pttsts.trim().toLowerCase() === 'ucc done';
  const b = record.ks_krasts.trim().toLowerCase() === 'kra done';
  return record.ac_closed === ''  && record.kslucc && a && b && record.closer_trf || filter123(record);
}
function applyFilter26(record) {
  const a = record.ks_pttsts.trim().toLowerCase() === 'ucc done';
  const b = record.ks_krasts.trim().toLowerCase() === 'kra done';
  const c = record.es_dpboid && record.es_dpboid.startsWith('12043300');
  return record.ac_closed === ''  && record.kslucc && a && b  && record.closer_trf === '' && c;
}
function applyFilter27(record) {
  const a = record.ks_pttsts.trim().toLowerCase() === 'ucc done';
  const b = record.ks_krasts.trim().toLowerCase() === 'kra done';
  const c = !record.es_dpboid.startsWith('12043300');
  return record.ac_closed === ''  && record.kslucc && a && b  && record.closer_trf === '' && c && !filter123(record);
}















// not tradeable account
function applyFilter9(record) {
  // const a = !record.ks_esign.startsWith('Existing')
  return filter1(record) || filter2(record) && record.ac_closed === '' ;
}
function applyFilter17(record) {
  const a = record.ks_krasts.trim().toLowerCase() === 'kra not done'
  const b = record.ks_krasts.trim().toLowerCase() === 'kra pending'
  const d = !record.ks_pttsts.toLowerCase().includes('ucc not done')
  return filter141(record) &&( a || b) && record.ac_closed === '' && d  ;
}
function applyFilter38(record) {
  const a = !record.ks_krasts.toLowerCase().includes('kra not done')
  const b = !record.ks_krasts.toLowerCase().includes('kra pending')
  return record.ac_closed === ''  && applyFilter36(record) && a && b ;
}
function applyFilter39(record) {
  const a = filter1(record) || filter2(record);
  const b = record.ks_pttsts.trim().toLowerCase() === 'ucc pending';
  const d = record.ks_pttsts.trim().toLowerCase() === 'ucc not done';
  const c = !record.ks_krarem.toLowerCase().includes('dormant');
  const e = record.ks_clsts && !record.ks_clsts.toLowerCase().includes('c');
  return record.ac_closed === '' && a && c && filter13(record) ;
}
function applyFilter40(record) {
  const a = filter1(record) || filter2(record)
  const b = record.ks_pttsts.trim().toLowerCase() === 'ucc pending'
  const c = !record.ks_krarem.toLowerCase().includes('dormant');
  const e = record.ks_clsts && !record.ks_clsts.toLowerCase().includes('c');
  return record.ac_closed === ''  && c &&  a && filter13(record) && record.mult_emmo.startsWith('Multiple M&M')  ;
}
function applyFilter41(record) {
  const a = filter1(record) || filter2(record)
  const b = record.ks_pttsts.trim().toLowerCase() === 'ucc pending'
  const c = !record.ks_krarem.toLowerCase().includes('dormant');
  const e = record.ks_clsts && !record.ks_clsts.toLowerCase().includes('c');
  return record.ac_closed === ''  && c &&  a && filter13(record)  && filter14(record)  && record.ks_pttsts.trim().toLowerCase() !== 'ucc done' && !record.mult_emmo.startsWith('Multiple M&M') ;
}
function applyFilter42(record) {
  const a = filter1(record) || filter2(record)
  const b = record.ks_pttsts.trim().toLowerCase() === 'ucc pending'
  const c = !record.ks_krarem.toLowerCase().includes('dormant');
  const e = record.ks_clsts && !record.ks_clsts.toLowerCase().includes('c');
  return record.ac_closed === ''  && c &&  a && filter13(record) && record.ks_krasts.trim().toLowerCase() !== 'kra pending' && record.ks_krasts.trim().toLowerCase() !== 'kra not done' && record.ks_krasts.trim().toLowerCase() !== ''  && record.mult_emmo === '';
}
function applyFilter423(record) {
  const a = filter1(record) || filter2(record)
  const b = record.ks_pttsts.trim().toLowerCase() === 'ucc pending'
  const c = !record.ks_krarem.toLowerCase().includes('dormant');
  const e = record.ks_clsts && !record.ks_clsts.toLowerCase().includes('c');
  return record.ac_closed === ''  && c &&  a && filter13(record) && record.ks_krasts.trim().toLowerCase() === ''  && record.mult_emmo === ''  ;
}
function applyFilter36(record) {
  const a = filter1(record) || filter2(record)
  const b = record.ks_pttsts.toLowerCase().includes('ucc done') 
  const c = !record.ks_krarem.toLowerCase().includes('dormant');
  const d = !record.ks_pttsts.toLowerCase().includes('ucc not done')
  return record.ac_closed === '' && c && a && b  && d ;
}
function applyFilter29(record) {
  const c = !record.ks_krarem.toLowerCase().includes('dormant');
  return record.ac_closed === ''  && c && filter4(record) && record.ks_pttsts === '';
}
function applyFilter65(record) {
  const a = applyFilter9(record)
  const c = record.ks_krarem.toLowerCase().includes('dormant');
  return a && c;
}
//account close by user kotak
function applyFilter66(record) {
  const a = applyFilter9(record)
  const c = record.ks_krarem.toLowerCase().includes('dormant');
  const e = record.ks_clsts &&  record.ks_clsts.toLowerCase().includes('c');
  return a && e;
}











//superqc
function applyFilter19(record) {
  const a = record.ks_emtocl.trim().toLowerCase() === 'no';
  const b = !record.ks_esign.startsWith('Existing');
  const c = record.ac_closed === ''
  return applyFilter44(record) && a && b && c ;
}
function applyFilter31(record) {
  const a = record.ks_emtocl.trim().toLowerCase() === 'yes';
  const b = !record.ks_esign.startsWith('Existing');
  return record.ac_closed === ''  && applyFilter44(record) && a && b ;
}

function applyFilter32(record) {
  const a = record.ks_emtocl.trim().toLowerCase() === 'yes';
  const b = record.ks_esign.trim().toLowerCase() === 'failure';
  return record.ac_closed === ''  && applyFilter44(record) && a && b ;
}
function applyFilter44(record) {
  return record.ac_closed === '' && record.kslucc === '' && record.sts1_3i.toLowerCase().includes('super qc done'); ;
}

function applyFilter45(record) {
  const a = record.ks_emtocl.trim().toLowerCase() === 'yes';
  const b = record.ks_esign.trim().toLowerCase() === 'success';
  return record.ac_closed === ''  && applyFilter44(record) && a && b ;
}
function applyFilter46(record) {
  const a = record.ks_emtocl.trim().toLowerCase() === 'yes';
  const b = record.ks_esign === '';
  return record.ac_closed === ''  && applyFilter44(record) && a && b ;
}










//pending with 3i
function applyFilter21(record) {
  return record.ac_closed === ''  && filter5(record) // Use '&&' to combine conditions
}













//hold at kotak
function applyFilter49(record) {
  const a = !record.ks_esign.startsWith('Existing')
  const b = record.ac_closed === ''
  return record.kslucc === '' && b && a && filter8(record) &&  filter7(record) ;
}
function applyFilter52(record) {
  const a = !record.ks_esign.startsWith('Existing')
  const b = record.ac_closed === ''
  const c = record.ks_sts1 && record.ks_sts1 && record.ks_sts1.startsWith('FORM DISPATCH')
  return record.kslucc === '' && b  && a && filter8(record) &&  c ;
}
function applyFilter53(record) {
  const a = !record.ks_esign.startsWith('Existing')
  const b = record.ac_closed === ''
  const c = record.ks_sts1 && record.ks_sts1 && record.ks_sts1.startsWith('KSL')
  return record.kslucc === '' && b  && a && filter8(record) &&  c ;
}
function applyFilter54(record) {
  const a = !record.ks_esign.startsWith('Existing')
  const b = record.ac_closed === ''
  const c =  record.ks_sts1 && record.ks_sts1 && record.ks_sts1.startsWith('PENDING FROM KSL')
  return record.kslucc === '' && b  && a && filter8(record) &&  c ;
}
function applyFilter55(record) {
  const a = !record.ks_esign.startsWith('Existing')
  const b = record.ac_closed === ''
  const c = record.ks_sts1 && record.ks_sts1 && record.ks_sts1.startsWith('Pending With KSL')
  return record.kslucc === '' && b  && a && filter8(record) &&  c ;
}
function applyFilter56(record) {
  const a = !record.ks_esign.startsWith('Existing')
  const b = record.ac_closed === ''
  const c = record.ks_sts1 && record.ks_sts1 && record.ks_sts1.startsWith('KOTAK')
  return record.kslucc === '' && b  && a && filter8(record) &&  c ;
}













//PENDING FROM RAHUL (Non-Individual)
function applyFilter51(record) {
  const a = !record.ks_esign.startsWith('Existing')
  const b = record.ac_closed === ''
  const c = record.ks_sts1 && record.ks_sts1 && record.ks_sts1.startsWith('PENDING FROM RAHUL');
  return record.kslucc === '' && b  && a && filter8(record) &&  c ;
}













//hold at exclusive
function applyFilter50(record) {
  const a = !record.ks_esign.startsWith('Existing')
  const b = record.ac_closed === ''
  const c = !filter10(record)
  return record.kslucc === '' && b && a &&  filter8(record) && c ;
}
function applyFilter57(record) {
  const a = !record.ks_esign.startsWith('Existing')
  const b = record.ac_closed === ''
  const c = record.ks_sts1 && record.ks_sts1 && record.ks_sts1.startsWith('PENDING FROM EXCLUSIVE')
  return record.kslucc === '' && b  && a && filter8(record) &&  c ;
}
function applyFilter58(record) {
  const a = !record.ks_esign.startsWith('Existing')
  const b = record.ac_closed === ''
  const c = record.ks_sts1 && record.ks_sts1 && record.ks_sts1.startsWith('READY')
  return record.kslucc === '' && b  && a && filter8(record) &&  c ;
}
function applyFilter59(record) {
  const a = !record.ks_esign.startsWith('Existing')
  const b = record.ac_closed === ''
  const c = record.ks_sts1 && record.ks_sts1.startsWith('Close Account')
  return record.kslucc === '' && b  && a && filter8(record) &&  c ;
}
function applyFilter60(record) {
  const a = !record.ks_esign.startsWith('Existing')
  const b = record.ac_closed === ''
  const c = !record.ks_sts1.toLowerCase().includes('pending from exclusive') && !record.ks_sts1.toLowerCase().includes('ready') && !record.ks_sts1.toLowerCase().includes('close account')
  const d = !filter10(record)
  return record.kslucc === '' && b  && a && filter8(record) &&  c && d ;
}
function applyFilter8(record) {
  const a = record.ks_pttsts.trim().toLowerCase() !== 'ucc pending';
  return record.kslucc === '' && filter9(record)  && a ;
}











//CLIENTS NOT INTRESTED
function applyFilter47(record) {
  const a = record.ac_closed.trim().toLowerCase() === 'yes';
  return  a ;
}







// closer info pending accounts
function applyFilter43(record) {
  return record.ac_closed === ''  &&  record.kslucc === '' ;
}







// priority vise clients summery
function applyFilter61(record) {
  return ['A', 'U', 'TA', 'TU'].some(prefix => record.priority.startsWith(prefix));
}

function applyFilter62(record) {
  return ['B', 'TB'].some(prefix => record.priority.startsWith(prefix));
}

function applyFilter63(record) {
  const a = applyFilter61(record);
  return a && record.kslucc === ''
}
function applyFilter64(record) {
  const a = applyFilter62(record);
  return a && record.kslucc === ''
}















function applyFilter11(record) {
  return record.ac_closed === ''  && record.ks_krasts === 'kra pending'
  ;
}

function applyFilter12(record) {
  const a = !record.ks_esign.startsWith('Existing')
  return record.ac_closed === ''  &&  a && record.ks_allrem && !applyFilter9(record) && !applyFilter7(record);
}


function applyFilter13(record) {
  const a = record.ks_emtocl.trim().toLowerCase() === 'yes';
  const b = record.ks_esign.trim().toLowerCase() === 'success';
  return record.ac_closed === ''  && a && b;
}

function applyFilter14(record) {

  return record.ac_closed === ''  && record.kslucc;
}
function applyFilter15(record) {
  const a = record.ks_emtocl.trim().toLowerCase() === 'yes';
  const b = record.ks_esign.trim().toLowerCase() === 'failure';
  const c = record.ks_esign.trim().toLowerCase() === 'success';
  const d = record.ks_esign === '' ;
  return record.ac_closed === ''  &&  a && (b || c || d) && !record.kslucc && !record.ks_allrem;
}




function applyFilter16(record) {
  const a = record.sts1_3i === ''
  const b = record.sts1_3i.startsWith('DVU Form Return')
  return record.ac_closed === '' && record.kslucc === ''  &&  a || b ;
}







function applyFilter18(record) {
  return record.ac_closed === ''  &&  applyFilter9 && record.ks_krasts.trim().toLowerCase() !== 'kra pending' && record.mult_emmo.startsWith('Multiple M&M')  ;
}
function applyFilter20(record) {
  return record.ac_closed === ''  &&  record.kslucc && record.ks_krasts.trim().toLowerCase() !== 'kra done' &&  !record.mult_emmo.startsWith('Multiple M&M')  ;
}



function applyFilter22(record) {
  const a = !record.ks_esign.includes('Existing')
  return record.ac_closed === ''  &&  record.sts1_3i.startsWith('Not Send to 3i') && a ;
}
function applyFilter23(record) {
  const a = record.sts1_3i.startsWith('DVU Form Return')
  return record.ac_closed === ''  &&  a;
}


function applyFilter25(record) {
  const a = record.ks_pttsts.trim().toLowerCase() !== 'ucc done';
  return record.ac_closed === ''  && applyFilter9 && a;
}




function applyFilter28(record) {
  const b = record.ks_pttsts !== ''
  return record.ac_closed === ''  && (filter3(record) && b && !applyFilter18 && record.ks_krasts.trim().toLowerCase() !== 'kra pending');
}


//data entry pending
function applyFilter30(record) {
  const a = record.sts1_3i.startsWith('CODED')
  return record.ac_closed === '' && record.kslucc === ''  &&  a ;
}




function applyFilter33(record) {
  const a = record.sts1_3i === ''
  return record.ac_closed === ''  &&  a && record.kslucc ==='' ;
}
function applyFilter34(record) {
  const a = record.sts1_3i === ''
  return record.ac_closed === ''  && record.sts1_3i === '' && record.kslucc ==='' ;
}

function applyFilter35(record) {
  return record.ac_closed === ''  &&  applyFilter9 && record.mult_emmo.startsWith('Multiple M&M')  ;
}

function applyFilter37(record) {
  const a = filter1(record) || filter2(record)
  const b = record.ks_pttsts.trim().toLowerCase() === 'ucc done'
  return record.ac_closed === ''  &&  a && b && record.mult_emmo.startsWith('Multiple M&M')  ;
}














function applyFilter48(record){
  const a = !record.ks_esign.startsWith('Existing')
  return record.kslucc === '' && record.ac_closed === '' && a && filter8(record)
}










// function applyFilter61(record) {
//   const a = record.priority.startsWith('A')
//   const b = record.priority.startsWith('U')
//   const c = record.priority.startsWith('TA')
//   const d = record.priority.startsWith('TU')
//   return  b  || a ||  c || d;
// }

// function applyFilter62(record) {
//   const a = record.priority.startsWith('B')
//   const b = record.priority.startsWith('TB')
//   return  b  || a ;
// }

// function applyFilter63(record) {
//   const a = record.kslucc
//   const b = record.closer_trf
//   const c = record.closer_trf === ''
//   return applyFilter61(record) && a ;
// }
// function applyFilter64(record) {
//   const a = record.kslucc
//   const b = record.closer_trf
//   const c = record.closer_trf === ''
//   return applyFilter61(record) && a && b ;
// }


function applyFilter67(record) {
  const a = record.kslucc
  const b = record.closer_trf
  const c = record.closer_trf === ''
  return applyFilter62(record) && a && b ;
}
function applyFilter68(record) {
  const a = record.kslucc
  const b = record.closer_trf
  const c = record.closer_trf === ''
  return applyFilter62(record) && a && c ;
}











// const dormant = () => {
//   const filter = applyFilter65; // Use your filter here
//     const sheetName = 'Dormant Accounts'; // Use your sheet name here
//     const Value = 'Dormant Accounts'; // Use your value here
//     const currentDate = new Date();
//     const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
//     const wb = XLSX.utils.book_new();
  
//     const filtered = records.filter(filter);
  
//     const data = [
//       [Value],
//       ["S.No.","Priority",	"BarCode",	"Branch","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
//     ],
//       ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
//       ]),
//     ];
  
//     const ws = XLSX.utils.aoa_to_sheet(data);
//     XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
//     XLSX.writeFile(wb, `Dormant Accounts_${formattedDate}.xls`);
//   };



const dormant = () => {
  const filter = applyFilter65; // Use your filter here
  const sheetName = 'Dormant Accounts'; // Use your sheet name here
  const Value = 'Dormant Accounts'; // Use your value here
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  const wb = XLSX.utils.book_new();

  // const filtered = records.filter(filter).sort((a, b) => a.ucc.localeCompare(b.ucc)); // Sorting by ucc

  const filtered = records.filter(filter).sort((a, b) => {
    // First sort by es_locnid
    const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
    if (locnidComparison !== 0) {
      return locnidComparison;
    }

    // If es_locnid is the same, sort by clname
    return a.clname.localeCompare(b.clname);
  });

  const data = [
    [Value],
    ["S.No.", "Priority", "BarCode", "Branch","LocationID", "Dormant :e-mail Sent", "Dormant :Upcoming Days", "ES UCC", "KS UCC", "Client Name", "Pan No", "KS KRA Status", "KS PTT Status", "KS KRA/PTT Remarks", "KS KRA/PTT e-mail Sent", "KS PTT e-mail Recd", "KS KRA/PTT RM", "KS KRA/PTT e-mail Sent Remarks", "KS e-Mail ID", "Ks Mobile No.", "Ks Email Sent to Client", "Ks e-Sign Status", "Ks e-Sign Remarks", "Back Office Current Status", "3i Status 1", "3i Status 2", "Other Status", "Multiple Email/Mobile", "Koslandra Status", "Kotak Remark(s)", "Report Date", "Account Closed"
    ],
    ...filtered.map((record, index) => [index + 1, record.priority, record.barcode, record.brcd, record.ems_ddt, record.nod_dormnt, record.ucc, record.kslucc, record.clname, record.panno, record.ks_krasts, record.ks_pttsts, record.ks_krarem, record.ks_emsent, record.ks_emrecd, record.ks_rm, record.ks_krptrem, record.ks_emailid, record.ks_mobile, record.ks_emtocl, record.ks_esign, record.ks_essts, record.bo_clsts, record.sts1_3i, record.sts2_3i, record.ks_othsts, record.mult_emmo, record.ks_sts1, record.ks_allrem, record.run_date, record.ac_closed
    ]),
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  XLSX.writeFile(wb, `Dormant Accounts_${formattedDate}.xls`);
};





const ac_closed_user = () => {
  const filter = applyFilter66; // Use your filter here
    const sheetName = 'Account Close by user'; // Use your sheet name here
    const Value = 'Account Close by user'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    // const filtered = records.filter(filter);


    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Account Close by user_${formattedDate}.xls`);
  };









const ac_closed = () => {
  const filter = applyFilter47; // Use your filter here
    const sheetName = 'CLIENTS NOT INTRESTED'; // Use your sheet name here
    const Value = 'CLIENTS NOT INTRESTED'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    // const filtered = records.filter(filter);


    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `CLIENTS NOT INTRESTED_${formattedDate}.xls`);
  };



const tradeableacc = () => {
  const filter = applyFilter7; // Use your filter here
    const sheetName = 'Tradeable Accounts'; // Use your sheet name here
    const Value = 'Kotak Account Open ,KRA Done ,Permitted to Trade'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    // const filtered = records.filter(filter);

    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Tradeable Accounts_${formattedDate}.xls`);
  };




  const closerdone = () => {
    const filter = applyFilter24; // Use your filter here
    const sheetName = 'Closer Transfer Done'; // Use your sheet name here
    const Value = 'Kotak Account Open ,KRA Done ,Permitted to Trade, Closer Transfer Done'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    // const filtered = records.filter(filter);


    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Closer Transfer Done_${formattedDate}.xls`);
  };




  const closerpending = () => {
    const filter = applyFilter10; // Use your filter here
    const sheetName = 'Closer Transfer Pending'; // Use your sheet name here
    const Value = 'Kotak Account Open ,KRA Done ,Permitted to Trade , Closer Transfer Pending'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    // const filtered = records.filter(filter);


    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Closer Transfer Pending_${formattedDate}.xls`);
  };




  const esldp = () => {
    const filter = applyFilter26; // Use your filter here
    const sheetName = 'Esl Dp Pending'; // Use your sheet name here
    const Value = 'Kotak Account Open ,KRA Done ,Permitted to Trade,Esl Dp Pending'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    // const filtered = records.filter(filter);

    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Esl Dp Pending_${formattedDate}.xls`);
  };



  const otherdp = () => {
    const filter = applyFilter27; // Use your filter here
    const sheetName = 'Other Dp Pending'; // Use your sheet name here
    const Value = 'Kotak Account Open ,KRA Done ,Permitted to Trade,Other Dp Pending'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    // const filtered = records.filter(filter);


    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Other Dp Pending_${formattedDate}.xls`);
  };



  const nottrabeableacc = () => {
    const filter = applyFilter9; // Use your filter here
    const sheetName = 'Not Tradeable Accounts'; // Use your sheet name here
    const Value = 'Kotak Account Not Open ,!KRA Done ,!Permitted to Trade'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    // const filtered = records.filter(filter);


    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Not Tradeable Accounts_${formattedDate}.xls`);
  };


  const uccdone = () => {
    const filter = applyFilter36; // Use your filter here
    const sheetName = 'UCC Done'; // Use your sheet name here
    const Value = 'Kotak Account Not Open ,Not KRA Done ,Not Permitted to Trade ,UCC Done'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    // const filtered = records.filter(filter);



    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Ucc Done_${formattedDate}.xls`);
  };



  const krapending = () => {
    const filter = applyFilter17; // Use your filter here
    const sheetName = 'KRA Pending'; // Use your sheet name here
    const Value = 'Kotak Account Not Open ,Not KRA Done ,Not Permitted to Trade, UCC Done , KRA Pending'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    // const filtered = records.filter(filter);



    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Not Tradeable Accounts_${formattedDate}.xls`);
  };


  const uccdoneremaning = () => {
    const filter = applyFilter38; // Use your filter here
    const sheetName = 'Ucc Done Remaning'; // Use your sheet name here
    const Value = 'Kotak Account Not Open ,!KRA Done ,!Permitted to Trade,UCC Done , Remaning'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    // const filtered = records.filter(filter);


    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Remaning_${formattedDate}.xls`);
  };



  const uccpending = () => {
    const filter = applyFilter39; // Use your filter here
    const sheetName = 'UCC Pending'; // Use your sheet name here
    const Value = 'Kotak Account Not Open ,!KRA Done ,!Permitted to Trade,UCC Pending'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    // const filtered = records.filter(filter);



    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `UCC Pending_${formattedDate}.xls`);
  };




  const multiplemm = () => {
    const filter = applyFilter40; // Use your filter here
    const sheetName = 'Multiple Mail and Mobile'; // Use your sheet name here
    const Value = 'Kotak Account Not Open ,!KRA Done ,!Permitted to Trade, Multiple Mail and Mobile'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    // const filtered = records.filter(filter);



    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Multiple Mail and Mobile_${formattedDate}.xls`);
  };


  const uccpendingkrapending = () => {
    const filter = applyFilter41; // Use your filter here
    const sheetName = 'KRA Pending'; // Use your sheet name here
    const Value = 'Kotak Account Not Open ,!KRA Done ,!Permitted to Trade,UCC Pending , KRA Pending'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    // const filtered = records.filter(filter);



    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `KRA Pending_${formattedDate}.xls`);
  };



  const uccpendingremaning = () => {
    const filter = applyFilter42; // Use your filter here
    const sheetName = 'Remaning'; // Use your sheet name here
    const Value = 'Kotak Account Not Open ,!KRA Done ,!Permitted to Trade,UCC Pending , Remaning'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    // const filtered = records.filter(filter);



    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Remaning_${formattedDate}.xls`);
  };




  const nottrabeableaccother = () => {
    const filter = applyFilter29; // Use your filter here
    const sheetName = 'Not Tradeable Accounts Remaning'; // Use your sheet name here
    const Value = 'Kotak Account Not Open ,!KRA Done ,!Permitted to Trade , Remaning'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    // const filtered = records.filter(filter);



    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Not_Tradeable_Accounts_and_Remaning_${formattedDate}.xls`);
  };



  const dvupending = () => {
    const filter = applyFilter21; // Use your filter here
    const sheetName = 'DVU Pending'; // Use your sheet name here
    const Value = 'DVU Pending'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    // const filtered = records.filter(filter);



    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `DVU Pending_${formattedDate}.xls`);
  };


  const dataentrypending = () => {
    const filter = applyFilter30; // Use your filter here
    const sheetName = 'Data Entry Pending'; // Use your sheet name here
    const Value = 'Data Entry Pending'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    // const filtered = records.filter(filter);



    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Data Entry Pending_${formattedDate}.xls`);
  };

  const esignpending = () => {
    const filter = applyFilter31; // Use your filter here
    const sheetName = 'Esign Pending'; // Use your sheet name here
    const Value = 'Esign Pending'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    // const filtered = records.filter(filter);


    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Esign Pending_${formattedDate}.xls`);
  };


  const esignfail = () => {
    const filter = applyFilter32; // Use your filter here
    const sheetName = 'Esign Failure'; // Use your sheet name here
    const Value = 'Esign Failure'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    // const filtered = records.filter(filter);


    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Esign Failure_${formattedDate}.xls`);
  };



  const esignother = () => {
    const filter = applyFilter46; // Use your filter here
    const sheetName = 'Esign Client Not Attemted'; // Use your sheet name here
    const Value = 'Esign Client Not Attemted'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    const filtered = records.filter(filter);
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Esign Client Not Attemted_${formattedDate}.xls`);
  };

  const esignnucc = () => {
    const filter = applyFilter45; // Use your filter here
    const sheetName = 'Esign Success But Account Not Open'; // Use your sheet name here
    const Value = 'Esign Success But Account Not Open'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Esign Success But Account Not Open_${formattedDate}.xls`);
  };

  const sqcdone = () => {
    const filter = applyFilter44; // Use your filter here
    const sheetName = 'Super QC Done'; // Use your sheet name here
    const Value = 'Super QC Done'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Super QC Done_${formattedDate}.xls`);
  };

  const esignnotsend = () => {
    const filter = applyFilter19; // Use your filter here
    const sheetName = 'Esign Not Send'; // Use your sheet name here
    const Value = 'Esign Not Send'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Esign Not Send_${formattedDate}.xls`);
  };




  const holdatksl = () => {
    const filter = applyFilter49; // Use your filter here
    const sheetName = 'Form Lying With KSL'; // Use your sheet name here
    const Value = 'Form Lying With KSL'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Form Lying With KSL_${formattedDate}.xls`);
  };


  const holdatEsl = () => {
    const filter = applyFilter50; // Use your filter here
    const sheetName = 'Form Lying With Exclusive'; // Use your sheet name here
    const Value = 'Form Lying With Exclusive'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Form Lying With Exclusive_${formattedDate}.xls`);
  };


  const existing = () => {
    const filter = applyFilter8; // Use your filter here
    const sheetName = 'Exsisting Accounts'; // Use your sheet name here
    const Value = 'Kotak Exsisting Accounts'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Exsisting Accounts_${formattedDate}.xls`);
  };



  
  const closerinfo = () => {
    const filter = applyFilter8; // Use your filter here
    const sheetName = 'Closer infomation'; // Use your sheet name here
    const Value = 'Closer infomation'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Closer infomation_${formattedDate}.xls`);
  };

  const closerinfopending = () => {
    const filter = applyFilter43; // Use your filter here
    const sheetName = 'Pending Accounts'; // Use your sheet name here
    const Value = 'Closer infomation Pending Accounts'; // Use your value here
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
  
    const filtered = records.filter(filter).sort((a, b) => {
      // First sort by es_locnid
      const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
      if (locnidComparison !== 0) {
        return locnidComparison;
      }
  
      // If es_locnid is the same, sort by clname
      return a.clname.localeCompare(b.clname);
    });
  
    const data = [
      [Value],
      ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `Pending Accounts_${formattedDate}.xls`);
  };





  const dormants = async () => {
const sheetName = 'Send Mails Dormant Accounts'; // Use your sheet name here
  const Value = 'Send Mails Dormant Accounts'; // Use your value here
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  const wb = XLSX.utils.book_new();

  // Create a Set of kslucc values from userRecords
  const userKsluccSet = new Set(userRecords.map(record => record.kslucc));

   // Create a Set of kslucc values from userRecords and map kslucc to userDate
   const userKsluccMap = new Map(userRecords.map(record => [record.kslucc, record.date]));

  // Filter records based on the Set of kslucc values
  const filtered = records.filter(record =>record.ks_krarem && record.ks_krarem.includes('Dormant') && userKsluccSet.has(record.kslucc));

  const data = [
    [Value],
    ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
  ],
    ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,userKsluccMap.get(record.kslucc),	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed

    ]),
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  XLSX.writeFile(wb, `Send Mails Dormant Accounts_${formattedDate}.xls`);
};
  


const upcomingdormant = async () => {
  const currentUser = AuthService.getCurrentUser();
const sheetName = 'Upcoming Dormant Accounts'; // Use your sheet name here
const Value = 'Upcoming Dormant Accounts'; // Use your value here
const currentDate = new Date();
const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
const wb = XLSX.utils.book_new();

const filtered = records.filter(record =>record.kslucc && record.nod_dormnt >= 0 && record.nod_dormnt <= 31);

const data = [
  [Value],
  ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
],
  ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed

  ]),
];

const ws = XLSX.utils.aoa_to_sheet(data);
XLSX.utils.book_append_sheet(wb, ws, sheetName);

XLSX.writeFile(wb, `Upcoming Dormant Accounts_${formattedDate}.xls`);
};





// const summeryreport = () => {
//   // Define sections with filters and values
//   const sections = [
//     {
//       name: 'Account Open (Tradeable_Accounts)',
//       filters: [applyFilter7, applyFilter24, applyFilter10, applyFilter26, applyFilter27],
//       values: [
//         'Kotak UCC , KRA Done , UCC Done , Permitted to Trade',
//         'Tradeable Accounts and Closer Transfer done',
//         'Tradeable Accounts and Closer Transfer Pending',
//         'Tradeable Accounts and Closer Transfer Pending and ESL DP Pending',
//         'Tradeable Accounts and Closer Transfer Pending and Other DP Pending'
//       ],
//       subname: [
//         'Total No. of Tradeable Accounts',
//         '(A) Closer Transfer done',
//         '(B) Closer Transfer Pending',
//         '(b.1) ESL DP Pending',
//         '(b.2) Other DP Pending'
//       ]
//     },
//     {
//       name: 'Account Open (Not_Tradeable_Accounts)',
//       filters: [applyFilter9,applyFilter36, applyFilter17,applyFilter38,applyFilter39,applyFilter40,applyFilter41,applyFilter42,applyFilter29],
//       values: [
//         'Kotak UCC , Not KRA Done , Not UCC Done , Not Permitted to Trade',
//         'Not Tradeable Accounts and KRA Pending',
//         'Not Tradeable Accounts and Not KRA Pending and UCC Pending',
//         'Not Tradeable Accounts and Not KRA Pending and Not UCC Pending and Multiple Mail Mobile',
//         'Not Tradeable Accounts and Not KRA Pending and Not UCC Pending and Not Multiple Mail Mobile and Remaing',
//         'List Of Multiple mail and mobile (Exsist in KRA Pending,UCC Pending,Others)'
//       ],
//       subname: [
//         'Total No. of Not Tradable Account',
//         '(A) UCC Done',
//         '(a.1) KRA Pending',
//         '(a.2) Remaning',
//         '(B) UCC Pending',
//         '(b.1) Multiple Mail Mobile',
//         '(b.2) UCC Pending and KRA Pending',
//         '(b.3) Remaning',
//         'Others'
//       ]
//     },
//     {
//       name: 'Pending with 3i',
//       filters: [applyFilter21, applyFilter30],
//       values: [
//         'DVU Pending',
//         'Data Entry Pending'
//       ],
//       subname: [
//         'DVU Pending',
//         'Data Entry Pending'
//       ]
//     },
//     {
//       name: 'Esign',
//       filters: [applyFilter19, applyFilter31, applyFilter32],
//       values: [
//         'Esign Pending',
//         'Esign Pending and failure',
//         'Esign Pending and Not Failure and not Existing and Remaning'
//       ],
//       subname: [
//         'Esign Pending',
//         '(A) Esign Failure',
//         '(B) Other'
//       ]
//     },
//     {
//       name: 'Pending At kotak',
//       filters: [applyFilter23, applyFilter22, applyFilter34],
//       values: [
//         'DVU Return',
//         'Form Not Send To 3i',
//         'Form Received from Exclusive'
//       ],
//       subname: [
//         'DVU Return',
//         'Form Not Send To 3i',
//         'Form Received from Exclusive'
//       ]
//     },
//     {
//       name: 'Form Hold At Exclusive',
//       filters: [applyFilter16, applyFilter33,applyFilter8],
//       values: [
//         'Return From Kotak',
//         'Not Given To Kotak',
//         'Existing'
//       ],
//       subname: [
//         'Return From Kotak',
//         'Not Given To Kotak',
//         'Existing Account',
//       ]
//     }
//   ];

//   const currentDate = new Date();
//   const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
//   const wb = XLSX.utils.book_new();

//   const summaryData = [['S.No.', 'Sheet Name', 'Sub-sheet Name', 'No. of Record']]; // Initialize summary data with headers
//   const totalRecords = []; // Array to hold all records

//   let totalRecordCount = 0;
//   let summaryRowIndex = 1; // Initialize summary row index

//   const boldStyle = {
//     font: { bold: true, sz: 14 }
//   };

// const rightAlignStyle = { alignment: { horizontal: 'right' } };
//   // Apply bold style to header row
//   summaryData[0] = summaryData[0].map(header => ({ t: 's', v: header, s: boldStyle }));

//   sections.forEach((section, sectionIndex) => {
//     summaryData.push([sectionIndex + 1, section.name, '', '']); // Section header in summary
//     summaryRowIndex++;

//     let subSheetIndex = 0; // Initialize sub-sheet index for each section

//     section.filters.forEach((filter, filterIndex) => {
//       const filtered = records.filter(filter);
//       const subSheetName = `${sectionIndex + 1}.${subSheetIndex}`;
//       const subSheetNames = section.subname[filterIndex].substring(0, 31); // Truncate to 31 characters

//       // Add record count to summary data with hyperlink
//       const summaryCell = `A${summaryRowIndex + 1}`;
//       summaryData.push([
//         '',
//         '',
//         { t: 's', v: `${section.subname[filterIndex]}`, l: { Target: `#'${subSheetNames}'!A1` }, s: boldStyle },
//         { t: 'n', v: filtered.length, s: boldStyle }
//       ]);
//       totalRecordCount = records.length; // Accumulate total record count
//       totalRecords.push(...filtered); // Add records to totalRecords array

//       // Prepare data for the sub-sheet
//       const data = [
//         [{ t: 's', v: 'Back to Summary', l: { Target: `#'Summary'!C${summaryRowIndex + 1}` } }],
//         [section.values[filterIndex] || ''], // Add the specific value for the sub-sheet
//         ["S.No.", "Priority",	"BarCode",	"Branch","LocationID",	"ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks e-Sign Status",	"Ks e-Sign Remarks",	"3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile",	"Kotak Remark(s)",	"Report Date",
//         /* Add other headers as needed */],
//         ...filtered.map((record, index) => [
//           index + 1, record.priority,	record.barcode,	record.brcd,record.es_locnid,	record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_esign,	record.ks_essts,	record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,	record.ks_allrem,	record.run_date,
//           /* Add other fields as needed */
//         ]),
//       ];

//       // Convert data to sheet format and append to workbook
//       const ws = XLSX.utils.aoa_to_sheet(data);
//       XLSX.utils.book_append_sheet(wb, ws, subSheetNames);

//       subSheetIndex++; // Increment sub-sheet index for next iteration
//       summaryRowIndex++; // Increment summary row index for next summary entry
//     });
//   });

//   // Add total record count to summary data
//   summaryData.push([7, { t: 's', v: 'Total Record In Process', l: { Target: `#'Total Records'!A1` }, s: boldStyle }, '', { t: 'n', v: totalRecordCount, s: boldStyle }]);

//   // Create summary sheet
//   const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
//   XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

//   // Create total records sheet
//   const totalRecordsData = [
//     [{ t: 's', v: 'Back to Summary', l: { Target: `#'Summary'!B30` } }],
//     ["Total No. Of Records in Closer Information"],
//     ["S.No.","Priority",	"BarCode",	"Branch","LocationID",	"ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks e-Sign Status",	"Ks e-Sign Remarks",	"3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile",	"Kotak Remark(s)",	"Report Date",
//     /* Add other headers as needed */],
//     ...records.map((record, index) => [
//       index + 1, record.priority,	record.barcode,	record.brcd,record.es_locnid,	record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_esign,	record.ks_essts,	record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,	record.ks_allrem,	record.run_date,
//       /* Add other fields as needed */
//     ]),
//   ];
//   const wsTotalRecords = XLSX.utils.aoa_to_sheet(totalRecordsData);
//   XLSX.utils.book_append_sheet(wb, wsTotalRecords, 'Total Records');

//   // Write workbook to file
//   XLSX.writeFile(wb, `Summary Report_${formattedDate}.xls`);
// };


// const summeryreport = () => {
//   // Define sections with filters and values
//   const sections = [
     
//     {
//       name: 'Account Open (Tradeable_Accounts)',
//       filters: [applyFilter7, applyFilter24, applyFilter10, applyFilter26, applyFilter27],
//       values: [
//         'Kotak UCC , KRA Done , UCC Done , Permitted to Trade',
//         'Tradeable Accounts and Closer Transfer done',
//         'Tradeable Accounts and Closer Transfer Pending',
//         'Tradeable Accounts and Closer Transfer Pending and ESL DP Pending',
//         'Tradeable Accounts and Closer Transfer Pending and Other DP Pending'
//       ],
//       subname: [
//         'Total No. of Tradeable Accounts',
//         '(A) Closer Transfer done',
//         '(B) Closer Transfer Pending',
//         '(b.1) ESL DP Pending',
//         '(b.2) Other DP Pending'
//       ]
//     },
//     {
//       name: 'Account Open (Not_Tradeable_Accounts)',
//       filters: [applyFilter9,applyFilter36, applyFilter17,applyFilter38,applyFilter39,applyFilter40,applyFilter41,applyFilter42,applyFilter29],
//       values: [
//         'Kotak UCC , Not KRA Done , Not UCC Done , Not Permitted to Trade',
//         'Not Tradeable Accounts and KRA Pending',
//         'Not Tradeable Accounts and Not KRA Pending and UCC Pending',
//         'Not Tradeable Accounts and Not KRA Pending and Not UCC Pending and Multiple Mail Mobile',
//         'Not Tradeable Accounts and Not KRA Pending and Not UCC Pending and Not Multiple Mail Mobile and Remaing',
//         'List Of Multiple mail and mobile (Exsist in KRA Pending,UCC Pending,Others)'
//       ],
//       subname: [
//         'Total No. of Not Tradable Account',
//         '(A) UCC Done',
//         '(a.1) KRA Pending',
//         '(a.2) Remaning',
//         '(B) UCC Pending',
//         '(b.1) Multiple Mail Mobile',
//         '(b.2) KRA Pending',
//         '(b.3) Remaning',
//         'Others'
//       ]
//     },
//     {
//       name: 'Super QC Done',
//       filters: [applyFilter44,applyFilter19, applyFilter31, applyFilter32,applyFilter45,applyFilter46],
//       values: [
//         'Super QC Done',
//         'Esign Not Send',
//         'Esign Pending',
//         '(A) Esign Failure',
//         '(B) Esign Success But Account Not Open',
//         '(C) Esign Client Not Attemted'
//       ],
//       subname: [
//         'Super QC Done',
//         'Esign Not Send',
//         'Esign Pending',
//         '(A) Esign Failure',
//         '(B) Esign Success But Account Not Open',
//         '(C) Esign Client Not Attemted'
//       ]
//     },
//     {
//       name: 'Pending with 3i',
//       filters: [applyFilter21, applyFilter30],
//       values: [
//         'DVU Pending',
//         'Data Entry Pending'
//       ],
//       subname: [
//         'DVU Pending',
//         'Data Entry Pending'
//       ]
//     },
//     {
//       name: 'Hold At kotak Indore',
//       filters: [applyFilter49,applyFilter51,applyFilter52,applyFilter53,applyFilter54,applyFilter55,applyFilter56],
//       values: [
//         '(A) Form Lying With KSL',
//         '(a.1) PENDING FROM RAHUL',
//         '(a.2) FORM DISPATCH',
//         '(a.3) KSL - Status',
//         '(a.4) PENDING FROM KSL',
//         '(a.5) Pending With KSL',
//         '(a.6) KOTAK'
//       ],
//       subname: [
//         '(A) Form Lying With KSL',
//         '(a.1) PENDING FROM Kotak',
//         '(a.2) FORM DISPATCH',
//         '(a.3) KSL - KRA MISMATCH',
//         '(a.4) PENDING FROM KSL',
//         '(a.5) Pending With KSL',
//         '(a.6) KOTAK',
//         '(a.7) KSL - ADDRESS/KRA MISMATCH',
//         '(a.8) KSL - OTHER KRA (NDML ACKNOWLEDGEMENT REQUIRED)'
//       ]
//     },
//     {
//       name: 'Form Hold At Exclusive',
//       filters: [applyFilter50,applyFilter57,applyFilter58,applyFilter59,applyFilter60,applyFilter8 ],
//       values: [
//         'Return From Kotak',
//         'Not Given To Kotak',
//         'Existing'
//       ],
//       subname: [
//         '(A) Form Lying With Exclusive',
//         '(a.1) PENDING FROM EXCLUSIVE',
//         '(a.2) INACTIVE IN DUMP',
//         '(a.3)Close Account',
//         '(a.4) Remaning(Blank)',
//         'Existing',
//       ]
//     },
//     {
//       name: 'CLIENTS NOT INTRESTED',
//       filters: [applyFilter47],
//       values: [
//         'CLIENTS NOT INTRESTED',
//       ],
//       subname: [
//         'CLIENTS NOT INTRESTED',
//       ]
//     }

//     // {
//     //   name: 'Form Hold At Exclusive',
//     //   filters: [applyFilter16, applyFilter33,applyFilter8],
//     //   values: [
//     //     'Return From Kotak',
//     //     'Not Given To Kotak',
//     //     'Existing'
//     //   ],
//     //   subname: [
//     //     'Return From Kotak',
//     //     'Not Given To Kotak',
//     //     'Existing Account',
//     //   ]
//     // }
//   ];

//   const currentDate = new Date();
//   const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
//   const wb = XLSX.utils.book_new();

//   const summaryData = [['S.No.', 'Sheet Name', 'Sub-sheet Name', 'No. of Record']]; // Initialize summary data with headers
//   const totalRecords = []; // Array to hold all records

//   let totalRecordCount = 0;
//   let summaryRowIndex = 1; // Initialize summary row index

//   const boldStyle = {
//     font: { bold: true, sz: 14 }
//   };

// const rightAlignStyle = { alignment: { horizontal: 'right' } };
//   // Apply bold style to header row
//   summaryData[0] = summaryData[0].map(header => ({ t: 's', v: header, s: boldStyle }));

//   sections.forEach((section, sectionIndex) => {
//     summaryData.push([sectionIndex + 1, section.name, '', '']); // Section header in summary
//     summaryRowIndex++;

//     let subSheetIndex = 0; // Initialize sub-sheet index for each section

//     section.filters.forEach((filter, filterIndex) => {
//       const filtered = records.filter(filter);
//       const subSheetName = `${sectionIndex + 1}.${subSheetIndex}`;
//       const subSheetNames = section.subname[filterIndex].substring(0, 31); // Truncate to 31 characters

//       // Add record count to summary data with hyperlink
//       const summaryCell = `A${summaryRowIndex + 1}`;
//       summaryData.push([
//         '',
//         '',
//         { t: 's', v: `${section.subname[filterIndex]}`, l: { Target: `#'${subSheetNames}'!A1` }, s: boldStyle },
//         { t: 'n', v: filtered.length, s: boldStyle }
//       ]);
//       totalRecordCount = records.length; // Accumulate total record count
//       totalRecords.push(...filtered); // Add records to totalRecords array

//       // Prepare data for the sub-sheet
//       const data = [
//         [{ t: 's', v: 'Back to Summary', l: { Target: `#'Summary'!C${summaryRowIndex + 1}` } }],
//         [section.values[filterIndex] || ''], // Add the specific value for the sub-sheet
//         ["S.No.", "Priority",	"BarCode",	"Branch","LocationID","ES DP Closer Trf to KS",	"ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koshlandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
//         /* Add other headers as needed */],
//         ...filtered.map((record, index) => [
//           index + 1, record.priority,	record.barcode,	record.brcd,record.es_locnid,record.closer_trf,	record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
//           /* Add other fields as needed */
//         ]),
//       ];

//       // Convert data to sheet format and append to workbook
//       const ws = XLSX.utils.aoa_to_sheet(data);
//       XLSX.utils.book_append_sheet(wb, ws, subSheetNames);

//       subSheetIndex++; // Increment sub-sheet index for next iteration
//       summaryRowIndex++; // Increment summary row index for next summary entry
//     });
//   });

//   // Add total record count to summary data
//   summaryData.push([8, { t: 's', v: 'Total Record In Process', l: { Target: `#'Total Records'!A1` }, s: boldStyle }, '', { t: 'n', v: totalRecordCount, s: boldStyle }]);

//   // Create summary sheet
//   const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
//   XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

//   // Create total records sheet
//   const totalRecordsData = [
//     [{ t: 's', v: 'Back to Summary', l: { Target: `#'Summary'!B30` } }],
//     ["Total No. Of Records in Closer Information"],
//     ["S.No.", "Priority",	"BarCode",	"Branch","LocationID","ES DP Closer Trf to KS",	"ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koshlandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
//         /* Add other headers as needed */],
//         ...records.map((record, index) => [
//           index + 1, record.priority,	record.barcode,	record.brcd,record.es_locnid,record.closer_trf,	record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
//           /* Add other fields as needed */
//         ]),
//   ];
//   const wsTotalRecords = XLSX.utils.aoa_to_sheet(totalRecordsData);
//   XLSX.utils.book_append_sheet(wb, wsTotalRecords, 'Total Records');

//   // Write workbook to file
//   XLSX.writeFile(wb, `Summary Report_${formattedDate}.xls`);
// };





















































// const summeryreport = () => {
//   // Define sections with filters and values
//   const sections = [
//     {
//       name: 'Account Open (Tradeable_Accounts)',
//       filters: [applyFilter7, applyFilter24, applyFilter10, applyFilter26, applyFilter27],
//       values: [
//         'Kotak UCC , KRA Done , UCC Done , Permitted to Trade',
//         'Tradeable Accounts and Closer Transfer done',
//         'Tradeable Accounts and Closer Transfer Pending',
//         'Tradeable Accounts and Closer Transfer Pending and ESL DP Pending',
//         'Tradeable Accounts and Closer Transfer Pending and Other DP Pending'
//       ],
//       subname: [
//         'Total No. of Tradeable Accounts',
//         '(A) Closer Transfer done',
//         '(B) Closer Transfer Pending',
//         '(b.1) ESL DP Pending',
//         '(b.2) Other DP Pending'
//       ]
//     },
//     {
//       name: 'Account Open (Not_Tradeable_Accounts)',
//       filters: [applyFilter9, applyFilter36, applyFilter17, applyFilter38, applyFilter39, applyFilter40, applyFilter41, applyFilter42, applyFilter29],
//       values: [
//         'Kotak UCC , Not KRA Done , Not UCC Done , Not Permitted to Trade',
//         'Not Tradeable Accounts and KRA Pending',
//         'Not Tradeable Accounts and Not KRA Pending and UCC Pending',
//         'Not Tradeable Accounts and Not KRA Pending and Not UCC Pending and Multiple Mail Mobile',
//         'Not Tradeable Accounts and Not KRA Pending and Not UCC Pending and Not Multiple Mail Mobile and Remaing',
//         'List Of Multiple mail and mobile (Exsist in KRA Pending,UCC Pending,Others)'
//       ],
//       subname: [
//         'Total No. of Not Tradable Account',
//         '(A) UCC Done',
//         '(a.1) KRA Pending',
//         '(a.2) Remaning',
//         '(B) UCC Pending',
//         '(b.1) Multiple Mail Mobile',
//         '(b.2) KRA Pending',
//         '(b.3) Remaning',
//         'Others'
//       ]
//     },
//     {
//       name: 'Super QC Done',
//       filters: [applyFilter44, applyFilter19, applyFilter31, applyFilter32, applyFilter45, applyFilter46],
//       values: [
//         'Super QC Done',
//         'Esign Not Send',
//         'Esign Pending',
//         '(A) Esign Failure',
//         '(B) Esign Success But Account Not Open',
//         '(C) Esign Client Not Attemted'
//       ],
//       subname: [
//         'Super QC Done',
//         'Esign Not Send',
//         'Esign Pending',
//         '(A) Esign Failure',
//         '(B) Esign Success But Account Not Open',
//         '(C) Esign Client Not Attemted'
//       ]
//     },
//     {
//       name: 'Pending with 3i',
//       filters: [applyFilter21],
//       values: [
//         'DVU Pending'
//       ],
//       subname: [
//         'DVU Pending'
//       ]
//     },
//     {
//       name: 'Hold At kotak Indore',
//       filters: [applyFilter49, applyFilter51, applyFilter52, applyFilter53, applyFilter54, applyFilter55, applyFilter56],
//       values: [
//         '(A) Form Lying With KSL',
//         '(a.1) PENDING FROM RAHUL',
//         '(a.2) FORM DISPATCH',
//         '(a.3) KSL - Status',
//         '(a.4) PENDING FROM KSL',
//         '(a.5) Pending With KSL',
//         '(a.6) KOTAK'
//       ],
//       subname: [
//         '(A) Form Lying With KSL',
//         '(a.1) PENDING FROM Kotak',
//         '(a.2) FORM DISPATCH',
//         '(a.3) KSL - KRA MISMATCH',
//         '(a.4) PENDING FROM KSL',
//         '(a.5) Pending With KSL',
//         '(a.6) KOTAK',
//         '(a.7) KSL - ADDRESS/KRA MISMATCH',
//         '(a.8) KSL - OTHER KRA (NDML ACKNOWLEDGEMENT REQUIRED)'
//       ]
//     },
//     {
//       name: 'Form Hold At Exclusive',
//       filters: [applyFilter50, applyFilter57, applyFilter58, applyFilter59, applyFilter60, applyFilter8],
//       values: [
//         'Return From Kotak',
//         'Not Given To Kotak',
//         'Existing'
//       ],
//       subname: [
//         '(A) Form Lying With Exclusive',
//         '(a.1) PENDING FROM EXCLUSIVE',
//         '(a.2) INACTIVE IN DUMP',
//         '(a.3) Close Account',
//         '(a.4) Remaning(Blank)',
//         'Existing'
//       ]
//     },
//     {
//       name: 'CLIENTS NOT INTRESTED',
//       filters: [applyFilter47],
//       values: [
//         'CLIENTS NOT INTRESTED'
//       ],
//       subname: [
//         'CLIENTS NOT INTRESTED'
//       ]
//     }
//   ];

//   const currentDate = new Date();
//   const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
//   const wb = XLSX.utils.book_new();

//   const summaryData = [['S.No.', 'Sheet Name', 'Sub-sheet Name', `No. of Record(${records.length > 0 && records[0].run_date ? records[0].run_date : 'N/A'})`,`No. of Record(${prerecords.length > 0 && prerecords[0].run_date ? prerecords[0].run_date : 'N/A'})`, 'Add Records', 'Remove Records']];
//   const totalRecords = [];
//   const totalPreRecords = [];

//   let totalRecordCount = 0;
//   let totalRecordCounts = 0;
//   let summaryRowIndex = 1;

//   const boldStyle = {
//     font: { bold: true, sz: 14 }
//   };

//   summaryData[0] = summaryData[0].map(header => ({ t: 's', v: header, s: boldStyle }));

//   const differenceData = [['Sr. No.', 'Sub-section', 'Difference Type', 'Previous Location', 'Current Location', "ES UCC", "KS UCC", "Client Name"]];

//   const uccLocationMapping = {};

//   // Function to map UCCs to their sections and sub-sections
//   const mapUCCs = (data, sectionIndex, subSectionIndex, type) => {
//     data.forEach(record => {
//       if (!uccLocationMapping[record.ucc]) {
//         uccLocationMapping[record.ucc] = {};
//       }
//       uccLocationMapping[record.ucc][type] = {
//         section: sections[sectionIndex].name,
//         subSection: sections[sectionIndex].subname[subSectionIndex]
//       };
//     });
//   };

//   sections.forEach((section, sectionIndex) => {
//     summaryData.push([sectionIndex + 1, section.name, '', '', '', '', '']);
//     summaryRowIndex++;

//     let subSheetIndex = 0;

//     section.filters.forEach((filter, filterIndex) => {
//       const filtered = records.filter(filter);
//       const filtereds = prerecords.filter(filter);
//       const subSheetName = `${sectionIndex + 1}.${subSheetIndex}`;
//       const subSheetNames = section.subname[filterIndex].substring(0, 31);

//       const positiveDifference = filtered.length > filtereds.length ? filtered.length - filtereds.length : 0;
//       const negativeDifference = filtered.length < filtereds.length ? filtereds.length - filtered.length : 0;

//       summaryData.push([
//         '',
//         '',
//         { t: 's', v: `${section.subname[filterIndex]}`, l: { Target: `#'${subSheetNames}'!A1` }, s: boldStyle },
//         { t: 'n', v: filtered.length, s: boldStyle },
//         { t: 'n', v: filtereds.length, s: boldStyle },
//         filtered.length - filtereds.length,
//         - negativeDifference
//       ]);
//       totalRecordCount = records.length;
//       totalRecords.push(...records);
//       totalRecordCounts = prerecords.length;
//       totalPreRecords.push(...prerecords);

//       mapUCCs(filtered, sectionIndex, filterIndex, 'current');
//       mapUCCs(filtereds, sectionIndex, filterIndex, 'previous');

//       const data = [
//         [{ t: 's', v: 'Back to Summary', l: { Target: `#'Summary'!C${summaryRowIndex + 1}` } }],
//         [section.values[filterIndex] || ''],
//         ["Sr. No.", "Priority", "BarCode", "Branch","LocationID", "ES UCC", "KS UCC", "Client Name", "Pan No", "KS KRA Status", "KS PTT Status", "KS KRA/PTT Remarks", "KS KRA/PTT e-mail Sent", "KS PTT e-mail Recd", "KS KRA/PTT RM", "KS KRA/PTT e-mail Sent Remarks", "KS e-Mail ID", "Ks Mobile No.", "Ks Email Sent to Client", "Ks e-Sign Status", "Ks e-Sign Remarks", "Back Office Current Status", "3i Status 1", "3i Status 2", "Other Status", "Multiple Email/Mobile", "Koshlandra Status", "Kotak Remark(s)", "Report Date", "Account Closed"],
//         ...filtered.map((record, index) => [
//           index + 1, record.priority, record.barcode, record.brcd,record.es_locnid, record.ucc, record.kslucc, record.clname, record.panno, record.ks_krasts, record.ks_pttsts, record.ks_krarem, record.ks_emsent, record.ks_emrecd, record.ks_rm, record.ks_krptrem, record.ks_emailid, record.ks_mobile, record.ks_emtocl, record.ks_esign, record.ks_essts, record.bo_clsts, record.sts1_3i, record.sts2_3i, record.ks_othsts, record.mult_emmo, record.ks_sts1, record.ks_allrem, record.run_date, record.ac_closed
//         ]),
//       ];

//       const ws = XLSX.utils.aoa_to_sheet(data);
//       XLSX.utils.book_append_sheet(wb, ws, subSheetNames);

//       subSheetIndex++;
//       summaryRowIndex++;

//       const addedRecords = filtered.filter(newRec => !filtereds.some(oldRec => newRec.ucc === oldRec.ucc));
//       const removedRecords = filtereds.filter(oldRec => !filtered.some(newRec => newRec.ucc === oldRec.ucc));

//       let serialNumber = 1;
//       let serialNumbers = 1;

//       addedRecords.forEach(record => {
//         const prevLocation = uccLocationMapping[record.ucc]?.previous;
//         differenceData.push([
//           serialNumber++, section.subname[filterIndex], 'Added', prevLocation ? `${prevLocation.subSection}` : 'N/A', `${section.name} - ${section.subname[filterIndex]}`, record.ucc, record.kslucc, record.clname
//         ]);
//       });

//       removedRecords.forEach(record => {
//         let newLocation = 'N/A';
//         sections.forEach((sec, secIndex) => {
//           sec.filters.forEach((flt, idx) => {
//             if (flt(record)) {
//               newLocation = `${sec.name} - ${sec.subname[idx]}`;
//             }
//           });
//         });
//         differenceData.push([
//           serialNumbers++, section.subname[filterIndex], 'Removed', ` ${section.subname[filterIndex]}`, newLocation, record.ucc, record.kslucc, record.clname
//         ]);
//       });
//     });
//   });

//   summaryData.push([8, { t: 's', v: 'Total Record In Process', l: { Target: `#'Total Records'!A1` }, s: boldStyle }, '', { t: 'n', v: totalRecordCount, s: boldStyle }, { t: 'n', v: totalRecordCounts, s: boldStyle }, totalRecordCount - totalRecordCounts > 0 ? totalRecordCount - totalRecordCounts : 0, totalRecordCount - totalRecordCounts < 0 ? totalRecordCount - totalRecordCounts : 0]);

//   const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
//   XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

//   const totalRecordsData = [
//     [{ t: 's', v: 'Back to Summary', l: { Target: `#'Summary'!B30` } }],
//     ["Total No. Of Records in Closer Information"],
//     ["Sr. No.", "Priority", "BarCode", "Branch","LocationID", "ES UCC", "KS UCC", "Client Name", "Pan No", "KS KRA Status", "KS PT Status", "KS KRA/PTT Remarks", "KS KRA/PTT e-mail Sent", "KS PTT e-mail Recd", "KS KRA/PTT RM", "KS KRA/PTT e-mail Sent Remarks", "KS e-Mail ID", "Ks Mobile No.", "Ks Email Sent to Client", "Ks e-Sign Status", "Ks e-Sign Remarks", "Back Office Current Status", "3i Status 1", "3i Status 2", "Other Status", "Multiple Email/Mobile", "Koshlandra Status", "Kotak Remark(s)", "Report Date", "Account Closed"],
//     ...records.map((record, index) => [
//       index + 1, record.priority, record.barcode, record.brcd,record.es_locnid, record.ucc, record.kslucc, record.clname, record.panno, record.ks_krasts, record.ks_pttsts, record.ks_krarem, record.ks_emsent, record.ks_emrecd, record.ks_rm, record.ks_krptrem, record.ks_emailid, record.ks_mobile, record.ks_emtocl, record.ks_esign, record.ks_essts, record.bo_clsts, record.sts1_3i, record.sts2_3i, record.ks_othsts, record.mult_emmo, record.ks_sts1, record.ks_allrem, record.run_date, record.ac_closed
//     ]),
//   ];

//   const wsTotalRecords = XLSX.utils.aoa_to_sheet(totalRecordsData);
//   XLSX.utils.book_append_sheet(wb, wsTotalRecords, 'Total Records');

//   const wsDifference = XLSX.utils.aoa_to_sheet(differenceData);
//   XLSX.utils.book_append_sheet(wb, wsDifference, 'Difference Sheet');

//   XLSX.writeFile(wb, `Summary Report_${formattedDate}.xls`);
// };










const summeryreport = () => {
  // Define sections with filters and values
  const sections = [
    {
      name: 'Account Open (Tradeable_Accounts)',
      filters: [applyFilter7, applyFilter24, applyFilter10, applyFilter26, applyFilter27],
      values: [
        'Total No. of Tradeable Accounts',
        '(A) Closer Transfer done',
        '(B) Closer Transfer Pending',
        '(b.1) ESL DP Pending',
        '(b.2) Other DP Pending'
      ],
      subname: [
        'Total No. of Tradeable Accounts',
        '(A) Closer Transfer done',
        '(B) Closer Transfer Pending',
        '(b.1) ESL DP Pending',
        '(b.2) Other DP Pending'
      ]
    },
    {
      name: 'Account Open (Not_Tradeable_Accounts)',
      filters: [applyFilter9, applyFilter36, applyFilter17, applyFilter38, applyFilter39, applyFilter40, applyFilter41, applyFilter42,applyFilter423,applyFilter65, applyFilter29],
      values: [
        'Total No. of Not Tradable Account',
        '(A) UCC Done',
        '(a.1) KRA Pending',
        '(a.2) Remaning',
        '(B) UCC Pending',
        '(b.1) Multiple Mail Mobile',
        '(b.2) KRA Pending',
        '(b.3) KRA Done',
        '(b.4) Remaning (KRA Status Blank)',
        '(C) Dormant Account',
        'Others (KRA & UCC Blank )'
      ],
      subname: [
        'Total No. of Not Tradable Account',
        '(A) UCC Done',
        '(a.1) KRA Pending',
        '(a.2) Remaning',
        '(B) UCC Pending',
        '(b.1) Multiple Mail Mobile',
        '(b.2) KRA Pending',
        '(b.3) KRA Done',
        '(b.4) Remaning (KRA Status Blank)',
        '(C) Dormant Account',
        'Others (KRA & UCC Blank )'
      ]
    },
    // '(D) Close Account by user',
    {
      name: 'Super QC Done',
      filters: [applyFilter44, applyFilter19, applyFilter31, applyFilter32, applyFilter45, applyFilter46],
      values: [
        'Super QC Done',
        'Esign Not Send',
        'Esign Pending',
        '(A) Esign Failure',
        '(B) Esign Success But Account Not Open',
        '(C) Esign Client Not Attemted'
      ],
      subname: [
        'Super QC Done',
        'Esign Not Send',
        'Esign Pending',
        '(A) Esign Failure',
        '(B) Esign Success But Account Not Open',
        '(C) Esign Client Not Attemted'
      ]
    },
    {
      name: 'Pending with 3i',
      filters: [applyFilter21],
      values: [
        'DVU Pending'
      ],
      subname: [
        'DVU Pending'
      ]
    },
    {
      name: 'Hold At kotak Indore',
      filters: [applyFilter49, applyFilter52, applyFilter53, applyFilter54, applyFilter55, applyFilter56],
      values: [
        '(A) Form Lying With KSL',
        '(a.1) FORM DISPATCH',
        '(a.2) KSL - Status',
        '(a.3) PENDING FROM KSL',
        '(a.4) Pending With KSL',
        '(a.5) KOTAK'
      ],
      subname: [
        '(A) Form Lying With KSL',
        '(a.1) FORM DISPATCH',
        '(a.2) KSL - KRA MISMATCH',
        '(a.3) PENDING FROM KSL',
        '(a.4) Pending With KSL',
        '(a.5) KOTAK',
        '(a.6) KSL - ADDRESS/KRA MISMATCH',
        '(a.7) KSL - OTHER KRA (NDML ACKNOWLEDGEMENT REQUIRED)'
      ]
    },
    {
      name: 'PENDING FROM RAHUL (Non-Individual)',
      filters: [applyFilter51],
      values: [
        'PENDING FROM RAHUL (Non-Individual)'
      ],
      subname: [
        'PENDING FROM RAHUL (Non-Individual)'
      ]
    },
    {
      name: 'Form Hold At Exclusive',
      filters: [applyFilter50, applyFilter57, applyFilter58, applyFilter59, applyFilter60, applyFilter8],
      values: [
        'Return From Kotak',
        'Not Given To Kotak',
        'Existing'
      ],
      subname: [
        '(A) Form Lying With Exclusive',
        '(a.1) PENDING FROM EXCLUSIVE',
        '(a.2) READY',
        '(a.3) Close Account',
        '(a.4) Remaning',
        'Existing'
      ]
    },
    {
      name: 'CLIENTS NOT INTRESTED',
      filters: [applyFilter47],
      values: [
        'CLIENTS NOT INTRESTED'
      ],
      subname: [
        'CLIENTS NOT INTRESTED'
      ]
    }
  ];

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  const wb = XLSX.utils.book_new();

  const summaryData = [['S.No.', 'Sheet Name', 'Sub-sheet Name', `${records.length > 0 && records[0].run_date ? records[0].run_date : 'N/A'}`,`${prerecords.length > 0 && prerecords[0].run_date ? prerecords[0].run_date : 'N/A'}`, 'Add', 'Remove','Net Difference',`${prerecordss.length > 0 && prerecordss[0].run_date ? prerecordss[0].run_date : 'N/A'}`,`${prerecordsss.length > 0 && prerecordsss[0].run_date ? prerecordsss[0].run_date : 'N/A'}`]];
  const totalRecords = [];
  const totalPreRecords = [];

  let totalRecordCount = 0;
  let totalRecordCounts = 0;
  let totalRecordCountss = 0;
  let totalRecordCountsss = 0;
  let summaryRowIndex = 1;

  const boldStyle = {
    font: { bold: true, sz: 14 }
  };

  const combinedFilters = [applyFilter7, applyFilter9, applyFilter44, applyFilter21, applyFilter49, applyFilter51 , applyFilter50 , applyFilter8, applyFilter47];

  // Function to apply a filter and return the length of matching records
  const applyAndCount = (filter, data) => data.filter(filter).length;

  // Function to combine filters and return the length of matching records
  const applyCombinedFilters = (filters, data) => filters.reduce((acc, filter) => acc + applyAndCount(filter, data), 0);



  summaryData[0] = summaryData[0].map(header => ({ t: 's', v: header, s: boldStyle }));

  const differenceData = [['Sr. No.', 'Sub-section', 'Difference Type', 'Previous Location', 'Current Location', "ES UCC", "KS UCC", "Client Name"]];

  const uccLocationMapping = {};

  // Function to map UCCs to their sections and sub-sections
  const mapUCCs = (data, sectionIndex, subSectionIndex, type) => {
    data.forEach(record => {
      if (!uccLocationMapping[record.ucc]) {
        uccLocationMapping[record.ucc] = {};
      }
      uccLocationMapping[record.ucc][type] = {
        section: sections[sectionIndex].name,
        subSection: sections[sectionIndex].subname[subSectionIndex]
      };
    });
  };

  sections.forEach((section, sectionIndex) => {
    summaryData.push([sectionIndex + 1, section.name, '', '', '', '', '','','','']);
    summaryRowIndex++;

    let subSheetIndex = 0;

    section.filters.forEach((filter, filterIndex) => {
      // const filtered = records.filter(filter);

      const filtered = records.filter(filter).sort((a, b) => {
        // First sort by es_locnid
        const locnidComparison = a.es_locnid.localeCompare(b.es_locnid);
        if (locnidComparison !== 0) {
          return locnidComparison;
        }
    
        // If es_locnid is the same, sort by clname
        return a.clname.localeCompare(b.clname);
      });
      const filtereds = prerecords.filter(filter);
      const subSheetName = `${sectionIndex + 1}.${subSheetIndex}`;
      const subSheetNames = section.subname[filterIndex].substring(0, 31);

      const addedRecord = filtered.filter(newRec => !filtereds.some(oldRec => newRec.ucc === oldRec.ucc));
      const removedRecord = filtereds.filter(oldRec => !filtered.some(newRec => newRec.ucc === oldRec.ucc));
      
      const addedRecordCount = addedRecord.length;
      const removedRecordCount = removedRecord.length;


      const filteredss = prerecordss.filter(filter);
      const filteredsss = prerecordsss.filter(filter);

    

    

      summaryData.push([
        '',
        '',
        { t: 's', v: `${section.subname[filterIndex]}`, l: { Target: `#'${subSheetNames}'!A1` }, s: boldStyle },
        { t: 'n', v: filtered.length, s: boldStyle },
        { t: 'n', v: filtereds.length, s: boldStyle },
        addedRecordCount,
        - removedRecordCount,
        addedRecordCount-removedRecordCount,
        filteredss.length,
        filteredsss.length
      ]);
      totalRecordCount = records.length;
      totalRecords.push(...filtered);
      totalRecordCounts = prerecords.length;
      totalPreRecords.push(...filtereds);
      totalRecordCountss = prerecordss.length;
      totalRecordCountsss = prerecordsss.length;

      mapUCCs(filtered, sectionIndex, filterIndex, 'current');
      mapUCCs(filtereds, sectionIndex, filterIndex, 'previous');

      const data = [
        [{ t: 's', v: 'Back to Summary', l: { Target: `#'Summary'!C${summaryRowIndex + 1}` } }],
        [section.values[filterIndex] || ''],
        ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
    ],
      ...filtered.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed
  
      ]),
      ];

      const ws = XLSX.utils.aoa_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, subSheetNames);

      subSheetIndex++;
      summaryRowIndex++;

      const addedRecords = filtered.filter(newRec => !filtereds.some(oldRec => newRec.ucc === oldRec.ucc));
      const removedRecords = filtereds.filter(oldRec => !filtered.some(newRec => newRec.ucc === oldRec.ucc));

      let serialNumber = 1;
      let serialNumbers = 1;

      addedRecords.forEach(record => {
        const prevLocation = uccLocationMapping[record.ucc]?.previous;
        differenceData.push([
          serialNumber++, section.subname[filterIndex], 'Added', prevLocation ? `${prevLocation.subSection}` : 'N/A', `${section.name} - ${section.subname[filterIndex]}`, record.ucc, record.kslucc, record.clname
        ]);
      });

      removedRecords.forEach(record => {
        let newLocation = 'N/A';
        sections.forEach((sec, secIndex) => {
          sec.filters.forEach((flt, idx) => {
            if (flt(record)) {
              newLocation = `${sec.name} - ${sec.subname[idx]}`;
            }
          });
        });
        differenceData.push([
          serialNumbers++, section.subname[filterIndex], 'Removed', ` ${section.subname[filterIndex]}`, newLocation, record.ucc, record.kslucc, record.clname
        ]);
      });
    });
  });

  const individualFilterTotals = combinedFilters.map(filter => ({
    filter: filter.name,
    current: applyAndCount(filter, records),
    previous: applyAndCount(filter, prerecords)
  }));

  const combinedCurrentTotal = applyCombinedFilters(combinedFilters, records);
  const combinedPreviousTotal = applyCombinedFilters(combinedFilters, prerecords);
  const combinedPrevioussTotal = applyCombinedFilters(combinedFilters, prerecordss);
  const combinedPreviousssTotal = applyCombinedFilters(combinedFilters, prerecordsss);

  // Add combined filter section to summary data
  summaryData.push([
    '',
    'Combined Total',
    '',
    { t: 'n', v: combinedCurrentTotal, s: boldStyle },
    { t: 'n', v: combinedPreviousTotal, s: boldStyle },
    '',
    '',
    '',
    { t: 'n', v: combinedPrevioussTotal, s: boldStyle },
    { t: 'n', v: combinedPreviousssTotal, s: boldStyle }
  ]);
  summaryRowIndex++;




  // Add individual filter totals to summary data
  // individualFilterTotals.forEach((filterTotal, index) => {
  //   summaryData.push([
  //     `Filter ${index + 1}`,
  //     filterTotal.filter,
  //     '',
  //     { t: 'n', v: filterTotal.current, s: boldStyle },
  //     { t: 'n', v: filterTotal.previous, s: boldStyle },
  //     filterTotal.current - filterTotal.previous,
  //     filterTotal.previous - filterTotal.current,
  //     filterTotal.current - filterTotal.previous
  //   ]);
  //   summaryRowIndex++;
  // });





  summaryData.push([9, { t: 's', v: 'Total Records In Hand', l: { Target: `#'Total Records'!A1` }, s: boldStyle }, '', { t: 'n', v: totalRecordCount, s: boldStyle }, { t: 'n', v: totalRecordCounts, s: boldStyle }, totalRecordCount - totalRecordCounts > 0 ? totalRecordCount - totalRecordCounts : 0, totalRecordCount - totalRecordCounts < 0 ? totalRecordCount - totalRecordCounts : 0,totalRecordCount - totalRecordCounts,totalRecordCountss,totalRecordCountsss]);

  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

  const totalRecordsData = [
    [{ t: 's', v: 'Back to Summary', l: { Target: `#'Summary'!B30` } }],
    ["Total No. Of Records in Closer Information"],
    ["S.No.","Priority",	"BarCode",	"Branch","LocationID","Dormant :e-mail Sent",	"Dormant :Upcoming Days","ES UCC",	"KS UCC",	"Client Name",	"Pan No",	"KS KRA Status",	"KS PTT Status",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA/PTT RM",	"KS KRA/PTT e-mail Sent Remarks",	"KS e-Mail ID",	"Ks Mobile No.",	"Ks Email Sent to Client","Ks e-Sign Status",	"Ks e-Sign Remarks",	"Back Office Current Status","3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile","Koslandra Status",	"Kotak Remark(s)",	"Report Date","Account Closed"
  
  ],
    ...records.map((record,index) => [index+1,record.priority,	record.barcode,	record.brcd,record.es_locnid,record.ems_ddt,	record.nod_dormnt,record.ucc,	record.kslucc,	record.clname,	record.panno,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptrem,	record.ks_emailid,	record.ks_mobile,	record.ks_emtocl,record.ks_esign,	record.ks_essts,	record.bo_clsts,record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,record.ks_sts1,	record.ks_allrem,	record.run_date,record.ac_closed

    ]),
  ];

  const wsTotalRecords = XLSX.utils.aoa_to_sheet(totalRecordsData);
  XLSX.utils.book_append_sheet(wb, wsTotalRecords, 'Total Records');

  const wsDifference = XLSX.utils.aoa_to_sheet(differenceData);
  XLSX.utils.book_append_sheet(wb, wsDifference, 'Difference Sheet');

  XLSX.writeFile(wb, `Summary Report_${formattedDate}.xls`);
};












const downloadFile = () => {
  if (selectedOption === 'tradeableacc') {
    tradeableacc();
  } else if (selectedOption === 'closerdone') {
    closerdone();
  }else if (selectedOption === 'closerpending') {
    closerpending();
  }else if (selectedOption === 'esldp') {
    esldp();
  }else if (selectedOption === 'otherdp') {
    otherdp();
  }else if (selectedOption === 'nottrabeableacc') {
    nottrabeableacc();
  }else if (selectedOption === 'uccdone') {
    uccdone();
  }else if (selectedOption === 'krapending') {
    krapending();
  }else if (selectedOption === 'uccdoneremaning') {
    uccdoneremaning();
  }else if (selectedOption === 'uccpending') {
    uccpending();
  }else if (selectedOption === 'multiplemm') {
    multiplemm();
  }else if (selectedOption === 'uccpendingkrapending') {
    uccpendingkrapending();
  }else if (selectedOption === 'uccpendingremaning') {
    uccpendingremaning();
  }else if (selectedOption === 'nottrabeableaccother') {
    nottrabeableaccother();
  }else if (selectedOption === 'dvupending') {
    dvupending();
  }else if (selectedOption === 'dataentrypending') {
    dataentrypending();
  }else if (selectedOption === 'esignpending') {
    esignpending();
  }else if (selectedOption === 'esignfail') {
    esignfail();
  }else if (selectedOption === 'esignother') {
    esignother();
  }else if (selectedOption === 'esignnucc') {
    esignnucc();
  }
  else if (selectedOption === 'esignnotsend') {
    esignnotsend();
  }
  else if (selectedOption === 'sqcdone') {
    sqcdone();
  }else if (selectedOption === 'holdatksl') {
    holdatksl();
  }else if (selectedOption === 'holdatEsl') {
    holdatEsl();
  }else if (selectedOption === 'existing') {
    existing();
  }else if (selectedOption === 'summeryreport') {
    summeryreport();
  }else if (selectedOption === 'closerinfo') {
    closerinfo();
  }else if (selectedOption === 'closerinfopending') {
    closerinfopending();
  }else if (selectedOption === 'ac_closed') {
    ac_closed();
  }
  else if (selectedOption === 'dormant') {
    dormant();
  }else if (selectedOption === 'dormants') {
    dormants();
  }else if (selectedOption === 'upcomingdormant') {
    upcomingdormant();
  }
  else if (selectedOption === 'ac_closed_user') {
    ac_closed_user();
  }
}




  

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

        {/* Buttons for the specific record */}
          {/* <button onClick={() => editRecord(viewRecordDetails)}>Edit</button> */}
          <button onClick={() => printRecord(viewRecordDetails)}>Print</button>

          {/* Button for generating and downloading Excel for the specific record */}
          <button onClick={() => generateAndDownloadExcelForView(viewRecordDetails)}>
            Generate and Download Excel
          </button>

          <button onClick={backToList}>Back</button>
          {/* Displaying record details */}
          <h4>Closer Information Report For Client Transfer</h4>
          <table  class="1">
       <thead>
         <tr>
           <th>  </th>
           <th>Closer Transfer</th>
           <th>Ucc</th>
           <th>Name</th>     
           <th>AP NAME/SERIES</th>
           <th>AP TERMINAL ID</th>
         </tr>
       </thead>
       <tbody>
    
         <tr>
           <th>INFO.</th>
           <td>{viewRecordDetails.closer_trf}</td>
           <td>{(viewRecordDetails.ucc|| 'NR')}</td>
           <td>{(viewRecordDetails.clname|| 'NR')}</td>
           <td>{viewRecordDetails.brname|| 'NR'}</td>
           <td>{(viewRecordDetails.neoid||"Not alloted")},{(viewRecordDetails.odinid||"Not alloted")}</td>
         </tr>
      
       </tbody>
     </table>

     <table  class="1" style={{marginTop:"10px"}}>
       <thead>
         <tr>
           <th>  </th>
           <th>KRA Status</th>
           <th>PTT Status</th>
           <th>KRA/PTT Reason</th>
           <th>Kotak KRA/PTT e-mail Sent</th>
<th>Kotak PTT e-mail Recd</th>
<th>Kotak KRA/PTT RM</th>
<th>Kotak KRA/PTT e-mail Sent Remarks</th>

         </tr>
       </thead>
       <tbody>
    
         <tr>
           <th>INFO.</th>
           <td>{viewRecordDetails.ks_krasts || '-'}</td>
           <td>{viewRecordDetails.ks_pttsts || '-'}</td>
           <td>{viewRecordDetails.ks_krarem || '-'}</td>
           <td>{viewRecordDetails.ks_emsent || '-'}</td>
<td>{viewRecordDetails.ks_emrecd || '-'}</td>
<td>{viewRecordDetails.ks_rm || '-'}</td>
<td>{viewRecordDetails.ks_krptrem || '-'}</td>

         </tr>
      
       </tbody>
     </table>



     <table  class="1" style={{marginTop:"10px"}}>
     <thead>
         <tr>
           <th>  </th>
           <th>3i Remark 1</th>
           <th>3i Remark 2</th>
           <th>Other Status</th>
           <th>Multiple Email/Mobile</th>
           <th>Koshlendra Status</th>
           <th>Kotak Remark(s)</th>
         </tr>
       </thead>
       <tbody>
    
         <tr>
           <th>INFO.</th>
           <td>{viewRecordDetails.sts1_3i	 || '-'}</td>
           <td>{viewRecordDetails.sts2_3i	 || '-'}</td>
           <td>{viewRecordDetails.ks_othsts || '-'}</td>
           <td>{viewRecordDetails.mult_emmo	|| '-'}</td>
           <td>{viewRecordDetails.ks_sts1	|| '-'}</td>
           <td>{viewRecordDetails.ks_allrem || '-'}</td>
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
     <th onClick={() => setShowHoverTable(!showHoverTable)} className="animated-th">Pending CORP. Action
     {showHoverTable && (
        <div className="hover-table">
          <button  onClick={() => setShowHoverTable(!showHoverTable)}>close</button>
          <button  onClick={() => esdpsohexcel(details)}>Download</button>
          <table >
            <thead>
              <tr>
              <th>Name</th>
<th>UCC</th>
<th>Kslucc</th>
<th>BSE_Scrip</th>
<th>Scrip</th>
<th>ISIN</th>
<th>Exch</th>
<th>A/C</th>
<th>ClientId</th>
<th>PSN</th>
<th>Margin_Qu</th>
<th>Qty</th>
<th>Sett# No</th>
<th>Ageing</th>
<th>Closing</th>
<th>Haircut</th>
<th>Cash_Comp</th>
<th>NonCash_C</th>
<th>Market</th>
<th>Pledge_For_Segment</th>
<th>Type_of_Pledge</th>
<th>Pledge_Expiry_Date</th>
<th>CORP_ACT</th>
<th>markrec</th>
<th>loginid</th>
<th>creatdt</th>
<th>editdt</th>

              </tr>
            </thead>
            <tbody>
            {details &&
details
.filter((record) => record.ucc === viewRecordDetails.ucc)
.filter((record) => record.corpact === !'NO') // Filter details based on the kslucc of the viewed record
.map((record, index) => (
<tr key={index}>
  <td>{record.ucctext}</td>
<td>{record.ucc}</td>
<td>{record.kslucc}</td>
<td>{record.bse_scrid}</td>
<td>{record.nse_scrid}</td>
<td>{record.fil1}</td>
<td>{record.isin}</td>
<td>{record.exch}</td>
<td>{record.acid}</td>
<td>{record.boid}</td>
<td>{record.psn}</td>
<td>{record.qty}</td>
<td>{record.stno}</td>
<td>{record.ageing}</td>
<td>{record.clgrate}</td>
<td>{record.haircut}</td>
<td>{record.cash_col}</td>
<td>{record.ncash_col}</td>
<td>{record.mktval}</td>
<td>{record.pldg_seg}</td>
<td>{record.tyopldg}</td>
<td>{record.pldgexp}</td>
<td>{record.corpact}</td>
<td>{record.markrec}</td>
<td>{record.loginid}</td>
<td>{record.creatdt}</td>
<td>{record.editdt}</td>
</tr>
))}
            </tbody>
          </table>
        </div>
      )}
     </th>
     <th onClick={() => setShowHoverTable1(!showHoverTable1)} className="animated-th1">
Portfolio Reconciliation
{showHoverTable1 && (
<div className="hover-table" onClick={(e) => e.stopPropagation()}>
<button onClick={() => setShowHoverTable1(false)}>close</button>
<button onClick={() => pfdiffexcel(datas)}>Download</button>
<table>
  <thead>
    <tr>

      <th>UCC</th>
      <th>kslucc</th>
      <th>SCRIP</th>
      <th>ISIN</th>
      <th>OPN_PF_QTY</th>
      <th>CLS_PF_QTY</th>
      <th>HOLDING_QTY</th>
      <th>DIFF</th>
      <th>NO OF DIFF</th>
      <th>STATUS</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {datas &&
      datas
        .filter((record) => record.UCC === viewRecordDetails.ucc)
        .map((record, index) => (
          <tr key={index}>
           
            <td>{record.UCC}</td>
            <td>{record.kslucc}</td>
            <td>{record.SCRIP}</td>
            <td>{record.ISIN}</td>
            <td>{record.OPN_PF_QTY}</td>
            <td>{record.CLS_PF_QTY}</td>
            <td>{record.HOLDING_QTY}</td>
            <td>{record.DIFF}</td>
            <td>{record.NO_OF_DIFF}</td>
            <td>{record.STATUS}</td>
<td>
<button onClick={() =>  {setActiveRowIndex(index); setActiveISIN(record.ISIN); setActiveUCC(record.UCC);}} className="animated-th1">Show Remarks</button>
{activeRowIndex === index && (
<div className="hover-table">
  {/* <p>Ucc :: {record.UCC}</p>
  <p>Ucc :: {record.ISIN}</p> */}
  {/* {remarks && remarks.filter((record) => record.ISIN === activeISIN)
        .map((record,index) => (
          <div key={index}>
    <p>{record.user_rem}</p>
    </div>
  ))} */}
  

  <table>
<thead>
<tr>
<th>UCC</th>
<th>ISIN</th>
<th>Quantity</th>
<th>Rate</th>
<th>Date</th>
<th>Action</th>
</tr>
</thead>
<tbody>
{remarks && remarks.filter((record) => record.ISIN === activeISIN && record.UCC === activeUCC)
.map((record, index) => (
  <tr key={index}>
    <td>{record.UCC}</td>
    <td>{record.ISIN}</td>
    
    <td>
      {editingIndex === index ? (
        <input
          type="text"
          value={editingRemark}
          onChange={handleRemarkChanges}
        />
      ) : (
        record.user_rem
      )}
    </td>
    {/* <td>{record.user_data}</td>
<td>{record.user_date}</td>
    <td>
      {editingIndex === index ? (
        <>
          <button onClick={() => {
            editRemark(record.id, editingRemark);
            setEditingIndex(null); // Reset the editingIndex state here
          }}>Update</button>
          <button onClick={()=> setEditingIndex(null)}>Cancel</button>
        </>
      ) : (
        <button onClick={() => {setEditingIndex(index); setEditingRemark(record.user_rem);}}>Edit</button>
      )}
    </td> */}
    <td>
{editingIndex === index ? (
<input
type="text"
value={editingText}
onChange={handleTextChanges}
/>
) : (
record.user_data
)}
</td>
<td>
{editingIndex === index ? (
<input
type="date"
value={editingDate}
onChange={handleDateChanges}
/>
) : (
record.user_date
)}
</td>
<td>
{editingIndex === index ? (
<>
<button onClick={() => {
  editRemark(record.id, editingRemark, editingText, editingDate); // Update your editRemark function to handle the new fields
  setEditingIndex(null); // Reset the editingIndex state here
}}>Update</button>
<button onClick={()=> setEditingIndex(null)}>Cancel</button>
</>
) : (
<button onClick={() => {
setEditingIndex(index);
setEditingRemark(record.user_rem);
setEditingText(record.user_data);
setEditingDate(record.user_date);
}}>Edit</button>
)}
</td>
  </tr>
))
}
<tr>
<td>{record.UCC}</td>
<td>{record.ISIN}</td>


{/* {inputValue.map((value, index) => (
<input
key={index}
type="text"
value={value}
onChange={(event) => handleRemarkChange(index, event)}
/>

))}
{inputText.map((newText, index) => (
<input
key={index}
type="text"
value={newText}
onChange={(event) => handleTextChange(index,event)}
/>
))}
{inputDate.map((newDate, index) => (
<input
key={index}
type="date"
value={newDate}
onChange={(event) => handleDateChange(index,event)}
/>
))} */}
{inputValue.map((value, index) => (
<div key={index}>
<td>
<input
  type="text"
  placeholder="Rate"
  value={inputText[index]}
  onChange={(event) => {
    const newValue = event.target.value;
    if (!newValue || /^\d+$/.test(newValue)) {
      handleTextChange(index, event);
    }
  } }
/>
</td>
<td>
<input
  type="text"
  placeholder="Rate"
  value={inputText[index]}
  onChange={(event) => {
    const newValue = event.target.value;
    if (!newValue || /^\d*\.?\d*$/.test(newValue)) {
      handleTextChange(index, event);
    }
  }}
/>
</td>
<td>
<input
  type="date"
  placeholder="Date"
  value={inputDate[index]}
  onChange={(event) => handleDateChange(index, event)}
/>
</td>
<td>
{/* <button onClick={() => updateRemark(record.UCC, record.ISIN)}>Update</button> */}
<button onClick={() => cancelRemark(index)}>Cancel</button>
</td>
</div>
))}
<td>
<button onClick={() => updateRemark(record.UCC, record.ISIN,record.kslucc,	record.SCRIP,	record.OPN_PF_QTY,	record.CLS_PF_QTY,	record.HOLDING_QTY,	record.DIFF,	record.NO_OF_DIFF,	record.user_rem,	record.user_data,	record.user_date)}>Update</button>
</td>

{/* <button onClick={() => {setInputValues([...inputValues, '']); setInputTexts([...inputTexts, '']); setInputDates([...inputDates, '']);}}>Add Remark</button> */}


<td>
{/* <button onClick={() => {setInputValue([...inputValue, '']); setInputText([...inputText, '']); setInputDate([...inputDate, '']);}}>Add Remark</button> */}
{/* <button onClick={() => updateRemark(record.UCC, record.ISIN,record.kslucc,	record.SCRIP,	record.OPN_PF_QTY,	record.CLS_PF_QTY,	record.HOLDING_QTY,	record.DIFF,	record.NO_OF_DIFF,	record.user_rem,	record.user_data,	record.user_date)}>Update</button> */}
</td>
</tr>
</tbody>
</table>




  {/* {inputValue.map((value, index) => (
<input
key={index}
type="text"
value={value}
onChange={(event) => handleRemarkChange(index, event)}
/>
))}


<button onClick={() => setInputValue([...inputValue, ''])}>Add Remark</button>
<button onClick={() => updateRemark(record.UCC, record.ISIN)}>Update</button> */}
<button onClick={() => {setInputValue([...inputValue, '']); setInputText([...inputText, '']); setInputDate([...inputDate, '']);}}>Add Row</button>
  <button onClick={() => setActiveRowIndex(null)}>close</button>
</div>
)}
</td>
          </tr>
        ))}
  </tbody>
</table>
</div>
)}
</th>
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
<table>
  <thead>
    <tr>
      
<th>Kotak PF status</th>
 

<th>Kotak PF Send Date</th>


<th>Kotak Portfolio Complete DATE</th>


<th>Kotak PF Remark</th>
 

    </tr>
  </thead>
  <tbody>
    <tr>
    <td>{viewRecordDetails.ksl_status}</td>
 <td>{viewRecordDetails.ksl_date}</td>
 <td>{viewRecordDetails.kslstatus}</td>
<td>{viewRecordDetails.ksl_remk}</td>
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
            const terms = e.target.value.split(',');
            const filteredResults = records.filter((record) =>
              terms.some((term) =>
                (
                  (record.es_locnid && record.es_locnid.toLowerCase().includes(term.toLowerCase().trim())) ||
                (record.brcd && record.brcd.toLowerCase().includes(term.toLowerCase().trim())) ||
                  (record.locationid && record.locationid.toLowerCase().includes(term.toLowerCase().trim())) ||
                (record.ucc && record.ucc.toLowerCase().includes(term.toLowerCase().trim())) ||
                (record.kslucc && record.kslucc.toLowerCase().includes(term.toLowerCase().trim())) ||
                (record.panno && record.panno.toLowerCase().includes(term.toLowerCase().trim()))) ||
                (record.clname && record.clname.toLowerCase().includes(term.toLowerCase().trim())) ||
                
                false // Add a fallback to handle cases where the property is undefined
              )
            );
            setFiltered(filteredResults);
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
        <button onClick={clearSearchAndSelection}>Clear</button>
         <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
         <option value="">Select an option</option>
         <option value="summeryreport">Summary Report</option>
        <option value="tradeableacc">Total No. of Tradeable Accounts</option>
<option value="closerdone">(A) Closer Transfer done</option>
<option value="closerpending">(B) Closer Transfer Pending</option>
<option value="esldp">(B.1) ESL DP Pending</option>
<option value="otherdp">(B.2) Other DP Pending</option>
<option value="nottrabeableacc">Total No. of Not Tradable Account</option>
<option value="uccdone">(A) UCC Done</option>
<option value="krapending">(A.1) KRA Pending</option>
<option value="uccdoneremaning">(A.2) Remaning</option>
<option value="uccpending">(B) UCC Pending</option>
<option value="multiplemm">(B.1) Multiple Mail Mobile</option>
<option value="uccpendingkrapending">(B.2) UCC Pending and KRA Pending</option>
<option value="uccpendingremaning">(B.3) Remaning</option>
<option value="dormant">(C) Dormant Accounts</option>
<option value="ac_closed_user">(D)Account Close By Users</option>
<option value="nottrabeableaccother">(D) Others</option>
<option value="dvupending">DVU Pending</option>
<option value="dataentrypending">Data Entry Pending</option>
<option value="sqcdone">Super QC Done</option>
<option value="esignnotsend">Esign Not Send</option>
<option value="esignpending">Esign Pending</option>
<option value="esignfail">(A) Esign Failure</option>
<option value="esignnucc">(B) Esign Success But Account Not Open</option>
<option value="esignother">(C) Esign Client Not Attemted</option>
<option value="holdatksl">Form Lying With KSL</option>
<option value="holdatEsl">Form Lying With Exclusive</option>
<option value="existing">Existing Account</option>
<option value="ac_closed">CLIENTS NOT INTRESTED</option>
<option value="closerinfo">Closer Information</option>
<option value="closerinfopending">Account Open Pending in Closer info</option>
<option value="dormants">Dormant Accounts Send mails</option>
<option value="upcomingdormant">Dormant Accounts Upcoming</option>





        
      </select>
      <button onClick={downloadFile} disabled={loading}>Download</button><br/>
        <h3><strong>Updated Date</strong> {records.length > 0 && records[0].run_date ? records[0].run_date : 'N/A'}</h3>

        <h5>
      <div className="dropdown">
        <div className="dropbtn">Is Closer Transfer Done?</div>
        <div className="dropdown-content">
          <label>
            <input
              type="radio"
              name="closerTransfer"
              value="done"
              checked={closerTrfStatus === "done"}
              onChange={() => setCloserTrfStatus("done")}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="closerTransfer"
              value="notDone"
              checked={closerTrfStatus === "notDone"}
              onChange={() => setCloserTrfStatus("notDone")}
            />
            No
          </label>
          <label>
            <input
              type="radio"
              name="closerTransfer"
              value="all"
              checked={closerTrfStatus === "all"}
              onChange={() => setCloserTrfStatus("all")}
            />
            All
          </label>
        </div>
      </div>
      <div className="dropdown">
        <div className="dropbtn">Is Ksucc Open?</div>
        <div className="dropdown-content">
          <label>
            <input
              type="radio"
              name="kslStatus"
              value="done"
              checked={kslStatus === "done"}
              onChange={() => setkslStatus("done")}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="kslStatus"
              value="notDone"
              checked={kslStatus === "notDone"}
              onChange={() => setkslStatus("notDone")}
            />
            No
          </label>
          <label>
            <input
              type="radio"
              name="kslStatus"
              value="all"
              checked={kslStatus === "all"}
              onChange={() => setkslStatus("all")}
            />
            All
          </label>
        </div>
      </div>

      <div className="dropdown">
        <div className="dropbtn">Portfolio Difference</div>
        <div className="dropdown-content">
          <label>
            <input
              type="radio"
              name="portStatus"
              value="done"
              checked={portStatus === "done"}
              onChange={() => setportStatus("done")}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="portStatus"
              value="notDone"
              checked={portStatus === "notDone"}
              onChange={() => setportStatus("notDone")}
            />
            No
          </label>
          <label>
            <input
              type="radio"
              name="portStatus"
              value="blank"
              checked={portStatus === "blank"}
              onChange={() => setportStatus("blank")}
            />
          blank
          </label>
          <label>
            <input
              type="radio"
              name="portStatus"
              value="all"
              checked={portStatus === "all"}
              onChange={() => setportStatus("all")}
            />
            All
          </label>
        </div>
      </div>
      <div className="dropdown">
        <div className="dropbtn">Kotak_Send_date Diff</div>
        <div className="dropdown-content">
          <label>
            <input
              type="radio"
              name="dateStatus"
              value="done"
              checked={dateStatus === "done"}
              onChange={() => setdateStatus("done")}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="dateStatus"
              value="notDone"
              checked={dateStatus === "notDone"}
              onChange={() => setdateStatus("notDone")}
            />
            No
          </label>
          <label>
            <input
              type="radio"
              name="dateStatus"
              value="all"
              checked={dateStatus === "all"}
              onChange={() => setdateStatus("all")}
            />
            All
          </label>
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
      <th>Kotak Mobile no.</th>
      <th>ESL Mobile no.</th>
      <th>Kotak Email</th>
      <th>ESL Email</th>
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




























