import React from 'react';
import { 
  Puzzle, 
  Shirt, 
  BookOpen, 
  Coffee, 
  Smartphone, 
  Home,
  Image,
  Palette,
  Pen,
  Camera
} from 'lucide-react';

const FloatingIcons = () => {
  const icons = [
    { Icon: Puzzle, color: 'text-indigo-200', size: 'h-12 w-12', delay: '0s' },
    { Icon: Shirt, color: 'text-purple-200', size: 'h-16 w-16', delay: '2s' },
    { Icon: BookOpen, color: 'text-indigo-300', size: 'h-10 w-10', delay: '4s' },
    { Icon: Coffee, color: 'text-purple-300', size: 'h-14 w-14', delay: '1s' },
    { Icon: Smartphone, color: 'text-indigo-200', size: 'h-12 w-12', delay: '3s' },
    { Icon: Home, color: 'text-purple-200', size: 'h-16 w-16', delay: '5s' },
    { Icon: Image, color: 'text-indigo-300', size: 'h-10 w-10', delay: '2.5s' },
    { Icon: Palette, color: 'text-purple-300', size: 'h-14 w-14', delay: '1.5s' },
    { Icon: Pen, color: 'text-indigo-200', size: 'h-12 w-12', delay: '3.5s' },
    { Icon: Camera, color: 'text-purple-200', size: 'h-16 w-16', delay: '4.5s' },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {icons.map((IconData, index) => (
        <div
          key={index}
          className={`absolute opacity-30 ${index % 2 === 0 ? 'animate-float' : 'animate-float-alt'}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: IconData.delay,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        >
          <IconData.Icon className={`${IconData.color} ${IconData.size}`} />
        </div>
      ))}
    </div>
  );
};

export default FloatingIcons;