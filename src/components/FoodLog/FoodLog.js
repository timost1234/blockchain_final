import React, { useState } from "react";
import { connect } from "react-redux";

import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { ReactComponent as PlusIcon } from "feather-icons/dist/icons/plus.svg";
import { ReactComponent as MinusIcon } from "feather-icons/dist/icons/minus.svg";
import { ContainerWithStandarPadding as Container } from "layouts/Layouts.js";
import Cover from "components/FoodLog/Cover.js";

import { Button, Divider, Space } from "antd";

import LogFoodForm from "components/FoodLog/LogFoodForm.js";
import LogSectionForm from "components/FoodLog/LogSectionForm.js";
import FinsihLogging from "components/FoodLog/FinishLogging.js";


const StepContent = tw.div`my-12`;

const FAQSContainer = tw.dl`mt-12`;
const FAQ = tw.div`cursor-pointer my-8 select-none border lg:border-0 px-8 py-4 lg:p-0 rounded-lg lg:rounded-none`;
const Question = tw.dt`flex justify-between items-center`;
const QuestionText = tw.span`text-lg lg:text-2xl font-medium`;
const QuestionToggleIcon = styled.span`
  ${tw`ml-2 bg-black text-gray-100 p-1 rounded-full group-hover:bg-gray-700 group-hover:text-gray-200 transition duration-300`}
  svg {
    ${tw`w-4 h-4`}
  }
`;
const Answer = motion.custom(tw.dd`text-sm sm:text-base leading-relaxed`);

const FoodLog = (props, { faqs = null }) => {
  const defaultFaqs = [
    {
      question: "STEP1 : 登錄食品資料 -> " + props.foodname,
      answer: <LogFoodForm />,
    },
    {
      question:
        "STEP2 : 登錄作業資料 -> 目前已累計 " +
        props.sections.length +
        " 項作業",
      answer: <LogSectionForm />,
    },
    {
      question: "STEP3 : 結束所有作業",
      answer: <FinsihLogging />,
    },
  ];

  if (!faqs || faqs.length === 0) faqs = defaultFaqs;

  const activeIndex = props.foodname ? 1 : 0;
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(activeIndex);

  const toggleQuestion = (questionIndex) => {
    if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
    else setActiveQuestionIndex(questionIndex);
  };

  return (
    <>
      <Container>
        <Divider style={{ margin: "0px" }} />
        <Cover />
        <Divider />
        <StepContent>
          <FAQSContainer>
            {faqs.map((faq, index) => (
              <FAQ key={index}>
                <Question
                  onClick={() => {
                    toggleQuestion(index);
                  }}
                  className="group"
                >
                  <QuestionText>{faq.question}</QuestionText>
                  <QuestionToggleIcon>
                    {activeQuestionIndex === index ? (
                      <MinusIcon />
                    ) : (
                      <PlusIcon />
                    )}
                  </QuestionToggleIcon>
                </Question>
                <Answer
                  tw="lg:pr-80 bg-gray-100 rounded-lg lg:pl-12 py-1"
                  variants={{
                    open: {
                      opacity: 1,
                      height: "auto",
                      marginTop: "16px",
                      paddingTop: "16px",
                    },
                    collapsed: { opacity: 0, height: 0, marginTop: "0px" },
                  }}
                  initial="collapsed"
                  animate={activeQuestionIndex === index ? "open" : "collapsed"}
                  transition={{
                    duration: 0.4,
                    ease: [0.04, 0.62, 0.23, 0.98],
                  }}
                >
                  {faq.answer}
                </Answer>
              </FAQ>
            ))}
          </FAQSContainer>
        </StepContent>
      </Container>
      <Container tw=" flex justify-end">
        <Space>
          <Button type="default" style={{ borderRadius: "5px" }}>
            檢視目前紀錄
          </Button>

          <Button danger style={{ borderRadius: "5px" }}>
            取消整筆資料
          </Button>
        </Space>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    foodname: state.foodname,
    sections: state.sections,

  };
};

export default connect(mapStateToProps)(FoodLog);
