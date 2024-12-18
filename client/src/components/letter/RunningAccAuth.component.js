

import React, { useEffect, useState, useRef } from "react";
import ReactDOMServer from 'react-dom/server';
import html2pdf from 'html2pdf.js';
import "./Letter.css";
import myImage from './logo.png';

import { Spinner } from "react-bootstrap";

const Record = (props) => (
  <tr>
    <td>{props.record.clname}</td>
    <td>{props.record.kslucc}</td>
    <td>{props.record.ucc}</td>
    
  </tr>
 );
 
 export default function RunningAccLetter() {
  const contentRef = useRef();
  const [loading, setLoading] = useState(false); // State to track loading
  const [records, setRecords] = useState([]);
  // const [file, setFile] = useState(null);
  const [filter1, setFilter1] = useState('');
  const [filter2, setFilter2] = useState('');
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [filter3, setFilter3] = useState('');
  const [details, setDetails] = useState([]);
  




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
      
      
      setRecords(records);
    } catch (error) {
      const message = `An error occurred: ${error.message}`;
      window.alert(message);
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  }

  getRecords();

  return;
}, [records.length]);







function handleSubmit() {
  if (!filter1) {
    alert("Please fill the 'Authorize Person Ucc' input");
    return;
  }


  if (!filter3) {
    alert("Please fill the 'Relation To Client' input");
    return;
  }

  if (filter1 === filter3) {
    alert("'Authorize Person Ucc' and 'Client Ucc' cannot be the same");
    return;
  }

  const record1 = records.find((record) => record.kslucc === filter1);
  const record3  = filter3;

  if (!record1) {
    alert("No record found for the given input");
    return;
  }

  if (!record3) {
    alert("No record found for the given input");
    return;
  }
  setSelectedRecords([record1, record3]);
  setPreviewMode(true);
}

function handleBack() {
  setPreviewMode(false);
}


const [mailerState, setMailerState] = useState({
  name: "",
  subject: "",
  recipients: "", // Modified to accept multiple email addresses
  message: "",
  file: null,
});

function handleStateChange(e) {
  if (e.target.name === "file") {
      setMailerState((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.files[0],
      }));
  } else {
      setMailerState((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
      }));
  }
}


const submitEmail = async (e) => {
  e.preventDefault();
  setLoading(true); // Set loading to true before sending email

  const formData = new FormData();
  formData.append("name", mailerState.name);
  formData.append("subject", mailerState.subject);
  formData.append("recipients", mailerState.recipients);
  formData.append("message", mailerState.message);

  // Check if selectedRecords exist and have at least 2 items
  if (!selectedRecords || selectedRecords.length < 2) {
    alert("Please select at least two records before sending the email.");
    setLoading(false); // Set loading to false
    return;
  }

  const record1 = selectedRecords[0];
  const record2 = selectedRecords[1];

  // Check if phone number and email are available for both records
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


  try {
    const response = await fetch("http://183.182.84.228:4005/newsend", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const resData = await response.json();
    if (resData.status === "success") {
      alert("Message Sent");
    } else if (resData.status === "fail") {
      alert("Message failed to send");
    }
  } catch (error) {
    console.error("Error sending email:", error);
    alert("An error occurred while sending email");
  } finally {
    setLoading(false); // Set loading to false after email is sent
  }
};

// Uncomment the handleMail function
async function handleMail() {
  if (!selectedRecords || selectedRecords.length === 0) return;

  const record1 = selectedRecords[0];
  const record3 = selectedRecords[1];
  const subject = `Running Account Authorisation ${record1.kslucc}`
  const message = `Dear ${record1.clname},

In order to facilitate operations of my/our trading account opened under the aforesaid client code ${record1.kslucc}. I/we would like to authorize Kotak Securities Ltd. (“KSL”) to maintain a running account, instead of settlement-to-settlement clearance of funds due to me/us. In this regard I/we hereby authorize KSL to maintain a running account in accordance with circulars/ guidelines issued by SEBI/Exchanges from time to time. Periodic settlement as indicated by me/us below (hereinafter referred as ‘settlement period’), will be done by KSL on the first Friday of the Month/Quarter as per the preference opted by me/us .
 I/We agree that l/we shall be liable to pay the debit standing to my account on the settlement date or any other date. I/We agree that KSL may, at the time of periodic settlement retain funds as may be allowed by the Exchanges/SEBI, towards margin obligations on current and future transactions and such funds towards any other unbilled services/charges for services availed from KSL. I/We agree that KSL shall not be liable for any claim for loss, loss of profit, loss of interest or for any consequential, incidental, special or exemplary damages, caused by retention/settlement of such funds under aforesaid arrangement or otherwise. I/We am/are aware that the authorization will be in force till the same is revoked by me/us. Further I/we may revoke the authorization any time making a valid request for revocation. KSL may release the funds to me/us on settlement date or on request or on revocation of authority, if sufficient margins in respect of my/our trading, across the Stock Exchange(s) and across the segment of the Stock Exchange(s) are available with KSL.
 I/We am/are aware that for the purpose of settlement of funds, the mode of transfer of funds shall be only by way of electronic transfer viz NEFT, RTGS etc. I/We shall prefer settlement of fund at such frequency as mentioned below.


${record3} basis (on Settlement to Settlement basis) in Cash and ${record3} for other segments`;


const content = contentRef.current;
  const kslucc = selectedRecords[0].kslucc;

  // Get the current date
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;



  setMailerState((prevState) => ({
    ...prevState,
    name: record1.clname,
    subject: subject,
    recipients: record1.ks_emailid,
    message: message
  }));
}


// Function to open the email modal
function openMailModal(emailData) {
  // Set the email state with the data
  setMailerState({
    name: emailData.name,
    subject: emailData.subject,
    recipients: emailData.recipients,
    message: emailData.message,
    file: emailData.file,
  });


}
function handleStateChange(e) {
  if (e.target.name === "file") {
    setMailerState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.files[0],
    }));
  } else {
    setMailerState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
}




return (
  <div>
    
    {!previewMode && (
      <>
      <h5 style={{float:'right'}}><strong>Updated Date ::</strong> {records.length > 0 && records[1].run_date ? records[1].run_date : 'N/A'}</h5>
      <h3>Individual</h3>
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

        <label>&nbsp; Expiry : &nbsp;</label>
        <input
          list="rela-records"
          value={filter3}
          placeholder="Search Expiry"
          onChange={(e) => setFilter3(e.target.value)}
        />
        <datalist id="rela-records">
          <option value="Daily">Daily</option>
          <option value="Monthly">Monthly</option>
          <option value="Quarterly">Quarterly</option>
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
    <button onClick={handleMail}>Mail</button>
    &nbsp;&nbsp;&nbsp;

    


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

      </>
    )}
  </div>
);
    }


