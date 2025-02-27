import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { router, useRouter } from 'next/router';

const Login = () => {
  const  [error,setError]= useState() ;
  const [isError,setIsError]=useState(false) ;
   const [email, setEmail] = useState();
   const [password, setPassword] = useState();
   const router=useRouter() ;
   useEffect(()=>{
      if(localStorage.getItem('token')){
        router.push('/') ;
      }
   },[]) ;
   const handleChange = (e) => {
      
      if (e.target.name =='email') {
        setEmail(e.target.value) ;
      }
      if (e.target.name == 'password') {
        setPassword(e.target.value) ;
      }
     }
   
   const handleSubmit = async (e) => {
     e.preventDefault();
     const data = {email, password };

     let res = await fetch("http://localhost:3000/api/login", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(data),
     });
     let response = await res.json();
     console.log(response);
     setEmail("");
     setError("") ;
     setIsError(false) ;
     setPassword("");
     if(response.success){
      localStorage.setItem('token',response.token) ;
      console.log("yes") ;
  router.push("http://localhost:3000");
     }
    else{
       setIsError(true) ;
       setError(response.error) ;
    }
   };
  return (
    <div>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-40 w-40"
              src="/logo.png"
              alt="Rashmi Sweets Logo"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Login to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link
                href={"/signup"}
                className="font-medium text-red-600 hover:text-red-500"
              >
                {" "}
                Sign Up
              </Link>
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
            action="#"
            method="POST"
          >
            <input type="hidden" name="remember" value="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  onChange={handleChange}
                  value={email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  onChange={handleChange}
                  value={password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href={"/forgot"}
                  className="font-medium text-red-600 hover:text-red-500"
                >
                  {" "}
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-red-500 group-hover:text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Login
              </button>
              {isError && <div className="justify-center">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  }

export default Login