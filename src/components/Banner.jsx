// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
import Slider from "react-slick";
import '../styles/BannerTheme.css'
import '../styles/Banner.css'

import banner1 from '../assets/banner1.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';
import banner4 from '../assets/banner4.jpg';
import banner5 from '../assets/banner5.jpg';
import banner6 from '../assets/banner6.jpg';


function CustomSlide(props) {
    // eslint-disable-next-line react/prop-types,no-unused-vars
    const {index, image, ...otherProps} = props;
    const [isError, setIsError] = useState(false);

    const handleImageError = () => {
        setIsError(true);
    }

    return (
        <div {...otherProps} className="custom-slide">
            {isError ? (
                <div className={"error"}>
                    <p>이미지를 불러올 수 없습니다</p>
                </div>
            ) : (
                <img
                    src={image}
                    alt={`Slide`}
                    className="slide-image"
                    onError={handleImageError}
                />)}

        </div>
    );
}

function Banner() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    const images = [banner1, banner2, banner3, banner4, banner5, banner6]

    return (
        <div className="SlideBanner">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <CustomSlide key={index} index={index + 1} image={image}/>
                ))}
            </Slider>
        </div>
    );
}

export default Banner;
