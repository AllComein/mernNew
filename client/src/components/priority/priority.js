import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import './priority.css'

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
  const [closerTrfStatus, setCloserTrfStatus] = useState("notDone"); // Default to show all records
  const [isOpen, setIsOpen] = useState(false);
  const [kslStatus, setkslStatus] = useState("notDone"); // Default to show all records
  const [secondSearchTerm, setsecondSearchTerm] = useState("");
  const [MobileStatus, setMobileStatus] = useState("all"); // Default to show all records
  const [viewDetails, setViewDetails] = useState(null);
  const [NomStatus, setnomStatus] = useState("all");
  const [SegmentStatus, setsegmentStatus] = useState("all");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [barStatus, setbarStatus] = useState("all");
  const [emailStatus, setemailStatus] = useState("all");
  const [signStatus, setsignStatus] = useState("notDone");
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
  useEffect(() => {
    async function getRecords() {
      try {
        setLoading(true); // Set loading to true before starting the fetch
        const response = await fetch(`http://183.182.84.228:4005/prio/`);
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
      <button className="dropbtn" > &nbsp; Priority Type ? &nbsp;</button>
      <div className="dropdown-content">
      <strong>
        
      <label style={{color:"IndianRed"}}>
      
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
        {/* <label>
        
          <input
            type="checkbox"
            checked={isPrioritySelected("")}
            onChange={() => handlePriorityChange("")}
          />
          &nbsp; Blank&nbsp;&nbsp;
        </label> */}
        </strong>
      </div>
    </div>













       
<div className="dropdown">
      <button className="dropbtn" > Kotak Account Done ? </button>
      <div className="dropdown-content">
      <strong>
        
      <label>
      <input
              type="radio"
              value="done"
              checked={kslStatus === "done"}
              onChange={() => setkslStatus("done")}
            />
            &nbsp;Yes &nbsp;
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
            &nbsp;No &nbsp;
          </label>
          <label>
            <input
              type="radio"
              value="all"
              checked={kslStatus === "all"}
              onChange={() => setkslStatus("all")}
            />
            &nbsp;Both &nbsp;
          </label>
        </strong>
      </div>
    </div>
    


    {kslStatus === "notDone" || "all" && (
    <div style={{marginTop:"38px"}}>
      <div className="dropdown">
      <button className="dropbtn" >Closer Transfer Done ?</button>
      <div className="dropdown-content">
      <strong>
        
      <label>
      <input
              type="radio"
              value="done"
              checked={closerTrfStatus === "done"}
              onChange={() => setCloserTrfStatus("done")}
            />
            &nbsp;Yes &nbsp;
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
            &nbsp;No &nbsp;
          </label>
          <label>
            <input
              type="radio"
              value="all"
              checked={closerTrfStatus === "all"}
              onChange={() => setCloserTrfStatus("all")}
            />
            &nbsp;Both &nbsp;
          </label>
        </strong>
      </div>
    </div>






    <div className="dropdown">
      <button className="dropbtn" > &nbsp;&nbsp; Bar Code Visible? &nbsp;&nbsp;</button>
      <div className="dropdown-content">
      <strong>
        
      <label>
      <input
              type="radio"
              value="done"
              checked={barStatus === "done"}
              onChange={() => setbarStatus("done")}
            />
            &nbsp;Yes &nbsp;
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
            &nbsp;No &nbsp;
          </label>
          <label>
            <input
              type="radio"
              value="all"
              checked={barStatus === "all"}
              onChange={() => setbarStatus("all")}
            />
            &nbsp;Both &nbsp;
          </label>
        </strong>
      </div>
    </div>







    <div className="dropdown">
      <button className="dropbtn" >  Ks Email Sent to Client Done ? </button>
      <div className="dropdown-content">
      <strong>
        
      <label>
      <input
              type="radio"
              value="done"
              checked={emailStatus === "done"}
              onChange={() => setemailStatus("done")}
            />
            &nbsp;Yes &nbsp;
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
            &nbsp;No &nbsp;
          </label>
          <label>
            <input
              type="radio"
              value="all"
              checked={emailStatus === "all"}
              onChange={() => setemailStatus("all")}
            />
            &nbsp;Both &nbsp;
          </label>
        </strong>
      </div>
    </div>







    <div className="dropdown">
      <button className="dropbtn" >	Ks e-Sign Status Success ? </button>
      <div className="dropdown-content">
      <strong>
        
      <label>
      <input
              type="radio"
              value="done"
              checked={signStatus === "done"}
              onChange={() => setsignStatus("done")}
            />
            &nbsp;&nbsp;Yes &nbsp;
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
            &nbsp;No &nbsp;
          </label>
          <label>
            <input
              type="radio"
              value="all"
              checked={signStatus === "all"}
              onChange={() => setsignStatus("all")}
            />
            &nbsp;Both &nbsp;
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
