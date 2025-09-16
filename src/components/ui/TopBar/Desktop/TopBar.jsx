// components
import {MenuList} from "../modules";

export default function TopBar() {
  return (
    <>
      <header className="font-dana-md bg-secondary-light dark:bg-secondary-dark sticky inset-0 z-10 hidden lg:block">
        <div className="container flex justify-between items-center py-2">
          <aside className="flex items-center gap-x-4 text-dark dark:text-light">
            {/* right-Aside / nav-menu */}
            <ul className="flex items-center gap-x-4">
              <MenuList />
            </ul>
          </aside>

          
          
        </div>
      </header>
    </>
  );
}
