// import axios from 'axios';
// import React, { useRef, useState } from 'react'
// import { addBroker } from '../../Api/DevanshiApi';

// function Modal() {
//     const [brokers, setBrokers] = useState([]);
//     const [brokerName, setBrokerName] = useState("");
//     const [brokerNameError, setbrokerNameError] = useState("");
//     const [brokerContactError, setbrokerContactError] = useState("");
//     const [brokerAddressError, setbrokerAddressError] = useState("");
//     const [brokerMobileNumber, setbrokerMobileNumber] = useState("");
//     const [brokerAddress, setBrokerAddress] = useState("");
//     const brokerNameRef = useRef(null);
//     const brokerAddressRef = useRef(null);
//     const brokerContactRef = useRef(null);
//     const modalSubmitRef = useRef(null);
//     const [showModal, setShowModal] = useState(false);
//     const [modalType, setModalType] = useState("");
//     const [loading, setLoading] = useState(false);

//     const handleCloseModal = () => {
//         setShowModal(false);
//         setBrokerName("");
//         brokerMobileNumber("");
//         setBrokerAddress("");
//     };

//     const handleEnter = (e, nextField) => {
//         if (e.key === "Enter" && nextField?.current) {
//             e.preventDefault();
//             nextField.current.focus();
//         }
//         if (e.key === "Enter" && nextField?.current) {
//             e.preventDefault();
//             storeBroker(e);
//         }
//     };

//     const storeBroker = async (e) => {
//         e.preventDefault();
//         let isValid = true;

//         if (!brokerName) {
//             setbrokerNameError(true);
//             isValid = false;
//         } else {
//             setbrokerNameError(false);
//         }

//         if (!brokerAddress) {
//             setbrokerAddressError(true);
//             isValid = false;
//         } else {
//             setbrokerAddressError(false);
//         }

//         if (!brokerMobileNumber) {
//             setbrokerMobileNumber(true);
//             isValid = false;
//         } else {
//             setbrokerMobileNumber(false);
//         }

//         if (!isValid) return;
//         setLoading(true);

//         try {
//             const token = localStorage.getItem("token");
//             console.log(token);
//             const response = await axios.post(
//                 addBroker,
//                 {
//                     brokerName,
//                     brokerMobileNumber,
//                     brokerAddress
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );
//             const result = response.data;
//             if (result.status) {
//                 setBrokers((prevBrokers) => [
//                     ...prevBrokers,
//                     {
//                         id: result.data.id,
//                         brokerName: result.data.brokerName,
//                         brokerAddress: result.data.brokerAddress,
//                         brokerMobileNumber: result.data.brokerMobileNumber,
//                     },
//                 ]);
//                 setBrokerName('');
//                 setbrokerMobileNumber('');
//                 setBrokerAddress('');
//                 handleCloseModal();
//             } else {
//                 console.error(result.message);
//             }
//         } catch (error) {
//             console.error('Error adding broker:', error);
//         }
//     };

//     return (
//         <>
//             <Modal show={showModal} onHide={handleCloseModal} dialogClassName="custom-modal">
//                 <Modal.Header closeButton className="d-flex justify-content-center">
//                     <Modal.Title className="w-100 text-center">{modalType} Broker</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <div className="row pt-4">
//                         <div className="col position-relative">
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="name"
//                                 placeholder="Name"
//                                 name="name"
//                                 ref={brokerNameRef}
//                                 onKeyDown={(e) => handleEnter(e, brokerContactRef)}
//                                 value={brokerName}
//                                 onChange={(e) => setBrokerName(e.target.value)}
//                             />
//                         </div>
//                     </div>
//                     <div className="row pt-4">
//                         <div className="col position-relative">
//                             <input
//                                 type="number"
//                                 className="form-control"
//                                 id="Mobile Number"
//                                 placeholder="Mobile Number"
//                                 name="Mobile Number"
//                                 ref={brokerContactRef}
//                                 value={brokerMobileNumber}
//                                 onKeyDown={(e) => handleEnter(e, brokerAddressRef)}
//                                 onChange={(e) => setbrokerMobileNumber(e.target.value)}
//                             />
//                         </div>
//                     </div>
//                     <div className="row pt-4">
//                         <div className="col position-relative">
//                             <textarea
//                                 className="form-control"
//                                 placeholder="Address"
//                                 id="floatingTextarea"
//                                 value={brokerAddress}
//                                 ref={brokerAddressRef}
//                                 onKeyDown={(e) => handleEnter(e, modalSubmitRef)}
//                                 onChange={(e) => setBrokerAddress(e.target.value)}
//                             />
//                         </div>
//                     </div>
//                 </Modal.Body>
//                 <Modal.Footer className="d-flex justify-content-center">
//                     <button
//                         type="button"
//                         className="btn btn-secondary w-25"
//                         onClick={storeBroker}
//                         ref={modalSubmitRef}
//                     >
//                         Submit
//                     </button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     )
// }

// export default Modal
