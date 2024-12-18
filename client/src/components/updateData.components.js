// import React, { useEffect, useRef } from 'react';

// const UpdatedComponent = () => {
//     const buttonRef = useRef(null);

//     useEffect(() => {
//         const now = new Date();
//         const desiredTime = new Date(now);
//         desiredTime.setHours(9, 5, 0, 0); // Set to 9:00 AM

//         if (now.getHours() === 9 && now.getMinutes() === 5) {
//             // If the current time is exactly 9:00 AM, execute the batch file immediately
//             buttonRef.current?.click();
//         } else {
//             let timeDifference = desiredTime - now;
//             if (timeDifference < 0) {
//                 // If the current time is past 9:00 AM, set the timer for the next day at 9:00 AM
//                 desiredTime.setDate(desiredTime.getDate() + 1);
//                 timeDifference = desiredTime - now;
//             }

//             const timerId = setTimeout(() => {
//                 buttonRef.current?.click(); // Trigger the button click
//             }, timeDifference);

//             // Cleanup the timer if the component unmounts
//             return () => clearTimeout(timerId);
//         }
//     }, []);

//     // useEffect(() => {
//     //     const now = new Date();
//     //     const desiredTime = new Date(now);
//     //     desiredTime.setHours(16, 30, 0, 0); // Set to 4:30 PM

//     //     if (now.getHours() === 16 && now.getMinutes() === 30) {
//     //         // If the current time is exactly 4:30 PM, execute the batch file immediately
//     //         buttonRef.current?.click();
//     //     } else {
//     //         let timeDifference = desiredTime - now;
//     //         if (timeDifference < 0) {
//     //             // If the current time is past 4:30 PM, set the timer for the next day at 4:30 PM
//     //             desiredTime.setDate(desiredTime.getDate() + 1);
//     //             timeDifference = desiredTime - now;
//     //         }

//     //         const timerId = setTimeout(() => {
//     //             buttonRef.current?.click(); // Trigger the button click
//     //         }, timeDifference);

//     //         // Cleanup the timer if the component unmounts
//     //         return () => clearTimeout(timerId);
//     //     }
//     // }, []);

//     const openBatchFile = async () => {
//         try {
//             const response = await fetch('http://183.182.84.228:4005/openapp/');
//             if (response.ok) {
//                 const result = await response.text();
//                 console.log(result);
//             } else {
//                 console.error('Failed to open batch file');
//             }
//         } catch (error) {
//             console.error('Error opening batch file:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>My React App</h1>
//             <button ref={buttonRef} onClick={openBatchFile}>
//                 Open App
//             </button>
//         </div>
//     );
// };

// export default UpdatedComponent;









// import React, { useEffect, useRef, useState } from 'react';

// const UpdatedData = () => {
//     const buttonRef = useRef(null);
//     const [clickCount, setClickCount] = useState(0);
//     const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

//     // useEffect(() => {
//     //     const checkAndRunBatchFile = () => {
//     //         fetch('http://183.182.84.228:4005/check-and-run', {
//     //             method: 'POST',
//     //         })
//     //         .then(response => response.json())
//     //         .then(data => {
//     //             console.log(data.message);
//     //             if (data.status === "success") {
//     //                 setClickCount(prevCount => prevCount + 1);
//     //                 setCurrentDate(new Date().toLocaleDateString());
//     //             }
//     //         })
//     //         .catch(error => console.error('Error:', error));
//     //     };

//     //     // Call the function immediately to check the date and potentially run the batch file
//     //     checkAndRunBatchFile();
//     // }, []);

//     const openBatchFile = async () => {
//         try {
//             const response = await fetch('http://183.182.84.228:4005/run-batch', {
//                 method: 'POST',
//             });
//             if (response.ok) {
//                 const result = await response.json();
//                 console.log(result.message);
//                 setClickCount(prevCount => prevCount + 1);
//                 setCurrentDate(new Date().toLocaleDateString());
//             } else {
//                 console.error('Failed to open batch file');
//             }
//         } catch (error) {
//             console.error('Error opening batch file:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>My React App</h1>
//             <button ref={buttonRef} onClick={openBatchFile}>
//                 Update Data
//             </button>
//             <div>
//                 <p>Today's Date: {currentDate}</p>
//                 <p>Number of times the button clicked: {clickCount}</p>
//             </div>
//         </div>
//     );
// };

// export default UpdatedData;

import React, { useRef, useState } from 'react';

const UpdatedData = () => {
    const buttonRef = useRef(null);
    const [clickCount, setClickCount] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const openBatchFile = async () => {
        alert('Batch file is being executed. Please wait 5 minutes before clicking again.');
        setIsButtonDisabled(true);
        setTimeout(() => setIsButtonDisabled(false), 300000); // Disable button for 5 minutes

        try {
            const response = await fetch('http://183.182.84.228:4005/run-batch', {
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
        }
    };

    return (
        <div>
            <h1>My React App</h1>
            <button ref={buttonRef} onClick={openBatchFile} disabled={isButtonDisabled}>
            {isButtonDisabled ? 'Please wait...' : 'Update Data'}
            </button>
            <div>
                <p>Today's Date: {currentDate}</p>
                <p>Number of times the button clicked: {clickCount}</p>
            </div>
        </div>
    );
};

export default UpdatedData;
