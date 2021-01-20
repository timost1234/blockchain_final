import React from "react";
import { useTranslation } from "react-i18next";

import tw from "twin.macro";
import styled from "styled-components";

import { FaMapMarkerAlt as MapIcon } from "react-icons/fa";
import { MdEmail as MailIcon } from "react-icons/md";
import { AiFillPhone as PhoneIcon } from "react-icons/ai";

const Container = tw.div`relative bg-gray-900 text-gray-100 mt-8 lg:mt-16`;
const Content = tw.div`max-w-screen-xl mx-auto py-12 lg:py-16`;

const Row = tw.div`flex items-center justify-center flex-col px-8`;

const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-8`;
const LogoText = tw.h5`ml-2 text-2xl text-white tracking-wider`;

const LinksContainer = tw.div`mt-8 font-normal flex flex-wrap justify-center items-center flex-col sm:flex-row`;
const Link = tw.a`border-b-2 border-transparent text-white hocus:text-gray-300 hocus:border-gray-400 pb-1 transition duration-300 mt-2 mx-4`;

const IconLinksContainer = tw.div`mt-10`;
const IconLink = styled.a`
  ${tw`cursor-pointer inline-block text-gray-100 hover:text-gray-500 transition duration-300 mx-4`}
  svg {
    ${tw`w-5 h-5`}
  }
`;

const CopyrightText = tw.p`text-center my-8 font-normal tracking-wide text-sm text-gray-500`;

export default () => {
  const { t } = useTranslation();

  return (
    <Container>
      <CopyrightText>版權所有 © 2020 國立臺灣大學</CopyrightText>
    </Container>
  );
};
