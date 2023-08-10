
import { Layout } from 'antd';
import { Player, SideNav } from '../../components';
import { Outlet } from 'react-router-dom';

export function Main(){
    const { Footer, Sider, Content } = Layout;
    return(
        <>
        <Layout>
      <Layout className='layout'>
        <Sider className='sider'>
            <SideNav/>
        </Sider>
        <Content>
           <Outlet />
        </Content>
      </Layout>
      <Player/>
      {/* <Footer>Footer</Footer> */}
    </Layout>
        </>
    )
}