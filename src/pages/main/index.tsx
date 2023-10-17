
import { Layout } from 'antd';
import { Player, SideNav } from '../../components';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { increamentMainSongsAsync, mainSongsInformationSelector } from './slice';
import { playSongItemSelectorInformationSelector, playSongItemStatusInformationSelector, sendSongItemData, updateSelector } from '../../components/player/slice';
import { ISongsData } from '../../models/songs';

export function Main() {
  const { Sider, Content } = Layout;
  const dispatch = useDispatch();
  const mainSongData = useSelector(mainSongsInformationSelector);
  const playSongItemStatus = useSelector(playSongItemStatusInformationSelector);
  const playSongItemSelector =useSelector(playSongItemSelectorInformationSelector);
  const [selectedSongIndex, setSelectedSongIndex] = useState<number | undefined | any>(0);
  const [songItem, setSongItem] = useState<ISongsData | undefined  | any>();



  useEffect(() => {
    dispatch(increamentMainSongsAsync('') as any);
  }, []);

  useEffect(()=>{
      dispatch(sendSongItemData(mainSongData[0]) as any);
      dispatch(updateSelector('mainContent' as any));
  },[mainSongData]);

  useEffect(()=>{
if(playSongItemStatus.action === 'next' && playSongItemSelector === 'mainContent'){
  setSongItem(mainSongData[selectedSongIndex+1]);
  setSelectedSongIndex(selectedSongIndex+1);
  dispatch(sendSongItemData(songItem) as any);
}
  },[playSongItemStatus]);

  return (
    <>
      <Layout>
        <Layout className='layout'>
          <Sider className='sider'>
            <SideNav />
          </Sider>
          <Content className='main_content'>
            <div className='main_outlet'>
              <Outlet />
            </div>
            <Player/>
          </Content>

        </Layout>


      </Layout>
    </>
  )
}