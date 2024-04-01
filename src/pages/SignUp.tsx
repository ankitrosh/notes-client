import InputContainer from "@/components/InputContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/types";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";

export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const onSubmit: SubmitHandler<{
    email: string;
    password: string;
    username: string;
  }> = async (data) => {
    console.log(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await axios.post(
      `${import.meta.env.VITE_NOTES_SERVER_BASE_URL}/api/users/signup`,
      data,
      {
        withCredentials: true,
      }
    );

    navigate("/");
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-screen flex justify-center items-center"
    >
      <div className="bg-white w-[600px] h-[800px] md:shadow-lg flex flex-col items-center justify-center px-5 py-4">
        <h1 className="text-4xl font-semibold">Welcome</h1>
        <p className="text-xl font-light mb-8">Sign up, to get started</p>

        <InputContainer label="Full Name:">
          <Input
            id="username"
            type="text"
            placeholder="User Name"
            required
            className="w-1/2 mx-auto"
            {...register("username", { required: true })}
          />
          {errors?.username ? <span>{errors?.username?.message}</span> : null}
        </InputContainer>
        <InputContainer label="Email:">
          <Input
            id="email"
            type="email"
            placeholder="Email"
            required
            className="w-1/2 mx-auto"
            {...register("email", { required: true })}
          />
          {errors?.email ? <span>{errors?.email?.message}</span> : null}
        </InputContainer>
        <InputContainer label="Password:">
          <Input
            id="password"
            type="password"
            placeholder="Password"
            required
            className="w-1/2 mx-auto"
            {...register("password", { required: true })}
          />
          {errors?.password ? <span>{errors?.password?.message}</span> : null}
        </InputContainer>
        <Button type="submit" className="mt-14 w-1/2">
          Submit
        </Button>
        <div className="mt-2">
          Already have an account?{" "}
          <span
            className="underline text-blue-500 cursor-pointer"
            onClick={() => navigate("/sign-in")}
          >
            Sign in
          </span>
        </div>
      </div>
    </form>
  );
}
