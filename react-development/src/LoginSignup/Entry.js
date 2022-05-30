import { Route, Routes } from 'react-router-dom';
import boris from './images/boris.jpg'
import Copyrights from './Copyrights/Copyrights';
import Login from './Login';
import Signup from './Signup';
import './index.css'

function Entry() {
    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="imageParent col-md-9 col-lg-6 col-xl-5">
                        <img src={boris} className="roundImg img-fluid img-thumbnail" alt="Could not load this"></img>
                    </div>
                    <div className="parentForm col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <Routes>
                            <Route path="/" element={<Login />}></Route>
                            <Route path="/signup" element={<Signup />}></Route>
                        </Routes>
                        <br></br><br></br>
                    </div>
                </div>
            </div>
            <div>&nbsp;&nbsp;&nbsp;
                <a href='http://localhost:5116/' className='rate btn btn-primary'>Rate us</a>
            </div>
            <Copyrights />
        </section>
    );
}

export default Entry;