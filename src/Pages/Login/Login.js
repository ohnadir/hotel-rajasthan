import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Share/Loading';


const Login = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  let signInError;

  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  if (loading) {
    return <Loading></Loading>
  }
  if (error) {
    signInError = <p className='text-red-500'><small>{error?.message}</small></p>
  }
  if (user) {
    navigate(from, { replace: true })
  }

  const onSubmit = (data) => {
    console.log(data)
    signInWithEmailAndPassword(data.email, data.password)
    
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-3xl text-center font-bold" >Login Now !</h2>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-bold">Email :</span>
              </label>
              <input type="email"
                placeholder="email@example.com"
                className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md focus:bg-neutral-400 "
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email Required ??"
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Wrong Email"
                  }
                })}
              />
              <label className="label">
                {errors.email?.type === 'required' && <span className="label-text-alt text-orange-600  ">{errors.email.message}</span>}
                {errors.email?.type === 'pattern' && <span className="label-text-alt   text-red-500">{errors.email.message}</span>}
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-bold">Password :</span>
              </label>
              <input type="password"
                placeholder="******"
                className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md focus:bg-neutral-400 "
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password Required ??"
                  },
                  minLength: {
                    value: 6,
                    message: 'minimum 6 digit'
                  }
                })}
              />
              <label className="label">
                {errors.password?.type === 'required' && <span className="label-text-alt text-orange-600  ">{errors.password.message}</span>}
                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500  ">{errors.password.message}</span>}
              </label>
            </div>
            {signInError}
            <input className='btn w-full max-w-xs text-white bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-500   mt-5 hover:text-black' type="submit" value="Login Now" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;