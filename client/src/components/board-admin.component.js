// import React, { Component } from "react";

// import UserService from "../services/user.service";
// import EventBus from "../common/EventBus";

// export default class BoardAdmin extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       content: ""
//     };
//   }

//   componentDidMount() {
//     UserService.getAdminBoard().then(
//       response => {
//         this.setState({
//           content: response.data
//         });
//       },
//       error => {
//         this.setState({
//           content:
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString()
//         });

//         if (error.response && error.response.status === 401) {
//           EventBus.dispatch("logout");
//         }
//       }
//     );
//   }

//   render() {
//     return (
//       <div className="container">
//         <header className="jumbotron">
//           <h3>{this.state.content}</h3>
//           sdbshydfb
//         </header>
//       </div>
//     );
//   }
// }













// import React, { Component } from "react";
// import UserService from "../services/user.service";
// import EventBus from "../common/EventBus";

// export default class BoardAdmin extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       users: []
//     };
//   }

//   componentDidMount() {
//     UserService.getUsers().then(
//       response => {
//         this.setState({
//           users: response.data
//         });
//       },
//       error => {
//         if (error.response && error.response.status === 401) {
//           EventBus.dispatch("logout");
//         }
//       }
//     );
//   }

//   render() {
//     return (
//       <div className="container">
//         <header className="jumbotron">
//           <h3>All Users</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//               </tr>
//             </thead>
//             <tbody>
//               {this.state.users.map((user, index) => (
//                 <tr key={index}>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </header>
//       </div>
//     );
//   }
// }
























import React, { useState, useEffect } from 'react';
import AuthService from '../services/auth.service'; // Assuming AuthService handles the backend API calls

const UserDetails = ({ user, onEdit }) => {
  const handleEdit = () => {
    onEdit(user);
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
      <h2 style={{ fontSize: '1.5rem', color: '#333' }}>User Detail</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.rolename}</p>
      <p><strong>Viewable Users:</strong> {user.viewableUsers}</p>
      <button 
        onClick={handleEdit} 
        style={{
          padding: '10px 20px', 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer'
        }}>
        Edit
      </button>
    </div>
  );
};

const EditUserForm = ({ user, onUpdate, allUsers }) => {
  const [editOption, setEditOption] = useState('email');
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [role, setRole] = useState(user.role);
  const [canView, setCanView] = useState(
    Array.isArray(user.viewableUsers) ? user.viewableUsers.join(', ') : ''
  );
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedUsernames = canView.split(',').map(username => username.trim()).filter(Boolean);
    const updatedUser = { 
      ...user, 
      email, 
      oldPassword, 
      newPassword, 
      role, 
      viewableUsers: selectedUsernames 
    };
    onUpdate(updatedUser, editOption, setEditOption);
  };

  const filteredUsers = allUsers
    .filter(u => u.rolename === 'sub_moderator')
    .filter(u => u.username.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <form onSubmit={handleSubmit} style={{ background: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>
          <input
            type="radio"
            value="email"
            checked={editOption === 'email'}
            onChange={() => setEditOption('email')}
          />
          Edit Email
        </label>
        <label style={{ marginRight: '10px' }}>
          <input
            type="radio"
            value="password"
            checked={editOption === 'password'}
            onChange={() => setEditOption('password')}
          />
          Change Password
        </label>
        <label style={{ marginRight: '10px' }}>
          <input
            type="radio"
            value="role"
            checked={editOption === 'role'}
            onChange={() => setEditOption('role')}
          />
          Change Role
        </label>
        <label>
          <input
            type="radio"
            value="viewableUsers"
            checked={editOption === 'viewableUsers'}
            onChange={() => setEditOption('viewableUsers')}
          />
          Manage Users They Can View
        </label>
      </div>

      {editOption === 'viewableUsers' && (
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px' }}>Viewable Users (comma-separated):</label>
          <input
            type="text"
            placeholder="Enter usernames, separated by commas"
            value={canView}
            onChange={(e) => {
              setCanView(e.target.value);
              setSearchTerm(e.target.value);
            }}
            list="usernames"
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <datalist id="usernames">
            {filteredUsers.map((u) => (
              <option key={u.username} value={u.username}>
                {u.username}
              </option>
            ))}
          </datalist>
        </div>
      )}

      {editOption === 'email' && (
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Email:
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </label>
        </div>
      )}

      {editOption === 'password' && (
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Old Password:
            <input
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </label>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            New Password:
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </label>
        </div>
      )}

      {editOption === 'role' && (
        <div style={{ marginBottom: '20px' }}>
          <label>
            Role:
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="sub_admin">Sub Admin</option>
              <option value="user">User</option>
              <option value="moderator">Broker</option>
              <option value="sub_moderator">Sub Broker</option>
            </select>
          </label>
        </div>
      )}

      <button 
        type="submit" 
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer' 
        }}>
        Update
      </button>
    </form>
  );
};

const ParentComponent = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState(''); // New state for role filter

  useEffect(() => {
    AuthService.getAllUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleDetail = (user) => {
    setSelectedUser(user);
    setEditMode(false);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditMode(true);
  };

  const handleBackToList = () => {
    setSelectedUser(null);
    setEditMode(false);
  };

  const handleUpdate = (updatedUser, editOption, setEditOption) => {
    if (editOption === 'email') {
      AuthService.updateUserEmail(updatedUser.username, updatedUser.email)
        .then(data => {
          setUsers(users.map((user) => (user.id === data.id ? data : user)));
          setEditMode(false);
          setEditOption(null);
        })
        .catch(error => console.error('Error updating email:', error));
    } else if (editOption === 'password') {
      AuthService.changePassword(updatedUser.username, updatedUser.oldPassword, updatedUser.newPassword)
        .then(() => {
          setEditMode(false);
          setEditOption(null);
        })
        .catch(error => console.error('Error changing password:', error));
    } else if (editOption === 'role') {
      AuthService.updateUserRole(updatedUser.username, updatedUser.role)
        .then(() => {
          setUsers(users.map((user) =>
            user.username === updatedUser.username
              ? { ...user, role: updatedUser.role }
              : user
          ));
          setEditMode(false);
          setEditOption(null);
        })
        .catch(error => console.error('Error updating role:', error));
    } else if (editOption === 'viewableUsers') {
      AuthService.updateUserViewableUsers(updatedUser.username, updatedUser.viewableUsers)
        .then(() => {
          setUsers(users.map((user) =>
            user.username === updatedUser.username
              ? { ...user, viewableUsers: updatedUser.viewableUsers }
              : user
          ));
          setEditMode(false);
          setEditOption(null);
        })
        .catch(error => console.error('Error updating viewable users:', error));
    }
  };

  // Filter the users based on search term and selected role
  const filteredUsers = users
    .filter(user => 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRole === '' || user.rolename === selectedRole)
    );

  // Get unique roles for the dropdown
  const uniqueRoles = [...new Set(users.map(user => user.rolename))];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', color: '#333', marginBottom: '20px' }}>User Management</h1>

      {!selectedUser && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#333' }}>User List</h2>
          
          {/* Search by username */}
          <input
            type="text"
            placeholder="Search by username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '10px', width: '100%', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          
          {/* Role Filter */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            style={{ padding: '10px', width: '100%', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="">All Roles</option>
            {uniqueRoles.map(role => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          {filteredUsers.map(user => (
            <div key={user.username} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '10px', marginBottom: '20px', cursor: 'pointer' }} onClick={() => handleDetail(user)}>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.rolename}</p>
            </div>
          ))}
        </div>
      )}

      {selectedUser && !editMode && (
        <>
          <UserDetails user={selectedUser} onEdit={handleEdit} />
          <button 
            onClick={handleBackToList} 
            style={{
              padding: '10px 20px', 
              backgroundColor: '#f44336', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer'
            }}>
            Back to List
          </button>
        </>
      )}

      {selectedUser && editMode && (
        <>
          <EditUserForm user={selectedUser} onUpdate={handleUpdate} allUsers={users} />
          <button 
            onClick={handleBackToList} 
            style={{
              padding: '10px 20px', 
              backgroundColor: '#f44336', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer', 
              marginTop: '20px'
            }}>
            Cancel Edit
          </button>
        </>
      )}
    </div>
  );
};

export default ParentComponent;

































// import React, { useState, useEffect } from 'react';
// import AuthService from '../services/auth.service';

// const UserDetails = ({ user, onEdit }) => {
//   const handleEdit = () => {
//     onEdit(user);
//   };

//   return (
//     <div>
//       <h2>User Detail</h2>
//       <p>Username: {user.username}</p>
//       <p>Email: {user.email}</p>
//       <button onClick={handleEdit}>Edit</button>
//     </div>
//   );
// };

// const EditUserForm = ({ user, onUpdate }) => {
//   const [editOption, setEditOption] = useState('email');
//   const [email, setEmail] = useState(user.email);
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editOption === 'email') {
//       onUpdate({ ...user, email }, editOption, setEditOption);
//     } else {
//       onUpdate({ ...user, oldPassword, newPassword }, editOption, setEditOption);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>
//           <input
//             type="radio"
//             value="email"
//             checked={editOption === 'email'}
//             onChange={() => setEditOption('email')}
//           />
//           Edit Email
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="password"
//             checked={editOption === 'password'}
//             onChange={() => setEditOption('password')}
//           />
//           Change Password
//         </label>
//       </div>
//       {editOption === 'email' ? (
//         <div>
//           <label>
//             Email:
//             <input value={email} onChange={(e) => setEmail(e.target.value)} />
//           </label>
//         </div>
//       ) : (
//         <div>
//           <label>
//             Old Password:
//             <input
//               value={oldPassword}
//               onChange={(e) => setOldPassword(e.target.value)}
//               type="password"
//             />
//           </label>
//           <label>
//             New Password:
//             <input
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               type="password"
//             />
//           </label>
//         </div>
//       )}
//       <button type="submit">Update</button>
//     </form>
//   );
// };

// const ParentComponent = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);

//   useEffect(() => {
//     // Fetch data from the database when the component mounts
//     AuthService.getAllUsers()
//       .then((data) => setUsers(data))
//       .catch((error) => console.error('Error:', error));
//   }, []);

//   const handleDetail = (user) => {
//     setSelectedUser(user);
//     setEditMode(false);
//   };

//   const handleEdit = (user) => {
//     setSelectedUser(user);
//     setEditMode(true);
//   };

//   const handleBackToList = () => {
//     setSelectedUser(null);
//     setEditMode(false);
//   };

//   const handleUpdate = (updatedUser, editOption, setEditOption) => {
//     if (editOption === 'email') {
//       AuthService.updateUserEmail(updatedUser.username, updatedUser.email)
//         .then(data => {
//           setUsers(users.map((user) => (user.id === data.id ? data : user)));
//           setEditMode(false);
//           setEditOption(null);
//         })
//         .catch(error => {
//           console.error('Error updating email:', error);
//         });
//     } else if (editOption === 'password') {
//       AuthService.changePassword(updatedUser.username, updatedUser.oldPassword, updatedUser.newPassword)
//         .then(data => {
//           console.log('Password updated:', data);
//           setEditMode(false);
//           setEditOption(null);
//         })
//         .catch(error => {
//           console.error('Error updating password:', error);
//         });
//     }
//   };

//   return (
//     <div>
//       {selectedUser ? (
//         <>
//           {!editMode ? (
//             <>
//             <button onClick={handleBackToList}>Back</button>
//             <UserDetails user={selectedUser} onEdit={handleEdit} />
//             </>
//           ) : (
//             <>
//               <button onClick={handleBackToList}>Back</button>
//               <EditUserForm user={selectedUser} onUpdate={handleUpdate} />
//             </>
//           )}
//         </>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Username</th>
//               <th>Email</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.username}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <button onClick={() => handleDetail(user)}>Detail</button>
                  
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ParentComponent;
