const authInitState = {
    user: JSON.parse(localStorage.getItem("auth")) || null,
    isAuth: !!localStorage.getItem("auth")
}

const login = (data) => {
  const usersLocal = localStorage.getItem("users");
  if (usersLocal) {
    const users = JSON.parse(usersLocal);
    const findedUser = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (findedUser) {
      if (data.rememberMe) {
        localStorage.setItem("auth", JSON.stringify(findedUser));
      } else {
        localStorage.removeItem("auth");
      }
      return findedUser;
    } else {
      alert("Невірна пошта або пароль!");
      return null;
    }
  }
  return null;
};

const AuthReducer = (state = authInitState, action) => {
    switch(action.type){
        case "LOGIN": 
        const user = login(action.payload)
        if (user)
        {
            return {...state, isAuth: true, user: action.payload}
        }
        else {
            return state
        }
        case "REGISTER": 
            return {...state, isAuth: true, user: action.payload}
        case "LOGOUT": 
            localStorage.removeItem("auth")
            return {...state, isAuth: false, user: null}
          case "PROFILE": 
            return state
        default:
            return state;
    }

}

export default AuthReducer