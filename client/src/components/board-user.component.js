// import React, { Component } from "react";

// import UserService from "../services/user.service";
// import EventBus from "../common/EventBus";

// export default class BoardUser extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       content: ""
//     };
//   }

//   componentDidMount() {
//     UserService.getUserBoard().then(
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

// export default class BoardUser extends Component {
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
//       const filteredLedgerData = ledgerData.filter(ledger => currentUser.username === ledger.kslucc);
//       const filteredDpsohData = dpsohData.filter(dpsoh => currentUser.username === dpsoh.kslucc);
//       const filteredLetterData = letterData.filter(record => currentUser.username === record.kslucc);
  
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
//       </div>
//     );
//   }
// }











import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { Spinner } from "react-bootstrap"; // Importing Spinner from Bootstrap

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

export default class BoardUser extends Component {
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
      trialbal: [],
      isViewingRecord: false,
      hoveredDptype: "",
      mousePosition: { x: 0, y: 0 },
      searchValue: "",
      activeButton: null,
      dataFound: true,
      loading: false, // Added loading state
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
      const response = await fetch("http://183.182.84.228:4005/letter/");
      const letterData = await response.json();
      const filteredLetterData = letterData.filter(
        (record) =>
          currentUser.username === record.kslucc
      );
      this.setState({ letterData: filteredLetterData.length > 0 ? filteredLetterData : null  });
      this.setState({ activeButton: 'letter' });
    } catch (error) {
      window.alert(`An error occurred: ${error}`);
    }
    finally {
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
      trialbal: []
    });
  };

  handleViewDpsoh = async () => {
    try {
      this.setState({ loading: true });
      const currentUser = AuthService.getCurrentUser();
      const response = await fetch("http://183.182.84.228:4005/dpsoh/");
      const dpsohData = await response.json();
      const selectedDpsohData = dpsohData.filter(
        (item) => item.kslucc === currentUser.username
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
      const currentUser = AuthService.getCurrentUser();
      const response = await fetch("http://183.182.84.228:4005/ledger/");
      const ledgerData = await response.json();
      const selectedLedgerData = ledgerData.filter(
        (item) => item.ucc === currentUser.username
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
      const currentUser = AuthService.getCurrentUser();
      const response = await fetch("http://183.182.84.228:4005/mtfpo/");
      const mtfpoData = await response.json();
      const selectedMtfpoData = mtfpoData.filter(
        (item) => item.ucc === currentUser.username
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
      const currentUser = AuthService.getCurrentUser();
      const response = await fetch("http://183.182.84.228:4005/netpo/");
      const netpoData = await response.json();
      const selectedNetpoData = netpoData.filter(
        (item) => item.ucc === currentUser.username
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

  // handleViewPortfo = async () => {
  //   try {
  //     const currentUser = AuthService.getCurrentUser();
  //     const response = await fetch("http://183.182.84.228:4005/portfo/");
  //     const portfoData = await response.json();
  //     const selectedPortfoData = portfoData.filter(
  //       (item) => item.ucc === currentUser.username
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
  // };





  handleViewPortfo = async () => {
    try {
      this.setState({ loading: true });
      const currentUser = AuthService.getCurrentUser();
      const response = await fetch("http://183.182.84.228:4005/portfo/");
      const portfoData = await response.json();
      const selectedPortfoData = portfoData.filter(
        (item) => item.ucc === currentUser.username
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
      const currentUser = AuthService.getCurrentUser();
      const response = await fetch("http://183.182.84.228:4005/porteq/");
      const porteqData = await response.json();
      const selectedPorteqData = porteqData.filter(
        (item) => item.ucc === currentUser.username 
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
      const currentUser = AuthService.getCurrentUser();
      const response = await fetch("http://183.182.84.228:4005/portcom/");
      const portcomData = await response.json();
      const selectedPortcomData = portcomData.filter(
        (item) => item.ucc === currentUser.username
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






  handleViewNominee = async () => {
    try {
      const currentUser = AuthService.getCurrentUser();
      const response = await fetch("http://183.182.84.228:4005/nominee/");
      const nomineeData = await response.json();
      const selectedNomineeData = nomineeData.filter(
        (item) => item.kslucc === currentUser.username
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





  handleTrialBal = async () => {
    try {
      const currentUser = AuthService.getCurrentUser();
      const response = await fetch("http://183.182.84.228:4005/trialbal/");
      const trialbal = await response.json();
      const selectedTrialbalData = trialbal.filter(
        (item) => item.ks_ucc === currentUser.username
      );
      if (selectedTrialbalData.length > 0) {
        this.setState({ trialbal: selectedTrialbalData });
        this.setState({ activeButton: 'trialbal' });
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
      porteqData,
      portcomData,
      mtfpoData,
      netpoData,
      nomineeData,
      trialbal,
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

        
       
          <div>






{letterData &&  letterData.length > 0 &&(
          <div>
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
    <td>{(letterData[0].closer_trf)}</td>
    <td>{letterData[0].ucc }</td>
<td>{letterData[0].kslucc}</td>
<td>{letterData[0].clname }</td>
<td>{letterData[0].locationid}</td>
<td>{letterData[0].ks_panno}</td> 
<td>{letterData[0].ks_dprtcd}</td>
<td>{letterData[0].es_dprtcd}</td>  
<td>{letterData[0].ks_mobile}</td>   
<td>{letterData[0].ks_emailid}</td>   
<td>{letterData[0].es_dobdoi}</td>  
    </tr>
  </tbody>
</table>
<br/><br/>
          </div>
        )}





            
            <button onClick={this.getLetterData}>GENERAL</button>

            <button onClick={this.handleViewDpsoh}>DPSOH</button>
            
            
            <button onClick={this.handleViewLedger}>Balance</button>
            
            
            <button onClick={this.handleViewMtfpo}>Mtfpo</button>
           
            
            <button onClick={this.handleViewNetpo}>Open Position</button>
            
            
            <button onClick={this.handleViewPorteq}>Portfolio Equity</button>

            <button onClick={this.handleViewPortfo}>Portfolio F&O</button>

            <button onClick={this.handleViewPortcom}>Portfolio Comodity</button>

            <button onClick={this.handleTrialBal}>Trial Balance</button>
         
        
            {activeButton === 'letter' && letterData !== null &&  (
          <div>

            {letterData && nomineeData && (
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

        {/* <button onClick={() => this.generalExcel(letterData)}>
          Download General_Info Excel
        </button> */}
        
<table  class="1">
       <thead>
         <tr>
           <th>  </th>
           <th>KRA Status</th>
           <th>KRA Status Date</th>
           <th>KRA Describe</th>
         </tr>
       </thead>
       <tbody>
    
         <tr>
           <th>INFO.</th>
           <td>{(letterData[0].result || 'NA')}</td>
           <td>{(letterData[0].date|| 'NA')}</td>
           <td>{(letterData[0].describe || 'NA')}</td>
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
<td>{ letterData[0].es_nomn }</td>
<td>{ letterData[0].es_nompan }</td>
<td>{ letterData[0].es_nomshr }</td>
<td>{ letterData[0].es_relwapc }</td>
<td>{ letterData[0].ks_nomn }</td>
<td>{ letterData[0].ks_nompan }</td>
<td>{ letterData[0].ks_nomshr }</td>
<td>{ letterData[0].ks_relwapc }</td>
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
  <td>{(letterData[0].locnid)}</td>
  </tr>
  <tr>
  <th>Address: </th>
  <td>{letterData[0].coradd1}</td>
  </tr>
  {/* <tr>
  <th>Closer Transfer</th>
  <td>{(letterData[0].closer_trf)}</td>
  </tr> */}
  <tr>
  <th>Branch</th>
  <td>{(letterData[0].brcd)}</td>
  </tr>
  <tr>
  <th>Branch Name</th>
  <td>{(letterData[0].brname)}</td>
  </tr>
  <tr>
  <th>Family Group</th>
  <td>{(letterData[0].family_grp)}</td>
  </tr>
  <tr>
  <th>Kotak DPBO_ID</th>
  <td>{(letterData[0].ks_dpid)} - {letterData[0].ksdp_boid}</td>
  </tr>
  </table>

  <table  class="1"  style={{marginTop:"10px"}} >
  
  <tr >
    <th colSpan={2} style={{textAlign:"center"}}>Bank Information</th>
  
    </tr>
    <tr>
<th>Ks Bank A/c No.</th>
 <td>{letterData[0].bnkacno}</td>
</tr><tr>
<th>Ks MICR No.</th>
 <td>{letterData[0].micrno}</td>
</tr><tr>
<th>Ks IFSC Code</th>
 <td>{letterData[0].ifsc_cd}</td>
</tr><tr>
<th>Ks Bank Name</th>
 <td>{letterData[0].bnknm}</td>
</tr><tr>
<th>Ks Default Bank</th>
 <td>{letterData[0].defbnk}</td>
</tr><tr>
<th>Ks Bank A/c Type</th>
 <td>{letterData[0].acctype}</td>
</tr>

    </table>


    <table  class="1"  style={{marginTop:"10px"}} >
  
  <tr >
    <th colSpan={2} style={{textAlign:"center"}}>Virtual Bank Information</th>
  
    </tr>
    <tr>
<th>Virtual_Bank A/c No.</th>
 <td>{letterData[0].vir_bkacno}</td>
</tr><tr>
<th>Virtual Bank Name</th>
 <td>{letterData[0].vir_bknm}</td>
</tr><tr>
<th>Virtual Bank IFSC</th>
 <td>{letterData[0].vir_ifsc}</td>
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
  <td>{(letterData[0].kslucc)}</td>
  </tr> */}
  <tr>
  <th>Group Code: </th>
  <td>{(letterData[0].ks_essts)}</td>
  </tr>
  <tr>
  <th>Sub-Broker: </th>
  <td>{(letterData[0].ks_frchis)}</td>
  </tr>
  <tr>
  <th>Sub-Broker Code: </th>
  <td>{(letterData[0].ks_frccode)}</td>
  </tr>
  <tr>
  <th>R.M.: </th>
  <td>{(letterData[0].qc_status)}</td>
  </tr>
  <tr>
  <th>Dealer: </th>
  <td>{(letterData[0].ks_pndgsts)}</td>
  </tr>
  <tr>
  <th>Sales Rep.: </th>
  <td>{(letterData[0].ru_sts)}</td>
  </tr>
  <tr>
  <th>Running A/C: </th>
  <td>
  <th>F&O :</th>
  <td>{(letterData[0].kral_fno)}</td>
  <th>NSE : </th>
  <td>{(letterData[0].kral_ncm)}</td>
  </td>
  </tr>
  </table>

  
<table style={{marginTop:"10px"}}>
<tr >
  <th colSpan={6} style={{textAlign:"center"}}>Status</th>

  </tr>
  <tr>
          <th>KRA Status</th>
          <td>{letterData[0].ks_krasts}</td>   
          </tr><tr>
           <th>PTT Status</th>
           <td>{letterData[0].ks_pttsts}</td>
           </tr><tr>
          <th>KRA/PTT Reason</th>
          <td>{letterData[0].ks_krarem}</td>
  </tr>
  <tr>
<th>Kotak KRA/PTT e-mail Sent</th>
 <td>{letterData[0].ks_emsent}</td>
</tr><tr>
<th>Kotak PTT e-mail Recd</th>
 <td>{letterData[0].ks_emrecd}</td>
</tr><tr>
<th>Kotak KRA/PTT RM</th>
 <td>{letterData[0].ks_rm}</td>
</tr><tr>
<th>Kotak KRA/PTT e-mail Sent Remarks</th>
 <td>{letterData[0].ks_krptrem}</td>
</tr><tr>
<th>Kotak PF status</th>
 <td>{letterData[0].ksl_status}</td>
</tr><tr>
<th>Kotak PF Send Date</th>
 <td>{letterData[0].ksl_date}</td>
</tr>
<tr>
<th>Kotak Portfolio Complete DATE</th>
 <td>{letterData[0].kslstatus}</td>
</tr><tr>
<th>Kotak PF Remark</th>
 <td>{letterData[0].ksl_remk}</td>
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
  <td>{letterData[0].ks_bsecm}</td>
  <td>{ letterData[0].ks_nsecm}</td>
  <td>{ letterData[0].ks_nsefo}</td>
  <td>{ letterData[0].ks_nsecds}</td>
  <td>{ letterData[0].ks_mcx}</td>
  <td>{ letterData[0].ks_ncdex}</td>
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
<td>{ letterData[0].es_nomn }</td>
<td>{ letterData[0].es_nompan }</td>
<td>{ letterData[0].es_nomshr }</td>
<td>{ letterData[0].es_relwapc }</td>
<td>{ letterData[0].ks_nomn }</td>
<td>{ letterData[0].ks_nompan }</td>
<td>{ letterData[0].ks_nomshr }</td>
<td>{ letterData[0].ks_relwapc }</td>
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
            {/* <button onClick={() => this.dpsohExcel(dpsohData)}>
          Download DPSOH Excel
        </button> */}
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
            {/* <button onClick={() => this.balanceExcel(ledgerData)}>
          Download Balance Excel
        </button> */}
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
            {/* <button onClick={() => this.portfoExcel(portfoData)}>
          Download Portfolio Excel
        </button> */}
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
            {/* <button onClick={() => this.porteqExcel(porteqData)}>
          Download Portfolio Excel
        </button> */}
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
            {/* <button onClick={() => this.portcomExcel(portcomData)}>
          Download Portfolio Excel
        </button> */}
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
            {/* <button onClick={() => this.mtfpoExcel(mtfpoData)}>
          Download MTFpo Excel
        </button> */}
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
            {/* <button onClick={() => this.opExcel(netpoData)}>
          Download Open Position Excel
        </button> */}
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


{activeButton === 'trialbal' && trialbal !== null && (
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
      <th >_Location Cd(B1)</th>
                  <th >_BrCd(A)</th>
                  <th >Branch Name (A1)</th>
                  <th >LocationID (B)</th>
                  <th >ESL UCC (C)</th>
                  <th >KSL UCC(D)</th>
                  <th >Client Name(E)</th>
                  <th >LedgerBalance (With Ini+ExpMgn+Mtf)- (F)</th>
                  <th >MTF Funding Value -(F4)</th>
                  <th >Total Un Billed-(G)</th>
                  <th > Unclear Amt-(H)</th>
                  <th >Total Balance -(I=F+G+H-F4)</th>
                  <th >IniMgn-(J)+ExpMgn-(K)+AddlMgn-(L)</th>
                  <th >Net Value-M=I-(J+K+L)</th>
                  <th >Pledge Value P1&P3 (Normal Pledge)-(O)</th>
                  <th >Funded Pledge Todays Value P2(MTF)-(P)</th>
                  <th >Benificiary Holding Value-(Q)</th>
                  <th >MF,SGB,T-Bill Etc-(R)</th>
                  <th >Delivered Amt-(S)</th>
                  <th >Total Holding Value-(V=O+P+Q+R+S)</th>
                  <th >Net Holding Value-(W=V-M)</th>
                  <th >Net Margin based on Pledge-(X=O+P+R-F)</th>
                  <th >Auction Debit 150% -(N)</th>
                  <th >MCX Ledger balance -(F1)</th>
                  <th >NCDEX Ledger balance -(F2)</th>
                  <th >NSECDS Ledger balance -(F3)</th>
      </tr>
    </thead>
    <tbody>
            {trialbal.map((record) => (
            
           
      <tr >
                    <td>{record.locn_cd}</td>
                    <td>{record.brcd}</td>
                    <td>{record.brname}</td>
                    <td>{record.locn_id}</td>
                    <td>{record.eslucc}</td>
                    <td>{record.ks_ucc}</td>
                    <td>{record.clname}</td>
                    <td>{record.ledg_bal}</td>
                    <td>{record.mtf_fndbl}</td>
                    <td>{record.open_obl}</td>
                    <td>{record.unclr_cq}</td>
                    <td>{record.net_ledbal}</td>
                    <td>{record.tot_mgn}</td>
                    <td>{record.nlb_mgn}</td>
                    <td>{record.nrml_coll}</td>
                    <td>{record.mtf_fndstk}</td>
                    <td>{record.dpbo_hldg}</td>
                    <td>{record.mf_sgb_tb}</td>
                    <td>{record.delvd_amt}</td>
                    <td>{record.tot_soh}</td>
                    <td>{record.netmargin}</td>
                    <td>{record.nmgnboplg}</td>
                    <td>{record.auc_jv150}</td>
                    <td>{record.mcxledger}</td>
                    <td>{record.ncdledger}</td>
                    <td>{record.ncdsledger}</td>
      </tr>
      ))}
    </tbody>
  </table>
  
          </div>
          )}
          </div>
        
      </div>
    );
  }
}
