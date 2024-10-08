import React from 'react'
//Ui Components
import { BsTrash } from 'react-icons/bs';
import DefaultButton from '../../../ui-components/defaultbutton';
import SecondaryButton from '../../../ui-components/secondarybutton';
//CSS
import "./deletedialog.scss"

const DeleteDialog = (props) => {
    const { onHide } = props;
    return (
        <>
            <div className={"delete_Icon"}>
                <BsTrash />
            </div>
            <div className={"delete_header"}>
                <h5>Delete Document</h5>
                <p>Are you sure you want to delete this?</p>
            </div>
            <div className={"delete_button"}>
                <DefaultButton label="Cancel" type="button" onClick={onHide} />
                <SecondaryButton label="Confirm" type="button" onClick={onHide} />
            </div>
        </>
  )
}

export default DeleteDialog
