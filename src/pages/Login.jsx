import { useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const {register, handleSubmit, formState:{errors, isSubmitting}, reset} = useForm()

  const navigate = useNavigate()
  
  const onSubmitForm = async data =>{
        try{
            const response = await axios.post(`http://127.0.0.1:8000/api/v1/users/login/`, data)
            console.log(response.data)
            toast.success("user login successfully!")
            navigate('/')
        }
        catch (err) {
        if (err.response && err.response.data) {
            // if DRF sends { "status": "error", "message": "Invalid credentials" }
            const errorMessage = err.response.data.message || "Something went wrong!";
            toast.error(errorMessage);
        } else {
            toast.error(err.message || "Network error");
        }
        }

  }

  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow mt-10">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Login</h2>
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        {/* Username */}
        <div>
          <label className="label" htmlFor="username">
            Username
          </label>
          <input             
          {...register('username', {
            required:"Username is required"
          })}
          className="input" type="text" id="username" name="username" />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            {...register('password', {
                required:"Password is required"
            })}
            className="input"
            type="password"
            id="password"
            name="password"
          />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        </div>

        <Button disabled={isSubmitting} type="submit" size="md" className="w-full mt-4">
          {isSubmitting?"Submitting": "Login"}
        </Button>
      </form>
    </div>

        </>

  );
};

export default LoginForm;
