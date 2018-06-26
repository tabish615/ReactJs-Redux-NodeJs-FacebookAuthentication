import AuthActions from '../actions/authActions';
import * as firebase from 'firebase';
import axios from 'axios';

class AuthMiddleware {

    static signinMiddleware(email, password) {
        return dispatch => {
            firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
                dispatch(AuthActions.Signin(data))
                console.log(data);
            }).catch((error) => {
                console.log(error);
            })
        };
    }

    static signupMiddleware(name, email, password) {
        return dispatch => {
            firebase.auth().createUserWithEmailAndPassword(email, password).then((data) => {
                dispatch(AuthActions.Signup(data))
                firebase.database().ref('users/').child(data.uid).set({
                    name: name,
                    email: email,
                    password: password,
                })
            }).catch((error) => {
                console.log(error);
            })
        };
    }

    static logoutMiddleware() {
        return dispatch => {
            firebase.auth().signOut().then(() => {
                dispatch(AuthActions.Logout())
            })
        };
    }

    static fbsigninMiddleware() {
        return dispatch => {
            function statusChangeCallback(response) {
                console.log(response);
                if (response.status === 'connected') {
                    axios.get("https://quiz---app.herokuapp.com/user", {
                        method: "GET",
                        headers: { asd: response.authResponse.accessToken }

                    }).then((responseUser) => {
                        console.log(responseUser)
                        responseUser.data.picture=responseUser.data.picture.data.url
                            axios.post("https://quiz---app.herokuapp.com/user/add",
                            responseUser.data
                            ).then((responseAdd)=>{
                                console.log(responseAdd)
                                dispatch(AuthActions.FbSignin(responseAdd.data))
                            }).catch(err => { console.log(err) })
                    }).catch(err => { console.log(err) })

                    fetchDataFacebook();


                } else if (response.status === 'not_authorized') {
                    dispatch(AuthActions.FbSigninFailed())
                    console.log('Import error', 'Authorize app to import data', 'error')
                } else {
                    dispatch(AuthActions.FbSigninFailed())
                    console.log('Import error', 'Error occured while importing data', 'error')
                }
            }
            window.FB.login(
                function (resp) {
                    statusChangeCallback(resp);
                }.bind(this), { scope: 'email,public_profile' });

            function fetchDataFacebook() {
                // console.log('Welcome!  Fetching your information.... ');
                window.FB.api('/me?fields=email,name,picture', function (user) {
                    // console.log(user);
                    // console.log('Successful login from facebook : ' + user.name);
                });
            }
        }
    }
    static fblogoutMiddleware() {
        return dispatch => {
            window.FB.logout(
                function (response) {
                    console.log(response);
                    dispatch(AuthActions.FbLogout())
                });
        };
    }

    static updateprofileMiddleware(data){
        return dispatch => {
            axios.put('https://quiz---app.herokuapp.com/user/update',
            data
        ).then((response)=> {console.log(response)
            if(response.data.Error){
                dispatch(AuthActions.UpdateFailed())
            }
            else {
                dispatch(AuthActions.UpdateProfile({data:response.data.response}))
            }
        }
        ).catch((err)=>console.log(err))
    }
    }
}

export default AuthMiddleware;