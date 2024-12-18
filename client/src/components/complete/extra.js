



// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";




// const Record = (props) => (
//   <tr>
//   <td>{props.record.priority}</td>
//   <td>{props.record.clname}</td>
//   <td>{props.record.ucc}</td>
//   <td>{props.record.kslucc}</td>
//   <td>{props.record.ks_panno}</td>
//   <td>{props.record.locationid}</td>
//   <td>
  
//   <button className="btn btn-link"
//       onClick={() => {
//         props.setSelectedRecord(props.record);
//         props.setSelectedLetter(props.letter);
//         props.setSelectedEsign(props.esign);
//       }}
//     >
//       View
//     </button>
//   </td>
// </tr>
//   // <tr>
//   //   <td>{props.record.clname}</td>
//   //   <td>{props.record.ucc}</td>
//   //   <td>{props.record.kslucc}</td>
//   //   <td>
//   //     <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
//   //     <button className="btn btn-link"
//   //       onClick={() => {
//   //         props.deleteRecord(props.record._id);
//   //       }}
//   //     >
//   //       Delete
//   //     </button> |
//   //     <button className="btn btn-link"
//   //     onClick={() => {
//   //       props.setSelectedRecord(props.record);
//   //     }}
//   //   >
//   //     View
//   //   </button>
//   //   </td>
//   // </tr>
// );

// export default function RecordList() {
//   const [records, setRecords] = useState([]);
//   const [letters, setLetters] = useState([]);
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
//   const [selectedRecords, setSelectedRecords] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false); // Added loading state
//   const [MobileStatus, setMobileStatus] = useState("all"); // Default to show all records
//   const [kslStatus, setkslStatus] = useState("all");
//   const [EmailStatus, setemailStatus] = useState("all");
//   const [NomStatus, setnomStatus] = useState("all");
//   const [SegmentStatus, setsegmentStatus] = useState("all");
//   const [secondSearchTerm, setsecondSearchTerm] = useState("");





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

//       const letterResponse = await fetch(`http://202.54.6.99:4003/ledger/`);
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

//     document.addEventListener("keydown", handleKeyPress);

//     // Remove event listener when component unmounts
//     return () => {
//       document.removeEventListener("keydown", handleKeyPress);
//     };

//   }, [records.length, letters.length , esigns.length]);




//   const handleKeyPress = (event) => {
//     if (event.key === "Escape") {
//       // Reset selectedRecord, selectedLetter, selectedEsign to null
//       setSelectedRecord(null);
//       setSelectedLetter(null);
//       setSelectedEsign(null);
//     }
//   };



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

//     const terms = searchTerm.split(',');
    
  
//     let filtered = records.filter((record) =>
//       terms.some((term) =>
//         ((record.locationid && record.locationid.toLowerCase().includes(term.toLowerCase().trim()))) ||
//         false // Add a fallback to handle cases where the property is undefined
//       )
//     );
//     const selectedRecordsSet = new Set(selectedRecords.map((record) => record._id));
  
//     if(kslStatus === "all"){
//       if (EmailStatus === "done") {
//         filtered = filtered.filter((record) => record.mtc_email === "No");
//       } else if (EmailStatus === "notDone") {
//         filtered = filtered.filter((record) => record.mtc_email === "Yes");
//       }
    
//       if (NomStatus === "done") {
//         filtered = filtered.filter((record) => record.mtc_nomn === "No");
//       } else if (NomStatus === "notDone") {
//         filtered = filtered.filter((record) => record.mtc_nomn === "Yes");
//       }
    
//       if (SegmentStatus === "done") {
//         filtered = filtered.filter((record) =>  record.mtc_nsecm === "No" || record.mtc_bsecm === "No" || record.mtc_mcx === "No" || record.mtc_ncdx === "No" || record.mtc_nsecds === "No" || record.mtc_nsefo === "No");
//       } else if (SegmentStatus === "notDone") {
//         filtered = filtered.filter((record) =>  record.mtc_nsecm === "Yes" && record.mtc_bsecm === "Yes" && record.mtc_mcx === "Yes" && record.mtc_ncdx === "Yes" && record.mtc_nsecds === "Yes" && record.mtc_nsefo === "Yes");
//       }
//       if (MobileStatus === "done") {
//         filtered = filtered.filter((record) => record.mtc_mobile === "No");
//       } else if (MobileStatus === "notDone") {
//         filtered = filtered.filter((record) => record.mtc_mobile === "Yes");
//       }
//     }
  
  
//     if (kslStatus === "done") {
//       filtered = filtered.filter((record) => record.mtc_mobile === "No" || record.mtc_email === "No" || record.mtc_nomn === "No" || record.mtc_nsecm === "No" || record.mtc_bsecm === "No" || record.mtc_mcx === "No" || record.mtc_ncdx === "No" || record.mtc_nsecds === "No" || record.mtc_nsefo === "No");
  
//       if (EmailStatus === "done") {
//         filtered = filtered.filter((record) => record.mtc_email === "No");
//       } else if (EmailStatus === "notDone") {
//         filtered = filtered.filter((record) => record.mtc_email === "Yes");
//       }
    
//       if (NomStatus === "done") {
//         filtered = filtered.filter((record) => record.mtc_nomn === "No");
//       } else if (NomStatus === "notDone") {
//         filtered = filtered.filter((record) => record.mtc_nomn === "Yes");
//       }
    
//       if (SegmentStatus === "done") {
//         filtered = filtered.filter((record) =>  record.mtc_nsecm === "No" || record.mtc_bsecm === "No" || record.mtc_mcx === "No" || record.mtc_ncdx === "No" || record.mtc_nsecds === "No" || record.mtc_nsefo === "No");
//       } else if (SegmentStatus === "notDone") {
//         filtered = filtered.filter((record) =>  record.mtc_nsecm === "Yes" && record.mtc_bsecm === "Yes" && record.mtc_mcx === "Yes" && record.mtc_ncdx === "Yes" && record.mtc_nsecds === "Yes" && record.mtc_nsefo === "Yes");
//       }
//       if (MobileStatus === "done") {
//         filtered = filtered.filter((record) => record.mtc_mobile === "No");
//       } else if (MobileStatus === "notDone") {
//         filtered = filtered.filter((record) => record.mtc_mobile === "Yes");
//       }
//     } else if (kslStatus === "notDone") {
//       filtered = filtered.filter((record) => record.mtc_mobile === "Yes" && record.mtc_email === "Yes" && record.mtc_nomn === "Yes" && record.mtc_nsecm === "Yes" && record.mtc_bsecm === "Yes" && record.mtc_mcx === "Yes" && record.mtc_ncdx === "Yes" && record.mtc_nsecds === "Yes" && record.mtc_nsefo === "Yes");
//     }
  
  
//     if (secondSearchTerm) {
//       filtered = filtered.filter((record) => {
//         const secondSearchTerms = secondSearchTerm.split(',');
//         return secondSearchTerms.some((term) => filterRecordsByTerm(record, term));
//       });
//     }
//       // Find the letter with the same ucc as the record
      
  

      
//     const sortedRecords = filtered.sort((a, b) => {
//       const aIsSelected = selectedRecordsSet.has(a._id);
//       const bIsSelected = selectedRecordsSet.has(b._id);
  
//       if (aIsSelected && !bIsSelected) {
//         return -1;
//       } else if (!aIsSelected && bIsSelected) {
//         return 1;
//       } else {
//         return 0;
//       }
//     });



//     return sortedRecords.map((record) => {
      
      
//       // Find the letter with the same ucc as the record
//       const letter = letters.find((letter) => letter.es_ucc === record.ucc);
//       const esign = esigns.find((esign) => esign.es_ucc === record.ucc);
  
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

  


//   function filterRecordsByTerm(record, term) {
//     return (
//       (record.ucc && record.ucc.toLowerCase().includes(term.toLowerCase().trim())) ||
//       (record.kslucc && record.kslucc.toLowerCase().includes(term.toLowerCase().trim())) ||
//       (record.ks_panno && record.ks_panno.toLowerCase().includes(term.toLowerCase().trim())) ||
//       (record.clname && record.clname.toLowerCase().includes(term.toLowerCase().trim()))
//     );
//   }



//   const backToList = () => {
//     // Show search bar and download buttons when going back to the list
//     setSearchTerm("");
//     setSelectedRecord(null);
//   };

  

//   return (
//     <div>
      
//       {selectedRecord ?(
//       <div>
//         <h3 style={{float:'right'}}><strong>Updated Date ::</strong> 29-Jan-24{/*{records.length > 0 && records[0].run_date ? records[0].run_date : 'N/A'}*/}</h3>
//         <h3>Exclusive KOTAK DIFFERENCE</h3>
//         <input
//   type="text"
//   placeholder="Search by Location-Id"
//   value={selectedRecord.locationid}
//   onChange={(e) => {
//     setSearchTerm(e.target.value);
//     setTimeout(backToList, 0);
//   }}
//   id="searchBar"
// />


//         <input
//   type="text"
//   placeholder="Search by Esl_Ucc/Ksl_Ucc/client_Name"
//   value={selectedRecord.kslucc}
//   onChange={(e) => {
//     setsecondSearchTerm(e.target.value);
//     if (e.target.value === '') {
//       backToList();
//     }
//   }}
//   id="searchBar"
// />
//         <p>{selectedRecord.clname}</p> {/* Display the clname of the selected record */}
//         <button className="btn btn-link"
//           onClick={() => {
//             const letter = letters.find((letter) => letter.es_ucc === selectedRecord.ucc);
//             setSelectedLetter(letter);
//           }}
//         >
//           View Letter
//         </button>
//         <button className="btn btn-link"
//           onClick={() => {
//             const esign = esigns.find((esign) => esign.ucc === selectedRecord.ucc);
//             setSelectedEsign(esign);
//           }}
//         >
//           View Esign
//         </button>
      

//         <button onClick={handleClickA} style={{ backgroundColor: showA ? '#cc99ff' : '#07c5ff' }}>GENERAL INFO</button>
//       <button onClick={handleClickB} style={{ backgroundColor: showB ? '#cc99ff' : '#07c5ff' }}>Balance</button>
//       <button style={{ backgroundColor: showC ? '#cc99ff' : '#07c5ff' }} onClick={handleClickC}>DP SOH</button>
//       <button onClick={handleClickD} style={{ backgroundColor: showD ? '#cc99ff' : '#07c5ff' }}>LEDGER</button>

//       <button onClick={handleClickE} style={{ backgroundColor: showF ? '#cc99ff' : '#07c5ff' }}>NET position</button>
      
//       <button onClick={handleClickF} style={{ backgroundColor: showH ? '#cc99ff' : '#07c5ff' }}>PORTFOLIO</button>
//       {/* <button onClick={handleClickI} style={{ backgroundColor: showI ? '#cc99ff' : '#07c5ff' }}>LOGIN HISTORY</button> */}
//       {/* <button onClick={handleClickJ} style={{ backgroundColor: showJ ? '#cc99ff' : '#07c5ff' }}>BUSINESS</button> */}
//       {/* <button onClick={handleClickK} style={{ backgroundColor: showK ? '#cc99ff' : '#07c5ff' }}>PORTFOLIO</button> */}
//       {/* <button onClick={handleClickL} style={{ backgroundColor: showL ? '#cc99ff' : '#07c5ff' }}>DP HOLDING</button> */}
//       {/* <button onClick={handleClickB}>Brok</button> */}
//       {/* <button onClick={handleClickG}>EMAILS</button> */}
//             {/* <button onClick={handleClickE} style={{ backgroundColor: showE ? '#cc99ff' : '#07c5ff' }}>CASH/FDR MARGIN </button> */}






//       {/* {selectedLetter && (
//       <div>
//         <h3>Letter Data</h3>
//         <p>{selectedLetter.ledgbal}</p> 
//       </div>
//     )}
//     {selectedEsign && (
//       <div>
//         <h3>Esign Data</h3>
//         <p>{selectedEsign.clname}</p> 
//       </div>
//     )} */}







//         {showA && (
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
//   <tr>
//   <th>Pan No: </th>
//   <td>{(selectedRecord.ks_panno)}</td>
//   </tr>
//   <tr>
//   <th>Email ID: </th>
//   <td>{(selectedRecord.ks_emailid)}</td>
//   </tr>
//   <tr>
//   <th>Mobile: </th>
//   <td>{(selectedRecord.ks_mobile)}</td>
//   </tr>
//   </table>



// <table style={{marginTop:"10px"}}>
//   <tr >
//   <th colSpan={2} style={{textAlign:"center"}}>Branch Information</th>

//   </tr>
//   <tr>
//   <th>Branch: </th>
//   <td>{(selectedRecord.es_dphldg)}</td>
//   </tr>
//   <tr>
//   <th>City: </th>
//   <td>{(selectedRecord.es_dpledg)}</td>
//   </tr>
//   <tr>
//   <th>Pin: </th>
//   <td>{(selectedRecord.es_ledbal)}</td>
//   </tr>
//   <tr>
//   <th>Phone: </th>
//   <td>{(selectedRecord.es_lstrdt)}</td>
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
//   <td>{(selectedRecord.kslucc)}</td>
//   </tr>
//   <tr>
//   <th>Group Code: </th>
//   <td>{(selectedRecord.ks_essts)}</td>
//   </tr>
//   <tr>
//   <th>Sub-Broker: </th>
//   <td>{(selectedRecord.ks_frchis)}</td>
//   </tr>
//   <tr>
//   <th>Sub-Broker Code: </th>
//   <td>{(selectedRecord.ks_frccode)}</td>
//   </tr>
//   <tr>
//   <th>R.M.: </th>
//   <td>{(selectedRecord.qc_status)}</td>
//   </tr>
//   <tr>
//   <th>Dealer: </th>
//   <td>{(selectedRecord.ks_pndgsts)}</td>
//   </tr>
//   <tr>
//   <th>Sales Rep.: </th>
//   <td>{(selectedRecord.ru_sts)}</td>
//   </tr>
//   <tr>
//   <th>Running A/C: </th>
//   <td>
//   <th>F&O :</th>
//   <td>{(selectedRecord.kral_fno)}</td>
//   <th>NSC : </th>
//   <td>{(selectedRecord.kral_ncm)}</td>
//   </td>
//   </tr>
//   </table>




//   <table style={{marginTop:"10px"}}>
// <tr >
//   <th colSpan={2} style={{textAlign:"center"}}>Registration Information</th>

//   </tr>
//   <tr>
//   <th>Closer Transfer</th>
//   <td>{(selectedRecord.closer_trf)}</td>
//   </tr>
//   <tr>
//   <th>Branch</th>
//   <td>{(selectedRecord.brcd)}</td>
//   </tr>
//   <tr>
//   <th>Family Group</th>
//   <td>{(selectedRecord.family_grp)}</td>
//   </tr>
// </table>


// </div>




// </div>
//   )}


// {showB && (
// <div>
   
// <table class="6">
//   <thead>
//     <tr>
// <th>LedgerBalance </th>
// <th>Ledger Balance day1 </th>
// <th>Ledger Balance day2 </th>
// <th>Total Un Billed </th>
// <th>UnclearAmt </th>
// <th>Total Balance </th>
// <th>Exposure </th>
// <th>Additional </th>
// <th>Net Value </th>
// <th>InitalMargin </th>
// <th>JV150 </th>

      
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
// <td>{selectedLetter.ledgbal ? selectedLetter.ledgbal : "Null"} </td>
// <td>{selectedLetter.date1 }</td>
// <td>{selectedLetter.date2 }</td>
// <td>{selectedLetter.tunbilled }</td>
// <td>{selectedLetter.unclramt }</td>
// <td>{selectedLetter.totalbal }</td>
// <td>{selectedLetter.exposure }</td>
// <td>{selectedLetter.additnal }</td>
// <td>{selectedLetter.netvalue }</td>
// <td>{selectedLetter.inimgn }</td>
// <td>{selectedLetter.jv150 }</td>









      
//     </tr>
//   </tbody>
// </table>


// <table class="6">
//   <thead>
//     <tr>
//     <th>PledgeshareQty P1&P3 </th>
// <th>PledgeshareQty P2 </th>
// <th>Security1 </th>
// <th>Security2 </th>
// <th>OtherMargin 1 </th>
// <th>OtherMargin2 </th>
// <th>DeliveredAmt </th>
// <th>PendingProofAmt </th>
// <th>PayoutPendingAmt </th>
      
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//     <td>{selectedLetter.pldgqp1p3 }</td>
// <td>{selectedLetter.pldgqp2 }</td>
// <td>{selectedLetter.security1 }</td>
// <td>{selectedLetter.security2 }</td>
// <td>{selectedLetter.othmgn1 }</td>
// <td>{selectedLetter.othmgn2 }</td>
// <td>{selectedLetter.delvdamt }</td>
// <td>{selectedLetter.pndgprfamt }</td>
// <td>{selectedLetter.popndgamt }</td>
      
//     </tr>
//   </tbody>
// </table>


// <table class="6">
//   <thead>
//     <tr>
//     <th>Total Margin </th>
// <th>NetMargin </th>
// <th>Net Margin based on Pledge </th>
// <th>DPSOHValue </th>
// <th>Margin_post_VAR </th>
// <th>Margin_post_HCUT </th>
// <th>Margin_post_HCUT_Maintenance </th>
// <th>Var_margin_LESS_SEC_Margin_POST_HCUT </th>
// <th>AgeGreater5 </th>
// <th>Excess_Margin </th>
// <th>Derv_Margin </th>
// <th>DP id status </th>
// <th>DP id mapped as default </th>
      
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//     <td>{selectedLetter.tmargin }</td>
// <td>{selectedLetter.netmargin }</td>
// <td>{selectedLetter.nmgnboplg }</td>
// <td>{selectedLetter.dpsohval }</td>
// <td>{selectedLetter.mgnpostvr }</td>
// <td>{selectedLetter.mgnpohc }</td>
// <td>{selectedLetter.mgnpohcm }</td>
// <td>{selectedLetter.vmlsmgnphc }</td>
// <td>{selectedLetter.agegr5 }</td>
// <td>{selectedLetter.exmargin }</td>
// <td>{selectedLetter.dervmgn }</td>
// <td>{selectedLetter.dpidsts }</td>
// <td>{selectedLetter.dpidmapdf }</td>
      
//     </tr>
//   </tbody>
// </table>




// <table class="6">
//   <thead>
//     <tr>
//     <th>Status in BSE </th>
// <th>Status in NSE </th>
// <th>Status in Derivatives Equities </th>
// <th>Status in NSECDS </th>
// <th>MCX Ledger balance </th>
// <th>NCDEX Ledger balance </th>
// <th>NSECDS Ledger balance </th>
// <th>Last Tradeded Date </th>
      
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//     <td>{selectedLetter.stsinbse }</td>
// <td>{selectedLetter.stsinnse }</td>
// <td>{selectedLetter.stsderveq }</td>
// <td>{selectedLetter.stsnsecds }</td>
// <td>{selectedLetter.mcxledger }</td>
// <td>{selectedLetter.ncdledger }</td>
// <td>{selectedLetter.ncdsledger} </td>
// <td>{selectedLetter.lsttrddt }</td>
      
//     </tr>
//   </tbody>
// </table>





// <table class="6">
//   <thead>
//     <tr>
//     <th>Reasons for Deactivate 1 </th>
// <th>Reasons for Deactivate 2 </th>
// <th>Reasons for Deactivate 3 </th>
// <th>Reasons for Deactivate 4 </th>
// <th>Reasons for Deactivate 5 </th>
// <th>Reasons for Deactivate 6 </th>
// <th>Reasons for Deactivate 7 </th>
// <th>Reasons for Deactivate 8 </th>
// <th>Reasons for Deactivate 9 </th>
// <th>Reasons for Deactivate 10 </th>
// <th>Reasons for Deactivate 11 </th>
// <th>Reasons for Deactivate 12 </th>
// <th>Reasons for Deactivate 13 </th>
// <th>Reasons for Deactivate 14 </th>
// <th>Reasons for Deactivate 15 </th>
      
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//     <td>{selectedLetter.resfdact1 }</td>
// <td>{selectedLetter.resfdact2 }</td>
// <td>{selectedLetter.resfdact3 }</td>
// <td>{selectedLetter.resfdact4 }</td>
// <td>{selectedLetter.resfdact5 }</td>
// <td>{selectedLetter.resfdact6 }</td>
// <td>{selectedLetter.resfdact7 }</td>
// <td>{selectedLetter.resfdact8 }</td>
// <td>{selectedLetter.resfdact9 }</td>
// <td>{selectedLetter.resfdact10 }</td>
// <td>{selectedLetter.resfdact11 }</td>
// <td>{selectedLetter.resfdact12 }</td>
// <td>{selectedLetter.resfdact13 }</td>
// <td>{selectedLetter.resfdact14 }</td>
// <td>{selectedLetter.resfdact15 }</td>
      
//     </tr>
//   </tbody>
// </table>



// </div>
//   )}



// {showC && (
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
    
// <td>{selectedEsign.clname}</td>
// <td>{selectedEsign.brcd}</td>
// <td>{selectedEsign.cl_grp}</td>
// <td>{selectedEsign.dptype}</td>







      
      
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
//     <td>{selectedEsign.hldgdt }</td>
// <td>{selectedEsign.soh_brcd }</td>
// <td>{selectedEsign.ks_dpid }</td>
// <td>{selectedEsign.cldpid }</td>
// <td>{selectedEsign.location }</td>
// <td>{selectedEsign.locnid }</td>
// <td>{selectedEsign.dpsts }</td>
// <td>{selectedEsign.isin }</td>
      
      
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
//     <td>{selectedEsign.ks_dpsoh }</td>
// <td>{selectedEsign.scrate }</td>
// <td>{selectedEsign.dp_sohval }</td>
// <td>{selectedEsign.cc_id }</td>
// <td>{selectedEsign.bkflag }</td>
// <td>{selectedEsign.bklkcd }</td>
// <td>{selectedEsign.lkinreldt }</td>
// <td>{selectedEsign.scrname }</td>
      
      
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
//     <td>{selectedEsign.bactype }</td>
// <td>{selectedEsign.catgdespn }</td>
// <td>{selectedEsign.comsccd }</td>
// <td>{selectedEsign.bsecode }</td>
// <td>{selectedEsign.nsesymbl }</td>
// <td>{selectedEsign.dpidpri }</td>
// <td>{selectedEsign.varvfodp }</td>
// <td>{selectedEsign.sccatg }</td>
      
      
//     </tr>
//   </tbody>
// </table>

// </div>
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





// <div >
//     <button onClick={backToList}>Back</button>
// </div>



    
   
//     </div>

//     ):(

//       <div>
//       <h3 style={{float:'right'}}><strong>Updated Date ::</strong> 29-Jan-24{/*{records.length > 0 && records[0].run_date ? records[0].run_date : 'N/A'}*/}</h3>
//         <h3>Exclusive KOTAK DIFFERENCE</h3>
//          <input
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

//         {/* <button onClick={() => generateAndDownloadView()}>Generate and Download Excel</button> */}
//         {/* <button onClick={() => printRecord(selectedRecords)}>Print Selected</button> */}
//         {/* <button onClick={clearSearchAndSelection}>Clear</button><br/> */}

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
//           <tbody>{recordList()}
//           </tbody>
//         </table>
//         {loading && (
//         <div className="loading-central-circle"></div>
//       )}
//       </div>
//       )}
//     </div>
//   );
// }
















import React, { useEffect, useState } from "react";
import './details.css'
import * as XLSX from "xlsx";


const Record = (props) => (
  <tr>
  <td>{props.record.priority}</td>
  <td>{props.record.clname}</td>
  <td>{props.record.ucc}</td>
  <td>{props.record.kslucc}</td>
  <td>{props.record.ks_panno}</td>
  <td>{props.record.locationid}</td>
  <td>{props.record.closer_trf}</td>
  <td>
  
  <button className="btn btn-link"
      onClick={() => {
        props.setSelectedRecord(props.record);
        props.setSelectedLetter(props.letter);
        props.setSelectedEsign(props.esign);
        props.setSelectedPortf(props.portf);
        props.setSelectedNetpo(props.netpo);
        props.setSelectedMtfpo(props.mtfpo);
        props.setSelectedNominee(props.nominee);
      }}
    >
      View
    </button>
  </td>
</tr>

);

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [letters, setLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [esigns, setEsigns] = useState([]);
  const [selectedEsign, setSelectedEsign] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [portfs, setPortfs] = useState([]);
  const [selectedPortf, setSelectedPortf] = useState(null);
  const [netpos, setNetpos] = useState([]);
  const [selectedNetpo, setSelectedNetpo] = useState(null);
  const [mtfpos, setMtfpos] = useState([]);
  const [selectedMtfpo, setSelectedMtfpo] = useState(null);
  const [nominees, setNominees] = useState([]);
  const [selectedNominee, setSelectedNominee] = useState(null);
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
  const [isLoading, setIsLoading] = useState(true);
  const [initialFetchComplete, setInitialFetchComplete] = useState(false);


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
      setIsLoading(true);
      try {
        const urls = [
          'http://183.182.84.228:4005/letter/',
          'http://183.182.84.228:4005/ledger/',
          'http://183.182.84.228:4005/dpsoh/',
          'http://183.182.84.228:4005/portfo/',
          'http://183.182.84.228:4005/mtfpo/',
          'http://183.182.84.228:4005/nominee/',
          'http://183.182.84.228:4005/netpo/',
          // Add all your URLs here
        ];
        const allResponses = await Promise.all(urls.map(url => fetch(url)));
        const allData = await Promise.all(allResponses.map(response => response.json()));
        // Now allData is an array of responses, you can set your state here
        setRecords(allData[0]);
        setLetters(allData[1]);
        setEsigns(allData[2]);
        setPortfs(allData[3]);
        setMtfpos(allData[4]);
        setNominees(allData[5]);
        setNetpos(allData[6]);
        // Continue for all your states
      } catch (error) {
        window.alert(`An error occurred: ${error}`);
      }
      setIsLoading(false);
    }
    getData();
        document.addEventListener("keydown", handleKeyPress);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []); // Empty dependency array means this effect runs once on component mount



  const handleKeyPress = (event) => {
    if (event.key === "Escape") {
      // Reset selectedRecord, selectedLetter, selectedEsign to null
      setSelectedRecord(null);
      // setSelectedLetter(null);
      // setSelectedEsign(null);
      // setSelectedPortf(null);
      // setSelectedNetpo(null);
      // setSelectedMtfpo(null);
      // setSelectedNominee(null);
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




  function LoadingSpinner() {
    return (
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
        <div className="bounce4"></div>
        <div className="bounce5"></div>
        <div className="bounce6"></div>
        <div className="bounce7"></div>
      </div>
    );
  }





  function recordList() {

    const terms = searchTerm.split(',');
    
  
    let filtered = records.filter((record) =>
      terms.some((term) =>
        ((record.locationid && record.locationid.toLowerCase().includes(term.toLowerCase().trim()))) ||
        (record.ucc && record.ucc.toLowerCase().includes(term.toLowerCase().trim())) ||
      (record.kslucc && record.kslucc.toLowerCase().includes(term.toLowerCase().trim())) ||
      (record.ks_panno && record.ks_panno.toLowerCase().includes(term.toLowerCase().trim())) ||
      (record.clname && record.clname.toLowerCase().includes(term.toLowerCase().trim()))||
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
      const matchingportf = portfs.filter((portf) => portf.es_ucc === record.ucc);
      const matchingnetpo = netpos.filter((netpo) => netpo.es_ucc === record.ucc);
      const matchingmtfpo = mtfpos.filter((mtfpo) => mtfpo.es_ucc === record.ucc);
      const nominee = nominees.find((nominee) => nominee.ucc === record.ucc);
  



      




      return (
        <Record
          record={record}
          deleteRecord={deleteRecord}
          setSelectedLetter={setSelectedLetter}
          letter={letter}
          setSelectedEsign={setSelectedEsign}
          esign={matchingesign}
          setSelectedPortf={setSelectedPortf}
          portf={matchingportf}
          setSelectedNetpo={setSelectedNetpo}
          netpo={matchingnetpo}
          setSelectedMtfpo={setSelectedMtfpo}
          mtfpo={matchingmtfpo}
          setSelectedNominee={setSelectedNominee}
          nominee={nominee}
          setSelectedRecord={setSelectedRecord} // Pass the setSelectedRecord function
          key={record._id}
        />
      );
      
    });

  }

  

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

  


//   function extractSymbolNSE(str) {
//     let index = str.indexOf("NSE Cash:-");
//     if (index !== -1) {
//         let symbol = str.substring(index + "NSE Cash:-".length).trim();
//         return symbol ? symbol : 'NA';
//     }
//     return str;
// }

// function extractSymbolBSE(str) {
//   let index = str.indexOf("BSE Cash:-");
//   if (index !== -1) {
//       let symbol = str.substring(index + "BSE Cash:-".length).trim();
//       return symbol ? symbol : 'N/A';
//   }
//   return str;
// }
// function extractSymbolNSED(str) {
//   let index = str.indexOf("NSEDerv:-");
//   if (index !== -1) {
//       let symbol = str.substring(index + "NSEDerv:-".length).trim();
//       return symbol ? symbol : 'N/A';
//   }
//   return str;
// }
// function extractSymbolBSED(str) {
//   let index = str.indexOf("BSEDerv:-");
//   if (index !== -1) {
//       let symbol = str.substring(index + "BSEDerv:-".length).trim();
//   }
//   return str;
// }
// function extractSymbolNSEC(str) {
//   let index = str.indexOf("NSE CDS:-");
//   if (index !== -1) {
//       let symbol = str.substring(index + "NSE CDS:-".length).trim();
//   }
//   return str;
// }
// function extractSymbolBSEC(str) {
//   let index = str.indexOf("BSE CDS:-");
//   if (index !== -1) {
//       let symbol = str.substring(index + "BSE CDS:-".length).trim();
//   }
//   return str;
// }
// function extractSymbolMCSC(str) {
//   let index = str.indexOf("MCSCDS:-");
//   if (index !== -1) {
//       let symbol = str.substring(index + "MCSCDS:-".length).trim();
//   }
//   return str;
// }
// function extractSymbolNSEM(str) {
//   let index = str.indexOf("NSEMFSS:-");
//   if (index !== -1) {
//       let symbol = str.substring(index + "NSEMFSS:-".length).trim();
//   }
//   return str;
// }
// function extractSymbolBSES(str) {
//   let index = str.indexOf("BSESTARMF:-");
//   if (index !== -1) {
//       let symbol = str.substring(index + "BSESTARMF:-".length).trim();
//   }
//   return str;
// }
// function extractSymbolNSECO(str) {
//   let index = str.indexOf("NSECOM:-");
//   if (index !== -1) {
//       let symbol = str.substring(index + "NSECOM:-".length).trim();
//   }
//   return str;
// }
// function extractSymbolBSECO(str) {
//   let index = str.indexOf("BSECOM:-");
//   if (index !== -1) {
//       let symbol = str.substring(index + "BSECOM:-".length).trim();
//   }
//   return str;
// }
// function extractSymbolMCX(str) {
//   let index = str.indexOf("MCX:-");
//   if (index !== -1) {
//       let symbol = str.substring(index + "MCX:-".length).trim();
//   }
//   return str;
// }
// function extractSymbolNCDEX(str) {
//   let index = str.indexOf("NCDEX:-");
//   if (index !== -1) {
//       let symbol = str.substring(index + "NCDEX:-".length).trim();
//   }
//   return str;
// }
// function extractSymbolNSES(str) {
//   let index = str.indexOf("NSESLBM:-");
//   if (index !== -1) {
//       let symbol = str.substring(index + "NSESLMB:-".length).trim();
//   }
//   return str;
// }
// function extractSymbolBSCS(str) {
//   let index = str.indexOf("BSESLBM:-");
//   if (index !== -1) {
//       let symbol = str.substring(index + "BSESLBM:-".length).trim();
//   }
//   return str;
// }

// const symbolNSE = extractSymbolNSE(selectedLetter.resfdact1);
//     const symbolBSC = extractSymbolBSE(selectedLetter.resfdact2);
//     const symbolNSED = extractSymbolNSED(selectedLetter.resfdact3)

//     // If both symbols are 'NA', don't render the table
//     if (symbolNSE === 'NA' && symbolBSC === 'NA') {
//         return null;
//     }


  return (
    <div>
      
      {selectedRecord  ?(
      <div>
        <div style={{position:'sticky' , top:"0px"}}>
        <h6 style={{float:'right'}}><strong>Updated Date ::</strong> {records.length > 0 && records[0].run_date ? records[0].run_date : 'N/A'}</h6>
        <h6>Exclusive KOTAK CLINT INFO</h6>


        <table class="6">
  <thead>
    <tr>
    <th>UCC </th>
<th>Kotak UCC</th>
<th>Client Name</th>
<th>LocationId</th>
<th>Pan</th>  
<th>Kotak DP_Rate_Code</th>
<th>ESL DP_Rate_Code</th>
<th>Mobile</th>
<th>Email</th>   
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>{selectedRecord.ucc }</td>
<td>{selectedRecord.kslucc}</td>
<td>{selectedRecord.clname }</td>
<td>{selectedRecord.locationid}</td>
<td>{selectedRecord.ks_panno}</td> 
<td>{selectedRecord.ks_dprtcd}</td>
<td>{selectedRecord.es_dprtcd}</td>  
<td>{selectedRecord.ks_mobile}</td>   
<td>{selectedRecord.ks_emailid}</td>   
    </tr>
  </tbody>
</table>


<br/>




        {/* <input
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
/> */}
        {/* <p>{selectedRecord.clname}</p>  Display the clname of the selected record */}
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

      <button onClick={handleClickG} style={{ backgroundColor: showG ? '#cc99ff' : '#07c5ff' }}>MTF Position</button>
      {/* <button onClick={handleClickJ} style={{ backgroundColor: showH ? '#cc99ff' : '#07c5ff' }}>Open Position</button> */}
      <button onClick={handleClickH} style={{ backgroundColor: showH ? '#cc99ff' : '#07c5ff' }}>Nominee Conformation</button>
      {/* <button onClick={handleClickL} style={{ backgroundColor: showL ? '#cc99ff' : '#07c5ff' }}>DP HOLDING</button> */}
      {/* <button onClick={handleClickB}>Brok</button> */}
      {/* <button onClick={handleClickG}>EMAILS</button> */}
            {/* <button onClick={handleClickE} style={{ backgroundColor: showE ? '#cc99ff' : '#07c5ff' }}>CASH/FDR MARGIN </button> */}

</div>



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
  <th>Branch: </th>
  <td>{(selectedRecord.locnid)}</td>
  </tr>
  <tr>
  <th>Address: </th>
  <td>{selectedRecord.coradd1}</td>
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
  <tr>
  <th>Kotak DPBO_ID</th>
  <td>{(selectedRecord.ks_dpid)} - {selectedRecord.ksdp_boid}</td>
  </tr>
  </table>







</div>






<div style={{width:'50%', float:'right'}}>
  <table style={{marginTop:"10px"}}> 
   
    <tr >
  <th colSpan={2} style={{textAlign:"center"}}>Other Information</th>

  </tr>
  {/* <tr>
  <th>Ucc: </th>
  <td>{(selectedRecord.kslucc)}</td>
  </tr> */}
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
</div>

<table style={{marginTop:"20px"}}>
<thead>
  <tr >
  <th colSpan={6} style={{textAlign:"center"}}>Status</th>

  </tr>
  <tr>
  <th>BSE</th>
  <th>NSE</th>
  <th>F&O</th>
  <th>NSECDS</th>
  <th>MCX</th>
  <th>NCDEX</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>{selectedRecord.ks_bsecm}</td>
  <td>{ selectedRecord.ks_nsecm}</td>
  <td>{ selectedRecord.ks_nsefo}</td>
  <td>{ selectedRecord.ks_nsecds}</td>
  <td>{ selectedRecord.ks_mcx}</td>
  <td>{ selectedRecord.ks_ncdex}</td>
  </tr>
  <tr>
    <td>{selectedRecord.ptt_bsecm || '-'}</td>
    <td>{selectedRecord.ptt_nsecm || '-'}</td>
    <td>{selectedRecord.ptt_nsefo || '-'}</td>
    <td>{selectedRecord.ptt_nsecds || '-'}</td>
    <td>{selectedRecord.ptt_mcx || '-'}</td>
    <td>{selectedRecord.ptt_ncdex || '-'}</td>
  </tr>
  </tbody>
  </table>

<table>
  <tr>
<th>Reasons for Deactivate -AM</th>
<td>{selectedLetter && selectedLetter.resfdact1}</td>
</tr>
</table>

</div>
  )}


{showB && (
<div>
   




<div style={{width:'50%', float:'left'}}>
<table>
  <tr>
    

    
<th>LedgerBalance(With Ini+Exp Margin+Mtf)-(F)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{selectedLetter &&selectedLetter.ledgbal}</td>
</tr>
<tr>  
    <th>MTF Funding Value -(F4)</th>
    <td style={{backgroundColor:"white", textAlign:"right"}}>{selectedLetter &&selectedLetter.mtfundval}</td>
    </tr>
<tr>
<th>Total Un Billed-(G)</th>
<td style={{backgroundColor:"white", textAlign:"right"}}>{selectedLetter &&selectedLetter.tunbilled}</td>
</tr><tr>
<th>UnclearAmt-(H)</th>
<td style={{backgroundColor:"white", textAlign:"right"}}>{selectedLetter &&selectedLetter.unclramt}</td>
</tr>
<tr style={{border:"2px solid black"}}>
<th>Total Balance -(I=F+G+H)</th>
<td style={{border:"2px solid black", textAlign:"right"}}>{selectedLetter &&selectedLetter.totalbal}</td>
  </tr>



  <tr>  
  <th>InitalMargin-(J)</th>
<td style={{backgroundColor:"white", textAlign:"right"}}>{selectedLetter &&selectedLetter.inimgn}</td>
</tr><tr>
  <th>Exposure -(K)</th>
  <td style={{backgroundColor:"white", textAlign:"right"}}>{selectedLetter &&selectedLetter.exposure}</td>
  </tr><tr>
<th>AdditionalMargin-(L)</th>
<td style={{backgroundColor:"white", textAlign:"right"}}>{selectedLetter &&selectedLetter.additnal}</td>
</tr>

<tr style={{border:"2px solid black"}}>
<th>Net Value-(M=I-J-K-L)</th>
<td style={{border:"2px solid black", textAlign:"right" , backgroundColor:"lightgray"}}>{selectedLetter &&selectedLetter.netvalue}</td>
  </tr>







    <tr>
  <th>PledgeshareValue P1&P3 (NormalPledge)-(O)</th>
  <td style={{backgroundColor:"white", textAlign:"right"}}>{selectedLetter &&selectedLetter.pldgqp1p3}</td>
  </tr><tr>
<th>PledgeshareValue P2(MTF)-(P)</th>
<td style={{backgroundColor:"white", textAlign:"right"}}>{selectedLetter &&selectedLetter.pldgqp2}</td>
  </tr>



  <tr>

<th>Benificiary -(Q)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{selectedLetter &&selectedLetter.security1}</td>
</tr>
<tr>
<th>MF,SGB,T-Bill Etc-(R)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{selectedLetter &&selectedLetter.othmgn1}</td>
</tr>
<tr>
<th>Delivered Amt-(S)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{selectedLetter &&selectedLetter.delvdamt}</td>
</tr>

  <tr style={{border:"2px solid black"}}>  
  <th>Total Margin-(V=O+P+Q+R+S)</th>
  <td style={{backgroundColor:"lightgray", textAlign:"right" ,border:"2px solid black"}}>{selectedLetter &&selectedLetter.tmargin}</td>
</tr><tr style={{border:"2px solid black"}}>
<th>NetMargin-(W=V-M)</th>
<td style={{backgroundColor:"lightgray", textAlign:"right", border:"2px solid black"}}>{selectedLetter &&selectedLetter.netmargin}</td>
</tr><tr style={{border:"2px solid black"}}>
<th >Net Margin based on Pledge-(X=O+P+R-F)</th>

<td style={{backgroundColor:"lightgray", textAlign:"right" , border:"2px solid black"}}>{selectedLetter &&selectedLetter.nmgnboplg}</td>
  </tr>
  </table>

</div>





























<div style={{width:'50%', float:'right'}}>
<table>
  <tr>
  <th>MCX Ledger balance -(F1)</th>
  <td style={{backgroundColor:"white" , textAlign:"right"}}>{selectedLetter &&selectedLetter.mcxledger}</td>
  </tr><tr>
<th>NCDEX Ledger balance -(F2)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{selectedLetter &&selectedLetter.ncdledger}</td>
</tr><tr>
<th>NSECDS Ledger balance -(F3)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{selectedLetter &&selectedLetter.ncdsledger}</td>
</tr><tr>
<th>Auction Debit 150% -(N)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{selectedLetter &&selectedLetter.jv150}</td>
</tr><tr>
<th>PendingProofAmt (Oth DP Trf)-(T)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{selectedLetter &&selectedLetter.pndgprfamt}</td>
</tr><tr>
<th>PayoutPendingAmt (UnRegdBank Trf)-(U)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{selectedLetter &&selectedLetter.popndgamt}</td>
</tr><tr>
<th>DP SOH Value-(Y)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{selectedLetter &&selectedLetter.dpsohval}</td>
</tr><tr>
    <th>Margin_post_VAR-(Z)</th>
    <td style={{backgroundColor:"white" , textAlign:"right"}}>{selectedLetter &&selectedLetter.mgnpostvr}</td>
    </tr><tr>
    <th>Margin_post_HCUT-(AA)</th>
    <td style={{backgroundColor:"white" , textAlign:"right"}}>{selectedLetter &&selectedLetter.mgnpohc}</td>
    </tr><tr>
    <th>Margin_post_HCUT_Maintenance -(AB)</th>
    <td style={{backgroundColor:"white" , textAlign:"right"}}>{selectedLetter &&selectedLetter.mgnpohcm}</td>
    </tr><tr>
    <th>Var_margin_LESS_SEC_Margin_POST_HCUT -(AC)</th>
    <td style={{backgroundColor:"white" , textAlign:"right"}}>{selectedLetter &&selectedLetter.vmlsmgnphc}</td>
    </tr><tr>
    <th>Aging Greater 5d  -(AD)</th>
    <td style={{backgroundColor:"white" , textAlign:"right"}}>{selectedLetter &&selectedLetter.agegr5}</td>
    </tr><tr>
    <th>Excess_Margin -(AE)</th>
    <td style={{backgroundColor:"white" , textAlign:"right"}}>{selectedLetter &&selectedLetter.exmargin}</td>
    </tr><tr>
    <th>Derv_Margin -(AF)</th>
    <td style={{backgroundColor:"white" , textAlign:"right"}}>{selectedLetter &&selectedLetter.dervmgn}</td>
    </tr><tr>
    <th>Last Tradeded Date</th>
    <td style={{backgroundColor:"white" , textAlign:"right"}}>{selectedLetter &&selectedLetter.lsttrddt}</td>

  </tr>
</table>


</div>





</div>
  )}



{showC && (
<div>

<table class="6"  className="table table-striped table-scroll">
  <thead >
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

<table class="6" className="table table-striped table-scroll">
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



{showE &&(
  <div>

  <table class="6" className="table table-striped table-scroll">
    <thead>
      <tr>
       
      {/* <th>ESL UCC</th>
  <th>KSL UCC</th>
  <th>Client Name</th>
  <th>LocationId</th>
  <th>LocationCD</th> */}
  <th>Symbole</th>
  <th>ExpDate</th>
  <th>StrikePrice</th>
  <th>OptType</th>
  <th>PurchaseQty</th>
  <th>Sold_Qty</th>
  <th>NetQty</th>
  <th>Net_Rate</th>
  <th>Purchase_Amt</th>
  <th>Sold_Amt</th>
  <th>Net_Amt</th>
  <th>Net_Value</th>
  <th>Exch Code</th>
  <th>ScriptRate</th>
  <th>FutOpt</th>
  <th>Company Script Code</th>
  <th>ScripName</th>
  <th>_Branch</th>
  <th>Family Group</th>
 
  
        
      </tr>
    </thead>
    <tbody>
  
  {selectedNetpo.map((netpo, index) => (
        
  
    
      <tr key={index}>
    {/*  <td>{netpo.es_ucc}</td>
   <td>{netpo.ucc}</td>
  <td>{netpo.clname}</td>
  <td>{netpo.location}</td>
  <td>{netpo.locnid}</td> */}
  <td>{netpo.symbole}</td>
  <td>{netpo.expdate}</td>
  <td>{netpo.stkprice}</td>
  <td>{netpo.opttype}</td>
  <td>{netpo.purc_qty}</td>
  <td>{netpo.soldqty}</td>
  <td>{netpo.net_qty}</td>
  <td>{netpo.net_rate}</td>
  <td>{netpo.purc_amt}</td>
  <td>{netpo.sold_amt}</td>
  <td>{netpo.net_amt}</td>
  <td>{netpo.net_value}</td>
  <td>{netpo.exch_code}</td>
  <td>{netpo.scrprate}</td>
  <td>{netpo.futopt}</td>
  <td>{netpo.scripcd}</td>
  <td>{netpo.scripnm}</td>
  <td>{netpo.brcd}</td>
  <td>{netpo.familygrp}</td>

  
      </tr>
       ))}
    </tbody>
  </table>

  
  </div>
)}





{showF && (
<div>

<table class="6" className="table table-striped table-scroll">
  <thead>
    <tr>
     
    {/* <th>ESL UCC</th>
<th>KSL UCC</th>
<th>Client Name</th>
<th>LocationId</th>
<th>LocationCD</th> */}
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

{selectedPortf.map((portf, index) => (
    <tr key={index}>
    {/* <td>{portf.es_ucc}</td>
<td>{portf.ucc}</td>
<td>{portf.clname}</td>
<td>{portf.location}</td>
<td>{portf.locnid}</td> */}
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
<td>{portf.familygrp}</td>
    </tr>
     ))}
  </tbody>
</table>
   

</div>
  )}




{showG && (

   
<div>

<table class="6" className="table table-striped table-scroll">
  <thead>
    <tr>
     
{/* <th>ESL UCC</th>
<th>KSL UCC</th>
<th>Client Name</th>
<th>LocationId</th>
<th>LocationCD</th> */}
<th>NSE</th>
<th>Qty</th>
<th>Cost Price</th>
<th>Funding Value</th>
<th>Symbol/code</th>
<th>ISIN</th>
<th>Company Script Code</th>
<th>BSE</th>
<th>BSE_series</th>
<th>NSE_series</th>
<th>ODIN ScripCode</th>
<th>_Branch</th>
<th>Family Group</th>
<th>ScripName</th>



      
    </tr>
  </thead>
  <tbody>

{selectedMtfpo.map((mtfpo, index) => (
      

  
    <tr key={index}>
{/* <td>{mtfpo.es_ucc}</td>
<td>{mtfpo.ucc}</td>
<td>{mtfpo.clname}</td>
<td>{mtfpo.location}</td>
<td>{mtfpo.locnid}</td> */}
<td>{mtfpo.nse}</td>
<td>{mtfpo.qty}</td>
<td>{mtfpo.cost_rate}</td>
<td>{mtfpo.mtf_value}</td>
<td>{mtfpo.symbol}</td>
<td>{mtfpo.isin}</td>
<td>{mtfpo.co_sccode}</td>
<td>{mtfpo.bse}</td>
<td>{mtfpo.bse_sers}</td>
<td>{mtfpo.nse_sers}</td>
<td>{mtfpo.odin_sccd}</td>
<td>{mtfpo.brcd}</td>
<td>{mtfpo.familygrp}</td>
<td>{mtfpo.scrname}</td>



    </tr>
     ))}
  </tbody>
</table>


   

</div>
  )}





{showH &&(
  <div>

  <table class="6" className="table table-striped table-scroll">
    <thead>
      <tr>
       
      
{/* <th>barcode</th>
<th>brcd</th>
<th>cl_grp</th> */}
<th>Ucc</th>
<th>Kotak ucc</th>
<th>Name</th>
<th>PAN No.</th>
<th>Location Id</th>
<th>Kotak Email Id</th>
<th>Kotak Mobile No.</th>
<th>Esl Nomine Name</th>
{/* <th>es_nompan</th>
<th>es_nomshr</th>
<th>es_relwapc</th> */}
<th>Kotak Nomine</th>
<th>Kotak Nomine PAN</th>
<th>Kotak Nomine Share</th>
<th>Kotak nomine Relation</th>    
      </tr>
    </thead>
    <tbody>
      <tr >
{/* <td>{selectedNominee && selectedNominee.barcode ? selectedNominee.barcode : ""}</td>
<td>{selectedNominee && selectedNominee.brcd ? selectedNominee.brcd: ""}</td>
<td>{selectedNominee && selectedNominee.cl_grp ? selectedNominee.cl_grp :" "}</td> */}
<td>{selectedNominee && selectedNominee.ucc ? selectedNominee.ucc : " "}</td>
<td>{selectedNominee && selectedNominee.kslucc ? selectedNominee.kslucc:""}</td>
<td>{selectedNominee && selectedNominee.ksluccnm ? selectedNominee.ksluccnm : " "}</td>
<td>{selectedNominee && selectedNominee.panno ?selectedNominee.panno : " "}</td>
<td>{selectedNominee && selectedNominee.locnid ? selectedNominee.locnid : " "}</td>
<td>{selectedNominee && selectedNominee.ksemailid ? selectedNominee.ksemailid : " "}</td>
<td>{selectedNominee && selectedNominee.ksmobile ? selectedNominee.ksmobile : " "}</td>
<td>{selectedNominee && selectedNominee.es_nomn ? selectedNominee.es_nomn : " "}</td>
{/* <td>{selectedNominee && selectedNominee.es_nompan ? selectedNominee.es_nompan : " "}</td>
<td>{selectedNominee && selectedNominee.es_nomshr ? selectedNominee.es_nomshr : " "}</td>
<td>{selectedNominee && selectedNominee.es_relwapc ? selectedNominee.es_relwapc : " "}</td> */}
<td>{selectedNominee && selectedNominee.ks_nomn ? selectedNominee.ks_nomn : " "}</td>
<td>{selectedNominee && selectedNominee.ks_nompan ? selectedNominee.ks_nompan : " "}</td>
<td>{selectedNominee && selectedNominee.ks_nomshr ? selectedNominee.ks_nomshr : " "}</td>
<td>{selectedNominee && selectedNominee.ks_relwapc ? selectedNominee.ks_relwapc : " "}</td>
      </tr>

    </tbody>
  </table>

  
  </div>
)}



<div >
    <button onClick={backToList} style={{position:'sticky' , bottom: '0px'}}>Back</button>
    {/* <button onClick={() => generateAndDownloadExcelForView(selectedRecord)}>
            Generate and Download Excel
          </button> */}
</div>



    
   
    </div>

    ):(

      <div>
      <h3 style={{float:'right'}}><strong>Updated Date ::</strong> {records.length > 0 && records[0].run_date ? records[0].run_date : 'N/A'}</h3>
      <h3>Client Detail Information</h3>
         <input
          type="text"
          placeholder="Search by Ucc/PAN"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (e.target.value === '') {
              backToList();
            }
          }}
          id="searchBar"
        />
        {/* <input
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
/> */}

        {/* {selectedRecords.length > 0 && (
          <div>
            <strong>Selected Records:</strong> {selectedRecords.map((record) => record.ucc).join(', ')}
            <button onClick={clearSelectedRecords}>Clear Selection</button>
          </div>
        )} */}

        {/* <button onClick={() => generateAndDownloadView()}>Generate and Download Excel</button> */}
        {/* <button onClick={() => printRecord(selectedRecords)}>Print Selected</button> */}
        {/* <button onClick={clearSearchAndSelection}>Clear</button><br/> */}
        {isLoading ? <LoadingSpinner /> :

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
              <th style={{backgroundColor:'lightblue'}}>Closer Transfer</th>
            
              <th style={{backgroundColor:'lightblue'}}>Action</th>
            </tr>
          </thead>
          <tbody>{recordList()}
          </tbody>
        </table>
      //   {loading && (
      //   <div className="loading-central-circle"></div>
      // )}

 }

      </div>
      )}
    </div>
  );
}

