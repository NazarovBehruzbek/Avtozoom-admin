import React from "react";
import axios from "axios";

import "./Categories.css";

export default function Categories() {
  const [dataCars, setDateCars] = React.useState([]);
  console.log(dataCars);
  const urlimage =
    "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";

  React.useEffect(() => {
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
      .then((response) => setDateCars(response?.data?.data));
  }, []);


  const addingCarInfos = () => {
  //  axios.post("https://autoapi.dezinfeksiyatashkent.uz/api/categories) 
  }

  return (
    <div className="categories">
      <div className="categories_box">
        <div className="categories_btn">
          <button>Add</button>
        </div>
        <div className="categories_items">
          {dataCars.map((item, i) => (
            <div className="categories_item" key={i}>
              <img src={`${urlimage}${item.image_src}`} alt="img" />
              <h5>{item.name_en}</h5>
              <div className="categories_item-btn">
                <button>Edit</button>
                <button>Delate</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
