import disk from '../../assets/images/modal_disk.svg';

import OutsideClickHandler from 'react-outside-click-handler';

import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { genreInformationSelector, increamentGenreAsync } from '../../components/genre/slice';
import { IGenreData } from '../../models/genre';
import { addSongErrorSelector, addSongStatusSelector, increamentAddSongAsync,updateStatus } from './slice';
import { Loading } from '../../components';


export interface IAddSonfProps {
    setIsOpen: Function;
}


export interface IAddSongItem {
    name: string;
    url: string;
    startSecond: number;
    endSecond: number;
    genreId: number;
}


export function AddSong({ setIsOpen }: IAddSonfProps) {


    const dispatch = useDispatch();
    const genreInformationData: IGenreData[] = useSelector(genreInformationSelector);

    const addSongStatus = useSelector(addSongStatusSelector);
    const addSongError = useSelector(addSongErrorSelector);


    const { register, handleSubmit, watch, formState: { errors } } = useForm<IAddSongItem>();

    const onSubmit: SubmitHandler<IAddSongItem> = data => dispatch(increamentAddSongAsync(data) as any);

    useEffect(() => {
        dispatch(increamentGenreAsync() as any);
    }, []);

    useEffect(() => {
        dispatch(updateStatus(""));
    }, []);


    useEffect(() => {
        if (addSongStatus === 'idle') {
            setIsOpen(false);
            dispatch(updateStatus(""));
        }

    }, [addSongStatus]);


    return (
        <>

            <div className="add_song_modal">
                <OutsideClickHandler
                    onOutsideClick={() => {
                        setIsOpen(false)
                    }}
                >
                    <div className="add_song_modal_contert">
                        <div className="modal_left_content">
                            <img src={disk} />
                        </div>
                        <div className='modal_right_content'>
                            <div className='form_content'>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <p className='error_message'>{addSongError}</p>
                                    <>
                                        <input className='input' style={{ height: '40px' }} placeholder='Name' {...register("name", { required: true })} />
                                        {errors.name && <span className='error_message'>This field is required</span>}
                                    </>
                                    <>
                                        <input className='input' style={{ height: '40px' }} placeholder='Song URL' {...register("url", { required: true })} />
                                        {errors.url && <span className='error_message'>This field is required</span>}
                                    </>
                                    <>

                                        <input className='input' style={{ height: '40px' }} placeholder='Start Second' {...register("startSecond", { required: true, }

                                        )}
                                        />
                                        {errors.startSecond && <span className='error_message'>This field is required</span>}
                                    </>
                                    <>

                                        <input className='input' style={{ height: '40px' }} placeholder='End Second' {...register("endSecond", { required: true })} />
                                        {errors.endSecond && <span className='error_message'>This field is required</span>}
                                        <select className='input' style={{ height: '55px' }} placeholder='Genre' {...register("genreId", { required: true })}>
                                            {
                                                genreInformationData.map((element: IGenreData, index) => {
                                                    return <option  key={index + 1} value={+element?.id}>{element?.name}</option>
                                                })
                                            }

                                        </select>
                                        {errors.genreId && <span className='error_message'>This field is required</span>}
                                    </>
                                    <button className='btn' style={{ margin: '50px auto' }}>Submit
                                        {
                                            addSongStatus === 'loading' ? <Loading /> : null
                                        }</button>
                                </form>

                            </div>
                        </div>

                    </div>
                </OutsideClickHandler>
            </div>
        </>
    )
}

