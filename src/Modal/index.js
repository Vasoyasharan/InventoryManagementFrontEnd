// import React, {useEffect, useRef} from 'react';

// import './index.css';

// const Modal = ({toggleModal, isOpen, children, isClickOutside}) => {
//     const modalRef = useRef(null);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (isClickOutside && modalRef.current && !modalRef.current.contains(event.target)) {
//                 toggleModal();
//             }
//         }

//         // Bind the event listener
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             // Unbind the event listener on cleanup
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [modalRef, isClickOutside, toggleModal])

//     return (
//         <div className="modal" style={isOpen ? {display: 'none'} : null}>
//             <div className="modal__wrapper" ref={modalRef}>
//                 {children}
//             </div>
//         </div>
//     )
// }

// export default Modal;