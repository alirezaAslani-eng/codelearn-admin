import React, { useContext } from "react";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import { MuiButton, NoDataBox } from "../../components/ui";

export default function Notifications() {
  const notifs = [];

  return (
    <div className="container space-y-4">
      <span className="mt-4 flex items-center gap-x-1 bg-warning-light/20 text-warning-light w-fit py-2 px-4 rounded-lg">
        <NotificationsActiveRoundedIcon />
        {notifs.length}
      </span>
      {notifs?.length ? (
        notifs.map((item) => {
          return (
            <div className="ftc_box flex justify-between items-start">
              {item}

              <MuiButton>Completed</MuiButton>
            </div>
          );
        })
      ) : (
        <NoDataBox />
      )}
    </div>
  );
}
