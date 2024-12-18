
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
  </tr>
);

export default class BoardModerator extends Component {
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
      const response = await fetch(`${process.env.URL}/letter/`);
      const letterData = await response.json();
      const filteredLetterData = letterData.filter(
        (record) =>
          currentUser.username === record.es_locnid &&
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
      const response = await fetch(`${process.env.URL}/record/`);
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
      const response = await fetch(`${process.env.URL}/diff/`);
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
      const response = await fetch(`${process.env.URL}/prio/`);
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
      const response = await fetch(`${process.env.URL}/esign/`);
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
      const response = await fetch(`${process.env.URL}/letter/`);
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
      const response = await fetch(`${process.env.URL}/letter/`);
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
            
            <button onClick={this.handleViewDpsoh}>View Closer Info</button>
            
            
            <button onClick={this.handleViewLedger}>View Difference</button>
            
            
            <button onClick={this.handleViewMtfpo}>View Priority</button>
           
            
            <button onClick={this.handleViewNetpo}>View Esign</button>
            
{/*             
            <button onClick={this.handleViewPortfo}>Al letter</button>
          */}
          
            {/* <button onClick={this.handleViewNominee}>Nominee</button> */}
            
            <button onClick={this.handleExitView}>Exit</button>


            {selectedRecord && (
          <div>
            <h3>Selected Record</h3>
            <p>Name: {selectedRecord.clname}</p>
            <p>Priority: {selectedRecord.priority}</p>
          </div>
        )}

        {activeButton === 'dpsoh' && dpsohData !== null && (
          <div>
           
              {!dataFound && (
                <div className="alert alert-warning" role="alert">
                  Data not found!
                </div>
              )}
                 {dpsohData.map((record) => (
              <div>
             
        <h3>Details for {selectedRecord.clname}</h3>
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
           <td>{(record.ucc|| 'NR')}</td>
           <td>{(record.clname|| 'NR')}</td>
           <td>{record.ks_krasts}</td>
           <td>{record.ks_krarem}</td>
           <td>{record.brname|| 'NR'}</td>
           <td>{(record.neoid||"Not alloted")},{(record.odinid||"Not alloted")}</td>
         </tr>
      
       </tbody>
     </table>
 
     <h4>Check POINT - KOTAK -1</h4>
     <table class="2">
     
       <thead>
         <tr>
         <th></th>
         <th>Client A/c Open In Kotak</th>
           <th colSpan="6">Segment activation in kotak</th>
           <th>Esl DP Mapped In Kotak</th>
           <th>No. of Esl DP Mapped In Kotak</th>
           <th>Location At Kotak</th>
         </tr>
         <tr>
           <th></th>
           <td></td>
           <th colspan="2">Cash</th>
           <th colspan="2">F&O</th>
           <th colspan="2">Others(cds,mcx,ncdex)</th>
           <th></th>
           <th></th>
           <th></th>
         </tr>
         <tr>
           <th></th>
           <td></td>
           <th>ESL</th>
           <th>KSL</th>
           <th>ESL</th>
           <th>KSL</th>
           <th>ESL</th>
           <th>KSL</th>
           <th></th>
           <th></th>
           <th></th>
         </tr>
       </thead>
       <tbody>
    
         <tr>
         <th>INFO.</th>
         <td>{(record.kslucc|| 'NR')}</td>
         <td>{(record.es_nsecm|| 'NR')}</td>
         <td>{(record.ks_nsecm|| 'NR')}</td>
           <td>{(record.es_nsefo|| 'NR')}</td>
           <td>{(record.ks_nsefo|| 'NR')}</td>
           <td>{(record.es_nsecds|| 'NR')},{(record.es_mcx|| 'NR')} , {(record.es_ncdex|| 'NR')}</td>
           <td>{(record.ks_nsecds|| 'NR')},{(record.ks_mcx|| 'NR')} , {(record.ks_ncdex|| 'NR')}</td>
           <td>{(record.esdp_map|| "Not MAP")}</td>
           <td>{(record.es_nodpac|| "Not MAP")}</td>
           <td>{(record.locationid|| 'NR')}</td>
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
       
<div>
         <tr>
           <th>INFO.</th>
           <td>{(record.es_ccol|| 'NO')}</td>
           <td>{record.es_corpact}</td>
           <td>{(record.es_pfreco|| 'NO')}</td>
           <td>{(record.es_dphldg|| 'NO')}</td>
           <td>{(record.es_pledval|| 'NO')}</td>
         </tr>
         <tr>
           <th>SIGN</th>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
         </tr>
         </div>

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
           <td>{(record.es_opnpos === 1 ? 'Yes' :'No' || '-')}</td>
           <td>{record.es_mtfpos === 1 ? "Yes" : "No" || '-'}</td>
           <td>{(record.es_dpledg|| 'NIL')}</td>
           <td>{(record.es_ledbal|| 'NIL')}</td>
           <td>{(record.es_lstrdt|| 'NIL')}</td>
           <td>{(record.es_margin||"NIL")}</td>
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
           {/* <button onClick={() => editRecord(record)}>Edit</button> */}
           {/* <button onClick={backToList} style={{position:"sticky", bottom:"0"}}>Back</button>
         <button onClick={(handlePrint)} style={{position:"sticky", bottom:"0"}}>Print</button>
  */}
           {/* Button for generating and downloading Excel for the specific record */}
           {/* <button onClick={() => generateAndDownloadExcelForView(record)} style={{position:"sticky", bottom:"0"}}>
             Generate and Download Excel
           </button>
  */}
           {/* <button onClick={backToList}>Back</button> */}
       </div>
                 ))}
          </div>
          
        )}

        {activeButton === 'ledger' && ledgerData !== null && (
          <div>
            {!dataFound && (
                <div className="alert alert-warning" role="alert">
                  Data not found!
                </div>
              )}
            <h3>Balance</h3>
            {ledgerData.map((record) => (
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
                 <button onClick={(handlePrint)} style={{position:"sticky", bottom:"0"}}>Print</button>
       
                 */}
                 {/* Button for generating and downloading Excel for the specific record */}
                 {/* <button onClick={() => generateAndDownloadExcelForView(record)} style={{position:"sticky", bottom:"0"}}>
                   Generate and Download Excel
                 </button> */}
       
                 {/* <button onClick={backToList}>Back</button> */}
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
            <h3>Portfolio</h3>
            {portfoData.map((record) => (

            <div>
         
       <h3>Priority Information Of {record.clname}</h3>
          {/* Displaying record details */}

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
          
          <td>{record.priority}</td>
          <td>{record.barcode}</td>
          <td>{record.ks_ucc}</td>
          <td>{record.es_ucc}</td>
          <td>{record.clname}</td>
          <td>{record.panno}</td>
          <td>{record.locnid}</td>
          <td>{record.ksdp_boid}</td>
          <td >{record.catg}</td>
          <td >{record.mobile}</td>
         
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
          
          <td>{record.ks_emtocl}</td>
          <td>{record.ks_esign}</td>
          <td>{record.ks_essts}</td>
        </tr>
      </tbody>
    </table>



    <h4>Remarks Status</h4>
    <table class="4" style={{border: "2px solid black"}}>
   
      <thead style={{border: "2px solid black"}}>
        <tr>
        <th>3i Status 1</th>
        <th>3i Status 2	</th>
        <th>Other Status	</th>
        <th>Multiple Email/Mobile	</th>
        <th>Kotak Remark(s)</th> 
        </tr>
      </thead>
      <tbody>
        <tr>
          
          <td>{record.sts1_3i}</td>
          <td>{record.sts2_3i}</td>
          <td>{record.ks_othsts}</td>
          <td>{record.mult_emmo}</td>
          <td>{record.ks_allrem}</td>
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
        
          <td>{record.es_clsts}</td>
          <td>{record.es_dphldg}</td>
          <td>{record.es_dpledg}</td>
          <td>{record.es_ledbal}</td>
          <td>{record.es_lstrdt}</td>
          <td>{record.ac_closed}</td>
          <td>{record.closer_trf}</td>
          <td>{record.brcd}</td>
          <td>{record.family_grp}</td>
         
        </tr>
      </tbody>
    </table>



          {/* Buttons for the specific record */}
          {/* <button onClick={() => editRecord(record)}>Edit</button> */}
          {/* <button onClick={backToList} style={{position:"sticky", bottom:"0"}}>Back</button>
          <button onClick={(handlePrint)} style={{position:"sticky", bottom:"0"}}>Print</button> */}

         
          {/* Button for generating and downloading Excel for the specific record */}
          {/* <button onClick={() => generateAndDownloadExcelForView(record)} style={{position:"sticky", bottom:"0"}}>
            Generate and Download Excel
          </button> */}

         
      </div>
            ))}
              </div>
            
    
         
        )}

{activeButton === 'mtfpo' && mtfpoData !== null && (
          <div>
            {!dataFound && (
                <div className="alert alert-warning" role="alert">
                  Data not found!
                </div>
              )}
              {mtfpoData.map((record) => (

             <div>
         
         <h3 style={{textAlign:"center"}}>E-Sign Information Of {record.clname}</h3>
            {/* Displaying record details */}
      {/* <h4>Personal</h4> */}
      <table class="4" style={{border: "2px solid black"}}>
     
        <thead style={{border: "2px solid black"}}>
          <tr>
          <th>Priority</th>
          <th>BarCode</th>
          <th>LocationID</th>
          <th>Branch</th>
          <th>Boss UCC</th>
            <th>ESL UCC</th>
            <th>Client Name</th>
            <th>Pan No.</th>
            
            <th>Category</th>
           
          </tr>
        </thead>
        <tbody>
          <tr>
            
            <td>{record.priority}</td>
            <td>{record.barcode}</td>
            <td>{record.locnid}</td>
            <td>{record.brcd}</td>
            <td>{record.kslucc}</td>
            <td>{record.ucc}</td>
            <td>{record.clname}</td>
            <td>{record.panno}</td>
            
            <td >{record.catg}</td>
           
          </tr>
        </tbody>
      </table>
  
  
  
      <h4 style={{textAlign:"center"}}>Status</h4>
      <table class="4" style={{border: "2px solid black"}}>
     
        <thead style={{border: "2px solid black"}}>
          <tr>
          <th>E-mail</th>
          <th>Mobile</th>
          <th>Date of Birth</th>   
          <th>UID</th>         
          </tr>
        </thead>
        <tbody>
          <tr>
            
            <td>{record.email}</td>
            <td>{record.mobile}</td>
            <td>{record.dob_doi}</td>
            <td>{record.uid}</td>
          </tr>
        </tbody>
      </table>
  
  
  
      <h4 style={{textAlign:"center"}}>Status</h4>
      <table class="4" style={{border: "2px solid black"}}>
     
        <thead style={{border: "2px solid black"}}>
          <tr>
          <th>KS_Email Sent To Client</th>
          <th>e-Sign Status</th>
          <th>e-Sign Faliure Remark</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            
            <td>{record.ks_email}</td>
            <td>{record.ks_esign}</td>
            <td>{record.ks_essts}</td>
          </tr>
        </tbody>
      </table>
  
  
  
      <h4 style={{textAlign:"center"}}>Status</h4>
      <table class="4" style={{border: "2px solid black"}}>
     
        <thead style={{border: "2px solid black"}}>
          <tr>
          <th>Cash Collatral</th>
            <th>Non Cash Collataral</th>
            <th>Pledge Value</th>
            <th>Es Last Trading Date</th>
            <th>Es Ledger Balance</th>
            <th>Es F&O Margin</th>
            <th>Open Position</th>
            <th>Es DP Ledger Balance</th>
            <th>Es TurnOver</th>
            <th>Net Brokerage</th>
       
           
          </tr>
        </thead>
        <tbody>
          <tr>
          
            <td>{record.cashcoll}</td>
            <td>{record.ncashcoll}</td>
            <td>{record.pledge_val}</td>
            <td>{record.es_lstrdt}</td>
            <td>{record.es_ledbal}</td>
            <td>{record.es_margin}</td>
            <td>{record.opnpos_nfo}</td>
            <td>{record.es_dpledg}</td>
            <td>{record.es_tovr}</td>
            <td>{record.es_netbkg}</td>
           
          </tr>
        </tbody>
      </table>
  
  
  
  
      <h4 style={{textAlign:"center"}}>Status</h4>
      <table class="4" style={{border: "2px solid black"}}>
     
        <thead style={{border: "2px solid black"}}>
          <tr>
          <th>ES_Email Sent To Client</th>
            <th>Es E-mail ID</th>
            <th>Es Email Sent Date</th>
            <th>e-Sign Faliure Remark</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          
            <td>{record.es_email}</td>
            <td>{record.es_mailid}</td>
            <td>{record.es_emsdt}</td>
            <td>{record.es_emssts}</td>
          </tr>
        </tbody>
      </table>
  
  
  
      <h4 style={{textAlign:"center"}}>Status</h4>
      <table class="4" style={{border: "2px solid black"}}>
     
        <thead style={{border: "2px solid black"}}>
          <tr>
          <th>ES DP Name</th>
            <th>Es DP PAN</th>
            <th>Es DP Share (%)</th>
            <th>Es DP Relationship</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          
            <td>{record.es_nomn}</td>
            <td>{record.es_nompan}</td>
            <td>{record.es_nomshr}</td>
            <td>{record.es_relwapc}</td>
          </tr>
        </tbody>
      </table>
  
  
            {/* Buttons for the specific record */}
            {/* <button onClick={() => editRecord(record)}>Edit</button> */}
            {/* <button onClick={backToList} style={{position:"sticky", bottom:"0"}}>Back</button>
            <button onClick={(handlePrint)} style={{position:"sticky", bottom:"0"}}>Print</button>
  
            */}
            {/* Button for generating and downloading Excel for the specific record */}
            {/* <button onClick={() => generateAndDownloadExcelForView(record)} style={{position:"sticky", bottom:"0"}}>
              Generate and Download Excel
            </button> */}
  
           
        </div>
              ))}
       </div>
          
        )}


{activeButton === 'netpo' && netpoData !== null && (
          <div>
            {!dataFound && (
                <div className="alert alert-warning" role="alert">
                  Data not found!
                </div>
              )}
            <h3>Open Position</h3>
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
            <h3>Ledger Data</h3>
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