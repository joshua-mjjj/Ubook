import React from 'react';
import people from '../../assets/people.png';
import start from '../../assets/start.mp4';
import ai from '../../assets/ai.png';
import './header.css';
import StartGif from '../../assets/animations/27315-appointment-booking-with-smartphone.json';
import Lottie from 'react-lottie';

const Header = () => {

  const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: StartGif,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }; 

  return(
      <div className="gpt3__header section__padding" id="home">
        <div className="gpt3__header-content">
          <h1 className="">BOOK ACCOMODATION PROPERTIES ANYTIME YOU WANT!</h1>
          <p>We deal in apartments, rentals, hostel rooms, hotel reservations, motels and many more...</p>

          <div className="gpt3__header-content__people">
            <img src={people} />
            <p>Over 1K people have booked in the last 4 hours</p>
          </div>

          <div className="gpt3__header-content__input">
           {/* <input type="email" placeholder="Your Email Address" />*/}
            <button type="button" onClick={() => window.location.href = "#wgpt3"} >Get started > </button>
          </div>
        </div>

        <div className="gpt3__header-image">
          {/*<img src={ai} />*/}
          {/*<video src={start} autoPlay={true} loop muted />*/}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
             <Lottie options={defaultOptions}
                height={500}
                width={500}
              />
             {/* <Lottie options={defaultOptions}
                height={250}
                width={250}
              />*/}
          </div>
        </div>
      </div>
  )
};

export default Header;
