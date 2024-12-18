import React, { Component } from "react";
import AuthService from "../services/auth.service";


export default class BoardPtt extends Component {
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

//   handleHover = (event, dptype) => {
//     this.setState({
//       hoveredDptype: dptype,
//       mousePosition: { x: event.clientX, y: event.clientY },
//     });
//   };

//   handleMouseLeave = () => {
//     this.setState({ hoveredDptype: "" });
//   };

  componentDidMount() {
    this.getLetterData();
  }

  getLetterData = async () => {
    try {
      const response = await fetch("http://183.182.84.228:4005/ptt/");
      const letterData = await response.json();
      if (letterData.length > 0) {
        this.setState({ letterData: letterData, dataFound: true });
      } else {
        this.setState({ letterData: null, dataFound: false });
      }
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

//   handleViewDpsoh = async () => {
//     try {
//       const currentUser = AuthService.getCurrentUser();
//       const response = await fetch("http://183.182.84.228:4005/dpsoh/");
//       const dpsohData = await response.json();
//       const selectedDpsohData = dpsohData.filter(
//         (item) => item.kslucc === currentUser.username
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
  




//   handleExitView = () => {
//     this.setState({ isViewingRecord: false });
//   };

//   handleSearchChange = (event) => {
//     this.setState({ searchValue: event.target.value }, this.getLetterData);
//   };

render() {
    const {
      letterData,
      dataFound
    } = this.state;
  
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
  
        <div>
          {dataFound ? (
            letterData && letterData.length > 0 && (
                <div>
                <table class=" table table-striped table-scroll" style={{marginTop:'10px'}}>
      <thead>
      <tr>
      <th colSpan={6} style={{textAlign:"center"}}>Client Information</th>
          <th colSpan={4} style={{textAlign:"center"}}>Current Status</th>
          <th colSpan={4} style={{textAlign:"center"}}>As On Status</th>
          <th colSpan={2} style={{textAlign:"center"}}>Matching</th>
        </tr>
        <tr>
        <th>ESL UCC</th>
        <th>Branch</th>
        <th>KSL Ucc</th>
        <th>Client Name</th>
        <th>Location Id</th>
        <th>Pan No</th>
        <th>Date</th>
        <th>Kra Status</th>
        <th>Permitted to Trd Sts</th>
        <th>Remarks</th>
        <th>Date</th>
        <th>KRA Status</th>
        <th>Permitted to Trd Status</th>
        <th>Remarks</th>
        <th>KRA </th>
        <th>PTT</th>
        </tr>
      </thead>
      <tbody>
      {letterData.map((record, index) => (
                  <tr key={index}>
                   <td>{record.ucc}</td>
                  <td>{record.brcd}</td>
                  <td>{record.kslucc}</td>
                  <td>{record.clname}</td>
                  <td>{record.locncd}</td>
                  <td>{record.pan_no}</td>
                  <td>{record.krapttdt1}</td>
                  <td>{record.krasts1}</td>
                  <td>{record.cpttsts1}</td>
                  <td>{record.krapttrem1}</td>
                  <td>{record.krapttdtlu}</td>
                  <td>{record.krastslu}</td>
                  <td>{record.cpttstslu}</td>
                  <td>{record.krapttrlu}</td>
                  <td>{record.kramatch}</td>
                  <td>{record.pttmatch}</td>
                  </tr>
                ))}
      </tbody>
    </table>
    <br/><br/>
              </div>
            )
          ) : (
            <p>Data is not available in Sebi Payout.</p>
          )}
        </div>
      </div>
    );
  }
  
}
