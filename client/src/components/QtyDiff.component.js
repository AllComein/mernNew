import React, { useEffect, useState, useRef } from 'react';
import * as XLSX from 'xlsx'; // Import XLSX for Excel generation

const QtyDiffData = () => {
    const buttonRef = useRef(null);
    const [clickCount, setClickCount] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false); // State to control the modal visibility
    const [records, setRecords] = useState([]); // State to store fetched records
    const [loading, setLoading] = useState(false); // State to show loading status
    const [initialFetchComplete, setInitialFetchComplete] = useState(false); // Track if initial fetch is complete

    useEffect(() => {
        async function getRecords() {
            try {
                setLoading(true); // Show loading indicator
                const response = await fetch('http://183.182.84.228:4005/qtydiff/');
                if (!response.ok) {
                    const message = `An error occurred: ${response.statusText}`;
                    window.alert(message);
                    return;
                }
                const records = await response.json();
                setRecords(records); // Update state with fetched records
                setInitialFetchComplete(true);
            } finally {
                setLoading(false); // Stop loading indicator after fetch
            }
        }

        if (!initialFetchComplete) {
            getRecords(); // Fetch records only once during initial render
        }

        const handleKeyPress = (e) => {
            console.log(`Key pressed: ${e.key}`);
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [initialFetchComplete]);

    const openBatchFile = async () => {
        setIsButtonDisabled(true);
        setIsDownloading(true); // Show modal

        setTimeout(() => setIsButtonDisabled(false), 300000); // Disable button for 5 minutes

        try {
            const response = await fetch('http://183.182.84.228:4005/run-kslpf', {
                method: 'POST',
            });
            if (response.ok) {
                const result = await response.json();
                // console.log(result.message);
                setClickCount(prevCount => prevCount + 1);
                setCurrentDate(new Date().toLocaleDateString());
            } else {
                console.error('Failed to open batch file');
            }
        } catch (error) {
            console.error('Error opening batch file:', error);
        } finally {
            setIsDownloading(false); // Hide modal
            window.location.reload(); // Refresh the page after the batch file completes
        }
    };

    const openBatchFile1 = async () => {
        setIsButtonDisabled(true);
        setIsDownloading(true); // Show modal

        setTimeout(() => setIsButtonDisabled(false), 300000); // Disable button for 5 minutes

        try {
            const response = await fetch('http://183.182.84.228:4005/run-remove', {
                method: 'POST',
            });
            if (response.ok) {
                const result = await response.json();
                // console.log(result.message);
                setClickCount(prevCount => prevCount + 1);
                setCurrentDate(new Date().toLocaleDateString());
            } else {
                console.error('Failed to open batch file');
            }
        } catch (error) {
            console.error('Error opening batch file:', error);
        } finally {
            setIsDownloading(false); // Hide modal
            window.location.reload(); // Refresh the page after the batch file completes
        }
    };

    const downloadadddata = async () => {
        try {
            const response = await fetch("http://183.182.84.228:4005/kslpf/");
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }
    
            const letterData = await response.json();
    
            // Check if the data is an array
            if (!Array.isArray(letterData)) {
                throw new Error('The fetched data is not an array');
            }
    
            // Get KUCC values where qty_match is 'No Match'
            const excludedKUCCs = new Set(records
                .filter(record => record.qty_match.startsWith('No'))
                .map(record => record.KUCC)
            );
    
            // Filter letterData to exclude records with KUCC in excludedKUCCs
            const filteredData = letterData.filter(record => !excludedKUCCs.has(record.KUCC));
    
            // Define CSV headers and rows
            const headers = ["DPNAME","Bill_Date","Subtranno","Tran_type","Sett_No","commonscripcode","deliv_qty","tran_rate","Amount"];
            const rows = filteredData.map((record) => [
                record.KUCC,
                record.DATE,
                record.Subtranno,
                record.Tran_type,
                record.Sett_No,
                record.SCRIPTNAME,
                record.QTY,
                record.RATE,
                record.AMMOUNT,
            ]);
    
            // Combine headers and rows into CSV format
            const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    
            // Create a blob from the CSV content and download it
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
    
            const link = document.createElement('a');
            link.href = url;
            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
            link.setAttribute('download', `ADDDATA_${formattedDate}.csv`);
    
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error during data download:', error);
            alert('An error occurred while downloading the data. Please try again.');
        }
    };


    const downloadremovedata = async () => {
        try {
            const response = await fetch("http://183.182.84.228:4005/removedboss/");
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }
    
            const letterData = await response.json();
    
            // Check if the data is an array
            if (!Array.isArray(letterData)) {
                throw new Error('The fetched data is not an array');
            }
    
            // Get KUCC values where qty_match starts with 'No Match' and exclude them
            const excludedKUCCs = new Set(records
                .filter(record => record.qty_match.startsWith('No Match'))
                .map(record => record.KUCC)
            );
    
            // Filter letterData to exclude records where DPNAME is in excludedKUCCs
            // and DPNAME matches KUCC in records
            const filteredData = letterData.filter(record => 
                !excludedKUCCs.has(record.DPNAME) && 
                records.some(r => r.KUCC === record.DPNAME)
            );
    
            // Define CSV headers and rows
            const headers = ["DPNAME", "Bill_Date", "Subtranno", "Tran_type", "Sett_No", "commonscripcode", "deliv_qty", "tran_rate", "Amount"];
            const rows = filteredData.map((record) => [
                record.DPNAME,
                record.Bill_Date,
                record.Subtranno,
                record.Tran_type,
                record.Sett_No,
                record.commonscripcode,
                record.deliv_qty,
                record.tran_rate,
                record.Amount,
            ]);
    
            // Combine headers and rows into CSV format
            const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    
            // Create a blob from the CSV content and download it
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
    
            const link = document.createElement('a');
            link.href = url;
            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
            link.setAttribute('download', `REMOVEDATA_${formattedDate}.csv`);
    
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error during data download:', error);
            alert('An error occurred while downloading the data. Please try again.');
        }
    };
    






    const downloaddpname = async () => {
        try {
            const response = await fetch("http://183.182.84.228:4005/kslpf/");
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }
    
            const letterData = await response.json();
    
            // Check if the data is an array
            if (!Array.isArray(letterData)) {
                throw new Error('The fetched data is not an array');
            }
    
            // Get KUCC values where qty_match is 'No Match'
            const excludedKUCCs = new Set(records
                .filter(record => record.qty_match.startsWith('No'))
                .map(record => record.KUCC)
            );
    
            // Filter letterData to exclude records with KUCC in excludedKUCCs
            const filteredData = letterData.filter(record => !excludedKUCCs.has(record.KUCC));

            const uniqueRecords = filteredData.filter((record, index, self) =>
                index === self.findIndex((r) => r.KUCC === record.KUCC )
            );
    
            // Define CSV headers and rows
            const headers = ["DPNAME"];
            const rows = uniqueRecords.map((record) => [
                record.KUCC,
            ]);
    
            // Combine headers and rows into CSV format
            const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    
            // Create a blob from the CSV content and download it
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
    
            const link = document.createElement('a');
            link.href = url;
            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
            link.setAttribute('download', `DPNAME_${formattedDate}.csv`);
    
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error during data download:', error);
            alert('An error occurred while downloading the data. Please try again.');
        }
    };





    const downloadnomatch = async () => {
        // Use the already filtered records stored in the state
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;


 // Get KUCC values where qty_match starts with 'No Match' and exclude them
 const excludedKUCCs = new Set(records
    .filter(record => record.qty_match.startsWith('No Match'))
    .map(record => record.KUCC)
);

// Filter letterData to exclude records where DPNAME is in excludedKUCCs
// and DPNAME matches KUCC in records
const filteredData = records.filter(record => 
    excludedKUCCs.has(record.KUCC) && 
    records.some(r => r.KUCC === record.KUCC)
);

    
        // Filter out duplicate KUCC records
        const uniqueRecords = records.filter(record => record.qty_match.startsWith('No'))
    
        // Prepare the data
        const data = [
            ["S.No.", "KUCC","isin","script name","kslpf_qty"	,"removedboss_qty"	,"qty_match"],
            ...filteredData.map((record, index) => [
                index + 1,
                record.KUCC,
                record.isin,
                record.scriptname,
                record.kslpf_qty,
                record.removedboss_qty,
                record.qty_match
            ])
        ];
    
        // Create a new worksheet and convert it to CSV
        const ws = XLSX.utils.aoa_to_sheet(data);
        const csvContent = XLSX.utils.sheet_to_csv(ws);
    
        // Create a download link for the CSV
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute("download", `Difference_${formattedDate}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
























    const downloaddiffadddata = async () => {
        try {
            const response = await fetch("http://183.182.84.228:4005/kslpf/");
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }
    
            const letterData = await response.json();
    
            // Check if the data is an array
            if (!Array.isArray(letterData)) {
                throw new Error('The fetched data is not an array');
            }
    
            // Get KUCC values where qty_match is 'No Match'
            const excludedKUCCs = new Set(records
                .filter(record => record.qty_match.startsWith('No'))
                .map(record => record.KUCC)
            );
    
            // Filter letterData to exclude records with KUCC in excludedKUCCs
            const filteredData = letterData.filter(record => excludedKUCCs.has(record.KUCC));
    
            // Define CSV headers and rows
            const headers = ["DPNAME","Bill_Date","Subtranno","Tran_type","Sett_No","commonscripcode","deliv_qty","tran_rate","Amount"];
            const rows = filteredData.map((record) => [
                record.KUCC,
                record.DATE,
                record.Subtranno,
                record.Tran_type,
                record.Sett_No,
                record.SCRIPTNAME,
                record.QTY,
                record.RATE,
                record.AMMOUNT,
            ]);
    
            // Combine headers and rows into CSV format
            const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    
            // Create a blob from the CSV content and download it
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
    
            const link = document.createElement('a');
            link.href = url;
            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
            link.setAttribute('download', `DIFFADDDATA_${formattedDate}.csv`);
    
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error during data download:', error);
            alert('An error occurred while downloading the data. Please try again.');
        }
    };


    const downloaddiffremovedata = async () => {
        try {
            const response = await fetch("http://183.182.84.228:4005/removedboss/");
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }
    
            const letterData = await response.json();
    
            // Check if the data is an array
            if (!Array.isArray(letterData)) {
                throw new Error('The fetched data is not an array');
            }
    
            // Get KUCC values where qty_match starts with 'No Match' and exclude them
            const excludedKUCCs = new Set(records
                .filter(record => record.qty_match.startsWith('No Match'))
                .map(record => record.KUCC)
            );
    
            // Filter letterData to exclude records where DPNAME is in excludedKUCCs
            // and DPNAME matches KUCC in records
            const filteredData = letterData.filter(record => 
                excludedKUCCs.has(record.DPNAME) && 
                records.some(r => r.KUCC === record.DPNAME)
            );
    
            // Define CSV headers and rows
            const headers = ["DPNAME", "Bill_Date", "Subtranno", "Tran_type", "Sett_No", "commonscripcode", "deliv_qty", "tran_rate", "Amount"];
            const rows = filteredData.map((record) => [
                record.DPNAME,
                record.Bill_Date,
                record.Subtranno,
                record.Tran_type,
                record.Sett_No,
                record.commonscripcode,
                record.deliv_qty,
                record.tran_rate,
                record.Amount,
            ]);
    
            // Combine headers and rows into CSV format
            const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    
            // Create a blob from the CSV content and download it
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
    
            const link = document.createElement('a');
            link.href = url;
            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
            link.setAttribute('download', `DIFFREMOVEDATA_${formattedDate}.csv`);
    
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error during data download:', error);
            alert('An error occurred while downloading the data. Please try again.');
        }
    };
    






    const downloaddiffdpname = async () => {
        try {
            const response = await fetch("http://183.182.84.228:4005/kslpf/");
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }
    
            const letterData = await response.json();
    
            // Check if the data is an array
            if (!Array.isArray(letterData)) {
                throw new Error('The fetched data is not an array');
            }
    
            // Get KUCC values where qty_match is 'No Match'
            const excludedKUCCs = new Set(records
                .filter(record => record.qty_match.startsWith('No'))
                .map(record => record.KUCC)
            );
    
            // Filter letterData to exclude records with KUCC in excludedKUCCs
            const filteredData = letterData.filter(record => excludedKUCCs.has(record.KUCC));

            const uniqueRecords = filteredData.filter((record, index, self) =>
                index === self.findIndex((r) => r.KUCC === record.KUCC )
            );
    
            // Define CSV headers and rows
            const headers = ["DPNAME"];
            const rows = uniqueRecords.map((record) => [
                record.KUCC,
            ]);
    
            // Combine headers and rows into CSV format
            const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    
            // Create a blob from the CSV content and download it
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
    
            const link = document.createElement('a');
            link.href = url;
            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
            link.setAttribute('download', `DIFFDPNAME_${formattedDate}.csv`);
    
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error during data download:', error);
            alert('An error occurred while downloading the data. Please try again.');
        }
    };




















    



    
    
    
    
    return (
        <div>
            <h1>My React App</h1>
            <button ref={buttonRef} onClick={openBatchFile} disabled={isButtonDisabled}>
                {isButtonDisabled ? 'Please wait...' : 'Update KOTAK_PF.csv Data'}
            </button>

            {/* <button ref={buttonRef} onClick={openBatchFile1} disabled={isButtonDisabled}>
                {isButtonDisabled ? 'Please wait...' : 'Update KSLPF Data'}
            </button> */}

            <button onClick={downloadadddata}>
                Download ADD Data
            </button>

            <button onClick={downloadremovedata}>
                Download REMOVE Data
            </button>

            <button onClick={downloaddpname}>
                Download DPName Data
            </button>

            <button onClick={downloadnomatch}>
                Download NoMatch Data
            </button>

            <button onClick={downloaddiffadddata}>
                Download Difference ADD Data
            </button>

            <button onClick={downloaddiffremovedata}>
                Download Difference REMOVE Data
            </button>

            <button onClick={downloaddiffdpname}>
                Download Difference DPName Data
            </button>

            <div>
                <p>Today's Date: {currentDate}</p>
                <p>Number of times the button clicked: {clickCount}</p>
            </div>

            {/* Table showing the records */}
            {loading ? (
                <p>Loading records...</p> // Show loading text while fetching
            ) : (
                <table border="1" style={{ marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>KUCC</th>
                            <th>isin</th>
                            <th>Script Name</th>
                            <th>kslpf_qty</th>
                            <th>removedboss_qty</th>
                            <th>qty_match</th>
                        </tr>
                    </thead>
                    <tbody>
    {records.length > 0 ? (
        records
            .filter(record => record.qty_match.startsWith('No'))
            .map((record) => (
                <tr key={record.id}>
                    <td>{record.KUCC}</td>
                    <td>{record.isin}</td>
                    <td>{record.scriptname}</td>
                    <td>{record.kslpf_qty}</td>
                    <td>{record.removedboss_qty}</td>
                    <td>{record.qty_match}</td>
                </tr>
            ))
    ) : (
        <tr>
            <td colSpan="5">No records found.</td>
        </tr>
    )}
</tbody>

                </table>
            )}

            {/* Modal for download */}
            {isDownloading && (
                <div id="downloadModal" style={{
                    display: 'block', 
                    position: 'fixed', 
                    zIndex: 9999, 
                    left: 0, 
                    top: 0, 
                    width: '100%', 
                    height: '100%', 
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}>
                    <div style={{ 
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        backgroundColor: 'white', 
                        padding: '20px', 
                        borderRadius: '8px', 
                        textAlign: 'center', 
                        fontSize: '18px'
                    }}>
                        <p>Updating... Please wait.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QtyDiffData;