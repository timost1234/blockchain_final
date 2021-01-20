import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button } from "antd";

import tw from "twin.macro";
import styled from "styled-components";

const FinsihLogging = (props) => {
  return (
    <div tw="pt-4 pb-6">
      <div tw="text-xl mb-2 font-bold">🚩 目前登錄的作業項目有：</div>
      {props.sections.map((item, index) => (
        <div tw="text-lg ml-8 my-3">
          {index + 1}. {item.sectionname}
        </div>
      ))}
      <Button
        type="primary"
        onClick={props.onFinishWorking}
        style={{ borderRadius: "5px", padding: "0px 20px", marginTop: "8px" }}
      >
        確認上傳
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    foodname: state.foodname,
    org: state.org,
    sections: state.sections,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFinishWorking: () => dispatch({ type: "FINISHLOGGING" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FinsihLogging);
