import * as React from 'react'
import { Menu } from 'antd';
import { MailOutlined, GithubOutlined, SettingOutlined, TableOutlined, AppstoreAddOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;


const current = 'projects'

const handleClick = e => {
  console.log('click ', e);
  this.setState({
    current: e.key,
  });
}

export default function Header() {
  return (
    <Menu onClick={handleClick} theme="dark" selectedKeys={[current]} mode="horizontal" >
      <Menu.Item key="projects" icon={<TableOutlined />}>
        Projects
        </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Settings
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
