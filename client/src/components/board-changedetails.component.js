// import React, { useState, useEffect } from 'react';
// import AuthService from '../services/auth.service';




// const UserTable = ({ users, onEdit }) => {
//   const [editOption, setEditOption] = useState(null);

//   const handleEditOptionChange = (option) => {
//     setEditOption(option);
//   };

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Username</th>
//           <th>Email</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map((user) => (
//           <tr key={user.id}>
//             <td>{user.username}</td>
//             <td>{user.email}</td>
//             <td>
//               <div>
//                 <select value={editOption} onChange={(e) => handleEditOptionChange(e.target.value)}>
//                   <option value="">Select Option</option>
//                   <option value="email">Edit Email</option>
//                   <option value="password">Change Password</option>
//                 </select>
//               </div>
//               <button onClick={() => onEdit(user, editOption)}>Edit</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };


// const EditUserEmailForm = ({ user, onUpdate }) => {
//   const [email, setEmail] = useState(user.email);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onUpdate({ ...user, email });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Email:
//         <input value={email} onChange={(e) => setEmail(e.target.value)} />
//       </label>
//       <button type="submit">Update Email</button>
//     </form>
//   );
// };

// const EditUserPasswordForm = ({ user, onUpdate }) => {
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onUpdate({ ...user, oldPassword, newPassword });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Old Password:
//         <input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} type="password" />
//       </label>
//       <label>
//         New Password:
//         <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" />
//       </label>
//       <button type="submit">Update Password</button>
//     </form>
//   );
// };



// const ParentComponent = () => {
//   const [users, setUsers] = useState([]);
//   const [editingUser, setEditingUser] = useState(null);
//   const [editOption, setEditOption] = useState(null);

//   useEffect(() => {
//     // Fetch data from the database when the component mounts
//     AuthService.getAllUsers()
//       .then((data) => setUsers(data))
//       .catch((error) => console.error('Error:', error));
//   }, []);

//   const handleEdit = (user, option) => {
//     setEditingUser(user);
//     setEditOption(option);
//   };

//   const handleUpdate = (updatedUser) => {
//     if (editOption === 'email') {
//       // Call the API to update email
//       AuthService.updateUserEmail(updatedUser.username, updatedUser.email)
//         .then(data => {
//           // Update the state with the updated user
//           setUsers(users.map((user) => (user.id === data.id ? data : user)));
//           setEditingUser(null);
//           setEditOption(null);
//         })
//         .catch(error => {
//           console.error('Error updating email:', error);
//         });
//     } else if (editOption === 'password') {
//       // Call the API to update password
//       AuthService.changePassword(updatedUser.username, updatedUser.oldPassword, updatedUser.newPassword)
//         .then(data => {
//           // Handle success
//           console.log('Password updated:', data);
//           setEditingUser(null);
//           setEditOption(null);
//         })
//         .catch(error => {
//           // Handle error
//           console.error('Error updating password:', error);
//         });
//     }
//   };

//   return (
//     <div>
//       <UserTable users={users} onEdit={handleEdit} />
//       {editingUser && editOption && (
//         <>
//           {editOption === 'email' && (
//             <EditUserEmailForm user={editingUser} onUpdate={handleUpdate} />
//           )}
//           {editOption === 'password' && (
//             <EditUserPasswordForm user={editingUser} onUpdate={handleUpdate} />
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default ParentComponent;














import React, { useState, useEffect } from 'react';
import AuthService from '../services/auth.service';

const UserDetails = ({ user, onEdit }) => {
  const handleEdit = () => {
    onEdit(user);
  };

  return (
    <div>
      <h2>User Detail</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

const EditUserForm = ({ user, onUpdate }) => {
  const [editOption, setEditOption] = useState('email');
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editOption === 'email') {
      onUpdate({ ...user, email }, editOption, setEditOption);
    } else {
      onUpdate({ ...user, oldPassword, newPassword }, editOption, setEditOption);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          <input
            type="radio"
            value="email"
            checked={editOption === 'email'}
            onChange={() => setEditOption('email')}
          />
          Edit Email
        </label>
        <label>
          <input
            type="radio"
            value="password"
            checked={editOption === 'password'}
            onChange={() => setEditOption('password')}
          />
          Change Password
        </label>
      </div>
      {editOption === 'email' ? (
        <div>
          <label>
            Email:
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>
      ) : (
        <div>
          <label>
            Old Password:
            <input
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
            />
          </label>
          <label>
            New Password:
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
            />
          </label>
        </div>
      )}
      <button type="submit">Update</button>
    </form>
  );
};

const ParentComponent = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch data from the database when the component mounts
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
        .catch(error => {
          console.error('Error updating email:', error);
        });
    } else if (editOption === 'password') {
      AuthService.changePassword(updatedUser.username, updatedUser.oldPassword, updatedUser.newPassword)
        .then(data => {
          console.log('Password updated:', data);
          setEditMode(false);
          setEditOption(null);
        })
        .catch(error => {
          console.error('Error updating password:', error);
        });
    }
  };

  return (
    <div>
      {selectedUser ? (
        <>
          {!editMode ? (
            <>
            <button onClick={handleBackToList}>Back</button>
            <UserDetails user={selectedUser} onEdit={handleEdit} />
            </>
          ) : (
            <>
              <button onClick={handleBackToList}>Back</button>
              <EditUserForm user={selectedUser} onUpdate={handleUpdate} />
            </>
          )}
        </>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleDetail(user)}>Detail</button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ParentComponent;
