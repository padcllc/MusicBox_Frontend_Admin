import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useRef, useState } from 'react';
import { AddSong } from '../../../../modals';

import add from '../../../../assets/icons/add.svg';
import up from '../../../../assets/icons/up.svg';
import search from '../../../../assets/icons/search.svg';
import settings from '../../../../assets/icons/settings.svg';
import edite from '../../../../assets/icons/edit.svg';

import { useDispatch, useSelector } from 'react-redux';
import { increamentSongsAsync, songsInformationSelector } from './slice';
import { ISongsData } from '../../../../models/songs';
import { addSongStatusSelector } from '../../../../modals/addSong/slice';
import { Balk } from '../../../../services/api';

import { message } from 'antd';
import { playerSongItemInformationSelector, sendSongItemData, videoIsPlayingInformationSelector } from '../../../../components/player/slice';



export function Songs() {

    const dispatch = useDispatch();
    const [openAddSongModal, setOpenAddSongModal] = useState<boolean>(false);
    const fileInputRef = useRef<any>(null);
    const [messageApi, contextHolder] = message.useMessage();

    const songsInformationData: ISongsData[] = useSelector(songsInformationSelector);
    const addSongStatus = useSelector(addSongStatusSelector);
    const playerSongItem = useSelector(playerSongItemInformationSelector);///es pahin nvagox erge
    const videoIsPlaying = useSelector(videoIsPlayingInformationSelector); /// vido play or not 


    const columns: ColumnsType<ISongsData> = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, item: ISongsData | any) => {
                return (
                    <div className='song_title_content'>
                        <div>
                            <p className='song_title' style={{ color: playerSongItem?.id === item.id ? '#DBB682' : 'black' }} >{item?.name}</p>
                        </div>
                    </div>

                )
            }
        },
        {
            title: 'Url',
            dataIndex: 'url',
            key: 'url',
        },
        {
            title: 'Start Second',
            dataIndex: 'startSecond',
            key: 'startSecond',
        },
        {
            title: 'End Second',
            dataIndex: 'endSecond',
            key: 'endSecond',
        },

        {
            title: '',
            dataIndex: 'edit',
            key: 'edit',
            render: (_, item: ISongsData | any) => (
                <div>
                    <img
                        src={edite}
                        className="icon"
                        onClick={(() => {
                            dispatch(sendSongItemData(item));
                        })}
                    />
                </div>

            ),
        },
        {
            title: '',
            dataIndex: 'play',
            key: 'play',
            render: (_, item: ISongsData | any) => (
                <>
                    {playerSongItem?.id === item.id ?
                        <div className="animation_content">
                            <div className='sound-icon'>
                                <div className='sound-wave'>

                                    {[...Array(5)].map((x, i) =>
                                        <div className='bar' key={i} style={{ display: videoIsPlaying ? 'block' : 'none' }} ></div>
                                    )}
                                </div>
                            </div>
                        </div> : null}
                </>

            ),
        }
    ];


    useEffect(() => {
        dispatch(increamentSongsAsync('') as any);
    }, []);


    useEffect(() => {
        if (addSongStatus === 'idle') {
            dispatch(increamentSongsAsync('') as any);
        }

    }, [addSongStatus]);


    const resetFileInput = () => {
        fileInputRef.current.value = null; // Reset the file input
    }

    return (
        <>
            {contextHolder}
            <div className="song_content">
                <div className="header">
                    <div className='header_contet'>
                        <div className='search_input_content'>
                            <input className='search_input' placeholder='Search'
                                onChange={((event) => {
                                    dispatch(increamentSongsAsync(event.target.value) as any);
                                })} />
                            <img src={search} className='search_icon' />
                        </div>
                        <img src={settings} className='setting_icon' />
                    </div>
                    <div className='song_footer_content'>
                        <div className='btn_content'>
                            <button className="add_btn" onClick={(() => {
                                setOpenAddSongModal(!openAddSongModal)
                            })}>
                                <img src={add} />
                            </button>
                            <button className="add_btn" style={{ marginLeft: '20px' }}>
                                <img src={up} />
                            </button>
                        </div>
                        <div className="animation">
                            <div className='sound-icon'>
                                <div className='sound-wave'>

                                    {[...Array(50)].map((x, i) =>
                                        <div className='bar' key={i} style={{ display: videoIsPlaying ? 'block' : 'none' }}></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='page_content'>
                    <div className='page_header_content'>
                        <p className='page_title'>Songs</p>
                        <label className="bulk_btn">
                            <input className='bulk_btn' ref={fileInputRef} type='file' accept=".xls, .xlsx" placeholder='Bulk Insert'
                                onChange={((event: any) => {
                                    let inputElement = event.target;
                                    Balk(inputElement.files[0])
                                        .then((result) => {
                                            messageApi.open({
                                                type: 'success',
                                                content: 'File uploaded successfully',
                                            });
                                            dispatch(increamentSongsAsync('') as any);
                                        })
                                        .catch((error: any) => {
                                            messageApi.open({
                                                type: 'error',
                                                content: 'sdsddd',
                                            });
                                        })
                                    resetFileInput();
                                })} />
                            Bulk Insert
                        </label>

                    </div>
                    <Table columns={columns} dataSource={songsInformationData} rowKey={(record) => record.id} pagination={{ defaultPageSize: 5 }} />
                </div>
            </div >
            {
                openAddSongModal ?
                    <div>
                        <AddSong setIsOpen={((isOpen: boolean) => {
                            setOpenAddSongModal(isOpen);
                        })} />
                    </div>

                    : null
            }
        </>
    )
}
