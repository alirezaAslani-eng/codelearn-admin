import { createContext } from "react";
const AuthContext = createContext({
  isLogin: false,
  adminInfo: {},
  adminToken: null,
  isPending: true,
  login: () => {},
  logout: () => {},
});
export default AuthContext;
