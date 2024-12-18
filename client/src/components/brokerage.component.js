// import React, { Component } from "react";
// import AuthService from "../services/auth.service";
// import * as XLSX from 'xlsx'; // Add this line

// export default class Brokerage extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       content: "",
//       letterData: [],
//       selectedRecord: null,
//       dpsohData: [],
//       ledgerData: [],
//       mtfpoData: [],
//       netpoData: [],
//       portfoData: [],
//       nomineeData: [],
//       isViewingRecord: false,
//       hoveredDptype: "",
//       mousePosition: { x: 0, y: 0 },
//       searchValue: "",
//       activeButton: null,
//       dataFound: true,
//     };
//   }

//   componentDidMount() {
//     this.getLetterData();
//   }

//   getLetterData = async () => {
//     try {
//       const currentUser = AuthService.getCurrentUser();
//       const response = await fetch("http://202.54.6.99:4003/brok/");
//       const letterData = await response.json();
//       const filteredLetterData = letterData
//       .filter(
//         (record) =>
//            record.cd >= 0.15
//       );
//       if (filteredLetterData.length > 0) {
//         this.setState({ letterData: filteredLetterData, dataFound: true });
//       } else {
//         this.setState({ letterData: null, dataFound: false });
//       }
//     } catch (error) {
//       window.alert(`An error occurred: ${error}`);
//     }
//   };

//   handleView = async (record) => {
//     this.setState({
//       selectedRecord: record,
//       isViewingRecord: true,
//       dpsohData: [],
//       ledgerData: [],
//       mtfpoData: [],
//       netpoData: [],
//       portfoData: [],
//       nomineeData: [],
//     });
//   };

// //   generateAndDownloadExcelForView = (record) => {
// //     const data = [
// //       ["cpn",	"plname",	"aplevel",	"vertical",	"cd",	"ci",	"cmol",	"cpid",	"Futures",	"0ptions",	"Derv",	"CF",	"CO",	"CP",	"CoF",	"CoO",	"CoD",	"CoP"],
// //       [record.cpn,record.plname,record.aplevel,record.vertical,record.cd,record.ci,record.cmol,record.cpid,record.Futures,record.options,record.Derv,record.CF,record.CO,record.CP,record.CoF,record.CoO,record.CoD,record.CoP ],
// //     ];

// //     const ws = XLSX.utils.aoa_to_sheet(data);
// //     const wb = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
// //     XLSX.writeFile(wb, "tables.xls");
// //   };

// generateAndDownloadExcelForAllRecords = () => {
//     const filteredRecords = this.state.letterData.filter(record => record.cd >= 0.15);
  
//     if (filteredRecords.length > 0) {
//       const data = filteredRecords.map(record => [
//         record.cpn, record.plname, record.aplevel, record.vertical,
//         parseFloat(record.cd).toFixed(2), parseFloat(record.ci).toFixed(2), parseFloat(record.cmol).toFixed(2), parseFloat(record.cpid).toFixed(2),
//         parseFloat(record.Futures).toFixed(2), parseFloat(record.options).toFixed(2), parseFloat(record.Derv).toFixed(2),
//         parseFloat(record.CF).toFixed(2), parseFloat(record.CO).toFixed(2), parseFloat(record.CP).toFixed(2),
//         parseFloat(record.CoF).toFixed(2), parseFloat(record.CoO).toFixed(2), parseFloat(record.CoD).toFixed(2), parseFloat(record.CoP).toFixed(2)
//       ]);
  
//       // Add headers to the start of the data array
//       data.unshift([
//         "Custom Plan No.", "Plan Name", "Approving Level", "vertical",
//         "Cash Delivery (%)", "Cash Intraday (%)", "Cash Minimum Order level", "Cash Priority ID",
//         "Futures (%)", "Options (Per Lot)", "Derv Priority",
//         "Currency Futures (per lot)", "Currency Options (Per Lot)", "Currency Priority",
//         "Commodity Futures (%)", "Commodity Options (Per Lot)", "Commodity Delivery (%)", "Commodity Priority"
//       ]);
  
//       const ws = XLSX.utils.aoa_to_sheet(data);
//       const wb = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//       XLSX.writeFile(wb, "tables.xls");
//     } else {
//       console.log('No records found that pass the filter');
//     }
//   };
  
  
  

//   render() {
//     const {
//       letterData,
//       dataFound
//     } = this.state;
  
//     return (
//       <div className="container">
//         <header className="jumbotron">
//           <h3>{this.state.content}</h3>
//         </header>
  
//         <div>
//           {dataFound ? (
//             letterData && letterData.length > 0 && (
//                 <div>
//                      <button onClick={this.generateAndDownloadExcelForAllRecords}>
//   Download Excel
// </button>


//                 <table class="6">
//       <thead>
//         <tr>
//         <th colSpan={4}></th>
// <th colSpan={4}>Cash</th>
// <th colSpan={3}>Derviatives</th>
// <th colSpan={3}>Currency</th>
// <th colSpan={4}>Commodity</th>
// </tr>
// <tr>

// <th>Custom Plan No.</th>
// <th>Plan Name</th>
// <th>Approving Level</th>
// <th>vertical</th>

// <th>Cash Delivery (%)</th>
// <th>Cash Intraday (%)</th>
// <th>Cash Minimum Order level</th>
// <th>Cash Priority ID</th>

// <th>Futures (%)</th>
// <th>Options (Per Lot)</th>
// <th>Derv Priority</th>

// <th>Currency Futures (per lot)</th>
// <th>Currency Options (Per Lot)</th>
// <th>Currency Priority</th>

// <th>Commodity Futures (%)</th>
// <th>Commodity Options (Per Lot)</th>
// <th>Commodity Delivery (%)</th>
// <th>Commodity Priority</th>
//         </tr>
//       </thead>
//       <tbody>
//       {letterData.map((record, index) => (
//                   <tr key={index}>
//                     <td>{record.cpn}</td>
//                     <td>{record.plname}</td>
//                     <td>{record.aplevel}</td>
//                     <td>{record.vertical}</td>
//                     <td>{parseFloat(record.cd).toFixed(4)}</td>
//                     <td>{parseFloat(record.ci).toFixed(4)}</td>
//                     <td>{parseFloat(record.cmol).toFixed(4)}</td>
//                     <td>{parseFloat(record.cpid).toFixed(4)}</td>
//                     <td>{parseFloat(record.Futures).toFixed(4)}</td>
//                     <td>{parseFloat(record.options).toFixed(4)}</td>
//                     <td>{parseFloat(record.Derv).toFixed(4)}</td>
//                     <td>{parseFloat(record.CF).toFixed(4)}</td>
//                     <td>{parseFloat(record.CO).toFixed(4)}</td>
//                     <td>{parseFloat(record.CP).toFixed(4)}</td>
//                     <td>{parseFloat(record.CoF).toFixed(4)}</td>
//                     <td>{parseFloat(record.CoO).toFixed(4)}</td>
//                     <td>{parseFloat(record.CoD).toFixed(4)}</td>
//                     <td>{parseFloat(record.CoP).toFixed(4)}</td>
//                   </tr>
//                 ))}
//       </tbody>
//     </table>
//     <br/><br/>
//               </div>
//             )
//           ) : (
//             <p>Data is not available in MTF.</p>
//           )}
//         </div>
//       </div>
//     );
//   }
  
// }














































// import React, { Component } from "react";
// import AuthService from "../services/auth.service";
// import * as XLSX from 'xlsx'; // Add this line

// export default class Brokerage extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       content: "",
//       letterData: [],
//       selectedRecord: null,
//       dpsohData: [],
//       ledgerData: [],
//       mtfpoData: [],
//       netpoData: [],
//       portfoData: [],
//       nomineeData: [],
//       isViewingRecord: false,
//       hoveredDptype: "",
//       mousePosition: { x: 0, y: 0 },
//       searchValue: "",
//       activeButton: null,
//       dataFound: true,
//       filterColumn: '', // Updated to store column name
//       filterFromValue: '',
//       filterToValue: '',
//     };
//   }

//   componentDidMount() {
//     this.getLetterData();
//   }

//   getLetterData = async () => {
//     try {
//       const currentUser = AuthService.getCurrentUser();
//       const response = await fetch("http://202.54.6.99:4003/brok/");
//       const letterData = await response.json();
//       const filteredLetterData = letterData
//       .filter(
//         (record) =>
//            record.cd >= 0.15 
//       );
//       if (filteredLetterData.length > 0) {
//         this.setState({ letterData: filteredLetterData, dataFound: true });
//       } else {
//         this.setState({ letterData: null, dataFound: false });
//       }
//     } catch (error) {
//       window.alert(`An error occurred: ${error}`);
//     }
//   };

//   handleView = async (record) => {
//     this.setState({
//       selectedRecord: record,
//       isViewingRecord: true,
//       dpsohData: [],
//       ledgerData: [],
//       mtfpoData: [],
//       netpoData: [],
//       portfoData: [],
//       nomineeData: [],
//     });
//   };

//  applyFilter = () => {
//   const { filterColumn, filterFromValue, filterToValue } = this.state;

//   // Reset filtered data to original letterData before applying new filter
//   let filteredRecords = [...this.state.letterData];

//   // Apply filter only if filterColumn is selected and valid range is provided
//   if (filterColumn && filterFromValue !== '' && filterToValue !== '') {
//     let from = parseFloat(filterFromValue);
//     let to = parseFloat(filterToValue);

//     // Ensure from is less than to
//     if (from > to) {
//       [from, to] = [to, from];
//     }

//     // Filter the letterData based on the selected column and range of values
//     filteredRecords = filteredRecords.filter(record =>
//       record[filterColumn] >= from && record[filterColumn] <= to
//     );
//   }

//   // Update the state with the filtered data
//   this.setState({ letterData: filteredRecords });
// };

  
  

//   generateAndDownloadExcelForAllRecords = () => {
//     const filteredRecords = this.state.letterData.filter(record => record.cd >= 0.15 && record.cd <= 1.0);
  
//     if (filteredRecords.length > 0) {
//       const data = filteredRecords.map(record => [
//         record.cpn, record.plname, record.aplevel, record.vertical,
//         parseFloat(record.cd).toFixed(2), parseFloat(record.ci).toFixed(2), parseFloat(record.cmol).toFixed(2), parseFloat(record.cpid).toFixed(2),
//         parseFloat(record.Futures).toFixed(2), parseFloat(record.options).toFixed(2), parseFloat(record.Derv).toFixed(2),
//         parseFloat(record.CF).toFixed(2), parseFloat(record.CO).toFixed(2), parseFloat(record.CP).toFixed(2),
//         parseFloat(record.CoF).toFixed(2), parseFloat(record.CoO).toFixed(2), parseFloat(record.CoD).toFixed(2), parseFloat(record.CoP).toFixed(2)
//       ]);
  
//       // Add headers to the start of the data array
//       data.unshift([
//         "Custom Plan No.", "Plan Name", "Approving Level", "vertical",
//         "Cash Delivery (%)", "Cash Intraday (%)", "Cash Minimum Order level", "Cash Priority ID",
//         "Futures (%)", "Options (Per Lot)", "Derv Priority",
//         "Currency Futures (per lot)", "Currency Options (Per Lot)", "Currency Priority",
//         "Commodity Futures (%)", "Commodity Options (Per Lot)", "Commodity Delivery (%)", "Commodity Priority"
//       ]);
  
//       const ws = XLSX.utils.aoa_to_sheet(data);
//       const wb = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//       XLSX.writeFile(wb, "tables.xls");
//     } else {
//       console.log('No records found that pass the filter');
//     }
//   };

//   render() {
//     const {
//       letterData,
//       dataFound
//     } = this.state;
  
//     return (
//       <div className="container">
//         <header className="jumbotron">
//           <h3>{this.state.content}</h3>
//         </header>
  
//         <div>
//           {/* Updated inputs and dropdown */}
//           <select
//             value={this.state.filterColumn}
//             onChange={event => this.setState({ filterColumn: event.target.value })}
//           >
            // <option value="">Select Column</option>

            // <option value="cd">Cash Delivery (%)</option>
            // <option value="ci">Cash Intraday (%)</option>
            // <option value="cmol">Cash Minimum Order level</option>
            // <option value="cpid">Cash Priority ID</option>

            // <option value="Futures">Futures (%)</option>
            // <option value="options">Options (Per Lot)</option>
            // <option value="Derv">Derv Priority</option>

            // <option value="CF">Currency Futures (per lot)</option>
            // <option value="CO">Currency Options (Per Lot)</option>
            // <option value="CP">Currency Priority</option>

            // <option value="CoF">Commodity Futures (%)</option>
            // <option value="CoO">Commodity Options (Per Lot)</option>
            // <option value="CoD">Commodity Delivery (%)</option>
            // <option value="CoP">Commodity Priority</option>

          

            
//           </select>
//           <input
//             type="number"
//             placeholder="From"
//             value={this.state.filterFromValue}
//             onChange={event => this.setState({ filterFromValue: event.target.value })}
//           />
//           <input
//             type="number"
//             placeholder="To"
//             value={this.state.filterToValue}
//             onChange={event => this.setState({ filterToValue: event.target.value })}
//           />
//           <button onClick={this.applyFilter}>
//             Apply Filter
//           </button>

//           {dataFound ? (
//             <div>
//               {/* Add this button */}
//               <button onClick={this.generateAndDownloadExcelForAllRecords}>
//                 Download Excel
//               </button>

//               <table class="6">
//        <thead>
//          <tr>
//          <th colSpan={4}></th>
//  <th colSpan={4}>Cash</th>
//  <th colSpan={3}>Derviatives</th>
//  <th colSpan={3}>Currency</th>
//  <th colSpan={4}>Commodity</th>
//  </tr>
//  <tr>

//  <th>Custom Plan No.</th>
//  <th>Plan Name</th>
//  <th>Approving Level</th>
//  <th>vertical</th>

//  <th>Cash Delivery (%)</th>
//  <th>Cash Intraday (%)</th>
//  <th>Cash Minimum Order level</th>
//  <th>Cash Priority ID</th>

//  <th>Futures (%)</th>
//  <th>Options (Per Lot)</th>
//  <th>Derv Priority</th>

//  <th>Currency Futures (per lot)</th>
//  <th>Currency Options (Per Lot)</th>
//  <th>Currency Priority</th>

//  <th>Commodity Futures (%)</th>
//  <th>Commodity Options (Per Lot)</th>
//  <th>Commodity Delivery (%)</th>
//  <th>Commodity Priority</th>
//          </tr>
//        </thead>
//        <tbody>
//        {letterData.map((record, index) => (
//                   <tr key={index}>
//                     <td>{record.cpn}</td>
//                     <td>{record.plname}</td>
//                     <td>{record.aplevel}</td>
//                     <td>{record.vertical}</td>
//                     <td>{parseFloat(record.cd).toFixed(4)}</td>
//                     <td>{parseFloat(record.ci).toFixed(4)}</td>
//                     <td>{parseFloat(record.cmol).toFixed(4)}</td>
//                     <td>{parseFloat(record.cpid).toFixed(4)}</td>
//                     <td>{parseFloat(record.Futures).toFixed(4)}</td>
//                     <td>{parseFloat(record.options).toFixed(4)}</td>
//                     <td>{parseFloat(record.Derv).toFixed(4)}</td>
//                     <td>{parseFloat(record.CF).toFixed(4)}</td>
//                     <td>{parseFloat(record.CO).toFixed(4)}</td>
//                     <td>{parseFloat(record.CP).toFixed(4)}</td>
//                     <td>{parseFloat(record.CoF).toFixed(4)}</td>
//                     <td>{parseFloat(record.CoO).toFixed(4)}</td>
//                     <td>{parseFloat(record.CoD).toFixed(4)}</td>
//                     <td>{parseFloat(record.CoP).toFixed(4)}</td>
//                   </tr>
//                 ))}
//       </tbody>
//     </table>
//     <br/><br/>
//             </div>
//           ) : (
//             <p>Data is not available in MTF.</p>
//           )}
//         </div>
//       </div>
//     );
//   }
// }




































import React, { Component } from "react";
import AuthService from "../services/auth.service";
import * as XLSX from 'xlsx';

export default class Brokerage extends Component {
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
      filterColumn: '',
      filterFromValue: '',
      filterToValue: '',
      originalLetterData: [], // Added to store original data
    };
  }

  componentDidMount() {
    this.getLetterData();
  }

  getLetterData = async () => {
    try {
      const currentUser = AuthService.getCurrentUser();
      const response = await fetch("http://183.182.84.228:4005/brok/");
      const letterData = await response.json();
      const filteredLetterData = letterData.filter(record => record.cd >= 0.15);
      if (filteredLetterData.length > 0) {
        this.setState({ letterData: filteredLetterData, originalLetterData: filteredLetterData, dataFound: true });
      } else {
        this.setState({ letterData: null, originalLetterData: null, dataFound: false });
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

  applyFilter = () => {
    const { filterColumn, filterFromValue, filterToValue, originalLetterData } = this.state;
    let filteredRecords = [...originalLetterData];
  
    if (filterColumn && filterFromValue !== '' && filterToValue !== '') {
      let from = parseFloat(filterFromValue);
      let to = parseFloat(filterToValue);
  
      if (from > to) {
        [from, to] = [to, from];
      }
  
      filteredRecords = filteredRecords.filter(record =>
        record[filterColumn] >= from && record[filterColumn] <= to
      );
    }
  
    this.setState({ letterData: filteredRecords });
  };
  

  clearFilter = () => {
    this.setState({
      filterColumn: '',
      filterFromValue: '',
      filterToValue: '',
      letterData: this.state.originalLetterData,
    });
  };

  generateAndDownloadExcelForAllRecords = () => {
    const filteredRecords = this.state.letterData.filter(record => record.cd >= 0.15 && record.cd <= 1.0);

    if (filteredRecords.length > 0) {
      const data = filteredRecords.map(record => [
        record.cpn, record.plname, record.aplevel, record.vertical,
        parseFloat(record.cd).toFixed(2), parseFloat(record.ci).toFixed(2), parseFloat(record.cmol).toFixed(2), parseFloat(record.cpid).toFixed(2),
        parseFloat(record.Futures).toFixed(2), parseFloat(record.options).toFixed(2), parseFloat(record.Derv).toFixed(2),
        parseFloat(record.CF).toFixed(2), parseFloat(record.CO).toFixed(2), parseFloat(record.CP).toFixed(2),
        parseFloat(record.CoF).toFixed(2), parseFloat(record.CoO).toFixed(2), parseFloat(record.CoD).toFixed(2), parseFloat(record.CoP).toFixed(2)
      ]);

      data.unshift([
        "Custom Plan No.", "Plan Name", "Approving Level", "vertical",
        "Cash Delivery (%)", "Cash Intraday (%)", "Cash Minimum Order level", "Cash Priority ID",
        "Futures (%)", "Options (Per Lot)", "Derv Priority",
        "Currency Futures (per lot)", "Currency Options (Per Lot)", "Currency Priority",
        "Commodity Futures (%)", "Commodity Options (Per Lot)", "Commodity Delivery (%)", "Commodity Priority"
      ]);

      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "tables.xls");
    } else {
      console.log('No records found that pass the filter');
    }
  };

  render() {
    const {
      letterData,
      dataFound,
      filterColumn,
      filterFromValue,
      filterToValue
    } = this.state;

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>

        <div>
          <select
            value={filterColumn}
            onChange={event => this.setState({ filterColumn: event.target.value })}
          >
           
            <option value="">Select Column</option>

            <option value="cd">Cash Delivery (%)</option>
            <option value="ci">Cash Intraday (%)</option>
            <option value="cmol">Cash Minimum Order level</option>
            <option value="cpid">Cash Priority ID</option>

            <option value="Futures">Futures (%)</option>
            <option value="options">Options (Per Lot)</option>
            <option value="Derv">Derv Priority</option>

            <option value="CF">Currency Futures (per lot)</option>
            <option value="CO">Currency Options (Per Lot)</option>
            <option value="CP">Currency Priority</option>

            <option value="CoF">Commodity Futures (%)</option>
            <option value="CoO">Commodity Options (Per Lot)</option>
            <option value="CoD">Commodity Delivery (%)</option>
            <option value="CoP">Commodity Priority</option>
          </select>
          <input
            type="number"
            placeholder="From"
            value={filterFromValue}
            onChange={event => this.setState({ filterFromValue: event.target.value })}
          />
          <input
            type="number"
            placeholder="To"
            value={filterToValue}
            onChange={event => this.setState({ filterToValue: event.target.value })}
          />
          <button onClick={this.applyFilter}>
            Apply Filter
          </button>
          <button onClick={this.clearFilter}>
            Clear Filter
          </button>
          {dataFound ? (
            <div>
              <button onClick={this.generateAndDownloadExcelForAllRecords}>
                Download Excel
              </button>

              <table className="table table-striped table-scroll" style={{ marginTop: '10px' }}>
                <thead>
                  <tr>
                    <th colSpan={4}></th>
                    <th colSpan={4}>Cash</th>
                    <th colSpan={3}>Derviatives</th>
                    <th colSpan={3}>Currency</th>
                    <th colSpan={4}>Commodity</th>
                  </tr>
                  <tr>
                  <th>Custom Plan No.</th>
 <th>Plan Name</th>
 <th>Approving Level</th>
 <th>vertical</th>

 <th>Cash Delivery (%)</th>
 <th>Cash Intraday (%)</th>
 <th>Cash Minimum Order level</th>
 <th>Cash Priority ID</th>

 <th>Futures (%)</th>
 <th>Options (Per Lot)</th>
 <th>Derv Priority</th>

 <th>Currency Futures (per lot)</th>
 <th>Currency Options (Per Lot)</th>
 <th>Currency Priority</th>

 <th>Commodity Futures (%)</th>
 <th>Commodity Options (Per Lot)</th>
 <th>Commodity Delivery (%)</th>
 <th>Commodity Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {letterData.map((record, index) => (
                    <tr key={index}>
                      <td>{record.cpn}</td>
                    <td>{record.plname}</td>
                    <td>{record.aplevel}</td>
                    <td>{record.vertical}</td>
                    <td>{parseFloat(record.cd).toFixed(4)}</td>
                    <td>{parseFloat(record.ci).toFixed(4)}</td>
                    <td>{parseFloat(record.cmol).toFixed(4)}</td>
                    <td>{parseFloat(record.cpid).toFixed(4)}</td>
                    <td>{parseFloat(record.Futures).toFixed(4)}</td>
                    <td>{parseFloat(record.options).toFixed(4)}</td>
                    <td>{parseFloat(record.Derv).toFixed(4)}</td>
                    <td>{parseFloat(record.CF).toFixed(4)}</td>
                    <td>{parseFloat(record.CO).toFixed(4)}</td>
                    <td>{parseFloat(record.CP).toFixed(4)}</td>
                    <td>{parseFloat(record.CoF).toFixed(4)}</td>
                    <td>{parseFloat(record.CoO).toFixed(4)}</td>
                    <td>{parseFloat(record.CoD).toFixed(4)}</td>
                    <td>{parseFloat(record.CoP).toFixed(4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Data is not available in MTF.</p>
          )}
        </div>
      </div>
    );
  }
}
