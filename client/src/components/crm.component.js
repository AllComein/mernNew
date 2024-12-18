import React, { Component } from "react";
import AuthService from "../services/auth.service";


export default class BoardCrm extends Component {
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
      const response = await fetch("http://183.182.84.228:4005/crm/");
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
        <th>SNO</th>
<th>DATE</th>
<th>Client_code</th>
<th>Client_Name</th>
<th>DP</th>
<th>Updation_type</th>
<th>Query_ID</th>
<th>Query_Status</th>
<th>Docs_Status</th>
<th>Processed_by </th>
<th>POD</th>
<th>Courier</th>
<th>Final_remarks</th>

        </tr>
      </thead>
      <tbody>
      {letterData.map((record, index) => (
                  <tr key={index}>
                    <td>{record.SNO}</td>
<td>{record.DATE}</td>
<td>{record.Client_code}</td>
<td>{record.Client_Name}</td>
<td>{record.DP}</td>
<td>{record.Updation_type}</td>
<td>{record.Query_ID}</td>
<td>{record.Query_Status}</td>
<td>{record.Docs_Status}</td>
<td>{record.Processed_by }</td>
<td>{record.POD}</td>
<td>{record.Courier}</td>
<td>{record.Final_remarks}</td>

                  </tr>
                ))}
      </tbody>
    </table>
    <br/><br/>
              </div>
            )
          ) : (
            <p>Data is not available in Agein Liquidation.</p>
          )}
        </div>
      </div>
    );
  }
  
}
