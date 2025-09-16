import { useContext } from "react";
import { AuthContext, UiSectionContext } from "../../../../context";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteOneLiMenu, postOneLiMenu } from "../../../../api";
import { ConfrimeBox, DropDownButton } from "../../index";
import { queryKeys } from "../../../../libs/reactQuery";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { CreateLiMenuForm } from "../../../module";
function MenuList() {
  const { topBarLies } = useContext(UiSectionContext);
  const authContext = useContext(AuthContext);

  const { refetch: refetchMenu } = useQuery({
    queryKey: queryKeys.topBarLies.all,
  });

  const { mutate: deleteLi } = useMutation({
    mutationFn: deleteOneLiMenu,
  });

  const delteLiMenu = (id) => {
    deleteLi(
      {
        headers: {
          Authorization: `Bearer ${authContext.adminToken}`,
        },
        param: id,
      },
      {
        onSuccess: () => {
          refetchMenu();
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  return (
    <>
      {topBarLies?.map((li) => {
        return (
          <li
            key={li?._id}
            className="text-dark dark:text-light group relative cursor-pointer"
          >
            <div className="flex items-center gap-x-2 animate-initialShow">
              {li?.title}
              {li?.href}
              <div>
                <ConfrimeBox onRemove={() => delteLiMenu(li?._id)} />
              </div>
            </div>
            <div
              className="
            absolute 
            pt-[40px] 
            top-[10px] 
            opacity-0 
            scale-100 
            invisible 
            group-hover:visible 
            group-hover:opacity-100 
            group-hover:scale-[.95] 
            transition-all 
            will-change-transform 
            delay-75 "
            >
              <ul
                className="
              text-sm  
              w-[200px] 
              h-[250px] 
              overflow-y-auto 
              cs-scroll
              bg-secondary-light 
              dark:bg-secondary-dark 
              text-dark 
              dark:text-light 
              empty:hidden 
              overflow-hidden "
              >
                {li?.submenus &&
                  li?.submenus.map((li) => {
                    return (
                      <Li>
                        {li?.title}
                        {li?.href}
                        <ConfrimeBox onRemove={() => delteLiMenu(li?._id)} />
                      </Li>
                    );
                  })}

                <DropDownButton
                  butoonChildren={<AddCircleOutlineRoundedIcon />}
                  menuChildren={<CreateLiMenuForm parentId={li?._id} />}
                ></DropDownButton>
              </ul>
            </div>
          </li>
        );
      })}
      <DropDownButton
        butoonChildren={<AddCircleOutlineRoundedIcon />}
        menuChildren={<CreateLiMenuForm />}
      ></DropDownButton>
    </>
  );
}

export default MenuList;

function Li({ children }) {
  return (
    <li
      className="
                      cursor-pointer 
                      border-r-[3px] 
                      border-transparent 
                      hover:border-bg-accent
                      dark:hover:text-bg-accent 
                      hover:bg-bg-accent/20 
                      hover:text-text-accent 
                      transition-all "
    >
      <p className={" py-3 px-2 flex items-center justify-between gap-x-2"}>
        {children}
      </p>
    </li>
  );
}
