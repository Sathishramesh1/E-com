import React, {useState,useEffect} from "react"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { API } from "../Global";
import { SearchContext, useSearch } from "../Context/Search";
import CustomizedDialogs from "./Dialog";

 function GetAllProducts(){

  const [data,setData] = useState("")
  const userId = localStorage.getItem("userId")
  const navigate = useNavigate();
  const [searchState, setSearchState, open, setOpen] = useSearch();
const [selected,setSelected]=useState({});
  useEffect(()=>{
      getDatas()
  },[])

  const getDatas = async()=>{

      const value = await fetch(`${API}/product/getAll`,{
        method : "GET"
      })

      const res = await value.json()

      setData(res)
  }


  const addItems = async(id)=>{

    const addItem = await fetch(`${API}/cart/addtocart/${id}?userId=${userId}`,{
        method : "POST",
        headers : {
            "Content-type" : "application/json"
        }
    })

    const res = await addItem.json()

      if(addItem.status == 200){
         alert(res.message)
      }else if(addItem.status == 403){
        alert(res.message)
      }
  }

     return(
        <div className="products-container">
           { data && data.map((ele,index)=>{
              return(
                <div key={index}
                onClick={()=>{
                  setSelected(ele);
                  setOpen(true);
                }}
                >
    <Card sx={{ maxWidth: 360 }}
    
    >
      <CardMedia
        sx={{ height: 250 ,objectFit:"contain"}}
        image={ele.productImage}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {ele.productName}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
        Rs.{ele.price}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} >
        {ele.description.length > 100 ? `${ele.description.substring(0, 100)}...` : ele.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={(e)=>{
          e.stopPropagation(); 
        addItems(ele._id)
        }
        } disabled={ ele.quantity < 1 ? true : false}>Add to cart</Button>
        <Button size="small" onClick={()=> navigate(`/single/${ele._id}`) }>view</Button>
       
      </CardActions>
      <CardContent>
      <Typography gutterBottom variant="h6" component="div">
        {ele.quantity < 1 ? <p className="alert">"Out of stock..!"</p> : (ele.quantity <=5 ? <p className="alert2">Hurry {ele.quantity} pieces only left !</p> : null)}
        </Typography>
        </CardContent>
    </Card>
    </div>
              )
           })}
           <CustomizedDialogs data={selected}/>
        </div>
     )
 }

 export default GetAllProducts;