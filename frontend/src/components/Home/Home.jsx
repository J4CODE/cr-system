// Home.jsx
import myGif from '/src/assets/rfid-tracking.gif';
import { FaXTwitter, FaLinkedin } from 'react-icons/fa6';

const Home = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="max-w-lg text-center">
        <h1 className="text-2xl text-black font-bold">Welcome to My Canna Reg System</h1>
        <img src={myGif} alt="RFID Tracking" className="mt-4" />
        <h2 className="text-lg text-black font-bold">Seed to sale, no other platform tracks and traces assets using cutting-edge software, radio-frequency identification (RFID) technology, a dedicated customer support team, and the most advanced secure database.</h2>

        <div className="flex mt-4 space-x-4 flex justify-center items-center p-4">
        <a href="https://x.com/official_metrc?lang=en" target="_blank" rel="noopener noreferrer">
          <FaXTwitter size={32} className="text-black hover:text-lime-900" />
        </a>
        <a href="https://www.linkedin.com/company/metrc-llc/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={32} className="text-black hover:hover:text-lime-900" />
        </a>
      </div>
      <div className="flex mt-4 space-x-4 flex justify-center items-center p-4 text-black">
        <h2>Contact Us at:</h2>
        <a className='text-black' href="mailto:info@example.com" target="_blank" rel="noopener noreferrer">info@metrc.com</a>
      </div>
      </div>
    </div>
  );
};

export default Home;

