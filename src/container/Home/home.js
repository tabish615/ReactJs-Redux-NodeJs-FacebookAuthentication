import React, { Component } from 'react';
import AuthMiddleware from '../../store/middleware/authMiddleware';
import AuthActions from '../../store/actions/authActions';
import { connect } from 'react-redux';
import * as firebase from 'firebase'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            user: null
        }
    }

    componentWillReceiveProps(nextprops) {
        console.log(nextprops);
        if (nextprops.fbState && nextprops.fbState.user) {
            this.setState({
                user: nextprops.fbState.user
            })
        }
        else {
           this.props.history.push('/');
        }
    }
    componentDidMount() {
        if (this.props.fbState && this.props.fbState.user) {
            this.setState({
                user: this.props.fbState.user
            })
        }
    }
    logout() {
        this.props.logout();
    }

    render() {
        return (
            <div style={{ position: "absolute", left: "40%", top: "30%", textAlign: "center" }}>
                <div>
                    <img src={this.state.user ? this.state.user.data.picture : ""} />
                    <hr />
                    <h2>
                        Welcome, {this.state.user ? this.state.user.data.name : ""}!
                </h2>
                    <p>Email : {this.state.user ? this.state.user.data.email : ""}</p>
                    {/* <button onClick={this.logout.bind(this)}>Logout</button> */}
                    <button onClick={() => this.props.fblogout()}>Logout</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        state: state.authReducer,
        fbState: state,
        loader: state.isLoading,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(AuthMiddleware.logoutMiddleware()),
        user: (user) => dispatch(AuthActions.Signin(user)),
        fblogout: () => dispatch(AuthMiddleware.fblogoutMiddleware())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);