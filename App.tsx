import React, { useState } from 'react';
import { AppStage } from './types';
import { generateLovePoem } from './services/geminiService';
import { CapybaraSVG } from './components/CapybaraSVG';
import { HeartRain } from './components/HeartRain';

const NO_PHRASES = [
  "No","Are you sure?","Really sure?","Think again!","Last chance!","Surely not?",
  "You might regret this!","Give it another thought!","Are you absolutely certain?",
  "This could be a mistake!","Have a heart!","Don't be so cold!","Change of heart?",
  "Wouldn't you reconsider?","Is that your final answer?","You're breaking my heart ;(",
];

export default function App() {
  const [stage, setStage] = useState<AppStage>(AppStage.ASKING);
  const [noCount, setNoCount] = useState(0);
  const [poem, setPoem] = useState<string>("");
  const [loadingPoem, setLoadingPoem] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);

  const handleNoClick = () => setNoCount(prev => prev + 1);

  const handleYesClick = async () => {
    setStage(AppStage.SUCCESS);

    setLoadingPoem(true);
    const p = await generateLovePoem("Regine");
    setPoem(p);
    setLoadingPoem(false);
  };

  const yesScale = Math.min(1 + noCount * 0.18, 2); // scale instead of huge font-size
  const getNoText = () => NO_PHRASES[Math.min(noCount, NO_PHRASES.length - 1)];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-b from-pink-50 to-pink-200">
      {stage === AppStage.SUCCESS && <HeartRain />}

      <div className="z-10 w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 flex flex-col items-center text-center border-4 border-pink-200">
        {stage === AppStage.ASKING ? (
          <>
            <div className="animate-float mb-6">
              <CapybaraSVG className="w-40 h-40 md:w-48 md:h-48 drop-shadow-lg" emotion={noCount > 3 ? 'sad' : 'happy'} />
            </div>

            <h1 className="text-3xl md:text-4xl font-pacifico text-pink-600 mb-6 md:mb-8">
              Will you be my Valentine?
            </h1>

            <div className="flex flex-col items-center gap-4 w-full">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-transform duration-300 shadow-lg flex items-center justify-center min-w-[150px] py-3 px-8 text-lg md:text-xl"
                style={{ transform: `scale(${yesScale})` }}
                onClick={handleYesClick}
                aria-label="Yes"
              >
                Yes
              </button>

              <button
                className="bg-red-400 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-md text-base md:text-lg"
                onClick={handleNoClick}
                aria-label="No"
              >
                {getNoText()}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-center">
              {loadingImage ? (
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mb-2" />
                  <span className="text-pink-400 text-sm">Creating image...</span>
                </div>
              ) : generatedImage ? (
                <img
                  src={generatedImage}
                  alt="AI Generated Capybara Love"
                  className="w-64 h-64 md:w-72 md:h-72 object-cover rounded-2xl shadow-lg animate-fade-in max-w-full h-auto"
                />
              ) : (
                <CapybaraSVG className="w-40 h-40 md:w-48 md:h-48 drop-shadow-lg animate-bounce" emotion='happy' />
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-pacifico text-pink-600 mb-3">
              Yay! You're now my valentine, <span className="text-pink-800">Regine</span>! ❤️
            </h1>

            <div className="bg-pink-50 p-4 md:p-6 rounded-xl border border-pink-100 shadow-inner w-full mb-6">
              {loadingPoem ? (
                <div className="flex items-center justify-center space-x-2 text-pink-400">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0s'}} />
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                  <span>Writing a poem...</span>
                </div>
              ) : (
                <p className="font-fredoka text-base md:text-lg text-gray-700 italic leading-relaxed whitespace-pre-wrap">
                  "{poem}"
                </p>
              )}
            </div>
          </>
        )}
      </div>

      <div className="absolute bottom-4 text-pink-400 text-sm font-fredoka">
        Made with ❤️ for Regine
      </div>
    </div>
  );
}