

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import * as XLSX from "xlsx";
// import './details.css'


// // Record component for rendering each row in the table
// const Record = (props) => (
//   <tr>
//     <td>{props.record.priority}</td>
//     <td>{props.record.clname}</td>
//     <td>{props.record.ucc}</td>
//     <td>{props.record.kslucc}</td>
//     <td>{props.record.ks_panno}</td>
//     <td>{props.record.locationid}</td>
    

//     <td>
//     <button className="btn btn-link"
//       onClick={() => {
//         props.setSelectedRecord(props.record);
//       }}
//     >
//       View
//     </button>
      
    
//       <button
//         className="btn btn-link"
//         onClick={() => {
//           props.viewRecord(props.record);
//         }}
//       >
//         View
//       </button>
      
//     </td>
//   </tr>
// );

// // RecordList component
// export default function RecordList() {
//   // State variables
//   const [records, setRecords] = useState([]);
//   const [letters, setLetters] = useState([]);
//   const [initialFetchComplete, setInitialFetchComplete] = useState(false);
//   const [showEmptyCloserTrf, setShowEmptyCloserTrf] = useState(false);
//   const [viewRecordDetails, setViewRecordDetails] = useState(null);
//   const [excelData, setExcelData] = useState(null);
//   const [excelDataForView, setExcelDataForView] = useState(null);
//   const [selectedRecords, setSelectedRecords] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false); // Added loading state
//   const [MobileStatus, setMobileStatus] = useState("all"); // Default to show all records
//   const [kslStatus, setkslStatus] = useState("all");
//   const [showCheckpoint, setShowCheckpoint] = useState(false);
//   const [showCheckpoint2, setShowCheckpoint2] = useState(false);
//   const [showCheckpoint3, setShowCheckpoint3] = useState(false);
//   const [showCheckpoint4, setShowCheckpoint4] = useState(false);
//   const [showCheckpoint5, setShowCheckpoint5] = useState(false);
//   const [showCheckpoint6, setShowCheckpoint6] = useState(false);
//   const [viewDetails, setViewDetails] = useState(null);
//   const [showTables, setShowTables] = useState(false);
//   const [EmailStatus, setemailStatus] = useState("all");
//   const [NomStatus, setnomStatus] = useState("all");
//   const [SegmentStatus, setsegmentStatus] = useState("all");
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [secondSearchTerm, setsecondSearchTerm] = useState("");

//   // const [records, setRecords] = useState([]);
//   // const [letters, setLetters] = useState([]);
//   const [selectedLetter, setSelectedLetter] = useState(null);
//   const [esigns, setEsigns] = useState([]);
//   const [selectedEsign, setSelectedEsign] = useState(null);
//   const [selectedRecord, setSelectedRecord] = useState(null);

//   const [showA, setShowA] = useState(true);
//   const [showB, setShowB] = useState(false);
//   const [showC, setShowC] = useState(false);
//   const [showD, setShowD] = useState(false);
//   const [showE, setShowE] = useState(false);
//   const [showF, setShowF] = useState(false);
//   const [showG, setShowG] = useState(false);
//   const [showH, setShowH] = useState(false);
//   const [showI, setShowI] = useState(false);
//   const [showJ, setShowJ] = useState(false);
//   const [showK, setShowK] = useState(false);
//   const [showL, setShowL] = useState(false);

//   const handleClickA = () => {
//     setShowA(true);
//     setShowB(false);
//     setShowC(false);
//     setShowD(false);
//     setShowE(false);
//     setShowF(false);
//     setShowG(false);
//     setShowH(false);
//     setShowI(false);
//     setShowJ(false);
//     setShowK(false);
//     setShowL(false);
//   };

//   const handleClickB = () => {
//     setShowA(false);
//     setShowB(true);
//     setShowC(false);
//     setShowD(false);
//     setShowE(false);
//     setShowF(false);
//     setShowG(false);
//     setShowH(false);
//     setShowI(false);
//     setShowJ(false);
//     setShowK(false);
//     setShowL(false);
//   };

//   const handleClickC = () => {
//     setShowA(false);
//     setShowB(false);
//     setShowC(true);
//     setShowD(false);
//     setShowE(false);
//     setShowF(false);
//     setShowG(false);
//     setShowH(false);
//     setShowI(false);
//     setShowJ(false);
//     setShowK(false);
//     setShowL(false);
//   };
//   const handleClickD = () => {
//     setShowA(false);
//     setShowB(false);
//     setShowC(false);
//     setShowD(true);
//     setShowE(false);
//     setShowF(false);
//     setShowG(false);
//     setShowH(false);
//     setShowI(false);
//     setShowJ(false);
//     setShowK(false);
//     setShowL(false);
//   };
//   const handleClickE = () => {
//     setShowA(false);
//     setShowB(false);
//     setShowC(false);
//     setShowD(false);
//     setShowE(true);
//     setShowF(false);
//     setShowG(false);
//     setShowH(false);
//     setShowI(false);
//     setShowJ(false);
//     setShowK(false);
//     setShowL(false);
//   };
//   const handleClickF = () => {
//     setShowA(false);
//     setShowB(false);
//     setShowC(false);
//     setShowD(false);
//     setShowE(false);
//     setShowF(true);
//     setShowG(false);
//     setShowH(false);
//     setShowI(false);
//     setShowJ(false);
//     setShowK(false);
//     setShowL(false);
//   };

//   const handleClickG = () => {
//     setShowA(false);
//     setShowB(false);
//     setShowC(false);
//     setShowD(false);
//     setShowE(false);
//     setShowF(false);
//     setShowG(true);
//     setShowH(false);
//     setShowI(false);
//     setShowJ(false);
//     setShowK(false);
//     setShowL(false);
//   };


//   const handleClickH = () => {
//     setShowA(false);
//     setShowB(false);
//     setShowC(false);
//     setShowD(false);
//     setShowE(false);
//     setShowF(false);
//     setShowG(false);
//     setShowH(true);
//     setShowI(false);
//     setShowJ(false);
//     setShowK(false);
//     setShowL(false);
//   };

//   const handleClickI = () => {
//     setShowA(false);
//     setShowB(false);
//     setShowC(false);
//     setShowD(false);
//     setShowE(false);
//     setShowF(false);
//     setShowG(false);
//     setShowH(false);
//     setShowI(true);
//     setShowJ(false);
//     setShowK(false);
//     setShowL(false);
//   };

//   const handleClickJ = () => {
//     setShowA(false);
//     setShowB(false);
//     setShowC(false);
//     setShowD(false);
//     setShowE(false);
//     setShowF(false);
//     setShowG(false);
//     setShowH(false);
//     setShowI(false);
//     setShowJ(true);
//     setShowK(false);
//     setShowL(false);
//   };

//   const handleClickK = () => {
//     setShowA(false);
//     setShowB(false);
//     setShowC(false);
//     setShowD(false);
//     setShowE(false);
//     setShowF(false);
//     setShowG(false);
//     setShowH(false);
//     setShowI(false);
//     setShowJ(false);
//     setShowK(true);
//     setShowL(false);
//   };

//   const handleClickL = () => {
//     setShowA(false);
//     setShowB(false);
//     setShowC(false);
//     setShowD(false);
//     setShowE(false);
//     setShowF(false);
//     setShowG(false);
//     setShowH(false);
//     setShowI(false);
//     setShowJ(false);
//     setShowK(false);
//     setShowL(true);
//   };


//   const toggleDropdown = () => {
//     setDropdownVisible(!dropdownVisible);
//   };


//   let history = useNavigate();

//   // Fetch records on initial mount
//   // useEffect(() => {
//   //   async function getRecords() {
//   //     try {
//   //       setLoading(true);
  
//   //       // Fetch data from the first table
//   //       const responseTable1 = await fetch(`http://183.182.84.228:4005/record`);
//   //       if (!responseTable1.ok) {
//   //         const message = `An error occurred: ${responseTable1.statusText}`;
//   //         window.alert(message);
//   //         return;
//   //       }
//   //       const recordsTable1 = await responseTable1.json();
  
//   //       // Fetch data from the second table
//   //       const responseTable2 = await fetch(`http://202.54.6.34:4003/record`);
//   //       if (!responseTable2.ok) {
//   //         const message = `An error occurred: ${responseTable2.statusText}`;
//   //         window.alert(message);
//   //         return;
//   //       }
//   //       const recordsTable2 = await responseTable2.json();
  
//   //       // Filter records based on the condition that Location ID of the first table is equal to Location ID of the second table
//   //       const filteredRecords = recordsTable1.filter(recordTable1 =>
//   //         recordsTable2.some(recordTable2 => recordTable1.locationId === recordTable2.locationId)
//   //       );
  
//   //       setRecords(filteredRecords);
//   //       setInitialFetchComplete(true);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   }
  
//   //   if (!initialFetchComplete) {
//   //     getRecords();
//   //   }
  
//   //   return;
//   // }, [initialFetchComplete]);




//   useEffect(() => {
//     async function getData() {
//       const recordResponse = await fetch(`http://183.182.84.228:4005/record/`);
//       if (!recordResponse.ok) {
//         const message = `An error occurred: ${recordResponse.statusText}`;
//         window.alert(message);
//         return;
//       }
//       const records = await recordResponse.json();
//       setRecords(records);

//       const letterResponse = await fetch(`http://183.182.84.228:4005/letter/`);
//       if (!letterResponse.ok) {
//         const message = `An error occurred: ${letterResponse.statusText}`;
//         window.alert(message);
//         return;
//       }
//       const letters = await letterResponse.json();
//       setLetters(letters);
    


//     const esignResponse = await fetch(`http://183.182.84.228:4005/diff/`);
//     if (!esignResponse.ok) {
//       const message = `An error occurred: ${esignResponse.statusText}`;
//       window.alert(message);
//       return;
//     }
//     const esigns = await esignResponse.json();
//     setEsigns(esigns);
//   }


//     getData();

//     return;
//   }, [records.length, letters.length , esigns.length]);

//   // function recordList() {
//   //   return records.map((record) => {
//   //     return (
//   //       <Record
//   //         record={record}
//   //         deleteRecord={deleteRecord}
//   //         setSelectedLetter={setSelectedLetter}
//   //         key={record._id}
//   //       />
//   //     );
//   //   });
//   // }

//   function recordList() {
//     return records.map((record) => {
//       // Find the letter with the same ucc as the record
//       const letter = letters.find((letter) => letter.ucc === record.ucc);
//       const esign = esigns.find((esign) => esign.ucc === record.ucc);
  
//       return (
//         <Record
//           record={record}
//           deleteRecord={deleteRecord}
//           setSelectedLetter={setSelectedLetter}
//           letter={letter}
//           setSelectedEsign={setSelectedEsign}
//           esign={esign}
//           setSelectedRecord={setSelectedRecord} // Pass the setSelectedRecord function
//           key={record._id}
//         />
//       );
//     });
//   }








//   // Function to delete a record
//   async function deleteRecord(id) {
//     await fetch(`http://183.182.84.228:4005/${id}`, {
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




  
//   function viewRecord(record) {
//     setViewRecordDetails(record);
//     // Hide search bar and download buttons when viewing record
//     setSearchTerm("");
//     setsecondSearchTerm("");
//     // document.getElementById("searchBar").classList.add("hidden");
//     // document.getElementById("downloadButton").classList.add("hidden");

//     return records.map((record) => {
//       // Find the letter with the same ucc as the record
//       const letter = letters.find((letter) => letter.ucc === record.ucc);
//       const esign = esigns.find((esign) => esign.ucc === record.ucc);
  
//       return (
//         <Record
//           record={record}
//           deleteRecord={deleteRecord}
//           setSelectedLetter={setSelectedLetter}
//           letter={letter}
//           setSelectedEsign={setSelectedEsign}
//           esign={esign}
//           setSelectedRecord={setSelectedRecord} // Pass the setSelectedRecord function
//           key={record._id}
//         />
//       );
//     });
//   }


//   function viewdetail(record) {
//     setViewDetails(record);
//     // Hide search bar and download buttons when viewing record
//     setSearchTerm("");
//     // document.getElementById("searchBar").classList.add("hidden");
//     // document.getElementById("downloadButton").classList.add("hidden");
//   }



//   function filterRecordsByTerm(record, term) {
//     return (
//       (record.ucc && record.ucc.toLowerCase().includes(term.toLowerCase().trim())) ||
//       (record.kslucc && record.kslucc.toLowerCase().includes(term.toLowerCase().trim())) ||
//       (record.ks_panno && record.ks_panno.toLowerCase().includes(term.toLowerCase().trim())) ||
//       (record.clname && record.clname.toLowerCase().includes(term.toLowerCase().trim()))
//     );
//   }




//   // Function to filter records based on search term
//  // Function to filter records based on search term
//  const toggleShowEmptyCloserTrf = () => {
//   setShowEmptyCloserTrf((prev) => !prev);
// };

// // Function to filter records based on search term and checkbox state
// function filteredRecords() {
//   const terms = searchTerm.split(',');
  

//   let filtered = records.filter((record) =>
//     terms.some((term) =>
//       ((record.locationid && record.locationid.toLowerCase().includes(term.toLowerCase().trim()))) ||
//       false // Add a fallback to handle cases where the property is undefined
//     )
//   );
//   const selectedRecordsSet = new Set(selectedRecords.map((record) => record._id));

//   if(kslStatus === "all"){
//     if (EmailStatus === "done") {
//       filtered = filtered.filter((record) => record.mtc_email === "No");
//     } else if (EmailStatus === "notDone") {
//       filtered = filtered.filter((record) => record.mtc_email === "Yes");
//     }
  
//     if (NomStatus === "done") {
//       filtered = filtered.filter((record) => record.mtc_nomn === "No");
//     } else if (NomStatus === "notDone") {
//       filtered = filtered.filter((record) => record.mtc_nomn === "Yes");
//     }
  
//     if (SegmentStatus === "done") {
//       filtered = filtered.filter((record) =>  record.mtc_nsecm === "No" || record.mtc_bsecm === "No" || record.mtc_mcx === "No" || record.mtc_ncdx === "No" || record.mtc_nsecds === "No" || record.mtc_nsefo === "No");
//     } else if (SegmentStatus === "notDone") {
//       filtered = filtered.filter((record) =>  record.mtc_nsecm === "Yes" && record.mtc_bsecm === "Yes" && record.mtc_mcx === "Yes" && record.mtc_ncdx === "Yes" && record.mtc_nsecds === "Yes" && record.mtc_nsefo === "Yes");
//     }
//     if (MobileStatus === "done") {
//       filtered = filtered.filter((record) => record.mtc_mobile === "No");
//     } else if (MobileStatus === "notDone") {
//       filtered = filtered.filter((record) => record.mtc_mobile === "Yes");
//     }
//   }


//   if (kslStatus === "done") {
//     filtered = filtered.filter((record) => record.mtc_mobile === "No" || record.mtc_email === "No" || record.mtc_nomn === "No" || record.mtc_nsecm === "No" || record.mtc_bsecm === "No" || record.mtc_mcx === "No" || record.mtc_ncdx === "No" || record.mtc_nsecds === "No" || record.mtc_nsefo === "No");

//     if (EmailStatus === "done") {
//       filtered = filtered.filter((record) => record.mtc_email === "No");
//     } else if (EmailStatus === "notDone") {
//       filtered = filtered.filter((record) => record.mtc_email === "Yes");
//     }
  
//     if (NomStatus === "done") {
//       filtered = filtered.filter((record) => record.mtc_nomn === "No");
//     } else if (NomStatus === "notDone") {
//       filtered = filtered.filter((record) => record.mtc_nomn === "Yes");
//     }
  
//     if (SegmentStatus === "done") {
//       filtered = filtered.filter((record) =>  record.mtc_nsecm === "No" || record.mtc_bsecm === "No" || record.mtc_mcx === "No" || record.mtc_ncdx === "No" || record.mtc_nsecds === "No" || record.mtc_nsefo === "No");
//     } else if (SegmentStatus === "notDone") {
//       filtered = filtered.filter((record) =>  record.mtc_nsecm === "Yes" && record.mtc_bsecm === "Yes" && record.mtc_mcx === "Yes" && record.mtc_ncdx === "Yes" && record.mtc_nsecds === "Yes" && record.mtc_nsefo === "Yes");
//     }
//     if (MobileStatus === "done") {
//       filtered = filtered.filter((record) => record.mtc_mobile === "No");
//     } else if (MobileStatus === "notDone") {
//       filtered = filtered.filter((record) => record.mtc_mobile === "Yes");
//     }
//   } else if (kslStatus === "notDone") {
//     filtered = filtered.filter((record) => record.mtc_mobile === "Yes" && record.mtc_email === "Yes" && record.mtc_nomn === "Yes" && record.mtc_nsecm === "Yes" && record.mtc_bsecm === "Yes" && record.mtc_mcx === "Yes" && record.mtc_ncdx === "Yes" && record.mtc_nsecds === "Yes" && record.mtc_nsefo === "Yes");
//   }


//   if (secondSearchTerm) {
//     filtered = filtered.filter((record) => {
//       const secondSearchTerms = secondSearchTerm.split(',');
//       return secondSearchTerms.some((term) => filterRecordsByTerm(record, term));
//     });
//   }
  

//   const sortedRecords = filtered.sort((a, b) => {
//     const aIsSelected = selectedRecordsSet.has(a._id);
//     const bIsSelected = selectedRecordsSet.has(b._id);

//     if (aIsSelected && !bIsSelected) {
//       return -1;
//     } else if (!aIsSelected && bIsSelected) {
//       return 1;
//     } else {
//       return 0;
//     }
//   });

//   return sortedRecords.map((record) => {
//     const letter = letters.find((letter) => letter.ucc === record.ucc);
//       const esign = esigns.find((esign) => esign.ucc === record.ucc);
//     <Record
//       record={record}

//       deleteRecord={() => deleteRecord(record._id)}
//     //   printRecord={() => printRecord(record)}
//       viewRecord={() => viewRecord(record)}
//       viewdetail={() => viewdetail(record)}
//       toggleSelectedRecord={toggleSelectedRecord}
//       setSelectedLetter={setSelectedLetter}
//       letter={letter}
//       setSelectedEsign={setSelectedEsign}
//       esign={esign}
//       setSelectedRecord={setSelectedRecord} // Pass the setSelectedRecord function
//       key={record._id}
//     />
// });
// }





//   // Function to navigate to edit page
//   // function editRecord(record) {
//   //   history(`/edit/${record.id}`);
//   // }

//   // Function to generate Excel data for all records
//   // Function to generate Excel data for selected records
// const generateAndDownloadView = () => {
//   const terms = searchTerm.split(',');
//   let filtered = records.filter((record) =>
//     terms.some((term) =>
//       ((record.locationid && record.locationid.toLowerCase().includes(term.toLowerCase().trim())) ||
//         (record.ucc && record.ucc.toLowerCase().includes(term.toLowerCase().trim())) ||
//         (record.kslucc && record.kslucc.toLowerCase().includes(term.toLowerCase().trim())) ||
//       (record.ks_panno && record.ks_panno.toLowerCase().includes(term.toLowerCase().trim()))) ||
//       (record.clname && record.clname.toLowerCase().includes(term.toLowerCase().trim())) ||
//       false // Add a fallback to handle cases where the property is undefined
//     )
//   );

//   if (MobileStatus === "done") {
//     filtered = filtered.filter((record) => record.mtc_mobile === "No");
//   } else if (MobileStatus === "notDone") {
//     filtered = filtered.filter((record) => record.mtc_mobile === "Yes");
//   }


//   if (kslStatus === "done") {
//     filtered = filtered.filter((record) => record.mtc_mobile === "No" || record.mtc_email === "No" || record.mtc_nomn === "No" || record.mtc_nsecm === "No" || record.mtc_bsecm === "No" || record.mtc_mcx === "No" || record.mtc_ncdx === "No" || record.mtc_nsecds === "No" || record.mtc_nsefo === "No");
//   } else if (kslStatus === "notDone") {
//     filtered = filtered.filter((record) => record.mtc_mobile === "Yes" && record.mtc_email === "Yes" && record.mtc_nomn === "Yes" && record.mtc_nsecm === "Yes" && record.mtc_bsecm === "Yes" && record.mtc_mcx === "Yes" && record.mtc_ncdx === "Yes" && record.mtc_nsecds === "Yes" && record.mtc_nsefo === "Yes");
//   }

//   if (EmailStatus === "done") {
//     filtered = filtered.filter((record) => record.mtc_email === "No");
//   } else if (EmailStatus === "notDone") {
//     filtered = filtered.filter((record) => record.mtc_email === "Yes");
//   }

//   if (NomStatus === "done") {
//     filtered = filtered.filter((record) => record.mtc_nomn === "No");
//   } else if (NomStatus === "notDone") {
//     filtered = filtered.filter((record) => record.mtc_nomn === "Yes");
//   }

//   if (SegmentStatus === "done") {
//     filtered = filtered.filter((record) =>  record.mtc_nsecm === "No" || record.mtc_bsecm === "No" || record.mtc_mcx === "No" || record.mtc_ncdx === "No" || record.mtc_nsecds === "No" || record.mtc_nsefo === "No");
//   } else if (SegmentStatus === "notDone") {
//     filtered = filtered.filter((record) =>  record.mtc_nsecm === "Yes" && record.mtc_bsecm === "Yes" && record.mtc_mcx === "Yes" && record.mtc_ncdx === "Yes" && record.mtc_nsecds === "Yes" && record.mtc_nsefo === "Yes");
//   }

//   const data = [
//     ["priority" ,"ks_frccode" ,"ucc" ,"kslucc" ,"clname" ,"es_catg" ,"ks_panno" ,"ks_emailid" ,"es_email" ,"mtc_email" ,"bo_email" ,"mtc_esboem" ,"ks_mobile" ,"es_mobile" ,"mtc_mobile" ,"bo_mobile" ,"mtc_esbomo" ,"locationid" ,"es_locncd" ,"es_locnid" ,"neoid" ,"odinid" ,"bossid" ,"ks_nsecm" ,"ensecm" ,"mtc_nsecm" ,"bo_nsecm" ,"mtc_bonsec" ,"ks_bsecm" ,"ebsecm" ,"mtc_bsecm" ,"bo_bsecm" ,"mtc_bobsec" ,"ks_nsefo" ,"ensefo" ,"mtc_nsefo" ,"bo_nsefo" ,"mtc_bonsef" ,"ks_nsecds" ,"ensecds" ,"mtc_nsecds" ,"bo_nsecds" ,"mtc_bonse2" ,"ks_mcx" ,"emcx" ,"mtc_mcx" ,"bo_mcx" ,
//     "mtc_bomcx" ,"ks_ncdex" ,"encdex" ,"mtc_ncdx" ,"bo_ncdex" ,"mtc_boncdx" ,"ks_nomn" ,"ks_nompan" , "ks_nomshr" ,"ks_relwapc" ,"es_nomn" ,"es_nompan" ,"es_nomshr" ,"es_relwapc" ,"mtc_nomn" ,"mtc_cmbkg" ,"mtc_fobkg" ,"mtc_combkg" ,"mtc_cdsbkg" ,"coradd1" ,"coradd2" ,"coradd3" ,"coradd4" ,"corcity" ,"corstate" ,"corpin" ,"corcntry" ,"escoradd1" ,"escoradd2" ,"escoradd3" ,"escoradd4" ,"escorcity" ,"escorstate" ,"escorpin" ,"escorcntry" ,"barcode" ,"brcd" ,"family_grp"
//     ],
//     ...filtered.map((record) => [record.priority , 	record.ks_frccode , 	record.ucc , 	record.kslucc , 	record.clname , 	record.es_catg , 	record.ks_panno , 	record.ks_emailid , 	record.es_email , 	record.mtc_email , 	record.bo_email , 	record.mtc_esboem , 	record.ks_mobile , 	record.es_mobile , 	record.mtc_mobile , 	record.bo_mobile , 	record.mtc_esbomo , 	record.locationid , 	record.es_locncd , 	record.es_locnid , 	record.neoid , 	record.odinid , 	record.bossid , 	record.ks_nsecm , 	record.ensecm , 	record.mtc_nsecm , 	record.bo_nsecm , 	record.mtc_bonsec , 	record.ks_bsecm , 	record.ebsecm , 	record.mtc_bsecm , 	record.bo_bsecm , 	record.mtc_bobsec , 	record.ks_nsefo , 	record.ensefo , 	record.mtc_nsefo , 	record.bo_nsefo , 	record.mtc_bonsef , 	record.ks_nsecds , 	record.ensecds , 	record.mtc_nsecds , 	record.bo_nsecds , 	record.mtc_bonse2 , 	record.ks_mcx , 	record.emcx , 	record.mtc_mcx , 	record.bo_mcx , 	record.mtc_bomcx , 	record.ks_ncdex , 	record.encdex , 	record.mtc_ncdx , 	record.bo_ncdex , 	record.mtc_boncdx , 	record.ks_nomn , 	record.ks_nompan , 	record.ks_nomshr , 	record.ks_relwapc , 	record.es_nomn , 	record.es_nompan , 	record.es_nomshr , 	record.es_relwapc , 	record.mtc_nomn , 	record.mtc_cmbkg , 	record.mtc_fobkg , 	record.mtc_combkg , 	record.mtc_cdsbkg , 	record.coradd1 , 	record.coradd2 , 	record.coradd3 , 	record.coradd4 , 	record.corcity , 	record.corstate , 	record.corpin , 	record.corcntry , 	record.escoradd1 , 	record.escoradd2 , 	record.escoradd3 , 	record.escoradd4 , 	record.escorcity , 	record.escorstate , 	record.escorpin , 	record.escorcntry , 	record.barcode , 	record.brcd , 	record.family_grp , 
//     ]),
//   ];

//   const ws = XLSX.utils.aoa_to_sheet(data);
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//   XLSX.writeFile(wb, "selected_records.xls");
// };


//   // Function to download Excel for all records


//   // Function to generate Excel data for the viewed record

//     const generateAndDownloadExcelForView = (record) => {
//       const data = [
//         ["priority" ,"ks_frccode" ,"ucc" ,"kslucc" ,"clname" ,"es_catg" ,"ks_panno" ,"ks_emailid" ,"es_email" ,"mtc_email" ,"bo_email" ,"mtc_esboem" ,"ks_mobile" ,"es_mobile" ,"mtc_mobile" ,"bo_mobile" ,"mtc_esbomo" ,"locationid" ,"es_locncd" ,"es_locnid" ,"neoid" ,"odinid" ,"bossid" ,"ks_nsecm" ,"ensecm" ,"mtc_nsecm" ,"bo_nsecm" ,"mtc_bonsec" ,"ks_bsecm" ,"ebsecm" ,"mtc_bsecm" ,"bo_bsecm" ,"mtc_bobsec" ,"ks_nsefo" ,"ensefo" ,"mtc_nsefo" ,"bo_nsefo" ,"mtc_bonsef" ,"ks_nsecds" ,"ensecds" ,"mtc_nsecds" ,"bo_nsecds" ,"mtc_bonse2" ,"ks_mcx" ,"emcx" ,"mtc_mcx" ,"bo_mcx" ,
//         "mtc_bomcx" ,"ks_ncdex" ,"encdex" ,"mtc_ncdx" ,"bo_ncdex" ,"mtc_boncdx" ,"ks_nomn" ,"ks_nompan" , "ks_nomshr" ,"ks_relwapc" ,"es_nomn" ,"es_nompan" ,"es_nomshr" ,"es_relwapc" ,"mtc_nomn" ,"mtc_cmbkg" ,"mtc_fobkg" ,"mtc_combkg" ,"mtc_cdsbkg" ,"coradd1" ,"coradd2" ,"coradd3" ,"coradd4" ,"corcity" ,"corstate" ,"corpin" ,"corcntry" ,"escoradd1" ,"escoradd2" ,"escoradd3" ,"escoradd4" ,"escorcity" ,"escorstate" ,"escorpin" ,"escorcntry" ,"barcode" ,"brcd" ,"family_grp"
//         ],
//         [record.priority , 	record.ks_frccode , 	record.ucc , 	record.kslucc , 	record.clname , 	record.es_catg , 	record.ks_panno , 	record.ks_emailid , 	record.es_email , 	record.mtc_email , 	record.bo_email , 	record.mtc_esboem , 	record.ks_mobile , 	record.es_mobile , 	record.mtc_mobile , 	record.bo_mobile , 	record.mtc_esbomo , 	record.locationid , 	record.es_locncd , 	record.es_locnid , 	record.neoid , 	record.odinid , 	record.bossid , 	record.ks_nsecm , 	record.ensecm , 	record.mtc_nsecm , 	record.bo_nsecm , 	record.mtc_bonsec , 	record.ks_bsecm , 	record.ebsecm , 	record.mtc_bsecm , 	record.bo_bsecm , 	record.mtc_bobsec , 	record.ks_nsefo , 	record.ensefo , 	record.mtc_nsefo , 	record.bo_nsefo , 	record.mtc_bonsef , 	record.ks_nsecds , 	record.ensecds , 	record.mtc_nsecds , 	record.bo_nsecds , 	record.mtc_bonse2 , 	record.ks_mcx , 	record.emcx , 	record.mtc_mcx , 	record.bo_mcx , 	record.mtc_bomcx , 	record.ks_ncdex , 	record.encdex , 	record.mtc_ncdx , 	record.bo_ncdex , 	record.mtc_boncdx , 	record.ks_nomn , 	record.ks_nompan , 	record.ks_nomshr , 	record.ks_relwapc , 	record.es_nomn , 	record.es_nompan , 	record.es_nomshr , 	record.es_relwapc , 	record.mtc_nomn , 	record.mtc_cmbkg , 	record.mtc_fobkg , 	record.mtc_combkg , 	record.mtc_cdsbkg , 	record.coradd1 , 	record.coradd2 , 	record.coradd3 , 	record.coradd4 , 	record.corcity , 	record.corstate , 	record.corpin , 	record.corcntry , 	record.escoradd1 , 	record.escoradd2 , 	record.escoradd3 , 	record.escoradd4 , 	record.escorcity , 	record.escorstate , 	record.escorpin , 	record.escorcntry , 	record.barcode , 	record.brcd , 	record.family_grp , 
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
// function clearSearchAndSelection() {
//   setSearchTerm(""); // Clear the search field
//   setSelectedRecords([]); // Uncheck all checkboxes
// }

// function updateSearchBar(selectedRecords) {
//   const searchValue = selectedRecords.map((record) => record.ucc).join(', ');
//   setSearchTerm(searchValue);
// }

// // Function to clear selected records
// function clearSelectedRecords() {
//   setSelectedRecords([]);
//   setSearchTerm("");
// }


// function handlePrint() {
//     window.print();
//   }




//   const shouldShowSections = kslStatus !== 'notDone' || kslStatus === 'all';


//   const navigateToPage = (page, location) => {
//     history({
//       pathname: location,
//     });
//   };

// function some() {
//   navigateToPage('diff', '/prio');
//   setShowCheckpoint(!showCheckpoint)
// }



// return (
  
//   <div>
    
      
//     {viewRecordDetails && selectedRecord ? (
//       <div>
//         {/* <button onClick={backToList}>Back</button> */}
//         <h3 style={{float:'right'}}><strong>Updated Date ::</strong> 29-Jan-24{/*{records.length > 0 && records[0].run_date ? records[0].run_date : 'N/A'}*/}</h3>
//         <h3>Exclusive KOTAK DIFFERENCE</h3>
//         <input
//   type="text"
//   placeholder="Search by Location-Id"
//   value={viewRecordDetails.locationid}
//   onChange={(e) => {
//     setSearchTerm(e.target.value);
//     setTimeout(backToList, 0);
//   }}
//   id="searchBar"
// />


//         <input
//   type="text"
//   placeholder="Search by Esl_Ucc/Ksl_Ucc/client_Name"
//   value={viewRecordDetails.kslucc}
//   onChange={(e) => {
//     setsecondSearchTerm(e.target.value);
//     if (e.target.value === '') {
//       backToList();
//     }
//   }}
//   id="searchBar"
// />



//        <h3>Details Of {viewRecordDetails.clname}</h3>
//           {/* Displaying record details */}
          
//     {/* <table  class="1" style={{border: "2px solid black"}}>
//       <thead style={{border: "2px solid black"}}>
//         <tr>
//           <th>  </th>
//           <th>Ucc</th>
//           <th>Ksl_Ucc</th>
//           <th>Name</th>
//           <th>PANCARD</th>
//           <th>Ks_LocationId</th>
//           <th>Es_LocationCd</th>
//           <th>Es_LocationId</th>
//         </tr>
//       </thead>
//       <tbody >
//         <tr>
//           <th>INFO.</th>
//           <td>{(viewRecordDetails.ucc|| 'NR')}</td>
//           <td>{(viewRecordDetails.kslucc|| 'NR')}</td>
//           <td>{(viewRecordDetails.clname|| 'NR')}</td>
//           <td>{viewRecordDetails.ks_panno|| 'NR'}</td>
//           <td>{viewRecordDetails.locationid}</td>
//           <td>{viewRecordDetails.es_locncd}</td>
//           <td>{viewRecordDetails.es_locnid}</td>
          
//         </tr>
//       </tbody>
//     </table> */}
    
//     {/* <button onClick={() => setShowCheckpoint(!showCheckpoint)}> A</button>
//     <button onClick={() => setShowCheckpoint2(!showCheckpoint2)}> B</button>
//     <button onClick={() => setShowCheckpoint3(!showCheckpoint3)}> C</button>
//     <button onClick={() => setShowCheckpoint4(!showCheckpoint4)}> D</button>
//     <button onClick={() => setShowCheckpoint5(!showCheckpoint5)}> E</button>
//     <button onClick={() => setShowCheckpoint6(!showCheckpoint6)}> F</button> */}


//     {/* <button onClick={() => some() }>A</button>
//       <button onClick={() => navigateToPage('B', './')}>B</button>
//       <button onClick={() => navigateToPage('C', './fist')}>C</button>
//       <button onClick={() => navigateToPage('D', './page1')}>D</button>
//       <button onClick={() => navigateToPage('E', './record4.js')}>E</button>
//       <button onClick={() => navigateToPage('F', './record5.js')}>F</button> */}
  
//   <button onClick={handleClickA} style={{ backgroundColor: showA ? '#cc99ff' : '#07c5ff' }}>GENERAL INFO</button>
//       {/* <button onClick={handleClickB} style={{ backgroundColor: showB ? '#cc99ff' : '#07c5ff' }}>BROKERAGE</button> */}
//       <button onClick={handleClickC} style={{ backgroundColor: showC ? '#cc99ff' : '#07c5ff' }}>Balance</button>
//       <button onClick={handleClickD} style={{ backgroundColor: showD ? '#cc99ff' : '#07c5ff' }}>DP SOH</button>
//       {/* <button onClick={handleClickE} style={{ backgroundColor: showE ? '#cc99ff' : '#07c5ff' }}>CASH/FDR MARGIN </button> */}
//       <button onClick={handleClickF} style={{ backgroundColor: showF ? '#cc99ff' : '#07c5ff' }}>LEDGER</button>
//       {/* <button onClick={handleClickG}>EMAILS</button> */}
//       <button onClick={handleClickH} style={{ backgroundColor: showH ? '#cc99ff' : '#07c5ff' }}>NET POSITION</button>
//       {/* <button onClick={handleClickI} style={{ backgroundColor: showI ? '#cc99ff' : '#07c5ff' }}>LOGIN HISTORY</button> */}
//       {/* <button onClick={handleClickJ} style={{ backgroundColor: showJ ? '#cc99ff' : '#07c5ff' }}>BUSINESS</button> */}
//       <button onClick={handleClickK} style={{ backgroundColor: showK ? '#cc99ff' : '#07c5ff' }}>PORTFOLIO</button>
//       {/* <button onClick={handleClickL} style={{ backgroundColor: showL ? '#cc99ff' : '#07c5ff' }}>DP HOLDING</button> */}
//       {/* <button onClick={handleClickB}>Brok</button> */}

//       {/* {showA && <div>Component A</div>}
//       {showB && <div>Component B</div>} */}
      
      

//   {showA && (
// <div>
//   <div style={{width:'50%', float:'left'}}>
// <table  class="1"  style={{marginTop:"10px"}} >
  
// <tr >
//   <th colSpan={2} style={{textAlign:"center"}}>Personal Information</th>

//   </tr>
//   <tr>
//   <th>Address: </th>
//   <td>{(selectedRecord.coradd1|| 'NR')}</td>
//   </tr>
//   {/* <tr>
//   <th>City: </th>
//   <td>{viewRecordDetails.corcity|| 'NR'}</td>
//   </tr>
//   <tr>
//   <th>Pin: </th>
//   <td>{(viewRecordDetails.corpin)}</td>
//   </tr> */}
//   <tr>
//   <th>Pan No: </th>
//   <td>{(viewRecordDetails.ks_panno)}</td>
//   </tr>
//   <tr>
//   <th>Email ID: </th>
//   <td>{(viewRecordDetails.ks_emailid)}</td>
//   </tr>
//   <tr>
//   <th>Mobile: </th>
//   <td>{(viewRecordDetails.ks_mobile)}</td>
//   </tr>
//   {/* <tr>
//   <th>State: </th>
//   <td>{(viewRecordDetails.corstate)}</td>
//   </tr>
//   <tr>
//   <th>Country: </th>
//   <td>{(viewRecordDetails.corcntry)}</td>
//   </tr> */}
//   </table>





//   {/* <table style={{marginTop:"10px"}}>
    
//     <tr  >
//   <th colSpan={2} style={{textAlign:"center"}}>Residental Information</th>

//   </tr>
//   <tr>
//   <th>Address: </th>
//   <td>{(viewRecordDetails.per_add1)}</td>
//   </tr>
//   <tr>
//   <th>City: </th>
//   <td>{(viewRecordDetails.per_city)}</td>
//   </tr>
//   <tr>
//   <th>Phone: </th>
//   <td>{(viewRecordDetails.ks_mobile)}</td>
//   </tr>
//   <tr>
//   <th>Pin: </th>
//   <td>{(viewRecordDetails.per_pin)}</td>
//   </tr>
//   </table>


// <label>
// Notes
//   <input type="textarea" placeholder="Notes.."/>
// </label> */}


// <table style={{marginTop:"10px"}}>
//   <tr >
//   <th colSpan={2} style={{textAlign:"center"}}>Branch Information</th>

//   </tr>
//   <tr>
//   <th>Branch: </th>
//   <td>{(viewRecordDetails.es_dphldg)}</td>
//   </tr>
//   <tr>
//   <th>City: </th>
//   <td>{(viewRecordDetails.es_dpledg)}</td>
//   </tr>
//   <tr>
//   <th>Pin: </th>
//   <td>{(viewRecordDetails.es_ledbal)}</td>
//   </tr>
//   <tr>
//   <th>Phone: </th>
//   <td>{(viewRecordDetails.es_lstrdt)}</td>
//   </tr>
//   </table>



// </div>






// <div style={{width:'50%', float:'right'}}>
//   <table style={{marginTop:"10px"}}> 
   
//     <tr >
//   <th colSpan={2} style={{textAlign:"center"}}>Other Information</th>

//   </tr>
//   <tr>
//   <th>Ucc: </th>
//   <td>{(viewRecordDetails.kslucc)}</td>
//   </tr>
//   <tr>
//   <th>Group Code: </th>
//   <td>{(viewRecordDetails.ks_essts)}</td>
//   </tr>
//   <tr>
//   <th>Sub-Broker: </th>
//   <td>{(viewRecordDetails.ks_frchis)}</td>
//   </tr>
//   <tr>
//   <th>Sub-Broker Code: </th>
//   <td>{(viewRecordDetails.ks_frccode)}</td>
//   </tr>
//   <tr>
//   <th>R.M.: </th>
//   <td>{(viewRecordDetails.qc_status)}</td>
//   </tr>
//   <tr>
//   <th>Dealer: </th>
//   <td>{(viewRecordDetails.ks_pndgsts)}</td>
//   </tr>
//   <tr>
//   <th>Sales Rep.: </th>
//   <td>{(viewRecordDetails.ru_sts)}</td>
//   </tr>
//   <tr>
//   <th>Running A/C: </th>
//   <td>
//   <th>F&O :</th>
//   <td>{(viewRecordDetails.kral_fno)}</td>
//   <th>NSC : </th>
//   <td>{(viewRecordDetails.kral_ncm)}</td>
//   </td>
//   </tr>
//   </table>




//   <table style={{marginTop:"10px"}}>
// <tr >
//   <th colSpan={2} style={{textAlign:"center"}}>Registration Information</th>

//   </tr>
//   <tr>
//   <th>Closer Transfer</th>
//   <td>{(viewRecordDetails.closer_trf)}</td>
//   </tr>
//   <tr>
//   <th>Branch</th>
//   <td>{(viewRecordDetails.brcd)}</td>
//   </tr>
//   <tr>
//   <th>Family Group</th>
//   <td>{(viewRecordDetails.family_grp)}</td>
//   </tr>
// </table>











  








// </div>




// </div>
//   )}




// {showB && (

   
// <table class="6">
//   <thead>
//     <tr>
//       <th></th>
//       <th>Unpledge SharesRDRGDFDFG</th>
//       <th>Suspend Client On ODIN</th>
//       <th>DP Closer Transfer</th>
//       <th>Realese Of fund From Exchange(If Credit)</th>
//       <th>Credit Balance TRF to Client</th>
//       <th>Closer A/C In Exchange</th>
      
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <th>INFO.</th>
//       <td>{viewRecordDetails.ucc}</td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
      
//     </tr>
//     <tr>
//       <th>SIGN</th>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
      
//     </tr>
//   </tbody>
// </table>
//   )}



// {showC && (

   
// <table class="6">
//   <thead>
//     <tr>
     
//       <th>SCRIPT</th>
//       <th>ISIN</th>
//       <th>EXCH</th>
//       <th>A/C</th>
//       <th>CLIENT ID</th>
//       <th>MARGIN QUANTITY</th>
//       <th>SETT # NO. </th>
//       <th>CLOSING RATE</th>
//       <th>HAIRCUT %</th>
//       <th>MARGIN VALUE</th>
      
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <th></th>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
      
      
//     </tr>
//   </tbody>
// </table>
//   )}

// {showD && (

// <table class="6">
// <thead>
//   <tr>
   
//     <th>SCRIPT</th>
//     <th>ISIN</th>
//     <th>EXCH</th>
//     <th>A/C</th>
//     <th>CLIENT ID</th>
//     <th>MARGIN QUANTITY</th>
//     <th>SETT # NO. </th>
//     <th>CLOSING RATE</th>
//     <th>HAIRCUT %</th>
//     <th>MARGIN VALUE</th>
    
//   </tr>
// </thead>
// <tbody>
//   <tr>
//     <th></th>
//     <td></td>
//     <td></td>
//     <td></td>
//     <td></td>
//     <td></td>
//     <td></td>
//     <td></td>
//     <td></td>
//     <td></td>
    
    
//   </tr>
// </tbody>
// </table>

//   )}

// {showE && (

   
// <table class="6">
//   <thead>
//     <tr>
      
//       <th>VOUCHER DATE</th>
//       <th>EXCHANGE</th>
//       <th>SETT #</th>
//       <th>ENTRY DETAILS</th>
//       <th>AMOUNT DEBIT</th>
//       <th>AMOUNT CREDIT</th>
//       <th>RUNNING BALANCE</th>
//       <th>DrCr</th>
      
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <th></th>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
      
//     </tr>
//   </tbody>
// </table>
//   )}

// {showF && (

   
// <table class="6">
//   <thead>
//     <tr>
      
//       <th>VOUCHER DATE</th>
//       <th>EXCHANGE</th>
//       <th>SETT #</th>
//       <th>ENTRY DETAILS</th>
//       <th>AMOUNT DEBIT</th>
//       <th>AMOUNT CREDIT</th>
//       <th>RUNNING BALANCE</th>
//       <th>DrCr</th>
      
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <th></th>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
      
//     </tr>
//   </tbody>
// </table>
//   )}

// {/* {showG && (

   
// <table class="6">
//   <thead>
//     <tr>
//       <th></th>
//       <th>Unpledge SharesRDRGDFDFG</th>
//       <th>Suspend Client On ODIN</th>
//       <th>DP Closer Transfer</th>
//       <th>Realese Of fund From Exchange(If Credit)</th>
//       <th>Credit Balance TRF to Client</th>
//       <th>Closer A/C In Exchange</th>
      
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <th>INFO.</th>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
      
//     </tr>
//     <tr>
//       <th>SIGN</th>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
      
//     </tr>
//   </tbody>
// </table>
//   )} */}


// {showH && (

   
// <table class="6">
//   <thead>
//     <tr>
     
//       <th>TRADE DATE</th>
//       <th>SETTEMENT NO.</th>
//       <th>SHARE NAME</th>
//       <th>SHOW CI PURCHES</th>
//       <th>AVERAGE MARKET RATE</th>
//       <th>AVERAGE NET RATE</th>
//       <th>PURCHES AMOUNT </th>
//       <th>SHOW CI SALE</th>
//       <th>AVERAGE MARKET RATE</th>
//       <th>AVERAGE NET RATE</th>
      
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <th></th>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
      
      
//     </tr>
//   </tbody>
// </table>
//   )}


// {/* {showI && (

   
// <table class="6">
//   <thead>
//     <tr>
      
//       <th>DATE TIME</th>
//       <th>IP ADDRESS</th>
      
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <th></th>
//       <td></td>
 
      
//     </tr>
//   </tbody>
// </table>
//   )} */}



// {showJ && (
// <div>
   
// <table class="6">
//   <thead>
//     <tr>
//       <th>MONTH</th>
//       <th>CM SQUARE TURNOVER</th>
//       <th>CM SQUARE BROKERAGE</th>
//       <th>CM DELIVERY TURNOVER</th>
//       <th>CM DELIVERY BROKERAGE</th>
//       <th>FUTURE TURNOVER</th>
//       <th>EXPIREY TURNOVER</th>
//       <th>OPTION TURNOVER</th>
//       <th>ASN/EXC TURNOVER</th>
//       <th>FO BROKERAGE</th>
//       <th>TOTAL TURNOVER</th>
//       <th>TOTAL BROKERAGE</th>
      
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <th></th>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
      
//     </tr>
//   </tbody>
// </table>


// <table class="6">
//   <thead>
//     <tr>
//       <th>EXCHANGE</th>
//       <th>LAST TRADEING DATE</th>
  
      
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <th></th>
//       <td></td>
      
//     </tr>
//   </tbody>
// </table>

// </div>

//   )}


// {showK && (

   
// <div>
   
//    <table class="6">
//      <thead>
//        <tr>
//          <th>SEQURITY</th>
//          <th>OPENING STOCK</th>
//          <th>OPENING AMOUNT</th>
//          <th>PURCHES QUANTITY</th>
//          <th>PURCHES AMOUNT</th>
//          <th>SALE QUANTITY</th>
//          <th>SALE AMOUNT</th>
//          <th>SQURED QUANTITY</th>
//          <th>TRADEING PROFIT/LOSS</th>
//          <th>SHORT TERM PROFIT / LOSS</th>
//          <th>LONG TERM PROFIT / LOSS</th>
        
         
//        </tr>
//      </thead>
//      <tbody>
//        <tr>
//          <th></th>
//          <td></td>
//          <td></td>
//          <td></td>
//          <td></td>
//          <td></td>
//          <td></td>
//          <td></td>
//          <td></td>
//          <td></td>
//          <td></td>
        
         
//        </tr>
//      </tbody>
//    </table>
   
   
//    <table class="6">
//      <thead>
//        <tr>
//          <th>PORTFOLIO PROFIT / LOSS WITH ALL CHANGES</th>
//          <th>AMOUNT</th>
     
         
//        </tr>
//      </thead>
//      <tbody>
//        <tr>
//          <th></th>
//          <td></td>
         
//        </tr>
//      </tbody>
//    </table>
   
//    </div>
//   )}



// {showL && (

   
// <table class="6">
//   <thead>
//     <tr>
//       <th>IN</th>
//       <th>DP A/C</th>
//       <th>SHARE</th>
//       <th>ISIN</th>
//       <th>HOLD QUANTITY</th>
//       <th>PLEDGE QUANTITY</th>
//       <th>FREE QUANTITY</th>
//       <th>AMOUNT</th>
      
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <th></th>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
//       <td></td>
      
//     </tr>
//   </tbody>
// </table>
//   )}




// <div style={{position:"sticky"}}>
//           {/* Buttons for the specific record */}
//           {/* <button onClick={() => editRecord(viewRecordDetails)}>Edit</button> */}
//           <button onClick={(handlePrint)} style={{position:"sticky", bottom:"0"}}>Print</button>

//           <button onClick={() => viewdetail(viewDetails)} style={{position:"sticky", bottom:"0"}}>button</button>
//           {/* Button for generating and downloading Excel for the specific record */}
//           <button onClick={() => generateAndDownloadExcelForView(viewRecordDetails)} style={{position:"sticky", bottom:"0"}}>
//             Generate and Download Excel
//           </button>
// </div>
//           {/* <button onClick={backToList}>Back</button> */}
//       </div>
      
//     ) : (
        
    
//       <div>
        
//         <h3 style={{float:'right'}}><strong>Updated Date ::</strong> 29-Jan-24{/*{records.length > 0 && records[0].run_date ? records[0].run_date : 'N/A'}*/}</h3>
//         <h3>Exclusive KOTAK DIFFERENCE</h3>
//         <input
//           type="text"
//           placeholder="Search by Location-Id"
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             if (e.target.value === '') {
//               backToList();
//             }
//           }}
//           id="searchBar"
//         />
//         <input
//   type="text"
//   placeholder="Search by Esl_Ucc/Ksl_Ucc/client_Name"
//   value={secondSearchTerm}
//   onChange={(e) => {
//     setsecondSearchTerm(e.target.value);
//     if (e.target.value === '') {
//       backToList();
//     }
//   }}
//   id="searchBar"
// />

//         {/* {selectedRecords.length > 0 && (
//           <div>
//             <strong>Selected Records:</strong> {selectedRecords.map((record) => record.ucc).join(', ')}
//             <button onClick={clearSelectedRecords}>Clear Selection</button>
//           </div>
//         )} */}

//         <button onClick={() => generateAndDownloadView()}>Generate and Download Excel</button>
//         {/* <button onClick={() => printRecord(selectedRecords)}>Print Selected</button> */}
//         <button onClick={clearSearchAndSelection}>Clear</button><br/>

//         <table className="table table-striped table-scroll" style={{ marginTop: '50px' }}>
//           <thead >
//             <tr >
//               {/* <th style={{backgroundColor:'lightblue'}}>Select</th> */}
//               <th style={{backgroundColor:'lightblue'}}>priority</th>
//               <th style={{backgroundColor:'lightblue'}}>Name</th>
//               <th style={{backgroundColor:'lightblue'}}>Ucc</th>
//               <th style={{backgroundColor:'lightblue'}}>Ksl_Ucc</th>
//               <th style={{backgroundColor:'lightblue'}}>Pan</th>
              
//               <th style={{backgroundColor:'lightblue'}}>LocationId</th>
            
//               <th style={{backgroundColor:'lightblue'}}>Action</th>
//             </tr>
//           </thead>
//           <tbody>{filteredRecords()}
//           </tbody>
//         </table>
//         {loading && (
//         <div className="loading-central-circle"></div>
//       )}
//       </div>
//     )}
//   </div>
// );
// }














































// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";




// const Record = (props) => (
//   <tr>
//     <td>{props.record.clname}</td>
//     <td>{props.record.ucc}</td>
//     <td>{props.record.kslucc}</td>
//     <td>
//       <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
//       <button className="btn btn-link"
//         onClick={() => {
//           props.deleteRecord(props.record._id);
//         }}
//       >
//         Delete
//       </button> |
//       <button className="btn btn-link"
//       onClick={() => {
//         props.setSelectedRecord(props.record);
//       }}
//     >
//       View
//     </button>
    
//     </td>
//   </tr>
// );

// export default function RecordList() {
//   const [records, setRecords] = useState([]);
//   const [letters, setLetters] = useState([]);
//   const [selectedLetter, setSelectedLetter] = useState(null);
//   const [esigns, setEsigns] = useState([]);
//   const [selectedEsign, setSelectedEsign] = useState(null);
//   const [selectedRecord, setSelectedRecord] = useState(null);


//   useEffect(() => {
//     async function getData() {
//       const recordResponse = await fetch(`http://183.182.84.228:4005/record/`);
//       if (!recordResponse.ok) {
//         const message = `An error occurred: ${recordResponse.statusText}`;
//         window.alert(message);
//         return;
//       }
//       const records = await recordResponse.json();
//       setRecords(records);

//       const letterResponse = await fetch(`http://202.54.6.99:4003/dpsoh/`);
//       if (!letterResponse.ok) {
//         const message = `An error occurred: ${letterResponse.statusText}`;
//         window.alert(message);
//         return;
//       }
//       const letters = await letterResponse.json();
//       setLetters(letters);
    


//     const esignResponse = await fetch(`http://202.54.6.99:4003/dpsoh/`);
//     if (!esignResponse.ok) {
//       const message = `An error occurred: ${esignResponse.statusText}`;
//       window.alert(message);
//       return;
//     }
//     const esigns = await esignResponse.json();
//     setEsigns(esigns);
//   }


//     getData();

//     return;
//   }, [records.length, letters.length , esigns.length]);

//   async function deleteRecord(id) {
//     await fetch(`http://localhost:5050/record/${id}`, {
//       method: "DELETE"
//     });

//     const newRecords = records.filter((el) => el._id !== id);
//     setRecords(newRecords);
//   }

//   // function recordList() {
//   //   return records.map((record) => {
//   //     return (
//   //       <Record
//   //         record={record}
//   //         deleteRecord={deleteRecord}
//   //         setSelectedLetter={setSelectedLetter}
//   //         key={record._id}
//   //       />
//   //     );
//   //   });
//   // }

//   function recordList() {
//     return records.map((record) => {
//       // Find the letter with the same ucc as the record
//       const matchingLetters = letters.filter((letter) => letter.es_ucc === record.ucc);
//     const esign = esigns.find((esign) => esign.ucc === record.ucc);
  
//     return (
//       <Record
//         record={record}
//         deleteRecord={deleteRecord}
//         setSelectedLetter={setSelectedLetter}
//         letters={matchingLetters} // Pass all matching letters as prop
//         setSelectedEsign={setSelectedEsign}
//         esign={esign}
//         setSelectedRecord={setSelectedRecord} // Pass the setSelectedRecord function
//         key={record._id}
//       />
//       );
//     });
//   }
  

//   return (
//     <div>
//       <h3>Record List</h3>
//       {selectedRecord  ?(
//       <div>
//         <h3>Record Data</h3>
//         <p>{selectedRecord.clname}</p> {/* Display the clname of the selected record */}
//         <button className="btn btn-link"
//           onClick={() => {
//             const letter = letters.find((letter) => letter.ucc === selectedRecord.ucc);
//             setSelectedLetter(letter);
//           }}
//         >
//           View Letter
//         </button>
//         <button className="btn btn-link"
//           onClick={() => {
//             const matchingEsigns = esigns.filter((esign) => esign.es_ucc === selectedRecord.ucc);
//     setSelectedEsign(matchingEsigns);
//           }}
//         >
//           View Esign
//         </button>
      
    
//     {selectedLetter && (
//       <div>
//         <h3>Letter Data</h3>
//         <p>{selectedLetter.clname}</p> {/* Display the clname of the selected letter */}
//       </div>
//     )}
//     {selectedEsign && (
//   <div>
//     <h3>Esign Data</h3>
//     {selectedEsign.map((esign, index) => (
//       <div key={index}>
// <div>
   
// <table class="6">
//   <thead>
//     <tr>
     
 
// <th>clname</th>
// <th>brcd</th>
// <th>cl_grp</th>
// <th>dptype</th>







      
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
    
// <td>{esign.clname}</td>
// <td>{esign.brcd}</td>
// <td>{esign.cl_grp}</td>
// <td>{esign.dptype}</td>







      
      
//     </tr>
//   </tbody>
// </table>




// <table class="6">
//   <thead>
//     <tr>
     
//     <th>hldgdt</th>
// <th>soh_brcd</th>
// <th>ks_dpid</th>
// <th>cldpid</th>
// <th>location</th>
// <th>locnid</th>
// <th>dpsts</th>
// <th>isin</th>
      
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//     <td>{esign.hldgdt }</td>
// <td>{esign.soh_brcd }</td>
// <td>{esign.ks_dpid }</td>
// <td>{esign.cldpid }</td>
// <td>{esign.location }</td>
// <td>{esign.locnid }</td>
// <td>{esign.dpsts }</td>
// <td>{esign.isin }</td>
      
      
//     </tr>
//   </tbody>
// </table>




// <table class="6">
//   <thead>
//     <tr>
     
//     <th>ks_dpsoh</th>
// <th>scrate</th>
// <th>dp_sohval</th>
// <th>cc_id</th>
// <th>bkflag</th>
// <th>bklkcd</th>
// <th>lkinreldt</th>
// <th>scrname</th>
      
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//     <td>{esign.ks_dpsoh }</td>
// <td>{esign.scrate }</td>
// <td>{esign.dp_sohval }</td>
// <td>{esign.cc_id }</td>
// <td>{esign.bkflag }</td>
// <td>{esign.bklkcd }</td>
// <td>{esign.lkinreldt }</td>
// <td>{esign.scrname }</td>
      
      
//     </tr>
//   </tbody>
// </table>





// <table class="6">
//   <thead>
//     <tr>
     
//     <th>bactype</th>
// <th>catgdespn</th>
// <th>comsccd</th>
// <th>bsecode</th>
// <th>nsesymbl</th>
// <th>dpidpri</th>
// <th>varvfodp</th>
// <th>sccatg</th>
      
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//     <td>{esign.bactype }</td>
// <td>{esign.catgdespn }</td>
// <td>{esign.comsccd }</td>
// <td>{esign.bsecode }</td>
// <td>{esign.nsesymbl }</td>
// <td>{esign.dpidpri }</td>
// <td>{esign.varvfodp }</td>
// <td>{esign.sccatg }</td>
//       <br/>
      
//     </tr>
//   </tbody>
// </table>

// </div>
 
//       </div>
//     ))}
//   </div>
// )}

//     </div>

//     ):(

//       <div>
//       <table className="table table-striped" style={{ marginTop: 20 }}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Position</th>
//             <th>Level</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>{recordList()}</tbody>
//       </table>
//       </div>
//       )}
//     </div>
//   );
// }











// <div>
//         <h3>Record Data</h3>
//         <p>{selectedRecord.clname}</p> {/* Display the clname of the selected record */}
//         <button className="btn btn-link"
//           onClick={() => {
//             const letter = letters.find((letter) => letter.ucc === selectedRecord.ucc);
//             setSelectedLetter(letter);
//           }}
//         >
//           View Letter
//         </button>
//         <button className="btn btn-link"
//           onClick={() => {
//             const matchingEsigns = esigns.filter((esign) => esign.es_ucc === selectedRecord.ucc);
//     setSelectedEsign(matchingEsigns);
//           }}
//         >
//           View Esign
//         </button>
      
    
//     {selectedLetter && (
//       <div>
//         <h3>Letter Data</h3>
//         <p>{selectedLetter.clname}</p> {/* Display the clname of the selected letter */}
//       </div>
//     )}
//     {selectedEsign && (
//   <div>
//     <h3>Esign Data</h3>
//     {selectedEsign.map((esign, index) => (
//       <div key={index}>
//         <p>{esign.clname}</p> {/* Display the content of each esign */}
//       </div>
//     ))}
//   </div>
// )}

//     </div>










import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './details.css'



const Record = (props) => (
  <tr>
  <td>{props.record.priority}</td>
  <td>{props.record.clname}</td>
  <td>{props.record.ucc}</td>
  <td>{props.record.kslucc}</td>
  <td>{props.record.ks_panno}</td>
  <td>{props.record.locationid}</td>
  <td>
  
  <button className="btn btn-link"
      onClick={() => {
        props.setSelectedRecord(props.record);
        props.setSelectedLetter(props.letter);
        props.setSelectedEsign(props.esign);
      }}
    >
      View
    </button>
  </td>
</tr>
  // <tr>
  //   <td>{props.record.clname}</td>
  //   <td>{props.record.ucc}</td>
  //   <td>{props.record.kslucc}</td>
  //   <td>
  //     <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
  //     <button className="btn btn-link"
  //       onClick={() => {
  //         props.deleteRecord(props.record._id);
  //       }}
  //     >
  //       Delete
  //     </button> |
  //     <button className="btn btn-link"
  //     onClick={() => {
  //       props.setSelectedRecord(props.record);
  //     }}
  //   >
  //     View
  //   </button>
  //   </td>
  // </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [letters, setLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [esigns, setEsigns] = useState([]);
  const [selectedEsign, setSelectedEsign] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(false);
  const [showC, setShowC] = useState(false);
  const [showD, setShowD] = useState(false);
  const [showE, setShowE] = useState(false);
  const [showF, setShowF] = useState(false);
  const [showG, setShowG] = useState(false);
  const [showH, setShowH] = useState(false);
  const [showI, setShowI] = useState(false);
  const [showJ, setShowJ] = useState(false);
  const [showK, setShowK] = useState(false);
  const [showL, setShowL] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const [MobileStatus, setMobileStatus] = useState("all"); // Default to show all records
  const [kslStatus, setkslStatus] = useState("all");
  const [EmailStatus, setemailStatus] = useState("all");
  const [NomStatus, setnomStatus] = useState("all");
  const [SegmentStatus, setsegmentStatus] = useState("all");
  const [secondSearchTerm, setsecondSearchTerm] = useState("");
  const [hoveredDptype, setHoveredDptype] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  function handleHover(event, dptype) {
    setHoveredDptype(dptype);
    setMousePosition({ x: event.clientX, y: event.clientY });
  }

  function handleMouseLeave() {
    setHoveredDptype('');
  }





  const handleClickA = () => {
    setShowA(true);
    setShowB(false);
    setShowC(false);
    setShowD(false);
    setShowE(false);
    setShowF(false);
    setShowG(false);
    setShowH(false);
    setShowI(false);
    setShowJ(false);
    setShowK(false);
    setShowL(false);
  };

  const handleClickB = () => {
    setShowA(false);
    setShowB(true);
    setShowC(false);
    setShowD(false);
    setShowE(false);
    setShowF(false);
    setShowG(false);
    setShowH(false);
    setShowI(false);
    setShowJ(false);
    setShowK(false);
    setShowL(false);
  };

  const handleClickC = () => {
    setShowA(false);
    setShowB(false);
    setShowC(true);
    setShowD(false);
    setShowE(false);
    setShowF(false);
    setShowG(false);
    setShowH(false);
    setShowI(false);
    setShowJ(false);
    setShowK(false);
    setShowL(false);
  };
  const handleClickD = () => {
    setShowA(false);
    setShowB(false);
    setShowC(false);
    setShowD(true);
    setShowE(false);
    setShowF(false);
    setShowG(false);
    setShowH(false);
    setShowI(false);
    setShowJ(false);
    setShowK(false);
    setShowL(false);
  };
  const handleClickE = () => {
    setShowA(false);
    setShowB(false);
    setShowC(false);
    setShowD(false);
    setShowE(true);
    setShowF(false);
    setShowG(false);
    setShowH(false);
    setShowI(false);
    setShowJ(false);
    setShowK(false);
    setShowL(false);
  };
  const handleClickF = () => {
    setShowA(false);
    setShowB(false);
    setShowC(false);
    setShowD(false);
    setShowE(false);
    setShowF(true);
    setShowG(false);
    setShowH(false);
    setShowI(false);
    setShowJ(false);
    setShowK(false);
    setShowL(false);
  };

  const handleClickG = () => {
    setShowA(false);
    setShowB(false);
    setShowC(false);
    setShowD(false);
    setShowE(false);
    setShowF(false);
    setShowG(true);
    setShowH(false);
    setShowI(false);
    setShowJ(false);
    setShowK(false);
    setShowL(false);
  };


  const handleClickH = () => {
    setShowA(false);
    setShowB(false);
    setShowC(false);
    setShowD(false);
    setShowE(false);
    setShowF(false);
    setShowG(false);
    setShowH(true);
    setShowI(false);
    setShowJ(false);
    setShowK(false);
    setShowL(false);
  };

  const handleClickI = () => {
    setShowA(false);
    setShowB(false);
    setShowC(false);
    setShowD(false);
    setShowE(false);
    setShowF(false);
    setShowG(false);
    setShowH(false);
    setShowI(true);
    setShowJ(false);
    setShowK(false);
    setShowL(false);
  };

  const handleClickJ = () => {
    setShowA(false);
    setShowB(false);
    setShowC(false);
    setShowD(false);
    setShowE(false);
    setShowF(false);
    setShowG(false);
    setShowH(false);
    setShowI(false);
    setShowJ(true);
    setShowK(false);
    setShowL(false);
  };

  const handleClickK = () => {
    setShowA(false);
    setShowB(false);
    setShowC(false);
    setShowD(false);
    setShowE(false);
    setShowF(false);
    setShowG(false);
    setShowH(false);
    setShowI(false);
    setShowJ(false);
    setShowK(true);
    setShowL(false);
  };

  const handleClickL = () => {
    setShowA(false);
    setShowB(false);
    setShowC(false);
    setShowD(false);
    setShowE(false);
    setShowF(false);
    setShowG(false);
    setShowH(false);
    setShowI(false);
    setShowJ(false);
    setShowK(false);
    setShowL(true);
  };


  useEffect(() => {
    async function getData() {
      const recordResponse = await fetch(`http://183.182.84.228:4005/record/`);
      if (!recordResponse.ok) {
        const message = `An error occurred: ${recordResponse.statusText}`;
        window.alert(message);
        return;
      }
      const records = await recordResponse.json();
      setRecords(records);

      const letterResponse = await fetch(`http://183.182.84.228:4005/ledger/`);
      if (!letterResponse.ok) {
        const message = `An error occurred: ${letterResponse.statusText}`;
        window.alert(message);
        return;
      }
      const letters = await letterResponse.json();
      setLetters(letters);
    


    const esignResponse = await fetch(`http://183.182.84.228:4005/dpsoh/`);
    if (!esignResponse.ok) {
      const message = `An error occurred: ${esignResponse.statusText}`;
      window.alert(message);
      return;
    }
    const esigns = await esignResponse.json();
    setEsigns(esigns);
  }


    getData();

    document.addEventListener("keydown", handleKeyPress);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };

  }, [records.length, letters.length , esigns.length]);




  const handleKeyPress = (event) => {
    if (event.key === "Escape") {
      // Reset selectedRecord, selectedLetter, selectedEsign to null
      setSelectedRecord(null);
      setSelectedLetter(null);
      setSelectedEsign(null);
    }
  };



  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/record/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // function recordList() {
  //   return records.map((record) => {
  //     return (
  //       <Record
  //         record={record}
  //         deleteRecord={deleteRecord}
  //         setSelectedLetter={setSelectedLetter}
  //         key={record._id}
  //       />
  //     );
  //   });
  // }

  function recordList() {

    const terms = searchTerm.split(',');
    
  
    let filtered = records.filter((record) =>
      terms.some((term) =>
        ((record.locationid && record.locationid.toLowerCase().includes(term.toLowerCase().trim()))) ||
        false // Add a fallback to handle cases where the property is undefined
      )
    );
    const selectedRecordsSet = new Set(selectedRecords.map((record) => record._id));
  
    if(kslStatus === "all"){
      if (EmailStatus === "done") {
        filtered = filtered.filter((record) => record.mtc_email === "No");
      } else if (EmailStatus === "notDone") {
        filtered = filtered.filter((record) => record.mtc_email === "Yes");
      }
    
      if (NomStatus === "done") {
        filtered = filtered.filter((record) => record.mtc_nomn === "No");
      } else if (NomStatus === "notDone") {
        filtered = filtered.filter((record) => record.mtc_nomn === "Yes");
      }
    
      if (SegmentStatus === "done") {
        filtered = filtered.filter((record) =>  record.mtc_nsecm === "No" || record.mtc_bsecm === "No" || record.mtc_mcx === "No" || record.mtc_ncdx === "No" || record.mtc_nsecds === "No" || record.mtc_nsefo === "No");
      } else if (SegmentStatus === "notDone") {
        filtered = filtered.filter((record) =>  record.mtc_nsecm === "Yes" && record.mtc_bsecm === "Yes" && record.mtc_mcx === "Yes" && record.mtc_ncdx === "Yes" && record.mtc_nsecds === "Yes" && record.mtc_nsefo === "Yes");
      }
      if (MobileStatus === "done") {
        filtered = filtered.filter((record) => record.mtc_mobile === "No");
      } else if (MobileStatus === "notDone") {
        filtered = filtered.filter((record) => record.mtc_mobile === "Yes");
      }
    }
  
  
    if (kslStatus === "done") {
      filtered = filtered.filter((record) => record.mtc_mobile === "No" || record.mtc_email === "No" || record.mtc_nomn === "No" || record.mtc_nsecm === "No" || record.mtc_bsecm === "No" || record.mtc_mcx === "No" || record.mtc_ncdx === "No" || record.mtc_nsecds === "No" || record.mtc_nsefo === "No");
  
      if (EmailStatus === "done") {
        filtered = filtered.filter((record) => record.mtc_email === "No");
      } else if (EmailStatus === "notDone") {
        filtered = filtered.filter((record) => record.mtc_email === "Yes");
      }
    
      if (NomStatus === "done") {
        filtered = filtered.filter((record) => record.mtc_nomn === "No");
      } else if (NomStatus === "notDone") {
        filtered = filtered.filter((record) => record.mtc_nomn === "Yes");
      }
    
      if (SegmentStatus === "done") {
        filtered = filtered.filter((record) =>  record.mtc_nsecm === "No" || record.mtc_bsecm === "No" || record.mtc_mcx === "No" || record.mtc_ncdx === "No" || record.mtc_nsecds === "No" || record.mtc_nsefo === "No");
      } else if (SegmentStatus === "notDone") {
        filtered = filtered.filter((record) =>  record.mtc_nsecm === "Yes" && record.mtc_bsecm === "Yes" && record.mtc_mcx === "Yes" && record.mtc_ncdx === "Yes" && record.mtc_nsecds === "Yes" && record.mtc_nsefo === "Yes");
      }
      if (MobileStatus === "done") {
        filtered = filtered.filter((record) => record.mtc_mobile === "No");
      } else if (MobileStatus === "notDone") {
        filtered = filtered.filter((record) => record.mtc_mobile === "Yes");
      }
    } else if (kslStatus === "notDone") {
      filtered = filtered.filter((record) => record.mtc_mobile === "Yes" && record.mtc_email === "Yes" && record.mtc_nomn === "Yes" && record.mtc_nsecm === "Yes" && record.mtc_bsecm === "Yes" && record.mtc_mcx === "Yes" && record.mtc_ncdx === "Yes" && record.mtc_nsecds === "Yes" && record.mtc_nsefo === "Yes");
    }
  
  
    if (secondSearchTerm) {
      filtered = filtered.filter((record) => {
        const secondSearchTerms = secondSearchTerm.split(',');
        return secondSearchTerms.some((term) => filterRecordsByTerm(record, term));
      });
    }
      // Find the letter with the same ucc as the record
      
  

      
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



    return sortedRecords.map((record) => {
      
      
      // Find the letter with the same ucc as the record
      const letter = letters.find((letter) => letter.es_ucc === record.ucc);
      const matchingesign = esigns.filter((esign) => esign.es_ucc === record.ucc);
  
      return (
        <Record
          record={record}
          deleteRecord={deleteRecord}
          setSelectedLetter={setSelectedLetter}
          letter={letter}
          setSelectedEsign={setSelectedEsign}
          esign={matchingesign}
          setSelectedRecord={setSelectedRecord} // Pass the setSelectedRecord function
          key={record._id}
        />
      );
    });
  }

  


  function filterRecordsByTerm(record, term) {
    return (
      (record.ucc && record.ucc.toLowerCase().includes(term.toLowerCase().trim())) ||
      (record.kslucc && record.kslucc.toLowerCase().includes(term.toLowerCase().trim())) ||
      (record.ks_panno && record.ks_panno.toLowerCase().includes(term.toLowerCase().trim())) ||
      (record.clname && record.clname.toLowerCase().includes(term.toLowerCase().trim()))
    );
  }



  const backToList = () => {
    // Show search bar and download buttons when going back to the list
    setSearchTerm("");
    setSelectedRecord(null);
  };

  

  return (
    <div>
      
      {selectedRecord ?(
      <div>
        <h3 style={{float:'right'}}><strong>Updated Date ::</strong> {records.length > 0 && records[0].run_date ? records[0].run_date : 'N/A'}</h3>
        <h3>Exclusive KOTAK DIFFERENCE</h3>
        <input
  type="text"
  placeholder="Search by Location-Id"
  value={selectedRecord.locationid}
  onChange={(e) => {
    setSearchTerm(e.target.value);
    setTimeout(backToList, 0);
  }}
  id="searchBar"
/>
        <input
  type="text"
  placeholder="Search Esl_Ucc/Ksl_Ucc/client_Name"
  value={selectedRecord.kslucc}
  onChange={(e) => {
    setsecondSearchTerm(e.target.value);
    if (e.target.value === '') {
      backToList();
    }
  }}
  id="searchBar"
/>
        <p>{selectedRecord.clname}</p> {/* Display the clname of the selected record */}
        {/* <button className="btn btn-link"
          onClick={() => {
            const letter = letters.find((letter) => letter.es_ucc === selectedRecord.ucc);
            setSelectedLetter(letter);
          }}
        >
          View Letter
        </button>
        <button className="btn btn-link"
          onClick={() => {
            const esign = esigns.find((esign) => esign.ucc === selectedRecord.ucc);
            setSelectedEsign(esign);
          }}
        >
          View Esign
        </button> */}
      

        <button onClick={handleClickA} style={{ backgroundColor: showA ? '#cc99ff' : '#07c5ff' }}>GENERAL INFO</button>
      <button onClick={handleClickB} style={{ backgroundColor: showB ? '#cc99ff' : '#07c5ff' }}>Balance</button>
      <button style={{ backgroundColor: showC ? '#cc99ff' : '#07c5ff' }} onClick={handleClickC}>DP SOH</button>
      <button onClick={handleClickD} style={{ backgroundColor: showD ? '#cc99ff' : '#07c5ff' }}>Ledger</button>
      <button onClick={handleClickE} style={{ backgroundColor: showE ? '#cc99ff' : '#07c5ff' }}>Open Position</button>
      <button onClick={handleClickF} style={{ backgroundColor: showF ? '#cc99ff' : '#07c5ff' }}>Portfolio</button>

      <button onClick={handleClickI} style={{ backgroundColor: showG ? '#cc99ff' : '#07c5ff' }}>MTF Position</button>
      {/* <button onClick={handleClickJ} style={{ backgroundColor: showH ? '#cc99ff' : '#07c5ff' }}>Open Position</button> */}
      <button onClick={handleClickK} style={{ backgroundColor: showI ? '#cc99ff' : '#07c5ff' }}>Nominee Conformation</button>
      {/* <button onClick={handleClickL} style={{ backgroundColor: showL ? '#cc99ff' : '#07c5ff' }}>DP HOLDING</button> */}
      {/* <button onClick={handleClickB}>Brok</button> */}
      {/* <button onClick={handleClickG}>EMAILS</button> */}
            {/* <button onClick={handleClickE} style={{ backgroundColor: showE ? '#cc99ff' : '#07c5ff' }}>CASH/FDR MARGIN </button> */}






      {/* {selectedLetter && (
      <div>
        <h3>Letter Data</h3>
        <p>{selectedLetter.ledgbal}</p> 
      </div>
    )}
    {selectedEsign && (
      <div>
        <h3>Esign Data</h3>
        <p>{selectedEsign.clname}</p> 
      </div>
    )} */}







        {showA && (
<div>
  <div style={{width:'50%', float:'left'}}>
<table  class="1"  style={{marginTop:"10px"}} >
  
<tr >
  <th colSpan={2} style={{textAlign:"center"}}>Personal Information</th>

  </tr>
  <tr>
  <th>Address: </th>
  <td>{selectedRecord.coradd1}</td>
  </tr>
  <tr>
  <th>Pan No: </th>
  <td>{(selectedRecord.ks_panno)}</td>
  </tr>
  <tr>
  <th>Email ID: </th>
  <td>{(selectedRecord.ks_emailid)}</td>
  </tr>
  <tr>
  <th>Mobile: </th>
  <td>{(selectedRecord.ks_mobile)}</td>
  </tr>
  </table>



<table style={{marginTop:"10px"}}>
  <tr >
  <th colSpan={2} style={{textAlign:"center"}}>Branch Information</th>

  </tr>
  <tr>
  <th>Branch: </th>
  <td>{(selectedRecord.es_dphldg)}</td>
  </tr>
  <tr>
  <th>City: </th>
  <td>{(selectedRecord.es_dpledg)}</td>
  </tr>
  <tr>
  <th>Pin: </th>
  <td>{(selectedRecord.es_ledbal)}</td>
  </tr>
  <tr>
  <th>Phone: </th>
  <td>{(selectedRecord.es_lstrdt)}</td>
  </tr>
  </table>



</div>






<div style={{width:'50%', float:'right'}}>
  <table style={{marginTop:"10px"}}> 
   
    <tr >
  <th colSpan={2} style={{textAlign:"center"}}>Other Information</th>

  </tr>
  <tr>
  <th>Ucc: </th>
  <td>{(selectedRecord.kslucc)}</td>
  </tr>
  <tr>
  <th>Group Code: </th>
  <td>{(selectedRecord.ks_essts)}</td>
  </tr>
  <tr>
  <th>Sub-Broker: </th>
  <td>{(selectedRecord.ks_frchis)}</td>
  </tr>
  <tr>
  <th>Sub-Broker Code: </th>
  <td>{(selectedRecord.ks_frccode)}</td>
  </tr>
  <tr>
  <th>R.M.: </th>
  <td>{(selectedRecord.qc_status)}</td>
  </tr>
  <tr>
  <th>Dealer: </th>
  <td>{(selectedRecord.ks_pndgsts)}</td>
  </tr>
  <tr>
  <th>Sales Rep.: </th>
  <td>{(selectedRecord.ru_sts)}</td>
  </tr>
  <tr>
  <th>Running A/C: </th>
  <td>
  <th>F&O :</th>
  <td>{(selectedRecord.kral_fno)}</td>
  <th>NSE : </th>
  <td>{(selectedRecord.kral_ncm)}</td>
  </td>
  </tr>
  </table>




  <table style={{marginTop:"10px"}}>
<tr >
  <th colSpan={2} style={{textAlign:"center"}}>Registration Information</th>

  </tr>
  <tr>
  <th>Closer Transfer</th>
  <td>{(selectedRecord.closer_trf)}</td>
  </tr>
  <tr>
  <th>Branch</th>
  <td>{(selectedRecord.brcd)}</td>
  </tr>
  <tr>
  <th>Family Group</th>
  <td>{(selectedRecord.family_grp)}</td>
  </tr>
</table>


</div>




</div>
  )}


{showB && (
<div>
   
<table class="6">
  <thead>
    <tr>
<th>LedgerBalance </th>
<th>Ledger Balance day1 </th>
<th>Ledger Balance day2 </th>
<th>Total Un Billed </th>
<th>UnclearAmt </th>
<th>Total Balance </th>
<th>Exposure </th>
<th>Additional </th>
<th>Net Value </th>
<th>InitalMargin </th>
<th>JV150 </th>

      
    </tr>
  </thead>
  <tbody>
    <tr>
<td>{selectedLetter.ledgbal ? selectedLetter.ledgbal : "Null"} </td>
<td>{selectedLetter.date1 }</td>
<td>{selectedLetter.date2 }</td>
<td>{selectedLetter.tunbilled }</td>
<td>{selectedLetter.unclramt }</td>
<td>{selectedLetter.totalbal }</td>
<td>{selectedLetter.exposure }</td>
<td>{selectedLetter.additnal }</td>
<td>{selectedLetter.netvalue }</td>
<td>{selectedLetter.inimgn }</td>
<td>{selectedLetter.jv150 }</td>









      
    </tr>
  </tbody>
</table>


<table class="6">
  <thead>
    <tr>
    <th>PledgeshareQty P1&P3 </th>
<th>PledgeshareQty P2 </th>
<th>Security1 </th>
<th>Security2 </th>
<th>OtherMargin 1 </th>
<th>OtherMargin2 </th>
<th>DeliveredAmt </th>
<th>PendingProofAmt </th>
<th>PayoutPendingAmt </th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>{selectedLetter.pldgqp1p3 }</td>
<td>{selectedLetter.pldgqp2 }</td>
<td>{selectedLetter.security1 }</td>
<td>{selectedLetter.security2 }</td>
<td>{selectedLetter.othmgn1 }</td>
<td>{selectedLetter.othmgn2 }</td>
<td>{selectedLetter.delvdamt }</td>
<td>{selectedLetter.pndgprfamt }</td>
<td>{selectedLetter.popndgamt }</td>
      
    </tr>
  </tbody>
</table>


<table class="6">
  <thead>
    <tr>
    <th>Total Margin </th>
<th>NetMargin </th>
<th>Net Margin based on Pledge </th>
<th>DPSOHValue </th>
<th>Margin_post_VAR </th>
<th>Margin_post_HCUT </th>
<th>Margin_post_HCUT_Maintenance </th>
<th>Var_margin_LESS_SEC_Margin_POST_HCUT </th>
<th>AgeGreater5 </th>
<th>Excess_Margin </th>
<th>Derv_Margin </th>
<th>DP id status </th>
<th>DP id mapped as default </th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>{selectedLetter.tmargin }</td>
<td>{selectedLetter.netmargin }</td>
<td>{selectedLetter.nmgnboplg }</td>
<td>{selectedLetter.dpsohval }</td>
<td>{selectedLetter.mgnpostvr }</td>
<td>{selectedLetter.mgnpohc }</td>
<td>{selectedLetter.mgnpohcm }</td>
<td>{selectedLetter.vmlsmgnphc }</td>
<td>{selectedLetter.agegr5 }</td>
<td>{selectedLetter.exmargin }</td>
<td>{selectedLetter.dervmgn }</td>
<td>{selectedLetter.dpidsts }</td>
<td>{selectedLetter.dpidmapdf }</td>
      
    </tr>
  </tbody>
</table>




<table class="6">
  <thead>
    <tr>
    <th>Status in BSE </th>
<th>Status in NSE </th>
<th>Status in Derivatives Equities </th>
<th>Status in NSECDS </th>
<th>MCX Ledger balance </th>
<th>NCDEX Ledger balance </th>
<th>NSECDS Ledger balance </th>
<th>Last Tradeded Date </th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>{selectedLetter.stsinbse }</td>
<td>{selectedLetter.stsinnse }</td>
<td>{selectedLetter.stsderveq }</td>
<td>{selectedLetter.stsnsecds }</td>
<td>{selectedLetter.mcxledger }</td>
<td>{selectedLetter.ncdledger }</td>
<td>{selectedLetter.ncdsledger} </td>
<td>{selectedLetter.lsttrddt }</td>
      
    </tr>
  </tbody>
</table>





<table class="6">
  <thead>
    <tr>
    <th>Reasons for Deactivate 1 </th>
<th>Reasons for Deactivate 2 </th>
<th>Reasons for Deactivate 3 </th>
<th>Reasons for Deactivate 4 </th>
<th>Reasons for Deactivate 5 </th>
<th>Reasons for Deactivate 6 </th>
<th>Reasons for Deactivate 7 </th>
<th>Reasons for Deactivate 8 </th>
<th>Reasons for Deactivate 9 </th>
<th>Reasons for Deactivate 10 </th>
<th>Reasons for Deactivate 11 </th>
<th>Reasons for Deactivate 12 </th>
<th>Reasons for Deactivate 13 </th>
<th>Reasons for Deactivate 14 </th>
<th>Reasons for Deactivate 15 </th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>{selectedLetter.resfdact1 }</td>
<td>{selectedLetter.resfdact2 }</td>
<td>{selectedLetter.resfdact3 }</td>
<td>{selectedLetter.resfdact4 }</td>
<td>{selectedLetter.resfdact5 }</td>
<td>{selectedLetter.resfdact6 }</td>
<td>{selectedLetter.resfdact7 }</td>
<td>{selectedLetter.resfdact8 }</td>
<td>{selectedLetter.resfdact9 }</td>
<td>{selectedLetter.resfdact10 }</td>
<td>{selectedLetter.resfdact11 }</td>
<td>{selectedLetter.resfdact12 }</td>
<td>{selectedLetter.resfdact13 }</td>
<td>{selectedLetter.resfdact14 }</td>
<td>{selectedLetter.resfdact15 }</td>
      
    </tr>
  </tbody>
</table>



</div>
  )}



{showC && (
<div>

<table class="6">
  <thead>
    <tr>
     
    <th>bactype</th>
    <th>nsesymbl</th>
    <th>isin</th>
    <th>ks_dpsoh</th>
    <th>scrate</th>
    <th>dp_sohval</th>
    <th>bsecode</th>
    <th>hldgdt</th>
    {/* <th>scrname</th> */}
    <th>ks_dpid</th>
    <th>cldpid</th>
    <th>soh_brcd</th>
    <th>cc_id</th>
    <th>bkflag</th>
<th>bklkcd</th>
<th>lkinreldt</th>





<th>dpidpri</th>
<th>varvfodp</th>
<th>sccatg</th>


<th>catgdespn</th>
<th>comsccd</th>
      
    </tr>
  </thead>
  <tbody>

{selectedEsign.map((esign, index) => (
      

  
    <tr key={index}>
    <td>{esign.bactype }</td>
    <td onMouseEnter={(e) => handleHover(e, esign.scrname)}
                onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
                onMouseLeave={handleMouseLeave}>{esign.nsesymbl }</td>
    <td>{esign.isin }</td>
    <td>{esign.ks_dpsoh }</td>
    <td>{esign.scrate }</td>
    <td>{esign.dp_sohval }</td>
    <td>{esign.bsecode }</td>
    <td>{esign.hldgdt }</td>
    {/* <td>{esign.scrname }</td> */}
    <td>{esign.ks_dpid }</td>
    <td>{esign.cldpid }</td>
    <td>{esign.soh_brcd }</td>
    <td>{esign.cc_id }</td>
    <td>{esign.bkflag }</td>
<td>{esign.bklkcd }</td>
<td>{esign.lkinreldt }</td>
<td>{esign.dpidpri }</td>
<td>{esign.varvfodp }</td>
<td>{esign.sccatg }</td>
<td>{esign.catgdespn }</td>
<td>{esign.comsccd }</td>
    </tr>
     ))}
  </tbody>
</table>
{hoveredDptype && (
        <div style={{
          position: 'absolute',
          top: mousePosition.y + 10,
          left: mousePosition.x + 10,
          backgroundColor: 'white',
          padding: '5px',
          border: '1px solid #ccc',
        }}>
          <strong>Scrname:</strong> {hoveredDptype}
        </div>
      )}

   

</div>
  )}

{showD && (

<table class="6">
<thead>
  <tr>
   
    <th>SCRIPT</th>
    <th>ISIN</th>
    <th>EXCH</th>
    <th>A/C</th>
    <th>CLIENT ID</th>
    <th>MARGIN QUANTITY</th>
    <th>SETT # NO. </th>
    <th>CLOSING RATE</th>
    <th>HAIRCUT %</th>
    <th>MARGIN VALUE</th>
    
  </tr>
</thead>
<tbody>
  <tr>
    <th></th>
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

  )}

{showE && (

   
<table class="6">
  <thead>
    <tr>
      
      <th>VOUCHER DATE</th>
      <th>EXCHANGE</th>
      <th>SETT #</th>
      <th>ENTRY DETAILS</th>
      <th>AMOUNT DEBIT</th>
      <th>AMOUNT CREDIT</th>
      <th>RUNNING BALANCE</th>
      <th>DrCr</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      <th></th>
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
  )}

{showF && (
<div>

<table class="6">
  <thead>
    <tr>
     
    <th>ESL UCC</th>
<th>KSL UCC</th>
<th>Client Name</th>
<th>LocationId</th>
<th>LocationCD</th>
<th>Scrip Name</th>
<th>ISIN</th>
<th>Instrument</th>
<th>Qty</th>
<th>AvgCostPrice</th>
<th>CostValue</th>
<th>Market Value</th>
<th>UnReal</th>
<th>MktReturn</th>
<th>Date</th>
<th>Sq Gain</th>
<th>Del Gain</th>
<th>Bse Curr Price</th>
<th>Is Suspend</th>
<th>Common ScripCode</th>
<th>_Branch</th>
<th>Family Group</th>

      
    </tr>
  </thead>
  <tbody>

{selectedEsign.map((esign, index) => (
      

  
    <tr key={index}>
    {/* <td>{portf.es_ucc}</td>
<td>{portf.ucc}</td>
<td>{portf.clname}</td>
<td>{portf.location}</td>
<td>{portf.locnid}</td>
<td>{portf.sc_shrtnm}</td>
<td>{portf.isin}</td>
<td>{portf.instrument}</td>
<td>{portf.qty}</td>
<td>{portf.avgcost}</td>
<td>{portf.cost}</td>
<td>{portf.mktvalue}</td>
<td>{portf.unreal}</td>
<td>{portf.mreturn}</td>
<td>{portf.date}</td>
<td>{portf.sqgain}</td>
<td>{portf.delgain}</td>
<td>{portf.bse_clrate}</td>
<td>{portf.is_suspend}</td>
<td>{portf.comn_sccd}</td>
<td>{portf.brcd}</td>
<td>{portf.familygrp}</td> */}

    </tr>
     ))}
  </tbody>
</table>
   

</div>
  )}





<div >
    <button onClick={backToList}>Back</button>
</div>



    
   
    </div>

    ):(

      <div>
      <h3 style={{float:'right'}}><strong>Updated Date ::</strong> 29-Jan-24{/*{records.length > 0 && records[0].run_date ? records[0].run_date : 'N/A'}*/}</h3>
        <h3>Exclusive KOTAK DIFFERENCE</h3>
         <input
          type="text"
          placeholder="Search by Location-Id"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (e.target.value === '') {
              backToList();
            }
          }}
          id="searchBar"
        />
        <input
  type="text"
  placeholder="Search by Esl_Ucc/Ksl_Ucc/client_Name"
  value={secondSearchTerm}
  onChange={(e) => {
    setsecondSearchTerm(e.target.value);
    if (e.target.value === '') {
      backToList();
    }
  }}
  id="searchBar"
/>

        {/* {selectedRecords.length > 0 && (
          <div>
            <strong>Selected Records:</strong> {selectedRecords.map((record) => record.ucc).join(', ')}
            <button onClick={clearSelectedRecords}>Clear Selection</button>
          </div>
        )} */}

        {/* <button onClick={() => generateAndDownloadView()}>Generate and Download Excel</button> */}
        {/* <button onClick={() => printRecord(selectedRecords)}>Print Selected</button> */}
        {/* <button onClick={clearSearchAndSelection}>Clear</button><br/> */}

        <table className="table table-striped table-scroll" style={{ marginTop: '50px' }}>
          <thead >
            <tr >
              {/* <th style={{backgroundColor:'lightblue'}}>Select</th> */}
              <th style={{backgroundColor:'lightblue'}}>priority</th>
              <th style={{backgroundColor:'lightblue'}}>Name</th>
              <th style={{backgroundColor:'lightblue'}}>Ucc</th>
              <th style={{backgroundColor:'lightblue'}}>Ksl_Ucc</th>
              <th style={{backgroundColor:'lightblue'}}>Pan</th>
              
              <th style={{backgroundColor:'lightblue'}}>LocationId</th>
            
              <th style={{backgroundColor:'lightblue'}}>Action</th>
            </tr>
          </thead>
          <tbody>{recordList()}
          </tbody>
        </table>
        {loading && (
        <div className="loading-central-circle"></div>
      )}
      </div>
      )}
    </div>
  );
}

