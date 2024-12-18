// import React, { Component } from "react";

// import UserService from "../services/user.service";
// import EventBus from "../common/EventBus";

// export default class BoardModerator extends Component {
  
  
  
  
//   constructor(props) {
//     super(props);

//     this.state = {
//       content: ""
//     };
//   }
 

  





//   componentDidMount() {
//     UserService.getModeratorBoard().then(
//       response => {
//         this.setState({
//           content: response.data
//         });
//       },
//       error => {
//         this.setState({
//           content:
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString()
//         });

//         if (error.response && error.response.status === 401) {
//           EventBus.dispatch("logout");
//         }
//       }
//     );
//   }

//   render() {
//     return (
//       <div className="container">
//         <header className="jumbotron">
//           <h3>{this.state.content}</h3>
//         </header>
//       </div>
//     );
//   }
// }












// import React, { Component } from "react";
// import UserService from "../services/user.service";
// import EventBus from "../common/EventBus";
// import AuthService from "../services/auth.service";





// export default class BoardModerator extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       content: "",
//       ledgerData: [],
//       dpsohData: [],
//       letterData: [],
//       currentView: 'all',
//       isLoading: false,
//     };
//   }

//   componentDidMount() {
//     this.getData();
//   }

//   getData = async () => {
//     this.setState({ isLoading: true });
//     try {
//       const currentUser = AuthService.getCurrentUser();
  
//       // Fetch data from multiple databases
//       const response1 = await fetch('http://183.182.84.228:4005/ledger/');
//       const ledgerData = await response1.json();
  
//       const response2 = await fetch('http://183.182.84.228:4005/dpsoh/');
//       const dpsohData = await response2.json();
  
//       const response3 = await fetch('http://183.182.84.228:4005/letter/');
//       const letterData = await response3.json();
  
//       // Filter the records based on the condition
//       const filteredLedgerData = ledgerData.filter(record => currentUser.username === record.locnid);
//       const filteredDpsohData = dpsohData.filter(record => currentUser.username === record.locnid);
//       const filteredLetterData = letterData.filter(record => currentUser.username === record.locnid);
  
//       // Now filteredData is an array of responses that match the condition, you can set your state here
//       this.setState({ ledgerData: filteredLedgerData, dpsohData: filteredDpsohData, letterData: filteredLetterData });
//     } catch (error) {
//       window.alert(`An error occurred: ${error}`);
//     }
//     this.setState({ isLoading: false });
//   }

//   handleViewChange = (view) => {
//     this.setState({ currentView: view });
//   }
  
//   render() {

//     const { ledgerData, dpsohData, letterData, currentView } = this.state;
//     let dataToDisplay = [];

//     switch(currentView) {
//       case 'ledger':
//         dataToDisplay = ledgerData;
//         break;
//       case 'dpsoh':
//         dataToDisplay = dpsohData;
//         break;
//       case 'letter':
//         dataToDisplay = letterData;
//         break;
//       default:
//         dataToDisplay = [...ledgerData, ...dpsohData, ...letterData];
//     }

//     return (
//       <div className="container">
//         <header className="jumbotron">
//           <h3>{this.state.content}</h3>
//         </header>

        


//         <button onClick={() => this.handleViewChange('ledger')}>Ledger</button>
//         <button onClick={() => this.handleViewChange('dpsoh')}>DPSOH</button>
//         <button onClick={() => this.handleViewChange('letter')}>Letter</button>
//         {/* Render your records here */}
//         {dataToDisplay.map((record, index) => (
//           <p key={index}>{record.clname} {record.locnid} {record.ucc}</p>
//         ))}
//         <p>{dataToDisplay.clname}</p>
//       </div>
//     );
//   }
// }





























// import React, { Component } from "react"; // Import Component from React
// import AuthService from "../services/auth.service"; // Import AuthService if it's a custom service


// const Record = (props) => (
//   <tr key={props.record.id}>
//     <td>{props.record.clname}</td>
//     <td>{props.record.priority}</td>
//     <td>{props.record.ucc}</td>
//     <td>{props.record.kslucc}</td>
//     <td>{props.record.ks_panno}</td>
//     <td>{props.record.locationid}</td>
//     <td>{props.record.closer_trf}</td>
//     <td>
//       <button
//         className="btn btn-link"
//         onClick={() => props.onView(props.record)}
//       >
//         View
//       </button>
//     </td>
//   </tr>
// );

// export default class BoardModerator extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       content: "",
//       letterData: [],
//       selectedRecord: null,
//       dpsohData: [],
//       ledgerData: [],
//       isViewingRecord: false,
//     };
//   }

//   componentDidMount() {
//     this.getLetterData();
//   }

//   getLetterData = async () => {
//     try {
//       const currentUser = AuthService.getCurrentUser();
//       const response = await fetch('http://183.182.84.228:4005/letter/');
//       const letterData = await response.json();
//       const filteredLetterData = letterData.filter(record => currentUser.username === record.locnid);
//       this.setState({ letterData: filteredLetterData });
//     } catch (error) {
//       window.alert(`An error occurred: ${error}`);
//     }
//   }

//   handleView = async (record) => {
//     this.setState({ selectedRecord: record, isViewingRecord: true, dpsohData: [], ledgerData: [] });
//   }

//   handleViewDpsoh = async () => {
//     try {
//       const response = await fetch('http://183.182.84.228:4005/dpsoh/');
//       const dpsohData = await response.json();
//       const selectedDpsohData = dpsohData.filter(item => item.kslucc === this.state.selectedRecord.kslucc);
//       this.setState({ dpsohData: selectedDpsohData });
//     } catch (error) {
//       window.alert(`An error occurred: ${error}`);
//     }
//   }

//   handleViewLedger = async () => {
//     try {
//       const response = await fetch('http://183.182.84.228:4005/ledger/');
//       const ledgerData = await response.json();
//       const selectedLedgerData = ledgerData.filter(item => item.ucc === this.state.selectedRecord.kslucc);
//       this.setState({ ledgerData: selectedLedgerData });
//     } catch (error) {
//       window.alert(`An error occurred: ${error}`);
//     }
//   }

//   handleExitView = () => {
//     this.setState({ isViewingRecord: false });
//   }

//   render() {
//     const { letterData, selectedRecord, dpsohData, ledgerData, isViewingRecord } = this.state;
    

//     return (
//       <div className="container">
//         <header className="jumbotron">
//           <h3>{this.state.content}</h3>
//         </header>

//         {isViewingRecord ? (
//           <div>
//             <button onClick={this.handleViewDpsoh}>View DPSOH</button>
//             <button onClick={this.handleViewLedger}>View Ledger</button>
//             <button onClick={this.handleExitView}>Exit</button>
//           </div>
//         ) : (
//           <div>
//             <h3>Record List</h3>
//             <table className="table table-striped" style={{ marginTop: 20 }}>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Priority</th>
//                   <th>UCC</th>
//                   <th>KSLUCC</th>
//                   <th>KS_PANNO</th>
//                   <th>LocationID</th>
//                   <th>Closer_TRF</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {letterData.map((record, index) => (
//                   <Record key={index} record={record} onView={this.handleView} />
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {selectedRecord && (
//           <div>
//             <h3>Selected Record</h3>
//             <p>Name: {selectedRecord.clname}</p>
//             <p>Priority: {selectedRecord.priority}</p>
//           </div>
//         )}

//         {dpsohData.length > 0 && (
//           <div>
//             <h3>DPSOH Data</h3>
//             <table class="6"  className="table table-striped table-scroll">
//   <thead >
//     <tr>
     
//     <th>bactype</th>
//     <th>nsesymbl</th>
//     <th>isin</th>
//     <th>ks_dpsoh</th>
//     <th>scrate</th>
//     <th>dp_sohval</th>
//     <th>bsecode</th>
//     <th>hldgdt</th>
//     {/* <th>scrname</th> */}
//     <th>ks_dpid</th>
//     <th>cldpid</th>
//     <th>soh_brcd</th>
//     <th>cc_id</th>
//     <th>bkflag</th>
// <th>bklkcd</th>
// <th>lkinreldt</th>





// <th>dpidpri</th>
// <th>varvfodp</th>
// <th>sccatg</th>


// <th>catgdespn</th>
// <th>comsccd</th>
      
//     </tr>
//   </thead>
//   <tbody>
//             {dpsohData.map((record, index) => (
//     <tr key={index}>
//     <td>{record.bactype }</td>
//     <td onMouseEnter={(e) => handleHover(e, record.scrname)}
//                 onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
//                 onMouseLeave={handleMouseLeave}>{record.nsesymbl }</td>
//     <td>{record.isin }</td>
//     <td>{record.ks_dpsoh }</td>
//     <td>{record.scrate }</td>
//     <td>{record.dp_sohval }</td>
//     <td>{record.bsecode }</td>
//     <td>{record.hldgdt }</td>
//     {/* <td>{record.scrname }</td> */}
//     <td>{record.ks_dpid }</td>
//     <td>{record.cldpid }</td>
//     <td>{record.soh_brcd }</td>
//     <td>{record.cc_id }</td>
//     <td>{record.bkflag }</td>
// <td>{record.bklkcd }</td>
// <td>{record.lkinreldt }</td>
// <td>{record.dpidpri }</td>
// <td>{record.varvfodp }</td>
// <td>{record.sccatg }</td>
// <td>{record.catgdespn }</td>
// <td>{record.comsccd }</td>
//     </tr>
//      ))}
//   </tbody>
// </table>
// {hoveredDptype && (
//         <div style={{
//           position: 'absolute',
//           top: mousePosition.y + 10,
//           left: mousePosition.x + 10,
//           backgroundColor: 'white',
//           padding: '5px',
//           border: '1px solid #ccc',
//         }}>
//           <strong>Scrname:</strong> {hoveredDptype}
//         </div>
//       )}

   

// </div>
          
//         )}

//         {ledgerData.length > 0 && (
//           <div>
//             <h3>Ledger Data</h3>
//             {ledgerData.map((record, index) => (
//               <p key={index}>{record.clname} {record.locnid} {record.ucc}</p>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   }
// }




// import React, { Component } from "react";
// import AuthService from "../services/auth.service";
// import { Spinner } from "react-bootstrap"; // Importing Spinner from Bootstrap
// import * as XLSX from "xlsx"

// const Record = (props) => (
//   <tr key={props.record.id}>
//     <td>{props.record.clname}</td>
//     <td>{props.record.priority}</td>
//     <td>{props.record.ucc}</td>
//     <td>{props.record.kslucc}</td>
//     <td>{props.record.ks_panno}</td>
//     <td>{props.record.locationid}</td>
//     <td>{props.record.closer_trf}</td>
//     <td>
//       <button
//         className="btn btn-link"
//         onClick={() => props.onView(props.record)}
//       >
//         View
//       </button>
//     </td>
//   </tr>
// );

// export default class BoardModerator extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       content: "",
//       letterData: [],
//       selectedRecord: null,
//       dpsohData: [],
//       ledgerData: [],
//       mtfpoData: [],
//       netpoData: [],
//       portfoData: [],
//       nomineeData: [],
//       isViewingRecord: false,
//       hoveredDptype: "",
//       mousePosition: { x: 0, y: 0 },
//       searchValue: "",
//       activeButton: null,
//       dataFound: true,
//       loading: false, // Added loading state
//     };
//   }

//   handleHover = (event, dptype) => {
//     this.setState({
//       hoveredDptype: dptype,
//       mousePosition: { x: event.clientX, y: event.clientY },
//     });
//   };

//   handleMouseLeave = () => {
//     this.setState({ hoveredDptype: "" });
//   };

//   componentDidMount() {
//     this.getLetterData();
//   }

//   getLetterData = async () => {
//     try {
//       this.setState({ loading: true }); // Set loading to true when data fetching starts
//       const startTime = performance.now(); // Record start time
//       const currentUser = AuthService.getCurrentUser();
//       const response = await fetch("http://183.182.84.228:4005/letter/");
//       const letterData = await response.json();
//       const filteredLetterData = letterData.filter(
//         (record) =>
//         currentUser.username === record.es_locnid &&
//           (record.clname.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
//           record.kslucc.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
//           record.ucc.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
//           record.es_locnid.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
//           record.ks_panno.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
//           record.locationid.toLowerCase().includes(this.state.searchValue.toLowerCase()))
//       );
//       const endTime = performance.now(); // Record end time
//       const elapsedTime = endTime - startTime; // Calculate elapsed time
//       console.log("Time taken to fetch and filter data:", elapsedTime, "milliseconds");
//       this.setState({ letterData: filteredLetterData.length > 0 ? filteredLetterData : null });
//       this.setState({ activeButton: 'letter' });
//     } catch (error) {
//       window.alert(`An error occurred: ${error}`);
//     }
//     finally {
//       this.setState({ loading: false }); // Set loading to false when data fetching completes
//     }
//   };
  


//   handleView = async (record) => {
//     this.setState({
//       selectedRecord: record,
//       isViewingRecord: true,
//       dpsohData: [],
//       ledgerData: [],
//       mtfpoData: [],
//       netpoData: [],
//       portfoData: [],
//       nomineeData: [],
//     });
//   };




  

//   generalExcel = (record) => {
//     const data = [
//       [
//         "_Priority", "KS KRA Status", "Kotak PTT Status", "KS KRA/PTT Remarks", "Kotak KRA/PTT e-mail Sent",
//         "Kotak PTT e-mail Recd", "Kotak KRA/PTT RM", "Kotak KRA/PTT e-mail Sent Remarks", "ESL UCC", "KSL UCC",
//         "Client Name", "LocationId", "Category", "Pan No", "Ks e-mailId", "Ks Mobile No.", "KS DPID", "KS DPBOID",
//         "Virtual_Bank A/c No", "Virtual Bank Name", "Virtual Bank IFSC", "NSE CM STATUS", "KS NSE CM",
//         "BSE CM STATUS", "KS BSE CM", "NSE F&O STATUS", "KS NSE FO", "Ks Trading PlatForm", "Es e-mailId",
//         "Es_Mobile No", "DoB or DoI", "UID", "ks DP SOH", "ks DP SOH Value", "NSE CDS STATUS", "KS NSE CDS",
//         "MCX STATUS", "KS MCX", "NCDEX STATUS", "KS NCDEX", "KS CLNT STATUS", "KS Clnt Type", "KS CLNT USER ID",
//         "KS Q/S FO (RAL)", "KS Q/S CM (RAL)", "KS CLNT Introduction Date", "KS Last Trading Date", "Franchise Code",
//         "Franchise Name", "State", "Dealing Zone", "Es Ckyc_No", "Es Nominee", "Es Nominee Pan No", "Es Nominee Share%",
//         "Es Relation With Person", "Ks Nominee", "Ks Nominee Pan No", "Ks Nominee Share%", "Ks Relation With Person",
//         "ES Location Code", "ES LocationID", "NEO ID", "ODIN ID", "BOSS ID", "ES DP HOLDING VALUE", "ES TURNOVER",
//         "ES NET BROKERAGE", "ES LAST TRADING DATE", "ES NSE CM", "ES NSE FO", "ES NSE CDS", "ES BSE CM", "ES MCX",
//         "ES NCDEX", "ES Clnt Status", "Ks Bank A/c No.", "Ks MICR No.", "Ks IFSC Code", "Ks Bank Name", "Ks Default Bank",
//         "Ks Bank A/c Type", "Ks Bank Branch", "Correspondence Address 1", "Correspondence Address 2", "Correspondence Address 3",
//         "Correspondence Address 4", "Correspondence City", "Correspondence State", "Correspondence Pin", "Correspondence Country",
//         "Permanent Address 1", "Permanent Address 2", "Permanent Address 3", "Permanent Address 4", "Permanent City",
//         "Permanent State", "Permanent Pin", "Permanent Country", "BARCODE", "_BRANCH", "Branch Name", "Family Group",
//         "Closer Transfer Done", "KS DP Rate Code", "ES DP Rate Code", "ES Ledger Balance", "ES Margin", "F&O Open Position",
//         "ES DP Ledger Balance", "RunDate",
//       ],
//       [
//         record.priority, record.ks_krasts, record.ks_pttsts, record.ks_krarem, record.ks_emsent, record.ks_emrecd,
//         record.ks_rm, record.ks_krptrem, record.ucc, record.kslucc, record.clname, record.locationid, record.es_catg,
//         record.ks_panno, record.ks_emailid, record.ks_mobile, record.ks_dpid, record.ksdp_boid, record.vir_bkacno,
//         record.vir_bknm, record.vir_ifsc, record.ptt_nsecm, record.ks_nsecm, record.ptt_bsecm, record.ks_bsecm,
//         record.ptt_nsefo, record.ks_nsefo, record.k_platform, record.es_email, record.es_mobile, record.es_dobdoi,
//         record.es_uid, record.ks_dpsoh, record.ks_sohval, record.ptt_nsecds, record.ks_nsecds, record.ptt_mcx,
//         record.ks_mcx, record.ptt_ncdex, record.ks_ncdex, record.ks_clsts, record.ks_cltype, record.ks_clusrid,
//         record.kral_fno, record.kral_ncm, record.ks_introdt, record.ks_lstrdt, record.ks_frccode, record.ks_frchis,
//         record.mis_state, record.deal_zone, record.es_ckyc, record.es_nomn, record.es_nompan, record.es_nomshr,
//         record.es_relwapc, record.ks_nomn, record.ks_nompan, record.ks_nomshr, record.ks_relwapc, record.es_locncd,
//         record.es_locnid, record.neoid, record.odinid, record.bossid, record.dphldgval, record.estovr, record.esnetbkg,
//         record.eslsttrd, record.ensecm, record.ensefo, record.ensecds, record.ebsecm, record.emcx, record.encdex,
//         record.ecl_sts, record.bnkacno, record.micrno, record.ifsc_cd, record.bnknm, record.defbnk, record.acctype,
//         record.bnkbr, record.coradd1, record.coradd2, record.coradd3, record.coradd4, record.corcity, record.corstate,
//         record.corpin, record.corcntry, record.per_add1, record.per_add2, record.per_add3, record.per_add4, record.per_city,
//         record.per_state, record.per_pin, record.per_cntry, record.barcode, record.brcd, record.brname, record.family_grp,
//         record.closer_trf, record.ks_dprtcd, record.es_dprtcd, record.es_ledbal, record.es_margin, record.opnpos_nfo,
//         record.es_dpledg, record.run_date,
//       ],
//     ];

//     const ws = XLSX.utils.aoa_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//     XLSX.writeFile(wb, "General_Info.xls");
//   };


//   dpsohExcel = (records) => {
//     const data = [
//       ["es_ucc" ,	"kslucc" ,	"clname" ,	"panno" ,	"brcd" ,	"dptype" ,	"hldgdt" ,	"soh_brcd" ,	"ks_dpid" ,	"cldpid" ,	"location" ,	"locnid" ,	"dpsts" ,	"isin" ,	"ks_dpsoh" ,	"scrate" ,	"dp_sohval" ,	"cc_id" ,	"bkflag" ,	"bklkcd" ,	"lkinreldt" ,	"scrname" ,	"bactype" ,	"catgdespn" ,	"comsccd" ,	"bsecode" ,	"nsesymbl" ,	"dpidpri" ,	"varvfodp" ,	"sccatg" ,	"cl_grp" ,
//       ],
//       ...records.map(record => [
//         record.es_ucc ,	record.kslucc ,	record.clname ,	record.panno ,	record.brcd ,	record.dptype ,	record.hldgdt ,	record.soh_brcd ,	record.ks_dpid ,	record.cldpid ,	record.location ,	record.locnid ,	record.dpsts ,	record.isin ,	record.ks_dpsoh ,	record.scrate ,	record.dp_sohval ,	record.cc_id ,	record.bkflag ,	record.bklkcd ,	record.lkinreldt ,	record.scrname ,	record.bactype ,	record.catgdespn ,	record.comsccd ,	record.bsecode ,	record.nsesymbl ,	record.dpidpri ,	record.varvfodp ,	record.sccatg ,	record.cl_grp ,

//       ]),
//     ];

//     const ws = XLSX.utils.aoa_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//     XLSX.writeFile(wb, "DPSOH.xls");
//   };



//   balanceExcel = (records) => {
//     const data = [
//       ["ESL UCC-(A)" ,	"KSL UCC-(B)" ,	"Client Name-(C)" ,	"LocationId-(D)" ,	"LocationCD-(E)" ,	"MCX Ledger balance -(F1)" ,	"NCDEX Ledger balance -(F2)" ,	"NSECDS Ledger balance -(F3)" ,	"LedgerBalance(With Ini+Exp Margin+Mtf)-(F)" ,	"MTF Funding Value -(F4)" ,	"Total Un Billed-(G)" ,	"UnclearAmt-(H)" ,	"Total Balance -Without MTF Balance (I=F-F1-G-H)" ,	"InitalMargin-(J)" ,	"Exposure -(K)" ,	"AdditionalMargin-(L)" ,	"Net Value-(M=I-J-K-L)" ,	"Auction Debit 150% -(N)" ,	"PledgeshareValue P1&P3 (NormalPledge)-(O)" ,	"PledgeshareValue P2(MTF)-(P)" ,	"Benificiary -(Q)" ,	"MF,SGB,T-Bill Etc-(R)" ,	"Delivered Amt-(S)" ,	"PendingProofAmt (Oth DP Trf)-(T)" ,	"PayoutPendingAmt (UnRegdBank Trf)-(U)" ,	"Total Margin-(V = O+P+Q+R+S)" ,	"NetMargin-(W=V-M)" ,	"Net Margin based on Pledge-(X=O+P+R-F)" ,	"DP SOH Value-(Y)" ,	"Margin_post_VAR-(Z)" ,	"Margin_post_HCUT-(AA)" ,	"Margin_post_HCUT_Maintenance -(AB)" ,	"Var_margin_LESS_SEC_Margin_POST_HCUT -(AC)" ,	"Aging Greater 5d  -(AD)" ,	"Excess_Margin -(AE)" ,	"Derv_Margin -(AF)" ,	"DP id status -(AG)" ,	"DP id mapped as default -(AH)" ,	"Status in BSE -(AI)" ,	"Status in NSE -(AJ)" ,	"Status in Derivatives Equities -(AK)" ,	"Status in NSECDS  -(AL)" ,	"Reasons for Deactivate -(AM)" ,	"Reasons for Deactivate -(AM1)" ,	"Last Tradeded Date" ,	"_Branch" ,	"Family Group" ,	"RunDate" ,

//     ],
//     ...records.map(record => [
//         record.es_ucc ,	record.ucc ,	record.clname ,	record.location ,	record.locnid ,	record.mcxledger ,	record.ncdledger ,	record.ncdsledger ,	record.ledgbal ,	record.mtfundval ,	record.tunbilled ,	record.unclramt ,	record.totalbal ,	record.inimgn ,	record.exposure ,	record.additnal ,	record.netvalue ,	record.jv150 ,	record.pldgqp1p3 ,	record.pldgqp2 ,	record.security1 ,	record.othmgn1 ,	record.delvdamt ,	record.pndgprfamt ,	record.popndgamt ,	record.tmargin ,	record.netmargin ,	record.nmgnboplg ,	record.dpsohval ,	record.mgnpostvr ,	record.mgnpohc ,	record.mgnpohcm ,	record.vmlsmgnphc ,	record.agegr5 ,	record.exmargin ,	record.dervmgn ,	record.dpidsts ,	record.dpidmapdf ,	record.stsinbse ,	record.stsinnse ,	record.stsderveq ,	record.stsnsecds ,	record.resfdact1 ,	record.resfdact2 ,	record.lsttrddt ,	record.brcd ,	record.familygrp ,	record.run_date ,

//       ]),
//     ];

//     const ws = XLSX.utils.aoa_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//     XLSX.writeFile(wb, "Balance.xls");
//   };



//   mtfpoExcel = (records) => {
//     const data = [
//       ["ESL UCC" ,	"KSL UCC" ,	"Client Name" ,	"LocationId" ,	"LocationCD" ,	"NSE" ,	"Qty" ,	"Cost Price" ,	"Funding Value" ,	"Symbol/code" ,	"ISIN" ,	"Company Script Code" ,	"BSE" ,	"BSE_series" ,	"NSE_series" ,	"ODIN ScripCode" ,	"_Branch" ,	"Family Group" ,	"ScripName" ,	"RunDate" ,

//     ],
//     ...records.map(record => [
//         record.es_ucc ,	record.ucc ,	record.clname ,	record.location ,	record.locnid ,	record.nse ,	record.qty ,	record.cost_rate ,	record.mtf_value ,	record.symbol ,	record.isin ,	record.co_sccode ,	record.bse ,	record.bse_sers ,	record.nse_sers ,	record.odin_sccd ,	record.brcd ,	record.familygrp ,	record.scrname ,	record.run_date ,

//       ]),
//     ];

//     const ws = XLSX.utils.aoa_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//     XLSX.writeFile(wb, "MTF_Pos.xls");
//   };




//   opExcel = (records) => {
//     const data = [
//       ["ESL UCC" ,	"KSL UCC" ,	"Client Name" ,	"LocationId" ,	"LocationCD" ,	"Symbole" ,	"ExpDate" ,	"StrikePrice" ,	"OptType" ,	"PurchaseQty" ,	"Sold_Qty" ,	"NetQty" ,	"Net_Rate" ,	"Purchase_Amt" ,	"Sold_Amt" ,	"Net_Amt" ,	"Net_Value" ,	"Exch Code" ,	"ScriptRate" ,	"FutOpt" ,	"Company Script Code" ,	"ScripName" ,	"_Branch" ,	"Family Group" ,	"RunDate" ,

//     ],
//     ...records.map(record => [
//         record.es_ucc ,	record.ucc ,	record.clname ,	record.location ,	record.locnid ,	record.symbole ,	record.expdate ,	record.stkprice ,	record.opttype ,	record.purc_qty ,	record.soldqty ,	record.net_qty ,	record.net_rate ,	record.purc_amt ,	record.sold_amt ,	record.net_amt ,	record.net_value ,	record.exch_code ,	record.scrprate ,	record.futopt ,	record.scripcd ,	record.scripnm ,	record.brcd ,	record.familygrp ,	record.run_date ,

//       ]),
//     ];

//     const ws = XLSX.utils.aoa_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//     XLSX.writeFile(wb, "Open_Pos.xls");
//   };




//   portfoExcel = (records) => {
//     const data = [
//       ["ESL UCC" ,	"KSL UCC" ,	"Client Name" ,	"Symbol" ,	"Instrument" ,	"Option Type" ,	"Strike Price" ,	"ExpiryDate" ,	"Qty" ,	"AvgCostPrice" ,	"CostValue" ,	"Market Value" ,	"UnReal" ,	"MktReturn" ,	"Date" ,	"Sq Gain" ,	"Del Gain" ,	"Bse Curr Price" ,	"LocationId" ,	"LocationCD" ,	"ISIN" ,	"Exchange" ,	"Scrip Name" ,	"Common ScripCode" ,	"Is Suspend" ,	"_Branch" ,	"Family Group" ,

//     ],
//     ...records.map(record => [
//         record.es_ucc ,	record.ucc ,	record.clname ,	record.symbol ,	record.instrument ,	record.option_typ ,	record.sp ,	record.expirydate ,	record.qty ,	record.avgcost ,	record.cost ,	record.mktvalue ,	record.unreal ,	record.mreturn ,	record.date ,	record.sqgain ,	record.delgain ,	record.bse_clrate ,	record.location ,	record.locnid ,	record.isin ,	record.exchange ,	record.sc_shrtnm ,	record.comn_sccd ,	record.is_suspend ,	record.brcd ,	record.familygrp ,

//       ]),
//     ];

//     const ws = XLSX.utils.aoa_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//     XLSX.writeFile(wb, "Portfolio.xls");
//   };

















//   handleViewDpsoh = async () => {
//     try {
//       this.setState({ loading: true });
//       const response = await fetch("http://183.182.84.228:4005/dpsoh/");
//       const dpsohData = await response.json();
//       const selectedDpsohData = dpsohData.filter(
//         (item) => item.kslucc === this.state.selectedRecord.kslucc
//       );
//       if (selectedDpsohData.length > 0) {
//         this.setState({ dpsohData: selectedDpsohData });
//         this.setState({ activeButton: 'dpsoh' });
//       } else {
//         window.alert('Data not found for selected record.');
//       }
//     } catch (error) {
//       window.alert(`An error occurred: ${error}`);
//     }
//     finally {
//       this.setState({ loading: false }); // Set loading to false when data fetching completes
//     }
//   };
  

//   handleViewLedger = async () => {
//     try {
//       this.setState({ loading: true });
//       const response = await fetch("http://183.182.84.228:4005/ledger/");
//       const ledgerData = await response.json();
//       const selectedLedgerData = ledgerData.filter(
//         (item) => item.ucc === this.state.selectedRecord.kslucc
//       );
//       if (selectedLedgerData.length > 0) {
//         this.setState({ ledgerData: selectedLedgerData });
//         this.setState({ activeButton: 'ledger' });
//       } else {
//         window.alert('Data not found for selected record.');
//       }
//     } catch (error) {
//       window.alert(`An error occurred: ${error}`);
//     }
//     finally {
//       this.setState({ loading: false }); // Set loading to false when data fetching completes
//     }
//   };

//   handleViewMtfpo = async () => {
//     try {
//       this.setState({ loading: true });
//       const response = await fetch("http://183.182.84.228:4005/mtfpo/");
//       const mtfpoData = await response.json();
//       const selectedMtfpoData = mtfpoData.filter(
//         (item) => item.ucc === this.state.selectedRecord.kslucc
//       );
//       if (selectedMtfpoData.length > 0) {
//         this.setState({ mtfpoData: selectedMtfpoData });
//         this.setState({ activeButton: 'mtfpo' });
//       } else {
//         window.alert('Data not found for selected record.');
//       }
//     } catch (error) {
//       window.alert(`An error occurred: ${error}`);
//     }
//     finally {
//       this.setState({ loading: false }); // Set loading to false when data fetching completes
//     }
//   };

//   handleViewNetpo = async () => {
//     try {
//       this.setState({ loading: true });
//       const response = await fetch("http://183.182.84.228:4005/netpo/");
//       const netpoData = await response.json();
//       const selectedNetpoData = netpoData.filter(
//         (item) => item.ucc === this.state.selectedRecord.kslucc
//       );
//       if (selectedNetpoData.length > 0) {
//         this.setState({ netpoData: selectedNetpoData });
//         this.setState({ activeButton: 'netpo' });
//       } else {
//         window.alert('Data not found for selected record.');
//       }
//     } catch (error) {
//       window.alert(`An error occurred: ${error}`);
//     }
//     finally {
//       this.setState({ loading: false }); // Set loading to false when data fetching completes
//     }
//   };

//   handleViewPortfo = async () => {
//     try {
//       this.setState({ loading: true });
//       const response = await fetch("http://183.182.84.228:4005/portfo/");
//       const portfoData = await response.json();
//       const selectedPortfoData = portfoData.filter(
//         (item) => item.ucc === this.state.selectedRecord.kslucc
//       );
//       if (selectedPortfoData.length > 0) {
//         this.setState({ portfoData: selectedPortfoData });
//         this.setState({ activeButton: 'portfo' });
//       } else {
//         window.alert('Data not found for selected record.');
//       }
//     } catch (error) {
//       window.alert(`An error occurred: ${error}`);
//     }
//     finally {
//       this.setState({ loading: false }); // Set loading to false when data fetching completes
//     }
//   };

//   handleViewNominee = async () => {
//     try {
//       this.setState({ loading: true });
//       const response = await fetch("http://183.182.84.228:4005/nominee/");
//       const nomineeData = await response.json();
//       const selectedNomineeData = nomineeData.filter(
//         (item) => item.kslucc === this.state.selectedRecord.kslucc
//       );
//       if (selectedNomineeData.length > 0) {
//         this.setState({ nomineeData: selectedNomineeData });
//         this.setState({ activeButton: 'nominee' });
//       } else {
//         window.alert('Data not found for selected record.');
//       }
//     } catch (error) {
//       window.alert(`An error occurred: ${error}`);
//     }
//     finally {
//       this.setState({ loading: false }); // Set loading to false when data fetching completes
//     }
//   };

//   handleExitView = () => {
//     this.setState({ isViewingRecord: false });
//   };

//   handleSearchChange = (event) => {
//     this.setState({ searchValue: event.target.value }, this.getLetterData);
//   };

  
//   render() {
//     const {
//       letterData,
//       selectedRecord,
//       dpsohData,
//       ledgerData,
//       portfoData,
//       mtfpoData,
//       netpoData,
//       nomineeData,
//       isViewingRecord,
//       hoveredDptype,
//       mousePosition,
//       activeButton,
//       dataFound,
//       loading // Added loading state
//     } = this.state;

//     return (
//       <div className="container">
//         <header className="jumbotron">
//           <h3>{this.state.content}</h3>
//         </header>

        
       
//         {isViewingRecord ? (
//           <div>
            
//             <button onClick={this.getLetterData}>GENERAL</button>

//             <button onClick={this.handleViewDpsoh}>DPSOH</button>
            
            
//             <button onClick={this.handleViewLedger}>Balance</button>
            
            
//             <button onClick={this.handleViewMtfpo}>Mtfpo</button>
           
            
//             <button onClick={this.handleViewNetpo}>Open Position</button>
            
            
//             <button onClick={this.handleViewPortfo}>Portfolio</button>
         
          
//             {/* <button onClick={this.handleViewNominee}>Nominee</button> */}
            
//             <button onClick={this.handleExitView}>Exit</button>

//             <button onClick={this.handlePrint}>print</button>

//             {activeButton === 'letter' && selectedRecord !== null &&  (
//           <div>

// {selectedRecord && nomineeData && (
//           <div>
//             <div style={{position:'sticky' , top:"0px"}}>
        
//         <h6>Exclusive KOTAK CLINT INFO</h6>

//         <button onClick={() => this.generalExcel(selectedRecord)}>
//           Download General_Info Excel
//         </button>
//         <table class="6">
//   <thead>
//     <tr>
    
//   <th>Closer Transfer</th>
 
  
//     <th>UCC </th>
// <th>Kotak UCC</th>
// <th>Client Name</th>
// <th>LocationId</th>
// <th>Pan</th>  
// <th>Kotak DP Rate Code</th>
// <th>ESL DP Rate Code</th>
// <th>Mobile</th>
// <th>Email</th>  
// <th>DoB_or_DoI</th> 



//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//     <td>{(selectedRecord.closer_trf)}</td>
//     <td>{selectedRecord.ucc }</td>
// <td>{selectedRecord.kslucc}</td>
// <td>{selectedRecord.clname }</td>
// <td>{selectedRecord.locationid}</td>
// <td>{selectedRecord.ks_panno}</td> 
// <td>{selectedRecord.ks_dprtcd}</td>
// <td>{selectedRecord.es_dprtcd}</td>  
// <td>{selectedRecord.ks_mobile}</td>   
// <td>{selectedRecord.ks_emailid}</td>   
// <td>{selectedRecord.es_dobdoi}</td>  
//     </tr>
//   </tbody>
// </table>
// {/* <table class="6" >
//     <thead>
//       <tr>
// <th>es_nomn</th>
// <th>es_nompan</th>
// <th>es_nomshr</th>
// <th>es_relwapc</th>
// <th>ks_nomn</th>
// <th>ks_nompan</th>
// <th>ks_nomshr</th>
// <th>ks_relwapc</th>    
//       </tr>
//     </thead>
//     <tbody>
           
            
           
//       <tr >
// <td>{ selectedRecord.es_nomn }</td>
// <td>{ selectedRecord.es_nompan }</td>
// <td>{ selectedRecord.es_nomshr }</td>
// <td>{ selectedRecord.es_relwapc }</td>
// <td>{ selectedRecord.ks_nomn }</td>
// <td>{ selectedRecord.ks_nompan }</td>
// <td>{ selectedRecord.ks_nomshr }</td>
// <td>{ selectedRecord.ks_relwapc }</td>
//       </tr>
  
//     </tbody>
//   </table> */}

// <div>
//   <div style={{width:'50%', float:'left'}}>
// <table  class="1"  style={{marginTop:"10px"}} >
  
// <tr >
//   <th colSpan={2} style={{textAlign:"center"}}>Personal Information</th>

//   </tr>
//   <tr>
//   <th>Branch: </th>
//   <td>{(selectedRecord.locnid)}</td>
//   </tr>
//   <tr>
//   <th>Address: </th>
//   <td>{selectedRecord.coradd1}</td>
//   </tr>
//   {/* <tr>
//   <th>Closer Transfer</th>
//   <td>{(selectedRecord.closer_trf)}</td>
//   </tr> */}
//   <tr>
//   <th>Branch</th>
//   <td>{(selectedRecord.brcd)}</td>
//   </tr>
//   <tr>
//   <th>Branch Name</th>
//   <td>{(selectedRecord.brname)}</td>
//   </tr>
//   <tr>
//   <th>Family Group</th>
//   <td>{(selectedRecord.family_grp)}</td>
//   </tr>
//   <tr>
//   <th>Kotak DPBO_ID</th>
//   <td>{(selectedRecord.ks_dpid)} - {selectedRecord.ksdp_boid}</td>
//   </tr>
//   </table>

//   <table  class="1"  style={{marginTop:"10px"}} >
  
//   <tr >
//     <th colSpan={2} style={{textAlign:"center"}}>Bank Information</th>
  
//     </tr>
//     <tr>
// <th>Ks Bank A/c No.</th>
//  <td>{selectedRecord.bnkacno}</td>
// </tr><tr>
// <th>Ks MICR No.</th>
//  <td>{selectedRecord.micrno}</td>
// </tr><tr>
// <th>Ks IFSC Code</th>
//  <td>{selectedRecord.ifsc_cd}</td>
// </tr><tr>
// <th>Ks Bank Name</th>
//  <td>{selectedRecord.bnknm}</td>
// </tr><tr>
// <th>Ks Default Bank</th>
//  <td>{selectedRecord.defbnk}</td>
// </tr><tr>
// <th>Ks Bank A/c Type</th>
//  <td>{selectedRecord.acctype}</td>
// </tr>

//     </table>


//     <table  class="1"  style={{marginTop:"10px"}} >
  
//   <tr >
//     <th colSpan={2} style={{textAlign:"center"}}>Virtual Bank Information</th>
  
//     </tr>
//     <tr>
// <th>Virtual_Bank A/c No.</th>
//  <td>{selectedRecord.vir_bkacno}</td>
// </tr><tr>
// <th>Virtual Bank Name</th>
//  <td>{selectedRecord.vir_bknm}</td>
// </tr><tr>
// <th>Virtual Bank IFSC</th>
//  <td>{selectedRecord.vir_ifsc}</td>
// </tr>

//     </table>


// </div>






// <div style={{width:'50%', float:'right'}}>
//   <table style={{marginTop:"10px"}}> 
   
//     <tr >
//   <th colSpan={2} style={{textAlign:"center"}}>Other Information</th>

//   </tr>
//   {/* <tr>
//   <th>Ucc: </th>
//   <td>{(selectedRecord.kslucc)}</td>
//   </tr> */}
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
//   <th>NSE : </th>
//   <td>{(selectedRecord.kral_ncm)}</td>
//   </td>
//   </tr>
//   </table>

  
// <table style={{marginTop:"10px"}}>
// <tr >
//   <th colSpan={6} style={{textAlign:"center"}}>Status</th>

//   </tr>
//   <tr>
//           <th>KRA Status</th>
//           <td>{selectedRecord.ks_krasts}</td>   
//           </tr><tr>
//            <th>PTT Status</th>
//            <td>{selectedRecord.ks_pttsts}</td>
//            </tr><tr>
//           <th>KRA/PTT Reason</th>
//           <td>{selectedRecord.ks_krarem}</td>
//   </tr>
//   <tr>
// <th>Kotak KRA/PTT e-mail Sent</th>
//  <td>{selectedRecord.ks_emsent}</td>
// </tr><tr>
// <th>Kotak PTT e-mail Recd</th>
//  <td>{selectedRecord.ks_emrecd}</td>
// </tr><tr>
// <th>Kotak KRA/PTT RM</th>
//  <td>{selectedRecord.ks_rm}</td>
// </tr><tr>
// <th>Kotak KRA/PTT e-mail Sent Remarks</th>
//  <td>{selectedRecord.ks_krptrem}</td>
// </tr>

// </table>
// </div>

// <table style={{marginTop:"20px"}}>
// <thead>
//   <tr >
//   <th colSpan={6} style={{textAlign:"center"}}>Status</th>

//   </tr>
//   <tr>
//   <th>BSE</th>
//   <th>NSE</th>
//   <th>F&O</th>
//   <th>NSECDS</th>
//   <th>MCX</th>
//   <th>NCDEX</th>
//   </tr>
//   </thead>
//   <tbody>
//   <tr>
//   <td>{selectedRecord.ks_bsecm}</td>
//   <td>{ selectedRecord.ks_nsecm}</td>
//   <td>{ selectedRecord.ks_nsefo}</td>
//   <td>{ selectedRecord.ks_nsecds}</td>
//   <td>{ selectedRecord.ks_mcx}</td>
//   <td>{ selectedRecord.ks_ncdex}</td>
//   </tr>
 
//   </tbody>
//   </table>

// <table>
//   <tr>
// <th>Reasons for Deactivate -AM</th>
// <td>{ledgerData && ledgerData.resfdact1}</td>
// </tr>
// </table>
// <table class="6" >
//     <thead>
//       <tr>
// <th>es_nomn</th>
// <th>es_nompan</th>
// <th>es_nomshr</th>
// <th>es_relwapc</th>
// <th>ks_nomn</th>
// <th>ks_nompan</th>
// <th>ks_nomshr</th>
// <th>ks_relwapc</th>    
//       </tr>
//     </thead>
//     <tbody>
           
            
           
//       <tr >
// <td>{ selectedRecord.es_nomn }</td>
// <td>{ selectedRecord.es_nompan }</td>
// <td>{ selectedRecord.es_nomshr }</td>
// <td>{ selectedRecord.es_relwapc }</td>
// <td>{ selectedRecord.ks_nomn }</td>
// <td>{ selectedRecord.ks_nompan }</td>
// <td>{ selectedRecord.ks_nomshr }</td>
// <td>{ selectedRecord.ks_relwapc }</td>
//       </tr>
  
//     </tbody>
//   </table>


// </div>

// {loading && (
//           <div style={{ textAlign: "center", marginTop: "20px" }}>
//             <Spinner animation="border" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </Spinner>
//           </div>
//         )}
// <br/>
//           </div>
//           </div>
//         )}
//         </div>
//         )}

//         {activeButton === 'dpsoh' && dpsohData !== null && (
//           <div>
           
//               {!dataFound && (
//                 <div className="alert alert-warning" role="alert">
//                   Data not found!
//                 </div>
//               )}
//               <div>
//             <h3>DPSOH </h3>
//             <button onClick={() => this.dpsohExcel(dpsohData)}>
//           Download DPSOH Excel
//         </button>
//             <table className="table table-striped table-scroll">
//               <thead>
//                 <tr>
//                   <th>bactype</th>
//                   <th>nsesymbl</th>
//                   <th>isin</th>
//                   <th>ks_dpsoh</th>
//                   <th>scrate</th>
//                   <th>dp_sohval</th>
//                   <th>bsecode</th>
//                   <th>hldgdt</th>
//                   <th>ks_dpid</th>
//                   <th>cldpid</th>
//                   <th>soh_brcd</th>
//                   <th>cc_id</th>
//                   <th>bkflag</th>
//                   <th>bklkcd</th>
//                   <th>lkinreldt</th>
//                   <th>dpidpri</th>
//                   <th>varvfodp</th>
//                   <th>sccatg</th>
//                   <th>catgdespn</th>
//                   <th>comsccd</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {dpsohData.map((record, index) => (
//                   <tr key={index}>
//                     <td>{record.bactype}</td>
//                     <td
//                       onMouseEnter={(e) => this.handleHover(e, record.scrname)}
//                       onMouseMove={(e) => this.setState({ mousePosition: { x: e.clientX, y: e.clientY } })}
//                       onMouseLeave={this.handleMouseLeave}>{record.nsesymbl}</td>
//                     <td>{record.isin}</td>
//                     <td>{record.ks_dpsoh}</td>
//                     <td>{record.scrate}</td>
//                     <td>{record.dp_sohval}</td>
//                     <td>{record.bsecode}</td>
//                     <td>{record.hldgdt}</td>
//                     <td>{record.ks_dpid}</td>
//                     <td>{record.cldpid}</td>
//                     <td>{record.soh_brcd}</td>
//                     <td>{record.cc_id}</td>
//                     <td>{record.bkflag}</td>
//                     <td>{record.bklkcd}</td>
//                     <td>{record.lkinreldt}</td>
//                     <td>{record.dpidpri}</td>
//                     <td>{record.varvfodp}</td>
//                     <td>{record.sccatg}</td>
//                     <td>{record.catgdespn}</td>
//                     <td>{record.comsccd}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             {hoveredDptype && (
//               <div style={{
//                 position: 'absolute',
//                 top: mousePosition.y + 10,
//                 left: mousePosition.x + 10,
//                 backgroundColor: 'white',
//                 padding: '5px',
//                 border: '1px solid #ccc',
//               }}>
//                 <strong>Scrname:</strong> {hoveredDptype}
//               </div>
//             )}
//             </div>
//             {loading && (
//           <div style={{ textAlign: "center", marginTop: "20px" }}>
//             <Spinner animation="border" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </Spinner>
//           </div>
//         )}
//           </div>
          
//         )}

//         {activeButton === 'ledger' && ledgerData !== null && (
//           <div>
//             {!dataFound && (
//                 <div className="alert alert-warning" role="alert">
//                   Data not found!
//                 </div>
//               )}
//             <h3>Balance</h3>
//             <button onClick={() => this.balanceExcel(ledgerData)}>
//           Download Balance Excel
//         </button>
//             {ledgerData.map((record) => (
//               <div>
//                 <div style={{width:'50%', float:'left'}}>
// <table>
//   <tr>
    

    
// <th>LedgerBalance(With Ini+Exp Margin+Mtf)-(F)</th>
// <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.ledgbal}</td>
// </tr>
// <tr>  
//     <th>MTF Funding Value -(F4)</th>
//     <td style={{backgroundColor:"white", textAlign:"right"}}>{record.mtfundval}</td>
//     </tr>
// <tr>
// <th>Total Un Billed-(G)</th>
// <td style={{backgroundColor:"white", textAlign:"right"}}>{record.tunbilled}</td>
// </tr><tr>
// <th>UnclearAmt-(H)</th>
// <td style={{backgroundColor:"white", textAlign:"right"}}>{record.unclramt}</td>
// </tr>
// <tr style={{border:"2px solid black"}}>
// <th>Total Balance -(I=F+G+H)</th>
// <td style={{border:"2px solid black", textAlign:"right"}}>{record.totalbal}</td>
//   </tr>



//   <tr>  
//   <th>InitalMargin-(J)</th>
// <td style={{backgroundColor:"white", textAlign:"right"}}>{record.inimgn}</td>
// </tr><tr>
//   <th>Exposure -(K)</th>
//   <td style={{backgroundColor:"white", textAlign:"right"}}>{record.exposure}</td>
//   </tr><tr>
// <th>AdditionalMargin-(L)</th>
// <td style={{backgroundColor:"white", textAlign:"right"}}>{record.additnal}</td>
// </tr>

// <tr style={{border:"2px solid black"}}>
// <th>Net Value-(M=I-J-K-L)</th>
// <td style={{border:"2px solid black", textAlign:"right" , backgroundColor:"lightgray"}}>{record.netvalue}</td>
//   </tr>







//     <tr>
//   <th>PledgeshareValue P1&P3 (NormalPledge)-(O)</th>
//   <td style={{backgroundColor:"white", textAlign:"right"}}>{record.pldgqp1p3}</td>
//   </tr><tr>
// <th>PledgeshareValue P2(MTF)-(P)</th>
// <td style={{backgroundColor:"white", textAlign:"right"}}>{record.pldgqp2}</td>
//   </tr>



//   <tr>

// <th>Benificiary -(Q)</th>
// <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.security1}</td>
// </tr>
// <tr>
// <th>MF,SGB,T-Bill Etc-(R)</th>
// <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.othmgn1}</td>
// </tr>
// <tr>
// <th>Delivered Amt-(S)</th>
// <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.delvdamt}</td>
// </tr>

//   <tr style={{border:"2px solid black"}}>  
//   <th>Total Margin-(V=O+P+Q+R+S)</th>
//   <td style={{backgroundColor:"lightgray", textAlign:"right" ,border:"2px solid black"}}>{record.tmargin}</td>
// </tr><tr style={{border:"2px solid black"}}>
// <th>NetMargin-(W=V-M)</th>
// <td style={{backgroundColor:"lightgray", textAlign:"right", border:"2px solid black"}}>{record.netmargin}</td>
// </tr><tr style={{border:"2px solid black"}}>
// <th >Net Margin based on Pledge-(X=O+P+R-F)</th>

// <td style={{backgroundColor:"lightgray", textAlign:"right" , border:"2px solid black"}}>{record.nmgnboplg}</td>
//   </tr>
//   </table>

// </div>




// <div style={{width:'50%', float:'right'}}>
// <table>
//   <tr>
//   <th>MCX Ledger balance -(F1)</th>
//   <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.mcxledger}</td>
//   </tr><tr>
// <th>NCDEX Ledger balance -(F2)</th>
// <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.ncdledger}</td>
// </tr><tr>
// <th>NSECDS Ledger balance -(F3)</th>
// <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.ncdsledger}</td>
// </tr><tr>
// <th>Auction Debit 150% -(N)</th>
// <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.jv150}</td>
// </tr><tr>
// <th>PendingProofAmt (Oth DP Trf)-(T)</th>
// <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.pndgprfamt}</td>
// </tr><tr>
// <th>PayoutPendingAmt (UnRegdBank Trf)-(U)</th>
// <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.popndgamt}</td>
// </tr><tr>
// <th>DP SOH Value-(Y)</th>
// <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.dpsohval}</td>
// </tr><tr>
//     <th>Margin_post_VAR-(Z)</th>
//     <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.mgnpostvr}</td>
//     </tr><tr>
//     <th>Margin_post_HCUT-(AA)</th>
//     <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.mgnpohc}</td>
//     </tr><tr>
//     <th>Margin_post_HCUT_Maintenance -(AB)</th>
//     <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.mgnpohcm}</td>
//     </tr><tr>
//     <th>Var_margin_LESS_SEC_Margin_POST_HCUT -(AC)</th>
//     <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.vmlsmgnphc}</td>
//     </tr><tr>
//     <th>Aging Greater 5d  -(AD)</th>
//     <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.agegr5}</td>
//     </tr><tr>
//     <th>Excess_Margin -(AE)</th>
//     <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.exmargin}</td>
//     </tr><tr>
//     <th>Derv_Margin -(AF)</th>
//     <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.dervmgn}</td>
//     </tr><tr>
//     <th>Last Tradeded Date</th>
//     <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.lsttrddt}</td>

//   </tr>
// </table>
// {loading && (
//           <div style={{ textAlign: "center", marginTop: "20px" }}>
//             <Spinner animation="border" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </Spinner>
//           </div>
//         )}

// </div>
//               </div>
//             ))}
//             </div>
//         )}

// {activeButton === 'portfo' && portfoData !== null && (
//           <div>
         
//                 {!dataFound && (
//                 <div className="alert alert-warning" role="alert">
//                   Data not found!
//                 </div>
//               )}
//             <h3>Portfolio</h3>
//             <button onClick={() => this.portfoExcel(portfoData)}>
//           Download Portfolio Excel
//         </button>
//             <div>
//            <table class="6" className="table table-striped table-scroll">
//   <thead>
//     <tr>
     
 
//     <th>es_ucc</th>
// <th>ucc</th>
// <th>clname</th>
// <th>symbol</th>
// <th>instrument</th>
// <th>option_typ</th>
// <th>sp</th>
// <th>expirydate</th>
// <th>qty</th>
// <th>avgcost</th>
// <th>cost</th>
// <th>mktvalue</th>
// <th>unreal</th>
// <th>mreturn</th>
// <th>date</th>
// <th>sqgain</th>
// <th>delgain</th>
// <th>bse_clrate</th>
// <th>location</th>
// <th>locnid</th>
// <th>isin</th>
// <th>exchange</th>
// <th>sc_shrtnm</th>
// <th>comn_sccd</th>
// <th>is_suspend</th>
// <th>brcd</th>
// <th>familygrp</th>


      
//     </tr>
//   </thead>
//   <tbody>
//             {portfoData.map((portf , index) => (
//     <tr key={index}>

// <td>{portf.es_ucc}</td>
// <td>{portf.ucc}</td>
// <td>{portf.clname}</td>
// <td>{portf.symbol}</td>
// <td>{portf.instrument}</td>
// <td>{portf.option_typ}</td>
// <td>{portf.sp}</td>
// <td>{portf.expirydate}</td>
// <td>{portf.qty}</td>
// <td>{portf.avgcost}</td>
// <td>{portf.cost}</td>
// <td>{portf.mktvalue}</td>
// <td>{portf.unreal}</td>
// <td>{portf.mreturn}</td>
// <td>{portf.date}</td>
// <td>{portf.sqgain}</td>
// <td>{portf.delgain}</td>
// <td>{portf.bse_clrate}</td>
// <td>{portf.location}</td>
// <td>{portf.locnid}</td>
// <td>{portf.isin}</td>
// <td>{portf.exchange}</td>
// <td>{portf.sc_shrtnm}</td>
// <td>{portf.comn_sccd}</td>
// <td>{portf.is_suspend}</td>
// <td>{portf.brcd}</td>
// <td>{portf.familygrp}</td>

//     </tr>
//      ))}
//   </tbody>
// </table>
// {loading && (
//           <div style={{ textAlign: "center", marginTop: "20px" }}>
//             <Spinner animation="border" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </Spinner>
//           </div>
//         )}
//               </div>
//               </div>
            
    
         
//         )}

// {activeButton === 'mtfpo' && mtfpoData !== null && (
//           <div>
//             {!dataFound && (
//                 <div className="alert alert-warning" role="alert">
//                   Data not found!
//                 </div>
//               )}
//             <h3>Mtf Position</h3>
//             <button onClick={() => this.mtfpoExcel(mtfpoData)}>
//           Download MTFpo Excel
//         </button>
//             <table class="6" className="table table-striped table-scroll">
//   <thead>
//     <tr>
    
// <th>NSE</th>
// <th>Qty</th>
// <th>Cost Price</th>
// <th>Funding Value</th>
// <th>Symbol/code</th>
// <th>ISIN</th>
// <th>Company Script Code</th>
// <th>BSE</th>
// <th>BSE_series</th>
// <th>NSE_series</th>
// <th>ODIN ScripCode</th>
// <th>_Branch</th>
// <th>Family Group</th>
// <th>ScripName</th>



      
//     </tr>
//   </thead>
//   <tbody>
//             {mtfpoData.map((mtfpo,index) => (
//     <tr key={index}>

// <td>{mtfpo.nse}</td>
// <td>{mtfpo.qty}</td>
// <td>{mtfpo.cost_rate}</td>
// <td>{mtfpo.mtf_value}</td>
// <td>{mtfpo.symbol}</td>
// <td>{mtfpo.isin}</td>
// <td>{mtfpo.co_sccode}</td>
// <td>{mtfpo.bse}</td>
// <td>{mtfpo.bse_sers}</td>
// <td>{mtfpo.nse_sers}</td>
// <td>{mtfpo.odin_sccd}</td>
// <td>{mtfpo.brcd}</td>
// <td>{mtfpo.familygrp}</td>
// <td>{mtfpo.scrname}</td>
//     </tr>
//             ))}
//   </tbody>
// </table>
// {loading && (
//           <div style={{ textAlign: "center", marginTop: "20px" }}>
//             <Spinner animation="border" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </Spinner>
//           </div>
//         )}
// </div>
       
          
//         )}


// {activeButton === 'netpo' && netpoData !== null && (
//           <div>
//             {!dataFound && (
//                 <div className="alert alert-warning" role="alert">
//                   Data not found!
//                 </div>
//               )}
//             <h3>Open Position</h3>
//             <button onClick={() => this.opExcel(netpoData)}>
//           Download Open Position Excel
//         </button>
//             <table class="6" className="table table-striped table-scroll">
//     <thead>
//       <tr>
       
  
//   <th>Symbole</th>
//   <th>ExpDate</th>
//   <th>StrikePrice</th>
//   <th>OptType</th>
//   <th>PurchaseQty</th>
//   <th>Sold_Qty</th>
//   <th>NetQty</th>
//   <th>Net_Rate</th>
//   <th>Purchase_Amt</th>
//   <th>Sold_Amt</th>
//   <th>Net_Amt</th>
//   <th>Net_Value</th>
//   <th>Exch Code</th>
//   <th>ScriptRate</th>
//   <th>FutOpt</th>
//   <th>Company Script Code</th>
//   <th>ScripName</th>
//   <th>_Branch</th>
//   <th>Family Group</th>
 
  
        
//       </tr>
//     </thead>
//     <tbody>
//             {netpoData.map((netpo,index) => (    
//       <tr key={index}>
//   <td>{netpo.symbole}</td>
//   <td>{netpo.expdate}</td>
//   <td>{netpo.stkprice}</td>
//   <td>{netpo.opttype}</td>
//   <td>{netpo.purc_qty}</td>
//   <td>{netpo.soldqty}</td>
//   <td>{netpo.net_qty}</td>
//   <td>{netpo.net_rate}</td>
//   <td>{netpo.purc_amt}</td>
//   <td>{netpo.sold_amt}</td>
//   <td>{netpo.net_amt}</td>
//   <td>{netpo.net_value}</td>
//   <td>{netpo.exch_code}</td>
//   <td>{netpo.scrprate}</td>
//   <td>{netpo.futopt}</td>
//   <td>{netpo.scripcd}</td>
//   <td>{netpo.scripnm}</td>
//   <td>{netpo.brcd}</td>
//   <td>{netpo.familygrp}</td>

  
//       </tr>
//        ))}
//     </tbody>
//   </table>
//   {loading && (
//           <div style={{ textAlign: "center", marginTop: "20px" }}>
//             <Spinner animation="border" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </Spinner>
//           </div>
//         )}
//   </div>
        
          
//         )}



// {activeButton === 'nominee' && nomineeData !== null && (
//           <div>
//             {!dataFound && (
//                 <div className="alert alert-warning" role="alert">
//                   Data not found!
//                 </div>
//               )}
//             <h3>Nominee Data</h3>

//             <table class="6" className="table table-striped table-scroll">
//     <thead>
//       <tr>
       
      
// <th>barcode</th>
// <th>brcd</th>
// <th>cl_grp</th>
// <th>ucc</th>
// <th>kslucc</th>
// <th>ksluccnm</th>
// <th>panno</th>
// <th>locnid</th>
// <th>ksemailid</th>
// <th>ksmobile</th>
// <th>es_nomn</th>
// <th>es_nompan</th>
// <th>es_nomshr</th>
// <th>es_relwapc</th>
// <th>ks_nomn</th>
// <th>ks_nompan</th>
// <th>ks_nomshr</th>
// <th>ks_relwapc</th>    
//       </tr>
//     </thead>
//     <tbody>
//             {nomineeData.map((nominee) => (
            
           
//       <tr >
// <td>{nominee && nominee.barcode ? nominee.barcode : ""}</td>
// <td>{nominee && nominee.brcd ? nominee.brcd: ""}</td>
// <td>{nominee && nominee.cl_grp ? nominee.cl_grp :" "}</td>
// <td>{nominee && nominee.ucc ? nominee.ucc : " "}</td>
// <td>{nominee && nominee.kslucc ? nominee.kslucc:""}</td>
// <td>{nominee && nominee.ksluccnm ? nominee.ksluccnm : " "}</td>
// <td>{nominee && nominee.panno ?nominee.panno : " "}</td>
// <td>{nominee && nominee.locnid ? nominee.locnid : " "}</td>
// <td>{nominee && nominee.ksemailid ? nominee.ksemailid : " "}</td>
// <td>{nominee && nominee.ksmobile ? nominee.ksmobile : " "}</td>
// <td>{nominee && nominee.es_nomn ? nominee.es_nomn : " "}</td>
// <td>{nominee && nominee.es_nompan ? nominee.es_nompan : " "}</td>
// <td>{nominee && nominee.es_nomshr ? nominee.es_nomshr : " "}</td>
// <td>{nominee && nominee.es_relwapc ? nominee.es_relwapc : " "}</td>
// <td>{nominee && nominee.ks_nomn ? nominee.ks_nomn : " "}</td>
// <td>{nominee && nominee.ks_nompan ? nominee.ks_nompan : " "}</td>
// <td>{nominee && nominee.ks_nomshr ? nominee.ks_nomshr : " "}</td>
// <td>{nominee && nominee.ks_relwapc ? nominee.ks_relwapc : " "}</td>
//       </tr>
//       ))}
//     </tbody>
//   </table>
//   {loading && (
//           <div style={{ textAlign: "center", marginTop: "20px" }}>
//             <Spinner animation="border" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </Spinner>
//           </div>
//         )}
//           </div>
//           )}
//           </div>
//         ) : (
//           <div>
//             <h3>Record List</h3>
//             <h3>Updated Date {letterData.length > 0 && letterData[0].run_date ? letterData[0].run_date : 'N/A'}</h3>
//             <input
//           type="text"
//           placeholder="Search..."
//           value={this.state.searchValue}
//           onChange={this.handleSearchChange}
//         />
//             <table className="table table-striped" style={{ marginTop: 20 }}>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Priority</th>
//                   <th>UCC</th>
//                   <th>KSLUCC</th>
//                   <th>KS_PANNO</th>
//                   <th>LocationID</th>
//                   <th>Closer_TRF</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
              
//               <tbody>
//   {letterData && letterData.map((record, index) => (
//     <Record key={index} record={record} onView={this.handleView} />
//   ))}
// </tbody>

//             </table>
//             {loading && (
//           <div style={{ textAlign: "center", marginTop: "20px" }}>
//             <Spinner animation="border" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </Spinner>
//           </div>
//         )}

//           </div>
//         )}

        
//       </div>
//     );
//   }
// }

















import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { Spinner } from "react-bootstrap"; // Importing Spinner from Bootstrap
import * as XLSX from "xlsx"



const Record = (props) => (
  <tr key={props.record.id}>
    <td>{props.record.clname}</td>
    <td>{props.record.priority}</td>
    <td>{props.record.nod_dormnt}</td>
    <td>{props.record.ucc}</td>
    <td>{props.record.kslucc}</td>
    <td>{props.record.brcd}</td>
    <td>{props.record.es_locnid}</td>
    <td>{props.record.ks_panno}</td>
    <td>{props.record.locationid}</td>
    <td>{props.record.closer_trf}</td>
    <td>
      <button
        className="btn btn-link"
        onClick={() => props.onView(props.record)}
      >
        View
      </button>
    </td>
  </tr>
);

export default class BoardExtra extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      letterData: [],
      selectedRecord: null,
      dpsohData: [],
      ledgerData: [],
      mtfpoData: [],
      netpoData: [],
      portfoData: [],
      porteqData: [],
      portcomData: [],
      nomineeData: [],
      isViewingRecord: false,
      hoveredDptype: "",
      mousePosition: { x: 0, y: 0 },
      searchValue: "",
      activeButton: null,
      dataFound: true,
      loading: false, // Added loading state
      closerTransferFilter: "all",
      PriorityFilter: "all",
      filteredData: [],
    };
  }



  handleHover = (event, dptype) => {
    this.setState({
      hoveredDptype: dptype,
      mousePosition: { x: event.clientX, y: event.clientY },
    });
  };

  handleMouseLeave = () => {
    this.setState({ hoveredDptype: "" });
  };

  // componentDidMount() {
  //   this.getLetterData();
  // }

  // getLetterData = async () => {
  //   try {
  //     this.setState({ loading: true }); // Set loading to true when data fetching starts
  //     const startTime = performance.now(); // Record start time
  //     const currentUser = AuthService.getCurrentUser();
  //     const response = await fetch("http://183.182.84.228:4005/letter/");
  //     const letterData = await response.json();
  //     const filteredLetterData = letterData.filter(
  //       (record) =>
  //         (record.clname.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
  //         record.kslucc.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
  //         record.ucc.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
  //         record.es_locnid.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
  //         record.ks_panno.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
  //         record.locationid.toLowerCase().includes(this.state.searchValue.toLowerCase()))
  //     );
  //     const endTime = performance.now(); // Record end time
  //     const elapsedTime = endTime - startTime; // Calculate elapsed time
  //     console.log("Time taken to fetch and filter data:", elapsedTime, "milliseconds");
  //     this.setState({ letterData: filteredLetterData.length > 0 ? filteredLetterData : null });
  //     this.setState({ activeButton: 'letter' });
  //   } catch (error) {
  //     window.alert(`An error occurred: ${error}`);
  //   }
  //   finally {
  //     this.setState({ loading: false }); // Set loading to false when data fetching completes
  //   }
  // };
  


  // handleView = async (record) => {
  //   this.setState({
  //     selectedRecord: record,
  //     isViewingRecord: true,
  //     dpsohData: [],
  //     ledgerData: [],
  //     mtfpoData: [],
  //     netpoData: [],
  //     portfoData: [],
  //     nomineeData: [],
  //   });
  // };


  

  componentDidMount() {
    this.getLetterData();
  }

  getLetterData = async () => {
    try {
      this.setState({ loading: true }); // Set loading to true when data fetching starts
      const startTime = performance.now(); // Record start time
      const currentUser = AuthService.getCurrentUser();
      const response = await fetch("http://183.182.84.228:4005/letter/");
      const letterData = await response.json();

      const allUsersResponse = await AuthService.getAllUsers();
        const currentUserDetails = allUsersResponse.find(user => user.username === currentUser.username);
          const viewableUsers = currentUserDetails.viewableUsers.split(',');
  
        const filteredLetterData = letterData.filter(record =>  viewableUsers.includes(record.es_locnid));
      
      // const filteredLetterData = letterData.filter((record) => {
      //   if (currentUser.username === "E640") {
      //     return ["E640", "E641", "E642", "E643","E644"].includes(record.es_locnid);
      //   } else {
      //     return currentUser.username === record.es_locnid;
      //   }
      // });
  
      const endTime = performance.now(); // Record end time
      const elapsedTime = endTime - startTime; // Calculate elapsed time
      // console.log("Time taken to fetch and filter data:", elapsedTime, "milliseconds");
      
      this.setState({ letterData: filteredLetterData.length > 0 ? filteredLetterData : null }, this.applyFilters);
      this.setState({ activeButton: 'letter' });
    } catch (error) {
      window.alert(`An error occurred: ${error}`);
    } finally {
      this.setState({ loading: false }); // Set loading to false when data fetching completes
    }
  };
















  


  handleFilterChange = (event) => {
    this.setState({ closerTransferFilter: event.target.value }, this.applyFilters);
  };

  handlePriorityChange = (event) => {
    this.setState({ priorityFilter: event.target.value }, this.applyFilters);
  };

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSearchSubmit = (event) => {
    event.preventDefault();
    this.applyFilters();
  };

  applyFilters = () => {
    const { closerTransferFilter, priorityFilter, searchQuery, letterData } = this.state;

    let filteredData = letterData;

    // Apply closer transfer filter
    if (closerTransferFilter === "yes") {
      filteredData = filteredData.filter((record) => record.closer_trf);
    } else if (closerTransferFilter === "no") {
      filteredData = filteredData.filter((record) => !record.closer_trf);
    }

    // Apply priority filter
    if (priorityFilter === "A") {
      filteredData = filteredData.filter((record) => record.priority === "A");
    } else if (priorityFilter === "B") {
      filteredData = filteredData.filter((record) => record.priority === "B");
    } else if (priorityFilter === "blank") {
      filteredData = filteredData.filter((record) => !record.priority);
    }

    // Apply search filter
    if (searchQuery) {
      filteredData = filteredData.filter((record) =>
        (record.clname && record.clname.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (record.kslucc && record.kslucc.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (record.ucc && record.ucc.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (record.es_locnid && record.es_locnid.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (record.ks_panno && record.ks_panno.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (record.locationid && record.locationid.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    this.setState({ filteredData });
  };


  handleView = async (record) => {
    this.setState({
      selectedRecord: record,
      isViewingRecord: true,
      dpsohData: [],
      ledgerData: [],
      mtfpoData: [],
      netpoData: [],
      portfoData: [],
      porteqData: [],
      portcomData: [],
      nomineeData: [],
    });
  };



  generalExcel = (record) => {
    const data = [
      [
        "_Priority", "KS KRA Status", "Kotak PTT Status", "KS KRA/PTT Remarks", "Kotak KRA/PTT e-mail Sent",
        "Kotak PTT e-mail Recd", "Kotak KRA/PTT RM", "Kotak KRA/PTT e-mail Sent Remarks", "ESL UCC", "KSL UCC",
        "Client Name", "LocationId", "Category", "Pan No", "Ks e-mailId", "Ks Mobile No.", "KS DPID", "KS DPBOID",
        "Virtual_Bank A/c No", "Virtual Bank Name", "Virtual Bank IFSC", "NSE CM STATUS", "KS NSE CM",
        "BSE CM STATUS", "KS BSE CM", "NSE F&O STATUS", "KS NSE FO", "Ks Trading PlatForm", "Es e-mailId",
        "Es_Mobile No", "DoB or DoI", "UID", "ks DP SOH", "ks DP SOH Value", "NSE CDS STATUS", "KS NSE CDS",
        "MCX STATUS", "KS MCX", "NCDEX STATUS", "KS NCDEX", "KS CLNT STATUS", "KS Clnt Type", "KS CLNT USER ID",
        "KS Q/S FO (RAL)", "KS Q/S CM (RAL)", "KS CLNT Introduction Date", "KS Last Trading Date", "Franchise Code",
        "Franchise Name", "State", "Dealing Zone", "Es Ckyc_No", "Es Nominee", "Es Nominee Pan No", "Es Nominee Share%",
        "Es Relation With Person", "Ks Nominee", "Ks Nominee Pan No", "Ks Nominee Share%", "Ks Relation With Person",
        "ES Location Code", "ES LocationID", "NEO ID", "ODIN ID", "BOSS ID", "ES DP HOLDING VALUE", "ES TURNOVER",
        "ES NET BROKERAGE", "ES LAST TRADING DATE", "ES NSE CM", "ES NSE FO", "ES NSE CDS", "ES BSE CM", "ES MCX",
        "ES NCDEX", "ES Clnt Status", "Ks Bank A/c No.", "Ks MICR No.", "Ks IFSC Code", "Ks Bank Name", "Ks Default Bank",
        "Ks Bank A/c Type", "Ks Bank Branch", "Correspondence Address 1", "Correspondence Address 2", "Correspondence Address 3",
        "Correspondence Address 4", "Correspondence City", "Correspondence State", "Correspondence Pin", "Correspondence Country",
        "Permanent Address 1", "Permanent Address 2", "Permanent Address 3", "Permanent Address 4", "Permanent City",
        "Permanent State", "Permanent Pin", "Permanent Country", "BARCODE", "_BRANCH", "Branch Name", "Family Group",
        "Closer Transfer Done", "KS DP Rate Code", "ES DP Rate Code", "ES Ledger Balance", "ES Margin", "F&O Open Position",
        "ES DP Ledger Balance", "RunDate",
      ],
      [
        record.priority, record.ks_krasts, record.ks_pttsts, record.ks_krarem, record.ks_emsent, record.ks_emrecd,
        record.ks_rm, record.ks_krptrem, record.ucc, record.kslucc, record.clname, record.locationid, record.es_catg,
        record.ks_panno, record.ks_emailid, record.ks_mobile, record.ks_dpid, record.ksdp_boid, record.vir_bkacno,
        record.vir_bknm, record.vir_ifsc, record.ptt_nsecm, record.ks_nsecm, record.ptt_bsecm, record.ks_bsecm,
        record.ptt_nsefo, record.ks_nsefo, record.k_platform, record.es_email, record.es_mobile, record.es_dobdoi,
        record.es_uid, record.ks_dpsoh, record.ks_sohval, record.ptt_nsecds, record.ks_nsecds, record.ptt_mcx,
        record.ks_mcx, record.ptt_ncdex, record.ks_ncdex, record.ks_clsts, record.ks_cltype, record.ks_clusrid,
        record.kral_fno, record.kral_ncm, record.ks_introdt, record.ks_lstrdt, record.ks_frccode, record.ks_frchis,
        record.mis_state, record.deal_zone, record.es_ckyc, record.es_nomn, record.es_nompan, record.es_nomshr,
        record.es_relwapc, record.ks_nomn, record.ks_nompan, record.ks_nomshr, record.ks_relwapc, record.es_locncd,
        record.es_locnid, record.neoid, record.odinid, record.bossid, record.dphldgval, record.estovr, record.esnetbkg,
        record.eslsttrd, record.ensecm, record.ensefo, record.ensecds, record.ebsecm, record.emcx, record.encdex,
        record.ecl_sts, record.bnkacno, record.micrno, record.ifsc_cd, record.bnknm, record.defbnk, record.acctype,
        record.bnkbr, record.coradd1, record.coradd2, record.coradd3, record.coradd4, record.corcity, record.corstate,
        record.corpin, record.corcntry, record.per_add1, record.per_add2, record.per_add3, record.per_add4, record.per_city,
        record.per_state, record.per_pin, record.per_cntry, record.barcode, record.brcd, record.brname, record.family_grp,
        record.closer_trf, record.ks_dprtcd, record.es_dprtcd, record.es_ledbal, record.es_margin, record.opnpos_nfo,
        record.es_dpledg, record.run_date,
      ],
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "General_Info.xls");
  };


  dpsohExcel = (records) => {
    const data = [
      ["es_ucc" ,	"kslucc" ,	"clname" ,	"panno" ,	"brcd" ,	"dptype" ,	"hldgdt" ,	"soh_brcd" ,	"ks_dpid" ,	"cldpid" ,	"location" ,	"locnid" ,	"dpsts" ,	"isin" ,	"ks_dpsoh" ,	"scrate" ,	"dp_sohval" ,	"cc_id" ,	"bkflag" ,	"bklkcd" ,	"lkinreldt" ,	"scrname" ,	"bactype" ,	"catgdespn" ,	"comsccd" ,	"bsecode" ,	"nsesymbl" ,	"dpidpri" ,	"varvfodp" ,	"sccatg" ,	"cl_grp" ,
      ],
      ...records.map(record => [
        record.es_ucc ,	record.kslucc ,	record.clname ,	record.panno ,	record.brcd ,	record.dptype ,	record.hldgdt ,	record.soh_brcd ,	record.ks_dpid ,	record.cldpid ,	record.location ,	record.locnid ,	record.dpsts ,	record.isin ,	record.ks_dpsoh ,	record.scrate ,	record.dp_sohval ,	record.cc_id ,	record.bkflag ,	record.bklkcd ,	record.lkinreldt ,	record.scrname ,	record.bactype ,	record.catgdespn ,	record.comsccd ,	record.bsecode ,	record.nsesymbl ,	record.dpidpri ,	record.varvfodp ,	record.sccatg ,	record.cl_grp ,

      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "DPSOH.xls");
  };



  balanceExcel = (records) => {
    const data = [
      ["ESL UCC-(A)" ,	"KSL UCC-(B)" ,	"Client Name-(C)" ,	"LocationId-(D)" ,	"LocationCD-(E)" ,	"MCX Ledger balance -(F1)" ,	"NCDEX Ledger balance -(F2)" ,	"NSECDS Ledger balance -(F3)" ,	"LedgerBalance(With Ini+Exp Margin+Mtf)-(F)" ,	"MTF Funding Value -(F4)" ,	"Total Un Billed-(G)" ,	"UnclearAmt-(H)" ,	"Total Balance -Without MTF Balance (I=F-F1-G-H)" ,	"InitalMargin-(J)" ,	"Exposure -(K)" ,	"AdditionalMargin-(L)" ,	"Net Value-(M=I-J-K-L)" ,	"Auction Debit 150% -(N)" ,	"PledgeshareValue P1&P3 (NormalPledge)-(O)" ,	"PledgeshareValue P2(MTF)-(P)" ,	"Benificiary -(Q)" ,	"MF,SGB,T-Bill Etc-(R)" ,	"Delivered Amt-(S)" ,	"PendingProofAmt (Oth DP Trf)-(T)" ,	"PayoutPendingAmt (UnRegdBank Trf)-(U)" ,	"Total Margin-(V = O+P+Q+R+S)" ,	"NetMargin-(W=V-M)" ,	"Net Margin based on Pledge-(X=O+P+R-F)" ,	"DP SOH Value-(Y)" ,	"Margin_post_VAR-(Z)" ,	"Margin_post_HCUT-(AA)" ,	"Margin_post_HCUT_Maintenance -(AB)" ,	"Var_margin_LESS_SEC_Margin_POST_HCUT -(AC)" ,	"Aging Greater 5d  -(AD)" ,	"Excess_Margin -(AE)" ,	"Derv_Margin -(AF)" ,	"DP id status -(AG)" ,	"DP id mapped as default -(AH)" ,	"Status in BSE -(AI)" ,	"Status in NSE -(AJ)" ,	"Status in Derivatives Equities -(AK)" ,	"Status in NSECDS  -(AL)" ,	"Reasons for Deactivate -(AM)" ,	"Reasons for Deactivate -(AM1)" ,	"Last Tradeded Date" ,	"_Branch" ,	"Family Group" ,	"RunDate" ,

    ],
    ...records.map(record => [
        record.es_ucc ,	record.ucc ,	record.clname ,	record.location ,	record.locnid ,	record.mcxledger ,	record.ncdledger ,	record.ncdsledger ,	record.ledgbal ,	record.mtfundval ,	record.tunbilled ,	record.unclramt ,	record.totalbal ,	record.inimgn ,	record.exposure ,	record.additnal ,	record.netvalue ,	record.jv150 ,	record.pldgqp1p3 ,	record.pldgqp2 ,	record.security1 ,	record.othmgn1 ,	record.delvdamt ,	record.pndgprfamt ,	record.popndgamt ,	record.tmargin ,	record.netmargin ,	record.nmgnboplg ,	record.dpsohval ,	record.mgnpostvr ,	record.mgnpohc ,	record.mgnpohcm ,	record.vmlsmgnphc ,	record.agegr5 ,	record.exmargin ,	record.dervmgn ,	record.dpidsts ,	record.dpidmapdf ,	record.stsinbse ,	record.stsinnse ,	record.stsderveq ,	record.stsnsecds ,	record.resfdact1 ,	record.resfdact2 ,	record.lsttrddt ,	record.brcd ,	record.familygrp ,	record.run_date ,

      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "Balance.xls");
  };



  mtfpoExcel = (records) => {
    const data = [
      ["ESL UCC" ,	"KSL UCC" ,	"Client Name" ,	"LocationId" ,	"LocationCD" ,	"NSE" ,	"Qty" ,	"Cost Price" ,	"Funding Value" ,	"Symbol/code" ,	"ISIN" ,	"Company Script Code" ,	"BSE" ,	"BSE_series" ,	"NSE_series" ,	"ODIN ScripCode" ,	"_Branch" ,	"Family Group" ,	"ScripName" ,	"RunDate" ,

    ],
    ...records.map(record => [
        record.es_ucc ,	record.ucc ,	record.clname ,	record.location ,	record.locnid ,	record.nse ,	record.qty ,	record.cost_rate ,	record.mtf_value ,	record.symbol ,	record.isin ,	record.co_sccode ,	record.bse ,	record.bse_sers ,	record.nse_sers ,	record.odin_sccd ,	record.brcd ,	record.familygrp ,	record.scrname ,	record.run_date ,

      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "MTF_Pos.xls");
  };




  opExcel = (records) => {
    const data = [
      ["ESL UCC" ,	"KSL UCC" ,	"Client Name" ,	"LocationId" ,	"LocationCD" ,	"Symbole" ,	"ExpDate" ,	"StrikePrice" ,	"OptType" ,	"PurchaseQty" ,	"Sold_Qty" ,	"NetQty" ,	"Net_Rate" ,	"Purchase_Amt" ,	"Sold_Amt" ,	"Net_Amt" ,	"Net_Value" ,	"Exch Code" ,	"ScriptRate" ,	"FutOpt" ,	"Company Script Code" ,	"ScripName" ,	"_Branch" ,	"Family Group" ,	"RunDate" ,

    ],
    ...records.map(record => [
        record.es_ucc ,	record.ucc ,	record.clname ,	record.location ,	record.locnid ,	record.symbole ,	record.expdate ,	record.stkprice ,	record.opttype ,	record.purc_qty ,	record.soldqty ,	record.net_qty ,	record.net_rate ,	record.purc_amt ,	record.sold_amt ,	record.net_amt ,	record.net_value ,	record.exch_code ,	record.scrprate ,	record.futopt ,	record.scripcd ,	record.scripnm ,	record.brcd ,	record.familygrp ,	record.run_date ,

      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "Open_Pos.xls");
  };




  portfoExcel = (records) => {
    const data = [
      ["ESL UCC" ,	"KSL UCC" ,	"Client Name" ,	"Symbol" ,	"Instrument" ,	"Option Type" ,	"Strike Price" ,	"ExpiryDate" ,	"Qty" ,	"AvgCostPrice" ,	"CostValue" ,	"Market Value" ,	"UnReal" ,	"MktReturn" ,	"Date" ,	"Sq Gain" ,	"Del Gain" ,	"LocationId" ,	"LocationCD" ,	"ISIN" ,	"Exchange" ,	"Scrip Name" ,	"Common ScripCode" ,	"Is Suspend" ,	"_Branch" ,	"Family Group" ,

    ],
    ...records.map(record => [
      record.es_ucc,	record.ucc,	record.clname,	record.symbol,	record.instrument,	record.option_typ,	record.sp,	record.expirydate,	record.qty,	record.avgcost,	record.cost,	record.mktvalue,	record.unreal,	record.mreturn,	record.date,	record.sqgain,	record.delgain,	record.location,	record.locnid,	record.isin,	record.exchange,	record.sc_shrtnm,	record.comn_sccd,	record.is_suspend,	record.brcd,	record.familygrp

      ]),
    ];


    const totalQty = records.reduce((sum, record) => sum + parseFloat(record.qty), 0);
    const totalAvgCostPrice = records.reduce((sum, record) => sum + parseFloat(record.avgcost), 0);
    const totalCostValue = records.reduce((sum, record) => sum + parseFloat(record.cost), 0);
    const totalMarketValue = records.reduce((sum, record) => sum + parseFloat(record.mktvalue), 0);
    const totalUnReal = records.reduce((sum, record) => sum + parseFloat(record.unreal), 0);
    const totalMktReturn = records.reduce((sum, record) => sum + parseFloat(record.mreturn), 0);

    // Add total row to data array
    data.push([
        "Total",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        totalQty.toFixed(2),
        totalAvgCostPrice.toFixed(2),
        totalCostValue.toFixed(2),
        totalMarketValue.toFixed(2),
        totalUnReal.toFixed(2),
        totalMktReturn.toFixed(2),
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
    ]);

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "Portfolio_F&O_.xls");
  };



  // porteqExcel = (records) => {

  //   const data = [
  //     ["ESL UCC" ,	"KSL UCC" ,	"Client Name" ,	"Symbol" ,	"Instrument" ,	"Qty" ,	"AvgCostPrice" ,	"Bse Curr Price" ,	"CostValue" ,	"Market Value" ,	"UnReal" ,	"MktReturn" ,	"Date" ,	"Sq Gain" ,	"Del Gain" ,	"LocationId" ,	"LocationCD" ,	"ISIN" ,	"Exchange" ,	"Scrip Name" ,	"Common ScripCode" ,	"Is Suspend" ,	"_Branch" ,	"Family Group","Qty in Dpsoh","Beneficiary qty","pledge qty","result"

  //   ],
  //   ...records.map(record => [
  //     record.es_ucc,	record.ucc,	record.clname,	record.symbol,	record.instrument,	record.qty,	record.avgcost,	record.bse_clrate,	record.cost,	record.mktvalue,	record.unreal,	record.mreturn,	record.date,	record.sqgain,	record.delgain,	record.location,	record.locnid,	record.isin,	record.exchange,	record.sc_shrtnm,	record.comn_sccd,	record.is_suspend,	record.brcd,	record.familygrp,record.total_qty ,	record.beneficiary_qty ,	record.pledge_qty , record.comparison_result

  //     ]),
  //   ];

  //   const totalQty = records.reduce((sum, record) => sum + parseFloat(record.qty), 0);
  //   const totalAvgCostPrice = records.reduce((sum, record) => sum + parseFloat(record.avgcost), 0);
  //   const totalBseCurrPrice = records.reduce((sum, record) => sum + parseFloat(record.bse_clrate), 0);
  //   const totalCostValue = records.reduce((sum, record) => sum + parseFloat(record.cost), 0);
  //   const totalMarketValue = records.reduce((sum, record) => sum + parseFloat(record.mktvalue), 0);
  //   const totalUnReal = records.reduce((sum, record) => sum + parseFloat(record.unreal), 0);
  //   const totalMktReturn = records.reduce((sum, record) => sum + parseFloat(record.mreturn), 0);

  //   // Add total row to data array
  //   data.push([
  //       "Total",
  //       "",
  //       "",
  //       "",
  //       "",
  //       totalQty.toFixed(2),
  //       totalAvgCostPrice.toFixed(2),
  //       totalBseCurrPrice.toFixed(2),
  //       totalCostValue.toFixed(2),
  //       totalMarketValue.toFixed(2),
  //       totalUnReal.toFixed(2),
  //       totalMktReturn.toFixed(2),
  //       "",
  //       "",
  //       "",
  //       "",
  //       "",
  //       "",
  //       "",
  //       "",
  //       "",
  //       "",
  //       "",
  //       "",
  //       "",
  //       "",
  //       "",
  //       "",
  //   ]);

  //   const ws = XLSX.utils.aoa_to_sheet(data);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  //   XLSX.writeFile(wb, "Portfolio_EQ_.xls");
  // };









  porteqExcel = async () => {
    try {
        // Fetch the data from the provided URL
        const response = await fetch("http://183.182.84.228:4005/dpsohdiff/");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const PortEQData = await response.json();
        
        // Filter the data based on the current record's UCC
        const filteredData = PortEQData.filter(record => record.ucc === this.state.selectedRecord.kslucc);

        if (filteredData.length === 0) {
            alert('No data found for the selected UCC.');
            return;
        }

        // Calculate the totals for relevant fields
        const totalQty = filteredData.reduce((sum, record) => sum + parseFloat(record.qty), 0);
        const totalAvgCostPrice = filteredData.reduce((sum, record) => sum + parseFloat(record.avgcost), 0);
        const totalBseCurrPrice = filteredData.reduce((sum, record) => sum + parseFloat(record.bse_clrate), 0);
        const totalCostValue = filteredData.reduce((sum, record) => sum + parseFloat(record.cost), 0);
        const totalMarketValue = filteredData.reduce((sum, record) => sum + parseFloat(record.mktvalue), 0);
        const totalUnReal = filteredData.reduce((sum, record) => sum + parseFloat(record.unreal), 0);
        const totalMktReturn = filteredData.reduce((sum, record) => sum + parseFloat(record.mreturn), 0);

        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
        const wb = XLSX.utils.book_new();

        // Split the filtered data into two categories based on instrument
        const dataWithGB = filteredData.filter(record => record.instrument === 'GB');
        const dataWithoutGB = filteredData.filter(record => record.instrument !== 'GB');

        // Define the structure of the Excel sheet
        const header = [
            "S.No.", "ESL UCC", "KSL UCC", "Client Name", "Symbol", "Instrument", "Qty", "AvgCostPrice",
            "Bse Curr Price", "CostValue", "Market Value", "UnReal", "MktReturn", "Date", "Sq Gain",
            "Del Gain", "LocationId", "LocationCD", "ISIN", "total Qty in DPSOH", "Beneficiary Qty", "Pledge Qty",
            "Comparison Result", "summed porteq Qty", "Count", "Mismatch Detail"
        ];

        // Function to format the data for each sheet and append totals at the end
        const formatDataForSheet = (data) => {
            const formattedData = [
                ["PortEQ Data"],
                header,
                ...data.map((record, index) => [
                    index + 1, record.es_ucc, record.ucc, record.clname, record.symbol, record.instrument,
                    record.qty, record.avgcost, record.bse_clrate, record.cost, record.mktvalue, record.unreal,
                    record.mreturn, record.date, record.sqgain, record.delgain, record.location, record.locnid,
                    record.isin, record.total_qty, record.beneficiary_qty, record.pledge_qty,
                    record.comparison_result, record.summed_p_qty, record.occurrence_count, record.mismatch_detail
                ])
            ];

            // Add a row with the totals at the end of the data
            // formattedData.push([
            //     "Total", "", "", "", "", "", totalAvgCostPrice.toFixed(2),
            //     totalBseCurrPrice.toFixed(2), totalCostValue.toFixed(2), totalMarketValue.toFixed(2),
            //     totalUnReal.toFixed(2), totalMktReturn.toFixed(2), "", "", "", "", "", "", "", "", "", "", "", "", "", ""
            // ]);

            return formattedData;
        };

        // Create the first sheet with data excluding GB instruments and append totals
        const wsWithoutGB = XLSX.utils.aoa_to_sheet(formatDataForSheet(dataWithoutGB));
        XLSX.utils.book_append_sheet(wb, wsWithoutGB, 'PortEQ Without GB');

        // Create the second sheet with only GB instruments and append totals
        const wsWithGB = XLSX.utils.aoa_to_sheet(formatDataForSheet(dataWithGB));
        XLSX.utils.book_append_sheet(wb, wsWithGB, 'PortEQ With GB');

        // Save the Excel file
        XLSX.writeFile(wb, `PortEQ_Data_${formattedDate}.xlsx`);

        // Optionally show an alert when the download is complete
    } catch (error) {
        console.error("Error fetching or processing data:", error);
        alert('Error occurred while downloading.');
    }
};



  portcomExcel = (records) => {
    const data = [
      ["ESL UCC" ,	"KSL UCC" ,	"Client Name" ,	"Symbol" ,	"Instrument" ,	"Option Type" ,	"Strike Price" ,	"ExpiryDate" ,	"Qty" ,	"AvgCostPrice" ,	"CostValue" ,	"Market Value" ,	"UnReal" ,	"MktReturn" ,	"Date" ,	"Sq Gain" ,	"Del Gain" ,	"LocationId" ,	"LocationCD" ,	"ISIN" ,	"Exchange" ,	"Scrip Name" ,	"Common ScripCode" ,	"Is Suspend" ,	"_Branch" ,	"Family Group" 

    ],
    ...records.map(record => [
      record.es_ucc,	record.ucc,	record.clname,	record.symbol,	record.instrument,	record.option_typ,	record.sp,	record.expirydate,	record.qty,	record.avgcost,	record.cost,	record.mktvalue,	record.unreal,	record.mreturn,	record.date,	record.sqgain,	record.delgain,	record.location,	record.locnid,	record.isin,	record.exchange,	record.sc_shrtnm,	record.comn_sccd,	record.is_suspend,	record.brcd,	record.familygrp

      ]),
    ];


    const totalQty = records.reduce((sum, record) => sum + parseFloat(record.qty), 0);
    const totalAvgCostPrice = records.reduce((sum, record) => sum + parseFloat(record.avgcost), 0);
    const totalCostValue = records.reduce((sum, record) => sum + parseFloat(record.cost), 0);
    const totalMarketValue = records.reduce((sum, record) => sum + parseFloat(record.mktvalue), 0);
    const totalUnReal = records.reduce((sum, record) => sum + parseFloat(record.unreal), 0);
    const totalMktReturn = records.reduce((sum, record) => sum + parseFloat(record.mreturn), 0);

    // Add total row to data array
    data.push([
        "Total",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        totalQty.toFixed(2),
        totalAvgCostPrice.toFixed(2),
        totalCostValue.toFixed(2),
        totalMarketValue.toFixed(2),
        totalUnReal.toFixed(2),
        totalMktReturn.toFixed(2),
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
    ]);

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "Portfolio_COM_.xls");
  };
  


  handleViewDpsoh = async () => {
    try {
      this.setState({ loading: true });
      const response = await fetch("http://183.182.84.228:4005/dpsoh/");
      const dpsohData = await response.json();
      const selectedDpsohData = dpsohData.filter(
        (item) => item.kslucc === this.state.selectedRecord.kslucc
      );
      if (selectedDpsohData.length > 0) {
        this.setState({ dpsohData: selectedDpsohData });
        this.setState({ activeButton: 'dpsoh' });
      } else {
        window.alert('Data not found for selected record.');
      }
    } catch (error) {
      window.alert(`An error occurred: ${error}`);
    }
    finally {
      this.setState({ loading: false }); // Set loading to false when data fetching completes
    }
  };
  

  handleViewLedger = async () => {
    try {
      this.setState({ loading: true });
      const response = await fetch("http://183.182.84.228:4005/ledger/");
      const ledgerData = await response.json();
      const selectedLedgerData = ledgerData.filter(
        (item) => item.ucc === this.state.selectedRecord.kslucc
      );
      if (selectedLedgerData.length > 0) {
        this.setState({ ledgerData: selectedLedgerData });
        this.setState({ activeButton: 'ledger' });
      } else {
        window.alert('Data not found for selected record.');
      }
    } catch (error) {
      window.alert(`An error occurred: ${error}`);
    }
    finally {
      this.setState({ loading: false }); // Set loading to false when data fetching completes
    }
  };

  handleViewMtfpo = async () => {
    try {
      this.setState({ loading: true });
      const response = await fetch("http://183.182.84.228:4005/mtfpo/");
      const mtfpoData = await response.json();
      const selectedMtfpoData = mtfpoData.filter(
        (item) => item.ucc === this.state.selectedRecord.kslucc
      );
      if (selectedMtfpoData.length > 0) {
        this.setState({ mtfpoData: selectedMtfpoData });
        this.setState({ activeButton: 'mtfpo' });
      } else {
        window.alert('Data not found for selected record.');
      }
    } catch (error) {
      window.alert(`An error occurred: ${error}`);
    }
    finally {
      this.setState({ loading: false }); // Set loading to false when data fetching completes
    }
  };

  handleViewNetpo = async () => {
    try {
      this.setState({ loading: true });
      const response = await fetch("http://183.182.84.228:4005/netpo/");
      const netpoData = await response.json();
      const selectedNetpoData = netpoData.filter(
        (item) => item.ucc === this.state.selectedRecord.kslucc
      );
      if (selectedNetpoData.length > 0) {
        this.setState({ netpoData: selectedNetpoData });
        this.setState({ activeButton: 'netpo' });
      } else {
        window.alert('Data not found for selected record.');
      }
    } catch (error) {
      window.alert(`An error occurred: ${error}`);
    }
    finally {
      this.setState({ loading: false }); // Set loading to false when data fetching completes
    }
  };

  handleViewPortfo = async () => {
    try {
      this.setState({ loading: true });
      const response = await fetch("http://183.182.84.228:4005/portfo/");
      const portfoData = await response.json();
      const selectedPortfoData = portfoData.filter(
        (item) => item.ucc === this.state.selectedRecord.kslucc
      );
      if (selectedPortfoData.length > 0) {
        this.setState({ portfoData: selectedPortfoData });
        this.setState({ activeButton: 'portfo' });
      } else {
        window.alert('Data not found for selected record.');
      }
    } catch (error) {
      window.alert(`An error occurred: ${error}`);
    }
    finally {
      this.setState({ loading: false }); // Set loading to false when data fetching completes
    }
  };


  handleViewPorteq = async () => {
    try {
      this.setState({ loading: true });
      const response = await fetch("http://183.182.84.228:4005/porteq/");
      const porteqData = await response.json();
      const selectedPorteqData = porteqData.filter(
        (item) => item.ucc === this.state.selectedRecord.kslucc 
      );
      if (selectedPorteqData.length > 0) {
        this.setState({ porteqData: selectedPorteqData });
        this.setState({ activeButton: 'porteq' });
      } else {
        window.alert('Data not found for selected record.');
      }
    } catch (error) {
      window.alert(`An error occurred: ${error}`);
    }
    finally {
      this.setState({ loading: false }); // Set loading to false when data fetching completes
    }
  };


  handleViewPortcom = async () => {
    try {
      this.setState({ loading: true });
      const response = await fetch("http://183.182.84.228:4005/portcom/");
      const portcomData = await response.json();
      const selectedPortcomData = portcomData.filter(
        (item) => item.ucc === this.state.selectedRecord.kslucc 
      );
      if (selectedPortcomData.length > 0) {
        this.setState({ portcomData: selectedPortcomData });
        this.setState({ activeButton: 'portcom' });
      } else {
        window.alert('Data not found for selected record.');
      }
    } catch (error) {
      window.alert(`An error occurred: ${error}`);
    }
    finally {
      this.setState({ loading: false }); // Set loading to false when data fetching completes
    }
  };


  // handleViewPorteq = async () => {
  //   try {
  //     this.setState({ loading: true });
  //     const response = await fetch("http://183.182.84.228:4005/portfo/");
  //     const portfoData = await response.json();
  //     const selectedPortfoData = portfoData.filter(
  //       (item) => item.ucc === this.state.selectedRecord.kslucc && !['CE', 'XX', 'PE'].includes(item.option_typ)
  //     );
  //     if (selectedPortfoData.length > 0) {
  //       this.setState({ portfoData: selectedPortfoData });
  //       this.setState({ activeButton: 'portfo' });
  //     } else {
  //       window.alert('Data not found for selected record.');
  //     }
  //   } catch (error) {
  //     window.alert(`An error occurred: ${error}`);
  //   }
  //   finally {
  //     this.setState({ loading: false }); // Set loading to false when data fetching completes
  //   }
  // };


  handleViewNominee = async () => {
    try {
      this.setState({ loading: true });
      const response = await fetch("http://183.182.84.228:4005/nominee/");
      const nomineeData = await response.json();
      const selectedNomineeData = nomineeData.filter(
        (item) => item.kslucc === this.state.selectedRecord.kslucc
      );
      if (selectedNomineeData.length > 0) {
        this.setState({ nomineeData: selectedNomineeData });
        this.setState({ activeButton: 'nominee' });
      } else {
        window.alert('Data not found for selected record.');
      }
    } catch (error) {
      window.alert(`An error occurred: ${error}`);
    }
    finally {
      this.setState({ loading: false }); // Set loading to false when data fetching completes
    }
  };

  handleExitView = () => {
    this.setState({ isViewingRecord: false });
  };

  // handleSearchChange = (event) => {
  //   this.setState({ searchValue: event.target.value }, this.getLetterData);
  // };
  handlePrint = () => {
    window.print();
  };




  dormant = async () => {
    const response = await fetch("http://183.182.84.228:4005/letter/");
    const letterData = await response.json();
    const currentUser = AuthService.getCurrentUser();
const sheetName = 'Dormant Accounts'; // Use your sheet name here
  const Value = 'Dormant Accounts'; // Use your value here
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  const wb = XLSX.utils.book_new();

  const filtered = letterData.filter((record) => currentUser.username === record.es_locnid  && record.ks_krarem.includes('Dormant'));

  const data = [
    [Value],
    ["S.No.","_Priority",	"Closer Transfer Done",	"Dormant :e-mail Sent",	"Dormant : Upcoming Days",	"ESL UCC",	"KSL UCC",	"Client Name",	"LocationId",	"Category",	"KS CLNT STATUS",	"Pan No",	"Ks e-mailId",	"Ks Mobile No.",	"KS DPID",	"KS DPBOID",	"Ks Bank A/c No.",	"Ks MICR No.",	"Ks IFSC Code",	"Ks Bank Name",	"Ks Default Bank",	"Ks Bank A/c Type",	"Ks Bank Branch",	"Kotak KRA/PTT e-mail Sent Remarks",	"AL Authorised Person Name",	"AL Authorised Person Relation",	"ks DP SOH",	"ks DP SOH Value",	"ES DP HOLDING VALUE",	"ES TURNOVER",	"ES NET BROKERAGE",	"Virtual_Bank A/c No",	"Virtual Bank Name",	"Virtual Bank IFSC",	"ES LAST TRADING DATE",	"KS CLNT Introduction Date",	"KS Last Trading Date",	"KS KRA Status",	"Kotak PTT Status",	"KS KRA/PTT Remarks",	"Kotak KRA/PTT e-mail Sent",	"Kotak PTT e-mail Recd",	"Kotak KRA/PTT RM",	"Kotak KRA/PTT e-mail Sent Remarks",	"KS NSE CM",	"KS BSE CM",	"KS NSE FO",	"Ks Trading PlatForm",	"Es e-mailId",	"Es_Mobile No",	"DoB or DoI",	"UID",	"KS NSE CDS",	"KS MCX",	"KS NCDEX",	"KS Clnt Type",	"KS CLNT USER ID",	"KS Q/S FO (RAL)",	"KS Q/S CM (RAL)",	"Franchise Code",	"Franchise Name",	"State",	"Dealing Zone",	"Es Ckyc_No",	"Es Nominee",	"Es Nominee Pan No",	"Es Nominee Share%",	"Es Relation With Person",	"Ks Nominee",	"Ks Nominee Pan No",	"Ks Nominee Share%",	"Ks Relation With Person",	"ES Location Code",	"ES LocationID",	"NEO ID",	"ODIN ID",	"BOSS ID",	"ES NSE CM",	"ES NSE FO",	"ES NSE CDS",	"ES BSE CM",	"ES MCX",	"ES NCDEX",	"ES Clnt Status",	"Correspondence Address 1",	"Correspondence Address 2",	"Correspondence Address 3",	"Correspondence Address 4",	"Correspondence City",	"Correspondence State",	"Correspondence Pin",	"Correspondence Country",	"Permanent Address 1",	"Permanent Address 2",	"Permanent Address 3",	"Permanent Address 4",	"Permanent City",	"Permanent State",	"Permanent Pin",	"Permanent Country",	"BARCODE",	"_BRANCH",	"Branch Name",	"Family Group",	"KS DP Rate Code",	"ES DP Rate Code",	"ES Ledger Balance",	"ES Margin",	"F&O Open Position",	"ES DP Ledger Balance",	"RunDate"
  ],
    ...filtered.map((record,index) => [index+1,record.priority,	record.closer_trf,	record.ems_ddt,	record.nod_dormnt,	record.ucc,	record.kslucc,	record.clname,	record.locationid,	record.es_catg,	record.ks_clsts,	record.ks_panno,	record.ks_emailid,	record.ks_mobile,	record.ks_dpid,	record.ksdp_boid,	record.bnkacno,	record.micrno,	record.ifsc_cd,	record.bnknm,	record.defbnk,	record.acctype,	record.bnkbr,	record.ks_krptrem,	record.auth_pnm,	record.auth_preln,	record.ks_dpsoh,	record.ks_sohval,	record.dphldgval,	record.estovr,	record.esnetbkg,	record.vir_bkacno,	record.vir_bknm,	record.vir_ifsc,	record.eslsttrd,	record.ks_introdt,	record.ks_lstrdt,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptre2,	record.ks_nsecm,	record.ks_bsecm,	record.ks_nsefo,	record.k_platform,	record.es_email,	record.es_mobile,	record.es_dobdoi,	record.es_uid,	record.ks_nsecds,	record.ks_mcx,	record.ks_ncdex,	record.ks_cltype,	record.ks_clusrid,	record.kral_fno,	record.kral_ncm,	record.ks_frccode,	record.ks_frchis,	record.mis_state,	record.deal_zone,	record.es_ckyc,	record.es_nomn,	record.es_nompan,	record.es_nomshr,	record.es_relwapc,	record.ks_nomn,	record.ks_nompan,	record.ks_nomshr,	record.ks_relwapc,	record.es_locncd,	record.es_locnid,	record.neoid,	record.odinid,	record.bossid,	record.ensecm,	record.ensefo,	record.ensecds,	record.ebsecm,	record.emcx,	record.encdex,	record.ecl_sts,	record.coradd1,	record.coradd2,	record.coradd3,	record.coradd4,	record.corcity,	record.corstate,	record.corpin,	record.corcntry,	record.per_add1,	record.per_add2,	record.per_add3,	record.per_add4,	record.per_city,	record.per_state,	record.per_pin,	record.per_cntry,	record.barcode,	record.brcd,	record.brname,	record.family_grp,	record.ks_dprtcd,	record.es_dprtcd,	record.es_ledbal,	record.es_margin,	record.opnpos_nfo,	record.es_dpledg,	record.run_date 
    ]),
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  XLSX.writeFile(wb, `Dormant Accounts_${formattedDate}.xls`);
};



upcomingdormant = async () => {
  const response = await fetch("http://183.182.84.228:4005/letter/");
  const letterData = await response.json();
  const currentUser = AuthService.getCurrentUser();
const sheetName = 'Upcoming Dormant Accounts'; // Use your sheet name here
const Value = 'Upcoming Dormant Accounts'; // Use your value here
const currentDate = new Date();
const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
const wb = XLSX.utils.book_new();

const filtered = letterData.filter((record) => currentUser.username === record.es_locnid   && record.nod_dormnt >= 0 && record.nod_dormnt <= 31
);

const data = [
  [Value],
  ["S.No.","_Priority",	"Closer Transfer Done",	"Dormant :e-mail Sent",	"Dormant : Upcoming Days",	"ESL UCC",	"KSL UCC",	"Client Name",	"LocationId",	"Category",	"KS CLNT STATUS",	"Pan No",	"Ks e-mailId",	"Ks Mobile No.",	"KS DPID",	"KS DPBOID",	"Ks Bank A/c No.",	"Ks MICR No.",	"Ks IFSC Code",	"Ks Bank Name",	"Ks Default Bank",	"Ks Bank A/c Type",	"Ks Bank Branch",	"Kotak KRA/PTT e-mail Sent Remarks",	"AL Authorised Person Name",	"AL Authorised Person Relation",	"ks DP SOH",	"ks DP SOH Value",	"ES DP HOLDING VALUE",	"ES TURNOVER",	"ES NET BROKERAGE",	"Virtual_Bank A/c No",	"Virtual Bank Name",	"Virtual Bank IFSC",	"ES LAST TRADING DATE",	"KS CLNT Introduction Date",	"KS Last Trading Date",	"KS KRA Status",	"Kotak PTT Status",	"KS KRA/PTT Remarks",	"Kotak KRA/PTT e-mail Sent",	"Kotak PTT e-mail Recd",	"Kotak KRA/PTT RM",	"Kotak KRA/PTT e-mail Sent Remarks",	"KS NSE CM",	"KS BSE CM",	"KS NSE FO",	"Ks Trading PlatForm",	"Es e-mailId",	"Es_Mobile No",	"DoB or DoI",	"UID",	"KS NSE CDS",	"KS MCX",	"KS NCDEX",	"KS Clnt Type",	"KS CLNT USER ID",	"KS Q/S FO (RAL)",	"KS Q/S CM (RAL)",	"Franchise Code",	"Franchise Name",	"State",	"Dealing Zone",	"Es Ckyc_No",	"Es Nominee",	"Es Nominee Pan No",	"Es Nominee Share%",	"Es Relation With Person",	"Ks Nominee",	"Ks Nominee Pan No",	"Ks Nominee Share%",	"Ks Relation With Person",	"ES Location Code",	"ES LocationID",	"NEO ID",	"ODIN ID",	"BOSS ID",	"ES NSE CM",	"ES NSE FO",	"ES NSE CDS",	"ES BSE CM",	"ES MCX",	"ES NCDEX",	"ES Clnt Status",	"Correspondence Address 1",	"Correspondence Address 2",	"Correspondence Address 3",	"Correspondence Address 4",	"Correspondence City",	"Correspondence State",	"Correspondence Pin",	"Correspondence Country",	"Permanent Address 1",	"Permanent Address 2",	"Permanent Address 3",	"Permanent Address 4",	"Permanent City",	"Permanent State",	"Permanent Pin",	"Permanent Country",	"BARCODE",	"_BRANCH",	"Branch Name",	"Family Group",	"KS DP Rate Code",	"ES DP Rate Code",	"ES Ledger Balance",	"ES Margin",	"F&O Open Position",	"ES DP Ledger Balance",	"RunDate"
],
  ...filtered.map((record,index) => [index+1,record.priority,	record.closer_trf,	record.ems_ddt,	record.nod_dormnt,	record.ucc,	record.kslucc,	record.clname,	record.locationid,	record.es_catg,	record.ks_clsts,	record.ks_panno,	record.ks_emailid,	record.ks_mobile,	record.ks_dpid,	record.ksdp_boid,	record.bnkacno,	record.micrno,	record.ifsc_cd,	record.bnknm,	record.defbnk,	record.acctype,	record.bnkbr,	record.ks_krptrem,	record.auth_pnm,	record.auth_preln,	record.ks_dpsoh,	record.ks_sohval,	record.dphldgval,	record.estovr,	record.esnetbkg,	record.vir_bkacno,	record.vir_bknm,	record.vir_ifsc,	record.eslsttrd,	record.ks_introdt,	record.ks_lstrdt,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptre2,	record.ks_nsecm,	record.ks_bsecm,	record.ks_nsefo,	record.k_platform,	record.es_email,	record.es_mobile,	record.es_dobdoi,	record.es_uid,	record.ks_nsecds,	record.ks_mcx,	record.ks_ncdex,	record.ks_cltype,	record.ks_clusrid,	record.kral_fno,	record.kral_ncm,	record.ks_frccode,	record.ks_frchis,	record.mis_state,	record.deal_zone,	record.es_ckyc,	record.es_nomn,	record.es_nompan,	record.es_nomshr,	record.es_relwapc,	record.ks_nomn,	record.ks_nompan,	record.ks_nomshr,	record.ks_relwapc,	record.es_locncd,	record.es_locnid,	record.neoid,	record.odinid,	record.bossid,	record.ensecm,	record.ensefo,	record.ensecds,	record.ebsecm,	record.emcx,	record.encdex,	record.ecl_sts,	record.coradd1,	record.coradd2,	record.coradd3,	record.coradd4,	record.corcity,	record.corstate,	record.corpin,	record.corcntry,	record.per_add1,	record.per_add2,	record.per_add3,	record.per_add4,	record.per_city,	record.per_state,	record.per_pin,	record.per_cntry,	record.barcode,	record.brcd,	record.brname,	record.family_grp,	record.ks_dprtcd,	record.es_dprtcd,	record.es_ledbal,	record.es_margin,	record.opnpos_nfo,	record.es_dpledg,	record.run_date 
  ]),
];

const ws = XLSX.utils.aoa_to_sheet(data);
XLSX.utils.book_append_sheet(wb, ws, sheetName);

XLSX.writeFile(wb, `Upcoming Dormant Accounts_${formattedDate}.xls`);
};


dormantsend = async () => {
  const response = await fetch("http://183.182.84.228:4005/letter/");
  const letterData = await response.json();
  const currentUser = AuthService.getCurrentUser();
const sheetName = 'Send Mails Dormant Accounts'; // Use your sheet name here
const Value = 'Send Mails Dormant Accounts'; // Use your value here
const currentDate = new Date();
const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
const wb = XLSX.utils.book_new();

const filtered = letterData.filter((record) => currentUser.username === record.es_locnid   && record.ems_ddt);

const data = [
  [Value],
  ["S.No.","_Priority",	"Closer Transfer Done",	"Dormant :e-mail Sent",	"Dormant : Upcoming Days",	"ESL UCC",	"KSL UCC",	"Client Name",	"LocationId",	"Category",	"KS CLNT STATUS",	"Pan No",	"Ks e-mailId",	"Ks Mobile No.",	"KS DPID",	"KS DPBOID",	"Ks Bank A/c No.",	"Ks MICR No.",	"Ks IFSC Code",	"Ks Bank Name",	"Ks Default Bank",	"Ks Bank A/c Type",	"Ks Bank Branch",	"Kotak KRA/PTT e-mail Sent Remarks",	"AL Authorised Person Name",	"AL Authorised Person Relation",	"ks DP SOH",	"ks DP SOH Value",	"ES DP HOLDING VALUE",	"ES TURNOVER",	"ES NET BROKERAGE",	"Virtual_Bank A/c No",	"Virtual Bank Name",	"Virtual Bank IFSC",	"ES LAST TRADING DATE",	"KS CLNT Introduction Date",	"KS Last Trading Date",	"KS KRA Status",	"Kotak PTT Status",	"KS KRA/PTT Remarks",	"Kotak KRA/PTT e-mail Sent",	"Kotak PTT e-mail Recd",	"Kotak KRA/PTT RM",	"Kotak KRA/PTT e-mail Sent Remarks",	"KS NSE CM",	"KS BSE CM",	"KS NSE FO",	"Ks Trading PlatForm",	"Es e-mailId",	"Es_Mobile No",	"DoB or DoI",	"UID",	"KS NSE CDS",	"KS MCX",	"KS NCDEX",	"KS Clnt Type",	"KS CLNT USER ID",	"KS Q/S FO (RAL)",	"KS Q/S CM (RAL)",	"Franchise Code",	"Franchise Name",	"State",	"Dealing Zone",	"Es Ckyc_No",	"Es Nominee",	"Es Nominee Pan No",	"Es Nominee Share%",	"Es Relation With Person",	"Ks Nominee",	"Ks Nominee Pan No",	"Ks Nominee Share%",	"Ks Relation With Person",	"ES Location Code",	"ES LocationID",	"NEO ID",	"ODIN ID",	"BOSS ID",	"ES NSE CM",	"ES NSE FO",	"ES NSE CDS",	"ES BSE CM",	"ES MCX",	"ES NCDEX",	"ES Clnt Status",	"Correspondence Address 1",	"Correspondence Address 2",	"Correspondence Address 3",	"Correspondence Address 4",	"Correspondence City",	"Correspondence State",	"Correspondence Pin",	"Correspondence Country",	"Permanent Address 1",	"Permanent Address 2",	"Permanent Address 3",	"Permanent Address 4",	"Permanent City",	"Permanent State",	"Permanent Pin",	"Permanent Country",	"BARCODE",	"_BRANCH",	"Branch Name",	"Family Group",	"KS DP Rate Code",	"ES DP Rate Code",	"ES Ledger Balance",	"ES Margin",	"F&O Open Position",	"ES DP Ledger Balance",	"RunDate"
],
  ...filtered.map((record,index) => [index+1,record.priority,	record.closer_trf,	record.ems_ddt,	record.nod_dormnt,	record.ucc,	record.kslucc,	record.clname,	record.locationid,	record.es_catg,	record.ks_clsts,	record.ks_panno,	record.ks_emailid,	record.ks_mobile,	record.ks_dpid,	record.ksdp_boid,	record.bnkacno,	record.micrno,	record.ifsc_cd,	record.bnknm,	record.defbnk,	record.acctype,	record.bnkbr,	record.ks_krptrem,	record.auth_pnm,	record.auth_preln,	record.ks_dpsoh,	record.ks_sohval,	record.dphldgval,	record.estovr,	record.esnetbkg,	record.vir_bkacno,	record.vir_bknm,	record.vir_ifsc,	record.eslsttrd,	record.ks_introdt,	record.ks_lstrdt,	record.ks_krasts,	record.ks_pttsts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_rm,	record.ks_krptre2,	record.ks_nsecm,	record.ks_bsecm,	record.ks_nsefo,	record.k_platform,	record.es_email,	record.es_mobile,	record.es_dobdoi,	record.es_uid,	record.ks_nsecds,	record.ks_mcx,	record.ks_ncdex,	record.ks_cltype,	record.ks_clusrid,	record.kral_fno,	record.kral_ncm,	record.ks_frccode,	record.ks_frchis,	record.mis_state,	record.deal_zone,	record.es_ckyc,	record.es_nomn,	record.es_nompan,	record.es_nomshr,	record.es_relwapc,	record.ks_nomn,	record.ks_nompan,	record.ks_nomshr,	record.ks_relwapc,	record.es_locncd,	record.es_locnid,	record.neoid,	record.odinid,	record.bossid,	record.ensecm,	record.ensefo,	record.ensecds,	record.ebsecm,	record.emcx,	record.encdex,	record.ecl_sts,	record.coradd1,	record.coradd2,	record.coradd3,	record.coradd4,	record.corcity,	record.corstate,	record.corpin,	record.corcntry,	record.per_add1,	record.per_add2,	record.per_add3,	record.per_add4,	record.per_city,	record.per_state,	record.per_pin,	record.per_cntry,	record.barcode,	record.brcd,	record.brname,	record.family_grp,	record.ks_dprtcd,	record.es_dprtcd,	record.es_ledbal,	record.es_margin,	record.opnpos_nfo,	record.es_dpledg,	record.run_date 
  ]),
];

const ws = XLSX.utils.aoa_to_sheet(data);
XLSX.utils.book_append_sheet(wb, ws, sheetName);

XLSX.writeFile(wb, `Send Mails Dormant Accounts_${formattedDate}.xls`);
};





  krastatus = async () => {
    const response = await fetch("http://183.182.84.228:4005/letter/");
    const letterData = await response.json();
      const currentUser = AuthService.getCurrentUser();
      const sheetName = 'KRA Status';
      const Value = 'KRA Status';
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
      const wb = XLSX.utils.book_new();
    
      const filtered = letterData.filter(record => currentUser.username === record.es_locnid);
    
      const data = [
        [Value],
        ["S.No.", "Priority", "BarCode", "Branch", "LocationID", "Dormant :e-mail Sent", "Dormant :Upcoming Days", "ES UCC", "KS UCC", "Client Name", "Pan No", "KS KRA Status", "KS PTT Status", "KS KRA/PTT Remarks", "KS KRA/PTT e-mail Sent", "KS PTT e-mail Recd", "KS KRA/PTT RM", "KS KRA/PTT e-mail Sent Remarks", "KS e-Mail ID", "Ks Mobile No.", "Ks Email Sent to Client", "Ks e-Sign Status", "Ks e-Sign Remarks", "Back Office Current Status", "3i Status 1", "3i Status 2", "Other Status", "Multiple Email/Mobile", "Koslandra Status", "Kotak Remark(s)", "KRA Status", "KRA Status Date", "KRA Updated Status", "KRA Updated Status Date", "Report Date", "Account Closed"],
        ...filtered.map((record, index) => {
          // Parse the dates from dd-MM-yyyy format to JavaScript Date objects
          const parsedStatusDate = record.statusdate ? new Date(record.statusdate.split('-').reverse().join('-')) : '';
          const parsedUpdStatusDate = record.updstatusdate ? new Date(record.updstatusdate.split('-').reverse().join('-')) : '';
    
          return [
            index + 1, record.priority, record.barcode, record.brcd, record.es_locnid, record.ems_ddt, record.nod_dormnt, record.ucc, record.kslucc, record.clname, record.panno, record.ks_krasts, record.ks_pttsts, record.ks_krarem, record.ks_emsent, record.ks_emrecd, record.ks_rm, record.ks_krptrem, record.ks_emailid, record.ks_mobile, record.ks_emtocl, record.ks_esign, record.ks_essts, record.bo_clsts, record.sts1_3i, record.sts2_3i, record.ks_othsts, record.mult_emmo, record.ks_sts1, record.ks_allrem, record.status, parsedStatusDate, record.updstatus, parsedUpdStatusDate, record.run_date, record.ac_closed
          ];
        })
      ];
    
      const ws = XLSX.utils.aoa_to_sheet(data);
    
      // Define date format for specific columns
      const dateColumns = [31, 33]; // Assuming statusdate is column 31 and updstatusdate is column 33
      dateColumns.forEach(col => {
        for (let row = 2; row <= letterData.length + 1; row++) { // Start from row 2 to skip headers
          const cellRef = XLSX.utils.encode_cell({ c: col, r: row });
          if (ws[cellRef]) {
            ws[cellRef].z = 'dd-MM-yyyy';
          }
        }
      });
    
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
      XLSX.writeFile(wb, `KRA Status_${formattedDate}.xls`);
    };
    



    porteqdiff = async () => {
      try {
        // Show the modal indicating that the download process has started
        document.getElementById('downloadModal').style.display = 'block';
    
        const response = await fetch("http://183.182.84.228:4005/dpsohdiff");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const PortEQData = await response.json();
        const currentUser = AuthService.getCurrentUser();
    
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
        const wb = XLSX.utils.book_new();
    
        // First, filter by 'comparison_result === "Difference"'
        const filteredData = PortEQData.filter(record => record.comparison_result === 'Difference');
    
        // Then split the filtered data into two categories based on instrument
        const dataWithGB = filteredData.filter(record => record.instrument === 'GB');
        const dataWithoutGB = filteredData.filter(record => record.instrument !== 'GB');
    
        // Define the structure of the Excel sheet
        const header = [
          "S.No.", "ESL UCC", "KSL UCC", "Client Name", "Instrument", "Qty", "AvgCostPrice",
          "Bse Curr Price", "CostValue", "Market Value", "UnReal", "MktReturn", "Date", "Sq Gain",
          "Del Gain", "LocationId", "LocationCD", "ISIN", "Exchange", "Scrip Name", "Common ScripCode",
          "Is Suspend", "_Branch", "Family Group", "total Qty in DPSOH", "Beneficiary Qty", "Pledge Qty",
          "Comparison Result", "summed porteq Qty", "Count","Mismatch Detail"
        ];
    
        // Function to format the data for each sheet
        const formatDataForSheet = (data) => [
          ["PortEQ Difference"],
          header,
          ...data.filter(record => record.locnid === currentUser.username).map((record, index) => [
            index + 1, record.es_ucc, record.ucc, record.clname, record.instrument,
            record.qty, record.avgcost, record.bse_clrate, record.cost, record.mktvalue, record.unreal,
            record.mreturn, record.date, record.sqgain, record.delgain, record.location, record.locnid,
            record.isin, record.exchange, record.sc_shrtnm, record.comn_sccd, record.is_suspend,
            record.brcd, record.familygrp, record.total_qty, record.beneficiary_qty, record.pledge_qty,
            record.comparison_result, record.summed_p_qty, record.occurrence_count,record.mismatch_detail
    
          ])
        ];
    
        // Create the first sheet with data excluding GB instruments and filtered by 'Difference'
        const wsWithoutGB = XLSX.utils.aoa_to_sheet(formatDataForSheet(dataWithoutGB));
        XLSX.utils.book_append_sheet(wb, wsWithoutGB, 'PortEQ Without GB');
    
        // Create the second sheet with only GB instruments and filtered by 'Difference'
        const wsWithGB = XLSX.utils.aoa_to_sheet(formatDataForSheet(dataWithGB));
        XLSX.utils.book_append_sheet(wb, wsWithGB, 'PortEQ With GB');
    
        // Save the Excel file
        XLSX.writeFile(wb, `PortEQ Difference_${formattedDate}.xlsx`);
    
        // Hide the modal when the download is complete
        document.getElementById('downloadModal').style.display = 'none';
    
        // Optionally show an alert when the download is complete
        // alert('Download complete!');
        
      } catch (error) {
        console.error("Error fetching or processing data:", error);
        // Hide the modal if an error occurs
        document.getElementById('downloadModal').style.display = 'none';
        // Show an error alert if something goes wrong
        alert('Error occurred while downloading.');
      }
    };
    
    
    
    
    
    porteqmatch = async () => {
        try {
          // Show an alert indicating that the download process has started
          document.getElementById('downloadModal').style.display = 'block';
    
          const response = await fetch("http://183.182.84.228:4005/dpsohdiff");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const PortEQData = await response.json();
          const currentUser = AuthService.getCurrentUser();
      
          const currentDate = new Date();
          const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
          const wb = XLSX.utils.book_new();
      
          // First, filter by 'comparison_result === "Difference"'
          const filteredData = PortEQData.filter(record => record.comparison_result !== 'Difference');
      
          // Then split the filtered data into two categories based on instrument
          const dataWithGB = filteredData.filter(record => record.instrument === 'GB');
          const dataWithoutGB = filteredData.filter(record => record.instrument !== 'GB');
      
          // Define the structure of the Excel sheet
          const header = [
            "S.No.", "ESL UCC", "KSL UCC", "Client Name", "Instrument", "Qty", "AvgCostPrice",
            "Bse Curr Price", "CostValue", "Market Value", "UnReal", "MktReturn", "Date", "Sq Gain",
            "Del Gain", "LocationId", "LocationCD", "ISIN", "Exchange", "Scrip Name", "Common ScripCode",
            "Is Suspend", "_Branch", "Family Group", "total Qty in DPSOH", "Beneficiary Qty", "Pledge Qty",
            "Comparison Result", "summed porteq Qty", "Count","Mismatch Detail"
          ];
      
          // Function to format the data for each sheet
          const formatDataForSheet = (data) => [
            ["PortEQ Match"],
            header,
            ...data.filter(record => record.locnid === currentUser.username).map((record, index) => [
              index + 1, record.es_ucc, record.ucc, record.clname, record.instrument,
              record.qty, record.avgcost, record.bse_clrate, record.cost, record.mktvalue, record.unreal,
              record.mreturn, record.date, record.sqgain, record.delgain, record.location, record.locnid,
              record.isin, record.exchange, record.sc_shrtnm, record.comn_sccd, record.is_suspend,
              record.brcd, record.familygrp, record.total_qty, record.beneficiary_qty, record.pledge_qty,
              record.comparison_result, record.summed_p_qty, record.occurrence_count,record.mismatch_detail
            ])
          ];
      
          // Create the first sheet with data excluding GB instruments and filtered by 'Difference'
          const wsWithoutGB = XLSX.utils.aoa_to_sheet(formatDataForSheet(dataWithoutGB));
          XLSX.utils.book_append_sheet(wb, wsWithoutGB, 'PortEQ Without GB');
      
          // Create the second sheet with only GB instruments and filtered by 'Difference'
          const wsWithGB = XLSX.utils.aoa_to_sheet(formatDataForSheet(dataWithGB));
          XLSX.utils.book_append_sheet(wb, wsWithGB, 'PortEQ With GB');
      
          // Save the Excel file
          XLSX.writeFile(wb, `PortEQ Match_${formattedDate}.xlsx`);
          document.getElementById('downloadModal').style.display = 'none';
          // Show an alert when the download is complete
          // alert('Download complete!');
          
        } catch (error) {
          console.error("Error fetching or processing data:", error);
          document.getElementById('downloadModal').style.display = 'none';
          // Show an error alert if something goes wrong
          alert('Error occurred while downloading.');
        }
      };
  
  



  render() {
    const {
      letterData,
      selectedRecord,
      dpsohData,
      ledgerData,
      portfoData,
      porteqData,
      portcomData,
      mtfpoData,
      netpoData,
      nomineeData,
      isViewingRecord,
      hoveredDptype,
      mousePosition,
      activeButton,
      dataFound,
      loading ,// Added loading state
      closerTransferFilter,
      priorityFilter,
      searchQuery,  
      filteredData
    } = this.state;

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>

        
       
        {isViewingRecord ? (
          <div>
            
            <button onClick={this.getLetterData}>GENERAL</button>

            <button onClick={this.handleViewDpsoh}>DPSOH</button>
            
            
            <button onClick={this.handleViewLedger}>Balance</button>
            
            
            <button onClick={this.handleViewMtfpo}>Mtfpo</button>
           
            
            <button onClick={this.handleViewNetpo}>Open Position</button>
            
            
            <button onClick={this.handleViewPorteq}>Portfolio Equity</button>

            <button onClick={this.handleViewPortfo}>Portfolio F&O</button>

            <button onClick={this.handleViewPortcom}>Portfolio Comodity</button>
         
          
            {/* <button onClick={this.handleViewNominee}>Nominee</button> */}
            
            <button onClick={this.handleExitView} >Exit</button>

            <button onClick={this.handlePrint}>print</button>

            {activeButton === 'letter' && selectedRecord !== null &&  (
          <div>

            {selectedRecord && nomineeData && (
          <div>

            <div style={{position:'sticky' , top:"0px"}}>

            {loading && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        
        <h6>Exclusive KOTAK CLINT INFO</h6>

        <button onClick={() => this.generalExcel(selectedRecord)}>
          Download General_Info Excel
        </button>
        <table class="6">
  <thead>
    <tr>
    
  <th>Closer Transfer</th>
 
  
    <th>UCC </th>
<th>Kotak UCC</th>
<th>Client Name</th>
<th>LocationId</th>
<th>Pan</th>  
<th>Kotak DP Rate Code</th>
<th>ESL DP Rate Code</th>
<th>Mobile</th>
<th>Email</th>  
<th>DoB_or_DoI</th> 



    </tr>
  </thead>
  <tbody>
    <tr>
    <td>{(selectedRecord.closer_trf)}</td>
    <td>{selectedRecord.ucc }</td>
<td>{selectedRecord.kslucc}</td>
<td>{selectedRecord.clname }</td>
<td>{selectedRecord.locationid}</td>
<td>{selectedRecord.ks_panno}</td> 
<td>{selectedRecord.ks_dprtcd}</td>
<td>{selectedRecord.es_dprtcd}</td>  
<td>{selectedRecord.ks_mobile}</td>   
<td>{selectedRecord.ks_emailid}</td>   
<td>{selectedRecord.es_dobdoi}</td>  
    </tr>
  </tbody>
</table>
<table  class="1">
       <thead>
         <tr>
           <th>  </th>
           <th>KRA Status</th>
           <th>KRA Status Date</th>
           <th>KRA Updated Status</th>     
           <th>KRA Updated Status Date</th>
         </tr>
       </thead>
       <tbody>
    
         <tr>
           <th>INFO.</th>
           <td>{(selectedRecord.status || 'NA')}</td>
           <td>{(selectedRecord.statusdate|| 'NA')}</td>
           <td>{(selectedRecord.updstatus|| 'NA')}</td>
           <td>{selectedRecord.updstatusdate|| 'NA'}</td>
         </tr>
      
       </tbody>
     </table>
{/* <table class="6" >
    <thead>
      <tr>
<th>es_nomn</th>
<th>es_nompan</th>
<th>es_nomshr</th>
<th>es_relwapc</th>
<th>ks_nomn</th>
<th>ks_nompan</th>
<th>ks_nomshr</th>
<th>ks_relwapc</th>    
      </tr>
    </thead>
    <tbody>
           
            
           
      <tr >
<td>{ selectedRecord.es_nomn }</td>
<td>{ selectedRecord.es_nompan }</td>
<td>{ selectedRecord.es_nomshr }</td>
<td>{ selectedRecord.es_relwapc }</td>
<td>{ selectedRecord.ks_nomn }</td>
<td>{ selectedRecord.ks_nompan }</td>
<td>{ selectedRecord.ks_nomshr }</td>
<td>{ selectedRecord.ks_relwapc }</td>
      </tr>
  
    </tbody>
  </table> */}

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
  {/* <tr>
  <th>Closer Transfer</th>
  <td>{(selectedRecord.closer_trf)}</td>
  </tr> */}
  <tr>
  <th>Branch</th>
  <td>{(selectedRecord.brcd)}</td>
  </tr>
  <tr>
  <th>Branch Name</th>
  <td>{(selectedRecord.brname)}</td>
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

  <table  class="1"  style={{marginTop:"10px"}} >
  
  <tr >
    <th colSpan={2} style={{textAlign:"center"}}>Bank Information</th>
  
    </tr>
    <tr>
<th>Ks Bank A/c No.</th>
 <td>{selectedRecord.bnkacno}</td>
</tr><tr>
<th>Ks MICR No.</th>
 <td>{selectedRecord.micrno}</td>
</tr><tr>
<th>Ks IFSC Code</th>
 <td>{selectedRecord.ifsc_cd}</td>
</tr><tr>
<th>Ks Bank Name</th>
 <td>{selectedRecord.bnknm}</td>
</tr><tr>
<th>Ks Default Bank</th>
 <td>{selectedRecord.defbnk}</td>
</tr><tr>
<th>Ks Bank A/c Type</th>
 <td>{selectedRecord.acctype}</td>
</tr>

    </table>


    <table  class="1"  style={{marginTop:"10px"}} >
  
  <tr >
    <th colSpan={2} style={{textAlign:"center"}}>Virtual Bank Information</th>
  
    </tr>
    <tr>
<th>Virtual_Bank A/c No.</th>
 <td>{selectedRecord.vir_bkacno}</td>
</tr><tr>
<th>Virtual Bank Name</th>
 <td>{selectedRecord.vir_bknm}</td>
</tr><tr>
<th>Virtual Bank IFSC</th>
 <td>{selectedRecord.vir_ifsc}</td>
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

  
<table style={{marginTop:"10px"}}>
<tr >
  <th colSpan={6} style={{textAlign:"center"}}>Status</th>

  </tr>
  <tr>
          <th>KRA Status</th>
          <td>{selectedRecord.ks_krasts}</td>   
          </tr><tr>
           <th>PTT Status</th>
           <td>{selectedRecord.ks_pttsts}</td>
           </tr><tr>
          <th>KRA/PTT Reason</th>
          <td>{selectedRecord.ks_krarem}</td>
  </tr>
  <tr>
<th>Kotak KRA/PTT e-mail Sent</th>
 <td>{selectedRecord.ks_emsent}</td>
</tr><tr>
<th>Kotak PTT e-mail Recd</th>
 <td>{selectedRecord.ks_emrecd}</td>
</tr><tr>
<th>Kotak KRA/PTT RM</th>
 <td>{selectedRecord.ks_rm}</td>
</tr><tr>
<th>Kotak KRA/PTT e-mail Sent Remarks</th>
 <td>{selectedRecord.ks_krptrem}</td>
</tr><tr>
<th>Kotak PF status</th>
 <td>{selectedRecord.ksl_status}</td>
</tr><tr>
<th>Kotak PF Send Date</th>
 <td>{selectedRecord.ksl_date}</td>
</tr>
<tr>
<th>Kotak Portfolio Complete DATE</th>
 <td>{selectedRecord.kslstatus}</td>
</tr><tr>
<th>Kotak PF Remark</th>
 <td>{selectedRecord.ksl_remk}</td>
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
 
  </tbody>
  </table>

<table>
  <tr>
<th>Reasons for Deactivate -AM</th>
<td>{ledgerData && ledgerData.resfdact1}</td>
</tr>
</table>
<table class="6" >
    <thead>
      <tr>
<th>es_nomn</th>
<th>es_nompan</th>
<th>es_nomshr</th>
<th>es_relwapc</th>
<th>ks_nomn</th>
<th>ks_nompan</th>
<th>ks_nomshr</th>
<th>ks_relwapc</th>    
      </tr>
    </thead>
    <tbody>
           
            
           
      <tr >
<td>{ selectedRecord.es_nomn }</td>
<td>{ selectedRecord.es_nompan }</td>
<td>{ selectedRecord.es_nomshr }</td>
<td>{ selectedRecord.es_relwapc }</td>
<td>{ selectedRecord.ks_nomn }</td>
<td>{ selectedRecord.ks_nompan }</td>
<td>{ selectedRecord.ks_nomshr }</td>
<td>{ selectedRecord.ks_relwapc }</td>
      </tr>
  
    </tbody>
  </table>


</div>


<br/>
          </div>
          </div>
        )}
        </div>
        )}

        {activeButton === 'dpsoh' && dpsohData !== null && (
          <div>
           
              {!dataFound && (
                <div className="alert alert-warning" role="alert">
                  Data not found!
                </div>
              )}
              <div>

              {loading && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
            <h3>DPSOH </h3>
            <button onClick={() => this.dpsohExcel(dpsohData)}>
          Download DPSOH Excel
        </button>
            <table className="table table-striped table-scroll">
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
                {dpsohData.map((record, index) => (
                  <tr key={index}>
                    <td>{record.bactype}</td>
                    <td
                      onMouseEnter={(e) => this.handleHover(e, record.scrname)}
                      onMouseMove={(e) => this.setState({ mousePosition: { x: e.clientX, y: e.clientY } })}
                      onMouseLeave={this.handleMouseLeave}>{record.nsesymbl}</td>
                    <td>{record.isin}</td>
                    <td>{record.ks_dpsoh}</td>
                    <td>{record.scrate}</td>
                    <td>{record.dp_sohval}</td>
                    <td>{record.bsecode}</td>
                    <td>{record.hldgdt}</td>
                    <td>{record.ks_dpid}</td>
                    <td>{record.cldpid}</td>
                    <td>{record.soh_brcd}</td>
                    <td>{record.cc_id}</td>
                    <td>{record.bkflag}</td>
                    <td>{record.bklkcd}</td>
                    <td>{record.lkinreldt}</td>
                    <td>{record.dpidpri}</td>
                    <td>{record.varvfodp}</td>
                    <td>{record.sccatg}</td>
                    <td>{record.catgdespn}</td>
                    <td>{record.comsccd}</td>
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
           
          </div>
          
        )}

        {activeButton === 'ledger' && ledgerData !== null && (
          <div>
            {!dataFound && (
                <div className="alert alert-warning" role="alert">
                  Data not found!
                </div>
              )}

{loading && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
            <h3>Balance</h3>
            <button onClick={() => this.balanceExcel(ledgerData)}>
          Download Balance Excel
        </button>
            {ledgerData.map((record) => (
              <div>
                <div style={{width:'50%', float:'left'}}>
<table>
  <tr>
    

    
<th>LedgerBalance(With Ini+Exp Margin+Mtf)-(F)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{record.ledgbal}</td>
</tr>
<tr>  
    <th>MTF Funding Value -(F4)</th>
    <td style={{backgroundColor:"white", textAlign:"right"}}>{record.mtfundval}</td>
    </tr>
<tr>
<th>Total Un Billed-(G)</th>
<td style={{backgroundColor:"white", textAlign:"right"}}>{record.tunbilled}</td>
</tr><tr>
<th>UnclearAmt-(H)</th>
<td style={{backgroundColor:"white", textAlign:"right"}}>{record.unclramt}</td>
</tr>
<tr style={{border:"2px solid black"}}>
<th>Total Balance -(I=F+G+H)</th>
<td style={{border:"2px solid black", textAlign:"right"}}>{record.totalbal}</td>
  </tr>



  <tr>  
  <th>InitalMargin-(J)</th>
<td style={{backgroundColor:"white", textAlign:"right"}}>{record.inimgn}</td>
</tr><tr>
  <th>Exposure -(K)</th>
  <td style={{backgroundColor:"white", textAlign:"right"}}>{record.exposure}</td>
  </tr><tr>
<th>AdditionalMargin-(L)</th>
<td style={{backgroundColor:"white", textAlign:"right"}}>{record.additnal}</td>
</tr>

<tr style={{border:"2px solid black"}}>
<th>Net Value-(M=I-J-K-L)</th>
<td style={{border:"2px solid black", textAlign:"right" , backgroundColor:"lightgray"}}>{record.netvalue}</td>
  </tr>







    <tr>
  <th>PledgeshareValue P1&P3 (NormalPledge)-(O)</th>
  <td style={{backgroundColor:"white", textAlign:"right"}}>{record.pldgqp1p3}</td>
  </tr><tr>
<th>PledgeshareValue P2(MTF)-(P)</th>
<td style={{backgroundColor:"white", textAlign:"right"}}>{record.pldgqp2}</td>
  </tr>



  <tr>

<th>Benificiary -(Q)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{record.security1}</td>
</tr>
<tr>
<th>MF,SGB,T-Bill Etc-(R)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{record.othmgn1}</td>
</tr>
<tr>
<th>Delivered Amt-(S)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{record.delvdamt}</td>
</tr>

  <tr style={{border:"2px solid black"}}>  
  <th>Total Margin-(V=O+P+Q+R+S)</th>
  <td style={{backgroundColor:"lightgray", textAlign:"right" ,border:"2px solid black"}}>{record.tmargin}</td>
</tr><tr style={{border:"2px solid black"}}>
<th>NetMargin-(W=V-M)</th>
<td style={{backgroundColor:"lightgray", textAlign:"right", border:"2px solid black"}}>{record.netmargin}</td>
</tr><tr style={{border:"2px solid black"}}>
<th >Net Margin based on Pledge-(X=O+P+R-F)</th>

<td style={{backgroundColor:"lightgray", textAlign:"right" , border:"2px solid black"}}>{record.nmgnboplg}</td>
  </tr>
  </table>

</div>




<div style={{width:'50%', float:'right'}}>
<table>
  <tr>
  <th>MCX Ledger balance -(F1)</th>
  <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.mcxledger}</td>
  </tr><tr>
<th>NCDEX Ledger balance -(F2)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{record.ncdledger}</td>
</tr><tr>
<th>NSECDS Ledger balance -(F3)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{record.ncdsledger}</td>
</tr><tr>
<th>Auction Debit 150% -(N)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{record.jv150}</td>
</tr><tr>
<th>PendingProofAmt (Oth DP Trf)-(T)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{record.pndgprfamt}</td>
</tr><tr>
<th>PayoutPendingAmt (UnRegdBank Trf)-(U)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{record.popndgamt}</td>
</tr><tr>
<th>DP SOH Value-(Y)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{record.dpsohval}</td>
</tr><tr>
    <th>Margin_post_VAR-(Z)</th>
    <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.mgnpostvr}</td>
    </tr><tr>
    <th>Margin_post_HCUT-(AA)</th>
    <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.mgnpohc}</td>
    </tr><tr>
    <th>Margin_post_HCUT_Maintenance -(AB)</th>
    <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.mgnpohcm}</td>
    </tr><tr>
    <th>Var_margin_LESS_SEC_Margin_POST_HCUT -(AC)</th>
    <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.vmlsmgnphc}</td>
    </tr><tr>
    <th>Aging Greater 5d  -(AD)</th>
    <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.agegr5}</td>
    </tr><tr>
    <th>Excess_Margin -(AE)</th>
    <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.exmargin}</td>
    </tr><tr>
    <th>Derv_Margin -(AF)</th>
    <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.dervmgn}</td>
    </tr><tr>
    <th>Last Tradeded Date</th>
    <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.lsttrddt}</td>

  </tr>
</table>


</div>
              </div>
            ))}
            </div>
        )}

{activeButton === 'portfo' && portfoData !== null && (
          <div>
         
                {!dataFound && (
                <div className="alert alert-warning" role="alert">
                  Data not found!
                </div>
              )}

{loading && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
            <h3>Portfolio F&O</h3>
            <button onClick={() => this.portfoExcel(portfoData)}>
          Download Portfolio Excel
        </button>
            <div>
           <table class="6" className="table table-striped table-scroll">
  <thead>
    <tr>
     
 
    <th>es_ucc</th>
<th>ucc</th>
<th>clname</th>
<th>symbol</th>
<th>instrument</th>
<th>option_typ</th>
<th>sp</th>
<th>expirydate</th>
<th>qty</th>
<th>avgcost</th>
<th>cost</th>
<th>mktvalue</th>
<th>unreal</th>
<th>mreturn</th>
<th>date</th>
<th>sqgain</th>
<th>delgain</th>
<th>bse_clrate</th>
<th>location</th>
<th>locnid</th>
<th>isin</th>
<th>exchange</th>
<th>sc_shrtnm</th>
<th>comn_sccd</th>
<th>is_suspend</th>
<th>brcd</th>
<th>familygrp</th>


      
    </tr>
  </thead>
  <tbody>
            {portfoData.map((portf , index) => (
    <tr key={index}>

<td>{portf.es_ucc}</td>
<td>{portf.ucc}</td>
<td>{portf.clname}</td>
<td>{portf.symbol}</td>
<td>{portf.instrument}</td>
<td>{portf.option_typ}</td>
<td>{portf.sp}</td>
<td>{portf.expirydate}</td>
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
<td>{portf.location}</td>
<td>{portf.locnid}</td>
<td>{portf.isin}</td>
<td>{portf.exchange}</td>
<td>{portf.sc_shrtnm}</td>
<td>{portf.comn_sccd}</td>
<td>{portf.is_suspend}</td>
<td>{portf.brcd}</td>
<td>{portf.familygrp}</td>

    </tr>
     ))}
  </tbody>
</table>

              </div>
              </div>
            
    
         
        )}



{activeButton === 'porteq' && porteqData !== null && (
          <div>
         
                {!dataFound && (
                <div className="alert alert-warning" role="alert">
                  Data not found!
                </div>
              )}

{loading && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
            <h3>Portfolio Equity</h3>
            <button onClick={() => this.porteqExcel(porteqData)}>
          Download Portfolio Excel
        </button>
            <div>
           <table class="6" className="table table-striped table-scroll">
  <thead>
    <tr>
     
 
   
    <th>es_ucc</th>
<th>ucc</th>
<th>clname</th>
<th>symbol</th>
<th>instrument</th>
<th>option_typ</th>
<th>sp</th>
<th>expirydate</th>
<th>qty</th>
<th>avgcost</th>
<th>cost</th>
<th>mktvalue</th>
<th>unreal</th>
<th>mreturn</th>
<th>date</th>
<th>sqgain</th>
<th>delgain</th>
<th>bse_clrate</th>
<th>location</th>
<th>locnid</th>
<th>isin</th>
<th>exchange</th>
<th>sc_shrtnm</th>
<th>comn_sccd</th>
<th>is_suspend</th>
<th>brcd</th>
<th>familygrp</th>
<th>Qty in DPSOH</th>
<th>Beneficiary Qty</th>
<th>Pledge Qty</th>
<th>Result</th>


      
    </tr>
  </thead>
  <tbody>
            {porteqData.map((portf , index) => (
    <tr key={index}>

<td>{portf.es_ucc}</td>
<td>{portf.ucc}</td>
<td>{portf.clname}</td>
<td>{portf.symbol}</td>
<td>{portf.instrument}</td>
<td>{portf.option_typ}</td>
<td>{portf.sp}</td>
<td>{portf.expirydate}</td>
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
<td>{portf.location}</td>
<td>{portf.locnid}</td>
<td>{portf.isin}</td>
<td>{portf.exchange}</td>
<td>{portf.sc_shrtnm}</td>
<td>{portf.comn_sccd}</td>
<td>{portf.is_suspend}</td>
<td>{portf.brcd}</td>
<td>{portf.familygrp}</td>
<td>{portf.total_qty}</td>
<td>{portf.beneficiary_qty}</td>
<td>{portf.pledge_qty}</td>
<td>{portf.comparison_result}</td>

    </tr>
     ))}
  </tbody>
</table>

              </div>
              </div>
            
    
         
        )}









{activeButton === 'portcom' && portcomData !== null && (
          <div>
         
                {!dataFound && (
                <div className="alert alert-warning" role="alert">
                  Data not found!
                </div>
              )}

{loading && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
            <h3>Portfolio Comodity</h3>
            <button onClick={() => this.portcomExcel(portcomData)}>
          Download Portfolio Excel
        </button>
            <div>
           <table class="6" className="table table-striped table-scroll">
  <thead>
    <tr>
     
 
    <th>es_ucc</th>
<th>ucc</th>
<th>clname</th>
<th>symbol</th>
<th>instrument</th>
<th>option_typ</th>
<th>sp</th>
<th>expirydate</th>
<th>qty</th>
<th>avgcost</th>
<th>cost</th>
<th>mktvalue</th>
<th>unreal</th>
<th>mreturn</th>
<th>date</th>
<th>sqgain</th>
<th>delgain</th>
<th>bse_clrate</th>
<th>location</th>
<th>locnid</th>
<th>isin</th>
<th>exchange</th>
<th>sc_shrtnm</th>
<th>comn_sccd</th>
<th>is_suspend</th>
<th>brcd</th>
<th>familygrp</th>


      
    </tr>
  </thead>
  <tbody>
            {portcomData.map((portf , index) => (
    <tr key={index}>

<td>{portf.es_ucc}</td>
<td>{portf.ucc}</td>
<td>{portf.clname}</td>
<td>{portf.symbol}</td>
<td>{portf.instrument}</td>
<td>{portf.option_typ}</td>
<td>{portf.sp}</td>
<td>{portf.expirydate}</td>
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
<td>{portf.location}</td>
<td>{portf.locnid}</td>
<td>{portf.isin}</td>
<td>{portf.exchange}</td>
<td>{portf.sc_shrtnm}</td>
<td>{portf.comn_sccd}</td>
<td>{portf.is_suspend}</td>
<td>{portf.brcd}</td>
<td>{portf.familygrp}</td>

    </tr>
     ))}
  </tbody>
</table>

              </div>
              </div>
            
    
         
        )}









{activeButton === 'mtfpo' && mtfpoData !== null && (
          <div>
            {!dataFound && (
                <div className="alert alert-warning" role="alert">
                  Data not found!
                </div>
              )}

{loading && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
            <h3>Mtf Position</h3>
            <button onClick={() => this.mtfpoExcel(mtfpoData)}>
          Download MTFpo Excel
        </button>
            <table class="6" className="table table-striped table-scroll">
  <thead>
    <tr>
    
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
            {mtfpoData.map((mtfpo,index) => (
    <tr key={index}>

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


{activeButton === 'netpo' && netpoData !== null && (
          <div>
            {!dataFound && (
                <div className="alert alert-warning" role="alert">
                  Data not found!
                </div>
              )}

{loading && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
            <h3>Open Position</h3>
            <button onClick={() => this.opExcel(netpoData)}>
          Download Open Position Excel
        </button>
            <table class="6" className="table table-striped table-scroll">
    <thead>
      <tr>
       
  
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
            {netpoData.map((netpo,index) => (    
      <tr key={index}>
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



{activeButton === 'nominee' && nomineeData !== null && (
          <div>
            {!dataFound && (
                <div className="alert alert-warning" role="alert">
                  Data not found!
                </div>
              )}

{loading && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
            <h3>Nominee Data</h3>

            <table class="6" className="table table-striped table-scroll">
    <thead>
      <tr>
       
      
<th>barcode</th>
<th>brcd</th>
<th>cl_grp</th>
<th>ucc</th>
<th>kslucc</th>
<th>ksluccnm</th>
<th>panno</th>
<th>locnid</th>
<th>ksemailid</th>
<th>ksmobile</th>
<th>es_nomn</th>
<th>es_nompan</th>
<th>es_nomshr</th>
<th>es_relwapc</th>
<th>ks_nomn</th>
<th>ks_nompan</th>
<th>ks_nomshr</th>
<th>ks_relwapc</th>    
      </tr>
    </thead>
    <tbody>
            {nomineeData.map((nominee) => (
            
           
      <tr >
<td>{nominee && nominee.barcode ? nominee.barcode : ""}</td>
<td>{nominee && nominee.brcd ? nominee.brcd: ""}</td>
<td>{nominee && nominee.cl_grp ? nominee.cl_grp :" "}</td>
<td>{nominee && nominee.ucc ? nominee.ucc : " "}</td>
<td>{nominee && nominee.kslucc ? nominee.kslucc:""}</td>
<td>{nominee && nominee.ksluccnm ? nominee.ksluccnm : " "}</td>
<td>{nominee && nominee.panno ?nominee.panno : " "}</td>
<td>{nominee && nominee.locnid ? nominee.locnid : " "}</td>
<td>{nominee && nominee.ksemailid ? nominee.ksemailid : " "}</td>
<td>{nominee && nominee.ksmobile ? nominee.ksmobile : " "}</td>
<td>{nominee && nominee.es_nomn ? nominee.es_nomn : " "}</td>
<td>{nominee && nominee.es_nompan ? nominee.es_nompan : " "}</td>
<td>{nominee && nominee.es_nomshr ? nominee.es_nomshr : " "}</td>
<td>{nominee && nominee.es_relwapc ? nominee.es_relwapc : " "}</td>
<td>{nominee && nominee.ks_nomn ? nominee.ks_nomn : " "}</td>
<td>{nominee && nominee.ks_nompan ? nominee.ks_nompan : " "}</td>
<td>{nominee && nominee.ks_nomshr ? nominee.ks_nomshr : " "}</td>
<td>{nominee && nominee.ks_relwapc ? nominee.ks_relwapc : " "}</td>
      </tr>
      ))}
    </tbody>
  </table>
  
          </div>
          )}
          </div>
        ) : (
          <div>
            <h3>Record List</h3>
            <h3>Updated Date {letterData.length > 0 && letterData[0].run_date ? letterData[0].run_date : 'N/A'}</h3>
            <form onSubmit={this.handleSearchSubmit}>
          <input
            type="text"
            value={searchQuery}
            onChange={this.handleSearchChange}
            placeholder="Search..."
          />
          <button type="submit">Enter</button>
        </form>

         {/* Radio buttons for filtering */}
         <div>
          <b>Close Transfer   </b>
          <label>
            <input
              type="radio"
              name="closerTransferFilter"
              value="yes"
              checked={closerTransferFilter === "yes"}
              onChange={this.handleFilterChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="closerTransferFilter"
              value="no"
              checked={closerTransferFilter === "no"}
              onChange={this.handleFilterChange}
            />
            No
          </label>
          <label>
            <input
              type="radio"
              name="closerTransferFilter"
              value="all"
              checked={closerTransferFilter === "all"}
              onChange={this.handleFilterChange}
            />
            All
          </label>
        <br/>
          <b>Priority   </b>
          <label>
            <input
              type="radio"
              name="priorityFilter"
              value="A"
              checked={priorityFilter === "A"}
              onChange={this.handlePriorityChange}
            />
            A
          </label>
          <label>
            <input
              type="radio"
              name="priorityFilter"
              value="B"
              checked={priorityFilter === "B"}
              onChange={this.handlePriorityChange}
            />
            B
          </label>
          <label>
            <input
              type="radio"
              name="priorityFilter"
              value="blank"
              checked={priorityFilter === "blank"}
              onChange={this.handlePriorityChange}
            />
            Blank
          </label>
          <label>
            <input
              type="radio"
              name="priorityFilter"
              value="all"
              checked={priorityFilter === "all"}
              onChange={this.handlePriorityChange}
            />
            All
          </label><br/>
          <div id="downloadModal" style={{ 
  display: 'none', 
  position: 'fixed', 
  zIndex: 9999, 
  left: 0, 
  top: 0, 
  width: '100%', 
  height: '100%', // Ensure it covers the full page
  backgroundColor: 'rgba(0,0,0,0.5)' 
}}>
  <div style={{ 
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    transform: 'translate(-50%, -50%)', 
    backgroundColor: 'white', 
    padding: '20px', // Ensure padding is in pixels
    borderRadius: '8px', 
    textAlign: 'center', 
    fontSize: '18px' 
  }}>
    <p>Downloading... Please wait.</p>
  </div>
</div>


          <button onClick={this.porteqdiff}>Portfolio Difference</button>
          <button onClick={this.porteqmatch}>Portfolio Match</button>
          <button onClick={this.dormant}>Download Dormant Accounts</button>
          <button onClick={this.upcomingdormant}>Download Upcoming Dormant Accounts</button>
          <button onClick={this.dormantsend}>Download Send mails Dormant Accounts</button>
          <button onClick={this.krastatus}>Download KRA Status</button>
        </div>
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Priority</th>
                  <th>Dormant: Upcoming Days</th>
                  <th>UCC</th>
                  <th>KSLUCC</th>
                  <th>Branch</th>
                  <th>LocnID</th>
                  <th>KS_PANNO</th>
                  <th>LocationID</th>
                  <th>Closer_TRF</th>
                  <th>Action</th>
                </tr>
              </thead>
              
              <tbody>
              {filteredData.map((record, index) => (
          <Record key={index} record={record} onView={this.handleView} />
        ))}
  {/* {letterData && letterData.map((record, index) => (
    <Record key={index} record={record} onView={this.handleView} />
  ))} */}
</tbody>

            </table>
            {loading && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

          </div>
        )}

        
      </div>
    );
  }
}
