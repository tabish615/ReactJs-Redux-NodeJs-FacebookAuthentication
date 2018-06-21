import React, { Component } from 'react';
import AuthMiddleware from '../../store/middleware/authMiddleware';
import AuthActions from '../../store/actions/authActions';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            loader : false
        };
    }

    submission(e){
        e.preventDefault();
        let { name, email, password } = this.state;
        this.props.signup(name, email, password);
        this.setState({
            loader : true
        })
    }

    componentWillReceiveProps(nextprops) {
        console.log(nextprops);
        if (nextprops.state.user) {
            this.props.history.push('/home');
            this.setState({
                loader : false
            })
        }
    }

    render() {
        return (
            <div className={this.state.loader ? "loaderBlock" : ''}>
                <div className="loaderPosition">
                <div className="loader" style={this.state.loader ? {display : "block"} : {display : 'none'}}>
                </div> 
            </div>
                <form style={this.state.loader ? {display : "none"} : {display : 'block'}}>
                    <fieldset className="Input" >
                        <h1><strong>SignUp</strong></h1>
                        <input className="check" type="text" required="required" placeholder="Enter Your Name"
                            onChange={e => this.setState({ name: e.target.value })} />
                        <br /><br />
                        <input className="check" type="text" required="required" placeholder="Enter Your Email" ref="email"
                            onChange={e => this.setState({ email: e.target.value })} />
                        <br /><br />
                        <input  className="check" type="password" required="required" placeholder="Enter Your Password" ref="password"
                            onChange={e => this.setState({ password: e.target.value })} />
                        <br /><br /><br />
                        <input className="sbtn" type="submit" value="Signup" onClick={this.submission.bind(this)} />
                    </fieldset>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: state,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signup: (name, email, password) => dispatch(AuthMiddleware.signupMiddleware(name, email, password))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);