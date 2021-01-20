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
import Cover from "components/ViewData/Cover.js";

import { Button, Divider, Space, message } from "antd";

import LogFoodForm from "components/FoodLog/LogFoodForm.js";
import LogSectionForm from "components/FoodLog/LogSectionForm.js";
import FinsihLogging from "components/FoodLog/FinishLogging.js";

import { food3 } from "contract/food3.js";
const Web3 = require("web3");
const quorumjs = require("quorum-js");

var web3 = new Web3("http://foodchain-node1.etherhost.org:22001");
quorumjs.extend(web3);

const CONTRACT_ADDRESS = "0xA4fafbE0ea4823e262b4916EF93CC5A6306A5DBc";
const ACCOUNT_ADDRESS = "0x7CbEb723CA0788af6549110fb2a9816ED0BAa1a6";
const PRIVATE_KEY =
  "0xab09158d9a817633c28c74b6e6c1bf34c26ffadc1a961870beaeef38b0753495";
const CONTRACT_ABI = food3;
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

const checkEqual = (logno, title, starttime, e) => {
    console.log(web3.utils.keccak256(starttime))
    console.log(e[0].returnValues.begin)
  if (web3.utils.keccak256(starttime) != e[0].returnValues.begin) {
    message.error("資料可能被竄改!!!");
  }
};

async function checkStartTime(logno, title, starttime) {

  contract
    .getPastEvents("FoodSection", {
      filter: { logno: logno },
      fromBlock: 0,
      toBlock: "latest",
    })
    .then((events) =>
      checkEqual(
        logno,
        title,
        starttime,
        events.filter((item) => item.returnValues.title == title)
      )
    )
    .catch((err) => console.error(err));
}

const StepContent = tw.div`my-12`;

const ViewData = (props) => {
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
          {props.archived.map((item, index) => (
            <div tw="lg:pr-80 bg-gray-100 rounded-lg lg:pl-12 py-6 my-8">
              <div tw="text-xl mb-2 font-bold">
                🍆 食品名稱 ： {item.foodname}
              </div>
              <div tw="text-xl mb-2 font-bold">🏭 組織名稱 ： {item.org}</div>
              <div tw="text-xl mb-2 font-bold">📆 登錄時間 ： {item.date}</div>

              <div tw="text-xl mb-2 font-bold">🚩 作業項目：</div>
              {item.sections.map((sitem, sindex) => (
                <div tw="text-lg ml-8 my-2">
                  {sindex + 1}. {sitem.starttime} > {sitem.endtime}{" "}
                  {sitem.sectionname}{" "}
                  <Button
                    onClick={() => checkStartTime(
                      item.logno,
                      sitem.sectionname,
                      sitem.starttime
                    )}
                  >
                    檢查
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </StepContent>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    foodname: state.foodname,
    sections: state.sections,
    archived: state.archived,
  };
};

export default connect(mapStateToProps)(ViewData);
