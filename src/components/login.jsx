import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("shru@123.com");
  const [password, setPassword] = useState("@Shru123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId: emailId,
          password: password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data?.user));
      return navigate("/");
    } catch (err) {
      setError(
        err.response?.data ? err.response?.data : "Something went wrong!"
      );
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName: firstName,
          lastName: lastName,
          emailId: emailId,
          password: password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data?.data));
      return navigate("/profile");
    } catch (err) {
      setError(
        err.response?.data ? err.response?.data : "Something went wrong!"
      );
    }
  };

  return (
    <div className="flex justify-center my-10 ">
      <div className="card bg-neutral w-96 shadow-sm">
        <div className="card-body ">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "SignUp"}
          </h2>
          <div>
            <fieldset className="fieldset">
              {!isLoginForm && (
                <>
                  <input
                    type="text"
                    className="input"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    className="input"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </>
              )}
              <input
                type="text"
                className="input"
                placeholder="Email ID"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "SignUp"}
            </button>
          </div>

          <p
            className="text-center font-bold cursor-pointer py-2"
            onClick={() => {
              setIsLoginForm(!isLoginForm);
              setError("");
              setEmailId("");
              setPassword("");
            }}
          >
            {isLoginForm
              ? "New User? Sign-up here"
              : "Existing user? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
