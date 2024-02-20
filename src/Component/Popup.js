import React from 'react'
import '../Stlyles/Popup.css'

function Popup({message,type}) {

    const handleClose = () => {
        // setVisible(false);
        // onClose && onClose();
        console.log('button clicked')
      };
  return (
    <div className='popup-wrapper'>

        <div className='popup-card'>

            <h6>{message}</h6>
            <button onClick={handleClose}>ok</button>

        </div>
      
    </div>
  )
}


export default Popup
