import '../styles/Banner.css'

import banner1 from '../assets/banner1.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';
import banner4 from '../assets/banner4.jpg';
import banner5 from '../assets/banner5.jpg';
import banner6 from '../assets/banner6.jpg';

import {useEffect, useState} from "react";


function Banner() {
    const images = [banner1, banner2, banner3, banner4, banner5, banner6]
    const [imageSlide, setImageSlide] = useState(0);

    const firstSlideIndex = 0;
    const lastSlideIndex = images.length - 1;
    const moveSlideIndex = 1;

    const [intervalId, setIntervalId] = useState(null);

    const moveToSlide = (value) => {
        if (value === 'next') {
            setImageSlide((prevState) =>
                prevState < lastSlideIndex
                    ? prevState + moveSlideIndex
                    : firstSlideIndex
            )
        }
        if (value === 'prev') {
            setImageSlide((prevState) =>
                prevState > firstSlideIndex
                    ? prevState - moveSlideIndex
                    : lastSlideIndex
            )
        }
    }

    const autoMoveSlide = () => {
        if (intervalId !== null) {
            clearInterval(intervalId);
        }
        setIntervalId(
            setInterval(() => {
                setImageSlide((prevState) =>
                    prevState < lastSlideIndex
                        ? prevState + moveSlideIndex
                        : firstSlideIndex
                )
            }, 3000)
        )
    }


    useEffect(() => {
        autoMoveSlide();
        return () => clearInterval(intervalId)
    }, [])

    const handlePaginationClick = (index) => {
        setImageSlide(index);
        autoMoveSlide();
    }


    return (
        <div className='banner-slide'>
            <button className='prev-button' onClick={() => moveToSlide('prev')}>
                prev
            </button>
            <div className='banner-images'>{
                images.map((image, index) => (
                    <div className='show-image'
                         key={index}
                         style={{
                             transform: `translateX(${-1100 * imageSlide}px)`,
                         }}
                    >
                        <img src={image} alt={`Slide ${index + 1}`} style={{width: '100%', height: 'auto'}}/>
                    </div>
                ))
            }
            </div>
            <ol className='slide-index'>
                {
                    images.map((_, index) => (
                        <li key={index}
                            className={`index-item ${imageSlide === index ? 'active' : ''}`}
                            onClick={() => handlePaginationClick(index)}
                        >
                            {index + 1}
                    </li>
                    ))
                }
            </ol>
            <button
                className='next-button'
                onClick={() => moveToSlide('next')}>
                next
            </button>
        </div>
    )
}

export default Banner;
