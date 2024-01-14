import { House } from "@phosphor-icons/react/dist/ssr";
import { style } from "./style";
import {
  Bell,
  CalendarBlank,
  ChartDonut,
  GearSix,
  User,
} from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";

export default function SideBar() {
  const NavItem = ({ href, children, text }) => {
    return (
      <a href={href} className="block no-underline text-black rounded-lg">
        <div className="flex flex-col">
          <div className="text-center">{children}</div>
          <div className="text-center">{text}</div>
        </div>
      </a>
    );
  };

  const mainColor = style.mainColor;
  const subColor = style.lightMainColor;

  const location = useLocation().pathname;

  return (
    <>
      <div id="sidebar">
        <nav className="flex flex-col space-y-10">
          <NavItem href={`/explore`} text={"Explore"}>
            <House
              weight="fill"
              size={"2.5rem"}
              color={location === "/explore" ? mainColor : subColor}
            />
          </NavItem>

          <NavItem href={`/schedule`} text={"Schedule"}>
            <CalendarBlank
              weight="fill"
              size={"2.5rem"}
              color={location === "/schedule" ? mainColor : subColor}
            />
          </NavItem>

          <NavItem href={`/settings`} text={"Settings"}>
            <GearSix
              weight="fill"
              size={"2.5rem"}
              color={location === "/settings" ? mainColor : subColor}
            />
          </NavItem>
          <NavItem href={`/notification`} text={"Notifications"}>
            <Bell
              weight="fill"
              size={"2.5rem"}
              color={location === "/notification" ? mainColor : subColor}
            />
          </NavItem>
          <NavItem href={`/analytics`} text={"Analytics"}>
            <ChartDonut
              weight="fill"
              size={"2.5rem"}
              color={location === "/analytics" ? mainColor : subColor}
            />
          </NavItem>

          <NavItem href={`/profile`} text={"Profile"}>
            <User
              weight="fill"
              size={"2.5rem"}
              color={location === "/profile" ? mainColor : subColor}
            />
          </NavItem>
        </nav>
      </div>
    </>
  );
}
