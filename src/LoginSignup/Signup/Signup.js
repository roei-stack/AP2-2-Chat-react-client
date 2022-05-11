import InputTextBox from '../InputTextBox/InputTextBox';
import DividerText from '../DividerText/DividerText.js'
import { Link, useNavigate } from 'react-router-dom';
import SubmitBtn from '../SubmitBtn/SubmitBtn';
import ImageUpload from '../../ImageLib/ImageUpload';
import { useState, useEffect } from 'react';
import { attemptSignUp } from '../../data/data_base_for_noobs';


function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [urlImage, setUrlImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate());
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      navigate('/');
    }
  }, [errors])

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
    if (!nickname) {
      setNickname(username);
    }
    if (image && image['type'].split('/')[0] !== 'image') {
      // the file is not an image
      errors.image = "This does not look like an image, please try again!";
    }
    if (Object.keys(errors).length === 0) {
      // get authentication from remote
      if (!attemptSignUp(username, password, nickname, urlImage)) {
        errors.username = "This username already exists!";
      }
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
      <ImageUpload setValue={setImage} setUrl={setUrlImage} possibleError={errors.image} />
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