// import React, { Component } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";

// import AuthService from "../services/auth.service";

// import { withRouter } from '../common/with-router';

// const required = value => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };

// class ChangePassword extends Component {
//   constructor(props) {
//     super(props);
//     this.handlePasswordChange = this.handlePasswordChange.bind(this);
//     this.onChangeOldPassword = this.onChangeOldPassword.bind(this);
//     this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
//     this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);

//     this.state = {
//       oldPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//       loading: false,
//       message: ""
//     };
//   }

//   onChangeOldPassword(e) {
//     this.setState({
//       oldPassword: e.target.value
//     });
//   }

//   onChangeNewPassword(e) {
//     this.setState({
//       newPassword: e.target.value
//     });
//   }

//   onChangeConfirmPassword(e) {
//     this.setState({
//       confirmPassword: e.target.value
//     });
//   }

//   handlePasswordChange(e) {
//     e.preventDefault();

//     this.setState({
//       message: "",
//       loading: true
//     });

//     this.form.validateAll();

//     if (this.checkBtn.context._errors.length === 0) {
//       AuthService.changePassword(this.state.oldPassword, this.state.newPassword).then(
//         () => {
//           this.props.router.navigate("/login");
//           window.location.reload();
//         },
//         error => {
//           const resMessage =
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString();

//           this.setState({
//             loading: false,
//             message: resMessage
//           });
//         }
//       );
//     } else {
//       this.setState({
//         loading: false
//       });
//     }
//   }

//   render() {
//     return (
//       <Form
//         onSubmit={this.handlePasswordChange}
//         ref={c => {
//           this.form = c;
//         }}
//       >
//         <div className="form-group">
//           <label htmlFor="oldPassword">Old Password</label>
//           <Input
//             type="password"
//             className="form-control"
//             name="oldPassword"
//             value={this.state.oldPassword}
//             onChange={this.onChangeOldPassword}
//             validations={[required]}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="newPassword">New Password</label>
//           <Input
//             type="password"
//             className="form-control"
//             name="newPassword"
//             value={this.state.newPassword}
//             onChange={this.onChangeNewPassword}
//             validations={[required]}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="confirmPassword">Confirm New Password</label>
//           <Input
//             type="password"
//             className="form-control"
//             name="confirmPassword"
//             value={this.state.confirmPassword}
//             onChange={this.onChangeConfirmPassword}
//             validations={[required]}
//           />
//         </div>

//         <div className="form-group">
//           <button
//             className="btn btn-primary btn-block"
//             disabled={this.state.loading}
//           >
//             {this.state.loading && (
//               <span className="spinner-border spinner-border-sm"></span>
//             )}
//             <span>Change Password</span>
//           </button>
//         </div>

//         {this.state.message && (
//           <div className="form-group">
//             <div className="alert alert-danger" role="alert">
//               {this.state.message}
//             </div>
//           </div>
//         )}
//         <CheckButton
//           style={{ display: "none" }}
//           ref={c => {
//             this.checkBtn = c;
//           }}
//         />
//       </Form>
//     );
//   }
// }

// export default withRouter(ChangePassword);












// import React, { Component } from "react";
// import AuthService from "../services/auth.service";
// import { withRouter } from "react-router-dom";

// class ChangePassword extends Component {
//   constructor(props) {
//     super(props);
//     this.handlePasswordChange = this.handlePasswordChange.bind(this);
//     this.onChangeOldPassword = this.onChangeOldPassword.bind(this);
//     this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
//     this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);

//     this.state = {
//       oldPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//       loading: false,
//       message: "",
//       errors: {}
//     };
//   }

//   onChangeOldPassword(e) {
//     this.setState({
//       oldPassword: e.target.value,
//       errors: { ...this.state.errors, oldPassword: "" }
//     });
//   }

//   onChangeNewPassword(e) {
//     this.setState({
//       newPassword: e.target.value,
//       errors: { ...this.state.errors, newPassword: "" }
//     });
//   }

//   onChangeConfirmPassword(e) {
//     this.setState({
//       confirmPassword: e.target.value,
//       errors: { ...this.state.errors, confirmPassword: "" }
//     });
//   }

//   handlePasswordChange(e) {
//     e.preventDefault();

//     // Basic validation
//     const { oldPassword, newPassword, confirmPassword } = this.state;
//     const errors = {};
//     if (!oldPassword) {
//       errors.oldPassword = "Old Password is required";
//     }
//     if (!newPassword) {
//       errors.newPassword = "New Password is required";
//     }
//     if (!confirmPassword) {
//       errors.confirmPassword = "Confirm Password is required";
//     }
//     if (newPassword !== confirmPassword) {
//       errors.confirmPassword = "Passwords do not match";
//     }

//     if (Object.keys(errors).length === 0) {
//       this.setState({ loading: true });
//       AuthService.changePassword(oldPassword, newPassword)
//         .then((response) => {
//           this.setState({
//             loading: false,
//             message: response.data.message
//           });
//           // Redirect to login page or any other page upon successful password change
//           this.props.history.push("/login");
//           window.location.reload();
//         })
//         .catch((error) => {
//           const errorMessage =
//             (error.response && error.response.data && error.response.data.message) ||
//             error.message ||
//             error.toString();
//           this.setState({
//             loading: false,
//             message: errorMessage
//           });
//         });
//     } else {
//       this.setState({ errors });
//     }
//   }

//   render() {
//     const { oldPassword, newPassword, confirmPassword, loading, message, errors } = this.state;

//     return (
//       <form onSubmit={this.handlePasswordChange}>
//         <div className="form-group">
//           <label htmlFor="oldPassword">Old Password</label>
//           <input
//             type="password"
//             className={`form-control ${errors.oldPassword ? "is-invalid" : ""}`}
//             name="oldPassword"
//             value={oldPassword}
//             onChange={this.onChangeOldPassword}
//           />
//           {errors.oldPassword && (
//             <div className="invalid-feedback">{errors.oldPassword}</div>
//           )}
//         </div>

//         <div className="form-group">
//           <label htmlFor="newPassword">New Password</label>
//           <input
//             type="password"
//             className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
//             name="newPassword"
//             value={newPassword}
//             onChange={this.onChangeNewPassword}
//           />
//           {errors.newPassword && (
//             <div className="invalid-feedback">{errors.newPassword}</div>
//           )}
//         </div>

//         <div className="form-group">
//           <label htmlFor="confirmPassword">Confirm New Password</label>
//           <input
//             type="password"
//             className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
//             name="confirmPassword"
//             value={confirmPassword}
//             onChange={this.onChangeConfirmPassword}
//           />
//           {errors.confirmPassword && (
//             <div className="invalid-feedback">{errors.confirmPassword}</div>
//           )}
//         </div>

//         <div className="form-group">
//           <button
//             className="btn btn-primary btn-block"
//             disabled={loading}
//           >
//             {loading && (
//               <span className="spinner-border spinner-border-sm"></span>
//             )}
//             <span>Change Password</span>
//           </button>
//         </div>

//         {message && (
//           <div className="form-group">
//             <div className="alert alert-danger" role="alert">
//               {message}
//             </div>
//           </div>
//         )}
//       </form>
//     );
//   }
// }

// export default withRouter(ChangePassword);






import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const ChangePassword = () => {
  const history = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handlePasswordChange = (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!oldPassword) {
      newErrors.oldPassword = "Old Password is required";
    }
    if (!newPassword) {
      newErrors.newPassword = "New Password is required";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      AuthService.changePassword(oldPassword, newPassword)
        .then((response) => {
          setMessage(response.data.message);
          // Redirect to login page or any other page upon successful password change
          history("/login");
          window.location.reload();
        })
        .catch((error) => {
          const errorMessage =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(errorMessage);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handlePasswordChange}>
      <div className="form-group">
        <label htmlFor="oldPassword">Old Password</label>
        <input
          type="password"
          className={`form-control ${errors.oldPassword ? "is-invalid" : ""}`}
          name="oldPassword"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        {errors.oldPassword && (
          <div className="invalid-feedback">{errors.oldPassword}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {errors.newPassword && (
          <div className="invalid-feedback">{errors.newPassword}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm New Password</label>
        <input
          type="password"
          className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && (
          <div className="invalid-feedback">{errors.confirmPassword}</div>
        )}
      </div>

      <div className="form-group">
        <button
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          <span>Change Password</span>
        </button>
      </div>

      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
    </form>
  );
};

export default ChangePassword;
