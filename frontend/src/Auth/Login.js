import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik"
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom';
import { API } from '../Global';
import { Link } from 'react-router-dom';

 const registerValidation = Yup.object({
   
    Email : Yup.string().required(),
    Password : Yup.string().required(),
    
 })


  function Login(){

    const navigate = useNavigate()

     const formik = useFormik({

         initialValues : {
            
             Email : "",
             Password : "",
            
         },

         validationSchema : registerValidation,

         onSubmit : async(values)=>{
             

              try{

                let obj={
                   
                     email : values.Email,
                     password : values.Password,
                     
                 }
               const data = await fetch(`${API}/user/login`,{
                   method : "POST",
                   headers: {
                    'Content-Type': 'application/json'
                   },
                   body : JSON.stringify(obj),
                   
               })
    
               const res = await data.json()

                console.log(res)

               if(data.status == 200){

                alert(res.message)
                localStorage.setItem("token",res.token)
                localStorage.setItem("userId",res.data._id)
                localStorage.setItem("role",res.data.role)
                navigate("/getAll")

              }else{

               alert(res.message)
              }

           }catch(err){
                alert(err.message)
                console.log(err)
              }
         }
     })


       return(
         <form onSubmit={formik.handleSubmit}>
          <h3>Login Form</h3>
         

          <TextField 
          id="outlined-basic" 
          label="Email" 
          variant="outlined" 
          value={formik.values.Email}
          onChange={formik.handleChange}
          name='Email'
          onBlur={formik.handleBlur}
          helperText={formik.touched.Email && formik.errors.Email ? formik.errors.Email : ""}
          />


          <TextField 
          id="outlined-basic" 
          label="Password" 
          variant="outlined"
          value={formik.values.Password}
          onChange={formik.handleChange}
          name="Password"
          onBlur={formik.handleBlur}
          helperText={formik.touched.Password && formik.errors.Password ? formik.errors.Password : ""}
          />
           
        <Button type="submit" variant="contained">Login</Button>
        <p>Are you new user..?<span onClick={()=>navigate("/register")}>Register</span></p>
         </form>
       )
  }

  export default Login;