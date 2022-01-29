import { useState } from "react";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../components/context/authUserContext";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInWithEmailAndPassword } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(email, password)
      .then(() => {
        router.push("/mainBoard");
      })
      .catch((err) => {
        console.log(err.code, err.message);
        toast.error(err.message);
      });
  };

  return (
    <div>
      <h1>Login Here</h1>
      <Toaster />
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          placeholder="Email"
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Password"
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;
