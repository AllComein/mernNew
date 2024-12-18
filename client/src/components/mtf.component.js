import React, { Component } from "react";
import AuthService from "../services/auth.service";


export default class BoardMtf extends Component {
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
      const currentUser = AuthService.getCurrentUser();
      const response = await fetch("http://183.182.84.228:4005/mtf/");
      const letterData = await response.json();
      const filteredLetterData = letterData.filter(
        (record) =>
          currentUser.username === record.locnid
      );
      if (filteredLetterData.length > 0) {
        this.setState({ letterData: filteredLetterData, dataFound: true });
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
                <table class="table table-striped table-scroll">
      <thead>
        <tr>
        <th>Symbol</th>
<th>code</th>
<th>Location</th>
<th>ISIN</th>
<th>Final_Qty</th>
<th>Cost</th>
<th>Final_Value</th>
<th>Status_8#35_am</th>
<th>MAIN_CODE</th>
<th>AP_NAME</th>
<th>Updated Date</th>
<th>locationID</th> 
        </tr>
      </thead>
      <tbody>
      {letterData.map((record, index) => (
                  <tr key={index}>
                    <td>{record.Symbol}</td>
                    <td>{record.code}</td>
                    <td>{record.Location}</td>
                    <td>{record.ISIN}</td>
                    <td>{record.Final_Qty}</td>
                    <td>{record.Cost}</td>
                    <td>{record.Final_Value}</td>
                    <td>{record.Status_835_am}</td>
                    <td>{record.MAIN_CODE}</td>
                    <td>{record.AP_NAME}</td>
                    <td>{record.run_date}</td>
                    <td>{record.locnid}</td>
                  </tr>
                ))}
      </tbody>
    </table>
    <br/><br/>
              </div>
            )
          ) : (
            <p>Data is not available in Pending for Pledgor.</p>
          )}
        </div>
      </div>
    );
  }
  
}
