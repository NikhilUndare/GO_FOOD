import React,{useCallback} from "react"
import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import useRazorpay from 'react-razorpay'

export default function Cart() {
     
    const [RazorPay] = useRazorpay();
    const razorPayDisplay = useCallback( async (totalPrice)=>{
        const options ={
          key : "rzp_test_nRWF1jm28H3rXs",
          amount : totalPrice *100,
          currency :"INR",
          name : "GoFooD-App",
          description : "Food delivery Transaction",
          handler : (res)=>{
             console.log(res)
          },
          prefill : {
             name : "GOFOOD pvt-lmt",
             email : "gofood@gmail.com",
             contact : "9191919191"
          },
          notes: {
             address: "GoFooD centre ,Mumbai",
         },
           theme: {
             color: "#3399cc",
         }
        }
        const rzp1 = new RazorPay(options);
        rzp1.open();
 },[RazorPay])
 
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-1'>The Cart is Empty !</div>
            </div>
        )
    }
  
    const handlerazorPay = () =>{
        razorPayDisplay(totalPrice)
    }
    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        
        let response = await fetch("http://localhost:5000/api/orderData", {
          
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            order_data: data,
            email: userEmail,
            order_date: new Date().toDateString()
          })
        });
        console.log("JSON RESPONSE:::::", response.status)
        if (response.status === 200) {
          dispatch({ type: "DROP" })
        }
      }
    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    
    return (
        <div>
            <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md'style={{ height: '600px', overflow: 'scroll' }} >
                <table className='table table-hover '>
                    <thead className=' text-success fs-4'>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Option</th>
                            <th scope='col' >Amount</th>
                            <th scope='col' ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <th scope='row' >{index + 1}</th>
                                <td >{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td ><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
                <div style={{display : "flex" , justifyContent : "center" }}>
                    <button className='btn bg-success text-white me-10 fs-5' style={{textAlign : "center"}}  onClick={()=>{handlerazorPay() ; handleCheckOut()}} > CheckOut </button>
                </div>
            </div>
        </div>
    )
}