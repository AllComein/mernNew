


import React, { useEffect, useState, useRef } from "react";
import ReactDOMServer from 'react-dom/server';
import html2pdf from 'html2pdf.js';
import "./Letter.css";
import myImage from './logo.png';
import { Spinner } from "react-bootstrap";
import authService from "../../services/auth.service";

const Record = (props) => (
  <tr>
    <td>{props.record.clname}</td>
    <td>{props.record.kslucc}</td>
    <td>{props.record.ucc}</td>
  </tr>
);

export default function DormancyLetter() {
  const contentRef = useRef();
  const [loading, setLoading] = useState(false); // State to track loading
  const [records, setRecords] = useState([]);
  const [userRecords, setUserRecords] = useState([]);
  const [filter1, setFilter1] = useState('');
  const [incomeRange, setIncomeRange] = useState('');
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);


  useEffect(() => {
    async function getRecords() {
      setLoading(true); // Set loading to true before fetch
      try {
        const response = await fetch(`http://183.182.84.228:4005/letter/`);
  
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          setLoading(false); // Set loading to false after fetch
          return;
        }
  
        const records = await response.json();
        
        // Filter records to exclude those with 'P' in the 4th position of ks_panno
        const filteredRecords = records.filter(record => record.ks_krarem && record.ks_krarem.includes('Dormant') || record.nod_dormnt >= 0 && record.nod_dormnt <= 7);
        // const filtered = records.filter(record =>record.kslucc && record.nod_dormnt >= 0 && record.nod_dormnt <= 31);
       
        setRecords(filteredRecords);
      } catch (error) {
        const message = `An error occurred: ${error.message}`;
        window.alert(message);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    }

    async function getUserRecords() {
      try {
        const response = await fetch('http://183.182.84.228:4005/userrecords/');

        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }

        const userRecords = await response.json();
        setUserRecords(userRecords);
      } catch (error) {
        const message = `An error occurred: ${error.message}`;
        window.alert(message);
      }
    }
  
    getRecords();
    getUserRecords();
  }, []);

  
  //   getRecords();
  
  //   return;
  // }, [records.length]);


  

  // useEffect(() => {
  //   async function getRecords() {
  //     setLoading(true); // Set loading to true before fetch
  //     try {
  //       const response = await fetch(`http://183.182.84.228:4005/letter/`);

  //       if (!response.ok) {
  //         const message = `An error occurred: ${response.statusText}`;
  //         window.alert(message);
  //         setLoading(false); // Set loading to false after fetch
  //         return;
  //       }

  //       const records = await response.json();
  //       // Filter records to only include those with 'P' in the 4th position of ks_panno
        
  //       setRecords(records);
  //       console.log(records);
  //     } catch (error) {
  //       const message = `An error occurred: ${error.message}`;
  //       window.alert(message);
  //     } finally {
  //       setLoading(false); // Set loading to false after fetch
  //     }
  //   }

  //   getRecords();

  //   return;
  // }, [records.length]);



  

  function viewRecord(record) {
    setSelectedRecords(record);
  }

  function handleSubmit() {
    if (!filter1) {
      alert("Please fill the 'Authorize Person Ucc' input");
      return;
    }

    if (!incomeRange) {
      alert("Please select an 'Income Range'");
      return;
    }

    const record1 = records.find((record) => record.kslucc === filter1);
    
      if (!record1) {
        alert("No record found for the given input");
        return;
      }
      const record2 = userRecords.find((record) => record.kslucc === filter1);

    setSelectedRecords([record1,record2]);
    setPreviewMode(true);
  }

  function handleBack() {
    setPreviewMode(false);
  }

  function recordList() {
    return selectedRecords.map((record) => {
      return (
        <Record
          record={record}
          viewRecord={() => setSelectedRecords([record])}
          key={record._id}
        />
      );
    });
  }

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  function handlePrint() {
    window.print();
  }

  const [mailerState, setMailerState] = useState({
    name: "",
    recipients: "", // Modified to accept multiple email addresses
    message: "",
    subject: "",
  });

  function handleStateChange(e) {
    setMailerState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  // const submitEmail = async (e) => {
  //   e.preventDefault();
  //   setLoading(true); // Set loading to true before sending email
  
  //   // Check if selectedRecords exist and have at least 1 item
  //   if (!selectedRecords || selectedRecords.length < 1) {
  //     alert("Please select a record before sending the email.");
  //     setLoading(false); // Set loading to false
  //     return;
  //   }
  
  //   const record1 = selectedRecords[0];
  //   const record2 =  selectedRecords[1];
  
  //   // Check if phone number and email are available for the record
  //   if (!record1.coradd1) {
  //     alert("Address is missing in Client.");
  //     setLoading(false); // Set loading to false
  //     return;
  //   } else if (!record1.ks_mobile) {
  //     alert("Phone number is missing in Client.");
  //     setLoading(false); // Set loading to false
  //     return;
  //   } else if (!record1.ks_emailid) {
  //     alert("Email is missing in Client.");
  //     setLoading(false); // Set loading to false
  //     return;
  //   }
  
  //   // Prepare the data to be sent to the backend
  //   const currentUser = authService.getCurrentUser()
  //   const detail = {
  //     username: currentUser.username,
  //     name: record1.clname,
  //     panno: record1.ks_panno,
  //     kslucc: record1.kslucc,
  //     dpId: record1.ksdp_boid,
  //     incomeRange: incomeRange,
  //     mailid: record1.ks_emailid,
  //   };
  
  //   try {
  //     const response = await fetch("http://183.182.84.228:4005/sendss", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ uccDetail: detail }),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  
  //     const resData = await response.json();
  //     if (resData.status === "success") {
  //       alert("Message Sent");
  //     } else if (resData.status === "fail") {
  //       alert("Message failed to send");
  //     }
  //   } catch (error) {
  //     console.error("Error sending email:", error);
  //     alert(`Email is already send of Client Code ${record2.kslucc} , Name Of Client ${record2.name} , Mailid ${record2.mailid} , Send Date ${record2.date} `);
  //   } finally {
  //     setLoading(false); // Set loading to false after email is sent
  //   }
  // };
  
  const submitEmail = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before sending email
  
    // Check if selectedRecords exist and have at least 1 item
    if (!selectedRecords || selectedRecords.length < 1) {
      alert("Please select a record before sending the email.");
      setLoading(false); // Set loading to false
      return;
    }
  
    const record1 = selectedRecords[0];
    const record2 =  selectedRecords[1];
  
    // Check if phone number and email are available for the record
    if (!record1.coradd1) {
      alert("Address is missing in Client.");
      setLoading(false); // Set loading to false
      return;
    } else if (!record1.ks_mobile) {
      alert("Phone number is missing in Client.");
      setLoading(false); // Set loading to false
      return;
    } else if (!record1.ks_emailid) {
      alert("Email is missing in Client.");
      setLoading(false); // Set loading to false
      return;
    }
  
    // Prepare the data to be sent to the backend
    const currentUser = authService.getCurrentUser()
    const detail = {
      username: currentUser.username,
      name: record1.clname,
      panno: record1.ks_panno,
      kslucc: record1.kslucc,
      dpId: record1.ksdp_boid,
      incomeRange: incomeRange,
      mailid: record1.ks_emailid,
    };
  
    try {
      const response = await fetch("http://183.182.84.228:4005/sendss", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uccDetail: detail }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const resData = await response.json();
      if (resData.status === "success") {
        if (record1.kslucc === record2.kslucc) {
          alert(`Email is already sent for Client Code ${record2.kslucc}, Name of Client ${record2.name}, Mailid ${record2.mailid}, Send Date ${record2.date}`);
          alert("Message Sent");
        } else {
          alert("Message Sent");
        }
      } else if (resData.status === "fail") {
        alert("Message failed to send");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert(`Email is already sent for Client Code ${record2.kslucc}, Name of Client ${record2.name}, Mailid ${record2.mailid}, Send Date ${record2.date}`);
    } finally {
      setLoading(false); // Set loading to false after email is sent
    }
};








  // Uncomment the handleMail function
  async function handleMail() {
    if (!selectedRecords || selectedRecords.length === 0) return;

    const record1 = selectedRecords[0];
    const message = 
    `Dear Sir,

Please Active my Account.
        
1. Name - ${record1.clname}
        
2. pan no. - ${record1.ks_panno}
        
3. Client Code - ${record1.kslucc}
        
4. Client DP Id - ${record1.ksdp_boid}
        
5. There is no change in my KYC.
        
6. Income Range As On 31/03/24: ${incomeRange}
        
7. Consent dormancy activation: YES
        
8. Pep (Political Expose person): NO
        
9. Relative PEP : NO
        
Please Check and forward Mail to these Email IDs.
        
joshi.tarun@kotak.com , damian.vaz@kotak.com , koushlendra.upadhyay@kotak.com , info@exclusivegroup.co.in
        
Regards,
Thank You`;

    // const content = contentRef.current;
    // const kslucc = selectedRecords[0].kslucc;

    // // Get the current date
    // const currentDate = new Date();
    // const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

    // // Set the filename with kslucc and current date
    // const filename = `${kslucc}_${formattedDate}.pdf`;

    // // Use html2pdf to convert the HTML content to PDF
    // const pdfPromise = await html2pdf().from(contentRef.current).set({
    //   margin: 10,
    //   filename: filename,
    //   image: { type: 'jpeg', quality: 0.98 },
    //   html2canvas: { scale: 2 },
    //   jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    // }).outputPdf('blob');

    // // Attach the PDF to the email
    // const files = new File([pdfPromise], `${record1.kslucc}_Authorization_Letter_${formattedDate}.pdf`, { type: 'application/pdf' });

    setMailerState((prevState) => ({
      ...prevState,
      name: record1.clname,
      recipients: record1.ks_emailid,
      message: message,
      subject : `Dormancy Activation Request`,
    }));
  }

  function openMailModal(emailData) {
    setMailerState({
      name: emailData.name,
      recipients: emailData.recipients,
      message: emailData.message,
    });
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

    // After the PDF is generated, handle the file
    pdfPromise.then((pdfFile) => {
      // Update the state with the PDF file
      setMailerState((prevState) => ({
        ...prevState,
        file: pdfFile,
      }));
    });
  }

  return (
    <div>
      {!previewMode && (
        <>
          <h5 style={{float:'right'}}><strong>Updated Date ::</strong> {records.length > 0 && records[1].run_date ? records[1].run_date : 'N/A'}</h5>
          <h3>Dormancy Activation letter</h3>
          <label>&nbsp;  Client Ucc : &nbsp;</label>
          <input
            list="records"
            value={filter1}
            placeholder="Search by Ucc"
            onChange={(e) => setFilter1(e.target.value.toUpperCase())}
          />
          <datalist id="records">
            {records.map((record) => (
              <option key={record._id} value={record.kslucc}>
                {record.kslucc}
              </option>
            ))}
          </datalist>

          <label>&nbsp; Income Range : &nbsp;</label>
          <select value={incomeRange} onChange={(e) => setIncomeRange(e.target.value)}>
            <option value="">Select Income Range</option>
            <option value="Below 1 Lac">Below 1 Lac</option>
            <option value="1 to 5 Lacs">1 to 5 Lacs</option>
            <option value="5 to 10 Lacs">5 to 10 Lacs</option>
            <option value="10 to 25 Lacs">10 to 25 Lacs</option>
            <option value="More than 25 Lacs">More than 25 Lacs</option>
          </select>

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
          {/* <button className="print-button" onClick={handlePrint}>Print</button> */}
          &nbsp;&nbsp;&nbsp;
          <button onClick={handleMail}>Mail</button>
          &nbsp;&nbsp;&nbsp;
          {/* <button className="download-button" onClick={handleDownload}>Download</button> */}

          <div className="mail-preview">
            <div className="App">
              <form
                style={{
                  display: "flex",
                  height: "100vh",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onSubmit={submitEmail}
              >
                <fieldset
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "50%",
                  }}
                >
                  <legend>React NodeMailer Contact Form</legend>
                  <input
                    placeholder="Name"
                    onChange={handleStateChange}
                    name="name"
                    value={mailerState.name}
                  />
                  <input
                    placeholder="Recipients (comma-separated)"
                    onChange={handleStateChange}
                    name="recipients"
                    value={mailerState.recipients}
                  />
                  <textarea
                    style={{ minHeight: "200px" }}
                    placeholder="Message"
                    onChange={handleStateChange}
                    name="message"
                    value={mailerState.message}
                  />
                  <button>Send Message</button>
                </fieldset>
              </form>
            </div>
          </div>

          {/* <div ref={contentRef}>
            {viewRecordDetails()}
          </div> */}
        </>
      )}
    </div>
  );
}