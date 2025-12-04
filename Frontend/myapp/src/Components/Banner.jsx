import React, { useState, useEffect } from 'react';
import fashion_sale from '../Media/Banners/fashion_sale.webp';
import fashionsale from '../Media/Banners/fashionsale.jpg';
import kitchensale from '../Media/Banners/kitchensale.jpg';
import styles from '../Css/banner.module.css'
const banners = [fashion_sale, fashionsale, kitchensale];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
    className={`${styles.bannerbox}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '95%',
        margin: '0 auto', // centers banner
        borderRadius: '8px'
      }}
    >
      {banners.map((banner, index) => (
        <img
          key={index}
          src={banner}
          alt={`Banner ${index}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out'
          }}
        />
      ))}

      {/* Navigation dots */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px'
        }}
      >
        {banners.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: index === currentIndex ? 'white' : 'gray',
              cursor: 'pointer'
            }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
