import Table, { ColumnsType } from "antd/es/table";
import { SearchContent } from "../../../../components";

import edite from '../../../../assets/icons/edit.svg';

interface DataType {
   key: number,
   id: number;
   name: string;
   phonenumber: string;
   address: string;
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
      title: 'Phone Number',
      dataIndex: 'phonenumber',
      key: 'phonenumber',
   },
   {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
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


export function Restaurats() {


   const data: DataType[] = [
      {
         key: 1,
         id: 1,
         name: 'KumKuma Gyumri',
         phonenumber: '+(374)93 363444',
         address: 'Garegin Nzhdeh Avenue, Gyumri',
      },
      {
         key: 2,
         id: 2,
         name: 'KumKuma Gyumri',
         phonenumber: '+(374)93 363444',
         address: 'Garegin Nzhdeh Avenue, Gyumri',
      },
      {
         key: 3,
         id: 3,
         name: 'KumKuma Gyumri',
         phonenumber: '+(374)93 363444',
         address: 'Garegin Nzhdeh Avenue, Gyumri',
      },

   ];

   return (
      <>
         <div>
            <SearchContent />
            <div className='page_content'>
               <p className='page_title'>Restaurants</p>
               <Table columns={columns} dataSource={data} />
            </div>
         </div>
      </>
   )
}