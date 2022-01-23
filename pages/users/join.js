import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../components/context/authUserContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConf, setPassConf] = useState("");
  const [notification, setNotification] = useState("");

  const router = useRouter();

  const { createUserWithEmailAndPassword } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    //check if passwords match. If they do, create user in Firebase
    // and redirect to mainboard page.
    if (password !== passConf) {
      setNotification("Password and password confirmation does not match");
      setTimeout(() => {
        setNotification("");
      }, 2000);
      setPassword("");
      setPassConf("");
      return null;
    }

    createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log("Success. The user is created in Firebase");
        router.push("/mainBoard");
      })
      // An error occurred. Set error message to be displayed to user
      .catch((err) => {
        console.log(err.code, err.message);
        setNotification(err.message);
        setTimeout(() => {
          setNotification("");
        }, 2000);
      });
  };
  
  return (
    <div>
      <h1>Join our community</h1>
      {notification}
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
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
