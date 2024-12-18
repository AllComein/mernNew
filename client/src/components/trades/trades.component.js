
   
    import authService from "../../services/auth.service";
  import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { Spinner } from "react-bootstrap";

const Record = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.code}</td>
    <td>{props.record.scripname}</td>
    <td>{props.record.exchange}</td>
    <td>{props.record.segment}</td>
    <td>{props.record.buy_sell}</td>
    <td>{props.record.rate}</td>
    <td>{props.record.tradedqty}</td>
    <td>{props.record.stk}</td>
    <td>{props.record.pre}</td>
    <td>{props.record.amount}</td>
    <td>{props.record.tradedate}</td>
    <td>{props.record.orderno}</td>
    <td>{props.record.tradeno}</td>
    <td>{props.record.tradetime}</td>
    <td>{props.record.locnid}</td>
  </tr>
);

export default function Trades() {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [code, setCode] = useState('');
  const [scripname, setScripname] = useState(''); // New state for scripname
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function getRecords() {
      setLoading(true);
      try {
        const response = await fetch(`http://183.182.84.228:4005/tradeslip/`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          setLoading(false);
          return;
        }
        const currentUser = authService.getCurrentUser();
        const records = await response.json();
        const filteredData = records.filter(record => record.locnid === currentUser.username)
        setRecords(filteredData);
      } catch (error) {
        const message = `An error occurred: ${error.message}`;
        window.alert(message);
      } finally {
        setLoading(false);
      }
    }
    getRecords();
  }, []);

  const uniqueDates = Array.from(new Set(records.map(record => record.tradedate)));
  const uniqueCodes = Array.from(new Set(records.map(record => record.code)));
  const uniqueScripnames = Array.from(new Set(records.map(record => record.scripname))); // Unique scripnames

  function handleFilter() {
    if (!selectedDate && !code && !scripname) {
      alert("Please select a date, scripname, or enter a code to filter records.");
      return;
    }

    const filtered = records.filter(record => {
      const dateMatches = selectedDate ? record.tradedate === selectedDate : true;
      const codeMatches = code ? record.code === code : true;
      const scripnameMatches = scripname ? record.scripname === scripname : true;
      return dateMatches && codeMatches && scripnameMatches;
    });

    setFilteredRecords(filtered);
    setPreviewMode(true);
    setCurrentPage(1);
  }

  const paginatedRecords = filteredRecords.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(filteredRecords.length / pageSize);

  function handlePageSizeChange(e) {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  }

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  function handleDownload() {
    const sheetName = 'Filtered Records';
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const wb = XLSX.utils.book_new();
    const data = [
      ["Sno.", "name",	"code",	"scripname",	"exchange",	"segment",	"buy_sell",	"rate",	"tradedqty",	"stk",	"pre",	"amount",	"tradedate",	"orderno",	"tradeno",	"tradetime"],
      ...filteredRecords.map((record, index) => [
        index + 1, record.name,	record.code,	record.scripname,	record.exchange,	record.segment,	record.buy_sell,	record.rate,	record.tradedqty,	record.stk,	record.pre,	record.amount,	record.tradedate,	record.orderno,	record.tradeno,	record.tradetime
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `Trade_Records_${formattedDate}.xlsx`);
  }

  return (
    <div>
      {!previewMode && (
        <>
          <h3>Trades</h3>
          <label>Select Date: </label>
          <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
            <option value="">-- Select Date --</option>
            {uniqueDates.map((date, index) => (
              <option key={index} value={date}>
                {date}
              </option>
            ))}
          </select>
          &nbsp;&nbsp;
          <label>Scripname: </label>
          <input
            type="text"
            value={scripname}
            placeholder="Enter scripname"
            onChange={(e) => setScripname(e.target.value)}
            list="scripnameOptions"
          />
          <datalist id="scripnameOptions">
            {uniqueScripnames.map((uniqueScrip, index) => (
              <option key={index} value={uniqueScrip} />
            ))}
          </datalist>
          &nbsp;&nbsp;
          <label>Code: </label>
          <input
            type="text"
            value={code}
            placeholder="Enter code"
            onChange={(e) => setCode(e.target.value)}
            list="codeOptions"
          />
          <datalist id="codeOptions">
            {uniqueCodes.map((uniqueCode, index) => (
              <option key={index} value={uniqueCode} />
            ))}
          </datalist>
          &nbsp;&nbsp;
          <button onClick={handleFilter}>Submit</button>
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
          <button onClick={() => setPreviewMode(false)}>Back</button>
          &nbsp;&nbsp;&nbsp;
          <div>
            <label>Records per page:</label>
            <select value={pageSize} onChange={handlePageSizeChange}>
              {[10, 20, 50, 100, 1000, 5000].map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            <div>
              <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
              <span>Page {currentPage} / {totalPages}</span>
              <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>name</th>
                  <th>code</th>
                  <th>scripname</th>
                  <th>exchange</th>
                  <th>segment</th>
                  <th>buy_sell</th>
                  <th>rate</th>
                  <th>tradedqty</th>
                  <th>stk</th>
                  <th>pre</th>
                  <th>amount</th>
                  <th>tradedate</th>
                  <th>orderno</th>
                  <th>tradeno</th>
                  <th>tradetime</th>
                  <th>locnid</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRecords.map((record) => (
                  <Record record={record} key={record._id} />
                ))}
              </tbody>
            </table>
            
          </div>
        </>
      )}
    </div>
  );
}
