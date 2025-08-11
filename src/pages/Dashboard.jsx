import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const auth = getAuth();
  const { currentUser } = useAuth();
  console.log(currentUser);
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User sign out");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  return (
    <div>
      <div className="p-2 border rounded"> hello {currentUser.displayName}</div>
      <button className="m-2 block bg-blue-400" onClick={handleLogOut}>
        log out
      </button>
    </div>
  );
};

export default Dashboard;
