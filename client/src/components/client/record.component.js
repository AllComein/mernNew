



import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import './record.css'
import { Spinner } from "react-bootstrap";
const Record = (props) => (
  <tr key={props.record.id}>
    <td>{props.record.clname}</td>
    <td>{props.record.priority}</td>
    <td>{props.record.ucc}</td>
    <td>{props.record.kslucc}</td>
    <td>{props.record.panno}</td>
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

export default class BoardRecord extends Component {
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
      loading: false,
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
        this.setState({ loading: true });
      const currentUser = AuthService.getCurrentUser();
      const response = await fetch("http://183.182.84.228:4005/record/");
      const letterData = await response.json();
      const filteredLetterData = letterData.filter(
        (record) =>
          // currentUser.username === record.es_locnid &&
          (record.clname.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
          record.kslucc.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
          record.ucc.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
          record.es_locnid.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
          record.panno.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
          record.locationid.toLowerCase().includes(this.state.searchValue.toLowerCase()))
      );
      this.setState({ letterData: filteredLetterData.length > 0 ? filteredLetterData : null });
    } catch (error) {
      window.alert(`An error occurred: ${error}`);
    }finally {
        this.setState({ loading: false }); // Set loading to false when data fetching completes
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
      isViewingRecord,
      loading
    } = this.state;

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>

        

        {isViewingRecord ? (
          <div>
            
            <button onClick={this.handleExitView}>Exit</button>
            <button className="print-hidden" onClick={window.print}>Print</button>


            {selectedRecord && (
          <div>
          {/* <table class="6">
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
</table> */}
<br/><br/>
        {/* </div>
        )}

        { dpsohData !== null && (
          <div>
           
              {!dataFound && (
                <div className="alert alert-warning" role="alert">
                  Data not found!
                </div>
              )}
                 {letterData.map((record) => (
              <div> */}
             
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
           <td>{(selectedRecord.ucc|| 'NR')}</td>
           <td>{(selectedRecord.clname|| 'NR')}</td>
           <td>{selectedRecord.ks_krasts}</td>
           <td>{selectedRecord.ks_krarem}</td>
           <td>{selectedRecord.brname|| 'NR'}</td>
           <td>{(selectedRecord.neoid||"Not alloted")},{(selectedRecord.odinid||"Not alloted")}</td>
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
        <td>{(selectedRecord.kslucc|| 'NR')}</td>
        <td>{(selectedRecord.es_nsecm )}</td>
        <td>{(selectedRecord.ks_nsecm|| 'NR')}</td>
        <td>{(selectedRecord.ptt_nsecm|| 'NR')}</td>
          <td>{(selectedRecord.es_nsefo|| 'NR')}</td>
          <td>{(selectedRecord.ks_nsefo|| 'NR')}</td>
          <td>{(selectedRecord.ptt_nsefo|| 'NR')}</td>
          <td>{(selectedRecord.es_nsecds|| 'NR')},{(selectedRecord.es_mcx|| 'NR')} , {(selectedRecord.es_ncdex|| 'NR')}</td>
          <td>{(selectedRecord.ks_nsecds|| 'NR')},{(selectedRecord.ks_mcx|| 'NR')} , {(selectedRecord.ks_ncdex|| 'NR')}</td>
          <td>{(selectedRecord.ptt_nsecds|| 'NR')},{(selectedRecord.ptt_mcx|| 'NR')} , {(selectedRecord.ptt_ncdex|| 'NR')}</td>
          <td>{(selectedRecord.esdp_map|| "Not MAP")}</td>
          <td>{(selectedRecord.es_nodpac|| "Not MAP")}</td>
          <td>{(selectedRecord.locationid|| 'NR')}</td>
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
           <td>{(selectedRecord.es_ccol|| 'NO')}</td>
           <td>{selectedRecord.es_corpact}</td>
           <td>{(selectedRecord.es_pfreco|| 'NO')}</td>
           <td>{(selectedRecord.es_dphldg|| 'NO')}</td>
           <td>{(selectedRecord.es_pledval|| 'NO')}</td>
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
           <td>{(selectedRecord.es_opnpos === 1 ? 'Yes' :'No' || '-')}</td>
           <td>{selectedRecord.es_mtfpos === 1 ? "Yes" : "No" || '-'}</td>
           <td>{(selectedRecord.es_dpledg|| 'NIL')}</td>
           <td>{(selectedRecord.es_ledbal|| 'NIL')}</td>
           <td>{(selectedRecord.es_lstrdt|| 'NIL')}</td>
           <td>{(selectedRecord.es_margin||"NIL")}</td>
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
   
        )}
          </div>
        ) : (
          <div>
             <h3>Closer Information List</h3>
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
                  <th>PAN Number</th>
                  <th>LocationID</th>
                  <th>Closer_TRF</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {letterData ? letterData.map((record, index) => (
  <Record key={index} record={record} onView={this.handleView} />
)) : null}

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