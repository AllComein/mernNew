

import React, { useEffect, useState } from 'react';
import authService from '../../services/auth.service';

function BulkDormacy() {
  const [records, setRecords] = useState([]);
  const [userRecords, setUserRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getRecords() {
      setLoading(true); // Set loading to true before fetch
      try {
        const response = await fetch('http://183.182.84.228:4005/letter/');

        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          setLoading(false); // Set loading to false after fetch
          return;
        }

        const records = await response.json();
        
        // Filter records to exclude those with 'P' in the 4th position of ks_panno
        const filteredRecords = records.filter(record => record.ks_krarem && record.ks_krarem.includes('Dormant'));
       
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

  async function sendEmail(record) {
    try {
      // Check if record's kslucc is in userRecords
      if (userRecords.some(userRecord => userRecord.kslucc === record.kslucc)) {
        return { success: false, message: `Record with kslucc ${record.kslucc} already exists in user records.` };
      }

      // Prepare UCC details to be sent to backend
      const currentUser = authService.getCurrentUser();
      const uccDetail = {
        username: currentUser.username,
        name: record.clname,
        panno: record.ks_panno,
        kslucc: record.kslucc,
        dpId: record.ksdp_boid,
        incomeRange: '5 to 10 lacs',
        mailid: record.ks_emailid,
      };

      // Send UCC detail to backend
      const response = await fetch('http://183.182.84.228:4005/sends', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uccDetail })
      });

      const result = await response.json();
    //   console.log('Result:', result);

      if (!response.ok) {
        return { success: false, message: result.message };
      } else {
        return { success: true, message: `Successfully sent email for UCC ${record.ucc}` };
      }

    } catch (error) {
      return { success: false, message: `An error occurred while sending email: ${error.message}` };
    }
  }

  async function sendEmails() {
    setLoading(true); // Set loading to true before sending emails
    let successCount = 0;
    let failCount = 0;

    for (const record of records) {
      const result = await sendEmail(record);
      if (result.success) {
        successCount++;
      } else {
        failCount++;
      }
    }

    setLoading(false); // Set loading to false after sending emails

    // Show an alert with the success and failure counts
    window.alert(`Successfully processed emails. Success: ${successCount}, Fail: ${failCount}`);
  }

  const filteredRecords = records.filter(record => !userRecords.some(userRecord => userRecord.kslucc === record.kslucc));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Records</h1>
      <button onClick={sendEmails}>Send Emails</button>
      <ul>
        {filteredRecords.map(record => (
          <li key={record.id}>{record.clname} - {record.ks_panno} - {record.kslucc}</li>
        ))}
      </ul>
    </div>
  );
}

export default BulkDormacy;
