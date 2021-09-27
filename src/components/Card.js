import React from "react";

// PROPS récupère country={country} de Countries.js line39
const Card = ({ country }) => {
  const numberFormat = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div>
      <li className="card">
        <div className="data-container">
          <img src={country.flag} alt="flag" />
          <ul>
            <li>Nom: {country.name}</li>
            <li>Cap. : {country.capital}</li>
            <li>Pop. : {numberFormat(country.population)}</li>
          </ul>
        </div>
      </li>
    </div>
  );
};

export default Card;
