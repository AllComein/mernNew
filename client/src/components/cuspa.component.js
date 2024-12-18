import React, { Component } from "react";
import AuthService from "../services/auth.service";


export default class BoardLiqu extends Component {
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
      const response = await fetch("http://183.182.84.228:4005/cuspa/");
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
                <table class="table table-striped table-scroll">
      <thead>
        <tr>
        <th>ClientCode</th>
<th>Clientlocation</th>
<th>ClientName</th>
<th>ComscripCode</th>
<th>ISIN</th>
<th>BalanceQty</th>
<th>Rate</th>
<th>Value</th>
<th>TransferType</th>
<th>Franch_ID</th>

        </tr>
      </thead>
      <tbody>
      {letterData.map((record, index) => (
                  <tr key={index}>
                    <td>{record.ClientCode}</td>
<td>{record.Clientlocation}</td>
<td>{record.ClientName}</td>
<td>{record.ComscripCode}</td>
<td>{record.ISIN}</td>
<td>{record.BalanceQty}</td>
<td>{record.Rate}</td>
<td>{record.Value}</td>
<td>{record.TransferType}</td>
<td>{record.Franch_ID}</td>

                  </tr>
                ))}
      </tbody>
    </table>
    <br/><br/>
              </div>
            )
          ) : (
            <p>Data is not available in CUSPA.</p>
          )}
        </div>
      </div>
    );
  }
  
}
