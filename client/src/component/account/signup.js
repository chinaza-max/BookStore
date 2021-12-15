import React,{useState,useEffect} from 'react';
import axios from 'axios'
import {useHistory,Link } from "react-router-dom";
import "../../style/signUp.css";
import GoogleIcon from '@mui/icons-material/Google';





function Signup(){
    const history=useHistory()
    const [eventInfo,setEventInfo]=useState({name:'',password:'',email:'',tel:''});
    const [error,setError]=useState('')

    const{name,password,email,tel}=eventInfo

    const handleChange=(event)=>{
        const {name,value}=event.target
        setEventInfo({...eventInfo,[name]:value})

    }
    const googleSignUp=async (e)=>{
        e.preventDefault();
        window.open("http://localhost:5000/auth/google","_self")
    }
   /*
    let i = 0;
    let txt = 'Lorem ipsum dummy text blabla.';
    let speed = 50;

    function typeWriter() {
        if (i < txt.length) {
          document.querySelector(".type").innerHTML += txt.charAt(i);
          i++;
          setTimeout(typeWriter, speed);
    }
    }*/
    const onSubmit=async (e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('name',name);
        formData.append('password',password);
        formData.append('email',email);
        formData.append('tel',tel);
          
        axios.post('/signup',formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        .then((res)=>{
            if(res.data.express==="saved"){
                history.push("/login")
            }
        }) 
        .catch((error)=>{
            console.log(error.response.data.express)
            setError(error.response.data.express)
        }); 
    }
    useEffect(()=>{
      //  typeWriter()
    })
    return(
            <div className='accountContainer'>
                <div className='accountContainerCenter'>
                    <div>
                        <form   onSubmit={onSubmit}  encType="multipart/form-data">
                         
                            <div>
                            <input type="text" placeholder="Enter first name" name="name" onChange={handleChange} required></input>
                            </div>
                            <div>
                            <input type="password" placeholder="passWord ..." name="password" onChange={handleChange} required></input>
                            </div>
                            <div>
                            <input type="email" placeholder="name@.com" name="email" onChange={handleChange} required></input>
                            </div>
                            <div>
                            <input type="tel" placeholder="phone No" name="tel" onChange={handleChange} required></input>
                            </div>
                            <div className='accountContainerCenter__Section1'>
                                <button>Signup</button>
                                <Link to={"/login"} >login</Link>
                            </div>
                            <div className='accountContainerCenter__google'> <a href="/" onClick={(e)=>{googleSignUp(e)}}><GoogleIcon  style={{"color":"blue"}}/> sign up with google</a></div>

                            <div className='accountContainerCenter__logo'>Glacier</div>
                            <div className='accountContainerCenter__error'>   {error?error:""}</div>
                        </form>
                    </div>
                    <div className='type'></div>
                </div>
            </div>
    )
}
export default Signup;