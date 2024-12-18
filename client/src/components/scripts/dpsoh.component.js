import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { Spinner } from "react-bootstrap";

const Record = (props) => (
  <tr>
    <td>{props.record.clname}</td>
    <td>{props.record.es_ucc}</td>
    <td>{props.record.kslucc}</td>
    <td>{props.record.nsesymbl}</td>
    <td>{props.record.dp_sohval}</td>
  </tr>
);

export default function Dpsoh() {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [ucc, setUcc] = useState('');
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    async function getRecords() {
      setLoading(true);
      try {
        const response = await fetch(`http://183.182.84.228:4005/dpsoh/`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          setLoading(false);
          return;
        }
        const records = await response.json();
   
        setRecords(records);
      } catch (error) {
        const message = `An error occurred: ${error.message}`;
        window.alert(message);
      } finally {
        setLoading(false);
      }
    }
    getRecords();
  }, []);

  function handleSubmit() {
    if (!symbol && !ucc) {
      alert("Please fill at least one of 'Symbol' or 'UCC' inputs");
      return;
    }
    const filteredRecords = records.filter(record =>
      (symbol ? record.nsesymbl === symbol : true) &&
      (ucc ? record.kslucc === ucc : true)
    );
    setSelectedRecords(filteredRecords);
    setPreviewMode(true);
  }

  function handleBack() {
    setPreviewMode(false);
  }

  function recordList() {
    return selectedRecords.map((record) => (
      <Record
        record={record}
        key={record._id}
      />
    ));
  }

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  function handleDownload() {
    const sheetName = 'Dormancy Records';
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
    const data = [
      ["Sno.","es_ucc",	"kslucc",	"clname",	"panno",	"brcd",	"dptype",	"hldgdt",	"soh_brcd",	"ks_dpid",	"cldpid",	"location",	"locnid",	"dpsts",	"isin",	"ks_dpsoh",	"scrate",	"dp_sohval",	"cc_id",	"bkflag",	"bklkcd",	"lkinreldt",	"scrname",	"bactype",	"catgdespn",	"comsccd",	"bsecode",	"nsesymbl",	"dpidpri",	"varvfodp",	"sccatg",	"cl_grp",    ],
      ...selectedRecords.map((record, index) => [
        index+1,record.es_ucc,	record.kslucc,	record.clname,	record.panno,	record.brcd,	record.dptype,	record.hldgdt,	record.soh_brcd,	record.ks_dpid,	record.cldpid,	record.location,	record.locnid,	record.dpsts,	record.isin,	record.ks_dpsoh,	record.scrate,	record.dp_sohval,	record.cc_id,	record.bkflag,	record.bklkcd,	record.lkinreldt,	record.scrname,	record.bactype,	record.catgdespn,	record.comsccd,	record.bsecode,	record.nsesymbl,	record.dpidpri,	record.varvfodp,	record.sccatg,	record.cl_grp,
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `Dormancy_Records_${formattedDate}.xlsx`);
  }

  const uniqueSymbols = Array.from(new Set(records.map(record => record.nsesymbl)));
  const uniqueUccs = Array.from(new Set(records.map(record => record.kslucc)));

  return (
    <div>
      {!previewMode && (
        <>
          <h5 style={{ float: 'right' }}>
            <strong>Updated Date ::</strong> {records.length > 0 && records[1].run_date ? records[1].run_date : 'N/A'}
          </h5>
          <h3>Dpsoh Script wise</h3>
          
          {/* Symbol Input */}
          <label>&nbsp; Symbol : &nbsp;</label>
          <input
            list="symbols"
            value={symbol}
            placeholder="Search by Symbol"
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          />
          <datalist id="symbols">
            {uniqueSymbols.map((nsesymbl, index) => (
              <option key={index} value={nsesymbl}>
                {nsesymbl}
              </option>
            ))}
          </datalist>

          {/* UCC Input */}
          <label>&nbsp; UCC : &nbsp;</label>
          <input
            list="uccs"
            value={ucc}
            placeholder="Search by UCC"
            onChange={(e) => setUcc(e.target.value.toUpperCase())}
          />
          <datalist id="uccs">
            {uniqueUccs.map((kslucc, index) => (
              <option key={index} value={kslucc}>
                {kslucc}
              </option>
            ))}
          </datalist>
          
          &nbsp;&nbsp;&nbsp;
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
      {loading && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {previewMode && (
        <>
          <button className="back-button" onClick={handleBack}>Back</button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={handleDownload}>Download Excel</button>
          <div className="record-list">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Client Code ESL</th>
                  <th>Client Code KSL</th>
                  <th>Symbol</th>
                  <th>Cost Value</th>
                </tr>
              </thead>
              <tbody>
                {recordList()}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}













// import React, { useEffect, useState } from "react";
// import * as XLSX from 'xlsx';
// import { Spinner } from "react-bootstrap";


// const Record = (props) => (
//   <tr>
//     <td>{props.record.clname}</td>
//     <td>{props.record.es_ucc}</td>
//     <td>{props.record.kslucc}</td>
//     <td>{props.record.dp_sohval}</td>
//   </tr>
// );

// export default function Dpsoh() {
//   const [loading, setLoading] = useState(false);
//   const [records, setRecords] = useState([]);
//   const [symbol, setSymbol] = useState('');
//   const [selectedRecords, setSelectedRecords] = useState([]);
//   const [previewMode, setPreviewMode] = useState(false);

//   useEffect(() => {
//     async function getRecords() {
//       setLoading(true);
//       try {
//         const response = await fetch(`http://183.182.84.228:4005/dpsoh/`);
//         if (!response.ok) {
//           const message = `An error occurred: ${response.statusText}`;
//           window.alert(message);
//           setLoading(false);
//           return;
//         }
//         const records = await response.json();
   
//         setRecords(records);
//       } catch (error) {
//         const message = `An error occurred: ${error.message}`;
//         window.alert(message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     getRecords();
//     return;
//   }, []);

//   function handleSubmit() {
//     if (!symbol) {
//       alert("Please fill the 'Symbol' input");
//       return;
//     }
//     const filteredRecords = records.filter(record => record.nsesymbl === symbol);
//     setSelectedRecords(filteredRecords);
//     setPreviewMode(true);
//   }

//   function handleBack() {
//     setPreviewMode(false);
//   }

//   function recordList() {
//     return selectedRecords.map((record) => (
//       <Record
//         record={record}
//         key={record._id}
//       />
//     ));
//   }

//   const current = new Date();
//   const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

//   function handleDownload() {
//     const sheetName = 'Dormancy Records';
//     const currentDate = new Date();
//     const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
//     const wb = XLSX.utils.book_new();
//     const data = [
//       ["Sno.","es_ucc",	"kslucc",	"clname",	"panno",	"brcd",	"dptype",	"hldgdt",	"soh_brcd",	"ks_dpid",	"cldpid",	"location",	"locnid",	"dpsts",	"isin",	"ks_dpsoh",	"scrate",	"dp_sohval",	"cc_id",	"bkflag",	"bklkcd",	"lkinreldt",	"scrname",	"bactype",	"catgdespn",	"comsccd",	"bsecode",	"nsesymbl",	"dpidpri",	"varvfodp",	"sccatg",	"cl_grp",    ],
//       ...selectedRecords.map((record, index) => [
//         index+1,record.es_ucc,	record.kslucc,	record.clname,	record.panno,	record.brcd,	record.dptype,	record.hldgdt,	record.soh_brcd,	record.ks_dpid,	record.cldpid,	record.location,	record.locnid,	record.dpsts,	record.isin,	record.ks_dpsoh,	record.scrate,	record.dp_sohval,	record.cc_id,	record.bkflag,	record.bklkcd,	record.lkinreldt,	record.scrname,	record.bactype,	record.catgdespn,	record.comsccd,	record.bsecode,	record.nsesymbl,	record.dpidpri,	record.varvfodp,	record.sccatg,	record.cl_grp,
//       ]),
//     ];
//     const ws = XLSX.utils.aoa_to_sheet(data);
//     XLSX.utils.book_append_sheet(wb, ws, sheetName);
//     XLSX.writeFile(wb, `Dormancy_Records_${formattedDate}.xlsx`);
//   }

//   const uniqueSymbols = Array.from(new Set(records.map(record => record.nsesymbl)));

//   return (
//     <div>
//       {!previewMode && (
//         <>
//           <h5 style={{ float: 'right' }}>
//             <strong>Updated Date ::</strong> {records.length > 0 && records[1].run_date ? records[1].run_date : 'N/A'}
//           </h5>
//           <h3>Dpsoh Script wise</h3>
//           <label>&nbsp; Symbol : &nbsp;</label>
//           <input
//             list="symbols"
//             value={symbol}
//             placeholder="Search by Symbol"
//             onChange={(e) => setSymbol(e.target.value.toUpperCase())}
//           />
//           <datalist id="symbols">
//             {uniqueSymbols.map((nsesymbl, index) => (
//               <option key={index} value={nsesymbl}>
//                 {nsesymbl}
//               </option>
//             ))}
//           </datalist>
//           &nbsp;&nbsp;&nbsp;
//           <button onClick={handleSubmit}>Submit</button>
//         </>
//       )}
//       {loading && (
//         <div style={{ textAlign: "center", marginTop: "20px" }}>
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       )}
//       {previewMode && (
//         <>
//           <button className="back-button" onClick={handleBack}>Back</button>
//           &nbsp;&nbsp;&nbsp;
//           <button onClick={handleDownload}>Download Excel</button>
//           <div className="record-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Client Code ESL</th>
//                   <th>Client Code KSL</th>
//                   <th>Cost Value</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recordList()}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
