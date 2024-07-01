import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
      
import { BeatLoader } from 'react-spinners'
import Error from './error'
import * as Yup from 'yup'
import useFetch from '@/hooks/use-fetch'
import { login } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'

function Login() {

    const [formData,setFormData] = useState({
        email:"",
        password:""
    });

    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    
    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]:value
        }))
    }

    const {data, error, loading, fn: fnlogin} = useFetch(login,formData);

    useEffect(()=>{
        if(error === null && data){
            navigate(`/dashboard?${longLink ? `createNew = ${longLink}`:""}`)
        }
    })
    
    const [errors, setErrors] = useState([]);
    const handleLogin = async() => {
        setErrors([])
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                .email("Invalid Email")
                .required("Email is required"),
                password: Yup.string()
                .min(6,"Password must have atleast 6 characters.")
                .required("Password is required"),
            })

            await schema.validate(formData,{abortEarly: false})
            await fnlogin();
        }catch(e){
            const newErrors = {};

            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });

            setErrors( newErrors);
        }
    }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Card Description</CardDescription>
            {error && <Error message={error}></Error>}
        </CardHeader>
        <CardContent>
            <div className="space-y-1">
                <Input name="email" type="email" placeholder="Enter email" onChange={handleInputChange} />
                {errors.email && <Error message={errors.email}/>}
            </div>
            <div className="space-y-1">
                <Input name="password" type="password" placeholder="Enter password" onChange={handleInputChange} />
                {errors.password && <Error message={errors.password}/>}
            </div>
        </CardContent>
        <CardFooter>
            <Button onClick={handleLogin} >
                {loading?<BeatLoader size={10} color='#36d7b7' />:"Login"}
            </Button>
        </CardFooter>
    </Card>

  )
}

export default Login