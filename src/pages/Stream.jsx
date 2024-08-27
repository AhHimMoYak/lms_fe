import Chatting from "../components/Chatting.jsx";
import {useState} from "react";
import {Drawer} from "@mui/material";
import "../styles/Stream.css"
import StreamVideo from "../components/StreamVideo.jsx";

function Stream(){
    const [chatOpen, setChatOpen] = useState(true);
    const [viewer, setViewer] = useState(0);



    return(
        <>
            <div className="stream-page">

            <StreamVideo/>
            <Chatting setViewer={setViewer} />

            </div>
        </>
    )
}

export default Stream;