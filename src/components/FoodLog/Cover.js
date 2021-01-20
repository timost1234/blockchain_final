import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import tw from "twin.macro";

import { ReactComponent as SvgDecoratorBlob1 } from "assets/images/svg-decorator-blob-1.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "assets/images/dot-pattern.svg";
import CoverPhoto from "assets/images/cover.jpg";

import { ContainerWithStandarPadding as Container } from "layouts/Layouts.js";

const TwoColumn = tw.div`my-8 pb-8 flex flex-col lg:flex-row md:items-center max-w-screen-xl mx-auto md:pt-8`;
const LeftColumn = tw.div`relative lg:w-6/12 lg:pr-12 flex-shrink-0 text-center lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex flex-col justify-center`;

const Heading = tw.h1` text-6xl max-w-3xl mb-2`;
const SubTitle = tw.span` font-medium text-sm sm:text-lg`;
const Paragraph = tw.p`mt-8 text-justify text-sm md:text-base md:pr-8 font-normal lg:text-lg leading-relaxed text-gray-500`;

const IllustrationContainer = tw.div`flex justify-center md:justify-end items-start relative max-w-3xl lg:max-w-none h-64 w-full overflow-hidden rounded-md`;

export default ({
  heading = "Toolmen Lab",
  notification = "Lab of Machine Learning and Machine Vision, BIME, NTU",
  description = "Our lab focuses on fulfilling the demand of mechatronics system integration for trIn artment of multi-engineering disciplines (graduates are granted engineerinutomation, bio-engineering, bio-sensor, bio-signal processing, intelligent control, Nano-BioMEMS, biomaterials, bio-informatics, bio-reactor engineering, etc., in order to keep abreast with the global tre in bio-industry.",
  imageSrc = "https://images.unsplash.com/photo-1588159481334-3502acdcbfb9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
  imageCss = tw`rounded-md `,
  imageDecoratorBlob = true,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <TwoColumn>
        <LeftColumn>
          <Heading>作業資料登錄</Heading>
          <Paragraph>
            👇
            請依序登錄您的食品基本資料與作業流程，系統將會自動記錄您的登錄時間與位置，作業完成後請選擇結束作業。
          </Paragraph>
        </LeftColumn>
        <RightColumn>
          <IllustrationContainer>
            <img css={imageCss} src={imageSrc} alt="Cover Photo" />
          </IllustrationContainer>
        </RightColumn>
      </TwoColumn>
    </>
  );
};
