import React, { useState, useEffect } from 'react';
import Anniversary from './aniversary';



// Importa todas las imágenes automáticamente desde la carpeta
const imagesContext = import.meta.glob('../assets/images/*.jpg', { eager: true });
const photos = Object.values(imagesContext).map((mod) => mod.default);

// Función para mezclar y seleccionar 8 imágenes sin repetición
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 8); // Selecciona las primeras 8 imágenes
};

function Home() {
  // Estado para las imágenes actuales de cada celda
  const [cellPhotos, setCellPhotos] = useState(() => {
    // Inicializa con 8 imágenes aleatorias distintas
    const shuffled = shuffleArray(photos);
    return shuffled.slice(0, 8);
  });
  const [hearts, setHearts] = useState([]);

  // Generar corazones cada 1 segundo
  useEffect(() => {
    const heartInterval = setInterval(() => {
      const newHeart = {
        id: Math.random(),
        left: `${Math.random() * 100}vw`,
      };
      setHearts((prev) => [...prev, newHeart].slice(-10));
      setTimeout(() => {
        setHearts((prev) => prev.filter((heart) => heart.id !== newHeart.id));
      }, 5500);
    }, 900);
    return () => clearInterval(heartInterval);
  }, []);

  // Tiempos distintos para cada celda (en ms)
  const intervals = [5500, 3000, 6500, 4000, 5000, 6000, 4500, 3500, 5555];

  // Efectos independientes para cada celda de imagen
  useEffect(() => {
    const timers = cellPhotos.map((_, idx) => {
      return setInterval(() => {
        setCellPhotos((prev) => {
          // Cambia solo la imagen de la celda idx
          const available = photos.filter((p) => !prev.includes(p) || p === prev[idx]);
          const next = available[Math.floor(Math.random() * available.length)];
          const updated = [...prev];
          updated[idx] = next;
          return updated;
        });
      }, intervals[idx % intervals.length]);
    });
    return () => timers.forEach(clearInterval);
  }, []);

  // Estructura de la cuadrícula 3x3
  const grid = [
    { type: 'image', index: 0 }, // Top-left
    { type: 'image', index: 1 }, // Top-center
    { type: 'image', index: 2 }, // Top-right
    { type: 'image', index: 3 }, // Middle-left
    { type: 'component' }, // Center (Anniversary)
    { type: 'image', index: 4 }, // Middle-right
    { type: 'image', index: 5 }, // Bottom-left
    { type: 'image', index: 6 }, // Bottom-center
    { type: 'image', index: 7 }, // Bottom-right
  ];

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center p-4">

      {/* Corazones flotantes */}   
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart"
          style={{ left: heart.left }}
        >
          💖
        </span>
      ))}

      <div className="grid grid-cols-3 gap-4 max-w-4xl w-full">
        {grid.map((cell, idx) => (
          <div
            key={idx}
            className={`aspect-square rounded-lg shadow-lg overflow-hidden ${
              cell.type === 'component' ? 'bg-white p-6 flex items-center justify-center' : ''
            }`}
          >
            {cell.type === 'image' ? (
              <img
                key={cellPhotos[cell.index]} // Fuerza remount para animación
                src={cellPhotos[cell.index]}
                alt={`Memory ${cell.index + 1}`}
                className="w-full h-full object-cover fade-in"
              />
            ) : (
              <Anniversary />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;