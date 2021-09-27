import React, { useEffect, useState } from "react";
import axios from "axios"; // fetch avec axios et convertion json
import Card from "./Card";

const Countries = () => {
  // hook => voir dans inspecteur > Components
  const [data, setData] = useState([]); // fetch
  const [sortedData, setSortedData] = useState([]); // ordre affichage selon population
  const [playOnce, setPlayOnce] = useState(true); // évite la relance du fetch
  const [rangeValue, setRangeValue] = useState(40); //dynamique du nombre à afficher
  const [selectedRadio, setSelectedRadio] = useState(""); // cible input:radio
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];

  // useEffect empêche d'envoyer des fetch d'api infini
  useEffect(() => {
    if (playOnce) {
      // fetch avec axios
      axios
        .get(
          "http://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag"
        )
        .then((res) => {
          setData(res.data);
          setPlayOnce(false);
        }); // API FONCTIONNE PLUS
    }

    const sortedCountry = () => {
      const countryObj = Object.keys(data).map((i) => data[i]);
      const sortedArray = countryObj.sort((a, b) => {
        return b.population - a.population; // du plus petit au plus grand nb de pop
      });
      sortedArray.length = rangeValue;
      setSortedData(sortedArray);
    };
    sortedCountry();
  }, [data, rangeValue, playOnce]); // [] callback

  return (
    <div className="countries">
      <div className="sort-container">
        <input
          type="range"
          min="1"
          max="250"
          value={rangeValue}
          onChange={(e) => setRangeValue(e.target.value)}
        />
        <ul>
          {radios.map((radio) => {
            return (
              <li key={radio}>
                <input
                  type="radio"
                  value={radio}
                  id={radio}
                  checked={radio === selectedRadio}
                  onChange={(e) => setSelectedRadio(e.target.value)}
                />
                <label htmlFor={radio}>{radio}</label>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="cancel">
        {selectedRadio && (
          <h5 onClick={() => setSelectedRadio("")}>Annuler recherche</h5>
        )}
      </div>
      <ul className="countries-list">
        {sortedData
          .filter((country) => country.region.includes(selectedRadio))
          .map((country) => (
            <Card country={country} key={country.name} />
          ))}
      </ul>
    </div>
  );
};

export default Countries;
