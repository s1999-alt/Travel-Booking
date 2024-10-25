import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import Lottie from 'react-lottie'
import animationData from '../../assets/Animation.json'

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const SuccessPage = () => {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const isSuccess = searchParams.get('success');

    if (isSuccess === 'true') {
      console.log('Payment Successful');
    } else {
      console.log('Payment Unsuccessful');
    }
  }, [location.search]);

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 2000 }, 
  });

  return (
    <animated.div style={fadeIn}>
      <div style={styles.container}>
        <div style={{ animation: 'your-animation-name 2s forwards' }}>
          <Lottie options={lottieOptions} height={300} width={300} />
        </div>
        <h1 style={styles.message}>
          {location.search.includes('success=true')
            ? 'Payment Successful. You will receive an email shortly with your booking content.'
            : 'Payment Unsuccessful. Please try again or contact support.'}
        </h1>
      </div>
    </animated.div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  message: {
    fontSize: '24px',
    color: '#333',
  },
};

export default SuccessPage;