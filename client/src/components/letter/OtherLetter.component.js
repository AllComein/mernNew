
import React, { useEffect, useState, useRef } from "react";
import ReactDOMServer from 'react-dom/server';
import html2pdf from 'html2pdf.js';
import "./Letter2.css";
import myImage from './logo.png';
import { Spinner } from "react-bootstrap";
import AuthService from "../../services/auth.service";

const Record = (props) => (
  <tr>
    <td>{props.record.clname}</td>
    <td>{props.record.kslucc}</td>
    <td>{props.record.ucc}</td>
  </tr>
);

export default function OtherLetter1() {
  const contentRef = useRef();
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [file, setFile] = useState(null);
  const [filter1, setFilter1] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedPhone, setSelectedPhone] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [filter3, setFilter3] = useState('');
  const [details, setDetails] = useState([]);





  
  useEffect(() => {
    async function getRecords() {
      setLoading(true); // Set loading to true before fetch
      const response = await fetch(`http://183.182.84.228:4005/letter/`);
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        setLoading(false); // Set loading to false after fetch
        return;
      }
  
      const records = await response.json();
      const currentUser = AuthService.getCurrentUser();
      const allUsersResponse = await AuthService.getAllUsers();
      const currentUserDetails = allUsersResponse.find(user => user.username === currentUser.username);
        const viewableUsers = currentUserDetails.viewableUsers.split(',');

      const filteredLetterData = records.filter(record =>  viewableUsers.includes(record.es_locnid));

      // const filteredLetterData = records.filter((record) => {
      //   if (currentUser.username === "E640") {
      //     return ["E640", "E641", "E642", "E643"].includes(record.es_locnid);
      //   } else {
      //     return currentUser.username === record.es_locnid;
      //   }
      // });
      
  
      // Filter the records
      const filteredRecords =  filteredLetterData ;
  
      setRecords(filteredRecords);
      setLoading(false); // Set loading to false after fetch
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

  function handleSubmit() {
    if (!filter1) {
      alert("Please fill the 'Client Ucc' input");
      return;
    }

    if (!selectedName || !selectedEmail || !selectedPhone || !selectedAddress) {
      alert("Please fill all the fields: Name, Email, Phone Number, and Address");
      return;
    }

    if (!filter3) {
      alert("Please fill the 'Relation To Client' input");
      return;
    }

    const record1 = records.find((record) => record.kslucc === filter1);
    setSelectedName(selectedName);
    setSelectedEmail(selectedEmail);
    setSelectedPhone(selectedPhone);
    setSelectedAddress(selectedAddress);
    setPreviewMode(true);
  }

  function handleBack() {
    setPreviewMode(false);
  }

  function viewRecordDetails() {
    if (!selectedName || !selectedEmail || !selectedPhone || !selectedAddress) return null;

    const record1 = records.find((record) => record.kslucc === filter1);

    const currentDate = new Date();
    const date = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

    return (
      <div style={{fontSize:'20px'}}>
      <section><br/><br/><br/><br/><br/><br/>
            <p><strong>Annexure 1- Format of Authorization Letter:</strong></p>
            <p><strong>Date:</strong> {date}</p>
            
            
    <p>To,<br/>
                Kotak Securities Ltd. Kotak Infinity 8th Floor.<br/>
                Bldg No.21<br/>
                Infinity Park, Off Western Exp. Highway Malad (E), Mumbai -<br/>
                400097</p><br/>
            <h4 style={{ textAlign : "center"}}>AUTHORISATION LETTER</h4>
    
            <p><strong>Dear Sir/Madam,</strong></p>
    
            
    
            <p>I/We,  <strong> {record1.clname} </strong>   residing at    <strong> {record1.coradd1} , {record1.coradd2} , {record1.coradd3} , {record1.coradd4} </strong>
            having trading account with you under client code <strong> {record1.kslucc} </strong>     I do hereby authorise Mr/Ms.    <strong> {selectedName} </strong>
who *is / is not a PEP (Politically Exposed person) or Related to PEP. 
Please confirm – Yes PEP or No PEP <strong> NO </strong> , relation <strong> {filter3} </strong>
residing at  <strong> {selectedAddress} </strong>
having contact no <strong> {selectedPhone} </strong> &  Email Id <strong> {selectedEmail} </strong>
 (whose specimen signature is as attested below) to act as my / our Authorized Representative to do
following acts,deeds and things for and on my behalf: </p>

    
           <br/> <ol>
                <li>To sell, purchase, endors, negotiate and for otherwise deal in securities and / or sign and to
                    execute all transfer deeds whether as transferor or transferee and such other instruments,
                    application and documents as may be necessary for the purpose of acquiring or transferring the
                    same, marking pledge/lien on such securities or otherwise deal, negotiate or trade in securities
                    on my behalf including in the Futures & Options segment.</li><br/>
                <li>For the aforesaid purpose to sign contracts, agreements, transfers, acceptances, receipts,
                    acquaintances or other instruments, documents and forms, to accept and carry out
                    correspondence with such person(s) or authority/authorities or department(s) and to do all
                    lawful acts required for effecting the same.</li><br/>
                <li>To accept and give valid discharges for acceptances and submission of contract notes, bills,
                    ledger statements, transaction statements and all correspondence and communications
                    including all trade related communications on my behalf.</li><br/>
                <li>. I/We am/are aware that the Authority Letter cannot be executed in favour of <br/> a) Authorize
                    Person/ Franchisee and its employees and <br/> b) R eferrers, except for accounts belonging to the
                    relatives of such persons.</li><br/>
                
            </ol>

            <p className="p2">In case Referrer of the account is the same as Authorized Representative, the following clause is
                applicable and I/We agree and accept the following: I/We am/ are aware and informed that
                Exchanges have issued circulars on incentives/referral schemes which inter alia restricts the
                Referrer from undertaking certain activities. I/We have read and understood all the circulars,
                guidelines, clarifications etc., issued by Regulators from time-to-time and am aware of the risks
                and implications in authorizing the R eferrer to act as my Authorized Representative. However,
                I/We still wish to authorize as submitted vide my/ our above request and I/We therefore request
                you to register the same in your records.</p>
                {/* <div style={{pageBreakAfter: "always"}}></div><br/> */}
           <br/> <p>I/we hereby confirm and declare that my/our relation with the Authorized representative as 
mentioned above is true and correct.</p>
    
            <p>I / we hereby agree, ratify and confirm all acts, deeds and things of whatsoever nature done 
by my / our authorized representative by virtue of this authority.</p><br/>

            <p>Accepted by the Authorized Representative:-</p>
            <p>I hereby con rm the authority vested upon me by (name of the client) and agree to take all
                ac on in good faith of the client.</p><br/><br/><br/>
            <b><input type="text" style={{width:'250px',height:'85px' , border:' 2mm solid bold',borderStyle:'solid double'}} placeholder="signature"/></b>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b><input type="text" style={{width:'250px',height:'85px',borderStyle:'solid double'}} placeholder="signature"/></b>
            <p>Client Signature   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Specimen Signature of Authorized</p>
            <p>Please affix photo of Authorized Representive duly signed across  
              <b><textarea className="textarea" type="text" style={{width:150,height:180 , borderStyle:'solid double' }} wrap="hard" placeholder="Authorized Representative's Photograph duly signed across" /></b><br/> <strong> *</strong> strike off whichever is not applicable.
            </p>
            <p>
               As a proof of iden a on & address of the aforemen oned Authorized representative, I/we
                hereby enclose certified true copy of the following:
                <ul><br/> <li>- PAN card of the Authorized representative containing photo and signature (PANCARD ONLY). If signature
                on PAN is not clear, than alternate signature proof to be provided along with PAN</li>
               <br/> <li>- Address Proof (Passport/Driving License/Voters ID card</li></ul></p>


        </section>
    </div>
    );
  }

  function handlePrint() {
    window.print();
  }

  function handleDownload() {
    const content = contentRef.current;
    const kslucc = records[0].kslucc; // Use `records` instead of `selectedRecords`
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const filename = `${kslucc}_${formattedDate}.pdf`;

    html2pdf()
      .from(content)
      .set({
        margin: 10,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .save();
  }

  return (

    <div className="App" >
      <h5 style={{float:'right'}}><strong>Updated Date ::</strong> {records.length > 0 && records[1].run_date ? records[1].run_date : 'N/A'}</h5>
          {loading && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
    {!previewMode && (
      <div style={{ margin: '20px auto', maxWidth: '800px', border: '5px solid #ccc', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <label htmlFor="filter1" style={{ flex: '1', textAlign: 'left' }}>Client Ucc</label>
          <input
            list="records"
            value={filter1}
            placeholder="Search by Ucc"
            onChange={(e) => setFilter1(e.target.value.toUpperCase())}
            style={{ flex: '2', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <datalist id="records">
            {records.map((record) => (
              <option key={record._id} value={record.kslucc}>
                {record.kslucc}
              </option>
            ))}
          </datalist>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <label htmlFor="name" style={{ flex: '1', textAlign: 'left' }}>Authorize Person Name</label>
          <input
            type="text"
            id="name"
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
            style={{ flex: '2', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <label htmlFor="email" style={{ flex: '1', textAlign: 'left' }}>Authorize Person Email</label>
          <input
            type="email"
            id="email"
            value={selectedEmail}
            onChange={(e) => setSelectedEmail(e.target.value)}
            style={{ flex: '2', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <label htmlFor="phone" style={{ flex: '1', textAlign: 'left' }}>Authorize Person Phone Number</label>
          <input
            type="tel"
            id="phone"
            value={selectedPhone}
            onChange={(e) => setSelectedPhone(e.target.value)}
            style={{ flex: '2', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <label htmlFor="address" style={{ flex: '1', textAlign: 'left' }}>Authorize Person Address</label>
          <input
            type="text"
            id="address"
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
            style={{ flex: '2', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <label htmlFor="filter3" style={{ flex: '1', textAlign: 'left' }}>Relation To Client</label>
          <input
            list="rela-records"
            value={filter3}
            placeholder="Search Relation"
            onChange={(e) => setFilter3(e.target.value)}
            style={{ flex: '2', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <datalist id="rela-records">
            {details.map((record) => (
              <option key={record.id} value={record.ksl_rela}>
                {record.ksl_rela}
              </option>
            ))}
          </datalist>
        </div>

        <button className="btn btn-primary" onClick={handleSubmit} style={{ width: '100%', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Generate Letter
        </button>
      </div>
    )}

    <div className="buttons">
      {previewMode && (
        <div>
          <button className="btn btn-secondary" onClick={handleBack} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Back
          </button>
          <button className="btn btn-success" onClick={handlePrint} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Print
          </button>
          <button className="btn btn-info" onClick={handleDownload} style={{ padding: '10px 20px', backgroundColor: '#17a2b8', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Download PDF
          </button>
        </div>
      )}
    </div>

    {previewMode && (
      <div ref={contentRef}>
        {viewRecordDetails()}
      </div>
    )}
  </div>
  );
}
