import { Table } from "antd";
import { SearchContent } from "../../../../components";
import { ColumnsType } from "antd/es/table";


import edite from '../../../../assets/icons/edit.svg';
import { IGenreData } from "../../../../models/genre";
import { useDispatch, useSelector } from "react-redux";
import { genreInformationSelector, increamentGenreAsync } from "../../../../components/genre/slice";
import { useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";

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
        dataIndex: 'edit',
        key: 'edit',
        render: () => (
            <DeleteOutlined />
        ),
    }
];


export function Genre(){

    
    const dispatch = useDispatch();
    const genreInformationData: IGenreData[] = useSelector(genreInformationSelector);

    useEffect(() => {
        dispatch(increamentGenreAsync() as any);
    }, []);

    
    return (
        <>
        <div>
                <SearchContent sendSerchValue={function (event: string): void {
            throw new Error("Function not implemented.");
          } } />
                <div className='page_content'>
                    <p className='page_title'>Genre</p>
                </div>
                <Table columns={columns} dataSource={genreInformationData}  rowKey={(record) => record.id}/>
            </div>
        </>
    )
}