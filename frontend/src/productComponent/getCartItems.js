import {useState,useEffect} from "react";
import Button from '@mui/material/Button';
import { API } from "../Global";

function GetCartItems(){

  const [data,setData] = useState([]);
  const [quantity,setQuantity] = useState({})
  const [totalAmount, setTotalAmount] = useState(0);

  const userId = localStorage.getItem("userId")

  useEffect(()=>{
      getItems()
  },[])

  const getItems = async()=>{

      const value = await fetch(`${API}/cart/allCartItems/${userId}`,{
        method : "GET"
      })

      const res = await value.json()

      const Qty = {};
     console.log("checking for the res",res);
      res?.forEach((item) => {
       
        Qty[item._id] = 1;
       
      });
      setQuantity(Qty);

      updateTotalAmount(res,Qty)

      setData(res)
  }

  const removeItem = async(id)=>{

     const value = await fetch(`${API}/cart/${id}`,{
        method : "DELETE"
     }) 

     const res = await value.json()

     if(value.status == 200){

        alert(res.message)

       //   let remove = data.filter((ele)=> ele[_id] !== id);

       //   let total = setTotalAmount((pre)=> pre - remove)

        getItems()
     }

  }

  const decrease = (id)=>{

    if(quantity[id]  > 0){

        setQuantity((pre)=> {
        
            const newQty = {...pre}
            newQty[id] -= 1 ;
            updateTotalAmount(data,newQty)
            return newQty;
         })

    }

  
}

  const increase = (id,stockQty)=>{

  
    
    let remainQty = stockQty - quantity[id]

    console.log("RemainQty",remainQty)

      if(remainQty >= 1){
       
         setQuantity((pre)=> {
        
            const newQty = {...pre}
            newQty[id] += 1 ;
            updateTotalAmount(data,newQty)
            return newQty;
         })
      }else{
         alert("There is no enought Quantity")
      }
     
      
  }

 console.log(quantity)
 
  const updateTotalAmount = (items,qty)=>{

    const newTotal = items.reduce((acc,cv)=>{
        
        const quantity = qty[cv._id]
        const amount = cv.cartItems.price * quantity
        return acc + amount
     },0)

     setTotalAmount(newTotal)
}

 //console.log(data)

const makeOrder = async() =>{

      let items = data && data.map((ele)=> ele.cartItems._id)

      let detail = {
           
         allItems : items,
         orderBy : userId,
         amount : totalAmount,
         QtyById : quantity
      }
      console.log(detail)

    const createData = await fetch(`${API}/order/create`,{
        method : "POST",
        headers : {
          "Content-type" : "application/json"
        },
        body : JSON.stringify(detail)
    })

    const res = await createData.json()

    if(createData.status == 200){
       alert(res.message)
       EmptyTheCart()
    }else{
      alert(res.message)
    }
}

const EmptyTheCart = async()=>{
     console.log("execute")
     const remove = await fetch(`${API}/cart/emptyTheCart/${userId}`,{
        method : "DELETE"
     })

     const res = await remove.json()

     if(remove.status == 200){
          getItems()
     }
}



//   console.log(quantity)

     return(
        <div className="cart-container">
           { data && data.map((ele,index)=>{
              return(
                <div key={index} className="cart-items">
                    <div>
                    <div>ProductName : {ele.cartItems.productName}</div>
                    <div>Category : {ele.cartItems.categoryName}</div>
                    <div>Price :{ele.cartItems.price}</div>
                    <div>Quantity : <button onClick={()=>decrease(ele._id)}>-</button>{quantity[ele._id]}<button onClick={()=>increase(ele._id,ele.cartItems.quantity)}>+</button></div>
                    </div>
                    <div>
                    <button onClick={()=>removeItem(ele._id)}>Remove from cart</button>
                    <div>Amount : {ele.cartItems.price * quantity[ele._id]}</div>
                    
                    </div>

                   
                </div>
              )
           })}
           
           <div>Total Amount : Rs.{totalAmount}</div>

           <Button variant="contained" onClick={makeOrder}>Process Order</Button>
           
        </div>
     )
 }

 export default GetCartItems;