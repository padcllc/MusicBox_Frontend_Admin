import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useRef, useState } from 'react';
import { AddSong } from '../../../../modals';

import add from '../../../../assets/icons/add.svg';
import up from '../../../../assets/icons/up.svg';
import search from '../../../../assets/icons/search.svg';
import settings from '../../../../assets/icons/settings.svg';
import edite from '../../../../assets/icons/edit.svg';

import song_item from '../../../../assets/images/song_item.svg';
import { useDispatch, useSelector } from 'react-redux';
import { increamentSongsAsync, songsInformationSelector } from './slice';
import { ISongsData } from '../../../../models/songs';
import { addSongStatusSelector } from '../../../../modals/addSong/slice';
import { Balk } from '../../../../services/api';

import { message, Space } from 'antd';


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
        render: (record, item: ISongsData) => ([
            <div className='song_title_content'>
                <img
                    className="table_image"
                    onClick={() => { }}
                    crossOrigin="anonymous"
                    src={song_item}
                />
                <div>
                    <p className='song_title'>{item?.name}</p>
                    {/* <p style={{ marginLeft: '8px' }}>Lana Del Rey</p> */}
                </div>

            </div>
        ]

        ),

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
        title: ' ',
        dataIndex: 'edit',
        key: 'edit',
        render: (record) => (
            <img
                src={edite}
                className="icon"
            />
        ),
    }
];


export function Songs() {
    const dispatch = useDispatch();
    const [openAddSongModal, setOpenAddSongModal] = useState<boolean>(false);
    const songsInformationData: ISongsData[] = useSelector(songsInformationSelector);
    const addSongStatus = useSelector(addSongStatusSelector);
    const [messageApi, contextHolder] = message.useMessage();


    useEffect(() => {
        dispatch(increamentSongsAsync('') as any);
    }, []);


    useEffect(() => {
        if (addSongStatus === 'idle') {
            dispatch(increamentSongsAsync('') as any);
        }

    }, [addSongStatus]);


    const fileInputRef = useRef<any>(null);

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
                                        <div className='bar' key={i}></div>
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
                            <input className='bulk_btn' ref={fileInputRef}  type='file' accept=".xls, .xlsx" placeholder='Bulk Insert'
                                onChange={((event: any) => {
                                    let inputElement = event.target;
                                    Balk(inputElement.files[0])
                                        .then((result) => {
                                            messageApi.open({
                                                type: 'success',
                                                content: 'File uploaded successfully',
                                            });

                                        })
                                        .catch((error: any) => {
                                            console.log(error)
                                            messageApi.open({
                                                type: 'error',
                                                content: error.data.errors[0].validationErrkikuor,
                                            });
                                        })
                                    resetFileInput();
                                })} />
                                Bulk Insert
                        </label>

                    </div>
                    <Table columns={columns} dataSource={songsInformationData} />
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
