import React from "react";
import { useTranslation } from "react-i18next";

import { Menu, Dropdown } from "antd";
import { MdLanguage as LanguageIcon } from "react-icons/md";

const LanguageDropdown = () => {
  const { t, i18n } = useTranslation();

  const menu = (
    <Menu style={{ marginTop: 4, borderRadius: 5 }}>
      <Menu.Item
        key="0"
        style={{
          textAlign: "center",
          borderRadius: 5,
          marginLeft: 8,
          marginRight: 8,
          marginTop: 4,
          paddingLeft: 24,
          paddingRight: 24,
        }}
        onClick={() => i18n.changeLanguage("en")}
      >
        English
      </Menu.Item>
      <Menu.Item
        key="1"
        style={{
          textAlign: "center",
          borderRadius: 5,
          marginLeft: 8,
          marginRight: 8,
          marginTop: 8,
          paddingLeft: 24,
          paddingRight: 24,
        }}
        onClick={() => i18n.changeLanguage("zh-TW")}
      >
        繁體中文
      </Menu.Item>
      <Menu.Item
        key="1"
        style={{
          textAlign: "center",
          borderRadius: 5,
          marginLeft: 8,
          marginRight: 8,
          marginTop: 8,
          paddingLeft: 24,
          paddingRight: 24,
          marginBottom: 8,
        }}
        onClick={() => i18n.changeLanguage("zh-CN")}
      >
        简体中文
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        <LanguageIcon className="w-5 h-5 text-black" aria-hidden="true" />
      </a>
    </Dropdown>
  );
};

export default LanguageDropdown;
