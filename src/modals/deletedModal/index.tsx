import OutsideClickHandler from "react-outside-click-handler";


export interface DeletedModalProps {
    setDeletedModalIsOpen: Function;
    text:string,
}

export function DeletedModal({ setDeletedModalIsOpen,text }: DeletedModalProps) {
    return (
        <>
            <div className="deleted_modal">
               
                <OutsideClickHandler
                    onOutsideClick={() => {
                        setDeletedModalIsOpen(false); 
                    }}>
                    <div className="deleted_modal_contert">
                    <p className="text">Are you sure you want to delete this {text}?</p>
                    <div className="btn_content">
                    <button className="delete_btn" onClick={(() => {
                            setDeletedModalIsOpen(true)
                        })}>Deleted</button>
                        <button className="cancel_btn"  onClick={(() => {
                            setDeletedModalIsOpen(false)
                        })}>Cancel</button>
                    </div>
                       
                    </div>
                </OutsideClickHandler>
            </div>
        </>
    )
}