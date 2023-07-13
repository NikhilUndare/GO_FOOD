import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Card from "../components/Card"
// import Carousel from "../components/Carousel"

export default function Home() {

    const [fooditem, setfooditem] = useState([])
    const [foodCategory, setfoodCategory] = useState([])
    const [search,setSearch] = useState("");

    const loadData = async () => {
        let response = await fetch('http://localhost:5000/api/foodData', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })

        response = await response.json()
        setfooditem(response[0]);
        setfoodCategory(response[1]);
        //    console.log(response[0],response[1])
    }

    useEffect(() => {
        loadData()
    }, [])


    return (
        <div>
            <div> <Navbar /></div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id="carousel">
                        <div className="carousel-caption" style={{ zIndex: "10" }}>
                            <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                                <button className="btn text-white bg-success" onClick={() => { setSearch('') }}>X</button>
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="container">
                {
                    foodCategory !== [] ?
                        foodCategory.map((data) => {
                            return (
                                <div className="row mb-3">
                                    <div className=" m-3 display-6" key={data._id}>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {fooditem !== [] ?
                                        fooditem.filter((item) => (item.CategoryName === data.CategoryName)&&(item.name.toLowerCase().includes(search.toLowerCase())))
                                            .map(filteredItem => {
                                                return (
                                                    <div key={filteredItem._id} className="col-12 col-md-6 col-lg-4">
                                                        <Card 
                                                            fooditems = {filteredItem}
                                                            
                                                            options={filteredItem.options[0]}
                                                            />
                                                    </div>
                                                )
                                            }) : <div>No Such Data Found</div>}
                                </div>
                            )
                        })
                        : ""

                }

            </div>
            <div> <Footer /></div>

        </div>
    )
}