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
 
 export default function Letter() {
  const contentRef = useRef();
  const [loading, setLoading] = useState(false); // State to track loading
  const [records, setRecords] = useState([]);
  const [file, setFile] = useState(null);
  const [filter1, setFilter1] = useState('');
  const [filter2, setFilter2] = useState('');
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [filter3, setFilter3] = useState('');
  const [details, setDetails] = useState([]);
  


//  useEffect(() => {
//    async function getRecords() {
//     setLoading(true); // Set loading to true before fetch
//      const response = await fetch(`http://183.182.84.228:4005/letter/`);

//      if (!response.ok) {
//        const message = `An error occurred: ${response.statusText}`;
//        window.alert(message);
//        setLoading(false); // Set loading to false after fetch
//        return;
//      }

//      const records = await response.json();
//      setRecords(records);
//      setLoading(false); // Set loading to false after fetch
//    }

//    getRecords();

//    return;
//  }, [records.length]);




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
      
      // Filter records to only include those with 'P' in the 4th position of ks_panno
      const filteredRecords = records.filter(record => record.ks_panno && typeof record.ks_panno === 'string' && record.ks_panno[3] === 'P');
      
      setRecords(filteredRecords);
      // console.log(filteredRecords);
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



useEffect(() => {
  async function getDetails() {
    const response = await fetch(`http://183.182.84.228:4005/letter/`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const details = await response.json();


    setDetails(details);
  }

  getDetails();

  return;
}, [details.length]);






 function viewRecord(record) {
  setSelectedRecords(record);
}

function handleSubmit() {
  if (!filter1) {
    alert("Please fill the 'Authorize Person Ucc' input");
    return;
  }

  if (!filter2) {
    alert("Please fill the 'Client Ucc' input");
    return;
  }

  if (!filter3) {
    alert("Please fill the 'Relation To Client' input");
    return;
  }

  if (filter1 === filter2) {
    alert("'Authorize Person Ucc' and 'Client Ucc' cannot be the same");
    return;
  }

  const record1 = records.find((record) => record.kslucc === filter1);
  const record2 = records.find((record) => record.kslucc === filter2);
  const record3 = details.find((record) => record.ksl_rela === filter3);

  if (!record1) {
    alert("No record found for the given input");
    return;
  }
  if (!record2) {
    alert("No record found for the given input");
    return;
  }
  if (!record3) {
    alert("No record found for the given input");
    return;
  }
  setSelectedRecords([record1, record2, record3]);
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
const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

function viewRecordDetails() {
  if (!selectedRecords || selectedRecords.length === 0) return null;

  const record1 = selectedRecords[0];
  const record2 = selectedRecords[1];
  const record3 = selectedRecords[2];

  return (
    <div style={{fontSize:20}}>
      
      <section>
      <img src={myImage} alt="My Image" style={{width: '80mm', height: '55mm', marginTop:0, float:"right"}}/>
            <p><strong>Date:</strong> {date}</p>
            <p>To, </p>
            <p>Kotak Securities Ltd.</p><br/>
            <h4 style={{ textAlign : "center"}}>AUTHORISATION LETTER</h4>
    
            <p><strong>Dear Sir/Madam,</strong></p>
            

    <p>I/We, <strong>{record1.clname}</strong> residing at <strong> {record1.coradd1} , {record1.coradd2} , {record1.coradd3} , {record1.coradd4} </strong>                                                                                                                                                                                                                                                         
    having trading account with you under client code  <strong> {record1.kslucc} </strong>   
    I do hereby authorise Mr/Ms. <strong> {record2.clname} </strong>                                                                                                                                                                
This person is / is not a PEP (Politically Exposed person) or Related to PEP.
Please confirm – Yes PEP or No PEP   <strong> NO </strong>
Our relation is     <strong> {record3.ksl_rela} </strong> residing at <strong> {record2.coradd1} , {record2.coradd2} , {record2.coradd3} , {record2.coradd4} </strong>
having contact no <strong> {record2.ks_mobile} </strong> Email Id  <strong> {record2.ks_emailid} </strong>
and client code <strong> {record2.kslucc} </strong>  to as my / our authorized representative  to do following acts, deeds and things for and on my behalf:  </p>


    <ol>
        <li>To sell, purchase, endorse, negotiate and for otherwise deal in securities and/or sign and to execute
all transfer deeds whether as transferor or transferee and such other instruments, application and
documents as may be necessary for the purpose of acquiring or transferring the same, marking
pledge/lien on such securities or otherwise deal, negotiate or trade in securities on my behalf
including in Futures and options segment.</li><br/>
        <li>For the aforesaid purpose to sign contracts, agreements, transfers, acceptances, receipts,
acquaintances or other instruments, documents and forms, to accept and carry out correspondence
with such person(s) or authority/authorities or department(s) and to do all lawful acts required for
effecting the same.</li><br/>
        <li>To accept and give valid discharges for acceptances and submission of contract notes, bills, ledger
statements, transaction statements and all correspondence and communications including all trade
related communications on my behalf.</li><br/>
        <li>. I/We am/are aware that the Authority Letter cannot be executed in favour of <br/> a) Authorize Person/ 
Franchisee and its employees and <br/> b) Referrers, except for accounts belonging to the relatives of such 
persons</li><br/>
        
    </ol>


    <p className="p2">In case Referrer of the account is the same as Authorized Representative, the following clause 
is applicable and I/We agree and accept the following: I/We am/ are aware and informed that 
Exchanges have issued circulars on incentives/referral schemes which inter alia restricts the 
Referrer from undertaking certain activities. I/We have read and understood all the circulars, 
guidelines, clarifica ons etc., issued by Regulators from time-to-time and am aware of the risks 
and implications in authorizing the Referrer to act as my Authorized Representative. However,I/
We still wish to authorize as submitted vide my/ our above request and I/We therefore 
requestyou to register the same in your records.</p>

    <p>I/we hereby confirm and declare that my/our relation with the Authorized representative as 
mentioned above is true and correct.</p>

    <p>I / we hereby agree, ratify and confirm all acts, deeds and things of whatsoever nature done 
by my / our authorized representative by virtue of this authority.</p>
<p>
By submitting this, I agree to accept all terms and conditions of authorizing person for my 
account.</p>
    <p><strong>Thank You,</strong></p>

        </section>
    </div>
  );
}


function handlePrint() {
  window.print();
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
  formData.append("file", mailerState.file);

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

  if (!record2.coradd1) {
    alert("Address is missing in Authorize Person.");
    setLoading(false); // Set loading to false
    return;
  } else if (!record2.ks_mobile) {
    alert("Phone number is missing in Authorize Person.");
    setLoading(false); // Set loading to false
    return;
  } else if (!record2.ks_emailid) {
    alert("Email is missing in Authorize Person.");
    setLoading(false); // Set loading to false
    return;
  }

  // Check if file is attached
  if (!mailerState.file) {
    alert("Please attach a file before sending the email.");
    setLoading(false); // Set loading to false
    return;
  }

  try {
    const response = await fetch("http://183.182.84.228:4005/send", {
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
  const subject = `AL Registration Form ${record1.kslucc}`
  const message = `Dear ${record1.clname},

Please find attachment with the AL Registration Form.

Please Check and forward Mail to these Email IDs.

joshi.tarun@kotak.com  , damian.vaz@kotak.com , koushlendra.upadhyay@kotak.com , info@exclusivegroup.co.in

Regards,
Thank You`;


const content = contentRef.current;
  const kslucc = selectedRecords[0].kslucc;

  // Get the current date
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

  // Set the filename with kslucc and current date
  const filename = `${kslucc}_${formattedDate}.pdf`;

  // Use html2pdf to convert the HTML content to PDF
  const pdfPromise = await html2pdf().from(contentRef.current).set({
    margin: 10,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  }).outputPdf('blob');

  // Generate the PDF dynamically
  // const pdf = await html2pdf().from(contentRef.current).set({
  //   margin: 10,
  //   image: { type: 'jpeg', quality: 0.98 },
  //   html2canvas: { scale: 2 },
  //   jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  // }).outputPdf('blob');

  // Attach the PDF to the email
  const files = new File([pdfPromise], `${record1.kslucc}_Authorization_Letter_${formattedDate}.pdf`, { type: 'application/pdf' });

  setMailerState((prevState) => ({
    ...prevState,
    name: record1.clname,
    subject: subject,
    recipients: record1.ks_emailid,
    message: message,
    file: files,
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

  // Display the email modal (assuming you have a modal component)
  // You need to implement your modal display logic here
  // Example: setMailModalVisible(true);
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

        <label>&nbsp; Authorize Person Ucc : &nbsp;</label>
        <input
          list="records"
          value={filter2}
          placeholder="Search by Ucc"
          onChange={(e) => setFilter2(e.target.value.toUpperCase())}
        />
        <datalist id="records">
          {records.map((record) => (
            <option key={record._id} value={record.kslucc}>
              {record.kslucc}
            </option>   
          ))}
        </datalist>

        <label>&nbsp; Relation To Client : &nbsp;</label>
        <input
          list="rela-records"
          value={filter3}
          placeholder="Search Relation"
          onChange={(e) => setFilter3(e.target.value)}
        />
        <datalist id="rela-records">
          {details.map((record) => (
            <option key={record.id} value={record.ksl_rela}>
              {record.ksl_rela}
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
        <button className="print-button" onClick={handlePrint}>Print</button>
        &nbsp;&nbsp;&nbsp;
    <button onClick={handleMail}>Mail</button>
    &nbsp;&nbsp;&nbsp;
    <button className="download-button" onClick={handleDownload}>Download</button>
    


    {/* Add the mail preview */}
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
                    {/* <input
                        placeholder="Email"
                        onChange={handleStateChange}
                        name="email"
                        value={mailerState.email}
                    /> */}
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
                    <label>
  Attached File:
  {mailerState.file ? mailerState.file.name : "No file attached"}
</label>
                    <button>Send Message</button>
                </fieldset>
            </form>
        </div>

      {/* Add file input logic if needed */}
    </div>


    <div ref={contentRef}>
            {viewRecordDetails()}
          </div>


      </>
    )}
  </div>
);
    }










    // import React, { useEffect, useState, useRef } from "react";
// import ReactDOMServer from 'react-dom/server';
// import html2pdf from 'html2pdf.js';
// import "./Letter.css";
// import myImage from './logo.png';

// import { Spinner } from "react-bootstrap";

// const Record = (props) => (
//   <tr>
//     <td>{props.record.clname}</td>
//     <td>{props.record.kslucc}</td>
//     <td>{props.record.ucc}</td>
    
//   </tr>
//  );
 
//  export default function Letter() {
//   const contentRef = useRef();
//   const [loading, setLoading] = useState(false); // State to track loading
//   const [records, setRecords] = useState([]);
//   const [file, setFile] = useState(null);
//   const [filter1, setFilter1] = useState('');
//   const [filter2, setFilter2] = useState('');
//   const [selectedRecords, setSelectedRecords] = useState([]);
//   const [previewMode, setPreviewMode] = useState(false);
//   const [filter3, setFilter3] = useState('');
  


//  useEffect(() => {
//    async function getRecords() {
//     setLoading(true); // Set loading to true before fetch
//      const response = await fetch(`http://183.182.84.228:4005/letter/`);

//      if (!response.ok) {
//        const message = `An error occurred: ${response.statusText}`;
//        window.alert(message);
//        setLoading(false); // Set loading to false after fetch
//        return;
//      }

//      const records = await response.json();
//      setRecords(records);
//      setLoading(false); // Set loading to false after fetch
//    }

//    getRecords();

//    return;
//  }, [records.length]);

//  function viewRecord(record) {
//   setSelectedRecords(record);
// }

// function handleSubmit() {
//   if (!filter1) {
//     alert("Please fill the 'Authorize Person Ucc' input");
//     return;
//   }

//   if (!filter2) {
//     alert("Please fill the 'Client Ucc' input");
//     return;
//   }

//   if (!filter3) {
//     alert("Please fill the 'Relation To Client' input");
//     return;
//   }

//   if (filter1 === filter2) {
//     alert("'Authorize Person Ucc' and 'Client Ucc' cannot be the same");
//     return;
//   }

//   const record1 = records.find((record) => record.kslucc === filter1);
//   const record2 = records.find((record) => record.kslucc === filter2);
//   const record3 = records.find((record) => record.ksl_rela === filter3);
//   setSelectedRecords([record1, record2, record3]);
//   setPreviewMode(true);
// }

// function handleBack() {
//   setPreviewMode(false);
// }

// function recordList() {
//   return selectedRecords.map((record) => {
//     return (
//       <Record
//         record={record}
        
//         viewRecord={() => setSelectedRecords([record])}
//         key={record._id}
//       />
//     );
//   });
// }
// const current = new Date();
// const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

// function viewRecordDetails() {
//   if (!selectedRecords || selectedRecords.length === 0) return null;

//   const record1 = selectedRecords[0];
//   const record2 = selectedRecords[1];
//   const record3 = selectedRecords[2];

//   return (
//     <div style={{fontSize:20}}>
      
//       <section>
//       <img src={myImage} alt="My Image" style={{width: '80mm', height: '55mm', marginTop:0, float:"right"}}/>
//             <p><strong>Date:</strong> {date}</p>
//             <p>To, </p>
//             <p>Kotak Securities Ltd.</p><br/>
//             <h4 style={{ textAlign : "center"}}>AUTHORISATION LETTER</h4>
    
//             <p><strong>Dear Sir/Madam,</strong></p>
            

//     <p>I/We, <strong>{record1.clname}</strong> residing at <strong> {record1.coradd1} , {record1.coradd2} , {record1.coradd3} , {record1.coradd4} </strong>                                                                                                                                                                                                                                                         
//     having trading account with you under client code  <strong> {record1.kslucc} </strong>   
//     I do hereby authorise Mr/Ms. <strong> {record2.clname} </strong>                                                                                                                                                                
// This person is / is not a PEP (Politically Exposed person) or Related to PEP.
// Please confirm – Yes PEP or No PEP   <strong> NO </strong>
// Our relation is     <strong> {record3.ksl_rela} </strong> residing at <strong> {record2.coradd1} , {record2.coradd2} , {record2.coradd3} , {record2.coradd4} </strong>
// having contact no <strong> {record2.ks_mobile} </strong> Email Id  <strong> {record2.ks_emailid} </strong>
// and client code <strong> {record2.kslucc} </strong>  to as my / our authorized representative  to do following acts, deeds and things for and on my behalf:  </p>


//     <ol>
//         <li>To sell, purchase, endorse, negotiate and for otherwise deal in securities and/or sign and to execute
// all transfer deeds whether as transferor or transferee and such other instruments, application and
// documents as may be necessary for the purpose of acquiring or transferring the same, marking
// pledge/lien on such securities or otherwise deal, negotiate or trade in securities on my behalf
// including in Futures and options segment.</li><br/>
//         <li>For the aforesaid purpose to sign contracts, agreements, transfers, acceptances, receipts,
// acquaintances or other instruments, documents and forms, to accept and carry out correspondence
// with such person(s) or authority/authorities or department(s) and to do all lawful acts required for
// effecting the same.</li><br/>
//         <li>To accept and give valid discharges for acceptances and submission of contract notes, bills, ledger
// statements, transaction statements and all correspondence and communications including all trade
// related communications on my behalf.</li><br/>
//         <li>. I/We am/are aware that the Authority Letter cannot be executed in favour of <br/> a) Authorize Person/ 
// Franchisee and its employees and <br/> b) Referrers, except for accounts belonging to the relatives of such 
// persons</li><br/>
        
//     </ol>


//     <p className="p2">In case Referrer of the account is the same as Authorized Representative, the following clause 
// is applicable and I/We agree and accept the following: I/We am/ are aware and informed that 
// Exchanges have issued circulars on incentives/referral schemes which inter alia restricts the 
// Referrer from undertaking certain activities. I/We have read and understood all the circulars, 
// guidelines, clarifica ons etc., issued by Regulators from time-to-time and am aware of the risks 
// and implications in authorizing the Referrer to act as my Authorized Representative. However,I/
// We still wish to authorize as submitted vide my/ our above request and I/We therefore 
// requestyou to register the same in your records.</p>

//     <p>I/we hereby confirm and declare that my/our relation with the Authorized representative as 
// mentioned above is true and correct.</p>

//     <p>I / we hereby agree, ratify and confirm all acts, deeds and things of whatsoever nature done 
// by my / our authorized representative by virtue of this authority.</p>
// <p>
// By submitting this, I agree to accept all terms and conditions of authorizing person for my 
// account.</p>
//     <p><strong>Thank You,</strong></p>

//         </section>
//     </div>
//   );
// }


// function handlePrint() {
//   window.print();
// }



// const [mailerState, setMailerState] = useState({
//   name: "",
//   // email: "",
//   recipients: "", // Modified to accept multiple email addresses
//   message: "",
//   file: null,
// });

// function handleStateChange(e) {
//   if (e.target.name === "file") {
//       setMailerState((prevState) => ({
//           ...prevState,
//           [e.target.name]: e.target.files[0],
//       }));
//   } else {
//       setMailerState((prevState) => ({
//           ...prevState,
//           [e.target.name]: e.target.value,
//       }));
//   }
// }

// const submitEmail = async (e) => {
//   e.preventDefault();
//   setLoading(true); // Set loading to true before sending email

//   const formData = new FormData();
//   formData.append("name", mailerState.name);
//   formData.append("recipients", mailerState.recipients);
//   formData.append("message", mailerState.message);
//   formData.append("file", mailerState.file);

//   try {
//     const response = await fetch("http://183.182.84.228:4005/send", {
//       method: "POST",
//       body: formData,
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
//     alert("An error occurred while sending email");
//   } finally {
//     setLoading(false); // Set loading to false after email is sent
//   }
// };

// // Uncomment the handleMail function
// function handleMail() {
//   // Open the email modal with the email data
//   if (!selectedRecords || selectedRecords.length === 0) return null;
//   const record1 = selectedRecords[0];
//   const record2 = selectedRecords[1];
//   const record3 = selectedRecords[2];
//   const pdfFile = mailerState.file;
//   openMailModal({
//     name: record1.clname,
//     recipients: record1.ks_emailid,
//     message: `Dear ${record1.clname},

// Please find attachment with the AL Registration Form.

// Please Check and forward Mail to these Email IDs.

// damian.vaz@kotak.com

// joshi.tarun@kotak.com

// rams@exclusivegroup.co.in


// Regards,

// Thank You`,
//     file: pdfFile, // You may need to handle file attachment if required
//   });
// }


// // Function to open the email modal
// function openMailModal(emailData) {
//   // Set the email state with the data
//   setMailerState({
//     name: emailData.name,
//     recipients: emailData.recipients,
//     message: emailData.message,
//     file: emailData.file,
//   });

//   // Display the email modal (assuming you have a modal component)
//   // You need to implement your modal display logic here
//   // Example: setMailModalVisible(true);
// }
// function handleStateChange(e) {
//   if (e.target.name === "file") {
//     setMailerState((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.files[0],
//     }));
//   } else {
//     setMailerState((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   }
// }


// function handleDownload() {
//   const content = contentRef.current;
//   const kslucc = selectedRecords[0].kslucc;

//   // Get the current date
//   const currentDate = new Date();
//   const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

//   // Set the filename with kslucc and current date
//   const filename = `${kslucc}_${formattedDate}.pdf`;

//   // Use html2pdf to convert the HTML content to PDF
//   const pdfPromise = html2pdf(content, {
//     margin: 10,
//     filename: filename,
//     image: { type: 'jpeg', quality: 0.98 },
//     html2canvas: { scale: 2 },
//     jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
//   });

//   // After the PDF is generated, handle the file
//   pdfPromise.then((pdfFile) => {
//     // Update the state with the PDF file
//     setMailerState((prevState) => ({
//       ...prevState,
//       file: pdfFile,
//     }));
//   });
// }





// return (
//   <div>
    
//     {!previewMode && (
//       <>
//       <h5 style={{float:'right'}}><strong>Updated Date ::</strong> {records.length > 0 && records[1].run_date ? records[1].run_date : 'N/A'}</h5>
//       <h3>Individual</h3>
//       <label>&nbsp;  Client Ucc : &nbsp;</label>
//         <input
//           list="records"
//           value={filter1}
//           placeholder="Search by Ucc"
//           onChange={(e) => setFilter1(e.target.value.toUpperCase())}
//         />
//         <datalist id="records">
//           {records.map((record) => (
//             <option key={record._id} value={record.kslucc}>
//               {record.kslucc}
//             </option>
//           ))}
//         </datalist>

//         <label>&nbsp; Authorize Person Ucc : &nbsp;</label>
//         <input
//           list="records"
//           value={filter2}
//           placeholder="Search by Ucc"
//           onChange={(e) => setFilter2(e.target.value.toUpperCase())}
//         />
//         <datalist id="records">
//           {records.map((record) => (
//             <option key={record._id} value={record.kslucc}>
//               {record.kslucc}
//             </option>   
//           ))}
//         </datalist>

//         <label>&nbsp; Relation To Client : &nbsp;</label>
//         <input
//           list="rela-records"
//           value={filter3}
//           placeholder="Search Relation"
//           onChange={(e) => setFilter3(e.target.value)}
//         />
//         <datalist id="rela-records">
//           {records.map((record) => (
//             <option key={record.id} value={record.ksl_rela}>
//               {record.ksl_rela}
//             </option>
//           ))}
//         </datalist>
//         &nbsp;&nbsp;&nbsp;
//         <button onClick={handleSubmit}>Submit</button>
//       </>
//     )}
//     {loading && (
//           <div style={{ textAlign: "center", marginTop: "20px" }}>
//             <Spinner animation="border" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </Spinner>
//           </div>
//         )}
//     {previewMode && (
//       <>
//         <button className="back-button" onClick={handleBack}>Back</button>
//         &nbsp;&nbsp;&nbsp;
//         <button className="print-button" onClick={handlePrint}>Print</button>
//         &nbsp;&nbsp;&nbsp;
//     <button onClick={handleMail}>Mail</button>
//     &nbsp;&nbsp;&nbsp;
//     <button className="download-button" onClick={handleDownload}>Download</button>
    


//     {/* Add the mail preview */}
//     <div className="mail-preview">
//     <div className="App">
//             <form
//                 style={{
//                     display: "flex",
//                     height: "100vh",
//                     justifyContent: "center",
//                     alignItems: "center",
//                 }}
//                 onSubmit={submitEmail}
//             >
//                 <fieldset
//                     style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "center",
//                         width: "50%",
//                     }}
//                 >
//                     <legend>React NodeMailer Contact Form</legend>
//                     <input
//                         placeholder="Name"
//                         onChange={handleStateChange}
//                         name="name"
//                         value={mailerState.name}
//                     />
//                     {/* <input
//                         placeholder="Email"
//                         onChange={handleStateChange}
//                         name="email"
//                         value={mailerState.email}
//                     /> */}
//                     <input
//                         placeholder="Recipients (comma-separated)"
//                         onChange={handleStateChange}
//                         name="recipients"
//                         value={mailerState.recipients}
//                     />
//                     <textarea
//                         style={{ minHeight: "200px" }}
//                         placeholder="Message"
//                         onChange={handleStateChange}
//                         name="message"
//                         value={mailerState.message}
//                     />
//                     <input
//                         type="file"
//                         onChange={handleStateChange}
//                         name="file"
//                     />
//                     <button>Send Message</button>
//                 </fieldset>
//             </form>
//         </div>

//       {/* Add file input logic if needed */}
//     </div>


//     <div ref={contentRef}>
//             {viewRecordDetails()}
//           </div>


//       </>
//     )}
//   </div>
// );
//     }