import React from 'react';
import Home from './Landing/Home';
import SignIn from './Landing/SignIn';
import SignUp from './Landing/SignUp';
import ForgotPassword from './Landing/ForgotPassword';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import PrivateRoute from "./auth/PrivateRoute";
import {AuthProvider} from "./auth/Auth";

function App() {
  return (
    <AuthProvider>
        <div className="App">
            <Router>
                <Route exact path="/" component={Home} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/forgotpassword" component={ForgotPassword} />
            </Router>
        </div>
    </AuthProvider>
  );
}

export default App;
