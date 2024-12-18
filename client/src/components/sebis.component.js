import React, { Component } from "react";
import AuthService from "../services/auth.service";


export default class BoardSebis extends Component {
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
  //     const response = await fetch("http://183.182.84.228:4005/sebi/");
  //     const letterData = await response.json();


  //     const filteredLetterData = letterData.filter((record) => {
  //       if (currentUser.username === "E640") {
  //         return ["E640", "E641", "E642", "E643"].includes(record.locnid);
  //       } else {
  //         return currentUser.username === record.locnid;
  //       }
  //     });


  //     // const filteredLetterData = letterData.filter(
  //     //   (record) =>
  //     //     currentUser.username === record.locnid
  //     // );
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
        const response = await fetch("http://183.182.84.228:4005/sebi/");
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
        <th>ClientId</th>
        <th>cl_name</th>
        <th>NetBal</th>
        <th>group_id</th>
        <th>Location</th>
        <th>FmlyCount</th>
        <th>FmlyBal</th>
        <th>FirstCrBalDt</th>
        <th>FirstCrBal</th>
        <th>AsOnDate</th>
        <th>AsOnBal</th>
        <th>InitialMarg</th>
        <th>UnBilledVallanDr</th>
        <th>NetCr</th>
        <th>SettlDrBal</th>
        <th>SettlDate</th>
        <th>MF</th>
        <th>Collateral</th>
        <th>LatestRectPay</th>
        <th>CashMargin</th>
        <th>NetReceipt</th>
        <th>ProvInterest</th>
        <th>ProvDPCharges</th>
        <th>BSESTARMFOpeningbalance</th>
        <th>BSESTARMFSIPdueAmount</th>
        <th>BSESTARMFNetopeningBalance</th>
        <th>SharePledge_repledge</th>
        <th>FO</th>
        <th>CDS</th>
        <th>MCX</th>
        <th>NCDEX</th>
        <th>Column1</th>
        <th>RAL</th>
        <th>locnid</th>

        </tr>
      </thead>
      <tbody>
      {letterData.map((record, index) => (
                  <tr key={index}>
                    <td>{record.ClientId}</td>
                    <td>{record.cl_name}</td>
                    <td>{record.NetBal}</td>
                    <td>{record.group_id}</td>
                    <td>{record.Location}</td>
                    <td>{record.FmlyCount}</td>
                    <td>{record.FmlyBal}</td>
                    <td>{record.FirstCrBalDt}</td>
                    <td>{record.FirstCrBal}</td>
                    <td>{record.AsOnDate}</td>
                    <td>{record.AsOnBal}</td>
                    <td>{record.InitialMarg}</td>
                    <td>{record.UnBilledVallanDr}</td>
                    <td>{record.NetCr}</td>
                    <td>{record.SettlDrBal}</td>
                    <td>{record.SettlDate}</td>
                    <td>{record.MF}</td>
                    <td>{record.Collateral}</td>
                    <td>{record.LatestRectPay}</td>
                    <td>{record.CashMargin}</td>
                    <td>{record.NetReceipt}</td>
                    <td>{record.ProvInterest}</td>
                    <td>{record.ProvDPCharges}</td>
                    <td>{record.BSESTARMFOpeningbalance}</td>
                    <td>{record.BSESTARMFSIPdueAmount}</td>
                    <td>{record.BSESTARMFNetopeningBalance}</td>
                    <td>{record.SharePledge_repledge}</td>
                    <td>{record.FO}</td>
                    <td>{record.CDS}</td>
                    <td>{record.MCX}</td>
                    <td>{record.NCDEX}</td>
                    <td>{record.Column1}</td>
                    <td>{record.RAL}</td>
                    <td>{record.locnid}
</td>
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
