import { Alert, Snackbar } from "@mui/material";
import {  useEffect, useState } from "react"
import { useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {  login } from "../redux/auth/Action";


const Login = () => {
    const [data, setData] = useState({email:"" , password : ""});
    const [openSnack, setOpenSnack] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const authState = useSelector((state) => state.auth);

 console.log(authState);
 

    const handleLogIn = (e) => {
        e.preventDefault()
        dispatch(login(data))
        console.log(authState)
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    }
    const handleSnack = () => {
        setOpenSnack(false)
    }
    useEffect(() => {
        
        if (authState.login) {
            navigate("/");
            console.log(authState)

        }
    },[authState, navigate])


   
  return (
    <div>
        <div className="flex justify-center h-screen items-center">
            <div className="w-[30%] p-10 shadow-md bg-white">
                <form onSubmit={handleLogIn} className="space-y-5">
                    <div>
                        <p className="mb-2">Email</p>
                        <input
                         placeholder="Enter your email"
                         type="text"
                         name="email"
                         onChange={handleChange}
                         value={data.email}
                         className="py-2 outline-none w-full rounded-md border-2 border-silver"/>
                    </div>
                    <div>
                        <p className="mb-2">Password</p>
                        <input
                         placeholder="Enter your password"
                         type="password"
                         name="password"
                         onChange={handleChange}
                         value={data.password}
                         className="py-2 outline-none w-full rounded-md border-2 border-silver"/>
                    </div>
                    <div>
                        <button type="submit" className="w-full">Sign In</button>
                    </div>

                </form>
                <div className="flex space-x-3 items-center mt-5">
                    <p className="italic m-0">Create New Account</p>
                    <button  onClick={() => navigate("/register")}>Register</button>


                </div>

            </div>
        </div>

        <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnack}>
        <Alert onClose={handleSnack} severity="success" sx={{ width: '100%' }}>
             Welcome
        </Alert>
        </Snackbar>




    </div>
  )
}

export default Login