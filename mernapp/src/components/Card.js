import React, { useRef, useState,useEffect } from "react"
import { useCart,useDispatchCart } from "./ContextReducer";

export default function Card(props) {
    let data = useCart()
    let options = props.options
    let priceOptions = Object.keys(options);
    let fooditems = props.fooditems
     
    let dispatch = useDispatchCart();
    const priceRef = useRef()
    const[qty,setqty] = useState(1)
    const[size,setsize] = useState("")
    
    const handleAddToCart = async() =>{
        
      let food = []
      for (const item of data) {
        if (item.id === fooditems._id) {
          food = item;
  
          break;
        }
      }
      console.log(food)
      console.log(new Date())
      if (food !== []) {
        if (food.size === size) {
          await dispatch({ type: "UPDATE", id: fooditems._id, price: finalPrice, qty: qty })
          return
        }
        else if (food.size !== size) {
          await dispatch({ type: "ADD", id: fooditems._id, name: fooditems.name, price: finalPrice, qty: qty, size: size,img: fooditems.img })
          console.log("Size different so simply ADD one more to the list")
          return
        }
        return
      }
        await dispatch({type : "ADD" , price : finalPrice ,name : fooditems.name ,qty :qty,size:size,img:fooditems.img,id:fooditems._id})
        
    } 

    const handleQty = (e) => {
      setqty(e.target.value);
    }

    const handleOptions = (e) => {
      setsize(e.target.value);
    }

    useEffect(() => {
      setsize(priceRef.current.value)
    }, [])
    let finalPrice = qty * parseInt(options[size]);
    

    return (
        <div>
            <div className="card mt-3 " style={{"width": "18rem","maxHeight": "360px"}}>
                <img src={fooditems.img} className="card-img-top" alt="..." style={{ height: "150px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title  ">{fooditems.name}</h5>
                   
                    <div className="container w-100">
                        <select className="m-2 h-100 bg-success rounded"  onChange={handleQty}>
                          {Array.from(Array(5), (e,i) => {
                            return (
                                <option key={i+1} value={i+1} > {i+1} </option>
                            )
                          })}
                        </select>

                        <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={handleOptions}>
                          {priceOptions.map((data)=>{
                            return <option key={data} value={data}>{data}</option>
                            
                          })}
                        </select> 
                        <div className="d-inline h-100 fs-5 mx-2 ">
                         ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr/>
                    <button className="btn btn-success justify-centre ms-2" onClick={handleAddToCart}>Add to Cart</button>
                    
                </div>
            </div>
        </div>
    )
}