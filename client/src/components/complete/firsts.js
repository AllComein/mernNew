

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
//   const [dpsohs, setDpsohs] = useState([]);
//   const [selectedDpsoh, setSelectedDpsoh] = useState(null);
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
    


//       const dpsohResponse = await fetch(`http://202.54.6.99:4003/dpsoh/`);
//       if (!dpsohResponse.ok) {
//         const message = `An error occurred: ${dpsohResponse.statusText}`;
//         window.alert(message);
//         return;
//       }
//       const dpsohs = await dpsohResponse.json();
//       setDpsohs(dpsohs);
//     }


//     getData();

//     document.addEventListener("keydown", handleKeyPress);

//     // Remove event listener when component unmounts
//     return () => {
//       document.removeEventListener("keydown", handleKeyPress);
//     };

//   }, [records.length, letters.length , esigns.length , dpsohs.length]);




//   const handleKeyPress = (event) => {
//     if (event.key === "Escape") {
//       // Reset selectedRecord, selectedLetter, selectedEsign to null
//       setSelectedRecord(null);
//       setSelectedLetter(null);
//       setSelectedEsign(null);
//       setSelectedDpsoh(null);
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
//       const esign = esigns.find((esign) => esign.ucc === record.ucc);
//       const dpsoh = dpsohs.find((dpsoh) => dpsoh.es_ucc === record.ucc);
  
//       return (
//         <Record
//           record={record}
//           deleteRecord={deleteRecord}
//           setSelectedLetter={setSelectedLetter}
//           letter={letter}
//           setSelectedEsign={setSelectedEsign}
//           esign={esign}
//           setSelectedDpsoh={setSelectedDpsoh}
//           dpsoh={dpsoh}
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
      
//       {selectedRecord && selectedLetter && selectedDpsoh ?(
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
//         {/* <button className="btn btn-link"
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
//         </button> */}
      

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
     
//     <th>clcode</th>
// <th>clname</th>
// <th>brcd</th>
// <th>cl_grp</th>
// <th>dptype</th>







      
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//     <td>{selectedDpsoh.clcode }</td>
// <td>{selectedDpsoh.clname }</td>
// <td>{selectedDpsoh.brcd }</td>
// <td>{selectedDpsoh.cl_grp }</td>
// <td>{selectedDpsoh.dptype }</td>







      
      
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
//     <td>{selectedDpsoh.hldgdt }</td>
// <td>{selectedDpsoh.soh_brcd }</td>
// <td>{selectedDpsoh.ks_dpid }</td>
// <td>{selectedDpsoh.cldpid }</td>
// <td>{selectedDpsoh.location }</td>
// <td>{selectedDpsoh.locnid }</td>
// <td>{selectedDpsoh.dpsts }</td>
// <td>{selectedDpsoh.isin }</td>
      
      
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
//     <td>{selectedDpsoh.ks_dpsoh }</td>
// <td>{selectedDpsoh.scrate }</td>
// <td>{selectedDpsoh.dp_sohval }</td>
// <td>{selectedDpsoh.cc_id }</td>
// <td>{selectedDpsoh.bkflag }</td>
// <td>{selectedDpsoh.bklkcd }</td>
// <td>{selectedDpsoh.lkinreldt }</td>
// <td>{selectedDpsoh.scrname }</td>
      
      
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
//     <td>{selectedDpsoh.bactype }</td>
// <td>{selectedDpsoh.catgdespn }</td>
// <td>{selectedDpsoh.comsccd }</td>
// <td>{selectedDpsoh.bsecode }</td>
// <td>{selectedDpsoh.nsesymbl }</td>
// <td>{selectedDpsoh.dpidpri }</td>
// <td>{selectedDpsoh.varvfodp }</td>
// <td>{selectedDpsoh.sccatg }</td>
      
      
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
