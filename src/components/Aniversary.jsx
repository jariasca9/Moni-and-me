import React, { useEffect, useState, useRef } from 'react';

// Importa todas las canciones automáticamente desde la carpeta
const songsContext = import.meta.glob('../assets/songs/*.mp3', { eager: true });
const songs = Object.values(songsContext).map((mod) => mod.default);

function MusicPlayer() {
  const [current, setCurrent] = useState(0);
  const audioRef = useRef(null);

  const handleEnded = () => {
    setCurrent((prev) => (prev + 1) % songs.length);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // El navegador puede bloquear la reproducción automática, pero intentamos reproducir
        });
      }
    }
  }, [current]);

  if (songs.length === 0) return null;

  return (
    <audio
      ref={audioRef}
      src={songs[current]}
      autoPlay
      onEnded={handleEnded}
      controls
      style={{ margin: '0 auto', display: 'block' }}
    />
  );
}

function Anniversary() {
  // Estado para forzar actualización cada segundo
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Definir fecha de aniversario con hora local igual a '2025-08-17' a las 12:00:00
  const anniversaryDate = new Date('2025-08-17T12:00:00');

  // Formatear la fecha para mostrarla
  const formattedDate = anniversaryDate.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Calcular el tiempo transcurrido (opcional)
  const today = now; // Usar el estado actualizado


  const isAnniversaryToday = today.getDate() === anniversaryDate.getDate();

  function getTimeTogether(from, to) {
    let years = to.getFullYear() - from.getFullYear();
    let months = to.getMonth() - from.getMonth();
    let days = to.getDate() - from.getDate();
    let hours = to.getHours() - from.getHours();
    let minutes = to.getMinutes() - from.getMinutes();
    let seconds = to.getSeconds() - from.getSeconds();

    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }
    if (hours < 0) {
      hours += 24;
      days--;
    }
    if (days < 0) {
      // Get days in previous month
      const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }
    if (months < 0) {
      months += 12;
      years--;
    }

    return { years, months, days, hours, minutes, seconds };
  }

  const { years, months, days, hours, minutes, seconds } = getTimeTogether(anniversaryDate, today);

  function pluralize(value, singular, plural) {
    return value === 1 ? `${value} ${singular}` : `${value} ${plural}`;
  }

  const timeParts = [];
  if (years > 0) timeParts.push(pluralize(years, 'año', 'años'));
  if (months > 0) timeParts.push(pluralize(months, 'mes', 'meses'));
  if (days > 0) timeParts.push(pluralize(days, 'día', 'días'));
  if (hours > 0) timeParts.push(pluralize(hours, 'hora', 'horas'));
  if (minutes > 0) timeParts.push(pluralize(minutes, 'minuto', 'minutos'));
  if (seconds > 0 || timeParts.length === 0) timeParts.push(pluralize(seconds, 'segundo', 'segundos'));

  const timeTogetherString = timeParts.join(', ').replace(/, ([^,]*)$/, ' y $1');

  //Quiero que la palabra "mi amorcito", cambie de color cada segundo y de idioma entre español, inglés, alemán, y francés cada vez que cambie de color.
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
  const [colorIndex, setColorIndex] = useState(0);
  const [languageIndex, setLanguageIndex] = useState(0);
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
      setLanguageIndex((prevIndex) => (prevIndex + 1) % languages.length);
    }, 1650);
    return () => clearInterval(colorInterval);
  }, []);

  const mi_amorcito = (
    <span style={{ color: colors[colorIndex] }}>
      {languages[languageIndex]}
    </span>
  );


  return (
    <div className="text-center space-y-4">
      {/* <h1>¡Hola, {mi_amorcito}!</h1> */}
      <p>Nuestro aniversario es el {formattedDate}🥰💖</p>


      {isAnniversaryToday && (
        <p className="text-xl font-semibold text-red-600 animate-bounce">
          ¡Hoy celebramos nuestro amor! 🥺💖
        </p>
      )}
      {/* <p className="text-md text-gray-500 mt-4"> */}
        {/* Infinitamente gracias por todo, mi Moni 💖 */}
        {/* Gracias por ser parte de mi vida y por cada momento compartido 💖 */}
      {/* </p> */}
      <p className="text-lg text-gray-600 italic">
        Llevamos compartiendo nuestro amor por: <br />
        <span className="font-bold text-purple-600">{timeTogetherString}</span>
        🥰💖💖
      </p>
      {/* <MusicPlayer /> */}
    </div>
  );
}

export default Anniversary;