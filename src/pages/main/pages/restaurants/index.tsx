import Table, { ColumnsType } from "antd/es/table";
import { Pagination } from 'antd';

import { SearchContent } from "../../../../components";

import edite from '../../../../assets/icons/edit.svg';
import { useDispatch, useSelector } from "react-redux";
import { increamentRestautantsAsync, restaurantInformation, restaurantStatus } from "./slice";
import { useEffect } from "react";
import { IRestaurantData } from "../../../../models/restaurants";


const columns: ColumnsType<IRestaurantData> = [
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
      dataIndex: 'phone',
      key: 'phone',
   },
   {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
   },
   {
      title: 'Open Time',
      dataIndex: 'openTime',
      key: 'openTime',
   },
   {
      title: 'Close Time',
      dataIndex: 'closeTime',
      key: 'closeTime',
   },
   {
      title: ' ',
      dataIndex: 'edit',
      key: 'edit',
      render: () => (
         <img
            src={edite}
            className="icon"
         />
      ),
   }
];


export function Restaurats() {

   const dispatch = useDispatch();

   const restaurantData: IRestaurantData[] = useSelector(restaurantInformation);
   const restaurantStatusInfo = useSelector(restaurantStatus);


   useEffect(() => {
      dispatch(increamentRestautantsAsync('') as any);
   }, []);


   return (
      <>
         <div>
            <SearchContent sendSerchValue={((event: any) => {
               dispatch(increamentRestautantsAsync(event) as any);
            })} />
            <div className='page_content'>
               <p className='page_title'>Restaurants</p>
               <Table columns={columns} dataSource={restaurantData} key={restaurantData.length} rowKey={(record) => record.id}/>
            </div>
         </div>
      </>
   )
}