import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../components/context/authUserContext";
import toast, { Toaster } from "react-hot-toast";

const settings = {
  loading: 'Saving...',
  save: <b>Settings saved!</b>,
  error: <b>Could not save.</b>,
}

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConf, setPassConf] = useState("");

  const router = useRouter();

  const { createUserWithEmailAndPassword } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    //check if passwords match. If they do, create user in Firebase
    // and redirect to mainboard page.
    if (password !== passConf) {
      toast.error("Password and password confirmation does not match");
      setPassword("");
      setPassConf("");
      return null;
    }

    createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log("Success. The user is created in Firebase");
        toast.success("Success!")
        //if a new user - push to profile page, if not - main board
        if (authUser.additionalUserInfo.isNewUser) {
          router.push("/profilepage");
        } else {
          router.push("/mainBoard");
        }
      })
      // An error occurred. Set error message to be displayed to user
      .catch((err) => {
        console.log(err.code, err.message);
        toast.error(err.message);
      });
  };

  return (
    <div>
      <h1>Join our community</h1>
      <Toaster />
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
