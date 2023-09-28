import OutsideClickHandler from "react-outside-click-handler";

import disk from '../../assets/images/modal_disk.svg';
import { Loading } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { addGenreErrorSelector, addGenretatusSelector, increamentAddGenreAsync, updateStatus } from "./slice";
import { useEffect, useState } from "react";

export interface IGenreProps {
    isOpenModal: Function;
}



export function AddGenre({ isOpenModal }: IGenreProps) {

    const dispatch = useDispatch();
    const addGenretatus = useSelector(addGenretatusSelector);
    const addSongError = useSelector(addGenreErrorSelector);
    const [inputValue, setInputValue] = useState<any>('');


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
                        <input className='input' placeholder="name" onChange={((event) => {
                            setInputValue(event.target.value);

                        })} />
                        <button className='btn' style={{ margin: '50px auto' }} onClick={(() => {
                            dispatch(increamentAddGenreAsync({name:inputValue}) as any);
                        })}>

                            Submit
                            {
                                addGenretatus === 'loading' ? <Loading /> : null
                            }</button>

                    </div>
                </OutsideClickHandler>
            </div>
        </>
    )
}