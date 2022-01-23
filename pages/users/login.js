import { useState } from "react";
import { useRouter } from "next/router";

import { useAuth } from "../../components/context/authUserContext";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notify, setNotification] = useState(null);

  const { signInWithEmailAndPassword } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        router.push("/mainBoard");
      })
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
      <h1>Login Here</h1>
      {notify}
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          placeholder="Email"
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Password"
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;
