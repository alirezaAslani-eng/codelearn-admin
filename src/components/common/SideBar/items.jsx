// icon >
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import DriveFolderUploadRoundedIcon from "@mui/icons-material/DriveFolderUploadRounded";
import VideoCallRoundedIcon from "@mui/icons-material/VideoCallRounded";
import CategoryIcon from "@mui/icons-material/Category";
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded";
import ArticleIcon from "@mui/icons-material/Article";
import PlaylistAddCircleRoundedIcon from "@mui/icons-material/PlaylistAddCircleRounded";
import QueuePlayNextRoundedIcon from "@mui/icons-material/QueuePlayNextRounded";
import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import { v4 as uuid } from "uuid";
const categoryItems = {
  manageSection: "manage",
  uploadingSection: "add",
  personalSection: "personal",
  detailsSection: "detailsSelection",
};
const items_sideBar = [
  {
    id: uuid(),
    text: "صفحه ادمین",
    link: "/",
    category: categoryItems.manageSection,
    categoryTitle: "مدیریت",
    icon: <HomeRoundedIcon />,
    method: () => {},
  },
  //  ______________ controling ui section --- >
  {
    id: uuid(),
    text: "مدریت جزعیات",
    link: "/web-details",
    categoryTitle: "جزعیات وب سایت",
    category: categoryItems.detailsSection,
    icon: <SettingsSuggestRoundedIcon />,
    method: () => {},
  },
  {
    id: uuid(),
    text: "دوره های برگزار شده",
    link: "/up-courses",
    category: categoryItems.manageSection,
    categoryTitle: "مدیریت",
    icon: <DriveFolderUploadRoundedIcon />,
    method: () => {},
  },
  {
    id: uuid(),
    text: " مقاله ها",
    link: "/up-blogs",
    category: categoryItems.manageSection,
    categoryTitle: "مدیریت",
    icon: <ArticleIcon />,
    method: () => {},
  },
  {
    id: uuid(),
    text: "تمام کاربر ها",
    link: "/users",
    category: categoryItems.manageSection,
    categoryTitle: "مدیریت",
    icon: <GroupRoundedIcon />,
    method: () => {},
  },
  {
    id: uuid(),
    text: "تمام تیکت ها",
    link: "/user-tickets",
    category: categoryItems.manageSection,
    categoryTitle: "مدیریت",
    icon: <GroupRoundedIcon />,
    method: () => {},
  },
  {
    id: uuid(),
    text: "تمام  نظرات",
    link: "/up-comments",
    category: categoryItems.manageSection,
    categoryTitle: "مدیریت",
    icon: <ForumRoundedIcon />,
    method: () => {},
  },
  {
    id: uuid(),
    text: "پیقام های کاربر ها",
    link: "/contact",
    category: categoryItems.manageSection,
    categoryTitle: "مدیریت",
    icon: <ContactMailRoundedIcon />,
    method: () => {},
  },
  {
    id: uuid(),
    text: "دسته بندی های دوره",
    link: "/categories",
    category: categoryItems.manageSection,
    categoryTitle: "مدیریت",
    icon: <CategoryIcon />,
    method: () => {},
  },
  {
    id: uuid(),
    text: "جلسات اپلود شده",
    link: "/up-sessions",
    category: categoryItems.manageSection,
    categoryTitle: "مدیریت",
    icon: <VideoLibraryRoundedIcon />,
    method: () => {},
  },
  // ________________________________
  {
    id: uuid(),
    text: "مقاله جدید",
    link: "/add-blog",
    category: categoryItems.uploadingSection,
    categoryTitle: "ایجاد کردن",
    icon: <PlaylistAddCircleRoundedIcon />,
    method: () => {},
  },
  {
    id: uuid(),
    text: "دوره جدید",
    link: "/add-course",
    category: categoryItems.uploadingSection,
    categoryTitle: "ایجاد کردن",
    icon: <VideoCallRoundedIcon />,
    method: () => {},
  },
  {
    id: uuid(),
    text: "ایجاد کد تخفیف",
    link: "/add-off-code",
    category: categoryItems.uploadingSection,
    categoryTitle: "ایجاد کردن",
    icon: <PercentRoundedIcon />,
    method: () => {},
  },
  {
    id: uuid(),
    text: "جلسه جدید",
    link: "/add-session",
    category: categoryItems.uploadingSection,
    categoryTitle: "ایجاد کردن",
    icon: <QueuePlayNextRoundedIcon />,
    method: () => {},
  },

  {
    id: uuid(),
    text: "کاربر جدید",
    link: "/add-user",
    category: categoryItems.uploadingSection,
    categoryTitle: "ایجاد کردن",
    icon: <PersonAddAltRoundedIcon />,
    method: () => {},
  },
  // _____________________________
  {
    id: uuid(),
    text: "پروفایل من",
    link: "/admin-info",
    category: categoryItems.personalSection,
    categoryTitle: "درباره ادمین",
    icon: <AdminPanelSettingsRoundedIcon />,
    method: () => {},
  },
  {
    id: uuid(),
    text: "الان های شما",
    link: "/notif",
    categoryTitle: "درباره ادمین",
    category: categoryItems.personalSection,
    icon: <NotificationsActiveRoundedIcon />,
    method: () => {},
  },
];
export { items_sideBar };
