
// import React, { useEffect, useState, useRef } from "react";

// export default function PortDiff() {
//   const contentRef = useRef();
//   const [loading, setLoading] = useState(false); // State to track loading
//   const [records, setRecords] = useState([]);
//   const [selectedRecords, setSelectedRecords] = useState([]);
//   const [previewMode, setPreviewMode] = useState(false);
//   const [downloadUrl, setDownloadUrl] = useState(null); // URL for download

//   useEffect(() => {
//     async function getRecords() {
//       setLoading(true); // Set loading to true before fetch
//       try {
//         const response = await fetch(`http://183.182.84.228:4005/porteq/`);
//         if (!response.ok) {
//           const message = `An error occurred: ${response.statusText}`;
//           window.alert(message);
//           setLoading(false); // Set loading to false after fetch
//           return;
//         }
//         const records = await response.json();
//         // Use loose comparison to handle potential type mismatches
//         const filteredData = records.filter(record => record.comparison_result === 'Difference' && record.total_qty == 0 && record.dpid === 'IN300214');
  
//         setRecords(filteredData);
//         // console.log(filteredData);
//       } catch (error) {
//         const message = `An error occurred: ${error.message}`;
//         window.alert(message);
//       } finally {
//         setLoading(false); // Set loading to false after fetch
//       }
//     }
//     getRecords();
//   }, [records.length]);
  

//   const [mailerState, setMailerState] = useState({
//     name: "",
//     subject: "",
//     recipients: "", // Modified to accept multiple email addresses
//     message: "",
//     file: null,
//   });

//   function handleStateChange(e) {
//     if (e.target.name === "file") {
//       setMailerState((prevState) => ({
//         ...prevState,
//         [e.target.name]: e.target.files[0],
//       }));
//     } else {
//       setMailerState((prevState) => ({
//         ...prevState,
//         [e.target.name]: e.target.value,
//       }));
//     }
//   }

//   async function handleMail() {


//     const subject = `DPSOH & ITMS -Portfolio Holding Report - Missing Location Id's`;
//     const message = `Dear Sir/Madam,

// Please find attachment to update DPSOH location Id's which is not showing in DPSOH , but in ITMS Portfolio Holding Report file it is exist.

// Please do the needful as your earliest.

// Regards

// For Exclusive Securities Cons.LLP. Indore

// Umesh G Das`;

//     // Create a Set to store unique combinations of ucc and isin
//     const uniqueRecords = new Set();

//     records.forEach(record => {
//       const combination = `${record.ucc} - ${record.location} - ${record.isin} - ${record.symbol}`;
//       uniqueRecords.add(combination);
//     });

//     // Check if uniqueRecords is populated correctly
//     if (uniqueRecords.size === 0) {
//       alert("No unique records found.");
//       return;
//     }

//     // Create the text file content
//     const textContent = Array.from(uniqueRecords).join('\n');

//     // Log the text content for debugging
//     // console.log("Text Content for File:", textContent);

//     // Create a Blob from the text content
//     const textBlob = new Blob([textContent], { type: 'text/plain' });
//     const textFile = new File([textBlob], 'DP_AND_ITMS_PORTFOLIO_DIFFERENCE.txt', { type: 'text/plain' }); // Ensure .txt extension

//     // Update the mailer state to include the text file
//     setMailerState((prevState) => ({
//       ...prevState,
//       name: `All`,
//       subject: subject,
//       recipients: "umeshd@exclusivegroup.co.in , eslbilling@exclusivegroup.co.in",
//       message: message,
//       file: textFile // Set the text file as the only attachment
//     }));

//     // Create a download URL for the Blob (for local download)
//     const url = URL.createObjectURL(textBlob);
//     setDownloadUrl(url);
//   }

//   const submitEmail = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Set loading to true before sending email

//     const formData = new FormData();
//     formData.append("name", mailerState.name);
//     formData.append("subject", mailerState.subject);
//     formData.append("recipients", mailerState.recipients);
//     formData.append("message", mailerState.message);
//     formData.append("file", mailerState.file);

//     // Attach the text file if it exists
//     if (mailerState.file) {
//       formData.append("file", mailerState.file); // This will send the text file
//     }

//     try {
//     //   console.log('Sending email with:', {
//     //     name: mailerState.name,
//     //     subject: mailerState.subject,
//     //     recipients: mailerState.recipients,
//     //     message: mailerState.message,
//     //     file: mailerState.file ? mailerState.file.name : 'No file',
//     //   });

//       const response = await fetch("http://183.182.84.228:4005/send", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const resData = await response.json();
//       if (resData.status === "success") {
//         alert("Message Sent");
//       } else if (resData.status === "fail") {
//         alert("Message failed to send");
//       }
//     } catch (error) {
//       console.error("Error sending email:", error);
//       alert("An error occurred while sending email");
//     } finally {
//       setLoading(false); // Set loading to false after email is sent
//     }
//   };

//   return (
//     <div>
//       {!previewMode && (
//         <>
//           <button onClick={handleMail}>Prepare Mail</button>
//           {downloadUrl && (
//             <a href={downloadUrl} download="ucc_isin_data.txt">
//               <button>Download UCC & ISIN Data</button>
//             </a>
//           )}
//           <div className="mail-preview">
//             <div className="App">
//               <form
//                 style={{
//                   display: "flex",
//                   height: "100vh",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//                 onSubmit={submitEmail}
//               >
//                 <fieldset
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     width: "50%",
//                   }}
//                 >
//                   <legend>React NodeMailer Contact Form</legend>
//                   <input
//                     placeholder="Name"
//                     onChange={handleStateChange}
//                     name="name"
//                     value={mailerState.name}
//                   />
//                   <input
//                     placeholder="Recipients (comma-separated)"
//                     onChange={handleStateChange}
//                     name="recipients"
//                     value={mailerState.recipients}
//                   />
//                   <textarea
//                     style={{ minHeight: "200px" }}
//                     placeholder="Message"
//                     onChange={handleStateChange}
//                     name="message"
//                     value={mailerState.message}
//                   />
//                   <label>
//                     Attached File:
//                     {mailerState.file ? mailerState.file.name : "No file attached"}
//                   </label>
//                   <button type="submit" disabled={loading}>
//                     {loading ? "Sending..." : "Send Message"}
//                   </button>
//                 </fieldset>
//               </form>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

























import React, { useEffect, useState, useRef } from "react";

export default function PortDiff() {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [uccCounts, setUccCounts] = useState([]);
  const [textFile1, setTextFile1] = useState(null); // For file without UCC counts
  const [textFile2, setTextFile2] = useState(null); // For file with UCC counts
  const [mailerState, setMailerState] = useState({
    name: "",
    subject: "",
    recipients: "",
    message: "",
    file: [],
  });

  useEffect(() => {
    async function getRecords() {
      setLoading(true);
      try {
        const response = await fetch(`http://183.182.84.228:4005/porteq/`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          setLoading(false);
          return;
        }
        const records = await response.json();
        const filteredData = records.filter(
          (record) =>
            record.comparison_result === "Difference" &&
            record.total_qty == 0 &&
            record.dpid === "IN300214"
        );
        setRecords(filteredData);
      } catch (error) {
        const message = `An error occurred: ${error.message}`;
        window.alert(message);
      } finally {
        setLoading(false);
      }
    }

    async function getUccCounts() {
      try {
        const response = await fetch(`http://183.182.84.228:4005/ucccounts/`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
        const uccCountsData = await response.json();
        const filteredData = uccCountsData.filter((record) => record.ucc_count === 0);
        setUccCounts(filteredData);
      } catch (error) {
        const message = `An error occurred: ${error.message}`;
        window.alert(message);
      }
    }

    getRecords();
    getUccCounts();
  }, []);

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

  async function handleMail() {
    const subject = `DPSOH & ITMS - Portfolio Holding Report - Missing Location Id's`;
    const message = `Dear Sir/Madam,

Please find attachment to update DPSOH location Id's which is not showing in DPSOH , but in ITMS Portfolio Holding Report file it is exist.

Please do the needful as your earliest.

Regards

For Exclusive Securities Cons.LLP. Indore

Umesh G Das`;

const uccsWithCounts = new Set(uccCounts.map((uccCount) => uccCount.ucc)); // Set of UCCs from uccCounts

const uniqueRecordsWithoutMatchingUcc = new Set();
records.forEach((record) => {
  // Check if the record's UCC is not in the uccCounts
  if (!uccsWithCounts.has(record.ucc)) {
    const combination = `${record.ucc} - ${record.location} - ${record.isin} - ${record.symbol}`;
    uniqueRecordsWithoutMatchingUcc.add(combination);
  }
});

const textContent1 = Array.from(uniqueRecordsWithoutMatchingUcc).join("\n");
const textBlob1 = new Blob([textContent1], { type: "text/plain" });
setTextFile1(textBlob1);


    const uniqueRecordsWithUccCounts = new Set();
    records.forEach((record) => {
      const matchUccCounts = uccCounts.find(
        (uccCount) => uccCount.ucc === record.ucc
      );
      if (matchUccCounts) {
        const combination = `${record.ucc} - ${record.location} - ${record.isin} - ${record.symbol}`;
        uniqueRecordsWithUccCounts.add(combination);
      }
    });

    const textContent2 = Array.from(uniqueRecordsWithUccCounts).join("\n");
    const textBlob2 = new Blob([textContent2], { type: "text/plain" });
    setTextFile2(textBlob2);

    setMailerState((prevState) => ({
      ...prevState,
      name: "All",
      subject: subject,
      recipients:
        "umeshd@exclusivegroup.co.in , eslbilling@exclusivegroup.co.in",
      message: message,
      file: [
        new File([textBlob1], "DP_AND_ITMS_PORTFOLIO_DIFFERENCE_ucc_with_isin.txt"),
        new File([textBlob2], "DP_AND_ITMS_PORTFOLIO_DIFFERENCE_ucc_without_isin.txt"),
      ],
    }));
  }

  const submitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", mailerState.name);
    formData.append("subject", mailerState.subject);
    formData.append("recipients", mailerState.recipients);
    formData.append("message", mailerState.message);

    mailerState.file.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await fetch("http://183.182.84.228:4005/multsend", {
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
      setLoading(false);
    }
  };

  const downloadFile = (fileBlob, fileName) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(fileBlob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div>
      <button onClick={handleMail}>Prepare Mail</button>
      <button
        onClick={() => downloadFile(textFile1, "DP_AND_ITMS_PORTFOLIO_DIFFERENCE_no_ucc_counts.txt")}
        disabled={!textFile1}
      >
        Download Without UCC Counts
      </button>
      <button
        onClick={() => downloadFile(textFile2, "DP_AND_ITMS_PORTFOLIO_DIFFERENCE_with_ucc_counts.txt")}
        disabled={!textFile2}
      >
        Download With UCC Counts
      </button>
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
                name="name"
                value={mailerState.name}
                readOnly
              />
              <input
                placeholder="Recipients"
                name="recipients"
                value={mailerState.recipients}
                readOnly
              />
              <textarea
                style={{ minHeight: "200px" }}
                placeholder="Message"
                name="message"
                value={mailerState.message}
                readOnly
              />
              <label>
                Attached Files:
                {mailerState.file.map((file) => file.name).join(", ")}
              </label>
              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}
