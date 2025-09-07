import { createContext, useState } from "react";
import { useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

    const login = (data) => {
  const usersLocal = localStorage.getItem("users");
  if (usersLocal) {
    const users = JSON.parse(usersLocal);
    const findedUser = users.find(u => u.email === data.email && u.password === data.password);
    if (findedUser) {
      setUser(findedUser);
      if(data.rememberMe) {
        localStorage.setItem("rememberedUser", JSON.stringify(findedUser));
      } else {
        localStorage.removeItem("rememberedUser");
      }
      return true;
    } else {
      alert("Невірна пошта або пароль!");
    }
  } else {
    return false;
  }
};

    
    const googleLogin = ({email, given_name, family_name, picture}) => {
        const auth = {
            email: email, 
            firstName: given_name, 
            lastName: family_name, 
            avatar: picture
        };
        localStorage.setItem("googleAuth", JSON.stringify({auth}));
        setUser(auth)}

    const logout = () => {
        setUser(null);
        localStorage.removeItem("findedUser");
        localStorage.removeItem("googleAuth");
        localStorage.removeItem("rememberedUser");
};
    return (
        <AuthContext.Provider value={{ user, login, googleLogin, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth () {
    return useContext(AuthContext);
}