import OutsideClickHandler from "react-outside-click-handler";

import disk from '../../assets/images/modal_disk.svg';
import { Loading } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { addGenreErrorSelector, addGenretatusSelector, increamentAddGenreAsync, updateStatus } from "./slice";
import { useEffect, useState } from "react";
import { GetGenreById } from "../../services/api";
import { IAddGenreData, IEditGenreData } from "../../models/genre";
import { SubmitHandler, useForm } from "react-hook-form";
import { editGenreErrorSelector, editGenretatusSelector, increamentEditGenreAsync, updateEditStatus } from "./slice/editGenreSlice";

export interface IGenreProps {
    isOpenModal: Function;
    genreId?: number;
}


export function AddGenre({ isOpenModal, genreId }: IGenreProps) {


    const dispatch = useDispatch();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IAddGenreData | IEditGenreData>();

    const addGenrestatus = useSelector(addGenretatusSelector);
    const addSongError = useSelector(addGenreErrorSelector);
    const editGenreError = useSelector(editGenreErrorSelector);
    const editGenretatus = useSelector(editGenretatusSelector);


    const onSubmit: SubmitHandler<IAddGenreData> = data => {
        if (genreId) {
            dispatch(increamentEditGenreAsync({ id: genreId, name: data.name }) as any);
        }
        else {
            dispatch(increamentAddGenreAsync(data) as any);
        }
    }



    useEffect(() => {
        if (genreId) {
            dispatch(updateEditStatus(""));
        }
        else {
            dispatch(updateStatus(""));
        }



        if (genreId) {
            GetGenreById(genreId)
                .then((result) => {
                    if (result) {
                        setValue('name', result.data.name ? result.data.name : '');
                    }

                })
                .catch((error) => { })
        }

    }, []);


    useEffect(() => {

        if (addGenrestatus === 'idle') {
            isOpenModal(false);
            dispatch(updateStatus(""));
        }

    }, [addGenrestatus]);


    useEffect(() => {

        if (editGenretatus === 'idle') {
            isOpenModal(false);
            dispatch(updateEditStatus(""));
        }

    }, [editGenretatus]);

    return (
        <>
            <div className="add_genre_modal">

                <OutsideClickHandler
                    onOutsideClick={() => {
                        isOpenModal(false)
                    }}>
                    <div className="add_genre_modal_contert">
                        <img src={disk} />
                        <p className='error_message'>{genreId ? editGenreError : addSongError}</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <>
                                <input className='input' placeholder="name" {...register("name", { required: true })} />
                                {errors.name && <span className='error_message' style={{ marginTop: '10px' }}>This field is required</span>}
                            </>

                            <button className='btn' style={{ margin: '50px auto' }}>

                                Submit
                                {
                                    !genreId && addGenrestatus === 'loading' ? <Loading /> : null
                                }

                                {
                                    genreId && editGenretatus === 'loading' ? <Loading /> : null
                                }

                            </button>
                        </form>


                    </div>
                </OutsideClickHandler>
            </div>
        </>
    )
}