import { Table } from "antd";
import { SearchContent } from "../../../../components";
import { ColumnsType } from "antd/es/table";


import edite from '../../../../assets/icons/edit.svg';
import add from '../../../../assets/icons/add.svg';

import { IGenreData } from "../../../../models/genre";
import { useDispatch, useSelector } from "react-redux";
import { genreInformationSelector, increamentGenreAsync } from "../../../../components/genre/slice";
import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { AddGenre, DeletedModal } from "../../../../modals";
import { addGenretatusSelector } from "../../../../modals/addGenre/slice";



export function Genre() {



    const dispatch = useDispatch();
    const genreInformationData: IGenreData[] = useSelector(genreInformationSelector);
    const [isOpenGenreModal, setIsOpenGenreModal] = useState<boolean>(false);
    const [deletedModalIsOpen, setDeletedModalIsOpen] = useState<boolean>(false);

    const addGenretatus = useSelector(addGenretatusSelector);

    const columns: ColumnsType<IGenreData> = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'Edit',
            dataIndex: 'edit',
            key: 'edit',
            render: () => (
                <img
                    src={edite}
                    className="icon"
                />
            ),
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
            render: () => (
                <DeleteOutlined onClick={(() => {
                    setDeletedModalIsOpen(true)
                })} />
            ),
        }
    ];





    useEffect(() => {
        dispatch(increamentGenreAsync() as any);
    }, []);


    useEffect(() => {
        if (addGenretatus === 'idle') {
            dispatch(increamentGenreAsync() as any);
        }
    }, [addGenretatus]);

    return (
        <>
            <div>
                <SearchContent sendSerchValue={function (event: string): void {
                    throw new Error("Function not implemented.");
                }} />
                <div className='page_content genre_page_content'>
                    <p className='page_title'>Genre</p>
                    <button className="add_btn" onClick={(() => {
                        setIsOpenGenreModal(true);
                    })}>
                        <img src={add} />
                    </button>
                </div>
                <Table columns={columns} dataSource={genreInformationData} rowKey={(record) => record.id} />
                <>
                    {
                        isOpenGenreModal ? <AddGenre isOpenModal={((isOpen: boolean) => {
                            setIsOpenGenreModal(isOpen);
                        })} /> : null
                    }
                </>
                <>
                    {
                        deletedModalIsOpen ? <DeletedModal text='genre' setDeletedModalIsOpen={((isOpen: boolean) => {
                            setDeletedModalIsOpen(isOpen)
                        })} /> : null
                    }
                </>
            </div>
        </>
    )
}