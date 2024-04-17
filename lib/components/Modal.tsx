//Modal.tsx
'use client'
import React, { useState } from "react";
import styles from 'app/page.module.css'

interface Props {
    nimi : string,
    kuvaus : string
}

export const [open, setOpen] = useState(false);

    const handleToggle = () => {
        if (open == false) {
            setOpen(true);

        } else {
            setOpen(false);
        }
    }

const Modal = ({ nimi, kuvaus }: Props) => {

  if(open == false) {

    return (
      
        <div className="modal-box">
          <button className={styles.genreValikko} 
            data-modal-target="defaultModal" 
            data-modal-toggle="defaultModal" 
            style={{float:"none"}} type="button"
            onClick={handleToggle}>
            Lue lisää...
          </button>
        </div>
    );
  
  } else {
    return (
      
      <div className="modal-box">

        <h1>{nimi}</h1>

        <p>{kuvaus}</p>

        <button className={styles.genreValikko} 
          data-modal-target="defaultModal" 
          data-modal-toggle="defaultModal" 
          style={{float:"none"}} type="button"
          onClick={handleToggle}>
          Sulje
        </button>
      
      </div>
  );
  }
    
};

export default Modal;