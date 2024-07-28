import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../../components/ui/navigation-menu";
import Sidebar from "./sidebar";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../../components/ui/avatar";
import { FC } from "react";

const Appbar: FC<{
  initials: string;
  profilePicURL: string;
}> = ({ initials, profilePicURL }) => {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-white sticky top-0 z-20">
      <div>
        <Sidebar />
      </div>
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Avatar>
                <AvatarImage src={profilePicURL} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default Appbar;
