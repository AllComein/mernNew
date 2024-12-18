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

// export default class BoardSubModerator extends Component {
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

//   handleFilterChange = (event) => {
//     this.setState({ filterValue: event.target.value }, this.getLetterData);
//   };
  

//   getLetterData = async () => {
//     try {
//       const currentUser = AuthService.getCurrentUser();
//       const response = await fetch("http://183.182.84.228:4005/letter/");
//       const letterData = await response.json();
//       const filteredLetterData = letterData.filter(
//         (record) =>
//           (currentUser.username === record.locnid || this.state.filterValue === "") &&
//           (record.clname.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
//           record.kslucc.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
//           record.ucc.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
//           record.locnid.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
//           record.ks_panno.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
//           record.locationid.toLowerCase().includes(this.state.searchValue.toLowerCase()))
//       );
      
//       this.setState({ letterData: filteredLetterData.length > 0 ? filteredLetterData : null  });
//     } catch (error) {
//       window.alert(`An error occurred: ${error}`);
//     }
// };


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

//   handleViewDpsoh = async () => {
//     try {
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
//   };
  

//   handleViewLedger = async () => {
//     try {
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
//   };

//   handleViewMtfpo = async () => {
//     try {
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
//   };

//   handleViewNetpo = async () => {
//     try {
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
//   };

//   handleViewPortfo = async () => {
//     try {
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
//   };

//   handleViewNominee = async () => {
//     try {
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
//       dataFound
//     } = this.state;

//     return (
//       <div className="container">
//         <header className="jumbotron">
//           <h3>{this.state.content}</h3>
//         </header>

        

//         {isViewingRecord ? (
//           <div>
            
//             <button onClick={this.handleViewDpsoh}>View DPSOH</button>
            
            
//             <button onClick={this.handleViewLedger}>View Ledger</button>
            
            
//             <button onClick={this.handleViewMtfpo}>View Mtfpo</button>
           
            
//             <button onClick={this.handleViewNetpo}>View Netpo</button>
            
            
//             <button onClick={this.handleViewPortfo}>Portfolio</button>
         
          
//             <button onClick={this.handleViewNominee}>Nominee</button>
            
//             <button onClick={this.handleExitView}>Exit</button>


//             {selectedRecord && (
//           <div>
//             <h3>Selected Record</h3>
//             <p>Name: {selectedRecord.clname}</p>
//             <p>Priority: {selectedRecord.priority}</p>
//           </div>
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
//             <div>
//            <table class="6" className="table table-striped table-scroll">
//   <thead>
//     <tr>
     
 
// <th>Scrip Name</th>
// <th>ISIN</th>
// <th>Instrument</th>
// <th>Qty</th>
// <th>AvgCostPrice</th>
// <th>CostValue</th>
// <th>Market Value</th>
// <th>UnReal</th>
// <th>MktReturn</th>
// <th>Date</th>
// <th>Sq Gain</th>
// <th>Del Gain</th>
// <th>Bse Curr Price</th>
// <th>Is Suspend</th>
// <th>Common ScripCode</th>
// <th>_Branch</th>
// <th>Family Group</th>

      
//     </tr>
//   </thead>
//   <tbody>
//             {portfoData.map((portf , index) => (
//     <tr key={index}>

// <td>{portf.sc_shrtnm}</td>
// <td>{portf.isin}</td>
// <td>{portf.instrument}</td>
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
// <td>{portf.is_suspend}</td>
// <td>{portf.comn_sccd}</td>
// <td>{portf.brcd}</td>
// <td>{portf.familygrp}</td>
//     </tr>
//      ))}
//   </tbody>
// </table>
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
//   </div>
        
          
//         )}



// {activeButton === 'nominee' && nomineeData !== null && (
//           <div>
//             {!dataFound && (
//                 <div className="alert alert-warning" role="alert">
//                   Data not found!
//                 </div>
//               )}
//             <h3>Ledger Data</h3>
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
  
//           </div>
//           )}
//           </div>
//         ) : (
//           <div>
//             <h3>Record List</h3>
//             <input
//   type="text"
//   placeholder="Filter by Locnid..."
//   value={this.state.filterValue}
//   onChange={this.handleFilterChange}
// />

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
//                 {letterData.map((record, index) => (
//                   <Record key={index} record={record} onView={this.handleView} />
//                 ))}
//               </tbody>
//             </table>
            

//           </div>
//         )}

        
//       </div>
//     );
//   }
// }










import React, { Component } from "react";
import AuthService from "../services/auth.service";

const Record = (props) => (
  <tr key={props.record.id}>
    <td>{props.record.clname}</td>
    <td>{props.record.priority}</td>
    <td>{props.record.ucc}</td>
    <td>{props.record.kslucc}</td>
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
    <td>
      <button
        className="btn btn-link"
        onClick={() => props.onSelectUCC(props.record.ucc)}
      >
        Select UCC
      </button>
    </td>
  </tr>
);

export default class BoardSubModerator extends Component {
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
      nomineeData: [],
      isViewingRecord: false,
      hoveredDptype: "",
      mousePosition: { x: 0, y: 0 },
      searchValue: "",
      activeButton: null,
      dataFound: true,
      selectedUCC: null,
      uniqueUCCs: [], // New state to hold unique UCCs
    };
  }

  componentDidMount() {
    this.getLetterData();
  }

  getLetterData = async () => {
    try {
      const currentUser = AuthService.getCurrentUser();
      const response = await fetch(`http://183.182.84.228:4005/letter/?locnid=${currentUser.username}`);
      const letterData = await response.json();
      const uniqueUCCs = [...new Set(letterData.map(record => record.ucc))];
      this.setState({ letterData, uniqueUCCs });
    } catch (error) {
      window.alert(`An error occurred: ${error}`);
    }
  };

  handleUCCSelect = (ucc) => {
    this.setState({ selectedUCC: ucc });
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
      nomineeData: [],
    });
  };

  handleViewDpsoh = async () => {
    try {
      // Fetch dpsohData
    } catch (error) {
      window.alert(`An error occurred: ${error}`);
    }
  };

  // Implement other handleView methods similarly

  handleExitView = () => {
    this.setState({ isViewingRecord: false });
  };

  handleSearchChange = (event) => {
    this.setState({ searchValue: event.target.value }, this.getLetterData);
  };

  render() {
    const {
        letterData,
        selectedRecord,
        dpsohData,
        ledgerData,
        portfoData,
        mtfpoData,
        netpoData,
        nomineeData,
        isViewingRecord,
        hoveredDptype,
        mousePosition,
        activeButton,
        dataFound,
        uniqueUCCs,
        selectedUCC,
    } = this.state;

    // Filter letterData based on selectedUCC
    const filteredLetterData = selectedUCC ? letterData.filter(record => record.ucc === selectedUCC) : letterData;

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{this.state.content}</h3>
            </header>

            {isViewingRecord ? (
                <div>
                    {/* Implement view components here */}
                </div>
            ) : (
                <div>
                    <h3>Record List</h3>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={this.state.searchValue}
                        onChange={this.handleSearchChange}
                    />
                    <div>
                        <label>Select UCC: </label>
                        <select onChange={(e) => this.handleUCCSelect(e.target.value)} value={selectedUCC}>
                            <option value="">All</option>
                            {uniqueUCCs.map((ucc, index) => (
                                <option key={index} value={ucc}>{ucc}</option>
                            ))}
                        </select>
                    </div>
                    <table className="table table-striped" style={{ marginTop: 20 }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Priority</th>
                                <th>UCC</th>
                                <th>KSLUCC</th>
                                <th>KS_PANNO</th>
                                <th>LocationID</th>
                                <th>Closer_TRF</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLetterData.map((record, index) => (
                                <Record
                                    key={index}
                                    record={record}
                                    onView={this.handleView}
                                    onSelectUCC={this.handleUCCSelect}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

}
