import {SubmitHandler, useForm} from "react-hook-form";

type SignInInputs = {
  email: string;
  password: string;
}

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SignInInputs>()

  const onSubmit: SubmitHandler<SignInInputs> = (data) => console.log(data)

  return (
    <form className={"flex flex-col gap-2 w-full"} onSubmit={handleSubmit(onSubmit)}>

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

      <button className={"btn btn-primary mt-2 w-full"}>Login</button>
    </form>
  );
}

export default SignInForm