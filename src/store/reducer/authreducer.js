import AuthActions from '../actions/authActions';

function authReducer(state = {
    user: {},
    iserror: false,
    isLoading: false,
    updateError : false
}, action) {

    switch (action.type) {
        case AuthActions.signin:
            return {
                ...state,
                user: action.data,
            };
            break;

        case AuthActions.signup:
            return {
                ...state,
                user: action.data,
            };
            break;

        case AuthActions.logout:
            return {
                ...state,
                user: null,
            };
            break;

        case AuthActions.fbSignin:
            return {
                ...state,
                user: action.data,
                isLoading: false
            };
            break;

        case AuthActions.fbSigninFailed:
            return {
                ...state,
                iserror: true,
                isLoading: false
            };
            break;

        case AuthActions.clearState:
            return {
                ...state,
                iserror: false,
                isLoading: true,
                updateError : false
            };
            break;

        case AuthActions.fbLogout:
            return {
                ...state,
                user: null,
            };
            break;

        case AuthActions.updateProfile:
            return {
                ...state,
                user: action.data,
                isLoading: false
            };
            break;

        case AuthActions.updateFailed:
            return {
                ...state,
                isLoading: false,
                updateError : true
            };
            break;

        default:
            return state;
    }
}
export default authReducer;