import React, { Component } from "react";
import AuthService from "../services/auth.service";


export default class BoardCrms extends Component {
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

  // getLetterData = async () => {
  //   try {
  //     const currentUser = AuthService.getCurrentUser();
  //     const response = await fetch("http://183.182.84.228:4005/crm/");
  //     const letterData = await response.json();
  //     const filteredLetterData = letterData.filter(
  //       (record) =>
  //         currentUser.username === record.locnid
  //     );
  //     if (filteredLetterData.length > 0) {
  //       this.setState({ letterData: filteredLetterData, dataFound: true });
  //     } else {
  //       this.setState({ letterData: null, dataFound: false });
  //     }
  //   } catch (error) {
  //     window.alert(`An error occurred: ${error}`);
  //   }
  // };










  getLetterData = async () => {
    try {
      const currentUser = AuthService.getCurrentUser();
      const allUsersResponse = await AuthService.getAllUsers();
      const currentUserDetails = allUsersResponse.find(user => user.username === currentUser.username);

      // If current user is found, proceed
      if (currentUserDetails) {
        // Get the viewableUsers for the current user
        const viewableUsers = currentUserDetails.viewableUsers.split(',');
        // Fetch letter data
        const response = await fetch("http://183.182.84.228:4005/crm/");
        const letterData = await response.json();
  
        // Filter letter data based on viewableUsers (locnid should match one of the viewable usernames)
        const filteredLetterData = letterData.filter(record =>
          viewableUsers.includes(record.locnid)
        );
        // Update state based on filtered letter data
        if (filteredLetterData.length > 0) {
          this.setState({ letterData: filteredLetterData, dataFound: true });
        } else {
          this.setState({ letterData: null, dataFound: false });
        }
      } else {
        // Handle the case where current user is not found in allUsersResponse
        window.alert("Current user not found in the user list");
      }
    } catch (error) {
      window.alert(`An error occurred: ${error.message}`);
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
