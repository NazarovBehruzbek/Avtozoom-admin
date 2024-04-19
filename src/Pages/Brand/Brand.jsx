import React, { useEffect, useState } from 'react'

export function Brand() {
  const [content, setContent] = useState(<BrandList showForm={showForm} />);

  function showList(){
    setContent(<BrandList showForm={showForm} />);
  }
  function showForm(brand){
    setContent(<BrandForm brand={brand} showForm={showList} />);
  }

  return (
    <div>Brand</div>
  )
}

function BrandList(props) {

  const [brands, setBrands] = useState([])
  function fetchBrands(){
    fetch("http://localhost:3000/brands")
    .then((response) => {
      if(!response.ok){
          throw new Error("Unexpected Server Response");
      }
      return response.json()
    })
    .then((data) => {
      setBrands(data);
    })
    .catch((error) =>  console.log("Error: ", error));
  }

  // fetchBrands();
  useEffect(() => fetchBrands(), []);


  function deleteBrand(id){
    fetch('http://localhost:3000/brands' + id, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((data) => fetchBrands());
  }
  return(
    <>
      <h2>List of Brand</h2>
      <button onClick={() => props.showForm({})} type='button'> Create</button>
      <button onClick={() => fetchBrands()} type='button'> Refresh</button>
  
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {
            brands.map((brand, index) => {
              return(
                <tr key={index}>
                  <td>{brand.id}</td>
                  <td>{brand.name}</td>
                  
                  <td style={{width:"10px"}}>
                    <button onClick={() => props.showForm(brand)} type='button' className='btn btn-primary btn-sm me-2'>Edit</button>
                    <button onClick={() => deleteBrand(brand.id)} type='button' className='btn btn-danger btn-sm'>Delete</button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </>
  )
}

function BrandForm(props) {

  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event){
    event.preventDefault();

    // read from data
    const formData = new FormData(event.target)
    
    // convert formData to object
    const brand = Object.fromEntries(formData.entries());

    if(!brand.name || !brand.brand){
      console.log("please provide all the required fields!");
      setErrorMessage(
        <div className='alert alert-warning' role='alert'>
          please provide all the required fields!
        </div>
      )
      return;
    }

    if(props.brand.id) {
      fetch("https://localhost:3000/brands/"  + props.brand.id , {
        method: "PATCH",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(brand)
      })
        .then((response) =>{
          if(!response.ok){
            throw new Error("Network response was not OK");
          }
          return response.json()
        })
        .then((data) => props.showList())
        .catch((error) => {
          console.error("Error:", error);
        })
    } 
    else{
      // create a new product 
      brand.createdAt = new Date().toISOString().slice(0,10);
      fetch("https://localhost:3000/brands", {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(brand)
      })
        .then((response) =>{
          if(!response.ok){
            throw new Error("Network response was not OK");
          }
          return response.json()
        })
        .then((data) => props.showList())
        .catch((error) => {
          console.error("Error:", error);
        })
    }
  }

  return(
    <>
      <h2>{props.brand.id ? "Edit Brand" : "Create New Brand"}</h2>
      <button onClick={() => props.showList()} type='button'> Cancel</button>

      <div className='row'>
        <div className="col-lg-6">

          {errorMessage}

          <form onSubmit={(event) => handleSubmit(event)}>
          {props.brand.id &&  <div className='row mb-3'>
            <label className='col-sm-4 col-form-label'>ID</label>
            <div className="col-sm-8">
              <input readOnly type="text" 
              className='form-control-plaintext'
              name='id'
              defaultValue={props.brand.id}/>
            </div> </div>}

            <div className='row mb-3'>
              <label className='col-sm-4 col-form-label'>Name</label>
              <div className="col-sm-8">
                <input type="text" 
                className='form-control'
                name='name'
                defaultValue={props.brand.name}/>
              </div>
            </div>            

            <div className="row">
                <div className="offset-sm-4">
                  <button onClick={() => props.showForm(brand)} type='submit' className='btn btn-primary'>Save</button>
                </div>
                <div className="col-sm-4">
                  <button onClick={() => props.showList()} type='button' className='btn btn-secondary me-2'>Cancel</button>
                </div>
              </div>
          </form>
        </div>
      </div>
    </>
  )
}