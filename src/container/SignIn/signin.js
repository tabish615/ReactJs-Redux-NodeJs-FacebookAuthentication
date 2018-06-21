import React, { Component } from 'react';
import AuthMiddleware from '../../store/middleware/authMiddleware';
import AuthActions from '../../store/actions/authActions';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { Images } from "../../config";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loader : false
        };
    }

    componentDidMount(){
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        window.fbAsyncInit = function() {
            window.FB.init({
                appId : 232064780897684,
                // appSecret : ,
                cookie : true,
                xfbml : true,
                version : 'v3.0'
            });
        };
    }
    
    submission (e) {
        if(this.state.email !== "" && this.state.password !== "") {
        e.preventDefault();
        let { email ,password } = this.state;
        this.props.signin(email, password);
        this.setState({
            loader : true
        })
        }
    }

    // facebookSignIn () {
    //     var provider = new firebase.auth.FacebookAuthProvider();
    //     firebase.auth().signInWithPopup(provider).then(function(result) {
    //         var user = firebase.auth().currentUser;
    //         console.log(result);
    //         if (result.additionalUserInfo.isNewUser) {
    //           let data = {
    //             name : user.displayName,
    //             email: user.email,
    //           }
    //           console.log(data);
    //           firebase.database().ref(`users/${user.uid}`).set(data)
    //         }
    //     }, this.props.history.push('/home'))
    //     .catch(function(err) {
    //         console.log(err);
    //     })
    // }

    componentWillReceiveProps(nextprops) {
        console.log(nextprops);
        if(nextprops.user.user){
            this.props.history.push('/home');
            this.setState({
                loader : false
            })
        }
        if(nextprops.error){
            this.setState({
                loader : false
            })
        }
    }

    render() {
        return (
            <div className={this.props.loader ? "loaderBlock" : ''} >
            <div className="loaderPosition">
                <div className="loader" style={this.props.loader ? {display : "block"} : {display : 'none'}}>
                </div> 
            </div>                    
                <form>
                {/* style={this.state.loader ? {display : "none"} : {display : 'block'}} */}
                    <fieldset className="Input">
                        <h2><strong>SignIn</strong></h2>
                        <input className="check" type="email" required="required" placeholder="Enter Your Email"
                            onChange={e => this.setState({ email: e.target.value })} />
                        <br /><br />
                        <input className="check" type="password" required="required" placeholder="Enter Your Password"
                            onChange={e => this.setState({ password: e.target.value })} />
                        <br /><br /><br />
                        <input className="sbtn" type="submit" value="Sign In" onClick={this.submission.bind(this)} />
                        <br /><br /><br />
                        {/* <img src={Images.signInFbBtn} width="310" height="50" onClick={this.facebookSignIn.bind(this)} /> */}
                        {/* <input className="sbtn" type="submit" value="Sign In Using Facebook" onClick={this.facebookSignIn.bind(this)} /> */}
                        <img src={Images.signInFbBtn} width="310" height="50" title="facebook login" alt="facebook" onClick={ () => {this.props.fbsignin();this.props.clearstate()}} />
                    </fieldset>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        user: state,
        error : state.iserror,
        loader : state.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fbsignin : () => {dispatch(AuthMiddleware.fbsigninMiddleware())},
        clearstate : () => {dispatch(AuthActions.ClearState())},
        signin: (email, password) => { dispatch(AuthMiddleware.signinMiddleware(email, password)) }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);