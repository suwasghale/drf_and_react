import { useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const {register, handleSubmit, formState:{errors, isSubmitting}, reset} = useForm()

  const navigate = useNavigate()
  
  const onSubmitForm = async data =>{
        try{
            const response = await axios.post(`http://127.0.0.1:8000/api/v1/users/register/`, data)
            toast.success("user registered successfully!")
            navigate('/login')
        }
        catch(err){
          console.log(err)
        }
  }

  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow mt-10">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Register</h2>
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        {/* First Name */}
        <div className="flex items-center gap-2">
          <div>
            <label className="label" htmlFor="firstName">
              First Name
            </label>
            <input
            {...register('first_name')}
              className="input"
              type="text"
              id="firstName"
              name="first_name"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="label" htmlFor="lastName">
              Last Name
            </label>
            <input
              {...register('last_name')}
              className="input"
              type="text"
              id="lastName"
              name="last_name"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
          {...register('email')} 
          className="input" type="email" id="email" name="email" />
        </div>

        {/* Username */}
        <div>
          <label className="label" htmlFor="username">
            Username
          </label>
          <input             
          {...register('username')}
          className="input" type="text" id="username" name="username" />
        </div>

        {/* Password */}
        <div>
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            {...register('password')}
            className="input"
            type="password"
            id="password"
            name="password"
          />
        </div>

        {/* Confirm Password */}
        {/* <div>
          <label className="label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="input"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
          />
        </div> */}

        <Button disabled={isSubmitting} type="submit" size="md" className="w-full mt-4">
          {isSubmitting?"Submitting": "Register"}
        </Button>
      </form>
    </div>

        </>

  );
};

export default RegisterForm;
