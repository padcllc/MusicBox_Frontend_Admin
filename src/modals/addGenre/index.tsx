import OutsideClickHandler from "react-outside-click-handler";

import disk from '../../assets/images/modal_disk.svg';
import { Loading } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { addGenreErrorSelector, addGenretatusSelector, increamentAddGenreAsync, updateStatus } from "./slice";
import { useEffect, useState } from "react";
import { GetGenreById } from "../../services/api";
import { IAddGenreData } from "../../models/genre";
import { SubmitHandler, useForm } from "react-hook-form";

export interface IGenreProps {
    isOpenModal: Function;
    genreId?: number;
}


export function AddGenre({ isOpenModal, genreId }: IGenreProps) {


    const dispatch = useDispatch();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IAddGenreData>();

    const addGenretatus = useSelector(addGenretatusSelector);
    const addSongError = useSelector(addGenreErrorSelector);


    const onSubmit: SubmitHandler<IAddGenreData> = data => {
        if (genreId) {
            console.log('grel edit-i functione')
        }
        else {
            dispatch(increamentAddGenreAsync(data) as any);
        }
    }



    useEffect(() => {
        dispatch(updateStatus(""));

        if (genreId) {
            GetGenreById(genreId)
                .then((result) => {
                    if (result) {
                        console.log(result.data.name)
                        setValue('name', result.data.name ? result.data.name : '');
                    }

                })
                .catch((error) => { })
        }

    }, []);


    useEffect(() => {

        if (addGenretatus === 'idle') {
            isOpenModal(false);
            dispatch(updateStatus(""));
        }

    }, [addGenretatus]);

    return (
        <>
            <div className="add_genre_modal">

                <OutsideClickHandler
                    onOutsideClick={() => {
                        isOpenModal(false)
                    }}>
                    <div className="add_genre_modal_contert">
                        <img src={disk} />
                        <p className='error_message'>{addSongError}</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <>
                                <input className='input' placeholder="name" {...register("name", { required: true })} />
                                {errors.name && <span className='error_message' style={{ marginTop: '10px' }}>This field is required</span>}
                            </>

                            <button className='btn' style={{ margin: '50px auto' }}>

                                Submit
                                {
                                    addGenretatus === 'loading' ? <Loading /> : null
                                }</button>
                        </form>


                    </div>
                </OutsideClickHandler>
            </div>
        </>
    )
}