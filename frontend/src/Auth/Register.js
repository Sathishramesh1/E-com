import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik"
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom';
import { API } from '../Global';

 const registerValidation = Yup.object({
    UserName : Yup.string().required(),
    Email : Yup.string().required(),
    Password : Yup.string().required(),
    Role : Yup.string().required()
 })


  function Register(){

    const navigate = useNavigate()


     const formik = useFormik({

         initialValues : {
             UserName : "",
             Email : "",
             Password : "",
             Role : ""
         },

         validationSchema : registerValidation,

         onSubmit : async(values)=>{
             

              try{

                let obj={
                    userName : values.UserName,
                     email : values.Email,
                     password : values.Password,
                     role : values.Role
                 }
               const data = await fetch(`${API}/user/register`,{
                   method : "POST",
                   headers: {
                    'Content-Type': 'application/json'
                   },
                   body : JSON.stringify(obj),
                   
               })
    
               const res = await data.json()

               if(data.status == 200){

                 alert(res.message)
                 navigate("/")

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
          <h3>Register Form</h3>
          <TextField 
          id="outlined-basic" 
          label="UserName" 
          variant="outlined" 
          value={formik.values.UserName}
          onChange={formik.handleChange}
          name='UserName'
          onBlur = {formik.handleBlur}
          helperText={formik.touched.UserName && formik.errors.UserName ? formik.errors.UserName : ""}
          />

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
           
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formik.values.Role}
          label="Role"
          name='Role'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <MenuItem value={1}>Admin</MenuItem>
          <MenuItem value={0}>User</MenuItem>
         
        </Select>
        {formik.touched.Role && formik.errors.Role && (
                <div style={{ color: 'red', marginTop: '.5rem' }}>{formik.errors.Role}</div>
            )}
        <Button type="submit" variant="contained">Register</Button>
        <p>You have an account..?<span onClick={()=>navigate("/")}>Login</span></p>
         </form>
       )
  }

  export default Register;