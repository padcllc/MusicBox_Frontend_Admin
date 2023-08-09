import disk from '../../assets/images/modal_disk.svg';

import OutsideClickHandler from 'react-outside-click-handler';

import { useForm,SubmitHandler  } from "react-hook-form";


export interface IAddSonfProps {
    setIsOpen: Function;
}


export interface IAddSongItem {
    name:string;
    songURL:string;
    startSecond:string;
    endSecond:string;
    genre:string;
}


export function AddSong({setIsOpen}:IAddSonfProps){
    const { register, handleSubmit, watch, formState: { errors } } = useForm<IAddSongItem>();

    const onSubmit: SubmitHandler<IAddSongItem> = data => console.log(data);

return(
    <>
    
    <div className="add_song_modal">
    <OutsideClickHandler
            onOutsideClick={() => {
                setIsOpen(false)
            }}
        >
        <div className="add_song_modal_contert">
            <div className="modal_left_content">
                <img src={disk}/>
            </div>
            <div className='modal_right_content'>
            <div className='form_content'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <>
                    <input className='input' style={{height:'40px'}} placeholder='Name' {...register("name",{required:true})}/>
                    {errors.name && <span className='error_message'>This field is required</span>}
                    </>
                  <>
                  <input className='input' style={{height:'40px'}} placeholder='Song URL' {...register("songURL",{required:true})}/>
                  {errors.songURL && <span className='error_message'>This field is required</span>}
                  </>
                    <>
                  
                    <input className='input' style={{height:'40px'}} placeholder='Start Second' {...register("startSecond",{required:true})}/>
                    {errors.startSecond && <span className='error_message'>This field is required</span>}
                    </>
                  <>
                
                  <input className='input' style={{height:'40px'}} placeholder='End Second' {...register("endSecond",{required:true})}/>
                  {errors.endSecond && <span className='error_message'>This field is required</span>}
                  </>
               <>
               
               <input type='select' className='input' style={{height:'40px'}} placeholder='Genre'  {...register("genre",{required:true})}/>
               {errors.genre && <span className='error_message'>This field is required</span>}
               </>
             
               <button className='btn' style={{margin:'50px auto'}}>Submit</button>
                </form>
             
            </div>
            </div>
           
        </div>
        </OutsideClickHandler>
        </div>
        </>
)
}