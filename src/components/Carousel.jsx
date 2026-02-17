import React, { useEffect, useMemo, useRef, useState } from 'react';

const imagesContext = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp}', { eager: true });
const songContext = import.meta.glob('../assets/songs/*.{mp3,ogg,wav}', { eager: true });

const photos = Object.values(imagesContext).map((mod) => mod.default);

const songs = Object.entries(songContext).map(([path, mod]) => {
  const fileName = path.split('/').pop() || 'Canción';
  const title = fileName.replace(/\.[^/.]+$/, '');
  return { title, src: mod.default };
});

  


const colors = ['red', 'blue', 'green', 'purple', 'orange'];
  const languages = [
    'mi amorcito', // Español
    'my sweetie', // Inglés
    'mein Liebling', // Alemán
    'ma chérie', // Francés
    'amore mio', // Italiano
    'meu amor', // Portugués
    'mоя любовь', // Ruso //'mоя любовь (Moya lyubov)', // Ruso
    'ma belle', // Francés
    'my love', // Inglés
    '자기야', // Coreano // '자기야 (Jagiya)', // Coreano
    'schatje', // Holandés
    'mon amour', // Francés
    'حبيبتي', // Árabe // 'حبيبتي (Habibti)', // Árabe
    'mein engel', // Alemán
    'älskling', // Sueco
    'mi vida', // Español
  ];

const thanskfulnessMessages = [
    "Gracias por ser mi compañera de vida, mi amor. Cada día a tu lado es un regalo que atesoro profundamente 💖",
    "Eres mi inspiración, mi alegría y mi refugio seguro. Te amo con todo mi corazón. Gracias por cada sonrisa, cada abrazo, cada momento compartido. Eres mi todo 💖",
    "Espero que cada canción que escuches aquí te recuerde lo mucho que te amo y lo agradecido que estoy por tenerte en mi vida 💖",
    "Eres mi sol en los días nublados, mi calma en la tormenta, mi paz en el caos, mi alegría en la tristeza. Enormemente gracias por acompañarme, comprenderme y amarme tal como soy. Mi niña adorada 💖"
]


function Carousel() {
  const trackImages = useMemo(() => [...photos, ...photos], []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(null);
  const currentSong = songs[currentIndex] || null;

  // Estado para forzar actualización cada segundo
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

const [colorIndex, setColorIndex] = useState(0);
const [languageIndex, setLanguageIndex] = useState(0);
const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
      setLanguageIndex((prevIndex) => (prevIndex + 1) % languages.length);
    }, 1700);
    return () => clearInterval(colorInterval);
  }, []);

useEffect(() => {
    const messageInterval = setInterval(() => {
        setMessageIndex((prevIndex) => (prevIndex + 1) % thanskfulnessMessages.length);
    },5250);
    return () => clearInterval(messageInterval);
}, []);

  const mi_amorcito = (
    <span style={{ color: colors[colorIndex] }}>
      {languages[languageIndex]}
    </span>
  );

  useEffect(() => {
    if (!audioRef.current || !currentSong) {
      return;
    }

    const playPromise = audioRef.current.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  }, [currentSong]);

  const handleSongChange = (index) => {
    setCurrentIndex(index);
  };

  const handleSongEnd = () => {
    if (!songs.length) {
      return;
    }
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  return (
    <section className="relative h-screen w-screen overflow-hidden bg-black">
      <div className="carousel-track">
        {trackImages.map((src, index) => (
          <div className="carousel-item" key={`${src}-${index}`}>
            <img src={src} alt={`Recuerdo ${index + 1}`} className="carousel-image" />
          </div>
        ))}
      </div>


      <div className="carousel-overlay">
        <div className="carousel-card fade-in">
          <h2>¡Hola, {mi_amorcito}!</h2>
          <p className="text-sm md:text-base text-slate-600 mb-6">
            {thanskfulnessMessages[messageIndex]}
          </p>

          {currentSong ? (
            <div className="space-y-4">
              <audio
                ref={audioRef}
                controls
                className="w-full"
                src={currentSong.src}
                onEnded={handleSongEnd}
              />
              <div className='py-0'>𝄞 {currentSong.title} ♫</div>
              {/* <ul className="space-y-2">
                {songs.map((song, index) => (
                  <li key={song.src}>
                    <button
                      type="button"
                      onClick={() => handleSongChange(index)}
                      className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${
                        currentSong.src === song.src
                          ? 'border-pink-400 bg-pink-50 text-pink-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-pink-200'
                      }`}
                    >
                      {song.title}
                    </button>
                  </li>
                ))}
              </ul> */}
            </div>
          ) : (
            <p className="text-sm text-slate-500">...</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Carousel;
