import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
// componenets =====>>
import { SearchBox } from "../../module";
import { MenuBox } from "../index";
// MUI >>
import { Badge, Tooltip } from "@mui/material";
// use-context =====>>
import { AuthContext } from "../../../context";
import { useContext } from "react";
import { InputAndButtonWithAddOffOnAll } from "../../ui";
// icons ==== >>
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import PowerOffRoundedIcon from "@mui/icons-material/PowerOffRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import NotListedLocationRoundedIcon from "@mui/icons-material/NotListedLocationRounded";
import NightlightRoundedIcon from "@mui/icons-material/NightlightRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { themeHandler } from "../../../utils";

export default function Desktop_Header() {
  const [isAdminDropDown_show, setIsAdminDropDown_show] = useState(false);
  const [isNotifBox_show, setIsNotifBox_show] = useState(false);
  const authContext = useContext(AuthContext);
  return (
    <div className="relative z-[15] h-[70px] px-[31px] w-full flex justify-between items-center bg-secondary-light dark:bg-secondary-dark">
      <aside className="flex items-center gap-x-[25px]">
        {/* searchBox */}
        <div id="close-menu">{/* there is an element in here by portal */}</div>
        <div className="w-[388px] h-[38px]">
          <SearchBox />
        </div>
      </aside>
      <aside className="flex items-center gap-x-6">
        {/* Profile-admin */}
        <div className="flex items-center gap-x-[26px]">
          {/* Admin Short Details */}
          <NavLink to="/admin-info" className="flex items-center gap-x-5">
            <span className="profile">
              <img
                className="img"
                src="/codelearn-admin/images/fakePerson.jpg"
              />
            </span>
            <div className="flex flex-col gap-x-[3px] font-dana-md text-text-dark/80 dark:text-text-light/80">
              <p className="text-sm">{authContext.adminInfo.name}</p>
              <span className="text-xs">
                {authContext.adminInfo.role.toLowerCase()}
              </span>
            </div>
          </NavLink>
          {/* Seting Panel */}
          <span
            onClick={() => {
              setIsAdminDropDown_show((prev) => !prev);
              setIsNotifBox_show(false);
            }}
            className="relative p-[7px] w-[18px] h-[18px] border-button-strok-light border rounded-full flex items-center justify-center cursor-pointer"
          >
            <KeyboardArrowDownRoundedIcon className="!size-[14px]" />
            {isAdminDropDown_show && (
              <MenuBox
                className="top-[50px] left-full"
                onClose={() => setIsAdminDropDown_show(false)}
              >
                <div className="font-dana-md text-text-dark dark:text-text-light">
                  <div className="flex items-center gap-x-2">
                    <Tooltip title="Logout !">
                      <div className="bg-danger-light/20 rounded-xl p-3 text-danger-light">
                        <PowerOffRoundedIcon
                          onClick={() => {
                            authContext.logout();
                          }}
                        />
                      </div>
                    </Tooltip>
                    <button
                      onClick={() => themeHandler("dark")}
                      className="csa transition-all bg-success-light/20 rounded-xl p-3 text-success-light dark:hidden block"
                    >
                      <NightlightRoundedIcon />
                    </button>
                    <button
                      onClick={() => themeHandler("light")}
                      className="csa bg-success-light/20 rounded-xl p-3 text-success-light dark:block hidden"
                    >
                      <LightModeRoundedIcon />
                    </button>
                  </div>
                </div>
              </MenuBox>
            )}
          </span>
        </div>
        {/* Quick Access */}
        <span
          className="relative"
          onClick={() => {
            setIsNotifBox_show((prev) => !prev);
            setIsAdminDropDown_show(false);
          }}
        >
          <Badge
            badgeContent={authContext.adminInfo?.notifications.length}
            color="primary"
          >
            Quick access
          </Badge>
          {isNotifBox_show && (
            <MenuBox
              className="top-[50px] left-full"
              onClose={() => setIsNotifBox_show(false)}
            >
              <div className="space-y-3">
                <Link
                  onClick={() => setIsNotifBox_show(false)}
                  to={"/notif"}
                  className="flex items-center justify-between bg-warning-light/20 p-3 rounded-xl font-dana-md text-warning-light hover:scale-[.98] active:scale-95 transition-all"
                >
                  <span className="flex items-center gap-x-2">
                    <NotificationsActiveRoundedIcon />
                    {"الان های شما"}
                  </span>
                  <ArrowBackRoundedIcon />
                </Link>
                <Link
                  onClick={() => setIsNotifBox_show(false)}
                  className="flex items-center justify-between bg-danger-light/20 p-3 rounded-xl font-dana-md text-danger-light hover:scale-[.98] active:scale-95 transition-all"
                >
                  <span className="flex items-center gap-x-2">
                    <NotListedLocationRoundedIcon />
                    {"سوال های پرسیده شده"}
                  </span>
                  <ArrowBackRoundedIcon />
                </Link>
                <InputAndButtonWithAddOffOnAll />
              </div>
            </MenuBox>
          )}
        </span>
      </aside>
    </div>
  );
}
