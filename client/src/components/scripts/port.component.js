import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { Spinner } from "react-bootstrap";

const Record = (props) => (
  <tr>
    <td>{props.record.es_ucc}</td>
    <td>{props.record.ucc}</td>
    <td>{props.record.symbol}</td>
    <td>{props.record.isin}</td>
    <td style={{ textAlign: 'right' }}>{props.record.sp}</td>
    <td style={{ textAlign: 'right' }}>{props.record.qty}</td>
    <td style={{ textAlign: 'right' }}>{props.record.avgcost}</td>
    <td style={{ textAlign: 'right' }}>{Number(props.record.cost).toFixed(2)}</td>
    <td style={{ textAlign: 'right' }}>{Number(props.record.bse_clrate).toFixed(2)}</td>
    <td style={{ textAlign: 'right' }}>{Number(props.record.mktvalue).toFixed(2)}</td>
    <td style={{ textAlign: 'right' }}>{Number(props.record.unreal).toFixed(2)}</td>
    <td>{props.record.clname}</td>
  </tr>
);


export default function Port() {
  const [loading, setLoading] = useState(false);
  const [allRecords, setAllRecords] = useState({ porteq: [], portfo: [], portcom: [] });
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [search, setSearch] = useState({ symbol: '', ucc: '' , clname: '' });
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [database, setDatabase] = useState('');
  const [databases] = useState([
    { value: 'porteq', label: 'EQ' },
    { value: 'portfo', label: 'FO' },
    { value: 'portcom', label: 'COM' },
  ]);

  useEffect(() => {
    async function fetchAllData() {
      setLoading(true);
      try {
        const eqResponse = await fetch(`http://183.182.84.228:4005/porteq/`);
        const foResponse = await fetch(`http://183.182.84.228:4005/portfo/`);
        const comResponse = await fetch(`http://183.182.84.228:4005/portcom/`);

        if (!eqResponse.ok || !foResponse.ok || !comResponse.ok) {
          const message = `An error occurred: ${eqResponse.statusText || foResponse.statusText || comResponse.statusText}`;
          window.alert(message);
          setLoading(false);
          return;
        }

        const eqRecords = await eqResponse.json();
        const foRecords = await foResponse.json();
        const comRecords = await comResponse.json();

        setAllRecords({
          porteq: eqRecords,
          portfo: foRecords,
          portcom: comRecords,
        });
      } catch (error) {
        const message = `An error occurred: ${error.message}`;
        window.alert(message);
      } finally {
        setLoading(false);
      }
    }

    fetchAllData();
  }, []);

  useEffect(() => {
    if (database) {
      setFilteredRecords(allRecords[database]);
      setSearch({ symbol: '', ucc: '', clname: '' });
    }
  }, [database, allRecords]);

  function handleSubmit() {
    const { symbol, ucc ,clname } = search;
    if (!symbol && !ucc && !clname) {
      alert("Please fill in either 'Symbol' or 'UCC' input");
      return;
    }
    const filteredRecords = allRecords[database].filter(record =>
      (symbol ? record.symbol === symbol : true) &&
      (ucc ? record.ucc === ucc : true) &&
      (clname ? record.clname === clname : true)
    );
    setSelectedRecords(filteredRecords);
    setPreviewMode(true);
  }




  // function handleSubmit() {
  //   const { symbol, ucc } = search;
  //   if (!symbol && !ucc) {
  //     alert("Please fill in either 'Symbol' or 'UCC' input");
  //     return;
  //   }
    
  //   const filteredRecords = allRecords[database].filter(record =>
  //     (symbol ? record.symbol === symbol : true) &&
  //     (ucc ? record.ucc === ucc : true)
  //   );
  
  //   setSelectedRecords(filteredRecords);
  //   setPreviewMode(true);
  
  //   // Calculate totals
  //   const totals = filteredRecords.reduce((acc, record) => {
  //     acc.qty += parseFloat(record.qty) || 0;
  //     acc.avgcost += parseFloat(record.avgcost) || 0;
  //     acc.cost += parseFloat(record.cost) || 0;
  //     acc.mktvalue += parseFloat(record.mktvalue) || 0;
  //     acc.unreal += parseFloat(record.unreal) || 0;
  //     return acc;
  //   }, { qty: 0, avgcost: 0, cost: 0, mktvalue: 0, unreal: 0 });
  
  //   setSelectedRecords([...filteredRecords, {
  //     clname: 'Total',
  //     es_ucc: '',
  //     ucc: '',
  //     symbol: '',
  //     qty: totals.qty.toFixed(2),
  //     avgcost: totals.avgcost.toFixed(2),
  //     cost: totals.cost.toFixed(2),
  //     mktvalue: totals.mktvalue.toFixed(2),
  //     unreal: totals.unreal.toFixed(2)
  //   }]);
  // }










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

  function downloadEQ() {
    const sheetName = 'Portfolio Records EQ';
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();

    const data = [
        ["Sno.", "ESL UCC", "KSL UCC", "Symbol", "ISIN", "Instrument", "Qty", "AvgCostPrice", "Bse Curr Price", "CostValue", "Market Value", "UnReal", "MktReturn", "Date", "Client Name","Scrip Name"],
        ...selectedRecords.map((record, index) => [
            index + 1, record.es_ucc, record.ucc, record.symbol, record.isin, record.instrument, parseFloat(record.qty), parseFloat(record.avgcost), parseFloat(record.bse_clrate), parseFloat(record.cost), parseFloat(record.mktvalue), parseFloat(record.unreal), parseFloat(record.mreturn), record.date, record.clname, record.sc_shrtnm
        ]),
    ];

    // Calculate totals for specified columns
    const totals = data.slice(1).reduce((acc, row) => {
        acc.qty += row[6] || 0;
        acc.avgcost += row[7] || 0;
        acc.bse_clrate += row[8] || 0;
        acc.cost += row[9] || 0;
        acc.mktvalue += row[10] || 0;
        acc.unreal += row[11] || 0;
        acc.mreturn += row[12] || 0;
        return acc;
    }, { qty: 0, avgcost: 0, bse_clrate: 0, cost: 0, mktvalue: 0, unreal: 0, mreturn: 0 });

    // Append totals row
    data.push([
        'Total', '', '', '', '', '', totals.qty, totals.avgcost, totals.bse_clrate, totals.cost, totals.mktvalue, totals.unreal, totals.mreturn, '', '', '', '', '', '', '', '', '', '', ''
    ]);

    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `Portfolio_Records_EQ_${formattedDate}.xlsx`);
}


function downloadFO() {
  const sheetName = 'Portfolio Records FO';
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  const wb = XLSX.utils.book_new();

  const data = [
      ["Sno.", "ESL UCC", "KSL UCC", "Symbol", "ISIN", "Instrument", "Option Type", "Strike Price", "ExpiryDate", "Qty", "AvgCostPrice", "CostValue", "Market Value", "UnReal", "MktReturn", "Date", "Client Name", "Scrip Name"],
      ...selectedRecords.map((record, index) => [
          index + 1, record.es_ucc, record.ucc, record.symbol, record.isin, record.instrument, record.option_typ, record.sp, record.expirydate, parseFloat(record.qty), parseFloat(record.avgcost), parseFloat(record.cost), parseFloat(record.mktvalue), parseFloat(record.unreal), parseFloat(record.mreturn), record.date, record.clname, record.sc_shrtnm
      ]),
  ];

  // Calculate totals for specified columns
  const totals = data.slice(1).reduce((acc, row) => {
      acc.qty += row[9] || 0;
      acc.avgcost += row[10] || 0;
      acc.cost += row[11] || 0;
      acc.mktvalue += row[12] || 0;
      acc.unreal += row[13] || 0;
      acc.mreturn += row[14] || 0;
      return acc;
  }, { qty: 0, avgcost: 0, cost: 0, mktvalue: 0, unreal: 0, mreturn: 0 });

  // Append totals row
  data.push([
      'Total', '', '', '', '', '', '', '', '', totals.qty, totals.avgcost, totals.cost, totals.mktvalue, totals.unreal, totals.mreturn, '', '', '', '', '', '', '', '', '', '', ''
  ]);

  const ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `Portfolio_Records_FO_${formattedDate}.xlsx`);
}

function downloadCOM() {
  const sheetName = 'Portfolio Records COM';
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  const wb = XLSX.utils.book_new();

  const data = [
      ["Sno.", "ESL UCC", "KSL UCC", "Symbol", "ISIN", "Instrument", "Option Type", "Strike Price", "ExpiryDate", "Qty", "AvgCostPrice", "CostValue", "Market Value", "UnReal", "MktReturn", "Date", "Client Name", "Scrip Name"],
      ...selectedRecords.map((record, index) => [
          index + 1, record.es_ucc, record.ucc, record.symbol, record.isin, record.instrument, record.option_typ, record.sp, record.expirydate, parseFloat(record.qty), parseFloat(record.avgcost), parseFloat(record.cost), parseFloat(record.mktvalue), parseFloat(record.unreal), parseFloat(record.mreturn), record.date, record.clname, record.sc_shrtnm
      ]),
  ];

  // Calculate totals for specified columns
  const totals = data.slice(1).reduce((acc, row) => {
      acc.qty += row[9] || 0;
      acc.avgcost += row[10] || 0;
      acc.cost += row[11] || 0;
      acc.mktvalue += row[12] || 0;
      acc.unreal += row[13] || 0;
      acc.mreturn += row[14] || 0;
      return acc;
  }, { qty: 0, avgcost: 0, cost: 0, mktvalue: 0, unreal: 0, mreturn: 0 });

  // Append totals row
  data.push([
      'Total', '', '', '', '', '', '', '', '', totals.qty, totals.avgcost, totals.cost, totals.mktvalue, totals.unreal, totals.mreturn, '', '', '', '', '', '', '', '', '', '', ''
  ]);

  const ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `Portfolio_Records_COM_${formattedDate}.xlsx`);
}




// function downloadAll() {
//   const currentDate = new Date();
//   const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
//   const wb = XLSX.utils.book_new();

//   const dataEQ = [
//       ["Sno.", "ESL UCC", "KSL UCC", "Client Name", "Symbol", "Instrument", "Qty", "AvgCostPrice", "Bse Curr Price", "CostValue", "Market Value", "UnReal", "MktReturn", "Date", "Sq Gain", "Del Gain", "LocationId", "LocationCD", "ISIN", "Exchange", "Scrip Name", "Common ScripCode", "Is Suspend", "_Branch", "Family Group"],
//       ...allRecords.porteq.map((record, index) => [
//           index + 1, record.es_ucc, record.ucc, record.clname, record.symbol, record.instrument, parseFloat(record.qty), parseFloat(record.avgcost), parseFloat(record.bse_clrate), parseFloat(record.cost), parseFloat(record.mktvalue), parseFloat(record.unreal), parseFloat(record.mreturn), record.date, record.sqgain, record.delgain, record.location, record.locnid, record.isin, record.exchange, record.sc_shrtnm, record.comn_sccd, record.is_suspend, record.brcd, record.familygrp,
//       ]),
//   ];

//   const dataFO = [
//       ["Sno.", "ESL UCC", "KSL UCC", "Client Name", "Symbol", "Instrument", "Option Type", "Strike Price", "ExpiryDate", "Qty", "AvgCostPrice", "CostValue", "Market Value", "UnReal", "MktReturn", "Date", "Sq Gain", "Del Gain", "LocationId", "LocationCD", "ISIN", "Exchange", "Scrip Name", "Common ScripCode", "Is Suspend", "_Branch", "Family Group"],
//       ...allRecords.portfo.map((record, index) => [
//           index + 1, record.es_ucc, record.ucc, record.clname, record.symbol, record.instrument, record.option_typ, record.sp, record.expirydate, parseFloat(record.qty), parseFloat(record.avgcost), parseFloat(record.cost), parseFloat(record.mktvalue), parseFloat(record.unreal), parseFloat(record.mreturn), record.date, record.sqgain, record.delgain, record.location, record.locnid, record.isin, record.exchange, record.sc_shrtnm, record.comn_sccd, record.is_suspend, record.brcd, record.familygrp,
//       ]),
//   ];

//   const dataCOM = [
//       ["Sno.", "ESL UCC", "KSL UCC", "Client Name", "Symbol", "Instrument", "Option Type", "Strike Price", "ExpiryDate", "Qty", "AvgCostPrice", "CostValue", "Market Value", "UnReal", "MktReturn", "Date", "Sq Gain", "Del Gain", "LocationId", "LocationCD", "ISIN", "Exchange", "Scrip Name", "Common ScripCode", "Is Suspend", "_Branch", "Family Group"],
//       ...allRecords.portcom.map((record, index) => [
//           index + 1, record.es_ucc, record.ucc, record.clname, record.symbol, record.instrument, record.option_typ, record.sp, record.expirydate, parseFloat(record.qty), parseFloat(record.avgcost), parseFloat(record.cost), parseFloat(record.mktvalue), parseFloat(record.unreal), parseFloat(record.mreturn), record.date, record.sqgain, record.delgain, record.location, record.locnid, record.isin, record.exchange, record.sc_shrtnm, record.comn_sccd, record.is_suspend, record.brcd, record.familygrp,
//       ]),
//   ];

//   // Create sheets
//   const wsEQ = XLSX.utils.aoa_to_sheet(dataEQ);
//   XLSX.utils.book_append_sheet(wb, wsEQ, 'Portfolio Records EQ');

//   const wsFO = XLSX.utils.aoa_to_sheet(dataFO);
//   XLSX.utils.book_append_sheet(wb, wsFO, 'Portfolio Records FO');

//   const wsCOM = XLSX.utils.aoa_to_sheet(dataCOM);
//   XLSX.utils.book_append_sheet(wb, wsCOM, 'Portfolio Records COM');

//   // Save the workbook
//   XLSX.writeFile(wb, `Portfolio_Records_All_${formattedDate}.xlsx`);
// }





function downloadAll() {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  const wb = XLSX.utils.book_new();

  // Helper function to group data by UCC
  const groupByUcc = (data) => {
    const grouped = {};
    data.forEach(row => {
      const ucc = row[2]; // Assuming UCC is in the 3rd column (index 2)
      if (!grouped[ucc]) {
        grouped[ucc] = [];
      }
      grouped[ucc].push(row);
    });
    return grouped;
  };

  // Helper function to calculate totals for grouped UCC records
  const calculateGroupTotals = (group, numericColumns, ucc, clientName,esucc) => {
    const totalRow = new Array(group[0].length).fill('');
    totalRow[0] = 'Total'; // Label the total row
    totalRow[2] = ucc; // Include the UCC in the total row
    totalRow[3] = clientName; // Include the Client Name in the total row
    totalRow[1] = esucc;

    numericColumns.forEach(colIndex => {
      totalRow[colIndex] = group.reduce((sum, row) => sum + (parseFloat(row[colIndex]) || 0), 0); // Sum numeric fields
    });

    return totalRow;
  };

  // Function to process the data, add indices per UCC group, and add totals with blank rows
  const processDataWithIndicesAndTotals = (data, numericColumns) => {
    // Sort by Client Name (index 3), then Symbol (index 4)
    const sortedData = data.slice(1).sort((a, b) => {
      if (a[3] === b[3]) { // If Client Name is the same, sort by Symbol
        return a[4].localeCompare(b[4]);
      }
      return a[3].localeCompare(b[3]); // Sort by Client Name
    });

    const groupedData = groupByUcc(sortedData); // Group data by UCC, excluding the header row
    const result = [data[0]]; // Start with the header row

    Object.keys(groupedData).forEach(ucc => {
      groupedData[ucc].forEach((row, index) => {
        row[0] = index + 1; // Assign index number for each record within UCC
      });

      result.push(...groupedData[ucc]); // Add all rows for this UCC group

      // Add a blank row before the total row
      result.push(new Array(data[0].length).fill(''));

      // Add the total row for this group, including UCC and Client Name
      const clientName = groupedData[ucc][0][3]; // Assume Client Name is the same for all records in the group
      const esucc = groupedData[ucc][0][1]
      const totalRow = calculateGroupTotals(groupedData[ucc], numericColumns, ucc, clientName,esucc);
      result.push(totalRow);

      // Add a blank row after the total row
      result.push(new Array(data[0].length).fill(''));
    });

    return result;
  };

  const dataEQ = [
    ["Sno.", "ESL UCC", "KSL UCC", "Symbol", "ISIN", "Instrument", "Qty", "AvgCostPrice", "Bse Curr Price", "CostValue", "Market Value", "UnReal", "MktReturn", "Date", "Client Name", "Scrip Name"],
    ...allRecords.porteq.map((record) => [
      '', record.es_ucc, record.ucc, record.symbol, record.isin, record.instrument, parseFloat(record.qty), parseFloat(record.avgcost), parseFloat(record.bse_clrate), parseFloat(record.cost), parseFloat(record.mktvalue), parseFloat(record.unreal), parseFloat(record.mreturn), record.date, record.clname, record.sc_shrtnm
    ])
  ];
  const dataWithIndicesAndTotalsEQ = processDataWithIndicesAndTotals(dataEQ, [9, 10, 11]); // Sum columns 6, 7, 9, 10, 11, 12 for each UCC

  const dataFO = [
    ["Sno.", "ESL UCC", "KSL UCC", "Symbol", "ISIN", "Instrument", "Option Type", "Strike Price", "ExpiryDate", "Qty", "AvgCostPrice", "CostValue", "Market Value", "UnReal", "MktReturn", "Date", "Client Name", "Scrip Name"],
    ...allRecords.portfo.map((record) => [
      '', record.es_ucc, record.ucc, record.symbl, record.isin, record.instrument, record.option_typ, record.sp, record.expirydate, parseFloat(record.qty), parseFloat(record.avgcost), parseFloat(record.cost), parseFloat(record.mktvalue), parseFloat(record.unreal), parseFloat(record.mreturn), record.date, record.clname, record.sc_shrtnm
    ])
  ];
  const dataWithIndicesAndTotalsFO = processDataWithIndicesAndTotals(dataFO, [11, 12, 13]); // Sum columns 9, 10, 11, 12, 13, 14 for each UCC

  const dataCOM = [
    ["Sno.", "ESL UCC", "KSL UCC", "Symbol", "ISIN", "Instrument", "Option Type", "Strike Price", "ExpiryDate", "Qty", "AvgCostPrice", "CostValue", "Market Value", "UnReal", "MktReturn", "Date", "Client Name", "Scrip Name"],
    ...allRecords.portcom.map((record) => [
      '', record.es_ucc, record.ucc, record.symbol, record.isin, record.instrument, record.option_typ, record.sp, record.expirydate, parseFloat(record.qty), parseFloat(record.avgcost), parseFloat(record.cost), parseFloat(record.mktvalue), parseFloat(record.unreal), parseFloat(record.mreturn), record.date, record.clname, record.sc_shrtnm
    ])
  ];
  const dataWithIndicesAndTotalsCOM = processDataWithIndicesAndTotals(dataCOM, [11, 12, 13]); // Sum columns 9, 10, 11, 12, 13, 14 for each UCC

  // Create sheets
  const wsEQ = XLSX.utils.aoa_to_sheet(dataWithIndicesAndTotalsEQ);
  XLSX.utils.book_append_sheet(wb, wsEQ, 'Portfolio Records EQ');

  const wsFO = XLSX.utils.aoa_to_sheet(dataWithIndicesAndTotalsFO);
  XLSX.utils.book_append_sheet(wb, wsFO, 'Portfolio Records FO');

  const wsCOM = XLSX.utils.aoa_to_sheet(dataWithIndicesAndTotalsCOM);
  XLSX.utils.book_append_sheet(wb, wsCOM, 'Portfolio Records COM');

  // Save the workbook
  XLSX.writeFile(wb, `Portfolio_Records_All_${formattedDate}.xlsx`);
}









  function handleDownload() {
    switch (database) {
      case 'porteq':
        downloadEQ();
        break;
      case 'portfo':
        downloadFO();
        break;
      case 'portcom':
        downloadCOM();
        break;
      default:
        alert('Please select a valid database');
    }
  }

  // Get unique symbols and UCCs from filtered records
  const uniqueSymbols = Array.from(new Set(filteredRecords.map(record => record.symbol)));
  const uniqueUccs = Array.from(new Set(filteredRecords.map(record => record.ucc)));
  const uniqueNames = Array.from(new Set(filteredRecords.map(record => record.clname)));

  return (
    <div>
      {!previewMode && (
        <>
          <h5 style={{ float: 'right' }}>{date}</h5>
          <br />
          <h3>Portfolio</h3>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <Spinner animation="border" />
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                {/* Database Input */}
                <div>
                  <label>Segment :</label>
                  <select
                    value={database}
                    onChange={(e) => setDatabase(e.target.value)}
                    style={{ marginRight: '10px' }}
                  >
                    <option value="">Select a Segment</option>
                    {databases.map((db) => (
                      <option key={db.value} value={db.value}>
                        {db.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Symbol Input */}
                <div>
                  <label>Symbol:</label>
                  <input
                    type="text"
                    value={search.symbol}
                    placeholder="Search by Symbol"
                    onChange={(e) => setSearch({ ...search, symbol: e.target.value.toUpperCase() })}
                    list="symbol-list"
                    style={{ marginRight: '10px' }}
                  />
                  <datalist id="symbol-list">
                    {uniqueSymbols.map((symbol) => (
                      <option key={symbol} value={symbol}>
                        {symbol}
                      </option>
                    ))}
                  </datalist>
                </div>

                {/* UCC Input */}
                <div>
                  <label>UCC:</label>
                  <input
                    type="text"
                    value={search.ucc}
                    placeholder="Search by UCC"
                    onChange={(e) => setSearch({ ...search, ucc: e.target.value.toUpperCase() })}
                    list="ucc-list"
                    style={{ marginRight: '10px' }}
                  />
                  <datalist id="ucc-list">
                    {uniqueUccs.map((ucc) => (
                      <option key={ucc} value={ucc}>
                        {ucc}
                      </option>
                    ))}
                  </datalist>
                </div>


                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    value={search.clname}
                    placeholder="Search by Name"
                    onChange={(e) => setSearch({ ...search, clname: e.target.value.toUpperCase() })}
                    list="name-list"
                    style={{ marginRight: '10px' }}
                  />
                  <datalist id="name-list">
                    {uniqueNames.map((clname) => (
                      <option key={clname} value={clname}>
                        {clname}
                      </option>
                    ))}
                  </datalist>
                </div>
                 {/* Submit Button */}
              <div>
                <button onClick={handleSubmit}>Submit</button>
              </div>
              <button onClick={downloadAll}>Download All</button>
              </div>

             
            </>
          )}
        </>
      )}

      {previewMode && (
        <div>
          <button onClick={handleBack} style={{ marginBottom: '10px' }}>Back</button>
          <button onClick={handleDownload} style={{ marginTop: '10px' }}>Download</button>
          <h3>PortFolio Records</h3>
          <table className="table table-striped" style={{ marginTop: 20 , width: '90%' }}>
            <thead>
              <tr>
                <th>ESL UCC</th>
                <th>KSL UCC</th>
                <th>Symbol</th>
                <th>ISIN</th>
                <th>Skt Price</th>
                <th>Quantity</th>
                <th>Average Cost</th>
                <th>Cost Value</th>
                <th>Close Rate</th>
                <th>Market Value</th>
                <th>UnReal</th>
                <th>Client Name</th>
              </tr>
            </thead>
            <tbody>
              {recordList()}
            </tbody>
          </table>
          
        </div>
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
//     <td>{props.record.ucc}</td>
//     <td>{props.record.qty}</td>
//     <td>{props.record.cost}</td>
//     <td>{props.record.avgcost}</td>
//   </tr>
// );

// export default function Port() {
//   const [loading, setLoading] = useState(false);
//   const [allRecords, setAllRecords] = useState({ porteq: [], portfo: [], portcom: [] });
//   const [filteredRecords, setFilteredRecords] = useState([]);
//   const [symbol, setSymbol] = useState('');
//   const [selectedRecords, setSelectedRecords] = useState([]);
//   const [previewMode, setPreviewMode] = useState(false);
//   const [database, setDatabase] = useState('');
//   const [databases, setDatabases] = useState([
//     { value: 'porteq', label: 'EQ' },
//     { value: 'portfo', label: 'FO' },
//     { value: 'portcom', label: 'COM' },
//   ]);

//   useEffect(() => {
//     async function fetchAllData() {
//       setLoading(true);
//       try {
//         const eqResponse = await fetch(`http://183.182.84.228:4005/porteq/`);
//         const foResponse = await fetch(`http://183.182.84.228:4005/portfo/`);
//         const comResponse = await fetch(`http://183.182.84.228:4005/portcom/`);

//         if (!eqResponse.ok || !foResponse.ok || !comResponse.ok) {
//           const message = `An error occurred: ${eqResponse.statusText || foResponse.statusText || comResponse.statusText}`;
//           window.alert(message);
//           setLoading(false);
//           return;
//         }

//         const eqRecords = await eqResponse.json();
//         const foRecords = await foResponse.json();
//         const comRecords = await comResponse.json();

//         // const filteredEqRecords = eqRecords.filter(record => record.ks_krarem && record.ks_krarem.includes('Dormant'));
//         // const filteredFoRecords = foRecords.filter(record => record.ks_krarem && record.ks_krarem.includes('Dormant'));
//         // const filteredComRecords = comRecords.filter(record => record.ks_krarem && record.ks_krarem.includes('Dormant'));

//         setAllRecords({
//           porteq: eqRecords,
//           portfo: foRecords,
//           portcom: comRecords,
//         });
//       } catch (error) {
//         const message = `An error occurred: ${error.message}`;
//         window.alert(message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchAllData();
//   }, []);

//   useEffect(() => {
//     if (database) {
//       setFilteredRecords(allRecords[database]);
//       setSymbol('');
//     }
//   }, [database, allRecords]);

//   function handleSubmit() {
//     if (!symbol) {
//       alert("Please fill the 'Symbol' input");
//       return;
//     }
//     const filteredRecords = allRecords[database].filter(record => record.symbol === symbol);
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

//   function downloadEQ() {
//     const sheetName = 'Portfolio Records EQ';
//     const currentDate = new Date();
//     const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
//     const wb = XLSX.utils.book_new();
//     const data = [
//       ["Sno.","ESL UCC",	"KSL UCC",	"Client Name",	"Symbol",	"Instrument",	"Qty",	"AvgCostPrice",	"Bse Curr Price",	"CostValue",	"Market Value",	"UnReal",	"MktReturn",	"Date",	"Sq Gain",	"Del Gain",	"LocationId",	"LocationCD",	"ISIN",	"Exchange",	"Scrip Name",	"Common ScripCode",	"Is Suspend",	"_Branch",	"Family Group",    ],
//       ...selectedRecords.map((record,index) => [
//         index+1,record.es_ucc,	record.ucc,	record.clname,	record.symbol,	record.instrument,	parseFloat(record.qty),	parseFloat(record.avgcost),	parseFloat(record.bse_clrate),	parseFloat(record.cost),	parseFloat(record.mktvalue),	parseFloat(record.unreal),	parseFloat(record.mreturn),	record.date,	record.sqgain,	record.delgain,	record.location,	record.locnid,	record.isin,	record.exchange,	record.sc_shrtnm,	record.comn_sccd,	record.is_suspend,	record.brcd,	record.familygrp,

//       ]),
//     ];
//     const ws = XLSX.utils.aoa_to_sheet(data);
//     XLSX.utils.book_append_sheet(wb, ws, sheetName);
//     XLSX.writeFile(wb, `Portfolio_Records_EQ_${formattedDate}.xlsx`);
//   }

//   function downloadFO() {
//     const sheetName = 'Portfolio Records FO';
//     const currentDate = new Date();
//     const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
//     const wb = XLSX.utils.book_new();
//     const data = [
//       ["Sno.","ESL UCC",	"KSL UCC",	"Client Name",	"Symbol",	"Instrument",	"Option Type",	"Strike Price",	"ExpiryDate",	"Qty",	"AvgCostPrice",	"CostValue",	"Market Value",	"UnReal",	"MktReturn",	"Date",	"Sq Gain",	"Del Gain",	"LocationId",	"LocationCD",	"ISIN",	"Exchange",	"Scrip Name",	"Common ScripCode",	"Is Suspend",	"_Branch",	"Family Group",    ],
//       ...selectedRecords.map((record,index) => [
//         index+1,record.es_ucc,	record.ucc,	record.clname,	record.symbol,	record.instrument,	record.option_typ,	record.sp,	record.expirydate,	parseFloat(record.qty),	parseFloat(record.avgcost),	parseFloat(record.cost),	parseFloat(record.mktvalue),	parseFloat(record.unreal),	parseFloat(record.mreturn),	record.date,	record.sqgain,	record.delgain,	record.location,	record.locnid,	record.isin,	record.exchange,	record.sc_shrtnm,	record.comn_sccd,	record.is_suspend,	record.brcd,	record.familygrp,
//       ]),
//     ];
//     const ws = XLSX.utils.aoa_to_sheet(data);
//     XLSX.utils.book_append_sheet(wb, ws, sheetName);
//     XLSX.writeFile(wb, `Portfolio_Records_FO_${formattedDate}.xlsx`);
//   }

//   function downloadCOM() {
//     const sheetName = 'Portfolio Records COM';
//     const currentDate = new Date();
//     const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
//     const wb = XLSX.utils.book_new();
//     const data = [
//       ["Sno.","ESL UCC",	"KSL UCC",	"Client Name",	"Symbol",	"Instrument",	"Option Type",	"Strike Price",	"ExpiryDate",	"Qty",	"AvgCostPrice",	"CostValue",	"Market Value",	"UnReal",	"MktReturn",	"Date",	"Sq Gain",	"Del Gain",	"LocationId",	"LocationCD",	"ISIN",	"Exchange",	"Scrip Name",	"Common ScripCode",	"Is Suspend",	"_Branch",	"Family Group",    ],
//       ...selectedRecords.map((record,index) => [
//         index+1,record.es_ucc,	record.ucc,	record.clname,	record.symbol,	record.instrument,	record.option_typ,	record.sp,	record.expirydate,	parseFloat(record.qty),	parseFloat(record.avgcost),	parseFloat(record.cost),	parseFloat(record.mktvalue),	parseFloat(record.unreal),	parseFloat(record.mreturn),	record.date,	record.sqgain,	record.delgain,	record.location,	record.locnid,	record.isin,	record.exchange,	record.sc_shrtnm,	record.comn_sccd,	record.is_suspend,	record.brcd,	record.familygrp,
//       ]),
//     ];
//     const ws = XLSX.utils.aoa_to_sheet(data);
//     XLSX.utils.book_append_sheet(wb, ws, sheetName);
//     XLSX.writeFile(wb, `Portfolio_Records_COM_${formattedDate}.xlsx`);
//   }

//   function handleDownload() {
//     switch (database) {
//       case 'porteq':
//         downloadEQ();
//         break;
//       case 'portfo':
//         downloadFO();
//         break;
//       case 'portcom':
//         downloadCOM();
//         break;
//       default:
//         alert('Please select a valid database');
//     }
//   }

//   // Get unique symbols from filtered records
//   const uniqueSymbols = Array.from(new Set(filteredRecords.map(record => record.symbol)));

//   return (
//     <div>
//       {!previewMode && (
//         <>
//           <h5 style={{ float: 'right' }}>
//             <strong>Updated Date ::</strong> {filteredRecords.length > 0 && filteredRecords[1].run_date ? filteredRecords[1].run_date : 'N/A'}
//           </h5>
//           <h3>PortFolio Script wise</h3>
          
//           <label>&nbsp; Select Database : &nbsp;</label>
//           <select value={database} onChange={(e) => setDatabase(e.target.value)}>
//             <option value="">Select Database</option>
//             {databases.map(db => (
//               <option key={db.value} value={db.value}>{db.label}</option>
//             ))}
//           </select>

//           {database && (
//             <>
//               <label>&nbsp; Symbol : &nbsp;</label>
//               <input
//                 list="symbols"
//                 value={symbol}
//                 placeholder="Search by Symbol"
//                 onChange={(e) => setSymbol(e.target.value.toUpperCase())}
//               />
//               <datalist id="symbols">
//                 {uniqueSymbols.map((symbol, index) => (
//                   <option key={index} value={symbol}>
//                     {symbol}
//                   </option>
//                 ))}
//               </datalist>
//               &nbsp;&nbsp;&nbsp;
//               <button onClick={handleSubmit}>Submit</button>
//             </>
//           )}
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
//                   <th>ESL UCC</th>
//                   <th>Kotak UCC</th>
//                   <th>Quantity</th>
//                   <th>Cost Value</th>
//                   <th>Avg. Cost Price</th>
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
