import React from 'react';
import { useNavigate } from 'react-router-dom';
// import burgerPic from '../assets/images/burger.jpg';
import burgerPic from '../assest/images/burger.jpg'
// import pizzaPic from '../assets/images/pizza.jpg';  
import  pizzaPic from '../assest/images/pizza.jpg'
// import '../dashboard/items.scss';

export default function Items() {
  const navigate = useNavigate();

  const items = [
    { img: burgerPic, title: 'Burgers', category: 'burger' },
    { img: pizzaPic, title: 'Pizza', category: 'pizza' }
  ];

  const handleCardClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="container">
      <div className="row">
        {items.map((item, index) => (
          <div className="card" key={index} onClick={() => handleCardClick(item.category)}>
            <img className="img" src={item.img} alt={item.title} />
            <div className="text">
              <p className="h3">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
