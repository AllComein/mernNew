// import React, { Component } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
// import { isEmail } from "validator";

// import AuthService from "../services/auth.service";

// const required = value => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };

// const email = value => {
//   if (!isEmail(value)) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This is not a valid email.
//       </div>
//     );
//   }
// };

// const vusername = value => {
//   if (value.length < 3 || value.length > 20) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The username must be between 3 and 20 characters.
//       </div>
//     );
//   }
// };

// const vpassword = value => {
//   if (value.length < 6 || value.length > 40) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The password must be between 6 and 40 characters.
//       </div>
//     );
//   }
// };



// export default class Register extends Component {
//   constructor(props) {
//     super(props);
//     this.handleRegister = this.handleRegister.bind(this);
//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangeEmail = this.onChangeEmail.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);
//     this.onChangeRoleName = this.onChangeRoleName.bind(this); // New method for role name change

//     this.state = {
//       username: "",
//       email: "",
//       password: "",
//       rolename: "", // New state for role name
//       successful: false,
//       message: ""
//     };
//   }

//   onChangeUsername(e) {
//     this.setState({
//       username: e.target.value
//     });
//   }

//   onChangeEmail(e) {
//     this.setState({
//       email: e.target.value
//     });
//   }

//   onChangePassword(e) {
//     this.setState({
//       password: e.target.value
//     });
//   }

//   onChangeRoleName(e) { // New method to handle role name change
//     this.setState({
//       rolename: e.target.value
//     });
//   }

//   handleRegister(e) {
//     e.preventDefault();

//     this.setState({
//       message: "",
//       successful: false
//     });

//     this.form.validateAll();

//     if (this.checkBtn.context._errors.length === 0) {
//       AuthService.register(
//         this.state.username,
//         this.state.email,
//         this.state.password,
//         this.state.rolename // Include role name in registration
//       ).then(
//         response => {
//           this.setState({
//             message: response.data.message,
//             successful: true
//           });
//         },
//         error => {
//           const resMessage =
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString();

//           this.setState({
//             successful: false,
//             message: resMessage
//           });
//         }
//       );
//     }
//   }

//   render() {
//     return (
//       <div className="col-md-12">
//         <div className="card card-container">
//           <img
//             src="https://cdn.pixabay.com/animation/2022/12/05/10/47/10-47-58-930_512.gif"
//             alt="profile-img"
//             className="profile-img-card"
//           />

//           <Form
//             onSubmit={this.handleRegister}
//             ref={c => {
//               this.form = c;
//             }}
//           >
//             {!this.state.successful && (
//               <div>
//                 <div className="form-group">
//                   <label htmlFor="username">Username</label>
//                   <Input
//                     type="text"
//                     className="form-control"
//                     name="username"
//                     value={this.state.username}
//                     onChange={this.onChangeUsername}
//                     validations={[required, vusername]}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email">Email</label>
//                   <Input
//                     type="text"
//                     className="form-control"
//                     name="email"
//                     value={this.state.email}
//                     onChange={this.onChangeEmail}
//                     validations={[required, email]}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="password">Password</label>
//                   <Input
//                     type="password"
//                     className="form-control"
//                     name="password"
//                     value={this.state.password}
//                     onChange={this.onChangePassword}
//                     validations={[required, vpassword]}
//                   />
//                 </div>

//                 <div className="form-group">
//   <label htmlFor="rolename">Role Name</label>
//   <select
//     name="rolename"
//     value={this.state.rolename}
//     onChange={this.onChangeRoleName}
//     className="form-control"
//   >
//     <option value="">Select Role</option>
//     <option value="admin">Admin</option>
//     <option value="subadmin">Sub Admin</option>
//     <option value="user">User</option>
//     <option value="moderator">Broker</option>
//     <option value="sub_moderator">Sub Broker</option>
//   </select>
// </div>



//                 <div className="form-group">
//                   <button className="btn btn-primary btn-block">Sign Up</button>
//                 </div>
//               </div>
//             )}

//             {this.state.message && (
//               <div className="form-group">
//                 <div
//                   className={
//                     this.state.successful
//                       ? "alert alert-success"
//                       : "alert alert-danger"
//                   }
//                   role="alert"
//                 >
//                   {this.state.message}
//                 </div>
//               </div>
//             )}
//             <CheckButton
//               style={{ display: "none" }}
//               ref={c => {
//                 this.checkBtn = c;
//               }}
//             />
//           </Form>
//         </div>
//       </div>
//     );
//   }
// }












import React, { Component } from "react";
import { isEmail } from "validator";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";

// Validation functions
const required = (value) => !value && <div className="alert alert-danger">This field is required!</div>;
const email = (value) => !isEmail(value) && <div className="alert alert-danger">This is not a valid email.</div>;
const vusername = (value) => (value.length < 3 || value.length > 20) && <div className="alert alert-danger">Username must be 3-20 characters.</div>;
const vpassword = (value) => (value.length < 6 || value.length > 40) && <div className="alert alert-danger">Password must be 6-40 characters.</div>;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forms: [{ username: "", email: "", password: "", rolename: "" }],
      records: [],
      successful: false,
      message: "",
    };
  }

  // Handle input change
  onChange = (index, field, value) => {
    const forms = [...this.state.forms];
    forms[index][field] = value;
    this.setState({ forms });
  };

  // Fetch records & add missing users
  // Fetch records & add missing users
fetchAndAddUsers = async () => {
  try {
    const response = await fetch(`http://183.182.84.228:4005/letter/`);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const records = await response.json();
    const filterRecords = records; // Filter records if needed

    // Avoid duplicate users
    const existingUsernames = new Set(this.state.forms.map(form => form.username));
    const newForms = filterRecords
      .filter(record => !existingUsernames.has(record.kslucc))
      .map(record => ({
        username: record.kslucc,
        email: record.ks_emailid,
        password: "abcd.123456",
        rolename: "user",
      }));

    if (newForms.length === 0) {
      window.alert("All users already exist.");
      return;
    }

    // Register each user one by one
    for (let form of newForms) {
      try {
        await AuthService.register(form.username, form.email, form.password, form.rolename);
        this.setState(prevState => ({
          forms: [...prevState.forms, form],
        }));
        console.log(`${form.username} registered successfully.`);
      } catch (error) {
        const resMessage = error.response?.data?.message || error.message || error.toString();
        console.error(`Failed to register ${form.username}: ${resMessage}`);
      }
    }

    window.alert("Users added successfully!");
  } catch (error) {
    window.alert(`An error occurred: ${error.message}`);
  }
};


// fetchAndAddUsers = async () => {
//   try {
//     const response = await fetch(`http://183.182.84.228:4005/letter/`);
//     if (!response.ok) throw new Error(`Error: ${response.statusText}`);

//     const records = await response.json();

//     // Fetch existing users from AuthService
//     const existingUsers = await AuthService.getAllUsers();
//     const existingUsernames = new Set(existingUsers.map(user => user.username));

//     // Filter records, excluding those already in existingUsers
//     const newForms = records
//       .filter(record => !existingUsernames.has(record.kslucc)) // Exclude existing users
//       .map(record => ({
//         username: record.kslucc,
//         email: record.ks_emailid,
//         password: "abcd.123456",
//         rolename: "user",
//       }));

//     if (newForms.length === 0) {
//       window.alert("All users already exist.");
//       return;
//     }

//     // Register each new user
//     for (let form of newForms) {
//       try {
//         await AuthService.register(form.username, form.email, form.password, form.rolename);
//         this.setState(prevState => ({
//           forms: [...prevState.forms, form],
//         }));
//         console.log(`${form.username} registered successfully.`);
//       } catch (error) {
//         const resMessage = error.response?.data?.message || error.message || error.toString();
//         console.error(`Failed to register ${form.username}: ${resMessage}`);
//       }
//     }

//     window.alert("Users added successfully!");
//   } catch (error) {
//     window.alert(`An error occurred: ${error.message}`);
//   }
// };



  // Manually add an empty form
  addForm = () => {
    this.setState(prevState => ({
      forms: [...prevState.forms, { username: "", email: "", password: "", rolename: "" }],
    }));
  };

  // Remove a form entry
  removeForm = (index) => {
    const forms = [...this.state.forms];
    forms.splice(index, 1);
    this.setState({ forms });
  };

  // Handle form submission
  handleRegister = (e) => {
    e.preventDefault();
    this.setState({ message: "", successful: false });

    this.state.forms.forEach(form => {
      this.form.validateAll();
      if (this.checkBtn.context._errors.length === 0) {
        AuthService.register(form.username, form.email, form.password, form.rolename)
          .then(response => {
            this.setState({ message: response.data.message, successful: true });
          })
          .catch(error => {
            const resMessage = error.response?.data?.message || error.message || error.toString();
            this.setState({ successful: false, message: resMessage });
          });
      }
    });
  };

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <h3>Register Users</h3>

          {/* Button to Fetch & Auto-Add Users */}
          <button className="btn btn-success mb-3" onClick={this.fetchAndAddUsers}>Fetch & Add Users</button>

          <Form
            onSubmit={this.handleRegister}
            ref={(c) => { this.form = c; }}
          >
            {this.state.forms.map((form, index) => (
              <div key={index} className="form-row mb-2">
                <div className="form-group col">
                  <Input type="text" className="form-control" placeholder="Username"
                    value={form.username} onChange={(e) => this.onChange(index, 'username', e.target.value)}
                    validations={[required, vusername]} />
                </div>
                <div className="form-group col">
                  <Input type="text" className="form-control" placeholder="Email"
                    value={form.email} onChange={(e) => this.onChange(index, 'email', e.target.value)}
                    validations={[required, email]} />
                </div>
                <div className="form-group col">
                  <Input type="password" className="form-control" placeholder="Password"
                    value={form.password} onChange={(e) => this.onChange(index, 'password', e.target.value)}
                    validations={[required, vpassword]} />
                </div>
                <div className="form-group col">
                  <select className="form-control" value={form.rolename} onChange={(e) => this.onChange(index, 'rolename', e.target.value)}>
                    <option>Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="sub_admin">Sub Admin</option>
                    <option value="user">User</option>
                    <option value="moderator">Broker</option>
                    <option value="sub_moderator">Sub Broker</option>
                  </select>
                </div>
                <div className="form-group col">
                  <button type="button" className="btn btn-danger" onClick={() => this.removeForm(index)}>Delete</button>
                </div>
              </div>
            ))}

            {/* Button to Manually Add Users */}
            <div className="form-group">
              <button type="button" className="btn btn-primary" onClick={this.addForm}>Add User</button>
            </div>

            {/* Submit Button */}
            <div className="form-group">
              <button className="btn btn-primary btn-block">Sign Up</button>
            </div>

            {/* Message Display */}
            {this.state.message && (
              <div className="form-group">
                <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                  {this.state.message}
                </div>
              </div>
            )}

            <CheckButton style={{ display: "none" }} ref={(c) => { this.checkBtn = c; }} />
          </Form>
        </div>
      </div>
    );
  }
}

export default Register;















// import React, { Component } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
// import { isEmail } from "validator";

// import AuthService from "../services/auth.service";

// const required = (value) => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };

// const email = (value) => {
//   if (!isEmail(value)) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This is not a valid email.
//       </div>
//     );
//   }
// };

// const vusername = (value) => {
//   if (value.length < 3 || value.length > 20) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The username must be between 3 and 20 characters.
//       </div>
//     );
//   }
// };

// const vpassword = (value) => {
//   if (value.length < 6 || value.length > 40) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The password must be between 6 and 40 characters.
//       </div>
//     );
//   }
// };

// class Register extends Component {
//   constructor(props) {
//     super(props);
//     this.handleRegister = this.handleRegister.bind(this);
//     this.onChange = this.onChange.bind(this);
//     this.addForm = this.addForm.bind(this);
//     this.removeForm = this.removeForm.bind(this);

//     this.state = {
//       forms: [{ username: "", email: "", password: "", rolename: "" }],
//       successful: false,
//       message: ""
//     };
//   }

//   onChange(index, field, value) {
//     const forms = [...this.state.forms];
//     forms[index][field] = value;
//     this.setState({ forms });
//   }

//   addForm() {
//     const forms = [...this.state.forms, { username: "", email: "", password: "", rolename: "" }];
//     this.setState({ forms });
//   }

//   removeForm(index) {
//     const forms = [...this.state.forms];
//     forms.splice(index, 1);
//     this.setState({ forms });
//   }

//   handleRegister(e) {
//     e.preventDefault();

//     this.setState({
//       message: "",
//       successful: false
//     });

//     this.state.forms.forEach(form => {
//       this.form.validateAll();

//       if (this.checkBtn.context._errors.length === 0) {
//         AuthService.register(
//           form.username,
//           form.email,
//           form.password,
//           form.rolename
//         ).then(
//           response => {
//             this.setState({
//               message: response.data.message,
//               successful: true
//             });
//           },
//           error => {
//             const resMessage =
//               (error.response &&
//                 error.response.data &&
//                 error.response.data.message) ||
//               error.message ||
//               error.toString();

//             this.setState({
//               successful: false,
//               message: resMessage
//             });
//           }
//         );
//       }
//     });
//   }

//   render() {
//     const { forms } = this.state;

//     return (
//       <div className="col-md-12">
//         <div className="card card-container">
//           <Form
//             onSubmit={this.handleRegister}
//             ref={(c) => {
//               this.form = c;
//             }}
//           >
//             {forms.map((form, index) => (
//               <div key={index} className="form-row">
//                 <div className="form-group col">
//                   <Input
//                     type="text"
//                     className="form-control"
//                     placeholder="Username"
//                     value={form.username}
//                     onChange={(e) => this.onChange(index, 'username', e.target.value)}
//                     validations={[required, vusername]}
//                   />
//                 </div>
//                 <div className="form-group col">
//                   <Input
//                     type="text"
//                     className="form-control"
//                     placeholder="Email"
//                     value={form.email}
//                     onChange={(e) => this.onChange(index, 'email', e.target.value)}
//                     validations={[required, email]}
//                   />
//                 </div>
//                 <div className="form-group col">
//                   <Input
//                     type="password"
//                     className="form-control"
//                     placeholder="Password"
//                     value={form.password}
//                     onChange={(e) => this.onChange(index, 'password', e.target.value)}
//                     validations={[required, vpassword]}
//                   />
//                 </div>
//                 <div className="form-group col">
//                   <select
//                     name="rolename"
//                     value={form.rolename}
//                     onChange={(e) => this.onChange(index, 'rolename', e.target.value)}
//                     className="form-control"
//                   >
//                     <option >Select Role</option>
//                     <option value="admin">Admin</option>
//                     <option value="sub_admin">Sub Admin</option>
//                     <option value="user">User</option>
//                     <option value="moderator">Broker</option>
//                     <option value="sub_moderator">Sub Broker</option>
//                   </select>
//                 </div>
//                 <div className="form-group col">
//                   <button type="button" className="btn btn-danger" onClick={() => this.removeForm(index)}>Delete</button>
//                 </div>
//               </div>
//             ))}
//             <div className="form-group">
//               <button type="button" className="btn btn-primary" onClick={this.addForm}>Add</button>
//             </div>
//             <div className="form-group">
//               <button className="btn btn-primary btn-block">Sign Up</button>
//             </div>
//             {this.state.message && (
//               <div className="form-group">
//                 <div
//                   className={
//                     this.state.successful
//                       ? "alert alert-success"
//                       : "alert alert-danger"
//                   }
//                   role="alert"
//                 >
//                   {this.state.message}
//                 </div>
//               </div>
//             )}
//             <CheckButton
//               style={{ display: "none" }}
//               ref={(c) => {
//                 this.checkBtn = c;
//               }}
//             />
//           </Form>
//         </div>
//       </div>
//     );
//   }





  
// }

// export default Register;
