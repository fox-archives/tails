import * as React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
import { GithubOutlined, SettingOutlined, TableOutlined, AppstoreAddOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;


export default function Header() {
  const [current, setCurrent] = useState(0)

  const handleClick = e => {
    console.log('click ', e);
    setCurrent({
      current: e.key,
    });
  }

  return (
    <Menu onClick={handleClick} theme="dark" selectedKeys={[current]} mode="horizontal" >
      <Menu.Item key="projects" icon={<TableOutlined />}>
        <span>Projects</span>
        <Link to="/"></Link>
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        <span>Settings</span>
        <Link to="/settings">dd</Link>
      </Menu.Item>
      <SubMenu icon={<AppstoreAddOutlined />} title="Plugin Menus">
        <Menu.ItemGroup title="plugin 1">
          <Menu.Item key="plugin-1:1">main</Menu.Item>
          <Menu.Item key="plugin-1:2">settings</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="plugin 2">
          <Menu.Item key="plugin-2:1">main</Menu.Item>
          <Menu.Item key="plugin-2:2">settings</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <Menu.Item icon={<GithubOutlined />} key="github">
        <a href="https://github.com/eankeen/tails" target="_blank" rel="noopener noreferrer">
          GitHub
          </a>
      </Menu.Item>
    </Menu>
  )
}
