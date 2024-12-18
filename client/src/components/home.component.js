// import React, { Component } from "react";

// import UserService from "../services/user.service";

// export default class Home extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       content: ""
//     };
//   }

//   componentDidMount() {
//     const currentUser = AuthService.getCurrentUser();
//     UserService.getPublicContent().then(
//       response => {
//         this.setState({
//           content: response.data
//         });
//       },
//       error => {
//         this.setState({
//           content:
//             (error.response && error.response.data) ||
//             error.message ||
//             error.toString()
//         });
//       }
//     );
//   }

//   render() {
//     return (
//       <div className="container">
//         <header className="jumbotron">
//           <h3>{this.state.content}</h3>
//         </header>
//       </div>
//     );
//   }
// }





import React, { Component } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (currentUser) this.setState({ currentUser });

    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          {/* <h3>{this.state.content}</h3> */}
          <h4 style={{marginTop:'10px'}}>HI {this.state.currentUser.username}, This is Exclusive Securities</h4>
        </header>
      </div>
    );
  }
}




// import React, { Component } from "react";
// import AuthService from "../services/auth.service";
// import UserService from "../services/user.service";

// export default class Home extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       content: "",
//       currentUser: { username: "" }
//     };
//   }

//   componentDidMount() {
//     const currentUser = AuthService.getCurrentUser();

//     if (currentUser) this.setState({ currentUser });

//     UserService.getPublicContent().then(
//       response => {
//         this.setState({
//           content: response.data
//         });
//       },
//       error => {
//         this.setState({
//           content:
//             (error.response && error.response.data) ||
//             error.message ||
//             error.toString()
//         });
//       }
//     );

//     // Call the check-and-run endpoint to check the date and potentially run the batch file
//     fetch('http://183.182.84.228:4005/check-and-run', {
//       method: 'POST'
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data.message);
//     })
//     .catch(error => {
//       console.error('Error running batch file:', error);
//     });
//   }

//   render() {
//     return (
//       <div className="container">
//         <header className="jumbotron">
//           <h4 style={{marginTop:'10px'}}>HI {this.state.currentUser.username}, This is Exclusive Securities</h4>
//         </header>
//       </div>
//     );
//   }
// }