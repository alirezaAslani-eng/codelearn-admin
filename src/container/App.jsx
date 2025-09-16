import { useEffect, useState } from "react";
import "../style/input.css";
import "../style/custom.css";
// router >>
import { useRoutes } from "react-router-dom";
import { routes } from "../routes/routes";
import { Header, SideBar } from "../components/common";
import { AuthContext } from "../context";
import { LoginForm } from "../components/module";
import { get } from "../utils";
import { initialSetTheme } from "../utils";
function App() {
  const [isLogin, setLogin] = useState(false);
  const [adminToken, setToken] = useState({});
  const [adminInfo, setAdminInfo] = useState({});
  const [isPending, setIsPending] = useState(true);
  // dark light ---------------- >>
  initialSetTheme();
  //  (START) Check (admin-token) and set-authorization  >>
  const admin_localStorage = localStorage.getItem("admin");
  const admin_token = JSON.parse(admin_localStorage); // ADMIN TOKEN :)
  // check admin token
  const checkAuthorizaton = async () => {
    if (isLogin) return;
    console.log("checkAuthorizaton()");
    setIsPending(true); // START LOADING // re-render <<
    try {
      await fetch("https://codelearn-backend.onrender.com/v1/auth/me", {
        headers: {
          Authorization: `Bearer ${admin_token.token || null}`,
        },
      })
        .then(async (res) => {
          // re-render >>
          if (res.ok) {
            const jsonRes = await res.json();
            if (jsonRes.role == "USER") return; // for make more security
            setLogin(true); // this line need more security
            return jsonRes;
          } else {
            console.warn("there isn't token !");
            setLogin(false);
          }
        })
        .then((jsonRes) => {
          setAdminInfo(jsonRes || {}); // re-render <<
          setToken(admin_token.token || null); // re-render <<
        });
    } catch (err) {
      console.warn("there isn't token !");
      setLogin(false);
    } finally {
      setIsPending(false); // STOP LOADING // re-render <<
    }
  };
  useEffect(() => {
    checkAuthorizaton(); // Start Check :)
  }, [isLogin]);
  // Authentication / methods >>
  // when login() to run mean user is logged !
  const login = (userInfo, token) => {
    setLogin(true);
    setAdminInfo(userInfo);
    setToken(token);
    localStorage.setItem("admin", JSON.stringify({ token }));
  };
  const logout = () => {
    localStorage.removeItem("admin");
    setLogin(false);
    setAdminInfo({});
    setToken({});
  };
  // (FINISH) Check (admin-token) and set-authorization <<

  const router = useRoutes(routes);

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        isPending,
        adminInfo,
        adminToken,
        login,
        logout,
      }}
    >
      <>
        {!isPending ? (
          isLogin ? (
            <div className="flex w-full justify-between">
              <SideBar />
              <div className="flex-1 h-[2000px]">
                <Header />
                <main>{router}</main>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-screen">
              <LoginForm />
            </div>
          )
        ) : (
          "Loading check your token"
        )}
      </>
    </AuthContext.Provider>
  );
}

export default App;
