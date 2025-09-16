import { NavLink } from "react-router-dom";

export default function SideBarBtn({
  text = "",
  icon,
  to = "/",
  onClick = () => {},
}) {
  return (
    <NavLink
      onClick={onClick}
      to={to}
      className={({ isActive }) => {
        return ` w-full flex justify-center items-center  ${
          isActive
            ? "active-menu text-text-light"
            : "text-text-dark/80 dark:text-text-light/80"
        }`;
      }}
    >
      <div
        className="flex justify-start pr-5 items-center gap-x-[11.5px] w-[192px] 
          h-[50px] "
      >
        {icon}
        <span>{text}</span>
      </div>
    </NavLink>
  );
}
