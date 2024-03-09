import { createPortal } from "react-dom"

const Modal = ({
    title,
    showClose=true,
    closeName="Close",
    closeClass="",
    closeIcon=null,
    saveName="Save",
    saveClass="",
    saveIcon=null,
    handleSave = () => {},
    handleClose = () => {},
    children
}) => {
  
    return createPortal(
    <>
        <div className="modal" tabIndex="-1" id="generic-modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{title}</h5>
                    { showClose && <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> }
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button type="button" className={`btn ${closeClass}`} data-bs-dismiss="modal" onClick={handleClose}>
                        {closeIcon} {closeName}
                    </button>
                    
                    <button type="button" className={`btn ${saveClass}`} data-bs-dismiss="modal" onClick={handleSave}>
                        {saveName} {saveIcon}
                    </button>
                </div>
                </div>
            </div>
        </div>
    </>, 
        document.getElementById("modal")
    );   
}

export default Modal