
// import React, { Component } from "react";
// import AuthService from "../../services/auth.service";
// import './priority.css'
// import { Spinner } from "react-bootstrap";
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
//       loading: false,
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
//       this.setState({ loading: true });
//       const currentUser = AuthService.getCurrentUser();
//       const response = await fetch("http://183.182.84.228:4005/letter/");
//       const letterData = await response.json();
//       const filteredLetterData = letterData.filter(
//         (record) =>
//           currentUser.username === record.es_locnid &&
//           (record.clname.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
//           record.kslucc.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
//           record.ucc.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
//           record.es_locnid.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
//           record.ks_panno.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
//           record.locationid.toLowerCase().includes(this.state.searchValue.toLowerCase()))
//       );
//       this.setState({ letterData: filteredLetterData.length > 0 ? filteredLetterData : null  });
//     } catch (error) {
//       window.alert(`An error occurred: ${error}`);
//     }finally {
//       this.setState({ loading: false }); // Set loading to false when data fetching completes
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


//   handleViewMtfpo = async () => {
//     try {
//       const response = await fetch("http://183.182.84.228:4005/prio/");
//       const mtfpoData = await response.json();
//       const selectedMtfpoData = mtfpoData.filter(
//         (item) => item.ks_ucc === this.state.selectedRecord.kslucc
//       );
//       if (selectedMtfpoData.length > 0) {
//         // this.setState({ mtfpoData: selectedMtfpoData });

//       } else {
//         window.alert('Data not found for selected record.');
//       }
//     } catch (error) {
//       window.alert(`An error occurred: ${error}`);
//     }
//   };

//   handleViewNetpo = async () => {
//     try {
//       const response = await fetch("http://183.182.84.228:4005/esign/");
//       const netpoData = await response.json();
//       const selectedNetpoData = netpoData.filter(
//         (item) => item.ucc === this.state.selectedRecord.ucc
//       );
//       if (selectedNetpoData.length > 0) {
//         // this.setState({ netpoData: selectedNetpoData });

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
//       loading,
//       dataFound
//     } = this.state;

//     return (
//       <div className="container">
//         <header className="jumbotron">
//           <h3>{this.state.content}</h3>
//         </header>

        

//         {isViewingRecord ? (
//           <div>
            
//             {/* <button onClick={this.handleViewDpsoh}>View Closer Info</button>
            
            
//             <button onClick={this.handleViewLedger}>View Difference</button>
            
            
//             <button onClick={this.handleViewMtfpo}>View Priority</button>
           
            
//             <button onClick={this.handleViewNetpo}>View Esign</button> */}
            
// {/*             
//             <button onClick={this.handleViewPortfo}>Al letter</button>
//           */}
          
//             {/* <button onClick={this.handleViewNominee}>Nominee</button> */}
            
//             <button onClick={this.handleExitView}>Exit</button>


//             {selectedRecord && (
//           <div>
//           <table class="6">
// <thead>
//   <tr>
//   <th>UCC </th>
// <th>Kotak UCC</th>
// <th>Client Name</th>
// <th>LocationId</th>
// <th>Pan</th>  
// <th>Mobile</th>
// <th>Email</th>   
//   </tr>
// </thead>
// <tbody>
//   <tr>
//   <td>{selectedRecord.ucc }</td>
// <td>{selectedRecord.kslucc}</td>
// <td>{selectedRecord.clname }</td>
// <td>{selectedRecord.locationid}</td>
// <td>{selectedRecord.ks_panno}</td>   
// <td>{selectedRecord.ks_mobile}</td>   
// <td>{selectedRecord.ks_emailid}</td>   
//   </tr>
// </tbody>
// </table>
// <br/><br/>
//         </div>
//         )}



// {portfoData && (
//           <div>
         
//                 {!dataFound && (
//                 <div className="alert alert-warning" role="alert">
//                   Data not found!
//                 </div>
//               )}
//             <h3>Portfolio</h3>
           

//             <div>
         
//        <h3>Priority Information Of {portfoData.clname}</h3>
//           {/* Displaying portfoData details */}

//     <h4>Personal</h4>
//     <table class="4" style={{border: "2px solid black"}}>
   
//       <thead style={{border: "2px solid black"}}>
//         <tr>
//         <th>Priority</th>
//         <th>BarCode</th>
//         <th>Boss UCC</th>
//           <th>ESL UCC</th>
//           <th>Client Name</th>
//           <th>Pan No.</th>
//           <th>LocationID</th>
//           <th>Ks Dp BoId</th>
//           <th>Category</th>
//           <th>Mobile No.</th>
         
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
          
//           <td>{portfoData.priority}</td>
//           <td>{portfoData.barcode}</td>
//           <td>{portfoData.ks_ucc}</td>
//           <td>{portfoData.es_ucc}</td>
//           <td>{portfoData.clname}</td>
//           <td>{portfoData.panno}</td>
//           <td>{portfoData.locnid}</td>
//           <td>{portfoData.ksdp_boid}</td>
//           <td >{portfoData.catg}</td>
//           <td >{portfoData.mobile}</td>
         
//         </tr>
//       </tbody>
//     </table>



//     <h4>e-Sign Status</h4>
//     <table class="4" style={{border: "2px solid black"}}>
   
//       <thead style={{border: "2px solid black"}}>
//         <tr>
//         <th>Ks Email Sent to Client</th>
//         <th>Ks e-Sign Status</th>
//         <th>Ks e-Sign Remarks</th>         
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
          
//           <td>{portfoData.ks_emtocl}</td>
//           <td>{portfoData.ks_esign}</td>
//           <td>{portfoData.ks_essts}</td>
//         </tr>
//       </tbody>
//     </table>



//     <h4>Remarks Status</h4>
//     <table class="4" style={{border: "2px solid black"}}>
   
//       <thead style={{border: "2px solid black"}}>
//         <tr>
//         <th>Old Dvu Remark(s)</th>
//         <th>3i Remark(QC Status)</th>
//         <th>3i/Kotak Remark(QC/DVU Status)</th>
//         <th>Rajneesh Remark(s)</th>
//         <th>Prakash Remark(s)</th> 
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
          
//           <td>{portfoData.dvu_remark}</td>
//           <td>{portfoData.qc_status}</td>
//           <td>{portfoData.ks_pndgsts}</td>
//           <td>{portfoData.ru_sts}</td>
//           <td>{portfoData.pp_sts}</td>
//         </tr>
//       </tbody>
//     </table>



//     <h4>Status</h4>
//     <table class="4" style={{border: "2px solid black"}}>
   
//       <thead style={{border: "2px solid black"}}>
//         <tr>
//         <th>ES Client Status</th>
//           <th>Es DP Holding Value</th>
//           <th>Es Dp Ledger Balance</th>
//           <th>Es Ledger Balance</th>
//           <th>Es Last Trade Date</th>
//           <th>Client s Account Closed</th>
//           <th>Closer Transfer</th>
//           <th>Branch</th>
//           <th>Family Group</th>
     
         
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
        
//           <td>{portfoData.es_clsts}</td>
//           <td>{portfoData.es_dphldg}</td>
//           <td>{portfoData.es_dpledg}</td>
//           <td>{portfoData.es_ledbal}</td>
//           <td>{portfoData.es_lstrdt}</td>
//           <td>{portfoData.ac_closed}</td>
//           <td>{portfoData.closer_trf}</td>
//           <td>{portfoData.brcd}</td>
//           <td>{portfoData.family_grp}</td>
         
//         </tr>
//       </tbody>
//     </table>



//           {/* Buttons for the specific portfoData */}
//           {/* <button onClick={() => editportfoData(portfoData)}>Edit</button> */}
//           {/* <button onClick={backToList} style={{position:"sticky", bottom:"0"}}>Back</button>
//           <button onClick={(handlePrint)} style={{position:"sticky", bottom:"0"}}>Print</button> */}

         
//           {/* Button for generating and downloading Excel for the specific portfoData */}
//           {/* <button onClick={() => generateAndDownloadExcelForView(portfoData)} style={{position:"sticky", bottom:"0"}}>
//             Generate and Download Excel
//           </button> */}

         
//       </div>
            
//               </div>
            
    
         
//         )}
//           </div>
//         ) : (
//           <div>
//             <h3>Priority Status</h3>
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
//               {letterData ? letterData.map((record, index) => (
//   <Record key={index} record={record} onView={this.handleView} />
// )) : null}
//               </tbody>
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















import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import './priority.css'
import AuthService from "../../services/auth.service";

// Record component for rendering each row in the table
const Record = (props) => {
  const { record } = props;

  // Check if ac_closed is not present

  

  return (
    <tr >
      <td>
        {record.priority}
      </td>
      <td >{record.clname}</td>
      <td>{record.es_ucc}</td>
      <td>{record.ks_ucc}</td>
      <td>{record.panno}</td>
      <td>{record.locnid}</td>
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
        {/* <button
          className="btn btn-link"
          onClick={() => {
            props.printRecord(record);
          }}
        >
          Print
        </button> */}
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
  const [secondSearchTerm, setsecondSearchTerm] = useState("");
  const [MobileStatus, setMobileStatus] = useState("all"); // Default to show all records
  const [viewDetails, setViewDetails] = useState(null);
  const [NomStatus, setnomStatus] = useState("all");
  const [SegmentStatus, setsegmentStatus] = useState("all");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [barStatus, setbarStatus] = useState("all");
  const [emailStatus, setemailStatus] = useState("all");
  const [signStatus, setsignStatus] = useState("all");
  const [showPriorityCheckbox, setShowPriorityCheckbox] = useState(false);
  const [selectedPriorities, setSelectedPriorities] = useState([]);

  // ... (existing code)

  const handlePriorityChange = (priority) => {
    if (selectedPriorities.includes(priority)) {
      setSelectedPriorities(selectedPriorities.filter((p) => p !== priority));
    } else {
      setSelectedPriorities([...selectedPriorities, priority]);
    }
  
    // If no priority is selected, show all records
    if (selectedPriorities.length === 0) {
      // Fetch all records here
    }
  };

  const isPrioritySelected = (priority) => selectedPriorities.includes(priority);



  

  let history = useNavigate();

  // Fetch records on initial mount
  // useEffect(() => {
  //   async function getRecords() {
  //     try {
  //       setLoading(true); // Set loading to true before starting the fetch
  //       const response = await fetch(`http://183.182.84.228:4005/prio/`);
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

  //   return;
  // }, [initialFetchComplete]);





  useEffect(() => {
    async function getRecords() {
      try {
        setLoading(true); // Set loading to true before starting the fetch
        const currentUser = AuthService.getCurrentUser();
        const response = await fetch(`http://183.182.84.228:4005/prio/`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
        const records = await response.json();
        const allUsersResponse = await AuthService.getAllUsers();
        const currentUserDetails = allUsersResponse.find(user => user.username === currentUser.username);
          const viewableUsers = currentUserDetails.viewableUsers.split(',');

      
        const filteredRecords = records.filter(record =>  viewableUsers.includes(record.locnid));
     
        setRecords(filteredRecords.length > 0 ? filteredRecords : null);
        setInitialFetchComplete(true);
      } finally {
        setLoading(false); // Set loading to false after fetch completes (success or error)
      }
    }
  
    if (!initialFetchComplete) {
      getRecords();
    }
  
    return;
  }, [initialFetchComplete]);




  // Function to delete a record
  async function deleteRecord(id) {
    await fetch(`http://202.54.6.34:4004/${id}`, {
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
      ((record.locnid && record.locnid.toLowerCase().includes(term.toLowerCase().trim())) ||
        (record.es_ucc && record.es_ucc.toLowerCase().includes(term.toLowerCase().trim())) ||
        (record.ks_ucc && record.ks_ucc.toLowerCase().includes(term.toLowerCase().trim())) ||
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
    filtered = filtered.filter((record) => record.ks_ucc);
  } else if (kslStatus === "notDone") {
    filtered = filtered.filter((record) => !record.ks_ucc);
  }


  if (barStatus === "done") {
    filtered = filtered.filter((record) => record.barcode);
  } else if (barStatus === "notDone") {
    filtered = filtered.filter((record) => !record.barcode);
  }


  if (emailStatus === "done") {
    filtered = filtered.filter((record) => record.ks_emtocl === 'Yes');
  } else if (emailStatus === "notDone") {
    filtered = filtered.filter((record) => record.ks_emtocl === 'No');
  }


  if (signStatus === "done") {
    filtered = filtered.filter((record) => record.ks_esign === 'Success');
  } else if (signStatus === "notDone") {
    filtered = filtered.filter((record) => record.ks_esign !== 'Success');
  }


  if (selectedPriorities.length > 0) {
    filtered = filtered.filter((record) =>
      selectedPriorities.includes(record.priority || " ")
    );
  }
  

  if (secondSearchTerm) {
    filtered = filtered.filter((record) => {
      const secondSearchTerms = secondSearchTerm.split(',');
      return secondSearchTerms.some((term) => filterRecordsByTerm(record, term));
    });
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
      printRecord={() => handlePrint(record)}
      viewRecord={() => viewRecord(record)}
      toggleSelectedRecord={toggleSelectedRecord}
      key={record._id}
    />
  ));
}


function filterRecordsByTerm(record, term) {
    return (
      (record.es_ucc && record.es_ucc.toLowerCase().includes(term.toLowerCase().trim())) ||
      (record.ks_ucc && record.ks_ucc.toLowerCase().includes(term.toLowerCase().trim())) ||
      (record.panno && record.panno.toLowerCase().includes(term.toLowerCase().trim())) ||
      (record.clname && record.clname.toLowerCase().includes(term.toLowerCase().trim()))
    );
  }

function handlePrint() {
    window.print();
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

// const shouldShowSections = kslStatus !== 'notDone' || kslStatus === 'all';





return (
  
  <div>
      
    {viewRecordDetails ? (
      <div>
         
       <h3>Priority Information Of {viewRecordDetails.clname}</h3>
          {/* Displaying record details */}
      
    {/* <table  class="1" >
        <tr >
          <th>Priority</th>
          <td>{(viewRecordDetails.priority|| 'NR')}</td>
          </tr>
          <tr>
          <th>BarCode</th>
          <td>{(viewRecordDetails.barcode|| 'NR')}</td>
          </tr>
          <tr>
          <th>Boss UCC</th>
          <td>{viewRecordDetails.ks_ucc|| 'NR'}</td>
          </tr>
          <tr>
          <th>ESL UCC</th>
          <td>{(viewRecordDetails.es_ucc)}</td>
          </tr>
          <tr>
          <th>Client Name</th>
          <td>{(viewRecordDetails.clname)}</td>
          </tr>
          <tr>
          <th>Pan No.</th>
          <td>{(viewRecordDetails.panno)}</td>
          </tr>
          <tr>
          <th>LocationID</th>
          <td>{(viewRecordDetails.locnid)}</td>
          </tr>
          <tr>
          <th>Ks Dp BoId</th>
          <td>{(viewRecordDetails.ksdp_boid)}</td>
          </tr>
          <tr>
          <th>Category</th>
          <td>{(viewRecordDetails.catg)}</td>
          </tr>
          <tr>
          <th>Mobile No.</th>
          <td>{(viewRecordDetails.mobile)}</td>
          </tr>
          <tr>
          <th>Ks Email Sent to Client</th>
          <td>{(viewRecordDetails.ks_emtocl)}</td>
          </tr>
          <tr>
          <th>Ks e-Sign Status</th>
          <td>{(viewRecordDetails.ks_esign)}</td>
          </tr>
          <tr>
          <th>Ks e-Sign</th>
          <td>{(viewRecordDetails.ks_essts)}</td>
          </tr>
          <tr>
          <th>Old Dvu Remark(s)</th>
          <td>{(viewRecordDetails.dvu_remark)}</td>
          </tr>
          <tr>
          <th>3i Remark(QC Status)</th>
          <td>{(viewRecordDetails.
            )}</td>
          </tr>
          <tr>
          <th>3i/Kotak Remark(QC/DVU Status)</th>
          <td>{(viewRecordDetails.ks_pndgsts)}</td>
          </tr>
          <tr>
          <th>Rajneesh Remark(s)</th>
          <td>{(viewRecordDetails.ru_sts)}</td>
          </tr>
          <tr>
          <th>Prakash Remark(s)</th>
          <td>{(viewRecordDetails.pp_sts)}</td>
          </tr>
          <tr>
          <th>ES Client Status</th>
          <td>{(viewRecordDetails.es_clsts)}</td>
          </tr>
          <tr>
          <th>Es DP Holding Value</th>
          <td>{(viewRecordDetails.es_dphldg)}</td>
          </tr>
          <tr>
          <th>Es Dp Ledger Balance</th>
          <td>{(viewRecordDetails.es_dpledg)}</td>
          </tr>
          <tr>
          <th>Es Ledger Balance</th>
          <td>{(viewRecordDetails.es_ledbal)}</td>
          </tr>
          <tr>
          <th>Es Last Trade Date</th>
          <td>{(viewRecordDetails.es_lstrdt)}</td>
          </tr>
          <tr>
          <th>Client s Account Closed</th>
          <td>{(viewRecordDetails.ac_closed)}</td>
          </tr>
          <tr>
          <th>Closer Transfer</th>
          <td>{(viewRecordDetails.closer_trf)}</td>
          </tr>
          <tr>
          <th>Branch</th>
          <td>{(viewRecordDetails.brcd)}</td>
          </tr>
          <tr>
          <th>Family Group</th>
          <td>{(viewRecordDetails.family_grp)}</td>
          </tr>
    </table> */}





    <h4>Personal</h4>
    <table class="4" style={{border: "2px solid black"}}>
   
      <thead style={{border: "2px solid black"}}>
        <tr>
        <th>Priority</th>
        <th>BarCode</th>
        <th>Boss UCC</th>
          <th>ESL UCC</th>
          <th>Client Name</th>
          <th>Pan No.</th>
          <th>LocationID</th>
          <th>Ks Dp BoId</th>
          <th>Category</th>
          <th>Mobile No.</th>
         
        </tr>
      </thead>
      <tbody>
        <tr>
          
          <td>{viewRecordDetails.priority}</td>
          <td>{viewRecordDetails.barcode}</td>
          <td>{viewRecordDetails.ks_ucc}</td>
          <td>{viewRecordDetails.es_ucc}</td>
          <td>{viewRecordDetails.clname}</td>
          <td>{viewRecordDetails.panno}</td>
          <td>{viewRecordDetails.locnid}</td>
          <td>{viewRecordDetails.ksdp_boid}</td>
          <td >{viewRecordDetails.catg}</td>
          <td >{viewRecordDetails.mobile}</td>
         
        </tr>
      </tbody>
    </table>


    <h4>Status</h4>
    <table class="4" style={{border: "2px solid black"}}>
   
      <thead style={{border: "2px solid black"}}>
        <tr>
        <th>ES Client Status</th>
          <th>Es DP Holding Value</th>
          <th>Es Dp Ledger Balance</th>
          <th>Es Ledger Balance</th>
          <th>Es Last Trade Date</th>
          <th>Client s Account Closed</th>
          <th>Closer Transfer</th>
          <th>Branch</th>
          <th>Family Group</th>
     
         
        </tr>
      </thead>
      <tbody>
        <tr>
        
          <td>{viewRecordDetails.es_clsts}</td>
          <td>{viewRecordDetails.es_dphldg}</td>
          <td>{viewRecordDetails.es_dpledg}</td>
          <td>{viewRecordDetails.es_ledbal}</td>
          <td>{viewRecordDetails.es_lstrdt}</td>
          <td>{viewRecordDetails.ac_closed}</td>
          <td>{viewRecordDetails.closer_trf}</td>
          <td>{viewRecordDetails.brcd}</td>
          <td>{viewRecordDetails.family_grp}</td>
         
        </tr>
      </tbody>
    </table>
   


    <h4>Remarks </h4>
    <table class="4" style={{border: "2px solid black"}}>
   
      <thead style={{border: "2px solid black"}}>
        <tr>
        <th>3i Status 1	</th>
        <th>3i Status 2	</th>
        <th>Other Status	</th>
        <th>Multiple Email/Mobile	</th>
        <th>Kotak Remark(s)</th> 
        </tr>
      </thead>
      <tbody>
        <tr>
          
          <td>{viewRecordDetails.sts1_3i}</td>
          <td>{viewRecordDetails.sts2_3i}</td>
          <td>{viewRecordDetails.ks_othsts}</td>
          <td>{viewRecordDetails.mult_emmo}</td>
          <td>{viewRecordDetails.ks_allrem}</td>
        </tr>
      </tbody>
    </table>



  

    <h4>e-Sign Status</h4>
    <table class="4" style={{border: "2px solid black"}}>
   
      <thead style={{border: "2px solid black"}}>
        <tr>
        <th>Ks Email Sent to Client</th>
        <th>Ks e-Sign Status</th>
        <th>Ks e-Sign Remarks</th>         
        </tr>
      </thead>
      <tbody>
        <tr>
          
          <td>{viewRecordDetails.ks_emtocl}</td>
          <td>{viewRecordDetails.ks_esign}</td>
          <td>{viewRecordDetails.ks_essts}</td>
        </tr>
      </tbody>
    </table>


          {/* Buttons for the specific record */}
          {/* <button onClick={() => editRecord(viewRecordDetails)}>Edit</button> */}
          <button onClick={backToList} style={{position:"sticky", bottom:"0"}}>Back</button>
          <button onClick={(handlePrint)} style={{position:"sticky", bottom:"0"}}>Print</button>

         
          {/* Button for generating and downloading Excel for the specific record */}
          <button onClick={() => generateAndDownloadExcelForView(viewRecordDetails)} style={{position:"sticky", bottom:"0"}}>
            Generate and Download Excel
          </button>

         
      </div>
    ) : (
      <div>
        <h5 style={{float:"right"}}><strong>Updated Date</strong> {records.length > 0 && records[1].run_date ? records[1].run_date : 'N/A'}</h5>
        <h3>Priority Status</h3>
        <input
          type="text"
          placeholder="Search by LocationID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          id="searchBar"
        />
        <input
          type="text"
          placeholder="Search by UCC/Name"
          value={secondSearchTerm}
          onChange={(e) => setsecondSearchTerm(e.target.value)}
          id="searchBar"
        />

        {selectedRecords.length > 0 && (
          <div>
            <strong>Selected Records:</strong> {selectedRecords.map((record) => record.ucc).join(', ')}
            <button onClick={clearSelectedRecords}>Clear Selection</button>
          </div>
        )}

        <button onClick={() => generateAndDownloadView()}>Generate and Download Excel</button>
        {/* <button onClick={() => printRecord(selectedRecords)}>Print Selected</button> */}
        <button onClick={clearSearchAndSelection}>Clear</button><br/>
        


        <div>
  <div className="dropdown">
    <button className="dropbtn"> &nbsp; Priority Type ? &nbsp;</button>
    <div className="dropdown-content">
      <strong>

        <label style={{ color: "IndianRed" }}>

          <input
            type="checkbox"
            checked={isPrioritySelected("A")}
            onChange={() => handlePriorityChange("A")}
          />
          &nbsp;A&nbsp;&nbsp;
        </label>
        <label>

          <input
            type="checkbox"
            checked={isPrioritySelected("B")}
            onChange={() => handlePriorityChange("B")}
          />
          &nbsp;B&nbsp;&nbsp;
        </label>
        <label>

          <input
            type="checkbox"
            checked={isPrioritySelected("")}
            onChange={() => handlePriorityChange("")}
          />
          &nbsp; Blank&nbsp;&nbsp;
        </label>
      </strong>
    </div>
  </div>

  <div className="dropdown">
    <button className="dropbtn"> Kotak Account Done ? </button>
    <div className="dropdown-content">
      <strong>

        <label>
          <input
            type="radio"
            value="done"
            checked={kslStatus === "done"}
            onChange={() => setkslStatus("done")}
          />
          &nbsp;Yes&nbsp;
        </label>
      </strong>
      <strong>
        <label>

          <input
            type="radio"
            value="notDone"
            checked={kslStatus === "notDone"}
            onChange={() => setkslStatus("notDone")}
          />
          &nbsp;No&nbsp;
        </label>
        <label>
          <input
            type="radio"
            value="all"
            checked={kslStatus === "all"}
            onChange={() => setkslStatus("all")}
          />
          &nbsp;Both&nbsp;
        </label>
      </strong>
    </div>
  </div>

  {kslStatus === "notDone" || kslStatus === "all" && (
    <div style={{ marginTop: "38px" }}>
      <div className="dropdown">
        <button className="dropbtn">Closer Transfer Done ?</button>
        <div className="dropdown-content">
          <strong>

            <label>
              <input
                type="radio"
                value="done"
                checked={closerTrfStatus === "done"}
                onChange={() => setCloserTrfStatus("done")}
              />
              &nbsp;Yes&nbsp;
            </label>
          </strong>
          <strong>
            <label>

              <input
                type="radio"
                value="notDone"
                checked={closerTrfStatus === "notDone"}
                onChange={() => setCloserTrfStatus("notDone")}
              />
              &nbsp;No&nbsp;
            </label>
            <label>
              <input
                type="radio"
                value="all"
                checked={closerTrfStatus === "all"}
                onChange={() => setCloserTrfStatus("all")}
              />
              &nbsp;Both&nbsp;
            </label>
          </strong>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn"> &nbsp;&nbsp; Bar Code Visible? &nbsp;&nbsp;</button>
        <div className="dropdown-content">
          <strong>

            <label>
              <input
                type="radio"
                value="done"
                checked={barStatus === "done"}
                onChange={() => setbarStatus("done")}
              />
              &nbsp;Yes&nbsp;
            </label>
          </strong>
          <strong>
            <label>

              <input
                type="radio"
                value="notDone"
                checked={barStatus === "notDone"}
                onChange={() => setbarStatus("notDone")}
              />
              &nbsp;No&nbsp;
            </label>
            <label>
              <input
                type="radio"
                value="all"
                checked={barStatus === "all"}
                onChange={() => setbarStatus("all")}
              />
              &nbsp;Both&nbsp;
            </label>
          </strong>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn"> Ks Email Sent to Client Done ? </button>
        <div className="dropdown-content">
          <strong>

            <label>
              <input
                type="radio"
                value="done"
                checked={emailStatus === "done"}
                onChange={() => setemailStatus("done")}
              />
              &nbsp;Yes&nbsp;
            </label>
          </strong>
          <strong>
            <label>

              <input
                type="radio"
                value="notDone"
                checked={emailStatus === "notDone"}
                onChange={() => setemailStatus("notDone")}
              />
              &nbsp;No&nbsp;
            </label>
            <label>
              <input
                type="radio"
                value="all"
                checked={emailStatus === "all"}
                onChange={() => setemailStatus("all")}
              />
              &nbsp;Both&nbsp;
            </label>
          </strong>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">	Ks e-Sign Status Success ? </button>
        <div className="dropdown-content">
          <strong>

            <label>
              <input
                type="radio"
                value="done"
                checked={signStatus === "done"}
                onChange={() => setsignStatus("done")}
              />
              &nbsp;Yes&nbsp;
            </label>
          </strong>
          <strong>
            <label>

              <input
                type="radio"
                value="notDone"
                checked={signStatus === "notDone"}
                onChange={() => setsignStatus("notDone")}
              />
              &nbsp;No&nbsp;
            </label>
            <label>
              <input
                type="radio"
                value="all"
                checked={signStatus === "all"}
                onChange={() => setsignStatus("all")}
              />
              &nbsp;Both&nbsp;
            </label>
          </strong>
        </div>
      </div>

    </div>
  )}

</div>



      <div style={{float:"center"}}>
      <table className="table table-striped table-scroll" style={{ marginTop: '53px' , textalign: 'center' , width: '100%' }}>
  <thead>
    <tr>
      <th>Priority</th>
      <th>Client Name</th>
      <th>ESL UCC</th>
      <th>Boss UCC</th>
      <th>Pan No.</th>
      <th>LocationID</th>
      <th>Closer Transfer</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>{filteredRecords()}</tbody>
</table>

        {loading && (
        <div className="loading-central-circle"></div>
      )}
      </div>
      </div>
    )}
  </div>
);
}
