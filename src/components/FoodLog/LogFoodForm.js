import React from "react";
import { connect } from "react-redux";

import tw from "twin.macro";
import styled from "styled-components";

import { Form, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const tailLayout = {
  wrapperCol: { offset: 1 },
};

const LogFoodForm = (props) => {
  const onFinish = (values) => {
    console.log("Success:", values);
    props.onLogFood(values.foodname, values.org);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {props.foodname && (
        <div tw="pt-4 pb-6">
          <div tw="text-xl mb-2 font-bold">🍆 食品名稱 ： {props.foodname}</div>
          <div tw="text-xl mb-2 font-bold">🏭 組織名稱 ： {props.org}</div>
          <div tw="text-xl mb-2 font-bold">📆 登錄時間 ： {props.date}</div>
          <Button
            disabled
            type="primary"
            htmlType="submit"
            style={{
              borderRadius: "5px",
              padding: "0px 20px",
              marginTop: "8px",
            }}
          >
            確認上傳
          </Button>
        </div>
      )}
      {!props.foodname && (
        <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            {...tailLayout}
            style={{ marginTop: "12px" }}
            label="食品名稱"
            name="foodname"
            rules={[
              {
                required: true,
                message: "請輸入您的產品名稱!",
              },
            ]}
          >
            <Input
              style={{ borderRadius: "5px" }}
              placeholder={props.foodname}
            />
          </Form.Item>

          <Form.Item
            {...tailLayout}
            style={{ marginTop: "12px" }}
            label="組織名稱"
            name="org"
            rules={[
              {
                required: true,
                message: "請輸入您的組織名稱!",
              },
            ]}
          >
            <Input style={{ borderRadius: "5px" }} placeholder={props.org} />
          </Form.Item>

          <Form.Item style={{ marginTop: "12px" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ borderRadius: "5px", padding: "0px 20px" }}
            >
              確認送出
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    foodname: state.foodname,
    org: state.org,
    date: state.date,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogFood: (foodname, org) =>
      dispatch({ type: "LOGFOOD", foodname: foodname, org: org }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogFoodForm);
