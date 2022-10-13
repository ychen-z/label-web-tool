import React, { useState, useReducer, useEffect } from 'react';
import { Layout } from 'antd';
import loginReducer from '@/reducer/loginReducer';
import HeaderCustom from '@/components/header';
import ContentCustom from '@/components/content';
import SiderCustom from '@/components/sider';

function App(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [state, dispatch] = useReducer(loginReducer, { user: null, menus: null });
  const { user, menus } = state; // 用戶与权限

  useEffect(() => {
    dispatch({ type: 'QUERY_AUTH_MENUS', payload: { user: props.user, menus: props.menus } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <HeaderCustom />
      <Layout className="g-layout">
        <SiderCustom setCollapsed={(params: boolean) => setCollapsed(params)} />
        <ContentCustom collapsed={collapsed} auth={{ menus: menus, user: user }} />
      </Layout>
    </Layout>
  );
}

export default App;
