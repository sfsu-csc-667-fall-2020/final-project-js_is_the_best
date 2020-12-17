const initState = () => ({
    user:null,
    isLoggedIn: false,
    });
const userReducer = (state = initState(), action) =>{
    //all actions have a type
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,//copy old state
                isLoggedIn:true,
                user: action.user,
            };
        case 'LOGOUT':
            return{
                ...state,
                isLoggedIn:false,
                user: null,
            }
        default:
          return state;
    }
};

export default userReducer;