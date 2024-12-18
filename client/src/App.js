// import React, { Component } from "react";
// import { Routes, Route, Link, Navigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

// import AuthService from "./services/auth.service";

// import Login from "./components/login.component";
// import Register from "./components/register.component";
// import Home from "./components/home.component";
// import Profile from "./components/profile.component";
// import BoardUser from "./components/board-user.component";
// import BoardModerator from "./components/board-moderator.component";
// import BoardAdmin from "./components/board-admin.component";
// import BoardSubModerator from "./components/board-sub-moderator.component";

// // import AuthVerify from "./common/auth-verify";
// import EventBus from "./common/EventBus";
// import ChangePasswordComponent from "./components/ChangePassword.component";
// import BoardSubAdmin from "./components/board-sub-admin.component";





// import RecordList from "./components/client/recordList";
// import Letter from "./components/letter/Letter";
// import Letter2 from "./components/letter/Letter2";
// import Diff from './components/diff/diff'
// import Priority from './components/priority/priority'
// import Esign from './components/esign/Esign'
// import BoardDetails from './components/board-detail.component'
// import Extra from './components/complete/extra'




// import Extras from "./components/client/board-record.component";
// import Diffs from './components/diff/diff.component'
// import Prioritys from './components/priority/priority.component'
// import Esigns from './components/esign/esign.component'

// import Letters from './components/letter/letter.component'
// import Letters2 from'./components/letter/letter2.component'
// import BoardMtf from "./components/mtf.component";
// import BoardLiqus from "./components/liqus.component";
// import BoardMtfs from "./components/mtfs.component";
// import BoardLiqu from "./components/liqu.component";
// import Brokerage from "./components/brokerage.component";
// import BoardSebis from "./components/sebis.component";
// import BoardSebi from "./components/sebi.component";


// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.min.css";
// import ForgotPassword from "./components/ForgotPassword";
// import ResetPassword from "./components/ResetPassword";
// import BoardExtra from "./components/complete/extra.component";
// import BoardRecord from "./components/client/record.component";

// import BoardChanges from './components/board-changedetails.component';



// import Cuspa from './components/cuspa.component';
// import Cuspas from './components/cuspas.component';
// import BoardPtt from "./components/ptt.component";
// import BoardPtts from "./components/ptts.component";



// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.logOut = this.logOut.bind(this);

//     this.state = {
//       showModeratorBoard: false,
//       showSubModeratorBoard: false,
//       showAdminBoard: false,
//       showSubAdminBoard: false,
//       currentUser: undefined,
//       lastActivityTime: Date.now(),
//     };
//     this.handleActivity = this.handleActivity.bind(this);
//     this.startTimeout = this.startTimeout.bind(this);
//   }

//   componentDidMount() {
//     const user = AuthService.getCurrentUser();
  
//     if (user) {
//       // If user is logged in, set the currentUser state and check roles
//       this.setState({
//         currentUser: user,
//         showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
//         showSubModeratorBoard: user.roles.includes("ROLE_SUB_MODERATOR"),
//         showAdminBoard: user.roles.includes("ROLE_ADMIN"),
//         showSubAdminBoard: user.roles.includes("ROLE_Sub_ADMIN"),
//       });
//     } else {
//       // If user is not logged in, log them out and reset state
//       this.logOut();
//     }
    
//     EventBus.on("logout", () => {
//       this.logOut();
//     });
    
//     // Attach event listeners for user activity
//     window.addEventListener("mousemove", this.handleActivity);
//     window.addEventListener("keydown", this.handleActivity);

//     // Start the timeout check
//     this.startTimeout();
//   }
  

//   componentWillUnmount() {
//     EventBus.remove("logout");
    
//     // Remove event listeners when component unmounts
//     window.removeEventListener("mousemove", this.handleActivity);
//     window.removeEventListener("keydown", this.handleActivity);

//     // Clear the timeout when component unmounts
//     clearTimeout(this.timeout);
//   }

//   // Method to handle user activity
//   handleActivity() {
//     // Update last activity time to the current time
//     this.setState({ lastActivityTime: Date.now() });
//   }

//   // Method to start the timeout check
//   startTimeout() {
//     this.timeout = setTimeout(() => {
//       // Timeout reached, logout the user
//       this.logOut();
//     }, 15 * 60 * 1000); // 15 minutes in milliseconds
//   }

//   logOut() {
//     clearTimeout(this.timeout);
//     AuthService.logout();
//     this.setState({
//       lastActivityTime: Date.now(),
//       showModeratorBoard: false,
//       showSubModeratorBoard: false,
//       showAdminBoard: false,
//       showSubAdminBoard: false,
//       currentUser: undefined,
//     });
    
//     // Redirect to the login page
//     // return <link to="/login" />;
//   }
  

//   render() {
//     const { currentUser, showModeratorBoard, showAdminBoard, showSubModeratorBoard, showSubAdminBoard } = this.state;

//     return (
//       <div>
//         <nav className="navbar navbar-expand navbar-dark bg-dark">
//           <Link to={"/"} className="navbar-brand">
//             <button class="button" data-text="Awesome">
//               <span class="actual-text">&nbsp;Exclusive Securities&nbsp;</span>
//               <span aria-hidden="true" class="hover-text">&nbsp;Exclusive Securities&nbsp;</span>
//             </button>
//           </Link>
//           <div className="navbar-nav mr-auto">
//             {/* <li className="nav-item">
//               <Link to={"/home"} className="nav-link">
//                 Home
//               </Link>
//             </li> */}

//             {showModeratorBoard && (
//               // <li className="nav-item">
//               //   <Link to={"/submod"} className="nav-link">
//               //     Moderator Board
//               //   </Link>
//               // </li>
//               <div className="navbar-nav ml-auto">
//               {/* <li className="nav-item">
//                 <Link to={"/subadmin"} className="nav-link">
//                   Sub Admin Board
//                 </Link>
//               </li> */}
//               <li className="nav-item">
//                 <Link to={"/extra"} className="nav-link">
//                   Client Information
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to={"/closer"} className="nav-link">
//                   Closer Info
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to={"/letter"} className="nav-link">
//                   AL Individual
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to={"/letter1"} className="nav-link">
//                   AL Non-Individual
//                 </Link>
//               </li>
//               {/* <li className="nav-item">
//                 <Link to={"/diff"} className="nav-link">
//                   Esl Kotak Difference
//                 </Link>
//               </li> */}
//               <li className="nav-item">
//                 <Link to={"/priority"} className="nav-link">
//                   Priority
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to={"/esign"} className="nav-link">
//                   E-sign
//                 </Link>
//               </li>
//               <li className="nav-item">
//               <Link to={"/mtfs"} className="nav-link">
//               Pending Pledgor
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/liqu"} className="nav-link">
//               Pending Liquidation
//               </Link>
//             </li>
//             <li className="nav-item">
//                 <a href="/brok" className="nav-link" >
//                   Brokerage
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a href="/sebi" className="nav-link" >
//                   Sebi Payout
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a href="/cuspas" className="nav-link" >
//                   CUSPA
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a href="/ptt" className="nav-link" >
//                 KRA Permitted To Trade (Pending)
//                 </a>
//               </li>
//               </div>
//             )}

//             {showSubModeratorBoard && (
//               <div className="navbar-nav ml-auto">
//               <li className="nav-item">
//                 <Link to={"/mod"} className="nav-link">
//                   Client Information
//                 </Link>
//               </li>
//               <li className="nav-item">
//               <Link to={"/extras"} className="nav-link">
//                Closer Info
//               </Link>
//             </li>
//             {/* <li className="nav-item">
//               <Link to={"/diffs"} className="nav-link">
//                ESL KSL Difference
//               </Link>
//             </li> */}
//             <li className="nav-item">
//               <Link to={"/prios"} className="nav-link">
//                Priority
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/esigns"} className="nav-link">
//               Esign
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/lett"} className="nav-link">
//               AL Individual
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/lett1"} className="nav-link">
//               AL Non-Individual
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/mtf"} className="nav-link">
//               Pending Pledgor
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/liqus"} className="nav-link">
//               Pending Liquidation
//               </Link>
//             </li>
//             <li className="nav-item">
//                 <a href="/brok" className="nav-link" >
//                   Brokerage
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a href="/sebis" className="nav-link" >
//                   Sebi Payout
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a href="/cuspas" className="nav-link" >
//                   CUSPA
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a href="/ptts" className="nav-link" >
//                 KRA Permitted To Trade (Pending)
//                 </a>
//               </li>
// </div>
//             )}

//             {showAdminBoard && (
              
//               <div className="navbar-nav ml-auto">
//                 <li className="nav-item">
//                 <Link to={"/admin"} className="nav-link">
//                   Admin Board
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to={"/register"} className="nav-link">
//                   Add Users
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to={"/extra"} className="nav-link">
//                 Client Information
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to={"/closer"} className="nav-link">
//                   Closer Info
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to={"/letter"} className="nav-link">
//                   AL Individual
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to={"/letter1"} className="nav-link">
//                   AL Non-Individual
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to={"/diff"} className="nav-link">
//                   Esl Kotak Difference
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to={"/priority"} className="nav-link">
//                   Priority
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to={"/esign"} className="nav-link">
//                   E-sign
//                 </Link>
//               </li>
//               <li className="nav-item">
//               <Link to={"/mtfs"} className="nav-link">
//               Pending Pledgor
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/liqu"} className="nav-link">
//               Pending Liquidation
//               </Link>
//             </li>
//             <li className="nav-item">
//                 <a href="/brok" className="nav-link" >
//                   Brokerage
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a href="/sebi" className="nav-link" >
//                   Sebi Payout
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a href="/changes" className="nav-link" >
//                   Changes
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a href="/cuspa" className="nav-link" >
//                   CUSPA
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a href="/ptt" className="nav-link" >
//                   KRA Permitted To Trade (Pending)
//                 </a>
//               </li>
//               </div>
//             )}

//             {showSubAdminBoard && (
              
//               <div className="navbar-nav ml-auto">
//               <li className="nav-item">
//                 <Link to={"/subadmin"} className="nav-link">
//                   Sub Admin Board
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to={"/extra"} className="nav-link">
//                   Client Information
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to={"/closer"} className="nav-link">
//                   Closer Info
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to={"/letter"} className="nav-link">
//                   AL Individual
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to={"/letter1"} className="nav-link">
//                   AL Non-Individual
//                 </Link>
//               </li>
//               {/* <li className="nav-item">
//                 <Link to={"/diff"} className="nav-link">
//                   Esl Kotak Difference
//                 </Link>
//               </li> */}
//               <li className="nav-item">
//                 <Link to={"/priority"} className="nav-link">
//                   Priority
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to={"/esign"} className="nav-link">
//                   E-sign
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <a href="/brok" className="nav-link" >
//                   Brokerage
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a href="/ptt" className="nav-link" >
//                 KRA Permitted To Trade (Pending)
//                 </a>
//               </li>
//               </div>
//             )}

//             {currentUser && !showSubModeratorBoard && !showAdminBoard && !showModeratorBoard && (
//               <li className="nav-item">
//                 <Link to={"/user"} className="nav-link">
//                   User
//                 </Link>
//               </li>
              
//             )}
//           </div>

//           {currentUser ? (
//             <div className="navbar-nav ml-auto">
//               <li className="nav-item">
//                 <Link to={"/profile"} className="nav-link">
//               {currentUser.username}
              
//               Profile
//                 </Link>
//               </li>
           
              

//               {/* <li className="nav-item">
//                 <a href="/change-password" className="nav-link">
//                   change
//                 </a>
//               </li> */}

//               <li className="nav-item">
//                 <a href="/login" className="nav-link" onClick={this.logOut}>
//                   LogOut
//                 </a>
//               </li>
              
//             </div>
//           ) : (
//               <div className="navbar-nav ml-auto">
//                 <li className="nav-item">
//                   <Link to={"/login"} className="nav-link">
//                     Login
//                   </Link>
//                 </li>

//                 {/* <li className="nav-item">
//                   <Link to={"/register"} className="nav-link">
//                     Sign Up
//                   </Link>
//                 </li> */}
//               </div>
//             )}
//         </nav>
//         <ToastContainer />
//         <div className="container mt-3">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={
//             AuthService.getCurrentUser() ? (
//               <Register />
//             ) : (
//               <Navigate to="/login" />
//             )} />
//             <Route path="/profile" element={
// AuthService.getCurrentUser() ? (
//   <Profile />
//             ) : (
//               <Navigate to="/login" />
//             )} />
//             <Route path="/user" element={
// AuthService.getCurrentUser() ? (
//   <BoardUser />
//             ) : (
//               <Navigate to="/login" />
//             )} />
//             <Route path="/mod" element={
// AuthService.getCurrentUser() ? (
//   <BoardModerator />
//             ) : (
//               <Navigate to="/login" />
//             )} />
//             <Route path="/admin" element={
// AuthService.getCurrentUser() ? (
//   <BoardAdmin />
//             ) : (
//               <Navigate to="/login" />
//             )} />
//             <Route path="/submod" element={
// AuthService.getCurrentUser() ? (
//   <BoardSubModerator/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             <Route path="/change-password" element={
// AuthService.getCurrentUser() ? (
//   <ChangePasswordComponent/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             <Route path="/subadmin" element={
// AuthService.getCurrentUser() ? (
//   <BoardSubAdmin/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             <Route path="/closer" element={
// AuthService.getCurrentUser() ? (
//   <RecordList/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             {/* <Route path="/closer" element={
// AuthService.getCurrentUser() ? (
//               <Register />
//             ) : (
//               <Navigate to="/login" />
//             )<BoardRecord/>}/> */}
//             <Route path="/letter" element={
// AuthService.getCurrentUser() ? (
//   <Letter/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             <Route path="/letter1" element={
// AuthService.getCurrentUser() ? (
//   <Letter2/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             <Route path="/diff" element={
// AuthService.getCurrentUser() ? (
//   <Diff/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             <Route path="/priority" element={
// AuthService.getCurrentUser() ? (
//   <Priority/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             <Route path="/esign" element={
// AuthService.getCurrentUser() ? (
//   <Esign/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             <Route path="/detail" element={
// AuthService.getCurrentUser() ? (
//   <BoardDetails/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             {/* <Route path="/extra" element={
// AuthService.getCurrentUser() ? (
//               <Register />
//             ) : (
//               <Navigate to="/login" />
//             )<Extra/>}/> */}
//             <Route path="/extras" element={
// AuthService.getCurrentUser() ? (
//              <Extras/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             <Route path="/diffs" element={
// AuthService.getCurrentUser() ? (
//   <Diffs/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             <Route path="/esigns" element={
// AuthService.getCurrentUser() ? (
//   <Esigns/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             <Route path="/prios" element={
// AuthService.getCurrentUser() ? (
//   <Prioritys/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             <Route path="/lett" element={
// AuthService.getCurrentUser() ? (
//   <Letters/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             <Route path="/lett1" element={
// AuthService.getCurrentUser() ? (
//   <Letters2/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             <Route path="/mtf" element={
// AuthService.getCurrentUser() ? (
//   <BoardMtf/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             <Route path="/liqus" element={
// AuthService.getCurrentUser() ? (
//   <BoardLiqus/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             <Route path="/mtfs" element={
// AuthService.getCurrentUser() ? (
//   <BoardMtfs/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             <Route path="/liqu" element={
// AuthService.getCurrentUser() ? (
//   <BoardLiqu/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             <Route path="/brok" element={
// AuthService.getCurrentUser() ? (
//   <Brokerage/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             <Route path="/sebis" element={
// AuthService.getCurrentUser() ? (
//   <BoardSebis/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             <Route path="/sebi" element={
// AuthService.getCurrentUser() ? (
//   <BoardSebi/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             <Route path="/forgotpassword" element={<ForgotPassword/>}/>
//             <Route path="resetPassword" element={<ResetPassword/>}/>
//             <Route path="/extra" element={
// AuthService.getCurrentUser() ? (
//   <BoardExtra/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             <Route path="/changes" element={
// AuthService.getCurrentUser() ? (
//   <BoardChanges/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             <Route path="/cuspa" element={
// AuthService.getCurrentUser() ? (
//   <Cuspa/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             <Route path="/cuspas" element={
// AuthService.getCurrentUser() ? (
//   <Cuspas/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
          
//           <Route path="/ptt" element={
// AuthService.getCurrentUser() ? (
//   <BoardPtt/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//           <Route path="/ptts" element={
// AuthService.getCurrentUser() ? (
//   <BoardPtts/>
//             ) : (
//               <Navigate to="/login" />
//             )}/>
//             </Routes>
//         </div>

//         {/* <AuthVerify logOut={this.logOut}/> */}
//       </div>
//     );
//   }
// }

// export default App;












import React, { Component } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import BoardSubAdmin from "./components/board-sub-admin.component";
import EventBus from "./common/EventBus";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";





import BoardSubModerator from "./components/board-sub-moderator.component";

// import AuthVerify from "./common/auth-verify";

import ChangePasswordComponent from "./components/ChangePassword.component";






import RecordList from "./components/client/recordList";
import Letter from "./components/letter/Letter";
import Letter2 from "./components/letter/Letter2";
import Diff from './components/diff/diff'
import Priority from './components/priority/priority'
import Esign from './components/esign/Esign'
import BoardDetails from './components/board-detail.component'
import Extra from './components/complete/extra'




import Extras from "./components/client/board-record.component";
import Diffs from './components/diff/diff.component'
import Prioritys from './components/priority/priority.component'
import Esigns from './components/esign/esign.component'

import Letters from './components/letter/letter.component'
import Letters2 from'./components/letter/letter2.component'
import BoardMtf from "./components/mtf.component";
import BoardLiqus from "./components/liqus.component";
import BoardMtfs from "./components/mtfs.component";
import BoardLiqu from "./components/liqu.component";
import Brokerage from "./components/brokerage.component";
import BoardSebis from "./components/sebis.component";
import BoardSebi from "./components/sebi.component";






import BoardExtra from "./components/complete/extra.component";
import BoardRecord from "./components/client/record.component";

import BoardChanges from './components/board-changedetails.component';
import BoardRecordMail from './components/client/recordmail.component'


import Cuspa from './components/cuspa.component';
import Cuspas from './components/cuspas.component';
import BoardPtt from "./components/ptt.component";
import BoardPtts from "./components/ptts.component";

import { FaBars } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
import { BiSolidUserDetail } from "react-icons/bi";
import { RiUserAddLine } from "react-icons/ri";
import { FaRegFolderClosed } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";

import { MdAdminPanelSettings } from "react-icons/md";
import { SlEnvolopeLetter } from "react-icons/sl";
import { TbLayersDifference } from "react-icons/tb";
import { MdLowPriority } from "react-icons/md";
import { FaFileSignature } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { FaPaypal } from "react-icons/fa6";
import { BiAlarmExclamation } from "react-icons/bi";
import SignIn from "./components/SignIn";
import BoardCrm from "./components/crm.component";
import BoardCrms from "./components/crms.component";
import Otherletter from "./components/letter/OtherLetter";
import Otherletter1 from "./components/letter/OtherLetter.component";
import DormancyLetter from "./components/letter/DormancyLetter";
import DormancyLetters from "./components/letter/DormancyLetter.component";
import Port from "./components/scripts/port.component";
import Ports from "./components/scripts/ports.component";
import Dpsoh from "./components/scripts/dpsoh.component";
import Dpsohs from "./components/scripts/dpsohs.component";
import { FaCodeCompare } from "react-icons/fa6";
import UpdatedData from "./components/updateData.components";
import Dealslip from "./components/letter/dealslip.component";
import RunningAccLetter from "./components/letter/RunningAccAuth.component";
import RunningAccLetters from "./components/letter/RunningAccAuths.component";
import Trialbals from "./components/trialbal/trialbals.component";
import Trialbal from "./components/trialbal/trialbal.component";
import Thirtyday from "./components/thirtyday/thirtyday.component";
import Thirtydays from "./components/thirtyday/thirtydays.component";
import LedgerDetail from "./components/ledgerdetail/ledgerdetail.component";
import LedgerDetails from "./components/ledgerdetail/ledgerdetails.component";
import QtyDiffData from "./components/QtyDiff.component";
import PortDiff from "./components/mail-portdiff";
import BulkDormacy from "./components/letter/BulkDormacyLetter";
import Trades from "./components/trades/trade.component";
import TradesSub from "./components/trades/trades.component";
import AskClient from "./components/askclient/ask-client";
import AskClients from "./components/askclient/ask-clients";
import Turnover from "./components/turnover";








class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.handleActivity = this.handleActivity.bind(this);
    this.startTimeout = this.startTimeout.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);

    this.state = {
      showSidebar: true,
      currentUser: undefined,
      showModeratorBoard: false,
      showSubModeratorBoard: false,
      showAdminBoard: false,
      showSubAdminBoard: false,
      currentUser: undefined,
      activeItem: null,
      lastActivityTime: Date.now(),
      isDropdownOpen: false,
      isDropdownOpen1: false,
      isDropdownOpen2: false,
      isDropdownOpen3: false,
      tabledata:[],
    };
  }

  // handleTabledata = async () => {
  //   try {
  //     this.setState({ loading: true });
  //     const response = await fetch("http://183.182.84.228:4005/tabledate/");
  //     const tabledata = await response.json();
  //     const selectedtabledateData = tabledata;
  //     if (selectedtabledateData.length > 0) {
  //       this.setState({ tabledata: selectedtabledateData });
  //     } else {
  //       window.alert('Data not found for selected record.');
  //     }
  //   } catch (error) {
  //     window.alert(`An error occurred: ${error}`);
  //   }
  //   finally {
  //     this.setState({ loading: false }); // Set loading to false when data fetching completes
  //   }
  // };
  




  handleItemClick(item) {
    this.setState({ activeItem: item });
  }

  toggleDropdown = () => {
    this.setState((prevState) => ({ isDropdownOpen: !prevState.isDropdownOpen }));
  };
  toggleDropdown1 = () => {
    this.setState((prevState) => ({ isDropdownOpen1: !prevState.isDropdownOpen1 }));
  };
  toggleDropdown2 = () => {
    this.setState((prevState) => ({ isDropdownOpen2: !prevState.isDropdownOpen2 }));
  };
  toggleDropdown3 = () => {
    this.setState((prevState) => ({ isDropdownOpen3: !prevState.isDropdownOpen3 }));
  };



  componentDidMount() {
    const user = AuthService.getCurrentUser();
  
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showSubModeratorBoard: user.roles.includes("ROLE_SUB_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showSubAdminBoard: user.roles.includes("ROLE_Sub_ADMIN"),
      });
      this.startTimeout(); // Start the timeout when the user logs in
    } else {
      this.logOut();
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
    
    window.addEventListener("mousemove", this.handleActivity);
    window.addEventListener("keydown", this.handleActivity);
  }

  componentWillUnmount() {
    EventBus.remove("logout");
    window.removeEventListener("mousemove", this.handleActivity);
    window.removeEventListener("keydown", this.handleActivity);
    clearTimeout(this.timeout);
  }

  handleActivity() {
    this.setState({ lastActivityTime: Date.now() });
    clearTimeout(this.timeout);
    this.startTimeout();
  }

  startTimeout() {
    this.timeout = setTimeout(() => {
      this.logOut();
    }, 15 * 60 * 1000); // 15 minutes in milliseconds
  }

  logOut() {
    clearTimeout(this.timeout);
    AuthService.logout();
    this.setState({
      lastActivityTime: Date.now(),
      showModeratorBoard: false,
      showSubModeratorBoard: false,
      showAdminBoard: false,
      showSubAdminBoard: false,
      currentUser: undefined,
    });
  }

  toggleSidebar() {
    this.setState(prevState => ({
      showSidebar: !prevState.showSidebar
    }));
  }


  render() {
    const {activeItem , currentUser, showSidebar , showModeratorBoard, showAdminBoard, showSubModeratorBoard, showSubAdminBoard , isDropdownOpen , isDropdownOpen1 , isDropdownOpen2 , isDropdownOpen3 , tabledata } = this.state;

    const sidebarItems = [
      { label: "Home", link: "/" },
      { label: "Profile", link: "/profile" },
      { label: "User", link: "/user", roles: ["ROLE_ADMIN"] },
      
    ];

    return (
      <div className="app-container">

<div className="news-ticker" style={{height : '30px'}} >
        <p className="news-text">
        {tabledata.map((record) => record.source_table)} is update as 
          Latest Update: New features added to the application! Check out the Trades&nbsp;&nbsp;&nbsp;&nbsp;
          {/* |
          &nbsp;&nbsp;&nbsp;&nbsp;System maintenance scheduled for this weekend&nbsp;&nbsp;&nbsp;&nbsp;|
          &nbsp;&nbsp;&nbsp;&nbsp;Don't forget to update your profile settings. */}
        </p>
      </div>

        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container">
            <Link to={"/"} className="navbar-brand">
                  
            </Link>
            <div className="navbar-nav ml-auto">
              <ul className="navbar-nav">
                {currentUser && (
                  <div className="navbar-nav ml-auto">
                  <li className="nav-item" >
                    <Link to={"https://compare-three.vercel.app/"} className="nav-link" style={{color: 'white',font: 'caption'}} target="blank">
                      Utility<FaCodeCompare/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Link>
                  </li> 
                
                <Dropdown>
    <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{margin:'0px'}}>
      Settings <FaCog/>
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item href="/profile">
        <FaUser /> Profile
      </Dropdown.Item>
      <Dropdown.Item onClick={this.logOut}>
        <FaSignOutAlt /> Logout
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>





                <li className="nav-item">
                  {/* <button onClick={this.toggleSidebar} className="btn btn-link nav-link">
                    {showSidebar ? "Close Sidebar" : "Open Sidebar"}
                  </button> */}
                  {/* <button onClick={this.toggleSidebar} className="btn btn-link nav-link" style={{marginTop:"0px"}}> ☰</button> */}
                  {/* <button onClick={this.toggleSidebar} className="btn btn-link nav-link" style={{marginTop:"0px"}}>
  <FaBars />
</button> */}

                </li>
                </div>
                )}
                <li className="nav-item">
                  <Link to={"/login"} onClick={this.logOut} className="nav-link">
                    {currentUser ? " " : "Login"}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className={showSidebar ? "sidebar toggled" : "sidebar"}>
        <ul style={{marginTop:'18px'}}>
          {/* {sidebarItems.map((item, index) => (
            (!item.roles || (currentUser && currentUser.roles.some(role => item.roles.includes(role)))) ? (
              <li key={index}><Link to={item.link}>{item.label}</Link></li>
            ) : null
          ))} */}
           {/* <button onClick={this.toggleSidebar} className="btn btn-link nav-link" style={{marginLeft:'190px'}}>
    <FaTimes />
  </button> */}
                    <Link to={"/"} className="navbar-brand">
                    <img src="https://www.exclusivegrp.com/logo_exclusive.gif" alt="Logo" className="logo" style={{width:'34px' , height:'43px'}} />
            <button class="button" data-text="Awesome">
              <span class="actual-text">&nbsp;Exclusive Securities&nbsp;</span>
              <span aria-hidden="true" class="hover-text">&nbsp;Exclusive Securities&nbsp;</span>
            </button>
          </Link>
          <div className="navbar-nav mr-auto">
            {/* <li className="sidebar-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li> */}







            {showModeratorBoard && (
              // <li className="sidebar-item">
              //   <Link to={"/submod"} className="nav-link">
              //     Moderator Board
              //   </Link>
              // </li>
              <div className="navbar-nav ml-auto">
              {/* <li className="sidebar-item">
                <Link to={"/subadmin"} className="nav-link">
                  Sub Admin Board
                </Link>
              </li> */}
              <li className={`sidebar-item ${activeItem === 'item3000' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item3000')}>
                <Link to={"/askclient"} className="nav-link">
                <BiSolidUserDetail/> Ask Client
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item1' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item1')}>
                <Link to={"/extra"} className="nav-link">
                <BiSolidUserDetail/> Client Information
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item2' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item2')}>
                <Link to={"/closer"} className="nav-link">
                <FaRegFolderClosed/>  Closer Info (Transfer)
                </Link>
              </li>
              
              <li className={`sidebar-item ${activeItem === 'item4000' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item4000')}>
                <Link to={"/tradesSub"} className="nav-link">
                <FaRegFolderClosed/> Trades
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item400' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item400')}>
                <Link to={"/port1"} className="nav-link">
                <FaRegFolderClosed/> Portfolio Script & Client Wise
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item401' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item401')}>
                <Link to={"/dpsoh1"} className="nav-link">
                <FaRegFolderClosed/> Dpsoh Script Wise
                </Link>
              </li>
              {/* <li className={`sidebar-item ${activeItem === 'item3' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item3')}>
                <Link to={"/letter"} className="nav-link">
                 <SlEnvolopeLetter/> Authorization letter (Individual)
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item4' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item4')}>
                <Link to={"/letter1"} className="nav-link">
                <SlEnvolopeLetter/> Authorization letter (Non-Individual)
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item256' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item256')}>
                <Link to={"/Otherletter"} className="nav-link">
                <SlEnvolopeLetter/>  Authorization letter (Other)
                </Link>
              </li> */}

<div className={`sidebar-item dropdown ${activeItem === 'dropdown' ? 'active' : ''}`}>
              <div className="nav-link" onClick={this.toggleDropdown}>
                <SlEnvolopeLetter /> Authorization letters
              </div>
              {isDropdownOpen && (
                <div className="dropdown-menu show">
                 <li className={`sidebar-item ${activeItem === 'item3' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item3')}>
                <Link to={"/letter"} className="nav-link">
                 <SlEnvolopeLetter/> Authorization letter (Individual)
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item4' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item4')}>
                <Link to={"/letter1"} className="nav-link">
                <SlEnvolopeLetter/> Authorization letter (Non-Individual)
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item256' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item256')}>
                <Link to={"/Otherletter"} className="nav-link">
                <SlEnvolopeLetter/>  Authorization letter (Other)
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item258' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item258')}>
                <Link to={"/RunnAcc"} className="nav-link">
                <SlEnvolopeLetter/> Running Account Authorization letter
                </Link>
              </li>
                </div>
              )}
            </div>

              <li className={`sidebar-item ${activeItem === 'item257' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item257')}>
                <Link to={"/Dormancyletter"} className="nav-link">
                <SlEnvolopeLetter/> Dormancy Activation letter
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item299' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item299')}>
                <Link to={"/dealslip"} className="nav-link">
                <SlEnvolopeLetter/> Deal Slip
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item2578' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item2578')}>
                <Link to={"/trialbal"} className="nav-link">
                <SlEnvolopeLetter/> Trial Balance
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item2579' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item2579')}>
                <Link to={"/thirtyday"} className="nav-link">
                <SlEnvolopeLetter/> 30 Day Ledger
                </Link>
              </li>
              {/* <li className={`sidebar-item ${activeItem === 'item1' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item1')}>
                <Link to={"/diff"} className="nav-link">
                  Esl Kotak Difference
                </Link>
              </li> */}
              <li className={`sidebar-item ${activeItem === 'item5' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item5')}>
                <Link to={"/priority"} className="nav-link">
                 <MdLowPriority/> Priority
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item6' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item6')}>
                <Link to={"/esign"} className="nav-link">
                 <FaFileSignature/> E-sign
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item7' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item7')}>
              <Link to={"/mtfs"} className="nav-link">
             <MdOutlinePendingActions/> Pending Pledgor
              </Link>
            </li>
            <li className={`sidebar-item ${activeItem === 'item8' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item8')}>
              <Link to={"/liqu"} className="nav-link">
              <MdOutlinePendingActions/> Pending Liquidation
              </Link>
            </li>
            <li className={`sidebar-item ${activeItem === 'item9' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item9')}>
                <a href="/brok" className="nav-link" >
                <FaPaypal/>  Brokerage
                </a>
              </li>
              <li className={`sidebar-item ${activeItem === 'item10' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item10')}>
                <a href="/sebi" className="nav-link" >
                <MdPayment/>  Sebi Payout
                </a>
              </li>
              <li className={`sidebar-item ${activeItem === 'item11' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item11')}>
                <a href="/cuspas" className="nav-link" >
                <BiAlarmExclamation/>  CUSPA
                </a>
              </li>
              <li className={`sidebar-item ${activeItem === 'item12' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item12')}>
                <a href="/ptt" className="nav-link" >
                <MdOutlinePendingActions/>  KRA Permitted To Trade (Pending)
                </a>
              </li>
              <li className={`sidebar-item ${activeItem === 'item26' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item126')}>
                <a href="/crm" className="nav-link" >
                <MdOutlinePendingActions/>  Updated CRM
                </a>
              </li>
              </div>
            )}














            {showSubModeratorBoard && (
              <div className="navbar-nav ml-auto">
                <li className={`sidebar-item ${activeItem === 'item1000' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item1000')}>
                <Link to={"/askclients"} className="nav-link">
                <BiSolidUserDetail/> Ask Client
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item1' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item1')}>
                <Link to={"/mod"} className="nav-link">
                <BiSolidUserDetail/> Client Information 
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item2' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item2')}>
              <Link to={"/extras"} className="nav-link">
              <FaRegFolderClosed/>  Closer Info (Transfer)
              </Link>
            </li>
            <li className={`sidebar-item ${activeItem === 'item4000' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item4000')}>
                <Link to={"/tradesSub"} className="nav-link">
                <FaRegFolderClosed/> Trades
                </Link>
              </li>
            <li className={`sidebar-item ${activeItem === 'item400' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item400')}>
                <Link to={"/port2"} className="nav-link">
                <FaRegFolderClosed/> Portfolio Script & Client Wise
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item401' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item401')}>
                <Link to={"/dpsoh2"} className="nav-link">
                <FaRegFolderClosed/> Dpsoh Script Wise
                </Link>
              </li>
            {/* <li className={`sidebar-item ${activeItem === 'item1' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item1')}>
              <Link to={"/diffs"} className="nav-link">
               ESL KSL Difference
              </Link>
            </li> */}
            <li className={`sidebar-item ${activeItem === 'item3' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item3')}>
              <Link to={"/prios"} className="nav-link">
              <MdLowPriority/> Priority
              </Link>
            </li>
            <li className={`sidebar-item ${activeItem === 'item4' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item4')}>
              <Link to={"/esigns"} className="nav-link">
              <FaFileSignature/> Esign
              </Link>
            </li>

            {/* <li className={`sidebar-item ${activeItem === 'item5' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item5')}>
              <Link to={"/lett"} className="nav-link">
              <SlEnvolopeLetter/> Authorization letter (Individual)
              </Link>
            </li>
            <li className={`sidebar-item ${activeItem === 'item6' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item6')}>
              <Link to={"/lett1"} className="nav-link">
              <SlEnvolopeLetter/> Authorization letter (Non-Individual)
              </Link>
            </li>
            <li className={`sidebar-item ${activeItem === 'item256' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item256')}>
                <Link to={"/Otherletter1"} className="nav-link">
                <SlEnvolopeLetter/>  Authorization letter (Other)
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item258' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item258')}>
                <Link to={"/RunnAcc"} className="nav-link">
                <SlEnvolopeLetter/> Running Account Authorization letter
                </Link>
              </li> */}










              <div className={`sidebar-item dropdown ${activeItem === 'dropdown' ? 'active' : ''}`}>
              <div className="nav-link" onClick={this.toggleDropdown}>
                <SlEnvolopeLetter /> Authorization letters
              </div>
              {isDropdownOpen && (
                <div className="dropdown-menu show">
                  <li className={`sidebar-item ${activeItem === 'item5' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item5')}>
              <Link to={"/lett"} className="nav-link">
              <SlEnvolopeLetter/> Authorization letter (Individual)
              </Link>
            </li>
            <li className={`sidebar-item ${activeItem === 'item6' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item6')}>
              <Link to={"/lett1"} className="nav-link">
              <SlEnvolopeLetter/> Authorization letter (Non-Individual)
              </Link>
            </li>
            <li className={`sidebar-item ${activeItem === 'item256' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item256')}>
                <Link to={"/Otherletter1"} className="nav-link">
                <SlEnvolopeLetter/>  Authorization letter (Other)
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item258' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item258')}>
                <Link to={"/RunnAccs"} className="nav-link">
                <SlEnvolopeLetter/> Running Account Authorization letter
                </Link>
              </li>

                </div>
              )}
            </div>

              <li className={`sidebar-item ${activeItem === 'item257' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item257')}>
                <Link to={"/Dormancyletters"} className="nav-link">
                <SlEnvolopeLetter/> Dormancy Activation letter
                </Link>
              </li>

              <li className={`sidebar-item ${activeItem === 'item2578' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item2578')}>
                <Link to={"/trialbals"} className="nav-link">
                <SlEnvolopeLetter/> Trial Balance
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item2579' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item2579')}>
                <Link to={"/thirtydays"} className="nav-link">
                <SlEnvolopeLetter/> 30 Day Ledger
                </Link>
              </li>
              
            <li className={`sidebar-item ${activeItem === 'item7' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item7')}>
              <Link to={"/mtf"} className="nav-link">
              <MdOutlinePendingActions/>  Pending Pledgor
              </Link>
            </li>
            <li className={`sidebar-item ${activeItem === 'item8' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item8')}>
              <Link to={"/liqus"} className="nav-link">
              <MdOutlinePendingActions/> Pending Liquidation
              </Link>
            </li>
            <li className={`sidebar-item ${activeItem === 'item9' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item9')}>
                <a href="/brok" className="nav-link" >
                <FaPaypal/>  Brokerage
                </a>
              </li>
              <li className={`sidebar-item ${activeItem === 'item10' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item10')}>
                <a href="/sebis" className="nav-link" >
                <MdPayment/>  Sebi Payout
                </a>
              </li>
              <li className={`sidebar-item ${activeItem === 'item11' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item11')}>
                <a href="/cuspas" className="nav-link" >
                <BiAlarmExclamation/>  CUSPA
                </a>
              </li>
              <li className={`sidebar-item ${activeItem === 'item12' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item12')}>
                <a href="/ptts" className="nav-link" >
                <MdOutlinePendingActions/>  KRA Permitted To Trade (Pending)
                </a>
              </li>
              <li className={`sidebar-item ${activeItem === 'item26' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item26')}>
                <a href="/crms" className="nav-link" >
                <MdOutlinePendingActions/>  Updated CRM
                </a>
              </li>
</div>
            )}









            {showAdminBoard && (
              
              <div className="navbar-nav ml-auto">
                {/* <li className={`sidebar-item ${activeItem === 'item1245' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item1245')}>
                <Link to={"/update"} className="nav-link">
                <GrUserAdmin/>  Update Data
                </Link>
              </li>
                <li className={`sidebar-item ${activeItem === 'item1' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item1')}>
                <Link to={"/admin"} className="nav-link">
                <GrUserAdmin/>  Admin Board
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item2' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item2')}>
                <Link to={"/register"} className="nav-link">
                 <RiUserAddLine/> Add Users
                </Link>
              </li> */}


              <div className={`sidebar-item dropdown ${activeItem === 'dropdown' ? 'active' : ''}`}>
              <div className="nav-link" onClick={this.toggleDropdown2}>
                <SlEnvolopeLetter /> Admin Control
              </div>
              {isDropdownOpen2 && (
                <div className="dropdown-menu show">
                 <li className={`sidebar-item ${activeItem === 'item1245' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item1245')}>
                <Link to={"/update"} className="nav-link">
                <GrUserAdmin/>  Update Data
                </Link>
              </li>
                <li className={`sidebar-item ${activeItem === 'item1' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item1')}>
                <Link to={"/admin"} className="nav-link">
                <GrUserAdmin/>  Admin Board
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item2' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item2')}>
                <Link to={"/register"} className="nav-link">
                 <RiUserAddLine/> Add Users
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item12450' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item12450')}>
                <Link to={"/turnoversum"} className="nav-link">
                <GrUserAdmin/>  Turnover Summary
                </Link>
              </li>
                </div>
              )}
            </div>

            <li className={`sidebar-item ${activeItem === 'item3000' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item3000')}>
                <Link to={"/askclient"} className="nav-link">
                <BiSolidUserDetail/> Ask Client
                </Link>
              </li>

              <li className={`sidebar-item ${activeItem === 'item3' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item3')}>
                <Link to={"/extra"} className="nav-link">
                <BiSolidUserDetail/> Client Information 
                </Link>
              </li>
              {/* <li className={`sidebar-item ${activeItem === 'item4' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item4')}>
                <Link to={"/closer"} className="nav-link">
                <FaRegFolderClosed/> Closer Info (Transfer)
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item24' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item24')}>
                <Link to={"/mailextras"} className="nav-link">
                <FaRegFolderClosed/> Closer Transfer (Mail)
                </Link>
              </li> */}

              <div className={`sidebar-item dropdown ${activeItem === 'dropdown' ? 'active' : ''}`}>
              <div className="nav-link" onClick={this.toggleDropdown1}>
                <SlEnvolopeLetter /> Closer Info (Transfer)
              </div>
              {isDropdownOpen1 && (
                <div className="dropdown-menu show">
                 <li className={`sidebar-item ${activeItem === 'item4' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item4')}>
                <Link to={"/closer"} className="nav-link">
                <FaRegFolderClosed/> Closer Info (Transfer)
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item24' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item24')}>
                <Link to={"/mailextras"} className="nav-link">
                <FaRegFolderClosed/> Closer Transfer (Mail)
                </Link>
              </li>
                </div>
              )}
            </div>
            <li className={`sidebar-item ${activeItem === 'item4000' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item4000')}>
                <Link to={"/trades"} className="nav-link">
                <FaRegFolderClosed/> Trades
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item400' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item400')}>
                <Link to={"/port1"} className="nav-link">
                <FaRegFolderClosed/> Portfolio Script & Client Wise
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item401' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item401')}>
                <Link to={"/dpsoh1"} className="nav-link">
                <FaRegFolderClosed/> Dpsoh Script Wise
                </Link>
              </li>
              {/* <li className={`sidebar-item ${activeItem === 'item5' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item5')}>
                <Link to={"/letter"} className="nav-link">
                <SlEnvolopeLetter/> Authorization letter (Individual)
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item6' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item6')}>
                <Link to={"/letter1"} className="nav-link">
                <SlEnvolopeLetter/>  Authorization letter (Non-Individual)
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item256' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item256')}>
                <Link to={"/Otherletter"} className="nav-link">
                <SlEnvolopeLetter/>  Authorization letter (Other)
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item257' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item257')}>
                <Link to={"/Dormancyletter"} className="nav-link">
                <SlEnvolopeLetter/> Dormancy Activation letter
                </Link>
              </li> */}

<div className={`sidebar-item dropdown ${activeItem === 'dropdown' ? 'active' : ''}`}>
              <div className="nav-link" onClick={this.toggleDropdown}>
                <SlEnvolopeLetter /> Authorization letters
              </div>
              {isDropdownOpen && (
                <div className="dropdown-menu show">
                  <li className={`sidebar-item ${activeItem === 'item5' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item5')}>
                <Link to={"/letter"} className="nav-link">
                <SlEnvolopeLetter/> Authorization letter (Individual)
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item6' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item6')}>
                <Link to={"/letter1"} className="nav-link">
                <SlEnvolopeLetter/>  Authorization letter (Non-Individual)
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item256' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item256')}>
                <Link to={"/Otherletter"} className="nav-link">
                <SlEnvolopeLetter/>  Authorization letter (Other)
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item258' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item258')}>
                <Link to={"/RunnAcc"} className="nav-link">
                <SlEnvolopeLetter/> Running Account Authorization letter
                </Link>
              </li>
                </div>
              )}
            </div>
            
            <li className={`sidebar-item ${activeItem === 'item257' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item257')}>
                <Link to={"/Dormancyletter"} className="nav-link">
                <SlEnvolopeLetter/> Dormancy Activation letter
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item2570' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item2570')}>
                <Link to={"/bulkdormacy"} className="nav-link">
                <SlEnvolopeLetter/> Bulk Dormancy letter
                </Link>
              </li>
              
              <li className={`sidebar-item ${activeItem === 'item299' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item299')}>
                <Link to={"/dealslip"} className="nav-link">
                <SlEnvolopeLetter/> Deal Slip
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item2578' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item2578')}>
                <Link to={"/trialbal"} className="nav-link">
                <SlEnvolopeLetter/> Trial Balance
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item12345' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item12345')}>
                <Link to={"/ledgerdetail"} className="nav-link">
                <SlEnvolopeLetter/> Ledger Details
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item2579' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item2579')}>
                <Link to={"/thirtyday"} className="nav-link">
                <SlEnvolopeLetter/> 30 Day Ledger
                </Link>
              </li>


              <div className={`sidebar-item dropdown ${activeItem === 'dropdown' ? 'active' : ''}`}>
              <div className="nav-link" onClick={this.toggleDropdown3}>
                <SlEnvolopeLetter /> Other Details
              </div>
              {isDropdownOpen3 && (
                <div className="dropdown-menu show">
                 <li className={`sidebar-item ${activeItem === 'item7' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item7')}>
                <Link to={"/diff"} className="nav-link">
                <TbLayersDifference/>  Esl Kotak Difference
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item8' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item8')}>
                <Link to={"/priority"} className="nav-link">
                <MdLowPriority/>  Priority
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item9' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item9')}>
                <Link to={"/esign"} className="nav-link">
                <FaFileSignature/>  E-sign
                </Link>
              </li>
                </div>
              )}
            </div>

            <li className={`sidebar-item ${activeItem === 'item1257' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item1257')}>
                <Link to={"/qtydiff"} className="nav-link">
                <GrUserAdmin/>  QTYDIFF Data
                </Link>
              </li>

              {/* <li className={`sidebar-item ${activeItem === 'item7' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item7')}>
                <Link to={"/diff"} className="nav-link">
                <TbLayersDifference/>  Esl Kotak Difference
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item8' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item8')}>
                <Link to={"/priority"} className="nav-link">
                <MdLowPriority/>  Priority
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item9' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item9')}>
                <Link to={"/esign"} className="nav-link">
                <FaFileSignature/>  E-sign
                </Link>
              </li> */}
              
              <li className={`sidebar-item ${activeItem === 'item1000' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item1000')}>
              <Link to={"/portdiffmail"} className="nav-link">
              <MdOutlinePendingActions/> PortDiff Mail
              </Link>
            </li>
              <li className={`sidebar-item ${activeItem === 'item10' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item10')}>
              <Link to={"/mtfs"} className="nav-link">
              <MdOutlinePendingActions/> Pending Pledgor
              </Link>
            </li>
            <li className={`sidebar-item ${activeItem === 'item11' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item11')}>
              <Link to={"/liqu"} className="nav-link">
              <MdOutlinePendingActions/>  Pending Liquidation
              </Link>
            </li>
            <li className={`sidebar-item ${activeItem === 'item12' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item12')}>
                <a href="/brok" className="nav-link" >
                <FaPaypal/>  Brokerage
                </a>
              </li>
              <li className={`sidebar-item ${activeItem === 'item13' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item13')}>
                <a href="/sebi" className="nav-link" >
                <MdPayment/>  Sebi Payout
                </a>
              </li>
              {/* <li className={`sidebar-item ${activeItem === 'item1' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item1')}>
                <a href="/changes" className="nav-link" >
                  Changes
                </a>
              </li> */}
              <li className={`sidebar-item ${activeItem === 'item14' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item14')}>
                <a href="/cuspa" className="nav-link" >
                <BiAlarmExclamation/>  CUSPA
                </a>
              </li>
              <li className={`sidebar-item ${activeItem === 'item15' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item15')}>
                <a href="/ptt" className="nav-link" >
                <MdOutlinePendingActions/> KRA Permitted To Trade (Pending)
                </a>
              </li>
              <li className={`sidebar-item ${activeItem === 'item26' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item26')}>
                <a href="/crm" className="nav-link" >
                <MdOutlinePendingActions/> Updated CRM
                </a>
              </li>
              </div>
            )}









            {showSubAdminBoard && (
              
              <div className="navbar-nav ml-auto">
              <li className={`sidebar-item ${activeItem === 'item1' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item1')}>
                <Link to={"/subadmin"} className="nav-link">
                 <MdAdminPanelSettings/> Sub Admin Board
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item2' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item2')}>
                <Link to={"/extra"} className="nav-link">
                <BiSolidUserDetail/> Client Information
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item3' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item3')}>
                <Link to={"/closer"} className="nav-link">
                <FaRegFolderClosed/>  Closer Info (Transfer)
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item4' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item4')}>
                <Link to={"/letter"} className="nav-link">
                <SlEnvolopeLetter/> Authorization letter (Individual)
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item5' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item5')}>
                <Link to={"/letter1"} className="nav-link">
                <SlEnvolopeLetter/> Authorization letter (Non-Individual)
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item256' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item256')}>
                <Link to={"/Otherletter"} className="nav-link">
                <SlEnvolopeLetter/>  Authorization letter (Other)
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item257' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item257')}>
                <Link to={"/Dormancyletter"} className="nav-link">
                <SlEnvolopeLetter/> Dormancy Activation letter
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item299' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item299')}>
                <Link to={"/dealslip"} className="nav-link">
                <SlEnvolopeLetter/> Deal Slip
                </Link>
              </li>
              {/* <li className={`sidebar-item ${activeItem === 'item1' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item1')}>
                <Link to={"/diff"} className="nav-link">
                  Esl Kotak Difference
                </Link>
              </li> */}
              <li className={`sidebar-item ${activeItem === 'item6' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item6')}>
                <Link to={"/priority"} className="nav-link">
                <MdLowPriority/>  Priority
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item7' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item7')}>
                <Link to={"/esign"} className="nav-link">
                <FaFileSignature/>  E-sign
                </Link>
              </li>
              <li className={`sidebar-item ${activeItem === 'item8' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item8')}>
                <a href="/brok" className="nav-link" >
                <FaPaypal/>  Brokerage
                </a>
              </li>
              <li className={`sidebar-item ${activeItem === 'item9' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item9')}>
                <a href="/ptt" className="nav-link" >
                <MdOutlinePendingActions/> KRA Permitted To Trade (Pending)
                </a>
              </li>
              <li className={`sidebar-item ${activeItem === 'item26' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item26')}>
                <a href="/crm" className="nav-link" >
                <MdOutlinePendingActions/> Updated CRM
                </a>
              </li>
              </div>
            )}







            {currentUser && !showSubModeratorBoard && !showAdminBoard && !showModeratorBoard && (
              <li className={`sidebar-item ${activeItem === 'item1' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item1')}>
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
              
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              {/* <li className={`sidebar-item ${activeItem === 'item1' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item1')}>
                <Link to={"/profile"} className="nav-link">
              {currentUser.username}
              
              Profile
                </Link>
              </li> */}
           
              

              {/* <li className={`sidebar-item ${activeItem === 'item1' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item1')}>
                <a href="/change-password" className="nav-link">
                  change
                </a>
              </li> */}

              <li className={`sidebar-item ${activeItem === 'item20' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item20')}>
                <a href="/login" className="nav-link" onClick={this.logOut}>
                <FaSignOutAlt /> LogOut
                </a>
              </li>
              
            </div>
          ) : (
              <div className="navbar-nav ml-auto">
                {/* <li className={`sidebar-item ${activeItem === 'item1' ? 'active' : ''}`}
            onClick={() => this.handleItemClick('item1')}>
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li> */}

                {/* <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li> */}
              </div>
            )}
        </ul>
      </div>

        <div className="content">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/logins" element={<SignIn/>}/> */}
            <Route path="/register" element={
            AuthService.getCurrentUser() ? (
              <Register />
            ) : (
              <Navigate to="/login" />
            )} />
            <Route path="/profile" element={
AuthService.getCurrentUser() ? (
  <Profile />
            ) : (
              <Navigate to="/login" />
            )} />
            <Route path="/user" element={
AuthService.getCurrentUser() ? (
  <BoardUser />
            ) : (
              <Navigate to="/login" />
            )} />
            <Route path="/mod" element={
AuthService.getCurrentUser() ? (
  <BoardModerator />
            ) : (
              <Navigate to="/login" />
            )} />
            <Route path="/admin" element={
AuthService.getCurrentUser() ? (
  <BoardAdmin />
            ) : (
              <Navigate to="/login" />
            )} />
            <Route path="/submod" element={
AuthService.getCurrentUser() ? (
  <BoardSubModerator/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/change-password" element={
AuthService.getCurrentUser() ? (
  <ChangePasswordComponent/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/subadmin" element={
AuthService.getCurrentUser() ? (
  <BoardSubAdmin/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/closer" element={
AuthService.getCurrentUser() ? (
  <RecordList/>
            ) : (
              <Navigate to="/login" />
            )}/>
            {/* <Route path="/closer" element={
AuthService.getCurrentUser() ? (
              <Register />
            ) : (
              <Navigate to="/login" />
            )<BoardRecord/>}/> */}
            <Route path="/letter" element={
AuthService.getCurrentUser() ? (
  <Letter/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/letter1" element={
AuthService.getCurrentUser() ? (
  <Letter2/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/diff" element={
AuthService.getCurrentUser() ? (
  <Diff/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/priority" element={
AuthService.getCurrentUser() ? (
  <Priority/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/esign" element={
AuthService.getCurrentUser() ? (
  <Esign/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/detail" element={
AuthService.getCurrentUser() ? (
  <BoardDetails/>
            ) : (
              <Navigate to="/login" />
            )}/>
            {/* <Route path="/extra" element={
AuthService.getCurrentUser() ? (
              <Register />
            ) : (
              <Navigate to="/login" />
            )<Extra/>}/> */}
            <Route path="/extras" element={
AuthService.getCurrentUser() ? (
             <Extras/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/mailextras" element={
AuthService.getCurrentUser() ? (
             <BoardRecordMail/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/diffs" element={
AuthService.getCurrentUser() ? (
  <Diffs/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/esigns" element={
AuthService.getCurrentUser() ? (
  <Esigns/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/prios" element={
AuthService.getCurrentUser() ? (
  <Prioritys/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/lett" element={
AuthService.getCurrentUser() ? (
  <Letters/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/lett1" element={
AuthService.getCurrentUser() ? (
  <Letters2/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/mtf" element={
AuthService.getCurrentUser() ? (
  <BoardMtf/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/liqus" element={
AuthService.getCurrentUser() ? (
  <BoardLiqus/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/mtfs" element={
AuthService.getCurrentUser() ? (
  <BoardMtfs/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/liqu" element={
AuthService.getCurrentUser() ? (
  <BoardLiqu/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/brok" element={
AuthService.getCurrentUser() ? (
  <Brokerage/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/sebis" element={
AuthService.getCurrentUser() ? (
  <BoardSebis/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/sebi" element={
AuthService.getCurrentUser() ? (
  <BoardSebi/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/forgotpassword" element={<ForgotPassword/>}/>
            <Route path="resetPassword" element={<ResetPassword/>}/>
            <Route path="/extra" element={
AuthService.getCurrentUser() ? (
  <BoardExtra/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/changes" element={
AuthService.getCurrentUser() ? (
  <BoardChanges/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/cuspa" element={
AuthService.getCurrentUser() ? (
  <Cuspa/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/cuspas" element={
AuthService.getCurrentUser() ? (
  <Cuspas/>
            ) : (
              <Navigate to="/login" />
            )}/>
          
          <Route path="/ptt" element={
AuthService.getCurrentUser() ? (
  <BoardPtt/>
            ) : (
              <Navigate to="/login" />
            )}/>
          <Route path="/ptts" element={
AuthService.getCurrentUser() ? (
  <BoardPtts/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/crm" element={
AuthService.getCurrentUser() ? (
  <BoardCrm/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/crms" element={
AuthService.getCurrentUser() ? (
  <BoardCrms/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/otherletter" element={
AuthService.getCurrentUser() ? (
  <Otherletter/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/otherletter1" element={
AuthService.getCurrentUser() ? (
  <Otherletter1/>
            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/Dormancyletter" element={
AuthService.getCurrentUser() ? (
  <DormancyLetter/>            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/Dormancyletters" element={
AuthService.getCurrentUser() ? (
  <DormancyLetters/>            ) : (
              <Navigate to="/login" />
            )}/>

<Route path="/port1" element={
AuthService.getCurrentUser() ? (
  <Port/>            ) : (
              <Navigate to="/login" />
            )}/>

<Route path="/port2" element={
AuthService.getCurrentUser() ? (
  <Ports/>           ) : (
              <Navigate to="/login" />
            )}/>

<Route path="/dpsoh1" element={
AuthService.getCurrentUser() ? (
  <Dpsoh/>         ) : (
              <Navigate to="/login" />
            )}/>

<Route path="/dpsoh2" element={
AuthService.getCurrentUser() ? (
  <Dpsohs/>            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/update" element={
AuthService.getCurrentUser() ? (
  <UpdatedData/>            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/dealslip" element={
AuthService.getCurrentUser() ? (
  <Dealslip/>            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/RunnAcc" element={
AuthService.getCurrentUser() ? (
  <RunningAccLetter/>            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/RunnAccs" element={
AuthService.getCurrentUser() ? (
  <RunningAccLetters/>            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/trialbal" element={
AuthService.getCurrentUser() ? (
  <Trialbal/>            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/trialbals" element={
AuthService.getCurrentUser() ? (
  <Trialbals/>            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/thirtyday" element={
AuthService.getCurrentUser() ? (
  <Thirtyday/>            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/thirtydays" element={
AuthService.getCurrentUser() ? (
  <Thirtydays/>            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/ledgerdetail" element={
AuthService.getCurrentUser() ? (
  <LedgerDetail/>            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/ledgerdetails" element={
AuthService.getCurrentUser() ? (
  <LedgerDetails/>            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/qtydiff" element={
AuthService.getCurrentUser() ? (
  <QtyDiffData/>            ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/portdiffmail" element={
AuthService.getCurrentUser() ? (
  <PortDiff/>       ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/bulkdormacy" element={
AuthService.getCurrentUser() ? (
  <BulkDormacy/>       ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/trades" element={
AuthService.getCurrentUser() ? (
  <Trades/>       ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/tradesSub" element={
AuthService.getCurrentUser() ? (
  <TradesSub/>       ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/askclient" element={
AuthService.getCurrentUser() ? (
  <AskClient/>       ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/askclients" element={
AuthService.getCurrentUser() ? (
  <AskClients/>       ) : (
              <Navigate to="/login" />
            )}/>
            <Route path="/turnoversum" element={
AuthService.getCurrentUser() ? (
  <Turnover/>      ) : (
              <Navigate to="/login" />
            )}/>
            </Routes>
        </div>

       
        <ToastContainer />
      </div>
    );
  }
}

export default App;

