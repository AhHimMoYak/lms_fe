// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import '../styles/BannerTheme.css';
import '../styles/Banner.css';

// eslint-disable-next-line react/prop-types
function CustomSlide({ image, ...otherProps }) {
    const [isError, setIsError] = useState(false);

    const handleImageError = () => {
        setIsError(true);
    };

    return (
        <div {...otherProps} className="custom-slide">
            {isError ? (
                <div className="error">
                    <p>이미지를 불러올 수 없습니다</p>
                </div>
            ) : (
                <img
                    src={image}
                    alt="Slide"
                    className="slide-image"
                    onError={handleImageError}
                />
            )}
        </div>
    );
}

export default CustomSlide;
