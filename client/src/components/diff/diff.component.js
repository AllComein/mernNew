
import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import './diff.css'
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
  </tr>
);

export default class BoardDiff extends Component {
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

  componentDidMount() {
    this.getLetterData();
  }

  getLetterData = async () => {
    try {
      const currentUser = AuthService.getCurrentUser();
      const response = await fetch("http://183.182.84.228:4005/letter/");
      const letterData = await response.json();

      const allUsersResponse = await AuthService.getAllUsers();
        const currentUserDetails = allUsersResponse.find(user => user.username === currentUser.username);
          const viewableUsers = currentUserDetails.viewableUsers.split(',');
  
      const filteredLetterData = letterData.filter(
        (record) =>
          viewableUsers.includes(record.locnid) &&
          (record.clname.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
          record.kslucc.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
          record.ucc.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
          record.es_locnid.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
          record.ks_panno.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
          record.locationid.toLowerCase().includes(this.state.searchValue.toLowerCase()))
      );
      this.setState({ letterData: filteredLetterData.length > 0 ? filteredLetterData : null  });
    } catch (error) {
      window.alert(`An error occurred: ${error}`);
    }
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
      const response = await fetch("http://183.182.84.228:4005/record/");
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
  };
  

  handleViewLedger = async () => {
    try {
      const response = await fetch("http://183.182.84.228:4005/diff/");
      const ledgerData = await response.json();
      const selectedLedgerData = ledgerData.filter(
        (item) => item.kslucc === this.state.selectedRecord.kslucc
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
  };

  handleViewMtfpo = async () => {
    try {
      const response = await fetch("http://183.182.84.228:4005/prio/");
      const mtfpoData = await response.json();
      const selectedMtfpoData = mtfpoData.filter(
        (item) => item.ks_ucc === this.state.selectedRecord.kslucc
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
  };

  handleViewNetpo = async () => {
    try {
      const response = await fetch("http://183.182.84.228:4005/esign/");
      const netpoData = await response.json();
      const selectedNetpoData = netpoData.filter(
        (item) => item.ucc === this.state.selectedRecord.ucc
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
  };

  handleViewPortfo = async () => {
    try {
      const response = await fetch("http://183.182.84.228:4005/letter/");
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
  };

  handleViewNominee = async () => {
    try {
      const response = await fetch("http://183.182.84.228:4005/letter/");
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
  };

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
      dataFound
    } = this.state;

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>

        

        {isViewingRecord ? (
          <div>
            
            {/* <button onClick={this.handleViewDpsoh}>View Closer Info</button>
            
            
            <button onClick={this.handleViewLedger}>View Difference</button>
            
            
            <button onClick={this.handleViewMtfpo}>View Priority</button>
           
            
            <button onClick={this.handleViewNetpo}>View Esign</button>
             */}
{/*             
            <button onClick={this.handleViewPortfo}>Al letter</button>
          */}
          
            {/* <button onClick={this.handleViewNominee}>Nominee</button> */}
            
            <button onClick={this.handleExitView}>Exit</button>


            {selectedRecord && (
          <div>
          <table class="6">
<thead>
  <tr>
  <th>UCC </th>
<th>Kotak UCC</th>
<th>Client Name</th>
<th>LocationId</th>
<th>Pan</th>  
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
<td>{selectedRecord.ks_mobile}</td>   
<td>{selectedRecord.ks_emailid}</td>   
  </tr>
</tbody>
</table>
<br/><br/>
        </div>
        )}

{activeButton === 'portfo' && portfoData !== null && (
          <div>
         
                {!dataFound && (
                <div className="alert alert-warning" role="alert">
                  Data not found!
                </div>
              )}
            <h3>Portfolio</h3>
            {portfoData.map((record) => (

<div>
        
<h3>Details Of {record.clname}</h3>
   {/* Displaying record details */}
   
<table  class="1" style={{border: "2px solid black"}}>
<thead style={{border: "2px solid black"}}>
 <tr>
   <th>  </th>
   <th>Ucc</th>
   <th>Ksl_Ucc</th>
   <th>Name</th>
   <th>PANCARD</th>
   <th>Ks_LocationId</th>
   <th>Es_LocationCd</th>
   <th>Es_LocationId</th>
 </tr>
</thead>
<tbody >
 <tr>
   <th>INFO.</th>
   <td>{(record.ucc|| 'NR')}</td>
   <td>{(record.kslucc|| 'NR')}</td>
   <td>{(record.clname|| 'NR')}</td>
   <td>{record.ks_panno|| 'NR'}</td>
   <td>{record.locationid}</td>
   <td>{record.es_locncd}</td>
   <td>{record.es_locnid}</td>
   
 </tr>
</tbody>
</table>

   <h4>Mobile Status</h4>
<table class="2" style={{border: "2px solid black"}}>

<thead style={{border: "2px solid black"}}>
 <tr>
 <th>Mobile</th>
 <th>Kotak</th>
   <th>Exclusive</th>
   <th>Matching(Esl = Ksl)</th>
   <th>ESL_Back-office</th>
   <th>Matching(Esl = Esl_Bo)</th>
 </tr>
</thead>
<tbody>
 <tr>
 <th>INFO.</th>
 <td>{(record.ks_mobile|| 'NR')}</td>
 <td>{(record.es_mobile|| 'NR')}</td>
 <td style={{ backgroundColor: record.mtc_mobile === "No" ? '#e76161' : 'inherit' }}>{(record.mtc_mobile|| 'NR')}</td>
 <td>{record.bo_mobile}</td>
 <td style={{ backgroundColor: record.mtc_mobile === "No" ? '#e76161' : 'inherit' }}>{record.mtc_esbomo}</td>
 </tr>
</tbody>
</table>




<h4>Email Status</h4>
<table class="3" style={{border: "2px solid black"}}>

<thead style={{border: "2px solid black"}}>
 <tr>
   <th>Email-Id</th>
   <th>Kotak</th>
   <th>Exclusive</th>
   <th>Matching(Esl = Ksl)</th>
   <th>ESL_Back-office</th>
   <th>Matching(Esl = Esl_Bo)</th>
 </tr>
</thead>
<tbody>
 <tr>
   <th>INFO.</th>
   <td>{(record.ks_emailid|| "No")}</td>
   <td>{record.es_email}</td>
   <td style={{ backgroundColor: record.mtc_email === "No" ? '#e76161' : 'inherit' }}>{(record.mtc_email|| "No")}</td>
   <td>{record.bo_email}</td>
   <td style={{ backgroundColor: record.mtc_email === "No" ? '#e76161' : 'inherit' }}>{record.mtc_esboem}</td>
 </tr>
 
</tbody>
</table>


<h4>Nomine Status</h4>
<table class="4" style={{border: "2px solid black"}}>

<thead style={{border: "2px solid black"}}>
 <tr>
   <th>Nomine</th>
   <th>Kotak</th>
   <th>ksl_PAN</th>
   <th>ksl_share(%)</th>
   <th>ksl_relation</th>
   <th>Exclusive</th>
   <th>esl_PAN</th>
   <th>esl_share(%)</th>
   <th>esl_relation</th>
   <th>Matching(Esl = Ksl)</th>
  
 </tr>
</thead>
<tbody>
 <tr>
   <th>INFO.</th>
   <td>{record.ks_nomn}</td>
   <td>{record.ks_nompan}</td>
   <td>{record.ks_nomshr}</td>
   <td>{record.ks_relwapc}</td>
   <td>{record.es_nomn}</td>
   <td>{record.es_nompan}</td>
   <td>{record.es_nomshr}</td>
   <td>{record.es_relwapc}</td>
   <td style={{ backgroundColor: record.mtc_nomn === "No" ? '#e76161' : 'inherit' }}>{record.mtc_nomn}</td>
  
 </tr>
</tbody>
</table>

<h4>Segment Status</h4>
<table class="5" style={{border: "2px solid black"}}>
<thead style={{border: "2px solid black"}}>
 <tr>
   <th>INFO.</th>
   <th >Kotak</th>
   <th >Exclusive</th>
   <th>Matching(Ksl = Esl)</th>
   <th>Esl_Back-office</th>
   <th>Matching(Esl = Esl_Bo)</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <th>NSE CASH</th>
   
   <td>{(record.ks_nsecm)}</td>
   <td>{record.ensecm}</td>
   <td style={{ backgroundColor: record.mtc_nsecm === "No" ? '#e76161' : 'inherit' }}>{(record.mtc_nsecm)}</td>
   <td>{record.bo_nsecm}</td>
   <td style={{ backgroundColor: record.mtc_nsecm === "No" ? '#e76161' : 'inherit' }}>{record.mtc_boncm}</td>
   </tr>
   </tbody>

   <tbody style={{backgroundColor:"#e6e6e6"}}>
   <tr>
   <th>BSC CASH</th>
   <td>{(record.ks_bsecm|| 'NIL')}</td>
   <td>{(record.ebsecm|| 'NIL')}</td>
   <td style={{ backgroundColor: record.mtc_bsecm === "No" ? '#e76161' : 'inherit' }}>{(record.mtc_bsecm||"NIL")}</td>
   <td>{record.bo_bsecm}</td>
   <td style={{ backgroundColor: record.mtc_nsecm === "No" ? '#e76161' : 'inherit' }}>{record.mtc_bobcm}</td>
   </tr>
   </tbody>

   <tbody>
   <tr>
   <th>NSE F&O</th>
   <td>{(record.ks_nsefo||"NIL")}</td>
   <td>{(record.ensefo||"NIL")}</td>
   <td style={{ backgroundColor: record.mtc_nsefo === "No" ? '#e76161' : 'inherit' }}>{(record.mtc_nsefo||"NIL")}</td>
   <td>{record.bo_nsefo}</td>
   <td style={{ backgroundColor: record.mtc_nsecm === "No" ? '#e76161' : 'inherit' }}>{record.mtc_bonfo}</td>
   </tr>
   </tbody>


   <tbody style={{backgroundColor:"#e6e6e6"}}>
   <tr>
   <th>NSE CDS</th>
   <td>{(record.ks_nsecds||"NIL")}</td>
   <td>{(record.ensecds||"NIL")}</td>
   <td style={{ backgroundColor: record.mtc_nsecds === "No" ? '#e76161' : 'inherit' }}>{(record.mtc_nsecds||"NIL")}</td>
   <td>{record.bo_nsecds}</td>
   <td style={{ backgroundColor: record.mtc_nsecm === "No" ? '#e76161' : 'inherit' }}>{record.mtc_boncds}</td>
   </tr>
   </tbody>

   <tbody>
   <tr>
   <th>MCX</th>
   <td>{(record.ks_mcx||"NIL")}</td>
   <td>{(record.emcx||"NIL")}</td>
   <td style={{ backgroundColor: record.mtc_mcx === "No" ? '#e76161' : 'inherit' }}>{(record.mtc_mcx||"NIL")}</td>
   <td>{record.bo_mcx}</td>
   <td style={{ backgroundColor: record.mtc_nsecm === "No" ? '#e76161' : 'inherit' }}>{record.mtc_bomcx}</td>
   </tr>
   </tbody>


   <tbody style={{backgroundColor:"#e6e6e6"}}>
 <tr>
 <th>NCDEX</th>
   <td>{(record.ks_ncdex||"NIL")}</td>
   <td>{(record.encdex||"NIL")}</td>
   <td style={{ backgroundColor: record.mtc_ncdx === "No" ? '#e76161' : 'inherit' }}>{(record.mtc_ncdx||"NIL")}</td>
   <td>{record.bo_ncdex}</td>
   <td style={{ backgroundColor: record.mtc_nsecm === "No" ? '#e76161' : 'inherit' }}>{record.mtc_boncdx}</td>
  
 </tr>
 </tbody>

   </table>




   {/* <table>
     <thead>
   <tr>
   <th>BSC CASH</th>
   <th>Kotak</th>
   <th>Exclusive</th>
   <th>Matching(Ksl = Esl)</th>
   <th>Back-office</th>
   <th>Matching(Esl = Esl_Bo)</th>
   </tr>
   
   </thead>
   <tbody>
   <tr>
   <th>INFO.</th>
   <td>{(record.ks_bsecm|| 'NIL')}</td>
   <td>{(record.ebsecm|| 'NIL')}</td>
   <td style={{ backgroundColor: record.mtc_bsecm === "No" ? '#e76161' : 'inherit' }}>{(record.mtc_bsecm||"NIL")}</td>
   <td>{record.bo_bsecm}</td>
   <td style={{ backgroundColor: record.mtc_nsecm === "No" ? '#e76161' : 'inherit' }}>{record.mtc_bobsec}</td>
   </tr>
   </tbody>
   </table> */}
   {/* <table>
     <thead>
   <tr>
   <th>NSE F&O</th>
   <th>Kotak</th>
   <th>Exclusive</th>
   <th>Matching(Ksl = Esl)</th>
   <th>Back-office</th>
   <th>Matching(Esl = Esl_Bo)</th>
   </tr>
   
   </thead>
   <tbody>
   <tr>
   <th>INFO.</th>
   <td>{(record.ks_nsefo||"NIL")}</td>
   <td>{(record.ensefo||"NIL")}</td>
   <td style={{ backgroundColor: record.mtc_nsefo === "No" ? '#e76161' : 'inherit' }}>{(record.mtc_nsefo||"NIL")}</td>
   <td>{record.bo_nsefo}</td>
   <td style={{ backgroundColor: record.mtc_nsecm === "No" ? '#e76161' : 'inherit' }}>{record.mtc_bonsef}</td>
   </tr>
   </tbody>
   </table> */}
   {/* <table>
     <thead>
   <tr>
   <th>NSE CDS</th>
   <th>Kotak</th>
   <th>Exclusive</th>
   <th>Matching(Ksl = Esl)</th>
   <th>Back-office</th>
   <th>Matching(Esl = Esl_Bo)</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <th>INFO.</th>
   <td>{(record.ks_nsecds||"NIL")}</td>
   <td>{(record.ensecds||"NIL")}</td>
   <td style={{ backgroundColor: record.mtc_nsecds === "No" ? '#e76161' : 'inherit' }}>{(record.mtc_nsecds||"NIL")}</td>
   <td>{record.bo_nsecds}</td>
   <td style={{ backgroundColor: record.mtc_nsecm === "No" ? '#e76161' : 'inherit' }}>{record.mtc_bonse2}</td>
   </tr>
   </tbody>
   </table> */}
   {/* <table>
     <thead>
   <tr>
   <th>MCX</th>
   <th>Kotak</th>
   <th>Exclusive</th>
   <th>Matching(Ksl = Esl)</th>
   <th>Back-office</th>
   <th>Matching(Esl = Esl_Bo)</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <th>INFO.</th>
   <td>{(record.ks_mcx||"NIL")}</td>
   <td>{(record.emcx||"NIL")}</td>
   <td style={{ backgroundColor: record.mtc_mcx === "No" ? '#e76161' : 'inherit' }}>{(record.mtc_mcx||"NIL")}</td>
   <td>{record.bo_mcx}</td>
   <td style={{ backgroundColor: record.mtc_nsecm === "No" ? '#e76161' : 'inherit' }}>{record.mtc_bomcx}</td>
   </tr>
   </tbody>
   </table> */}
   {/* <table>
     <thead>
   <tr>
   <th>NCDEX</th>
   <th>Kotak</th>
   <th>Exclusive</th>
   <th>Matching(Ksl = Esl)</th>
   <th>Back-office</th>
   <th>Matching(Esl = Esl_Bo)</th>
   
 </tr>
</thead>
<tbody>
 <tr>
 <th>INFO.</th>
   <td>{(record.ks_ncdex||"NIL")}</td>
   <td>{(record.encdex||"NIL")}</td>
   <td style={{ backgroundColor: record.mtc_ncdx === "No" ? '#e76161' : 'inherit' }}>{(record.mtc_ncdx||"NIL")}</td>
   <td>{record.bo_ncdex}</td>
   <td style={{ backgroundColor: record.mtc_nsecm === "No" ? '#e76161' : 'inherit' }}>{record.mtc_boncdx}</td>
  
 </tr>
 </tbody>
</table> */}

{/* 
<button onClick={() => setShowCheckpoint6(!showCheckpoint6)}>
Check Point - CLOSER PROCDURED - 5
</button>
{showCheckpoint6 && (


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
)} */}


   {/* Buttons for the specific record */}
   {/* <button onClick={() => editRecord(record)}>Edit</button> */}
   {/* <button onClick={backToList} style={{position:"sticky", bottom:"0"}}>Back</button>
   <button onClick={(handlePrint)} style={{position:"sticky", bottom:"0"}}>Print</button> */}

  
   {/* Button for generating and downloading Excel for the specific record */}
   {/* <button onClick={() => generateAndDownloadExcelForView(record)} style={{position:"sticky", bottom:"0"}}>
     Generate and Download Excel
   </button> */}

   {/* <button onClick={backToList}>Back</button> */}
</div>
            ))}
              </div>
            
    
         
        )}
          </div>
        ) : (
          <div>
            <h3>Esl Kotak Difference</h3>
            <input
          type="text"
          placeholder="Search..."
          value={this.state.searchValue}
          onChange={this.handleSearchChange}
        />
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {letterData.map((record, index) => (
                  <Record key={index} record={record} onView={this.handleView} />
                ))}
              </tbody>
            </table>
            

          </div>
        )}

        
      </div>
    );
  }
}