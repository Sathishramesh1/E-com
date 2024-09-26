import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { SearchContext, useSearch } from '../Context/Search';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import { API } from "../Global";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({data}) {
    const [searchState, setSearchState, open, setOpen] = useSearch();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId")


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {data.productName}
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {data.productName}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <Card sx={{ maxWidth: 360 }}
    
    >
      <CardMedia
        sx={{ height: 250 ,objectFit:"contain"}}
        image={data.productImage}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {data.productName}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
        Rs.{data.price}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} >
        {data?.description?.length > 100 ? `${data.description.substring(0, 100)}...` : data.description}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
      Available quantity:{data.quantity}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>addItems(data._id)} disabled={ data.quantity < 1 ? true : false}>Add to cart</Button>
      </CardActions>
      <CardContent>
      <Typography gutterBottom variant="h6" component="div">
      {console.log("checking the quantity",data.quantity)}
        {data.quantity < 1 ? <p className="alert">"Out of stock..!"</p> : (data.quantity <=5 ? <p className="alert2">Hurry {data.quantity} pieces only left !</p> : null)}
        </Typography>
        </CardContent>
    </Card>
    
          
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </React.Fragment>
  );
}
