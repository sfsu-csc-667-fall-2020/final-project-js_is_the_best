const initState = () => ({
    userName: '',
    isLoggedIn: false,
    });
const userReducer = (state = initState(), action) =>{
    //all actions have a type
    switch(action.type){
        case 'USER_NAME_SET':
            return {
                ...state,//copy old state
                userName: action.userName,
            };
        case 'USER_SET_LOGGED_IN':
            return{
                ...state,
                isLoggedIn:action.isLoggedIn,
            }
        default:
          return state;
    }
};

export default userReducer;