import React from 'react';
import './Users.css';

const Users = ({ initials,total }) => {
  const gradientColor2 = `linear-gradient(135deg, #2193b0, #6dd5ed)`;

  return (
    <div className="user-avatar" style={{ background: gradientColor2, width:`${100}%`, borderRadius:'5px'}}>
      {initials}
    </div>
  );
};

export default Users;
