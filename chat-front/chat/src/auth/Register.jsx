import { Snackbar , Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { register } from "../redux/auth/Action";

const Register = () => {
  
    const [data, setData] = useState({username : "" , firstName : "" , lastName : "" , email:"" , password : ""});
    const [openSnack, setOpenSnack] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authState = useSelector((state) => state.auth);

    const handleRegister = (e) => {
        e.preventDefault()
        dispatch(register(data))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
      };
    const handleSnack = () => {
        setOpenSnack(false)
    }

    
      useEffect(() => {
          if (authState.register) {
              navigate("/login");
              setOpenSnack(true)
              //console.log(authState)
          }
      },[authState, navigate])




  return (
    <div>
        <div className="flex justify-center h-screen items-center">
            <div className="w-[30%] p-10 shadow-md bg-white">
                <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                        <p className="mb-2">Username</p>
                        <input
                         placeholder="Enter your username"
                         type="text"
                         name="username"
                         onChange={handleChange}
                         value={data.username}
                         className="py-2 outline-none w-full rounded-md border-2 border-silver"/>
                    </div>
                    <div>
                        <p className="mb-2">FirstName</p>
                        <input
                         placeholder="Enter your first Name"
                         type="text"
                         name="firstName"
                         onChange={handleChange}
                         value={data.firstName}
                         className="py-2 outline-none w-full rounded-md border-2 border-silver"/>
                    </div>
                    <div>
                        <p className="mb-2">LastName</p>
                        <input
                         placeholder="Enter your last Name"
                         type="text"
                         name="lastName"
                         onChange={handleChange}
                         value={data.lastName}
                         className="py-2 outline-none w-full rounded-md border-2 border-silver"/>
                    </div>
                    <div>
                        <p className="mb-2">Email</p>
                        <input
                         placeholder="Enter your email"
                         type="email"
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
                        <button type="submit" className="w-full">Register</button>
                    </div>

                </form>
                <div className="flex space-x-3 items-center mt-5">
                    <p className="italic m-0">Already have an account ?</p>
                    <button  onClick={() => navigate("/login")}>Login</button>


                </div>

            </div>
        </div>

        <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnack}>
        <Alert onClose={handleSnack} severity="success" sx={{ width: '100%' }}>
             Account created successfully!
        </Alert>
        </Snackbar>




    </div>
  )
}

export default Register