import React from "react";
import { useAuthState } from "../context/AuthContext";
function ProfilePage() {
  var { currentUser } = useAuthState();
  return (
    <div>
      <h1>This is the profile page</h1>
      <p>It can only be viewed when the user has been authenticated</p>
      <h2>Current user information:</h2>
      <p>
        Id: {currentUser.id}
      </p>
      <p>
        Username: {currentUser.username}
      </p>
    </div>
  );
}

export default ProfilePage;
