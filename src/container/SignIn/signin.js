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
            loader: false,
            id: false,
        };
    }

    submission(e) {
        if (this.state.email !== "" && this.state.password !== "") {
            e.preventDefault();
            let { email, password } = this.state;
            this.props.signin(email, password);
            this.setState({
                loader: true
            })
        }
    }

    update() {
        if (this.state.id) {
            const idTest = new RegExp("^[a-zA-Z][A-Za-z0-9_]*$");
            if (idTest.test(this.state.id)) {

                this.props.clearstate()
                let data = {
                    id: this.props.user.user.data._id,
                    panaCloud_id: { panaCloudId: this.state.id }
                }
                this.props.updateprofile(data)
            }
            else {
                alert("Id is incorrect");
            }
        }
        else {
            alert('Please Create ID')
        }
    }

    componentWillReceiveProps(nextprops) {
        console.log(nextprops);
        if (nextprops.user.user) {
            if (nextprops.user.user.data.panaCloudId) {
                this.props.history.push(`/${nextprops.user.user.data.panaCloudId}`);
            }
            else {
                console.log('else workingggggggggggggggggggggg')
                var aaa = document.getElementById("popup1")
                aaa.style.display = "block"
            }
        }
        if (nextprops.error) {
            this.setState({
                loader: false
            })
        }
        if (nextprops.update_error) {
            alert("This ID is already exist")
        }
    }

    render() {
        return (
            <div className={this.props.loader ? "loaderBlock" : ''} >
                <div className="loaderPosition">
                    <div className="loader" style={this.props.loader ? { display: "block" } : { display: 'none' }}>
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
                        <img src={Images.signInFbBtn} width="310" height="50" title="facebook login" alt="facebook" onClick={() => { this.props.fbsignin(); this.props.clearstate() }} />
                    </fieldset>
                </form>
                <div>
                    <div id="popup1" className="overlay">
                        <div className="popup">
                            <h2>Select Your Unique PanaCloud ID</h2><hr />
                            <p>1) ID should not contain charaters other then letter, number and underscore</p>
                            <p>2) ID can not starts with underscore or number</p>
                            <p>3) ID can not contains spaces</p>
                            <p>4) Examples: jhon, jhon_12, jhon_smith</p>
                            <div className="content">
                                <h5>PanaCloud ID :</h5>
                                <input type="text" onChange={(text) => this.setState({ id: text.target.value })} />
                            </div>
                            <button onClick={() => this.update()}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        user: state,
        error: state.iserror,
        loader: state.isLoading,
        update_error: state.updateError
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fbsignin: () => { dispatch(AuthMiddleware.fbsigninMiddleware()) },
        clearstate: () => { dispatch(AuthActions.ClearState()) },
        updateprofile: (data) => { dispatch(AuthMiddleware.updateprofileMiddleware(data)) },
        signin: (email, password) => { dispatch(AuthMiddleware.signinMiddleware(email, password)) }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);