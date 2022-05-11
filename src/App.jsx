import { signInWithGoogle } from "./Firebase";
import {getAuth,signOut, onAuthStateChanged} from "firebase/auth";
import { useEffect, useState } from "react";
import app from "./Firebase"

function App() {
  const[profile,setProfile]=useState({})
  const [islogin,setIslogin]=useState(false)
 
 
useEffect(()=>{
  const auth =getAuth()
  onAuthStateChanged(auth,function(user){
    console.log(user)
    if(user){
      const{displayName,email,photoURL}=user
      setProfile({"name":displayName,email,"image":photoURL})
      setIslogin(true)
      //console.log(profile)
    }
  })

  
},[])
const logout=()=>{
  const auth = getAuth();
  signOut(auth).then(() => {
    setIslogin(false)
    setProfile({})
  }).catch((error) => {
    // An error happened.
  });
}


  return (
    <div className="App">
     { islogin? <button onClick={logout}>logout</button>:<button  onClick={signInWithGoogle}>
        Sign in with Google
      </button>} 
      {/* <h3>{localStorage.getItem("name")}</h3>
      <h3>{localStorage.getItem("email")}</h3>
      <img src={localStorage.getItem("profilePic")} /> */}
      <h3>{profile.name}</h3>
      <h3>{profile.email}</h3>
      <h3><img src={profile.image}/></h3>
      {/* <button onClick={()=>app.auth.signOut}>Logout</button> */}
     
    </div>
  );
}

export default App;