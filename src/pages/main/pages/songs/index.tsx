import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { AddSong } from '../../../../modals';

import add from '../../../../assets/icons/add.svg';
import up from '../../../../assets/icons/up.svg';
import search from '../../../../assets/icons/search.svg';
import settings from '../../../../assets/icons/settings.svg';
import edite from '../../../../assets/icons/edit.svg';
import left_headphone from '../../../../assets/images/left_headphone.png';
import right_headphone from '../../../../assets/images/rigt_headphone.png';
import song_item from '../../../../assets/images/song_item.svg';


interface DataType {
    key: number,
    id: number;
    title: string;
    startSecond: string;
    endSecond: string;
    url: string;
    price: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (record) => ([
            <div className='song_title_content'>
                <img
                    className="table_image"
                    onClick={() => { }}
                    crossOrigin="anonymous"
                    src={song_item}
                />
                <div>
                    <p className='song_title'>Young and Beautiful</p>
                    <p style={{ marginLeft: '8px' }}>Lana Del Rey</p>
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
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
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
    const [openAddSongModal, setOpenAddSongModal] = useState<boolean>(false);
    const [songWave, setSongWave] = useState([]);


    useEffect(() => {
    }, [])

    const data: DataType[] = [
        {
            key: 1,
            id: 1,
            title: 'Young and Beautiful',
            startSecond: '3:00',
            endSecond: '3:00',
            url: 'https//musicbox@gmail.com',
            price: '50$',
        },
        {
            key: 2,
            id: 2,
            title: 'Young and Beautiful+ `${<br/>}` Lana Del Rey',
            startSecond: '3:00',
            endSecond: '3:00',
            url: 'https//musicbox@gmail.com',
            price: '50$',
        },
        {
            key: 3,
            id: 3,
            title: 'Young and Beautiful Lana Del Rey',
            startSecond: '3:00',
            endSecond: '3:00',
            url: 'https//musicbox@gmail.com',
            price: '50$',
        },
    ];

    return (
        <>
            <div className="song_content">
                <div className="header">
                    <div className='header_contet'>
                        <div className='search_input_content'>
                            <input className='search_input' placeholder='Search' />
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
                        {/* <div className='headphone_content'>
                            <img src={left_headphone} />
                            <div className="animation">
                                <div className='sound-icon'>
                                    <div className='sound-wave'>

                                        {[...Array(40)].map((x, i) =>
                                            <div className='bar' key={i}></div>
                                        )}
                                    </div>
                                </div>

                            </div>
                            <img src={right_headphone} />
                        </div> */}

                    </div>
                </div>
                <div className='page_content'>
                    <p className='page_title'>Songs</p>
                    <Table columns={columns} dataSource={data} />
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