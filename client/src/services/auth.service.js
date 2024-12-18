// import axios from "axios";

// const API_URL = "http://202.54.6.99:8080/api/auth/";

// class AuthService {
//   login(username, password) {
//     return axios
//       .post(API_URL + "signin", {
//         username,
//         password
//       })
//       .then(response => {
//         if (response.data.accessToken) {
//           localStorage.setItem("user", JSON.stringify(response.data));
//         }

//         return response.data;
//       });
//   }

//   logout() {
//     localStorage.removeItem("user");
//   }

//   register(username, email, password,rolename) {
//     return axios.post(API_URL + "signup", {
//       username,
//       email,
//       password,
//       rolename
//     });
//   }

//   changePassword(oldPassword, newPassword) {
//     return axios.post(API_URL + "change-password", {
//       oldPassword,
//       newPassword
//     });
//   }


//   getCurrentUser() {
//     return JSON.parse(localStorage.getItem('user'));;
//   }
//   getAll(){
//     return 
//   }
// }

// export default new AuthService();




// import axios from "axios";

// const API_URL = "http://202.54.6.99:8080/api/auth/";

// class AuthService {
//   login(username, password) {
//     return axios
//       .post(API_URL + "signin", {
//         username,
//         password
//       })
//       .then(response => {
//         if (response.data.accessToken) {
//           localStorage.setItem("user", JSON.stringify(response.data));
//         }

//         return response.data;
//       });
//   }

//   logout() {
//     localStorage.removeItem("user");
//   }

//   register(username, email, password, rolename) {
//     return axios.post(API_URL + "signup", {
//       username,
//       email,
//       password,
//       rolename
//     });
//   }

//   changePassword(userId, oldPassword, newPassword) {
//     return axios.post(API_URL + "change-password/" + userId, {
//       oldPassword,
//       newPassword
//     })
//     .then(response => {
//       return response.data;
//     })
//     .catch(error => {
//       throw error.response.data.message || error.message || error.toString();
//     });
//   }
  



//   getCurrentUser() {
//     return JSON.parse(localStorage.getItem('user'));
//   }

//   getAll() {
//     // Implement method to fetch all users (if needed)
//   }
// }

// export default new AuthService();


























import axios from "axios";

const API_URL = "http://183.182.84.228:4005/api/auth/";



class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      })
      .catch(error => {
        throw error.response.data.message || error.message || error.toString();
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, rolename) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      rolename
    });
  }
  changePassword(username, oldPassword, newPassword, changePassword) {
    return axios.post(API_URL + "change-password", {
      username,
      oldPassword,
      newPassword,
      changePassword
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error.response.data.message || error.message || error.toString();
    });
  }
  

  forgotPassword(email) {
    return axios
      .post(API_URL + "forgotPassword", {
        email,
  
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response.data.message || error.message || error.toString();
      });
  }

  

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  userHasRole(role) {
    const user = this.getCurrentUser();
    return user && user.roles && user.roles.includes(role);
  }

  getAll() {
    // Implement method to fetch all users (if needed)
  }


  updateUserDetails(userDetails) {
    return axios
      .put(API_URL + "updateUserDetails", userDetails)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response.data.message || error.message || error.toString();
      });
  }
  
  updateUserEmail(username, newEmail) {
    return axios
      .put(API_URL + "updateUserEmail", { username, newEmail })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response.data.message || error.message || error.toString();
      });
  }

  getAllUsers() {
    return axios
      .get(API_URL + "users")
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response.data.message || error.message || error.toString();
      });
  }

  updateUserRole(username, newRole) {
    return axios
      .put(API_URL + "updateUserRole", { username, newRole })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response.data.message || error.message || error.toString();
      });
  }


  updateUserViewableUsers(username, viewableUsers) {
    return axios
      .put(API_URL + "updateUserViewableUsers", { username, viewableUsers })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response.data.message || error.message || error.toString();
      });
  }

  updateUserRemark(UCC,ISIN, user_rem,user_data,user_date) {
    return axios
      .put(API_URL + "updateUserRemark", { UCC,ISIN, user_rem ,user_data,user_date })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response.data.message || error.message || error.toString();
      });
  }
  editUserRemark(id, user_rem , user_data,user_date) {
    return axios
      .put(API_URL + "editUserRemark", { id, user_rem , user_data,user_date })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response.data.message || error.message || error.toString();
      });
  }

  getAllRemark() {
    return axios
      .get(API_URL + "remark")
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response.data.message || error.message || error.toString();
      });
  }







  updateUserOption(kslucc,Name,Pan,user_option,user_rem,dphold,krastatus) {
    return axios
      .put(API_URL + "updateUserOption", { kslucc,Name,Pan,user_option,user_rem,dphold,krastatus })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response.data.message || error.message || error.toString();
      });
  }




  editUserOption(id,user_option,user_rem) {
    return axios
      .put(API_URL + "editUserOption", { id,user_option,user_rem })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response.data.message || error.message || error.toString();
      });
  }




  getAllOption() {
    return axios
      .get(API_URL + "option")
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response.data.message || error.message || error.toString();
      });
  }



}

export default new AuthService();





























// import axios from "axios";

// const API_URL = "http://183.182.84.228:4005/api/auth/";



// class AuthService {
//   login(username, password) {
//     return axios
//       .post(API_URL + "signin", {
//         username,
//         password
//       })
//       .then(response => {
//         if (response.data.accessToken) {
//           localStorage.setItem("user", JSON.stringify(response.data));
//         }

//         return response.data;
//       })
//       .catch(error => {
//         throw error.response.data.message || error.message || error.toString();
//       });
//   }

//   logout() {
//     localStorage.removeItem("user");
//   }

//   register(username, email, password, rolename) {
//     return axios.post(API_URL + "signup", {
//       username,
//       email,
//       password,
//       rolename
//     });
//   }
//   changePassword(username, oldPassword, newPassword, changePassword) {
//     return axios.post(API_URL + "change-password", {
//       username,
//       oldPassword,
//       newPassword,
//       changePassword
//     })
//     .then(response => {
//       return response.data;
//     })
//     .catch(error => {
//       throw error.response.data.message || error.message || error.toString();
//     });
//   }
  

//   forgotPassword(email) {
//     return axios
//       .post(API_URL + "forgotPassword", {
//         email,
  
//       })
//       .then(response => {
//         return response.data;
//       })
//       .catch(error => {
//         throw error.response.data.message || error.message || error.toString();
//       });
//   }

  

//   getCurrentUser() {
//     return JSON.parse(localStorage.getItem('user'));
//   }

//   getAll() {
//     // Implement method to fetch all users (if needed)
//   }


//   updateUserDetails(userDetails) {
//     return axios
//       .put(API_URL + "updateUserDetails", userDetails)
//       .then(response => {
//         return response.data;
//       })
//       .catch(error => {
//         throw error.response.data.message || error.message || error.toString();
//       });
//   }
  
//   updateUserEmail(username, newEmail) {
//     return axios
//       .put(API_URL + "updateUserEmail", { username, newEmail })
//       .then(response => {
//         return response.data;
//       })
//       .catch(error => {
//         throw error.response.data.message || error.message || error.toString();
//       });
//   }

//   updateUserRole(username, newRole) {
//     return axios
//       .put(API_URL + "updateUserRole", { username, newRole })
//       .then(response => {
//         return response.data;
//       })
//       .catch(error => {
//         throw error.response.data.message || error.message || error.toString();
//       });
//   }

//   updateUserRemark(UCC,ISIN,kslucc,SCRIP,OPN_PF_QTY,CLS_PF_QTY,HOLDING_QTY,DIFF,NO_OF_DIFF,user_rem,user_data,user_date) {
//     return axios
//       .put(API_URL + "updateUserRemark", { UCC, ISIN,	kslucc,	SCRIP,	OPN_PF_QTY,	CLS_PF_QTY,	HOLDING_QTY,	DIFF,	NO_OF_DIFF, user_rem ,user_data,user_date })
//       .then(response => {
//         return response.data;
//       })
//       .catch(error => {
//         throw error.response.data.message || error.message || error.toString();
//       });
//   }
//   editUserRemark(id, user_rem , user_data,user_date) {
//     return axios
//       .put(API_URL + "editUserRemark", { id, user_rem , user_data,user_date })
//       .then(response => {
//         return response.data;
//       })
//       .catch(error => {
//         throw error.response.data.message || error.message || error.toString();
//       });
//   }

//   getAllUsers() {
//     return axios
//       .get(API_URL + "users")
//       .then(response => {
//         return response.data;
//       })
//       .catch(error => {
//         throw error.response.data.message || error.message || error.toString();
//       });
//   }




// }

// export default new AuthService();
