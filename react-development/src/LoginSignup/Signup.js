import InputTextBox from './InputTextBox';
import DividerText from './DividerText/DividerText.js'
import { Link, useNavigate } from 'react-router-dom';
import SubmitBtn from './SubmitBtn/SubmitBtn';
import { useState, useEffect } from 'react';

function Signup() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [status, setStatus] = useState(0);

  const signupRemote = async () => {
    if (!nickname) {
      setNickname(username)
    }
    const response = await fetch('https://localhost:7007/api/Users/Signup', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
        nickname: nickname
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
    setStatus(response.status);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate());
  };

  useEffect(() => {
    if (status === 200) {
      navigate('/');
    } else {
      errors.username = "This username already exists!";
    }
  }, [status])

  const validate = () => {
    var regexNumber = /\d/g;
    var regexLetter = /[a-zA-Z]/g;
    const errors = {};
    if (!username) {
      errors.username = "Username is reuired!";
    }
    if (!password || !regexNumber.test(password) || !regexLetter.test(password)) {
      errors.password = "Password must be non empty and contain a character and a letter!";
    }
    if (passwordConfirm !== password) {
      errors.passwordConfirm = "This feild must be the same as your password!";
    }
    if (Object.keys(errors).length === 0) {
      signupRemote();
    }
    return errors;
  }

  return (
    <form id="signupform" action="/" className="row g-3 box" onSubmit={handleSubmit}>
      <DividerText text="Sign up to BorisChats" />
      <InputTextBox type="text" id="username" placeholder="Username" setValue={setUsername} possibleError={errors.username} />
      <InputTextBox type="password" id="password" placeholder="Pasword" possibleError={errors.password} setValue={setPassword} />
      <InputTextBox type="password" id="passwordConfirm" placeholder="Confirm pasword" possibleError={errors.passwordConfirm} setValue={setPasswordConfirm} />
      <InputTextBox type="text" id="nickname" placeholder="Nickname" setValue={setNickname} />
      <SubmitBtn text="REGISTER"></SubmitBtn>
      <br></br>
      <div
        className="d-flex justify-content-center"
        id="switchBtn">
        Alreadsy have an account?&nbsp;
        <Link
          className="link-danger"
          to="/">
          Login
        </Link>
      </div>
    </form>
  );
}
export default Signup;
