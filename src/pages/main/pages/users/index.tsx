import Table, { ColumnsType } from "antd/es/table";
import { SearchContent } from "../../../../components";

import edite from '../../../../assets/icons/edit.svg';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { increamentUsersAsync, usersInformation } from "./slice";
import { IUserData } from "../../../../models/users";


const columns: ColumnsType<IUserData> = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
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

    const dispatch = useDispatch();
    const usersInformationData: IUserData[] = useSelector(usersInformation);

    useEffect(() => {
        dispatch(increamentUsersAsync() as any);
    }, []);


    return (
        <>
            <div>
                <SearchContent />
                <div className='page_content'>
                    <p className='page_title'>Users</p>
                    <Table columns={columns} dataSource={usersInformationData} />
                </div>
            </div>
        </>
    )
}