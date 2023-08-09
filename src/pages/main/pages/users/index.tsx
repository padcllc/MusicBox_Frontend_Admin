import Table, { ColumnsType } from "antd/es/table";
import { SearchContent } from "../../../../components";

import edite from '../../../../assets/icons/edit.svg';

interface DataType {
    key: number,
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
}
const columns: ColumnsType<DataType> = [
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
        title: 'Surname',
        dataIndex: 'surname',
        key: 'surname',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },

    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
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


export function Users() {


    const data: DataType[] = [
        {
            key: 1,
            id: 1,
            name: 'Esfera',
            surname: 'Mkrtchyan',
            email: '+(374)93 363444',
            phone: 'Mkrtchyanesfera@gmail.com',
        },
        {
            key: 2,
            id: 2,
            name: 'Esfera',
            surname: 'Mkrtchyan',
            email: '+(374)93 363444',
            phone: 'Mkrtchyanesfera@gmail.com',
        },
        {
            key: 3,
            id: 3,
            name: 'Esfera',
            surname: 'Mkrtchyan',
            email: '+(374)93 363444',
            phone: 'Mkrtchyanesfera@gmail.com',
        },
        {
            key: 4,
            id: 4,
            name: 'Esfera',
            surname: 'Mkrtchyan',
            email: '+(374)93 363444',
            phone: 'Mkrtchyanesfera@gmail.com',
        }

    ];

    return (
        <>
            <div>
                <SearchContent />
                <div className='page_content'>
                    <p className='page_title'>Users</p>
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        </>
    )
}