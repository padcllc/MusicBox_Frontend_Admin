
import { Layout } from 'antd';
import { Player, SideNav } from '../../components';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { increamentMainSongsAsync, mainSongsInformationSelector } from './slice';
import {
  sendSongItemData,
  playSongItemStatusInformationSelector,
  selectedSongIndexInformationSelector,
  updateSelectedSongIndex,
  playerSongItemInformationSelector
} from '../../components/player/slice';

export function Main() {
  const { Sider, Content } = Layout;
  const dispatch = useDispatch();
  const mainSongData = useSelector(mainSongsInformationSelector);
  const playSongItemStatus = useSelector(playSongItemStatusInformationSelector);///next or prew
  const playerSongItem = useSelector(playerSongItemInformationSelector);///ex pahin nvagox erge
  const selectedSongIndex = useSelector(selectedSongIndexInformationSelector);///ergi index

  useEffect(() => {
    dispatch(increamentMainSongsAsync('') as any);
  }, []);

  useEffect(() => {
    dispatch(sendSongItemData(mainSongData[0]) as any);
  }, [mainSongData]);

  useEffect(() => {
    if (playSongItemStatus.action === 'next') {
      const index = mainSongData.findIndex((item: any) => item.id === playerSongItem.id);
      dispatch(updateSelectedSongIndex(index + 1));
    }
    else if (playSongItemStatus.action === 'previous') {
      const index = mainSongData.findIndex((item: any) => item.id === playerSongItem.id);
      if (index > 0) {
        dispatch(updateSelectedSongIndex(index - 1 as any));
      }
    }
  }, [playSongItemStatus]);

  useEffect(() => {
    dispatch(sendSongItemData(mainSongData[selectedSongIndex]) as any);
  }, [selectedSongIndex]);

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
            <Player />
          </Content>

        </Layout>


      </Layout>
    </>
  )
}