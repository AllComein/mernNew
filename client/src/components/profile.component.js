// import React, { Component } from "react";
// import { Navigate } from "react-router-dom";
// import AuthService from "../services/auth.service";

// export default class Profile extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       redirect: null,
//       userReady: false,
//       currentUser: { username: "" }
//     };
//   }

//   componentDidMount() {
//     const currentUser = AuthService.getCurrentUser();

//     if (!currentUser) this.setState({ redirect: "/home" });
//     this.setState({ currentUser: currentUser, userReady: true })
//   }

//   render() {
//     if (this.state.redirect) {
//       return <Navigate to={this.state.redirect} />
//     }

//     const { currentUser } = this.state;

//     return (
//       <div className="container">
//         {(this.state.userReady) ?
//         <div>
//         <header className="jumbotron">
//           <h3>
//             <strong>{currentUser.username}</strong> Profile
//           </h3>
//         </header>
//         <p>
//           <strong>Token:</strong>{" "}
//           {currentUser.accessToken.substring(0, 20)} ...{" "}
//           {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
//         </p>
//         <p>
//           <strong>Id:</strong>{" "}
//           {currentUser.id}
//         </p>
//         <p>
//           <strong>Email:</strong>{" "}
//           {currentUser.email}
//         </p>
//         <strong>Authorities:</strong>
//         <ul>
//           {currentUser.roles &&
//             currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
//         </ul>
//       </div>: null}
//       </div>
//     );
//   }
// }





// import React, { Component } from "react";
// import { Navigate } from "react-router-dom";
// import AuthService from "../services/auth.service";

// export default class Profile extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       redirect: null,
//       userReady: false,
//       currentUser: { username: "" },
//       newPassword: "",
//       confirmPassword: "",
//       loading: false,
//       message: ""
//     };
//   }

//   componentDidMount() {
//     const currentUser = AuthService.getCurrentUser();

//     if (!currentUser) this.setState({ redirect: "/home" });
//     this.setState({ currentUser: currentUser, userReady: true });
//   }

//   handleChange = (e) => {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();

//     const { newPassword, confirmPassword } = this.state;

//     if (newPassword !== confirmPassword) {
//       this.setState({ message: "Passwords do not match" });
//       return;
//     }

//     this.setState({ loading: true });

//     AuthService.changePassword(this.state.currentUser.id, newPassword)
//       .then(response => {
//         this.setState({
//           loading: false,
//           message: response.data.message,
//           newPassword: "",
//           confirmPassword: ""
//         });
//       })
//       .catch(error => {
//         const resMessage =
//           (error.response && error.response.data && error.response.data.message) ||
//           error.message ||
//           error.toString();

//         this.setState({
//           loading: false,
//           message: resMessage
//         });
//       });
//   };

//   render() {
//     if (this.state.redirect) {
//       return <Navigate to={this.state.redirect} />;
//     }

//     const { currentUser, newPassword, confirmPassword, loading, message } = this.state;

//     return (
//       <div className="container">
//         {this.state.userReady ? (
//           <div>
//             <header className="jumbotron">
//               <h3>
//                 <strong>{currentUser.username}</strong> Profile
//               </h3>
//             </header>
//             <p>
//               <strong>Token:</strong>{" "}
//               {currentUser.accessToken.substring(0, 20)} ...{" "}
//               {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
//             </p>
//             <p>
//               <strong>Id:</strong> {currentUser.id}
//             </p>
//             <p>
//               <strong>Email:</strong> {currentUser.email}
//             </p>
//             <strong>Authorities:</strong>
//             <ul>
//               {currentUser.roles &&
//                 currentUser.roles.map((role, index) => (
//                   <li key={index}>{role}</li>
//                 ))}
//             </ul>
//             <form onSubmit={this.handleSubmit}>
//               <div className="form-group">
//                 <label>New Password:</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   name="newPassword"
//                   value={newPassword}
//                   onChange={this.handleChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Confirm Password:</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   name="confirmPassword"
//                   value={confirmPassword}
//                   onChange={this.handleChange}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 disabled={loading}
//               >
//                 {loading ? "Loading..." : "Change Password"}
//               </button>
//               {message && <div className="text-danger">{message}</div>}
//             </form>
//           </div>
//         ) : null}
//       </div>
//     );
//   }
// }









// import React, { Component } from "react";
// import { Navigate } from "react-router-dom";
// import AuthService from "../services/auth.service";

// export default class Profile extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       redirect: null,
//       userReady: false,
//       currentUser: { username: "" },
//       oldPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//       loading: false,
//       message: ""
//     };
//   }

//   componentDidMount() {
//     const currentUser = AuthService.getCurrentUser();

//     if (!currentUser) this.setState({ redirect: "/home" });
//     this.setState({ currentUser: currentUser, userReady: true });
//   }

//   handleChange = (e) => {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
  
//     const { oldPassword, newPassword, confirmPassword } = this.state;
  
//     if (newPassword !== confirmPassword) {
//       this.setState({ message: "Passwords do not match" });
//       return;
//     }
  
//     this.setState({ loading: true });
  
//     const username = this.state.currentUser.username;
  
//     AuthService.changePassword(username, oldPassword, newPassword)
//       .then(response => {
//         this.setState({
//           loading: false,
//           message: response.message,
//           oldPassword: "",
//           newPassword: "",
//           confirmPassword: ""
//         });
//       })
//       .catch(error => {
//         const resMessage =
//           (error.response && error.response.data && error.response.data.message) ||
//           error.message ||
//           error.toString();
  
//         this.setState({
//           loading: false,
//           message: resMessage
//         });
//       });
//   };
  
  
  
  
  

//   render() {
//     if (this.state.redirect) {
//       return <Navigate to={this.state.redirect} />;
//     }

//     const { currentUser, oldPassword, newPassword, confirmPassword, loading, message } = this.state;

//     return (
//       <div className="container">
//         {this.state.userReady ? (
//           <div>
//             <header className="jumbotron">
//               <h3>
//                 <strong>{currentUser.username}</strong> Profile
//               </h3>
//             </header>
//             <p>
//               <strong>Token:</strong>{" "}
//               {currentUser.accessToken.substring(0, 20)} ...{" "}
//               {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
//             </p>
//             <p>
//               <strong>Id:</strong> {currentUser.id}
//             </p>
//             <p>
//               <strong>Email:</strong> {currentUser.email}
//             </p>
//             <strong>Authorities:</strong>
//             <ul>
//               {currentUser.roles &&
//                 currentUser.roles.map((role, index) => (
//                   <li key={index}>{role}</li>
//                 ))}
//             </ul>
//             <form onSubmit={this.handleSubmit}>
//             <div className="form-group">
//               <label>Old Password:</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 name="oldPassword"
//                 value={oldPassword}
//                 onChange={this.handleChange}
//               />
//             </div>

//               <div className="form-group">
//                 <label>New Password:</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   name="newPassword"
//                   value={newPassword}
//                   onChange={this.handleChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Confirm Password:</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   name="confirmPassword"
//                   value={confirmPassword}
//                   onChange={this.handleChange}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 disabled={loading}
//               >
//                 {loading ? "Loading..." : "Change Password"}
//               </button>
//               {message && <div className="text-danger">{message}</div>}
//             </form>
//           </div>
//         ) : null}
//       </div>
//     );
//   }
// }




import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import './profile.css'

class Popup extends Component {
  render() {
    return this.props.trigger ? (
      <div className="popup">
        <div className="popup-inner">
          <button className="close-btn" onClick={() => this.props.setTrigger(false)}>Close</button>
          {this.props.children}
        </div>
      </div>
    ) : null;
  }
}

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      loading: false,
      message: "",
      popup: false
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = this.state;
    if (newPassword !== confirmPassword) {
      this.setState({ message: "Passwords do not match" });
      return;
    }
    this.setState({ loading: true });
    const username = this.state.currentUser.username;
    AuthService.changePassword(username, oldPassword, newPassword)
      .then(response => {
        this.setState({
          loading: false,
          message: response.message,
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      })
      .catch(error => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          loading: false,
          message: resMessage
        });
      });
  };

  handleAlertButtonClick = () => {
    this.setState({ popup: true });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }
    const { currentUser, oldPassword, newPassword, confirmPassword, loading, message, popup } = this.state;
    return (
      <div className="container">
        {this.state.userReady ? (
          <div>
            <header className="jumbotron">
              <h3>
                <strong>{currentUser.username}</strong> Profile
              </h3>
            </header>
            {/* <p>
              <strong>Token:</strong>{" "}
              {currentUser.accessToken.substring(0, 20)} ...{" "}
              {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </p> */}
            <p>
              <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
              <strong>Email:</strong> {currentUser.email}
            </p>
            {/* <p>
              <strong>Last Login:</strong> {currentUser.lastsignin}
            </p> */}
            {/* <strong>Authorities:</strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
            </ul> */}
            <button onClick={this.handleAlertButtonClick}>Change Password</button>
            <Popup trigger={popup} setTrigger={(value) => this.setState({ popup: value })}>
              <h3>Change Password</h3>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Old Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>New Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    name="newPassword"
                    value={newPassword}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={this.handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Change Password"}
                </button>
                {message && <div className="text-danger">{message}</div>}
              </form>
            </Popup>
          </div>
        ) : null}
      </div>
    );
  }
}
