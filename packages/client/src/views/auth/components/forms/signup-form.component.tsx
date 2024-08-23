import {SubmitHandler, useForm} from "react-hook-form";

type SignUpInputs = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SignUpInputs>()

  const onSubmit: SubmitHandler<SignUpInputs> = (data) => console.log(data)

  return (
    <form className={"flex flex-col gap-2 w-full"} onSubmit={handleSubmit(onSubmit)}>

      <div>
        <input type="text" placeholder={"Full Name"}
               className="input input-bordered w-full" {...register("fullName", {required: true})}/>
        {errors.fullName && <span className={"text-error text-sm"}>name is required</span>}
      </div>

      <div>
        <input type="email" placeholder="Email"
               className="input input-bordered w-full" {...register("email", {required: true})}/>
        {errors.email && <span className={"text-error text-sm"}>email is required</span>}
      </div>

      <div>
        <input type="password" placeholder="Password"
               className="input input-bordered w-full" {...register("password", {required: true})}/>
        {errors.password && <span className={"text-error text-sm"}>password is required</span>}
      </div>

      <div>
        <input type="text" placeholder="Confirm Password"
               className="input input-bordered w-full" {...register("confirmPassword", {required: true})}/>
        {errors.confirmPassword && <span className={"text-error text-sm"}>confirm password must match</span>}
      </div>


      <button className={"btn btn-primary mt-2 w-full"}>Register</button>
    </form>
  );
}

export default SignUpForm