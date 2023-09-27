import { Table } from "antd";
import { SearchContent } from "../../../../components";

export function Admin(){
    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
      ];
    return (
        <>
            <div>
                <SearchContent sendSerchValue={function (event: string): void {
            throw new Error("Function not implemented.");
          } } />
                <div className='page_content'>
                    <p className='page_title'>Admin</p>
                    <Table dataSource={dataSource} columns={columns} />
                </div>
            </div>
        </>
    )
}