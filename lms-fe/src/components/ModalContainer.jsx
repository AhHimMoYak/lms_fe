import Modal from "./Modal.jsx";
import useAxios from "../hooks/api/useAxios.jsx";
import {useEffect, useState} from "react";

const ModalContainer = ({isModalOpen, closeModal, buttonId, liveId, stompClient}) => {

  // 퀴즈 데이터
  const {data:quizData, fetchData:fetchQuizData} = useAxios();
  useEffect(() => {
    fetchQuizData(`/live/${liveId}/quiz`, "GET")
  }, []);

  // 퀴즈 현황 데이터
  const [quizState, setQuizState] = useState([])
  useEffect(() =>{
    if (stompClient && stompClient.connected) {
      const subscribe = stompClient.subscribe(`/sub/quiz/${liveId}/answer`, (message) => {
        const receivedQuizState = JSON.parse(message.body);
        setQuizState([...receivedQuizState]);
      });
      return () => subscribe.unsubscribe();
    }
  })

  return (
    <>
      {isModalOpen && <Modal closeModal={closeModal} buttonId={buttonId} liveId={liveId}
                             stompClient={stompClient} quizData={quizData} quizState={quizState}
      />}
    </>
  )
}

export default ModalContainer;