import { useState } from 'react';
import bg from './assets/bg.svg';
import touchSeaweed from './assets/Touch_seaweed.svg';
import touchSeaweedHover from './assets/Touch_seaweed_hover.svg';
import buyNemoIcon from './assets/Buy_nemo.svg';
import buyBubleIcon from './assets/Buy_buble.svg';
import buyDoriIcon from './assets/Buy_dori.svg';
import nemoImg from './assets/Nemo.svg';
import doriImg from './assets/Dori.svg';
import bubleImg from './assets/Buble.svg'; // tambahkan ini

function getRandomPosition() {
  return {
    top: Math.floor(Math.random() * 5),
    left: Math.floor(Math.random() * 5),
  };
}

export default function AquariumGame() {
  const [count, setCount] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [nemos, setNemos] = useState([]);
  const [doris, setDoris] = useState([]);
  const [bubles, setBubles] = useState([]);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  const buyFish = (type) => {
    if (type === 'nemo' && count >= 10) {
      setCount(count - 10);
      const newFish = { id: Date.now(), position: getRandomPosition() };
      setNemos((prev) => [...prev, newFish]);
    }
    if (type === 'dori' && count >= 30) {
      setCount(count - 30);
      const newFish = { id: Date.now(), position: getRandomPosition() };
      setDoris((prev) => [...prev, newFish]);
    }
    if (type === 'buble' && count >= 15) {
      setCount(count - 15);
      const newBuble = { id: Date.now(), left: Math.random() * 90 + '%' };
      setBubles((prev) => [...prev, newBuble]);
    }
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex flex-col justify-between items-center p-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Counter */}
      <div className="text-center mt-4">
        <h1 className="text-white text-4xl font-bold drop-shadow">Touch the Seaweed</h1>
        <p className="text-white text-2xl mt-2">{count.toString().padStart(6, '0')}</p>
      </div>

      {/* Buy Buttons */}
      <div className="flex justify-center gap-8 mb-4">
        <img
          src={buyNemoIcon}
          alt="Buy Nemo"
          className={`w-16 cursor-pointer transition-transform ${
            count >= 10 ? 'hover:scale-110' : 'opacity-50 cursor-not-allowed'
          }`}
          onClick={() => count >= 10 && buyFish('nemo')}
        />
        <img
          src={buyBubleIcon}
          alt="Buy Buble"
          className={`w-16 cursor-pointer transition-transform ${
            count >= 15 ? 'hover:scale-110' : 'opacity-50 cursor-not-allowed'
          }`}
          onClick={() => count >= 15 && buyFish('buble')}
        />
        <img
          src={buyDoriIcon}
          alt="Buy Dori"
          className={`w-16 cursor-pointer transition-transform ${
            count >= 30 ? 'hover:scale-110' : 'opacity-50 cursor-not-allowed'
          }`}
          onClick={() => count >= 30 && buyFish('dori')}
        />
      </div>

      {/* Seaweed Button */}
      <div className="flex-grow flex justify-center items-center">
        <img
          src={isHover ? touchSeaweedHover : touchSeaweed}
          alt="Touch Seaweed"
          className="w-52 cursor-pointer"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={handleClick}
        />
      </div>

      {/* Fish & Buble Container */}
      <div className="grid grid-cols-5 grid-rows-5 gap-4 w-full h-64 relative">
        {nemos.map((nemo) => (
          <div
            key={nemo.id}
            className="animate-bounce-slow flex justify-center items-center"
            style={{ gridColumn: nemo.position.left + 1, gridRow: nemo.position.top + 1 }}
          >
            <img src={nemoImg} alt="Nemo" className="w-16 h-16" />
          </div>
        ))}
        {doris.map((dori) => (
          <div
            key={dori.id}
            className="animate-bounce-slow flex justify-center items-center"
            style={{ gridColumn: dori.position.left + 1, gridRow: dori.position.top + 1 }}
          >
            <img src={doriImg} alt="Dori" className="w-16 h-16" />
          </div>
        ))}
        {bubles.map((buble) => (
          <img
            key={buble.id}
            src={bubleImg}
            alt="Buble"
            className="w-8 absolute animate-buble"
            style={{ bottom: 0, left: buble.left }}
          />
        ))}
      </div>

      {/* Custom Animation */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }

        @keyframes buble-rise {
          0% { bottom: 0; opacity: 1; }
          100% { bottom: 100%; opacity: 0; }
        }
        .animate-buble {
          animation: buble-rise 4s linear forwards;
        }
      `}</style>
    </div>
  );
}
