
// import React, { Component } from "react";
// import AuthService from "../../services/auth.service"; // Ensure you have AuthService in your project
// import * as XLSX from "xlsx"

// const tableStyle = {
//   width: "100%",
//   borderCollapse: "collapse",
// };

// const thStyle = {
//   padding: "10px",
//   backgroundColor: "#007bff",
//   color: "#fff",
//   textAlign: "left",
// };

// const tdStyle = {
//   padding: "10px",
//   border: "1px solid #ddd",
// };

// const buttonStyle = {
//   padding: "8px 12px",
//   backgroundColor: "#007bff",
//   color: "#fff",
//   border: "none",
//   borderRadius: "4px",
//   cursor: "pointer",
// };

// export default class AskClient extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       letterData: [],
//       selectedRecord: null,
//       isEditingRecord: false,
//       selectedInterest: "",
//       remark: "",
//       searchValue: "",
//       loading: false,
//       dataFound: true,
//       allOptions: [],
//     };
//   }

//   componentDidMount() {
//     this.getLetterData();
//     this.loadAllOptions(); // Fetch all options when component mounts
//   }

//   getLetterData = async () => {
//     try {
//       this.setState({ loading: true });
//       const response = await fetch("http://183.182.84.228:4005/record/");
//       const letterData = await response.json();
//       const filteredData = letterData.filter(
//         (record) => record.priority === "DPH"
//       );
//       if (filteredData.length > 0) {
//         this.setState({ letterData: filteredData });
//       } else {
//         window.alert("Data not found for selected record.");
//         this.setState({ dataFound: false });
//       }
//     } catch (error) {
//       window.alert(`An error occurred: ${error}`);
//     } finally {
//       this.setState({ loading: false });
//     }
//   };

//   loadAllOptions = async () => {
//     try {
//       const allOptions = await AuthService.getAllOption();
//       this.setState({ allOptions });
//     } catch (error) {
//       console.error("Error fetching options:", error);
//     }
//   };

//   handleView = (record) => {
//     this.setState({
//       selectedRecord: record,
//       isEditingRecord: true,
//       selectedInterest: "",
//       remark: "",
//     });
//   };

//   handleInterestChange = (event) => {
//     this.setState({ selectedInterest: event.target.value });
//   };

//   handleRemarkChange = (event) => {
//     this.setState({ remark: event.target.value });
//   };

//   handleSubmitEdit = () => {
//     const { selectedRecord, selectedInterest, remark } = this.state;
  
//     if (!selectedInterest || !remark) {
//       window.alert("Please select an option and enter a remark.");
//       return;
//     }
  
//     const selectedOption = this.state.allOptions.find(
//       (option) => option.Ucc === selectedRecord?.ucc
//     );
  
//     if (selectedOption) {
//       // Proceed with edit using selectedOption
//       AuthService.editUserOption(
//         selectedOption.id, // Assuming id exists in selectedOption
//         selectedInterest,
//         remark
//       )
//         .then(() => {
//           console.log("Remarks updated successfully");
//           return this.loadAllOptions(); // Refresh data after update
//         })
//         .then(() => {
//           this.setState({ isEditingRecord: false, selectedRecord: null });
//           window.alert("Data updated successfully!");
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//           window.alert("Failed to update remark.");
//         });
//     } else {
//       // Fallback to selectedRecord for editing if selectedOption is not found
//       // AuthService.updateUserOption(
//       //   selectedRecord.ucc,
//       //   selectedRecord.clname,
//       //   selectedRecord.panno,
//       //   selectedInterest,
//       //   remark,
//       //   selectedRecord.es_dphldg,
//       //   selectedRecord.kyc_fnlsts
//       // )
//       //   .then(() => {
//       //     console.log("Record updated successfully");
//       //     return this.getLetterData(); // Refresh data after update
//       //   })
//       //   .then(() => {
//       //     this.setState({ isEditingRecord: false, selectedRecord: null });
//       //     window.alert("Data updated successfully!");
//       //   })
//       //   .catch((error) => {
//       //     console.error("Error:", error);
//       //     window.alert("Failed to update record.");
//       //   });
//     }
//   };
  

//   handleSubmitUpdate = () => {
//     const { selectedRecord, selectedInterest, remark } = this.state;

//     if (!selectedInterest || !remark) {
//       window.alert("Please select an option and enter a remark.");
//       return;
//     }

//     // Call updateUserOption for updating the record
//     AuthService.updateUserOption(
//       selectedRecord.ucc,
//       selectedRecord.clname,
//       selectedRecord.panno,
//       selectedInterest,
//       remark,
//       selectedRecord.es_dphldg,
//       selectedRecord.kyc_fnlsts
//     )
//       .then(() => {
//         console.log("Record updated successfully");
//         return this.loadAllOptions(); // Refresh data after update
//       })
//       .then(() => {
//         this.setState({ isEditingRecord: false, selectedRecord: null });
//         window.alert("Data updated successfully!");
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         window.alert("Failed to update record.");
//       });
//   };

//   handleCloseEdit = () => {
//     this.setState({ isEditingRecord: false, selectedRecord: null });
//   };

//   handleSearchChange = (event) => {
//     this.setState({ searchValue: event.target.value });
//   };






//   // generateAndDownloadExcelForView = (filterOption) => {
//   //   // Call the function to get all data
//   //   const records = this.loadAllOptions(); // Assuming this function returns the full dataset
  
//   //   // Filter the records based on the filter option
//   //   let filteredRecords;
  
//   //   switch (filterOption) {
//   //     case "all":
//   //       filteredRecords = records; // No filter, include all data
//   //       break;
//   //     case "interested":
//   //       filteredRecords = records.filter(record => record.user_option === 'interested'); // Filter for interested records
//   //       break;
//   //     case "not interested":
//   //       filteredRecords = records.filter(record => record.user_option === 'not interested'); // Filter for not interested records
//   //       break;
//   //     case "other":
//   //       filteredRecords = records.filter(record => record.user_option === 'other'); // Filter for other option records
//   //       break;
//   //     default:
//   //       filteredRecords = records; // Default to all records
//   //   }
  
//   //   // Define the header for the Excel sheet
//   //   const header = [
//   //     "Ucc", "Name", "Pan", "dphold", "krastatus", "user_option", "user_rem"
//   //   ];
  
//   //   // Map the filtered records to match the header
//   //   const data = filteredRecords.map(record => [
//   //     record.Ucc, record.Name, record.Pan, record.dphold, record.krastatus, record.user_option, record.user_rem
//   //   ]);
  
//   //   // Create the Excel sheet
//   //   const ws = XLSX.utils.aoa_to_sheet([header, ...data]);
//   //   const wb = XLSX.utils.book_new();
//   //   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  
//   //   // Trigger the file download
//   //   XLSX.writeFile(wb, "filtered_data.xlsx");
//   // };




//   esdpsohexcel = async () => {
//     const response = await fetch("http://183.182.84.228:4005/record/");
//     const letterData = await response.json();
//     const data = [
//       ["Remark","Branch",	"ES UCC",	"Client Name",	"Pan No",	"Es Mobile No.",	"ES e-Mail ID",	"ES DP Holding",	"ES DP Ledger Balance",	"Category",	"KYC Sts Date",	"Kyc Status",	"Kyc Final Sts",	"_Priority",	"ES Cl Ac Closed During e-sign",	"ES DP Closer Trf to KS",	"Dormant :e-mail Sent",	"Dormant :Upcoming Days",	"BarCode",	"KS UCC",	"KS KRA Status",	"KS PTT Status",	"KS KRA/UCC Sts",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA Remark",	"KS KRA/PTT Remarks",	"3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile",	"Kotak Status 1 (K/U)",	"Kotak Remark(s)",	"ES K/C Sir Form Sts",	"ES Prakash Form Sts",	"DoB or DoI",	"NEO ID",	"ODIN ID",	"BOSS ID",	"Client From Boss",	"KS MTF ACTV",	"KS Location ID",	"ES Location ID",	"ES Location Code",	"ES Ckyc No",	"KS Trading PlatForm",	"KS Client UserId",	"KS Running AcLtr(FO)",	"KS Running AcLtr(CM)",	"KS DP Id",	"Ks Dp BoId",	"Es NoofBOId",	"Es BOId Map at KS",	"Es BOId",	"KS DP RateCode",	"Es DP RateCode",	"KS Nominee",	"KS Nominee Reln with AcPCd",	"ES Nominee",	"ES Nominee Reln with AcPCd",	"KS Client Sts",	"ES Client Sts",	"Back Office Current Status",	"KS NSE CM",	"ES NSE CM",	"KS ES NSE CM Match",	"KS BSE CM",	"ES BSE CM",	"KS ES BSE CM Match",	"KS NSE FO",	"ES NSE FO",	"KS ES NSE FO Match",	"KS NSE CDS",	"ES NSE CDS",	"KS ES NSE CDS Match",	"KS MCX",	"ES MCX",	"KS ES MCX Match",	"KS NCDEX",	"ES NCDEX",	"KS ES NCDEX Match",	"Ks Email Sent to Client",	"Ks e-Sign Status",	"e-Sign Triger Dt",	"Ks e-Sign Remarks",	"KS e-Mail ID",	"KS/ES e-Mail ID Match",	"KS e-Mail ID Reln with Client",	"ES e-Mail ID Reln with Client",	"Ks Mobile No.",	"Ks / Es Mobile Match",	"Ks Mobile Reln with Client",	"Es Mobile Reln with Client",	"ES TurnOver",	"Es Net Brokerage",	"KS Lst Trd",	"ES Lst Trd",	"ES Mtf Position",	"ES F&o Open Position",	"ES Margin",	"ES Ledger Balance",	"ES Cash Colletral",	"Non-CashColleteral",	"Es Pledge Value",	"Es Corp Action",	"ES PortFolio Recon",	"Branch Name",	"Family Group",	"Report Date"
//     ],
//     ...letterData.filter((record) => record.priority === 'DPH').map((record) =>[,record.brcd,	record.ucc,	record.clname,	record.panno,	record.es_mobile,	record.es_email,	record.es_dphldg,	record.es_dpledg,	record.catg,	record.kyc_stsdt,	record.kyc_sts,	record.kyc_fnlsts,	record.priority,	record.ac_closed,	record.closer_trf,	record.ems_ddt,	record.nod_dormnt,	record.barcode,	record.kslucc,	record.ks_krasts,	record.ks_pttsts,	record.ks_kusts,	record.ks_krarem,	record.ks_emsent,	record.ks_emrecd,	record.ks_eslrm,	record.ks_ltstrm,	record.sts1_3i,	record.sts2_3i,	record.ks_othsts,	record.mult_emmo,	record.ks_sts1,	record.ks_allrem,	record.es_rem1kc,	record.es_rem2pp,	record.es_dobdoi,	record.neoid,	record.odinid,	record.bossid,	record.cl_frboss,	record.ks_mtfcl,	record.locationid,	record.es_locncd,	record.es_locnid,	record.eckyc_no,	record.k_platform,	record.ks_clusrid,	record.ks_ralfno,	record.ks_ralncm,	record.ks_dpid,	record.ks_dpboid,	record.es_nodpac,	record.esdp_map,	record.es_dpboid,	record.ks_dprtcd,	record.dp_ratecd,	record.ks_nomn,	record.ks_relwapc,	record.es_nomn,	record.es_relwapc,	record.ks_clsts,	record.es_clsts,	record.bo_clsts,	record.ks_nsecm,	record.es_nsecm,	record.is_mtchncm,	record.ks_bsecm,	record.es_bsecm,	record.is_mtchbcm,	record.ks_nsefo,	record.es_nsefo,	record.is_mtchnfo,	record.ks_nsecds,	record.es_nsecds,	record.is_mtchcds,	record.ks_mcx,	record.es_mcx,	record.is_mtchmcx,	record.ks_ncdex,	record.es_ncdex,	record.is_mtchncd,	record.ks_emtocl,	record.ks_esign,	record.ks_emtrgdt,	record.ks_essts,	record.ks_emailid,	record.is_mtch_em,	record.ks_emrel,	record.es_emrel,	record.ks_mobile,	record.is_mtch_mo,	record.ks_mobrel,	record.es_mobrel,	record.estovr,	record.es_netbkg,	record.ks_lstrdt,	record.es_lstrdt,	record.es_mtfpos,	record.es_opnpos,	record.es_margin,	record.es_ledbal,	record.es_ccol,	record.es_nccol,	record.es_pledval,	record.es_corpact,	record.es_pfreco,	record.brname,	record.family_grp,	record.run_date
//       ]),
//     ];

//     const ws = XLSX.utils.aoa_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//     XLSX.writeFile(wb, "es_dph.xls");
// };




//   handleDownloadExcel = () => {
//     const { allOptions } = this.state;

//     if (allOptions.length === 0) {
//       window.alert("No data available to download.");
//       return;
//     }

//     // Define the headers
//     const headers = ["Ucc", "Name", "Pan", "dphold", "krastatus", "user_option", "user_rem"];

//     // Map the data to the headers
//     const data = allOptions.map(record => ({
//       Ucc: record.Ucc,
//       Name: record.Name,
//       Pan: record.Pan,
//       dphold: record.dphold,
//       krastatus: record.krastatus,
//       user_option: record.user_option,  // Assuming the field name is 'user_option'
//       user_rem: record.user_rem  // Assuming the field name is 'user_rem'
//     }));

//     // Convert data to worksheet
//     const ws = XLSX.utils.json_to_sheet(data, { header: headers });

//     // Create a new workbook and append the worksheet
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "All Options");

//     // Download the Excel file
//     XLSX.writeFile(wb, "All_Options_Data.xlsx");
//   };
  



//   handleDownloadExcelIn = () => {
//     const { allOptions } = this.state;
  
//     // Filter data where user_option is 'interested'
//     const filteredOptions = allOptions.filter(record => record.user_option === 'Interested');
  
//     if (filteredOptions.length === 0) {
//       window.alert("No data available to download for 'interested' user_option.");
//       return;
//     }
  
//     // Define the headers
//     const headers = ["Ucc", "Name", "Pan", "dphold", "krastatus", "user_option", "user_rem"];
  
//     // Map the filtered data to the headers
//     const data = filteredOptions.map(record => ({
//       Ucc: record.Ucc,
//       Name: record.Name,
//       Pan: record.Pan,
//       dphold: record.dphold,
//       krastatus: record.krastatus,
//       user_option: record.user_option,  // Assuming the field name is 'user_option'
//       user_rem: record.user_rem  // Assuming the field name is 'user_rem'
//     }));
  
//     // Convert data to worksheet
//     const ws = XLSX.utils.json_to_sheet(data, { header: headers });
  
//     // Create a new workbook and append the worksheet
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "All Options");
  
//     // Download the Excel file
//     XLSX.writeFile(wb, "All_Options_Data_Interested.xlsx");
//   };
  


//   handleDownloadExcelNotIn = () => {
//     const { allOptions } = this.state;
  
//     // Filter data where user_option is 'interested'
//     const filteredOptions = allOptions.filter(record => record.user_option === 'Not Interested');
  
//     if (filteredOptions.length === 0) {
//       window.alert("No data available to download for 'Not Interested' user_option.");
//       return;
//     }
  
//     // Define the headers
//     const headers = ["Ucc", "Name", "Pan", "dphold", "krastatus", "user_option", "user_rem"];
  
//     // Map the filtered data to the headers
//     const data = filteredOptions.map(record => ({
//       Ucc: record.Ucc,
//       Name: record.Name,
//       Pan: record.Pan,
//       dphold: record.dphold,
//       krastatus: record.krastatus,
//       user_option: record.user_option,  // Assuming the field name is 'user_option'
//       user_rem: record.user_rem  // Assuming the field name is 'user_rem'
//     }));
  
//     // Convert data to worksheet
//     const ws = XLSX.utils.json_to_sheet(data, { header: headers });
  
//     // Create a new workbook and append the worksheet
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "All Options");
  
//     // Download the Excel file
//     XLSX.writeFile(wb, "All_Options_Data_Not_Interested.xlsx");
//   };
  





//   handleDownloadExcelOther = () => {
//     const { allOptions } = this.state;
  
//     // Filter data where user_option is 'interested'
//     const filteredOptions = allOptions.filter(record => record.user_option === 'Other');
  
//     if (filteredOptions.length === 0) {
//       window.alert("No data available to download for 'Other' user_option.");
//       return;
//     }
  
//     // Define the headers
//     const headers = ["Ucc", "Name", "Pan", "dphold", "krastatus", "user_option", "user_rem"];
  
//     // Map the filtered data to the headers
//     const data = filteredOptions.map(record => ({
//       Ucc: record.Ucc,
//       Name: record.Name,
//       Pan: record.Pan,
//       dphold: record.dphold,
//       krastatus: record.krastatus,
//       user_option: record.user_option,  // Assuming the field name is 'user_option'
//       user_rem: record.user_rem  // Assuming the field name is 'user_rem'
//     }));
  
//     // Convert data to worksheet
//     const ws = XLSX.utils.json_to_sheet(data, { header: headers });
  
//     // Create a new workbook and append the worksheet
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "All Options");
  
//     // Download the Excel file
//     XLSX.writeFile(wb, "All_Options_Data_Other.xlsx");
//   };
  
  








//   render() {
//     const {
//       letterData,
//       isEditingRecord,
//       selectedRecord,
//       selectedInterest,
//       remark,
//       searchValue,
//       loading,
//       allOptions,
//     } = this.state;

//     const filteredData = letterData.filter(
//       (record) =>
//         record.ucc.toLowerCase().includes(searchValue.toLowerCase()) ||
//         record.clname.toLowerCase().includes(searchValue.toLowerCase()) ||
//         record.panno.toLowerCase().includes(searchValue.toLowerCase())
//     );

//     // Check if the selectedRecord's ucc exists in allOptions
//     const selectedOption = allOptions.find(
//       (option) => option.Ucc === selectedRecord?.ucc
//     );

//     return (
//       <div style={{ padding: "20px", backgroundColor: "#f8f9fa" }}>
//         <header style={{ textAlign: "center", marginBottom: "20px" }}>
//           <h3>Want Open This Accounts in Kotak</h3>
//         </header>

//         <input
//           type="text"
//           placeholder="Search by Client Code, Client Name, or PAN"
//           value={searchValue}
//           onChange={this.handleSearchChange}
//           style={{
//             marginBottom: "20px",
//             padding: "10px",
//             width: "100%",
//             fontSize: "16px",
//             borderRadius: "4px",
//             border: "1px solid #ddd",
//           }}
//         />
//         <button
//           style={buttonStyle}
//           onClick={this.handleDownloadExcel}
//         >
//           Download All Options as Excel
//         </button>
//         &nbsp;&nbsp;&nbsp;
//         <button
//           style={buttonStyle}
//           onClick={this.handleDownloadExcelIn}
//         >
//           Download Interested Options as Excel
//         </button>
//         &nbsp;&nbsp;&nbsp;
//         <button
//           style={buttonStyle}
//           onClick={this.handleDownloadExcelNotIn}
//         >
//           Download Not Interested Options as Excel
//         </button>
//         &nbsp;&nbsp;&nbsp;
//         <button
//           style={buttonStyle}
//           onClick={this.handleDownloadExcelOther}
//         >
//           Download Other Options as Excel
//         </button>
//         &nbsp;&nbsp;&nbsp;
//         <button
//           style={buttonStyle}
//           onClick={this.esdpsohexcel}
//         >
//           Download all Details
//         </button>
//         &nbsp;&nbsp;&nbsp;

//         {loading ? (
//           <p>Loading data...</p>
//         ) : (
//           <table className="table table-striped table-scroll" style={tableStyle}>
//             <thead>
//               <tr>
//                 <th style={thStyle}>SNo.</th>
//                 <th style={thStyle}>Client Code</th>
//                 <th style={thStyle}>Client Name</th>
//                 <th style={thStyle}>PAN No.</th>
//                 <th style={thStyle}>Mobile No.</th>
//                 <th style={thStyle}>Es Net Brokerage</th>
//                 <th style={thStyle}>ES DP Holding</th>
//                 <th style={thStyle}>KYC Sts Date</th>
//                 <th style={thStyle}>Kyc Final Sts</th>
//                 <th style={thStyle}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((record, index) => (
//                 <tr key={index}>
//                   <td style={tdStyle}>{index + 1}</td>
//                   <td style={tdStyle}>{record.ucc}</td>
//                   <td style={tdStyle}>{record.clname}</td>
//                   <td style={tdStyle}>{record.panno}</td>
//                   <td style={tdStyle}>{record.es_mobile}</td>
//                   <td style={tdStyle}>{record.es_netbkg}</td>
//                   <td style={tdStyle}>{record.es_dphldg}</td>
//                   <td style={tdStyle}>{record.date}</td>
//                   <td style={tdStyle}>{record.result}</td>
//                   <td style={tdStyle}>
//                     <button
//                       style={buttonStyle}
//                       onClick={() => this.handleView(record)}
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}

// {isEditingRecord && selectedRecord && (
//   <div
//     style={{
//       position: "absolute",
//       top: "10%",
//       left: "10%",
//       right: "10%",
//       backgroundColor: "#fff",
//       border: "1px solid #ddd",
//       padding: "20px",
//       zIndex: 10,
//       boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
//     }}
//   >
    

//     {/* Check if selectedRecord's ucc is in allOptions */}
//     {selectedOption ? (
//       // If ucc is found in allOptions, display data from allOptions
//       <>
//       <h3>Edit Record</h3>
//         <div>
//           <label>Interest:</label>
//           <select
//             value={selectedInterest}
//             onChange={this.handleInterestChange}
//           >
//             <option value="">Select Interest</option>
//             <option value="Interested">Interested</option>
//             <option value="Not Interested">Not Interested</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>

//         <div>
//           <label>Remark:</label>
//           <textarea
//             value={remark}
//             onChange={this.handleRemarkChange}
//             rows="4"
//             style={{ width: "100%", marginBottom: "10px" }}
//           />
//         </div>

//         {/* Display data from allOptions */}
//         <div>
//           <label>UCC:</label>
//           <input type="text" value={selectedOption.Ucc} disabled />
        
//           <label>Name:</label>
//           <input type="text" value={selectedOption.Name} disabled />
        
//           <label>PAN:</label>
//           <input type="text" value={selectedOption.Pan} disabled />
        
//           <label>DP Holding:</label>
//           <input type="text" value={selectedOption.dphold} disabled />
       
//           <label>KRA Status:</label>
//           <input type="text" value={selectedOption.krastatus} disabled />
        
//           <label>Option:</label>
//           <input type="text" value={selectedOption.user_option} disabled />
       
//           <label>Remark:</label>
//           <input type="text" value={selectedOption.user_rem} disabled />
//         </div>


//         <table className="table table-striped table-scroll" style={tableStyle}>
//             <thead>
//               <tr>
//                 <th style={thStyle}>DoB or DoI</th>
//                 <th style={thStyle}>Category</th>
//                 <th style={thStyle}>Pan No</th>
//                 <th style={thStyle}>ES TurnOver</th>
//                 <th style={thStyle}>Es Net Brokerage</th>
//                 <th style={thStyle}>KS Lst Trd</th>
//                 <th style={thStyle}>ES Lst Trd</th>
//                 <th style={thStyle}>ES Mtf Position</th>
//                 <th style={thStyle}>ES F&o Open Position</th>
//                 <th style={thStyle}>ES Margin</th>
//                 <th style={thStyle}>ES Ledger Balance</th>
//                 <th style={thStyle}>ES DP Ledger Balance</th>
//                 <th style={thStyle}>ES DP Holding</th>
//                 <th style={thStyle}>ES Cash Colletral</th>
//                 <th style={thStyle}>Non-CashColleteral</th>
//                 <th style={thStyle}>Es Pledge Value</th>
//                 <th style={thStyle}>Es Corp Action</th>
//                 <th style={thStyle}>ES PortFolio Recon</th>
//                 <th style={thStyle}>NEO ID</th>
//                 <th style={thStyle}>ODIN ID</th>
//                 <th style={thStyle}>BOSS ID</th>
//                 <th style={thStyle}>Client From Boss</th>
//                 <th style={thStyle}>ES Location ID</th>
//                 <th style={thStyle}>ES Location Code</th>
//                 <th style={thStyle}>ES Ckyc No</th>
//                 <th style={thStyle}>Es NoofBOId</th>
//                 <th style={thStyle}>Es BOId Map at KS</th>
//                 <th style={thStyle}>Es BOId</th>
//                 <th style={thStyle}>KS DP RateCode</th>
//                 <th style={thStyle}>Es DP RateCode</th>
//                 <th style={thStyle}>ES Nominee</th>
//                 <th style={thStyle}>ES Nominee Reln with AcPCd</th>
//                 <th style={thStyle}>KS Client Sts</th>
//                 <th style={thStyle}>ES Client Sts</th>
//                 <th style={thStyle}>Back Office Current Status</th>
//                 <th style={thStyle}>KS NSE CM</th>
//                 <th style={thStyle}>ES NSE CM</th>
//                 <th style={thStyle}>KS ES NSE CM Match</th>
//                 <th style={thStyle}>KS BSE CM</th>
//                 <th style={thStyle}>ES BSE CM</th>
//                 <th style={thStyle}>KS ES BSE CM Match</th>
//                 <th style={thStyle}>KS NSE FO</th>
//                 <th style={thStyle}>ES NSE FO</th>
//                 <th style={thStyle}>KS ES NSE FO Match</th>
//                 <th style={thStyle}>KS NSE CDS</th>
//                 <th style={thStyle}>ES NSE CDS</th>
//                 <th style={thStyle}>KS ES NSE CDS Match</th>
//                 <th style={thStyle}>KS MCX</th>
//                 <th style={thStyle}>ES MCX</th>
//                 <th style={thStyle}>KS ES MCX Match</th>
//                 <th style={thStyle}>KS NCDEX</th>
//                 <th style={thStyle}>ES NCDEX</th>
//                 <th style={thStyle}>KS ES NCDEX Match</th>
//                 <th style={thStyle}>KS e-Mail ID</th>
//                 <th style={thStyle}>ES e-Mail ID</th>
//                 <th style={thStyle}>KS/ES e-Mail ID Match</th>
//                 <th style={thStyle}>KS e-Mail ID Reln with Client</th>
//                 <th style={thStyle}>ES e-Mail ID Reln with Client</th>
//                 <th style={thStyle}>Ks Mobile No.</th>
//                 <th style={thStyle}>Es Mobile No.</th>
//                 <th style={thStyle}>Ks / Es Mobile Match</th>
//                 <th style={thStyle}>Ks Mobile Reln with Client</th>
//                 <th style={thStyle}>Es Mobile Reln with Client</th>
//                 <th style={thStyle}>Branch Name</th>
//                 <th style={thStyle}>Family Group</th>
//                 <th style={thStyle}>Dormant :e-mail Sent</th>
//                 <th style={thStyle}>Dormant :Upcoming Days</th>
//                 <th style={thStyle}>BarCode</th>
//                 <th style={thStyle}>ES Cl Ac Closed During e-sign</th>
//                 <th style={thStyle}>ES DP Closer Trf to KS</th>
//                 <th style={thStyle}>KS KRA Status</th>
//                 <th style={thStyle}>KS PTT Status</th>
//                 <th style={thStyle}>KS KRA/UCC Sts</th>
//                 <th style={thStyle}>KS KRA/PTT Remarks</th>
//                 <th style={thStyle}>KS KRA/PTT e-mail Sent</th>
//                 <th style={thStyle}>KS PTT e-mail Recd</th>
//                 <th style={thStyle}>KS KRA Remark</th>
//                 <th style={thStyle}>KS KRA/PTT Remarks</th>
//                 <th style={thStyle}>3i Status 1</th>
//                 <th style={thStyle}>3i Status 2</th>
//                 <th style={thStyle}>Other Status</th>
//                 <th style={thStyle}>Multiple Email/Mobile</th>
//                 <th style={thStyle}>Kotak Status 1 (K/U)</th>
//                 <th style={thStyle}>Kotak Remark(s)</th>
//                 <th style={thStyle}>KS MTF ACTV</th>
//                 <th style={thStyle}>KS Location ID</th>
//                 <th style={thStyle}>KS Trading PlatForm</th>
//                 <th style={thStyle}>KS Client UserId</th>
//                 <th style={thStyle}>KS Running AcLtr(FO)</th>
//                 <th style={thStyle}>KS Running AcLtr(CM)</th>
//                 <th style={thStyle}>KS DP Id</th>
//                 <th style={thStyle}>Ks Dp BoId</th>
//                 <th style={thStyle}>KS Nominee</th>
//                 <th style={thStyle}>KS Nominee Reln with AcPCd</th>
//                 <th style={thStyle}>Ks Email Sent to Client</th>
//                 <th style={thStyle}>Ks e-Sign Status</th>
//                 <th style={thStyle}>e-Sign Triger Dt</th>
//                 <th style={thStyle}>Ks e-Sign Remarks</th>
//               </tr>
//             </thead>
//             <tbody>
    
//                 <tr>
//                 <td style={tdStyle}>{selectedRecord.es_dobdoi}</td>
//                 <td style={tdStyle}>{selectedRecord.catg}</td>
//                 <td style={tdStyle}>{selectedRecord.panno}</td>
//                 <td style={tdStyle}>{selectedRecord.estovr}</td>
//                 <td style={tdStyle}>{selectedRecord.es_netbkg}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_lstrdt}</td>
//                 <td style={tdStyle}>{selectedRecord.es_lstrdt}</td>
//                 <td style={tdStyle}>{selectedRecord.es_mtfpos}</td>
//                 <td style={tdStyle}>{selectedRecord.es_opnpos}</td>
//                 <td style={tdStyle}>{selectedRecord.es_margin}</td>
//                 <td style={tdStyle}>{selectedRecord.es_ledbal}</td>
//                 <td style={tdStyle}>{selectedRecord.es_dpledg}</td>
//                 <td style={tdStyle}>{selectedRecord.es_dphldg}</td>
//                 <td style={tdStyle}>{selectedRecord.es_ccol}</td>
//                 <td style={tdStyle}>{selectedRecord.es_nccol}</td>
//                 <td style={tdStyle}>{selectedRecord.es_pledval}</td>
//                 <td style={tdStyle}>{selectedRecord.es_corpact}</td>
//                 <td style={tdStyle}>{selectedRecord.es_pfreco}</td>
//                 <td style={tdStyle}>{selectedRecord.neoid}</td>
//                 <td style={tdStyle}>{selectedRecord.odinid}</td>
//                 <td style={tdStyle}>{selectedRecord.bossid}</td>
//                 <td style={tdStyle}>{selectedRecord.cl_frboss}</td>
//                 <td style={tdStyle}>{selectedRecord.es_locncd}</td>
//                 <td style={tdStyle}>{selectedRecord.es_locnid}</td>
//                 <td style={tdStyle}>{selectedRecord.eckyc_no}</td>
//                 <td style={tdStyle}>{selectedRecord.es_nodpac}</td>
//                 <td style={tdStyle}>{selectedRecord.esdp_map}</td>
//                 <td style={tdStyle}>{selectedRecord.es_dpboid}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_dprtcd}</td>
//                 <td style={tdStyle}>{selectedRecord.dp_ratecd}</td>
//                 <td style={tdStyle}>{selectedRecord.es_nomn}</td>
//                 <td style={tdStyle}>{selectedRecord.es_relwapc}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_clsts}</td>
//                 <td style={tdStyle}>{selectedRecord.es_clsts}</td>
//                 <td style={tdStyle}>{selectedRecord.bo_clsts}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_nsecm}</td>
//                 <td style={tdStyle}>{selectedRecord.es_nsecm}</td>
//                 <td style={tdStyle}>{selectedRecord.is_mtchncm}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_bsecm}</td>
//                 <td style={tdStyle}>{selectedRecord.es_bsecm}</td>
//                 <td style={tdStyle}>{selectedRecord.is_mtchbcm}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_nsefo}</td>
//                 <td style={tdStyle}>{selectedRecord.es_nsefo}</td>
//                 <td style={tdStyle}>{selectedRecord.is_mtchnfo}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_nsecds}</td>
//                 <td style={tdStyle}>{selectedRecord.es_nsecds}</td>
//                 <td style={tdStyle}>{selectedRecord.is_mtchcds}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_mcx}</td>
//                 <td style={tdStyle}>{selectedRecord.es_mcx}</td>
//                 <td style={tdStyle}>{selectedRecord.is_mtchmcx}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_ncdex}</td>
//                 <td style={tdStyle}>{selectedRecord.es_ncdex}</td>
//                 <td style={tdStyle}>{selectedRecord.is_mtchncd}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_emailid}</td>
//                 <td style={tdStyle}>{selectedRecord.es_email}</td>
//                 <td style={tdStyle}>{selectedRecord.is_mtch_em}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_emrel}</td>
//                 <td style={tdStyle}>{selectedRecord.es_emrel}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_mobile}</td>
//                 <td style={tdStyle}>{selectedRecord.es_mobile}</td>
//                 <td style={tdStyle}>{selectedRecord.is_mtch_mo}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_mobrel}</td>
//                 <td style={tdStyle}>{selectedRecord.es_mobrel}</td>
//                 <td style={tdStyle}>{selectedRecord.brname}</td>
//                 <td style={tdStyle}>{selectedRecord.family_grp}</td>
//                 <td style={tdStyle}>{selectedRecord.ems_ddt}</td>
//                 <td style={tdStyle}>{selectedRecord.nod_dormnt}</td>
//                 <td style={tdStyle}>{selectedRecord.barcode}</td>
//                 <td style={tdStyle}>{selectedRecord.ac_closed}</td>
//                 <td style={tdStyle}>{selectedRecord.closer_trf}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_krasts}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_pttsts}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_kusts}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_krarem}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_emsent}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_emrecd}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_eslrm}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_ltstrm}</td>
//                 <td style={tdStyle}>{selectedRecord.sts1_3i}</td>
//                 <td style={tdStyle}>{selectedRecord.sts2_3i}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_othsts}</td>
//                 <td style={tdStyle}>{selectedRecord.mult_emmo}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_sts1}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_allrem}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_mtfcl}</td>
//                 <td style={tdStyle}>{selectedRecord.locationid}</td>
//                 <td style={tdStyle}>{selectedRecord.k_platform}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_clusrid}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_ralfno}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_ralncm}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_dpid}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_dpboid}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_nomn}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_relwapc}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_emtocl}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_esign}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_emtrgdt}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_essts}</td>
//                 </tr>
//             </tbody>
//           </table>


//       </>
//     ) : (
//       // If ucc is not found in allOptions, display data from selectedRecord
//       <>
//       <h3>Update Record</h3>
// <div>
//           <label>Interest:</label>
//           <select
//             value={selectedInterest}
//             onChange={this.handleInterestChange}
//           >
//             <option value="">Select Interest</option>
//             <option value="Interested">Interested</option>
//             <option value="Not Interested">Not Interested</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>

//         <div>
//           <label>Remark:</label>
//           <textarea
//             value={remark}
//             onChange={this.handleRemarkChange}
//             rows="4"
//             style={{ width: "100%", marginBottom: "10px" }}
//           />
//         </div>

//         <div>
//         &nbsp;
//         <label>Priority:</label>
//           <input type="text" value={selectedRecord.priority} disabled />
//           &nbsp;
//           <label>Branch:</label>
//           <input type="text" value={selectedRecord.brcd} disabled />
//           &nbsp;
//           <label>UCC:</label>
//           <input type="text" value={selectedRecord.ucc} disabled />
//           &nbsp;
//           <label>Name:</label>
//           <input type="text" value={selectedRecord.clname} disabled />
//           <div>
//           <label>PAN:</label>
//           <input type="text" value={selectedRecord.panno} disabled />
//           &nbsp;
//           <label>DP Holding:</label>
//           <input
//             type="text"
//             value={selectedRecord.es_dphldg}
//             disabled
//           />
//           &nbsp;
//           <label>KRA Status:</label>
//           <input
//             type="text"
//             value={selectedRecord.result}
//             disabled
//           />
//           &nbsp;
//           </div>
//         </div>
//         <table className="table table-striped table-scroll" style={tableStyle}>
//             <thead>
//               <tr>
//                 <th style={thStyle}>DoB or DoI</th>
//                 <th style={thStyle}>Category</th>
//                 <th style={thStyle}>Pan No</th>
//                 <th style={thStyle}>ES TurnOver</th>
//                 <th style={thStyle}>Es Net Brokerage</th>
//                 <th style={thStyle}>KS Lst Trd</th>
//                 <th style={thStyle}>ES Lst Trd</th>
//                 <th style={thStyle}>ES Mtf Position</th>
//                 <th style={thStyle}>ES F&o Open Position</th>
//                 <th style={thStyle}>ES Margin</th>
//                 <th style={thStyle}>ES Ledger Balance</th>
//                 <th style={thStyle}>ES DP Ledger Balance</th>
//                 <th style={thStyle}>ES DP Holding</th>
//                 <th style={thStyle}>ES Cash Colletral</th>
//                 <th style={thStyle}>Non-CashColleteral</th>
//                 <th style={thStyle}>Es Pledge Value</th>
//                 <th style={thStyle}>Es Corp Action</th>
//                 <th style={thStyle}>ES PortFolio Recon</th>
//                 <th style={thStyle}>NEO ID</th>
//                 <th style={thStyle}>ODIN ID</th>
//                 <th style={thStyle}>BOSS ID</th>
//                 <th style={thStyle}>Client From Boss</th>
//                 <th style={thStyle}>ES Location ID</th>
//                 <th style={thStyle}>ES Location Code</th>
//                 <th style={thStyle}>ES Ckyc No</th>
//                 <th style={thStyle}>Es NoofBOId</th>
//                 <th style={thStyle}>Es BOId Map at KS</th>
//                 <th style={thStyle}>Es BOId</th>
//                 <th style={thStyle}>KS DP RateCode</th>
//                 <th style={thStyle}>Es DP RateCode</th>
//                 <th style={thStyle}>ES Nominee</th>
//                 <th style={thStyle}>ES Nominee Reln with AcPCd</th>
//                 <th style={thStyle}>KS Client Sts</th>
//                 <th style={thStyle}>ES Client Sts</th>
//                 <th style={thStyle}>Back Office Current Status</th>
//                 <th style={thStyle}>KS NSE CM</th>
//                 <th style={thStyle}>ES NSE CM</th>
//                 <th style={thStyle}>KS ES NSE CM Match</th>
//                 <th style={thStyle}>KS BSE CM</th>
//                 <th style={thStyle}>ES BSE CM</th>
//                 <th style={thStyle}>KS ES BSE CM Match</th>
//                 <th style={thStyle}>KS NSE FO</th>
//                 <th style={thStyle}>ES NSE FO</th>
//                 <th style={thStyle}>KS ES NSE FO Match</th>
//                 <th style={thStyle}>KS NSE CDS</th>
//                 <th style={thStyle}>ES NSE CDS</th>
//                 <th style={thStyle}>KS ES NSE CDS Match</th>
//                 <th style={thStyle}>KS MCX</th>
//                 <th style={thStyle}>ES MCX</th>
//                 <th style={thStyle}>KS ES MCX Match</th>
//                 <th style={thStyle}>KS NCDEX</th>
//                 <th style={thStyle}>ES NCDEX</th>
//                 <th style={thStyle}>KS ES NCDEX Match</th>
//                 <th style={thStyle}>KS e-Mail ID</th>
//                 <th style={thStyle}>ES e-Mail ID</th>
//                 <th style={thStyle}>KS/ES e-Mail ID Match</th>
//                 <th style={thStyle}>KS e-Mail ID Reln with Client</th>
//                 <th style={thStyle}>ES e-Mail ID Reln with Client</th>
//                 <th style={thStyle}>Ks Mobile No.</th>
//                 <th style={thStyle}>Es Mobile No.</th>
//                 <th style={thStyle}>Ks / Es Mobile Match</th>
//                 <th style={thStyle}>Ks Mobile Reln with Client</th>
//                 <th style={thStyle}>Es Mobile Reln with Client</th>
//                 <th style={thStyle}>Branch Name</th>
//                 <th style={thStyle}>Family Group</th>
//                 <th style={thStyle}>Dormant :e-mail Sent</th>
//                 <th style={thStyle}>Dormant :Upcoming Days</th>
//                 <th style={thStyle}>BarCode</th>
//                 <th style={thStyle}>ES Cl Ac Closed During e-sign</th>
//                 <th style={thStyle}>ES DP Closer Trf to KS</th>
//                 <th style={thStyle}>KS KRA Status</th>
//                 <th style={thStyle}>KS PTT Status</th>
//                 <th style={thStyle}>KS KRA/UCC Sts</th>
//                 <th style={thStyle}>KS KRA/PTT Remarks</th>
//                 <th style={thStyle}>KS KRA/PTT e-mail Sent</th>
//                 <th style={thStyle}>KS PTT e-mail Recd</th>
//                 <th style={thStyle}>KS KRA Remark</th>
//                 <th style={thStyle}>KS KRA/PTT Remarks</th>
//                 <th style={thStyle}>3i Status 1</th>
//                 <th style={thStyle}>3i Status 2</th>
//                 <th style={thStyle}>Other Status</th>
//                 <th style={thStyle}>Multiple Email/Mobile</th>
//                 <th style={thStyle}>Kotak Status 1 (K/U)</th>
//                 <th style={thStyle}>Kotak Remark(s)</th>
//                 <th style={thStyle}>KS MTF ACTV</th>
//                 <th style={thStyle}>KS Location ID</th>
//                 <th style={thStyle}>KS Trading PlatForm</th>
//                 <th style={thStyle}>KS Client UserId</th>
//                 <th style={thStyle}>KS Running AcLtr(FO)</th>
//                 <th style={thStyle}>KS Running AcLtr(CM)</th>
//                 <th style={thStyle}>KS DP Id</th>
//                 <th style={thStyle}>Ks Dp BoId</th>
//                 <th style={thStyle}>KS Nominee</th>
//                 <th style={thStyle}>KS Nominee Reln with AcPCd</th>
//                 <th style={thStyle}>Ks Email Sent to Client</th>
//                 <th style={thStyle}>Ks e-Sign Status</th>
//                 <th style={thStyle}>e-Sign Triger Dt</th>
//                 <th style={thStyle}>Ks e-Sign Remarks</th>
//               </tr>
//             </thead>
//             <tbody>
    
//                 <tr>
//                 <td style={tdStyle}>{selectedRecord.es_dobdoi}</td>
//                 <td style={tdStyle}>{selectedRecord.catg}</td>
//                 <td style={tdStyle}>{selectedRecord.panno}</td>
//                 <td style={tdStyle}>{selectedRecord.estovr}</td>
//                 <td style={tdStyle}>{selectedRecord.es_netbkg}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_lstrdt}</td>
//                 <td style={tdStyle}>{selectedRecord.es_lstrdt}</td>
//                 <td style={tdStyle}>{selectedRecord.es_mtfpos}</td>
//                 <td style={tdStyle}>{selectedRecord.es_opnpos}</td>
//                 <td style={tdStyle}>{selectedRecord.es_margin}</td>
//                 <td style={tdStyle}>{selectedRecord.es_ledbal}</td>
//                 <td style={tdStyle}>{selectedRecord.es_dpledg}</td>
//                 <td style={tdStyle}>{selectedRecord.es_dphldg}</td>
//                 <td style={tdStyle}>{selectedRecord.es_ccol}</td>
//                 <td style={tdStyle}>{selectedRecord.es_nccol}</td>
//                 <td style={tdStyle}>{selectedRecord.es_pledval}</td>
//                 <td style={tdStyle}>{selectedRecord.es_corpact}</td>
//                 <td style={tdStyle}>{selectedRecord.es_pfreco}</td>
//                 <td style={tdStyle}>{selectedRecord.neoid}</td>
//                 <td style={tdStyle}>{selectedRecord.odinid}</td>
//                 <td style={tdStyle}>{selectedRecord.bossid}</td>
//                 <td style={tdStyle}>{selectedRecord.cl_frboss}</td>
//                 <td style={tdStyle}>{selectedRecord.es_locncd}</td>
//                 <td style={tdStyle}>{selectedRecord.es_locnid}</td>
//                 <td style={tdStyle}>{selectedRecord.eckyc_no}</td>
//                 <td style={tdStyle}>{selectedRecord.es_nodpac}</td>
//                 <td style={tdStyle}>{selectedRecord.esdp_map}</td>
//                 <td style={tdStyle}>{selectedRecord.es_dpboid}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_dprtcd}</td>
//                 <td style={tdStyle}>{selectedRecord.dp_ratecd}</td>
//                 <td style={tdStyle}>{selectedRecord.es_nomn}</td>
//                 <td style={tdStyle}>{selectedRecord.es_relwapc}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_clsts}</td>
//                 <td style={tdStyle}>{selectedRecord.es_clsts}</td>
//                 <td style={tdStyle}>{selectedRecord.bo_clsts}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_nsecm}</td>
//                 <td style={tdStyle}>{selectedRecord.es_nsecm}</td>
//                 <td style={tdStyle}>{selectedRecord.is_mtchncm}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_bsecm}</td>
//                 <td style={tdStyle}>{selectedRecord.es_bsecm}</td>
//                 <td style={tdStyle}>{selectedRecord.is_mtchbcm}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_nsefo}</td>
//                 <td style={tdStyle}>{selectedRecord.es_nsefo}</td>
//                 <td style={tdStyle}>{selectedRecord.is_mtchnfo}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_nsecds}</td>
//                 <td style={tdStyle}>{selectedRecord.es_nsecds}</td>
//                 <td style={tdStyle}>{selectedRecord.is_mtchcds}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_mcx}</td>
//                 <td style={tdStyle}>{selectedRecord.es_mcx}</td>
//                 <td style={tdStyle}>{selectedRecord.is_mtchmcx}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_ncdex}</td>
//                 <td style={tdStyle}>{selectedRecord.es_ncdex}</td>
//                 <td style={tdStyle}>{selectedRecord.is_mtchncd}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_emailid}</td>
//                 <td style={tdStyle}>{selectedRecord.es_email}</td>
//                 <td style={tdStyle}>{selectedRecord.is_mtch_em}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_emrel}</td>
//                 <td style={tdStyle}>{selectedRecord.es_emrel}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_mobile}</td>
//                 <td style={tdStyle}>{selectedRecord.es_mobile}</td>
//                 <td style={tdStyle}>{selectedRecord.is_mtch_mo}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_mobrel}</td>
//                 <td style={tdStyle}>{selectedRecord.es_mobrel}</td>
//                 <td style={tdStyle}>{selectedRecord.brname}</td>
//                 <td style={tdStyle}>{selectedRecord.family_grp}</td>
//                 <td style={tdStyle}>{selectedRecord.ems_ddt}</td>
//                 <td style={tdStyle}>{selectedRecord.nod_dormnt}</td>
//                 <td style={tdStyle}>{selectedRecord.barcode}</td>
//                 <td style={tdStyle}>{selectedRecord.ac_closed}</td>
//                 <td style={tdStyle}>{selectedRecord.closer_trf}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_krasts}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_pttsts}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_kusts}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_krarem}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_emsent}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_emrecd}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_eslrm}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_ltstrm}</td>
//                 <td style={tdStyle}>{selectedRecord.sts1_3i}</td>
//                 <td style={tdStyle}>{selectedRecord.sts2_3i}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_othsts}</td>
//                 <td style={tdStyle}>{selectedRecord.mult_emmo}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_sts1}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_allrem}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_mtfcl}</td>
//                 <td style={tdStyle}>{selectedRecord.locationid}</td>
//                 <td style={tdStyle}>{selectedRecord.k_platform}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_clusrid}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_ralfno}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_ralncm}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_dpid}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_dpboid}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_nomn}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_relwapc}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_emtocl}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_esign}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_emtrgdt}</td>
//                 <td style={tdStyle}>{selectedRecord.ks_essts}</td>
//                 </tr>
//             </tbody>
//           </table>



//       </>
//     )}

//     <div style={{ textAlign: "right" }}>
//       <button
//         style={buttonStyle}
//         onClick={selectedOption ? this.handleSubmitEdit : this.handleSubmitUpdate}
//       >
//         {selectedOption ? "Save Changes" : "Submit Update"}
//       </button>
//       <button
//         style={{
//           ...buttonStyle,
//           backgroundColor: "#dc3545",
//           marginLeft: "10px",
//         }}
//         onClick={this.handleCloseEdit}
//       >
//         Cancel
//       </button>
//     </div>
//   </div>
// )}

//       </div>
//     );
//   }
// }









































import React, { Component } from "react";
import AuthService from "../../services/auth.service"; // Ensure you have AuthService in your project
import * as XLSX from "xlsx";

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  padding: "10px",
  backgroundColor: "#007bff",
  color: "#fff",
  textAlign: "left",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ddd",
};

const buttonStyle = {
  padding: "8px 12px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default class AskClient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      letterData: [],
      selectedRecord: null,
      isEditingRecord: false,
      selectedInterest: "",
      remark: "",
      searchValue: "",
      loading: false,
      dataFound: true,
      allOptions: [],
      selectedRows: [],
      selectedOption: null,
      selectedFilters: [],
      esldump: [],
    };
  }

  componentDidMount() {
    this.getLetterData();
    this.getEsldumpData();
    this.loadAllOptions(); // Fetch all options when component mounts
  }

  getLetterData = async () => {
    try {
      this.setState({ loading: true });
      const response = await fetch("http://183.182.84.228:4005/record/");
      const letterData = await response.json();
      const filteredData = letterData.filter(
        (record) => record.priority === "DPH"
      );
      if (filteredData.length > 0) {
        this.setState({ letterData: filteredData });
      } else {
        window.alert("Data not found for selected record.");
        this.setState({ dataFound: false });
      }
    } catch (error) {
      window.alert(`An error occurred: ${error}`);
    } finally {
      this.setState({ loading: false });
    }
  };

  getEsldumpData = async () => {
    try {
      this.setState({ loading: true });
      const response = await fetch("http://183.182.84.228:4005/esldump/");
      const esldumpData = await response.json();
      this.setState({ esldumpData });
    } catch (error) {
      window.alert(`An error occurred: ${error}`);
    } finally {
      this.setState({ loading: false });
    }
  };

  loadAllOptions = async () => {
    try {
      const allOptions = await AuthService.getAllOption();
      this.setState({ allOptions });
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  handleCheckboxChange = (event, record) => {
    const { checked } = event.target;
    const { selectedRows } = this.state;

    if (checked) {
      this.setState({
        selectedRows: [...selectedRows, record],
      });
    } else {
      this.setState({
        selectedRows: selectedRows.filter((row) => row !== record),
      });
    }
  };

  handleSubmitSelected = () => {
    const { selectedRows, selectedInterest, remark } = this.state;

    if (selectedRows.length === 0) {
      window.alert("Please select at least one record.");
      return;
    }

    // if (!selectedInterest || !remark) {
    //   window.alert("Please select an option and enter a remark.");
    //   return;
    // }

    if (!selectedInterest ) {
      window.alert("Please select an option or enter a remark.");
      return;
    }

    // Apply the selected interest and remark to all selected rows
    selectedRows.forEach((record) => {
      // Call your update or submit function here for each selected record
      AuthService.updateUserOption(
        record.ucc,
        record.clname,
        record.panno,
        selectedInterest, // Apply the selected interest to all
        remark,            // Apply the remark to all
        record.es_dphldg,
        record.result
      )
        .then(() => {
          console.log("Record updated successfully");
        })
        .catch((error) => {
          console.error("Error:", error);
          window.alert("Failed to update record.");
        });
    });

    // Clear selected rows after submission
    this.setState({ selectedRows: [] });
    window.alert("Selected records updated successfully!");
  };



  handleDownloadExcel = () => {
    const { selectedRows, allOptions, esldumpData } = this.state;
  
    if (selectedRows.length === 0) {
      window.alert("Please select at least one record to download.");
      return;
    }
  
    // Prepare data for "Selected Records" sheet
    const headers = [
      "User Option",
      "User Remark",
      "Branch", "ES UCC", "Client Name", "Pan No", "Es Mobile No.", 
      "ES e-Mail ID", "ES DP Holding", "ES DP Ledger Balance", "Category", 
      "KYC Sts Date", "Kyc Status", "Kyc Final Sts", "_Priority", 
      "ES Cl Ac Closed During e-sign", "ES DP Closer Trf to KS", "Dormant :e-mail Sent", 
      "Dormant :Upcoming Days", "BarCode", "KS UCC", "KS KRA Status", 
      "KS PTT Status", "KS KRA/UCC Sts", "KS KRA/PTT Remarks", "KS KRA/PTT e-mail Sent", 
      "KS PTT e-mail Recd", "KS KRA Remark", "KS KRA/PTT Remarks", "3i Status 1", 
      "3i Status 2", "Other Status", "Multiple Email/Mobile", "Kotak Status 1 (K/U)", 
      "Kotak Remark(s)", "ES K/C Sir Form Sts", "ES Prakash Form Sts", "DoB or DoI", 
      "NEO ID", "ODIN ID", "BOSS ID", "Client From Boss", "KS MTF ACTV", "KS Location ID", 
      "ES Location ID", "ES Location Code", "ES Ckyc No", "KS Trading PlatForm", 
      "KS Client UserId", "KS Running AcLtr(FO)", "KS Running AcLtr(CM)", "KS DP Id", 
      "Ks Dp BoId", "Es NoofBOId", "Es BOId Map at KS", "Es BOId", "KS DP RateCode", 
      "Es DP RateCode", "KS Nominee", "KS Nominee Reln with AcPCd", "ES Nominee", 
      "ES Nominee Reln with AcPCd", "KS Client Sts", "ES Client Sts", 
      "Back Office Current Status", "KS NSE CM", "ES NSE CM", "KS ES NSE CM Match", 
      "KS BSE CM", "ES BSE CM", "KS ES BSE CM Match", "KS NSE FO", "ES NSE FO", 
      "KS ES NSE FO Match", "KS NSE CDS", "ES NSE CDS", "KS ES NSE CDS Match", "KS MCX", 
      "ES MCX", "KS ES MCX Match", "KS NCDEX", "ES NCDEX", "KS ES NCDEX Match", 
      "Ks Email Sent to Client", "Ks e-Sign Status", "e-Sign Triger Dt", "Ks e-Sign Remarks", 
      "KS e-Mail ID", "KS/ES e-Mail ID Match", "KS e-Mail ID Reln with Client", 
      "ES e-Mail ID Reln with Client", "Ks Mobile No.", "Ks / Es Mobile Match", 
      "Ks Mobile Reln with Client", "Es Mobile Reln with Client", "ES TurnOver", 
      "Es Net Brokerage", "KS Lst Trd", "ES Lst Trd", "ES Mtf Position", 
      "ES F&o Open Position", "ES Margin", "ES Ledger Balance", "ES Cash Colletral", 
      "Non-CashColleteral", "Es Pledge Value", "Es Corp Action", "ES PortFolio Recon", 
      "Branch Name", "Family Group", "Report Date",
    ];
    
    const selectedData = selectedRows.map((record) => {
      const matchingOption = allOptions.find(
        (option) => option.Ucc === record.ucc
      );
  
      return {
        "User Option": matchingOption?.user_option || "No options available",
        "User Remark": matchingOption?.user_rem || "No Remark available",
               "Branch": record.brcd, 
        "ES UCC": record.ucc,
        "Client Name": record.clname,
        "Pan No": record.panno,
        "Es Mobile No.": record.es_mobile,
        "ES e-Mail ID": record.es_email,
        "ES DP Holding": record.es_dphldg,
        "ES DP Ledger Balance": record.es_dpledg,
        "Category": record.catg,
        "KYC Sts Date": record.kyc_stsdt,
        "Kyc Status": record.kyc_sts,
        "Kyc Final Sts": record.kyc_fnlsts,
        "_Priority": record.priority,
        "ES Cl Ac Closed During e-sign": record.ac_closed,
        "ES DP Closer Trf to KS": record.closer_trf,
        "Dormant :e-mail Sent": record.ems_ddt,
        "Dormant :Upcoming Days": record.nod_dormnt,
        "BarCode": record.barcode,
        "KS UCC": record.kslucc,
        "KS KRA Status": record.ks_krasts,
        "KS PTT Status": record.ks_pttsts,
        "KS KRA/UCC Sts": record.ks_kusts,
        "KS KRA/PTT Remarks": record.ks_krarem,
        "KS KRA/PTT e-mail Sent": record.ks_emsent,
        "KS PTT e-mail Recd": record.ks_emrecd,
        "KS KRA Remark": record.ks_eslrm,
        "KS KRA/PTT Remarks": record.ks_ltstrm,
        "3i Status 1": record.sts1_3i,
        "3i Status 2": record.sts2_3i,
        "Other Status": record.ks_othsts,
        "Multiple Email/Mobile": record.mult_emmo,
        "Kotak Status 1 (K/U)": record.ks_sts1,
        "Kotak Remark(s)": record.ks_allrem,
        "ES K/C Sir Form Sts": record.es_rem1kc,
        "ES Prakash Form Sts": record.es_rem2pp,
        "DoB or DoI": record.es_dobdoi,
        "NEO ID": record.neoid,
        "ODIN ID": record.odinid,
        "BOSS ID": record.bossid,
        "Client From Boss": record.cl_frboss,
        "KS MTF ACTV": record.ks_mtfcl,
        "KS Location ID": record.locationid,
        "ES Location ID": record.es_locncd,
        "ES Location Code": record.es_locnid,
        "ES Ckyc No": record.eckyc_no,
        "KS Trading PlatForm": record.k_platform,
        "KS Client UserId": record.ks_clusrid,
        "KS Running AcLtr(FO)": record.ks_ralfno,
        "KS Running AcLtr(CM)": record.ks_ralncm,
        "KS DP Id": record.ks_dpid,
        "Ks Dp BoId": record.ks_dpboid,
        "Es NoofBOId": record.es_nodpac,
        "Es BOId Map at KS": record.esdp_map,
        "Es BOId": record.es_dpboid,
        "KS DP RateCode": record.ks_dprtcd,
        "Es DP RateCode": record.dp_ratecd,
        "KS Nominee": record.ks_nomn,
        "KS Nominee Reln with AcPCd": record.ks_relwapc,
        "ES Nominee": record.es_nomn,
        "ES Nominee Reln with AcPCd": record.es_relwapc,
        "KS Client Sts": record.ks_clsts,
        "ES Client Sts": record.es_clsts,
        "Back Office Current Status": record.bo_clsts,
        "KS NSE CM": record.ks_nsecm,
        "ES NSE CM": record.es_nsecm,
        "KS ES NSE CM Match": record.is_mtchncm,
        "KS BSE CM": record.ks_bsecm,
        "ES BSE CM": record.es_bsecm,
        "KS ES BSE CM Match": record.is_mtchbcm,
        "KS NSE FO": record.ks_nsefo,
        "ES NSE FO": record.es_nsefo,
        "KS ES NSE FO Match": record.is_mtchnfo,
        "KS NSE CDS": record.ks_nsecds,
        "ES NSE CDS": record.es_nsecds,
        "KS ES NSE CDS Match": record.is_mtchcds,
        "KS MCX": record.ks_mcx,
        "ES MCX": record.es_mcx,
        "KS ES MCX Match": record.is_mtchmcx,
        "KS NCDEX": record.ks_ncdex,
        "ES NCDEX": record.es_ncdex,
        "KS ES NCDEX Match": record.is_mtchncd,
        "Ks Email Sent to Client": record.ks_emtocl,
        "Ks e-Sign Status": record.ks_esign,
        "e-Sign Triger Dt": record.ks_emtrgdt,
        "Ks e-Sign Remarks": record.ks_essts,
        "KS e-Mail ID": record.ks_emailid,
        "KS/ES e-Mail ID Match": record.is_mtch_em,
        "KS e-Mail ID Reln with Client": record.ks_emrel,
        "ES e-Mail ID Reln with Client": record.es_emrel,
        "Ks Mobile No.": record.ks_mobile,
        "Ks / Es Mobile Match": record.is_mtch_mo,
        "Ks Mobile Reln with Client": record.ks_mobrel,
        "Es Mobile Reln with Client": record.es_mobrel,
        "ES TurnOver": record.estovr,
        "Es Net Brokerage": record.es_netbkg,
        "KS Lst Trd": record.ks_lstrdt,
        "ES Lst Trd": record.es_lstrdt,
        "ES Mtf Position": record.es_mtfpos,
        "ES F&o Open Position": record.es_opnpos,
        "ES Margin": record.es_margin,
        "ES Ledger Balance": record.es_ledbal,
        "ES Cash Colletral": record.es_ccol,
        "Non-CashColleteral": record.es_nccol,
        "Es Pledge Value": record.es_pledval,
        "Es Corp Action": record.es_corpact,
        "ES PortFolio Recon": record.es_pfreco,
        "Branch Name": record.brname,
        "Family Group": record.family_grp,
        "Report Date": record.run_date,
      };
    });
  
    // Prepare data for "Client Dump" sheet
    const eslHeaders = [
      "priority", "brcd", "rundate", "panno", "ucc", "barcode", "uccname", "bo_clsts", 
      "gender", "dob_doi", "m_status", "fahugunm", "add_line1", "add_line2", "add_line3", 
      "add_city", "pin_code", "add_stat", "add_cntry", "eckyc_no", "email", "mobile", 
      "natnl", "natnldesc", "gr_annrng", "gr_annasdt", "occn", "bnk_nm1", "bnk_acno1", 
      "bnk_acty1", "bnk_bradd1", "bank_city", "bank_ifsc", "bank_micr", "es_nomn", 
      "es_nomshr", "es_relwapc",
    ];
    
    const selectedPanNos = selectedRows.map((row) => row.panno);
    const eslData = esldumpData
      .filter((record) => selectedPanNos.includes(record.panno))
      .map((record) => ({
        ...record,
      }));
  
    // Create Excel workbook and worksheets
    const wb = XLSX.utils.book_new();
    const wsSelected = XLSX.utils.json_to_sheet(selectedData, { header: headers });
    const wsEsldump = XLSX.utils.json_to_sheet(eslData, { header: eslHeaders });
  
    XLSX.utils.book_append_sheet(wb, wsSelected, "Selected Records");
    XLSX.utils.book_append_sheet(wb, wsEsldump, "Client Dump");
  
    // Download the Excel file
    XLSX.writeFile(wb, "Combined_Selected_Records.xlsx");
  };
  

















  // handleDownloadExcel = () => {
  //   const { selectedRows, allOptions } = this.state;
  
  //   if (selectedRows.length === 0) {
  //     window.alert("Please select at least one record to download.");
  //     return;
  //   }
  
  //   // Headers for the Excel file
  //   const headers = [
  //     "User Option",
  //     "User Remark",
  //     "Branch",	"ES UCC",	"Client Name",	"Pan No",	"Es Mobile No.",	"ES e-Mail ID",	"ES DP Holding",	"ES DP Ledger Balance",	"Category",	"KYC Sts Date",	"Kyc Status",	"Kyc Final Sts",	"_Priority",	"ES Cl Ac Closed During e-sign",	"ES DP Closer Trf to KS",	"Dormant :e-mail Sent",	"Dormant :Upcoming Days",	"BarCode",	"KS UCC",	"KS KRA Status",	"KS PTT Status",	"KS KRA/UCC Sts",	"KS KRA/PTT Remarks",	"KS KRA/PTT e-mail Sent",	"KS PTT e-mail Recd",	"KS KRA Remark",	"KS KRA/PTT Remarks",	"3i Status 1",	"3i Status 2",	"Other Status",	"Multiple Email/Mobile",	"Kotak Status 1 (K/U)",	"Kotak Remark(s)",	"ES K/C Sir Form Sts",	"ES Prakash Form Sts",	"DoB or DoI",	"NEO ID",	"ODIN ID",	"BOSS ID",	"Client From Boss",	"KS MTF ACTV",	"KS Location ID",	"ES Location ID",	"ES Location Code",	"ES Ckyc No",	"KS Trading PlatForm",	"KS Client UserId",	"KS Running AcLtr(FO)",	"KS Running AcLtr(CM)",	"KS DP Id",	"Ks Dp BoId",	"Es NoofBOId",	"Es BOId Map at KS",	"Es BOId",	"KS DP RateCode",	"Es DP RateCode",	"KS Nominee",	"KS Nominee Reln with AcPCd",	"ES Nominee",	"ES Nominee Reln with AcPCd",	"KS Client Sts",	"ES Client Sts",	"Back Office Current Status",	"KS NSE CM",	"ES NSE CM",	"KS ES NSE CM Match",	"KS BSE CM",	"ES BSE CM",	"KS ES BSE CM Match",	"KS NSE FO",	"ES NSE FO",	"KS ES NSE FO Match",	"KS NSE CDS",	"ES NSE CDS",	"KS ES NSE CDS Match",	"KS MCX",	"ES MCX",	"KS ES MCX Match",	"KS NCDEX",	"ES NCDEX",	"KS ES NCDEX Match",	"Ks Email Sent to Client",	"Ks e-Sign Status",	"e-Sign Triger Dt",	"Ks e-Sign Remarks",	"KS e-Mail ID",	"KS/ES e-Mail ID Match",	"KS e-Mail ID Reln with Client",	"ES e-Mail ID Reln with Client",	"Ks Mobile No.",	"Ks / Es Mobile Match",	"Ks Mobile Reln with Client",	"Es Mobile Reln with Client",	"ES TurnOver",	"Es Net Brokerage",	"KS Lst Trd",	"ES Lst Trd",	"ES Mtf Position",	"ES F&o Open Position",	"ES Margin",	"ES Ledger Balance",	"ES Cash Colletral",	"Non-CashColleteral",	"Es Pledge Value",	"Es Corp Action",	"ES PortFolio Recon",	"Branch Name",	"Family Group",	"Report Date",
  //   ];
  
  //   // Combine letter data and option data
  //   const data = selectedRows.map((record) => {
  //     // Find matching option for the current record
  //     const matchingOption = allOptions.find((option) => option.Ucc === record.ucc);
  
  //     return {
  //       "User Option": matchingOption?.user_option || "No options available", // Option data field
  //       "User Remark": matchingOption?.user_rem || "No Remark available", // Option data field
  //       "Branch": record.brcd, 
  //       "ES UCC": record.ucc,
  //       "Client Name": record.clname,
  //       "Pan No": record.panno,
  //       "Es Mobile No.": record.es_mobile,
  //       "ES e-Mail ID": record.es_email,
  //       "ES DP Holding": record.es_dphldg,
  //       "ES DP Ledger Balance": record.es_dpledg,
  //       "Category": record.catg,
  //       "KYC Sts Date": record.kyc_stsdt,
  //       "Kyc Status": record.kyc_sts,
  //       "Kyc Final Sts": record.kyc_fnlsts,
  //       "_Priority": record.priority,
  //       "ES Cl Ac Closed During e-sign": record.ac_closed,
  //       "ES DP Closer Trf to KS": record.closer_trf,
  //       "Dormant :e-mail Sent": record.ems_ddt,
  //       "Dormant :Upcoming Days": record.nod_dormnt,
  //       "BarCode": record.barcode,
  //       "KS UCC": record.kslucc,
  //       "KS KRA Status": record.ks_krasts,
  //       "KS PTT Status": record.ks_pttsts,
  //       "KS KRA/UCC Sts": record.ks_kusts,
  //       "KS KRA/PTT Remarks": record.ks_krarem,
  //       "KS KRA/PTT e-mail Sent": record.ks_emsent,
  //       "KS PTT e-mail Recd": record.ks_emrecd,
  //       "KS KRA Remark": record.ks_eslrm,
  //       "KS KRA/PTT Remarks": record.ks_ltstrm,
  //       "3i Status 1": record.sts1_3i,
  //       "3i Status 2": record.sts2_3i,
  //       "Other Status": record.ks_othsts,
  //       "Multiple Email/Mobile": record.mult_emmo,
  //       "Kotak Status 1 (K/U)": record.ks_sts1,
  //       "Kotak Remark(s)": record.ks_allrem,
  //       "ES K/C Sir Form Sts": record.es_rem1kc,
  //       "ES Prakash Form Sts": record.es_rem2pp,
  //       "DoB or DoI": record.es_dobdoi,
  //       "NEO ID": record.neoid,
  //       "ODIN ID": record.odinid,
  //       "BOSS ID": record.bossid,
  //       "Client From Boss": record.cl_frboss,
  //       "KS MTF ACTV": record.ks_mtfcl,
  //       "KS Location ID": record.locationid,
  //       "ES Location ID": record.es_locncd,
  //       "ES Location Code": record.es_locnid,
  //       "ES Ckyc No": record.eckyc_no,
  //       "KS Trading PlatForm": record.k_platform,
  //       "KS Client UserId": record.ks_clusrid,
  //       "KS Running AcLtr(FO)": record.ks_ralfno,
  //       "KS Running AcLtr(CM)": record.ks_ralncm,
  //       "KS DP Id": record.ks_dpid,
  //       "Ks Dp BoId": record.ks_dpboid,
  //       "Es NoofBOId": record.es_nodpac,
  //       "Es BOId Map at KS": record.esdp_map,
  //       "Es BOId": record.es_dpboid,
  //       "KS DP RateCode": record.ks_dprtcd,
  //       "Es DP RateCode": record.dp_ratecd,
  //       "KS Nominee": record.ks_nomn,
  //       "KS Nominee Reln with AcPCd": record.ks_relwapc,
  //       "ES Nominee": record.es_nomn,
  //       "ES Nominee Reln with AcPCd": record.es_relwapc,
  //       "KS Client Sts": record.ks_clsts,
  //       "ES Client Sts": record.es_clsts,
  //       "Back Office Current Status": record.bo_clsts,
  //       "KS NSE CM": record.ks_nsecm,
  //       "ES NSE CM": record.es_nsecm,
  //       "KS ES NSE CM Match": record.is_mtchncm,
  //       "KS BSE CM": record.ks_bsecm,
  //       "ES BSE CM": record.es_bsecm,
  //       "KS ES BSE CM Match": record.is_mtchbcm,
  //       "KS NSE FO": record.ks_nsefo,
  //       "ES NSE FO": record.es_nsefo,
  //       "KS ES NSE FO Match": record.is_mtchnfo,
  //       "KS NSE CDS": record.ks_nsecds,
  //       "ES NSE CDS": record.es_nsecds,
  //       "KS ES NSE CDS Match": record.is_mtchcds,
  //       "KS MCX": record.ks_mcx,
  //       "ES MCX": record.es_mcx,
  //       "KS ES MCX Match": record.is_mtchmcx,
  //       "KS NCDEX": record.ks_ncdex,
  //       "ES NCDEX": record.es_ncdex,
  //       "KS ES NCDEX Match": record.is_mtchncd,
  //       "Ks Email Sent to Client": record.ks_emtocl,
  //       "Ks e-Sign Status": record.ks_esign,
  //       "e-Sign Triger Dt": record.ks_emtrgdt,
  //       "Ks e-Sign Remarks": record.ks_essts,
  //       "KS e-Mail ID": record.ks_emailid,
  //       "KS/ES e-Mail ID Match": record.is_mtch_em,
  //       "KS e-Mail ID Reln with Client": record.ks_emrel,
  //       "ES e-Mail ID Reln with Client": record.es_emrel,
  //       "Ks Mobile No.": record.ks_mobile,
  //       "Ks / Es Mobile Match": record.is_mtch_mo,
  //       "Ks Mobile Reln with Client": record.ks_mobrel,
  //       "Es Mobile Reln with Client": record.es_mobrel,
  //       "ES TurnOver": record.estovr,
  //       "Es Net Brokerage": record.es_netbkg,
  //       "KS Lst Trd": record.ks_lstrdt,
  //       "ES Lst Trd": record.es_lstrdt,
  //       "ES Mtf Position": record.es_mtfpos,
  //       "ES F&o Open Position": record.es_opnpos,
  //       "ES Margin": record.es_margin,
  //       "ES Ledger Balance": record.es_ledbal,
  //       "ES Cash Colletral": record.es_ccol,
  //       "Non-CashColleteral": record.es_nccol,
  //       "Es Pledge Value": record.es_pledval,
  //       "Es Corp Action": record.es_corpact,
  //       "ES PortFolio Recon": record.es_pfreco,
  //       "Branch Name": record.brname,
  //       "Family Group": record.family_grp,
  //       "Report Date": record.run_date,
  //     };
  //   });
  
  //   // Create a worksheet
  //   const ws = XLSX.utils.json_to_sheet(data, { header: headers });
  
  //   // Create a new workbook
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Selected Records");
  
  //   // Download the Excel file
  //   XLSX.writeFile(wb, "Combined_Selected_Records.xlsx");
  // };
  

  handleInterestChange = (e) => {
    this.setState({ selectedInterest: e.target.value });
  };

  handleRemarkChange = (e) => {
    this.setState({ remark: e.target.value });
  };

  handleView = (record) => {
    const localOption = this.state.allOptions.find(
      (option) => option.Ucc === record.ucc
    );
  
    this.setState({
      selectedRecord: {
        ...record,
        user_option: localOption ? localOption.user_option : "No data available",
        user_rem: localOption ? localOption.user_rem : "No data available",
        updatedate: localOption ? localOption.updatedate : "No data available",
      },
      isEditingRecord: true,
    });
  };
  
  handleCloseEdit = () => {
    this.setState({
      isEditingRecord: false,
      selectedRecord: null,
    });
  };

  handleSubmitEdit = () => {
    const { selectedRecord, selectedInterest, remark, dates } = this.state;

    AuthService.updateUserOption(
      selectedRecord.ucc,
      selectedRecord.clname,
      selectedRecord.panno,
      selectedInterest,
      remark,
      selectedRecord.es_dphldg,
      selectedRecord.kyc_fnlsts
    )
      .then(() => {
        console.log("Record updated successfully");
        this.setState({
          isEditingRecord: false,
          selectedRecord: null,
          selectedOption: null,
          selectedInterest: "",
          remark: "",
        });
        window.alert("Record updated successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        window.alert("Failed to update record.");
      });
  };





  render() {
    const {
      letterData,
      selectedRows,
      loading,
      selectedInterest,
      remark,
      dates,
      isEditingRecord,
      selectedRecord,
      allOptions,
      searchQuery,
      selectedFilters, // New state for selected filters
    } = this.state;
  
    // Step 1: Separate records with corresponding 'allOptions' data and the rest
    const recordsWithOptions = letterData.filter((record) =>
      allOptions.some((option) => option.Ucc === record.ucc)
    );
  
    const recordsWithoutOptions = letterData.filter(
      (record) => !allOptions.some((option) => option.Ucc === record.ucc)
    );
  
    // Step 2: Combine the two arrays
    const sortedLetterData = [...recordsWithOptions, ...recordsWithoutOptions];
  
    // Step 3: Filter based on search query and selected filters
    const searchTerms = (searchQuery || '')
    .split(',')
    .map((term) => term.trim().toLowerCase()) // Split, trim, and normalize
    .filter((term) => term); // Remove empty strings

    const filteredData = letterData.filter((record) => {
      // Match with search terms
      const matchesSearch =
        searchTerms.length === 0 ||
        searchTerms.some((term) =>
          [record.clname, record.ucc, record.panno, record.brcd]
            .filter((field) => field)
            .some((field) => field.toLowerCase().includes(term))
        );
    
      // Match with user options using `localalloption`
      const localOption = allOptions.find(
        (localalloption) => localalloption.Ucc === record.ucc
      );
      const matchesFilter =
        selectedFilters.length === 0 ||
        (localOption && selectedFilters.includes(localOption.user_option));
    
      // Combine search and filter logic
      return matchesSearch && matchesFilter;
    });


    const selectedOption = allOptions.find(
      (option) => option.Ucc === selectedRecord?.ucc
    );
    
  
    return (
      <div>
        <h2>Select Multiple Records</h2>
  
        {/* Filter Checkboxes */}
        {/* Search Bar */}
        <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search by UCC, Client Name, PAN, or Branch Code"
          value={searchQuery || ''}
          onChange={(e) => this.setState({ searchQuery: e.target.value })}
          style={{
            width: '29%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
           &nbsp;&nbsp;&nbsp;
          <label>
            <input
              type="checkbox"
              checked={selectedFilters.includes('Interested')}
              onChange={() => {
                const filters = [...selectedFilters];
                if (filters.includes('Interested')) {
                  // Remove "Interested"
                  this.setState({
                    selectedFilters: filters.filter((f) => f !== 'Interested'),
                  });
                } else {
                  // Add "Interested"
                  this.setState({ selectedFilters: [...filters, 'Interested'] });
                }
              }}
            />
            Interested
          </label>
          <label style={{ marginLeft: '10px' }}>
            <input
              type="checkbox"
              checked={selectedFilters.includes('Not Interested')}
              onChange={() => {
                const filters = [...selectedFilters];
                if (filters.includes('Not Interested')) {
                  this.setState({
                    selectedFilters: filters.filter((f) => f !== 'Not Interested'),
                  });
                } else {
                  this.setState({
                    selectedFilters: [...filters, 'Not Interested'],
                  });
                }
              }}
            />
            Not Interested
          </label>
          <label style={{ marginLeft: '10px' }}>
            <input
              type="checkbox"
              checked={selectedFilters.includes('Other')}
              onChange={() => {
                const filters = [...selectedFilters];
                if (filters.includes('Other')) {
                  this.setState({
                    selectedFilters: filters.filter((f) => f !== 'Other'),
                  });
                } else {
                  this.setState({ selectedFilters: [...filters, 'Other'] });
                }
              }}
            />
            Other
          </label>
        </div>
  
        <div>
        <label>Interest:</label>
          <select value={selectedInterest} onChange={this.handleInterestChange}>
            <option value="">Select Interest</option>
            <option value="Interested">Interested</option>
            <option value="Not Interested">Not Interested</option>
            <option value="Other">Other</option>
          </select>
  
          <label>Remark:</label>
          <input
            type="text"
            value={remark}
            onChange={this.handleRemarkChange}
            placeholder="Enter Remark"
          />
&nbsp;&nbsp;&nbsp;
          <button style={buttonStyle} onClick={this.handleSubmitSelected}>
            Submit Selected
          </button>
          
          
        </div>

        <div>
        <button style={buttonStyle} onClick={this.handleDownloadExcel}>
            Download Selected Records as Excel
          </button>
        </div>
  
        {loading && <p>Loading...</p>}
      {filteredData.length > 0 ? (
        <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>
              <input
                type="checkbox"
                checked={selectedRows.length === filteredData.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    this.setState({
                      selectedRows: filteredData,
                    });
                  } else {
                    this.setState({
                      selectedRows: [],
                    });
                  }
                }}
              />
            </th>
                <th style={thStyle}>Client Code</th>
                <th style={thStyle}>Client Name</th>
                <th style={thStyle}>PAN No.</th>
                <th style={thStyle}>Mobile No.</th>
                <th style={thStyle}>Es Net Brokerage</th>
                <th style={thStyle}>ES DP Holding</th>
                <th style={thStyle}>KYC Sts Date</th>
                <th style={thStyle}>Kyc Final Sts</th>
                <th style={thStyle}>User Option</th>
                <th style={thStyle}>View</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((record) => {
            const localOption = allOptions.find(
              (localalloption) => localalloption.Ucc === record.ucc
            );
      
            return (
              <tr key={record.ucc}>
                <td style={tdStyle}>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(record)}
                    onChange={(e) => this.handleCheckboxChange(e, record)}
                  />
                </td>
                <td style={tdStyle} className="col">{record.ucc}</td>
                  <td style={tdStyle} className="col">{record.clname}</td>
                  <td style={tdStyle} className="col">{record.panno}</td>
                  <td style={tdStyle} className="col">{record.es_mobile}</td>
                  <td style={tdStyle} className="col">{record.es_netbkg}</td>
                  <td style={tdStyle} className="col">{record.es_dphldg}</td>
                  <td style={tdStyle} className="col">{record.date}</td>
                  <td style={tdStyle} className="col">{record.result}</td>
                <td style={tdStyle}>
                {localOption ? (
                      <>
                        <div>{localOption.user_option}</div>
                        <div>{localOption.user_rem}</div>
                        <div>{localOption.updatedate}</div>
                      </>
                    ) : (
                      <div>No options available</div>
                    )}
                </td>
                <td style={tdStyle}>
                  <button
                    style={buttonStyle}
                    onClick={() => this.handleView(record)}
                  >
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      ) : (
        <p>No records available.</p>
      )}

      {/* Edit Modal */}
      {isEditingRecord && selectedRecord && (
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            right: "10%",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            padding: "20px",
            zIndex: 10,
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3>Edit Record</h3>
          
          {/* Interest Dropdown */}
          <div>
            <label>Interest:</label>
            <select
              value={selectedInterest}
              onChange={this.handleInterestChange}
            >
              <option value="">Select Interest</option>
              <option value="Interested">Interested</option>
              <option value="Not Interested">Not Interested</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Remark Input */}
          <div>
            <label>Remark:</label>
            <textarea
              value={remark}
              onChange={this.handleRemarkChange}
              rows="4"
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </div>

          {/* If Selected Option Exists */}
          <label>UCC:</label>
              <input type="text" value={selectedRecord.ucc} disabled />

              <label>Name:</label>
              <input type="text" value={selectedRecord.clname} disabled />

              <label>PAN:</label>
              <input type="text" value={selectedRecord.Panno} disabled />

              <label>DP Holding:</label>
              <input type="text" value={selectedRecord.es_dphldg} disabled />

              <label>KRA Status:</label>
              <input type="text" value={selectedRecord.result} disabled />
          {selectedOption && (
          <>
            <div>
              

              <label>Option:</label>
              <input type="text" value={selectedOption.user_option} disabled />

              <label>Remark:</label>
              <input type="text" value={selectedOption.user_rem} disabled />

              <label>Date:</label>
              <input type="text" value={selectedOption.updatedate} disabled />
            </div>
            </>
          )}



{/* 
            {!selectedOption && (
          <>
            <div>
              <label>UCC:</label>
              <input type="text" value={selectedRecord.ucc} disabled />

              <label>Name:</label>
              <input type="text" value={selectedRecord.clname} disabled />

              <label>PAN:</label>
              <input type="text" value={selectedRecord.Panno} disabled />

              <label>DP Holding:</label>
              <input type="text" value={selectedRecord.es_dphldg} disabled />

              <label>KRA Status:</label>
              <input type="text" value={selectedRecord.result} disabled />

            </div>
            </>
          )} */}

          {/* Data Table */}
          <table className="table table-striped table-scroll" style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>DoB or DoI</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Pan No</th>
                <th style={thStyle}>ES TurnOver</th>
                <th style={thStyle}>Es Net Brokerage</th>
                <th style={thStyle}>KS Lst Trd</th>
                <th style={thStyle}>ES Lst Trd</th>
                <th style={thStyle}>ES Mtf Position</th>
                <th style={thStyle}>ES F&o Open Position</th>
                <th style={thStyle}>ES Margin</th>
                <th style={thStyle}>ES Ledger Balance</th>
                <th style={thStyle}>ES DP Ledger Balance</th>
                <th style={thStyle}>ES DP Holding</th>
                <th style={thStyle}>ES Cash Colletral</th>
                <th style={thStyle}>Non-CashColleteral</th>
                <th style={thStyle}>Es Pledge Value</th>
                <th style={thStyle}>Es Corp Action</th>
                <th style={thStyle}>ES PortFolio Recon</th>
                <th style={thStyle}>NEO ID</th>
                <th style={thStyle}>ODIN ID</th>
                <th style={thStyle}>BOSS ID</th>
                <th style={thStyle}>Client From Boss</th>
                <th style={thStyle}>ES Location ID</th>
                <th style={thStyle}>ES Location Code</th>
                <th style={thStyle}>ES Ckyc No</th>
                <th style={thStyle}>Es NoofBOId</th>
                <th style={thStyle}>Es BOId Map at KS</th>
                <th style={thStyle}>Es BOId</th>
                <th style={thStyle}>KS DP RateCode</th>
                <th style={thStyle}>Es DP RateCode</th>
                <th style={thStyle}>ES Nominee</th>
                <th style={thStyle}>ES Nominee Reln with AcPCd</th>
                <th style={thStyle}>KS Client Sts</th>
                <th style={thStyle}>ES Client Sts</th>
                <th style={thStyle}>Back Office Current Status</th>
                <th style={thStyle}>KS NSE CM</th>
                <th style={thStyle}>ES NSE CM</th>
                <th style={thStyle}>KS ES NSE CM Match</th>
                <th style={thStyle}>KS BSE CM</th>
                <th style={thStyle}>ES BSE CM</th>
                <th style={thStyle}>KS ES BSE CM Match</th>
                <th style={thStyle}>KS NSE FO</th>
                <th style={thStyle}>ES NSE FO</th>
                <th style={thStyle}>KS ES NSE FO Match</th>
                <th style={thStyle}>KS NSE CDS</th>
                <th style={thStyle}>ES NSE CDS</th>
                <th style={thStyle}>KS ES NSE CDS Match</th>
                <th style={thStyle}>KS MCX</th>
                <th style={thStyle}>ES MCX</th>
                <th style={thStyle}>KS ES MCX Match</th>
                <th style={thStyle}>KS NCDEX</th>
                <th style={thStyle}>ES NCDEX</th>
                <th style={thStyle}>KS ES NCDEX Match</th>
                <th style={thStyle}>KS e-Mail ID</th>
                <th style={thStyle}>ES e-Mail ID</th>
                <th style={thStyle}>KS/ES e-Mail ID Match</th>
                <th style={thStyle}>KS e-Mail ID Reln with Client</th>
                <th style={thStyle}>ES e-Mail ID Reln with Client</th>
                <th style={thStyle}>Ks Mobile No.</th>
                <th style={thStyle}>Es Mobile No.</th>
                <th style={thStyle}>Ks / Es Mobile Match</th>
                <th style={thStyle}>Ks Mobile Reln with Client</th>
                <th style={thStyle}>Es Mobile Reln with Client</th>
                <th style={thStyle}>Branch Name</th>
                <th style={thStyle}>Family Group</th>
                <th style={thStyle}>Dormant :e-mail Sent</th>
                <th style={thStyle}>Dormant :Upcoming Days</th>
                <th style={thStyle}>BarCode</th>
                <th style={thStyle}>ES Cl Ac Closed During e-sign</th>
                <th style={thStyle}>ES DP Closer Trf to KS</th>
                <th style={thStyle}>KS KRA Status</th>
                <th style={thStyle}>KS PTT Status</th>
                <th style={thStyle}>KS KRA/UCC Sts</th>
                <th style={thStyle}>KS KRA/PTT Remarks</th>
                <th style={thStyle}>KS KRA/PTT e-mail Sent</th>
                <th style={thStyle}>KS PTT e-mail Recd</th>
                <th style={thStyle}>KS KRA Remark</th>
                <th style={thStyle}>KS KRA/PTT Remarks</th>
                <th style={thStyle}>3i Status 1</th>
                <th style={thStyle}>3i Status 2</th>
                <th style={thStyle}>Other Status</th>
                <th style={thStyle}>Multiple Email/Mobile</th>
                <th style={thStyle}>Kotak Status 1 (K/U)</th>
                <th style={thStyle}>Kotak Remark(s)</th>
                <th style={thStyle}>KS MTF ACTV</th>
                <th style={thStyle}>KS Location ID</th>
                <th style={thStyle}>KS Trading PlatForm</th>
                <th style={thStyle}>KS Client UserId</th>
                <th style={thStyle}>KS Running AcLtr(FO)</th>
                <th style={thStyle}>KS Running AcLtr(CM)</th>
                <th style={thStyle}>KS DP Id</th>
                <th style={thStyle}>Ks Dp BoId</th>
                <th style={thStyle}>KS Nominee</th>
                <th style={thStyle}>KS Nominee Reln with AcPCd</th>
                <th style={thStyle}>Ks Email Sent to Client</th>
                <th style={thStyle}>Ks e-Sign Status</th>
                <th style={thStyle}>e-Sign Triger Dt</th>
                <th style={thStyle}>Ks e-Sign Remarks</th>
              </tr>
            </thead>
            <tbody>
    
                <tr>
                <td style={tdStyle}>{selectedRecord.es_dobdoi}</td>
                <td style={tdStyle}>{selectedRecord.catg}</td>
                <td style={tdStyle}>{selectedRecord.panno}</td>
                <td style={tdStyle}>{selectedRecord.estovr}</td>
                <td style={tdStyle}>{selectedRecord.es_netbkg}</td>
                <td style={tdStyle}>{selectedRecord.ks_lstrdt}</td>
                <td style={tdStyle}>{selectedRecord.es_lstrdt}</td>
                <td style={tdStyle}>{selectedRecord.es_mtfpos}</td>
                <td style={tdStyle}>{selectedRecord.es_opnpos}</td>
                <td style={tdStyle}>{selectedRecord.es_margin}</td>
                <td style={tdStyle}>{selectedRecord.es_ledbal}</td>
                <td style={tdStyle}>{selectedRecord.es_dpledg}</td>
                <td style={tdStyle}>{selectedRecord.es_dphldg}</td>
                <td style={tdStyle}>{selectedRecord.es_ccol}</td>
                <td style={tdStyle}>{selectedRecord.es_nccol}</td>
                <td style={tdStyle}>{selectedRecord.es_pledval}</td>
                <td style={tdStyle}>{selectedRecord.es_corpact}</td>
                <td style={tdStyle}>{selectedRecord.es_pfreco}</td>
                <td style={tdStyle}>{selectedRecord.neoid}</td>
                <td style={tdStyle}>{selectedRecord.odinid}</td>
                <td style={tdStyle}>{selectedRecord.bossid}</td>
                <td style={tdStyle}>{selectedRecord.cl_frboss}</td>
                <td style={tdStyle}>{selectedRecord.es_locncd}</td>
                <td style={tdStyle}>{selectedRecord.es_locnid}</td>
                <td style={tdStyle}>{selectedRecord.eckyc_no}</td>
                <td style={tdStyle}>{selectedRecord.es_nodpac}</td>
                <td style={tdStyle}>{selectedRecord.esdp_map}</td>
                <td style={tdStyle}>{selectedRecord.es_dpboid}</td>
                <td style={tdStyle}>{selectedRecord.ks_dprtcd}</td>
                <td style={tdStyle}>{selectedRecord.dp_ratecd}</td>
                <td style={tdStyle}>{selectedRecord.es_nomn}</td>
                <td style={tdStyle}>{selectedRecord.es_relwapc}</td>
                <td style={tdStyle}>{selectedRecord.ks_clsts}</td>
                <td style={tdStyle}>{selectedRecord.es_clsts}</td>
                <td style={tdStyle}>{selectedRecord.bo_clsts}</td>
                <td style={tdStyle}>{selectedRecord.ks_nsecm}</td>
                <td style={tdStyle}>{selectedRecord.es_nsecm}</td>
                <td style={tdStyle}>{selectedRecord.is_mtchncm}</td>
                <td style={tdStyle}>{selectedRecord.ks_bsecm}</td>
                <td style={tdStyle}>{selectedRecord.es_bsecm}</td>
                <td style={tdStyle}>{selectedRecord.is_mtchbcm}</td>
                <td style={tdStyle}>{selectedRecord.ks_nsefo}</td>
                <td style={tdStyle}>{selectedRecord.es_nsefo}</td>
                <td style={tdStyle}>{selectedRecord.is_mtchnfo}</td>
                <td style={tdStyle}>{selectedRecord.ks_nsecds}</td>
                <td style={tdStyle}>{selectedRecord.es_nsecds}</td>
                <td style={tdStyle}>{selectedRecord.is_mtchcds}</td>
                <td style={tdStyle}>{selectedRecord.ks_mcx}</td>
                <td style={tdStyle}>{selectedRecord.es_mcx}</td>
                <td style={tdStyle}>{selectedRecord.is_mtchmcx}</td>
                <td style={tdStyle}>{selectedRecord.ks_ncdex}</td>
                <td style={tdStyle}>{selectedRecord.es_ncdex}</td>
                <td style={tdStyle}>{selectedRecord.is_mtchncd}</td>
                <td style={tdStyle}>{selectedRecord.ks_emailid}</td>
                <td style={tdStyle}>{selectedRecord.es_email}</td>
                <td style={tdStyle}>{selectedRecord.is_mtch_em}</td>
                <td style={tdStyle}>{selectedRecord.ks_emrel}</td>
                <td style={tdStyle}>{selectedRecord.es_emrel}</td>
                <td style={tdStyle}>{selectedRecord.ks_mobile}</td>
                <td style={tdStyle}>{selectedRecord.es_mobile}</td>
                <td style={tdStyle}>{selectedRecord.is_mtch_mo}</td>
                <td style={tdStyle}>{selectedRecord.ks_mobrel}</td>
                <td style={tdStyle}>{selectedRecord.es_mobrel}</td>
                <td style={tdStyle}>{selectedRecord.brname}</td>
                <td style={tdStyle}>{selectedRecord.family_grp}</td>
                <td style={tdStyle}>{selectedRecord.ems_ddt}</td>
                <td style={tdStyle}>{selectedRecord.nod_dormnt}</td>
                <td style={tdStyle}>{selectedRecord.barcode}</td>
                <td style={tdStyle}>{selectedRecord.ac_closed}</td>
                <td style={tdStyle}>{selectedRecord.closer_trf}</td>
                <td style={tdStyle}>{selectedRecord.ks_krasts}</td>
                <td style={tdStyle}>{selectedRecord.ks_pttsts}</td>
                <td style={tdStyle}>{selectedRecord.ks_kusts}</td>
                <td style={tdStyle}>{selectedRecord.ks_krarem}</td>
                <td style={tdStyle}>{selectedRecord.ks_emsent}</td>
                <td style={tdStyle}>{selectedRecord.ks_emrecd}</td>
                <td style={tdStyle}>{selectedRecord.ks_eslrm}</td>
                <td style={tdStyle}>{selectedRecord.ks_ltstrm}</td>
                <td style={tdStyle}>{selectedRecord.sts1_3i}</td>
                <td style={tdStyle}>{selectedRecord.sts2_3i}</td>
                <td style={tdStyle}>{selectedRecord.ks_othsts}</td>
                <td style={tdStyle}>{selectedRecord.mult_emmo}</td>
                <td style={tdStyle}>{selectedRecord.ks_sts1}</td>
                <td style={tdStyle}>{selectedRecord.ks_allrem}</td>
                <td style={tdStyle}>{selectedRecord.ks_mtfcl}</td>
                <td style={tdStyle}>{selectedRecord.locationid}</td>
                <td style={tdStyle}>{selectedRecord.k_platform}</td>
                <td style={tdStyle}>{selectedRecord.ks_clusrid}</td>
                <td style={tdStyle}>{selectedRecord.ks_ralfno}</td>
                <td style={tdStyle}>{selectedRecord.ks_ralncm}</td>
                <td style={tdStyle}>{selectedRecord.ks_dpid}</td>
                <td style={tdStyle}>{selectedRecord.ks_dpboid}</td>
                <td style={tdStyle}>{selectedRecord.ks_nomn}</td>
                <td style={tdStyle}>{selectedRecord.ks_relwapc}</td>
                <td style={tdStyle}>{selectedRecord.ks_emtocl}</td>
                <td style={tdStyle}>{selectedRecord.ks_esign}</td>
                <td style={tdStyle}>{selectedRecord.ks_emtrgdt}</td>
                <td style={tdStyle}>{selectedRecord.ks_essts}</td>
                </tr>
            </tbody>
          </table>

          {/* Save and Cancel Buttons */}
          
          <div style={{ textAlign: 'right' }}>
            <button
              style={buttonStyle}
              onClick={this.handleSubmitEdit}
            >
              Save Changes
            </button>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: '#dc3545',
                marginLeft: '10px',
              }}
              onClick={this.handleCloseEdit}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
  
  
  
}











