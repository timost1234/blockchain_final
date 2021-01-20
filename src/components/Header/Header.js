import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import useAnimatedNavToggler from "helpers/useAnimatedNavToggler.js";
import LanguageDropdown from "components/Header/LanguageDropdown.js";
import DarkmodeButton from "components/Header/DarkmodeButton.js";

import logo from "assets/images/settings.svg";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";

const Header = tw.header`
  px-8 sm:px-16 xl:px-48 flex items-center justify-between
  h-full mx-auto text-black dark:text-gray-300
`;

export const NavLinks = tw.div`flex items-center flex-shrink-0 space-x-6`;

/* hocus: stands for "on hover or focus"
 * hocus:bg-primary-700 will apply the bg-primary-700 class on hover or focus
 */
export const NavLink = tw.a`
  text-base my-2 lg:text-base text-black hover:text-black
  font-normal tracking-wide transition duration-200
  py-2 border-b-2 border-transparent hover:border-black dark:hover:border-gray-300
`;

export const PrimaryLink = tw(NavLink)`
  px-4 py-1 rounded bg-gray-200 text-gray-500
  hocus:bg-gray-300 focus:ring-gray-600
  border-b-0
`;

export const LogoLink = styled(NavLink)`
  ${tw`flex items-center font-semibold border-b-0 text-3xl! ml-0!`};

  img {
    ${tw`w-10 mr-3`}
  }
`;

export const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;
export const NavToggle = tw.button`
  lg:hidden z-20 focus:outline-none transition duration-300
`;
export const MobileNavLinks = motion.custom(styled.div`
  ${tw`lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white`}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
`);

export const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1 justify-between items-center
`;

export default ({
  roundedHeaderButton = false,
  collapseBreakpointClass = "lg",
}) => {
  const { t } = useTranslation();

  const [scroll, setScroll] = useState(false);
  const [distance, setDistance] = useState(90);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > distance);
      if (scroll) {
        setDistance(20);
      } else {
        setDistance(90);
      }
    });
  }, []);

  let className = "z-40 my-2 transition sticky top-0 duration-200 w-full bg-transparent ";
  if (scroll) {
    className =
      "bg-white bg-opacity-95 my-2 shadow z-40 relative transition duration-500 w-full sticky top-0";
  }

  const links = [
    <NavLinks key={1}>
      <NavLink href="/">作業資料登錄</NavLink>
      <NavLink href="localdata">本地資料查詢</NavLink>
      <div className="w-8 h-0" />
      <DarkmodeButton />
      <LanguageDropdown />
      <PrimaryLink css={roundedHeaderButton && tw`rounded-full`} href="/#">
        {t("Header.login")}
      </PrimaryLink>
    </NavLinks>,
  ];

  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss =
    collapseBreakPointCssMap[collapseBreakpointClass];

  const logoLink = (
    <LogoLink href="/" css={scroll ? tw`text-2xl!` : ""}>
      {/* <img src={logo} alt="logo" /> */}
      區塊鏈與技術分析專題呈現
    </LogoLink>
  );

  return (
    <Header className={className}>
      <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
        {logoLink}
        {links}
      </DesktopNavLinks>

      <MobileNavLinksContainer
        css={collapseBreakpointCss.mobileNavLinksContainer}
      >
        {logoLink}
        <MobileNavLinks
          initial={{ x: "150%", display: "none" }}
          animate={animation}
          css={collapseBreakpointCss.mobileNavLinks}
        >
          {links}
        </MobileNavLinks>
        <NavToggle
          onClick={toggleNavbar}
          className={showNavLinks ? "open" : "closed"}
        >
          {showNavLinks ? (
            <CloseIcon tw="w-6 h-6" />
          ) : (
            <MenuIcon tw="w-6 h-6" />
          )}
        </NavToggle>
      </MobileNavLinksContainer>
    </Header>
  );
};

/* The below code is for generating dynamic break points for navbar.
 * Using this you can specify if you want to switch
 * to the toggleable mobile navbar at "sm", "md" or "lg" or "xl" above using the collapseBreakpointClass prop
 * Its written like this because we are using macros and we can not insert dynamic variables in macros
 */

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:hidden`,
    desktopNavLinks: tw`sm:flex`,
    mobileNavLinksContainer: tw`sm:hidden`,
  },
  md: {
    mobileNavLinks: tw`md:hidden`,
    desktopNavLinks: tw`md:flex`,
    mobileNavLinksContainer: tw`md:hidden`,
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`,
  },
  xl: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`,
  },
};
