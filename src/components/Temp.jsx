import AuthManger from "../hooks/api/AuthManger";
import useAxios from "../hooks/api/useAxios";
import useGet from "../hooks/api/useGet";
import { useEffect, useState } from 'react';


function Temp() {
    const { fetchData, data, error } = useAxios();
    const { Register }= AuthManger();

    

    // 기본 get 사용 법
    useEffect(() => {
        fetchData("/accesstoken", "get");
    }, []); 

    // post 사용법1
    useEffect(() => {
        const body = {
            "email" : "jang123@gmail.com"
          }
        fetchData("/email", "post", body);
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    // 사용법 2
    const fetchData2 = async () => {
        const body = {
            "email" : "jang123@gmail.com"
          }
        await fetchData("/email", "post", body);
    };


    useEffect(() => {
        fetchData2();
    }, []);


    return(
        <>
            <h1>Temp</h1>
        </>
    );
}

export default Temp;