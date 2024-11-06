import Modal from "./Modal.jsx";
import useAxios from "../hooks/api/useAxios.jsx";
import {useEffect, useState} from "react";
import UserModal from "./UserModal.jsx";

const UserModalContainer = ({isModalOpen, openModal, closeModal, liveId, stompClient, buttonId, setModalId}) => {


  // 실시간 퀴즈 데이터
  const [quiz, setQuiz] = useState()
  useEffect(() =>{
    if (stompClient && stompClient.connected) {
      const subscribe = stompClient.subscribe(`/sub/quiz/${liveId}`, (message) => {
        const receivedQuiz = JSON.parse(message.body);
        setQuiz(receivedQuiz);
        setModalId("solve");
        openModal();
      });
      return () => subscribe.unsubscribe();
    }
  })

  //퀴즈 기록
  const [history, setHistory] = useState([])
  const addHistory = (result) => {
    setHistory((prevHistory) => [...prevHistory, result]);
  }

  return (
    <>
      {isModalOpen && <UserModal closeModal={closeModal} liveId={liveId} buttonId={buttonId}
                             stompClient={stompClient} quiz={quiz} history={history} addHistory={addHistory}/>}
    </>
  )
}

export default UserModalContainer;