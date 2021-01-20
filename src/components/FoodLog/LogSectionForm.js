import React, { useState } from "react";
import { connect } from "react-redux";

import tw from "twin.macro";
import styled from "styled-components";

import { Form, Input, Button, Upload, Space } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import DropZone from "components/FoodLog/DropZone.js";

const tailLayout = {
  wrapperCol: { offset: 1 },
};
const IllustrationContainer = tw.div`flex justify-center md:justify-end relative max-w-3xl lg:max-w-none h-44 w-44 overflow-hidden rounded-md`;

const LogSectionForm = (props) => {
  const onFinish = (values) => {
    if (!props.starttime) {
      props.onLogStartTime(values.sectionname, new Date().toLocaleString());
    }
  };


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {!props.foodname && (
        <div tw="mt-5 mb-8 text-lg text-red-600">⛔ 請先登錄食品資料</div>
      )}
      {props.foodname && (
        <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          {props.starttime && (
            <>
              <div tw="font-bold ml-1 mt-5 text-lg">
                作業項目: <span tw="ml-6">{props.sectionname}</span>
              </div>

              <div tw="font-bold ml-1 mt-2 mb-4 text-lg">
                開始時間: <span tw="ml-6">{props.starttime}</span>
              </div>

              <div tw=" ml-1 mt-2 mb-4 text-lg">
                已上傳<span tw="mx-2">{props.images.length}</span> 張照片
              </div>
            </>
          )}
          {!props.starttime && (
            <>
              <Form.Item
                {...tailLayout}
                style={{ marginTop: "12px" }}
                label="作業項目"
                name="sectionname"
                rules={[
                  {
                    required: true,
                    message: "請輸入您的作業項目!",
                  },
                ]}
              >
                <Input style={{ borderRadius: "5px" }} />
              </Form.Item>
            </>
          )}

          <Form.Item
            {...tailLayout}
            style={{ marginTop: "12px" }}
            label="影像紀錄"
            name="dragger"
          >
            <div tw="flex">
              <Space>
                <DropZone />
                {props.images.map((image, index) => (
                  <IllustrationContainer>
                    <img src={image} alt="Cover Photo" />
                  </IllustrationContainer>
                ))}
              </Space>
            </div>
          </Form.Item>

          <Form.Item style={{ marginTop: "12px" }}>
            {!props.starttime && (
              <Button
                type="primary"
                htmlType="submit"
                style={{ borderRadius: "5px", padding: "0px 20px" }}
              >
                開始作業
              </Button>
            )}
            ,
            {props.starttime && (
              <Button
                type="primary"
                onClick= {props.onLogSection}
                style={{ borderRadius: "5px", padding: "0px 20px" }}
              >
                結束作業
              </Button>
            )}
          </Form.Item>
        </Form>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    foodname: state.foodname,
    starttime: state.starttime,
    sectionname: state.sectionname,
    images: state.images,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogSection: () => dispatch({ type: "LOGSECTION" }),
    onLogImage: (image) => dispatch({ type: "LOGIMAGE", image: image }),
    onLogStartTime: (sectionname, starttime) =>
      dispatch({
        type: "LOGSTARTTIME",
        sectionname: sectionname,
        starttime: starttime,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogSectionForm);
