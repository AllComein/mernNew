
    import React, { useEffect, useState, useRef } from "react";
    import html2pdf from 'html2pdf.js';
    import { Spinner } from "react-bootstrap";
 
    
    export default function Dealslip() {
      const contentRef = useRef();
      const [loading, setLoading] = useState(false);
      const [records, setRecords] = useState([]);
      const [details, setDetails] = useState([]);
      const [apDealers, setApDealers] = useState([]);
      const [selectedRecords, setSelectedRecords] = useState([]);
      const [previewMode, setPreviewMode] = useState(false);
      const [filter1, setFilter1] = useState('');
      const [filter2, setFilter2] = useState('');
      const [filter3, setFilter3] = useState('');
    
      // Fetch letter records
      useEffect(() => {
        async function getRecords() {
          setLoading(true); 
          try {
            const response = await fetch(`http://183.182.84.228:4005/letter/`);
    
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
    
      // Fetch dealslip details
      useEffect(() => {
        async function getDetails() {
          const response = await fetch(`http://183.182.84.228:4005/dealslip/`);
    
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
    
          const details = await response.json();
          setDetails(details);
        }
    
        getDetails();
      }, []);
    
      // Fetch apdealer records
      useEffect(() => {
        async function getApDealers() {
          setLoading(true);
          try {
            const response = await fetch(`http://183.182.84.228:4005/apdealer/`);
    
            if (!response.ok) {
              const message = `An error occurred: ${response.statusText}`;
              window.alert(message);
              setLoading(false);
              return;
            }
    
            const apDealers = await response.json();
            setApDealers(apDealers);
          } catch (error) {
            const message = `An error occurred: ${error.message}`;
            window.alert(message);
          } finally {
            setLoading(false);
          }
        }
    
        getApDealers();
      }, []);
    
      function handleSubmit() {
        if (!filter1 || !filter2 || !filter3) {
          alert("Please fill all the required inputs.");
          return;
        }
      
        if (filter1 === filter3) {
          alert("'Authorize Person Ucc' and 'AP Dealer Code' cannot be the same");
          return;
        }
      
        const record1 = records.find((record) => record.kslucc === filter1);
        const record3 = details.find((record) => record.clientac === filter1);
        const apDealer = apDealers.find((dealer) => dealer.loginid === filter3);
      
        if (!record1) {
          alert("No record found for the given Client Ucc input");
          return;
        }
      
        if (!apDealer) {
          alert("No record found for the given AP Dealer Code input");
          return;
        }
      
        const dateExists = details.some(detail => detail.date === filter2);
      
        if (!dateExists) {
          alert("Selected Trade Date does not exist in the records.");
          return;
        }
      
        setSelectedRecords([record1, apDealer, record3]);
        setPreviewMode(true);
      }
      
    
      function handleBack() {
        setPreviewMode(false);
      }
    
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    
      const recordsPerPage =  20;
    
      const paginateRecords = (records) => {
        const pages = [];
        for (let i = 0; i < records.length; i += recordsPerPage) {
          pages.push(records.slice(i, i + recordsPerPage));
        }
        return pages;
      };
    
      const printStyle = `
      @media print {
        body * {
          visibility: hidden;
        }
        .printable-table, .printable-table * {
          visibility: visible;
        }
        .printable-table {
          position: relative;
          width: 100%;
          padding: 0 10px;
        }
        .page {
          page-break-after: always;
          margin-bottom: 20px;
          margin-top: 3in; /* Top margin for each page */
        }
        .page:last-of-type {
          page-break-after: auto;
          margin-bottom: 3in; /* Bottom margin for the last page */
        }
       
      }
    `;
    
    // const recordsPerPage = 22;
    
    // const paginateRecords = (records) => {
    //   const pages = [];
    //   for (let i = 0; i < records.length; i += recordsPerPage) {
    //     pages.push(records.slice(i, i + recordsPerPage));
    //   }
    //   return pages;
    // };
    
    useEffect(() => {
      const printStyles = `
        @media print {
          .printable-text {
            font-size: 14px !important;
          }
        }
      `;
    
      const styleElement = document.createElement("style");
      styleElement.type = "text/css";
      styleElement.media = "print";
      styleElement.innerHTML = printStyles;
      document.head.appendChild(styleElement);
    
      return () => {
        document.head.removeChild(styleElement);
      };
    }, []);
    
    function formatDateString(dateStr) {
      if (!dateStr || dateStr.length !== 8) return '';
    
      const year = parseInt(dateStr.substring(0, 4), 10);
      const month = parseInt(dateStr.substring(4, 6), 10) - 1;
      const day = parseInt(dateStr.substring(6, 8), 10);
    
      const date = new Date(year, month, day);
    
      const dayFormatted = date.getDate().toString().padStart(2, '0');
      const monthFormatted = (date.getMonth() + 1).toString().padStart(2, '0');
      const yearFormatted = date.getFullYear();
    
      return `${dayFormatted}-${monthFormatted}-${yearFormatted}`;
    }
    
    const viewRecordDetails = () => {
      if (selectedRecords.length < 3) return null;
    
      const [record1, record2] = selectedRecords;
    
      if (!record1) return null;
    
      // Filter details based on the selected kslucc and the selected date
      const filteredDetails = details.filter(
        record => record.code === record1.kslucc && record.date === filter2
      );
      
      const paginatedDetails = paginateRecords(filteredDetails);
    
      // If no records match the selected date, return a message
      if (filteredDetails.length === 0) {
        return <div>No records found for the selected date.</div>;
      }
    
      const containerStyle = {
        width: '800px',
        margin: '0 auto',
        padding: '10px'
      };
    
      const infoSectionStyle = {
        display: 'flex',
        marginTop: '10px',
        fontSize: '12px',
        width: '100%'  // Adjusted to 97% width
      };
    
      const apAddressStyle = {
        width: '60%',
        paddingRight: '10px'
      };
    
      const clientInfoStyle = {
        width: '50%',
        paddingLeft: '0px',
        fontSize:'14px'
      };
    
      const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        margin: '0 auto', /* Center the table horizontally */
        fontSize: '9px'
      };
    
      const thStyle = {
        border: '1px solid #000',
        padding: '4px',
        textAlign: 'center'
      };
    
      const tdStyle = {
        border: '1px solid #000',
        padding: '3px',
        textAlign: 'center',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      };
      const paragraphStyle = {
        margin: '0',         // Removes default margin
        lineHeight: '1.1em'  // Adjust line height to minimize spacing
      };
      const trStyle = {
        height: '20px' // Fixed height for each row
      };
    
      const pageContainerStyle = {
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        width: '97%',
        margin: '0 auto',
      };
    
      const orientation = window.matchMedia("(orientation: landscape)").matches ? 'landscape' : 'portrait';
    
      return (
        <div className="printable-table" style={{...pageContainerStyle,fontSize: 10}} >
          {paginatedDetails.map((pageDetails, pageIndex) => (
            <div className="page" key={pageIndex} style={{ marginBottom: '20px' }}>
              {pageDetails.length > 0 && (
                <div style={infoSectionStyle}>
                  <div style={apAddressStyle}>
                    <p style={paragraphStyle}><strong>AP Name:</strong> {record1.ks_frchis}</p>
                    <p style={paragraphStyle}><strong>AP Address:</strong> {record2.address}</p>
                  </div>
                  <div style={clientInfoStyle}>
                    <p style={{ ...paragraphStyle, fontSize: '11px' }}><strong>Client Name:</strong> {record1.clname}</p>
                    <p style={{ ...paragraphStyle, fontSize: '11px' }}>
      <strong>Trade Date:</strong> {formatDateString(record1.ks_lstrdt)}
    </p>
                    <p style={{ ...paragraphStyle, fontSize: '11px' }}><strong>Client Code:</strong> {record1.kslucc}</p>
                  </div>
                </div>
              )}
              <br/><br/>
              <table style={{...tableStyle,marginTop:12}}>
                <thead>
                  <tr>
                    <th style={{ ...thStyle, width: '5%' }}>S. No.</th>
                    <th style={{ ...thStyle, width: '19%' }}>Scrip Name</th>
                    <th style={{ ...thStyle, width: '7%' }}>Exch ange</th>
                    <th style={{ ...thStyle, width: '6%' }}>Segment (Cash / Derivatives)</th>
                    <th style={{ ...thStyle, width: '7%' }}>Buy / Sell</th>
                    <th style={{ ...thStyle, width: '8%' }}>Rate (in case of Pre Confirmation - Limit for Purchase or Sell)</th>
                    <th style={{ ...thStyle, width: '8%' }}>Qty.</th>
                    <th style={{ ...thStyle, width: '8%' }}>Options (Strike)</th>
                    <th style={{ ...thStyle, width: '8%' }}>Options (Premium)</th>
                    <th style={{ ...thStyle, width: '5%' }}>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {pageDetails.map((detail, index) => (
                    <tr key={index} style={trStyle}>
                      <td style={tdStyle}>{index + 1 + pageIndex * recordsPerPage}</td>
                      <td style={tdStyle}>{detail.scripname}</td>
                      <td style={tdStyle}>{detail.exchange}</td>
                      <td style={tdStyle}>{detail.segment}</td>
                      <td style={tdStyle}>{detail.buy_sell}</td>
                      <td style={tdStyle}>{parseFloat(detail.rate).toFixed(2)}</td>
                      <td style={tdStyle}>{detail.qty}</td>
                      <td style={tdStyle}>{detail.stk}</td>
                      {/* <td style={tdStyle}>{parseFloat(detail.pre).toFixed(2)}</td> */}
                      <td style={tdStyle}>
      {detail.segment && detail.segment.startsWith('OPT') ? parseFloat(detail.pre).toFixed(2) : ''}
    </td>
                      <td style={tdStyle}>{detail.remark}</td>
                    </tr>
                  ))}
    
                  {/* Add empty rows if the number of details is less than 21 */}
                  {Array.from({ length: recordsPerPage - pageDetails.length }, (_, i) => (
                    <tr key={pageDetails.length + i} style={trStyle}>
                      <td style={tdStyle}></td>
                      <td style={tdStyle}></td>
                      <td style={tdStyle}></td>
                      <td style={tdStyle}></td>
                      <td style={tdStyle}></td>
                      <td style={tdStyle}></td>
                      <td style={tdStyle}></td>
                      <td style={tdStyle}></td>
                      <td style={tdStyle}></td>
                      <td style={tdStyle}></td>
                    </tr>
                  ))}
                </tbody>
              </table>
    
              {pageDetails.length > 0 && (
                <>
                  
                  <div >
                    <p style={{ float: "right",marginTop:'0.6cm',marginRight:80 }} >{record2.nismname}</p>
                  </div>
                </>
              )}
    
    <div className="footer">
                Page {pageIndex + 1} of {paginatedDetails.length}
              </div>
            </div>
          ))}
        </div>
      );
    };
    
    
    
    
    
    function handlePrint() {
      const orientation = window.matchMedia("(orientation: landscape)").matches ? 'landscape' : 'portrait';
    
      const printStyles = `
        @media print {
          body {
            margin: 0; /* Removes all body margins */
          }
    
          .page {
            margin-top: ${orientation === 'landscape' ? '0.9in' : '1in'}; /* Adjust top margin as needed */
            margin-bottom: ${orientation === 'landscape' ? '2.5in' : '3in'};
            margin-left: 0; /* Set left margin to 0 */
            margin-right: 0; /* Set right margin to 0 */
            page-break-before: auto;
            page-break-after: always;
          }
    
          .page:first-of-type {
            margin-top: 0; /* No extra top margin for the first page */
            page-break-before: avoid;
          }
    
          .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            text-align: center;
            font-size: 12px;
            visibility: visible;
          }
    
          @page {
            margin-left: 0;
            margin-right: 0;
          }
        }
      `;
    
      const styleElement = document.createElement('style');
      styleElement.type = 'text/css';
      styleElement.media = 'print';
      styleElement.innerHTML = printStyles;
      document.head.appendChild(styleElement);
    
      window.print();
    }
    
    
    
      function handleDownload() {
        const content = contentRef.current;
        const kslucc = selectedRecords[0].kslucc;
    
        // Get the current date
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    
        // Set the filename with kslucc and current date
        const filename = `${kslucc}_${formattedDate}.pdf`;
    
        // Use html2pdf to convert the HTML content to PDF
        const pdfPromise = html2pdf(content, {
          margin: 10,
          filename: filename,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        });
      }
    
      return (
        <div className="container" ref={contentRef}>
          {!previewMode && (
            <>
              <h1 style={{ fontSize: '28px', textAlign: 'center' }}>Letter Form</h1>
    
              <div className="form-group">
                <label htmlFor="clientUcc">Client Ucc:</label>
                <input
                  type="text"
                  className="form-control"
                  id="clientUcc"
                  value={filter1}
                  onChange={(e) => setFilter1(e.target.value)}
                  list="records"
                  placeholder="Enter Client Ucc"
                  required
                />
                <datalist id="records">
                  {records.map((dealer) => (
                    <option key={dealer.kslucc} value={dealer.kslucc}>
                      {dealer.kslucc}
                    </option>
                  ))}
                </datalist>
              </div>
    
              <div className="form-group">
      <label htmlFor="tradeDate">Trade Date:</label>
      <select
        className="form-control"
        id="tradeDate"
        value={filter2}
        onChange={(e) => setFilter2(e.target.value)}
        required
      >
        <option value="" disabled>Select Trade Date</option>
        {[...new Set(details.map((detail) => detail.date))].map((uniqueDate) => (
          <option key={uniqueDate} value={uniqueDate}>
            {uniqueDate}
          </option>
        ))}
      </select>
    </div>
    
    
    
              <div className="form-group">
                <label htmlFor="apDealerCode">AP Dealer Code:</label>
                <input
                  type="text"
                  className="form-control"
                  id="apDealerCode"
                  value={filter3}
                  onChange={(e) => setFilter3(e.target.value)}
                  list="apdealer-options"
                  placeholder="Enter AP Dealer Code"
                  required
                />
                <datalist id="apdealer-options">
                  {apDealers.map((dealer) => (
                    <option key={dealer.loginid} value={dealer.loginid}>
                      {dealer.loginid}
                    </option>
                  ))}
                </datalist>
              </div>
    
              <button onClick={handleSubmit} className="btn btn-primary">
                Submit
              </button>
            </>
          )}
    
          {previewMode && (
                    <>
              <button className="back-button" onClick={handleBack}>Back</button>
              &nbsp;&nbsp;&nbsp;
              <button className="print-button" onClick={handlePrint}>Print</button>
              &nbsp;&nbsp;&nbsp;
              {/* <button className="download-button" onClick={handleDownload}>Download</button> */}
    
              <div ref={contentRef}>
                {viewRecordDetails()}
              </div>
            </>
          )}
    
          {loading && <Spinner animation="border" />}
        </div>
      );
    }
    