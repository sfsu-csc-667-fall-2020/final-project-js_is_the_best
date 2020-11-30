export const setUserName = (userName)=> ({
    type: 'USER_NAME_SET',
    userName,
});

export const setIsLoggedIn = (isLoggedIn)=>({
    type: 'USER_SET_LOGGED_IN',
    isLoggedIn,
});
