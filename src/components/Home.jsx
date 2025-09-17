import React, { useState, useEffect } from 'react';
import Anniversary from './aniversary';



// Importa las imágenes (ajusta las rutas según tu estructura)
import photo1 from '../assets/images/imagen_1.jpg';
import photo2 from '../assets/images/imagen_2.jpg';
import photo3 from '../assets/images/imagen_3.jpg';
import photo4 from '../assets/images/imagen_4.jpg';
import photo5 from '../assets/images/imagen_5.jpg';
import photo6 from '../assets/images/imagen_6.jpg';
import photo7 from '../assets/images/imagen_7.jpg';
// import photo8 from '../assets/images/imagen_8.jpg';
import photo9 from '../assets/images/imagen_9.jpg';
import photo10 from '../assets/images/imagen_10.jpg';
import photo11 from '../assets/images/imagen_11.jpg';
import photo12 from '../assets/images/imagen_12.jpg';
import photo13 from '../assets/images/imagen_13.jpg';
import photo14 from '../assets/images/imagen_14.jpg';
import photo15 from '../assets/images/imagen_15.jpg';
import photo16 from '../assets/images/imagen_16.jpg';
import photo17 from '../assets/images/imagen_17.jpg';
import photo18 from '../assets/images/imagen_18.jpg';
import photo19 from '../assets/images/imagen_19.jpg';



// Array de imágenes
const photos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo9, photo10, photo11, photo12, photo13, photo14, photo15, photo16, photo17, photo18, photo19];

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
      }, 5000);
    }, 1000);
    return () => clearInterval(heartInterval);
  }, []);

  // Tiempos distintos para cada celda (en ms)
  const intervals = [3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500,5555];

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