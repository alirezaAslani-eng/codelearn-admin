const queryKeys = {
  users: {
    all: ["users"],
  },
  categories: {
    all: ["categories"],
  },
  courses: {
    all: ["courses"],
  },
  contacts: {
    all: ["contacts"],
  },
  blogs: {
    all: ["blogs"],
  },
  sessions: {
    all: ["sessions"],
  },
  comments: {
    all: ["comments"],
  },
  topBarLies: {
    all: ["topBarLies"],
  },
  offs: {
    all: ["offs"],
  },
  userTickets: {
    all: ["userTickets"],
    one: (param) => ["userTickets", param],
  },
};
export default queryKeys;
