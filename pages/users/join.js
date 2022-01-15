import { useState } from "react";
import fire, {db} from "../../config/fire-config";
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { useRouter } from "next/router";


const Register = () => {
  const router = useRouter();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passConf, setPassConf] = useState("");
  const [notification, setNotification] = useState("");
console.log(db)

  const handleLogin = (e) => {
    e.preventDefault();
    if (password !== passConf) {
      setNotification("Password and password confirmation does not match");
      setTimeout(() => {
        setNotification("");
      }, 2000);
      setPassword("");
      setPassConf("");
      return null;
    }
    fire
      .auth()
      .createUserWithEmailAndPassword(userName, password)
      .then(cred => {
        console.log(cred)
        return db.collection('users').addDoc(cred.user.uid).set({
          test: 'testing'
        })
      })
      .catch((err) => {
        console.log(err.code, err.message);
      });
    router.push("/mainBoard");
  };
  return (

      <div>
        <h1>Join our community</h1>
        {notification}
        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <input
            type="text"
            value={userName}
            onChange={({ target }) => setUsername(target.value)}
            placeholder="Email"
            required
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Password"
            required
          />
          <br />
          <label>Password conf:</label>
          <input
            type="password"
            value={passConf}
            onChange={({ target }) => setPassConf(target.value)}
            placeholder="Confirm password"
          />
          <br />
          <button type="submit">Register</button>
        </form>
      </div>
    
  );
};
export default Register;
