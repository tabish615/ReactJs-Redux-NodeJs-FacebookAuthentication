
class AuthActions {

    static signin = "SIGNIN"
    static signup = "SIGNUP"
    static logout = "LOGOUT";
    static fbSignin = "FB_SIGNIN";
    static fbSigninFailed = "FB_SIGNIN_FAILED";
    static clearState = "CLEAR_STATE";
    static fbLogout = "FB_LOGOUT";
    static updateProfile = "UPDATE_PROFILE";
    static updateFailed = "UPDATE_FAILED";
    
    
    static Signin(data){
        return {
            type : this.signin,
            data : data
        }
    }

    static Signup(data){
        return {
            type : this.signup,
            data : data
        }
    }

    static Logout(data){
        return {
            type : this.logout,
            data : null
        }
    }

    static FbSignin(data){
        return {
            type : this.fbSignin,
            data : data
        }
    }
    static FbSigninFailed(){
        return {
            type : this.fbSigninFailed,
        }
    }

    static ClearState(){
        return {
            type : this.clearState,
        }
    }

    static FbLogout(){
        return {
            type : this.fbLogout,
            data : null
        }
    }
    static UpdateProfile(data){
        return {
            type : this.updateProfile,
            data : data
        }
    }
    static UpdateFailed(data){
        return {
            type : this.updateFailed,
        }
    }
}

export default AuthActions;

