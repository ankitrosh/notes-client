import InputContainer from "@/components/InputContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
export default function SignIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();
  const onSubmit: SubmitHandler<{ email: string; password: string }> = async (
    data
  ) => {
    try {
      //   const res = await fetch(`http://localhost:3000/api/users/login`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       credentials: "include",
      //       withCredentials: "true",
      //     },
      //     body: JSON.stringify(data),
      //   });
      await axios.post(`http://localhost:3000/api/users/login`, data, {
        withCredentials: true,
      });

      navigate("/");
    } catch (err) {
      console.log("error", err);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-screen flex justify-center items-center"
    >
      <div className="bg-white w-[600px] h-[800px] md:shadow-lg flex flex-col items-center justify-center px-5 py-4">
        <h1 className="text-4xl font-semibold">Welcome Back</h1>
        <p className="text-xl font-light mb-8">Sign in, to get started</p>
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
          Login
        </Button>
        <div className="mt-2">
          Don't have an account?{" "}
          <span
            className="underline text-blue-500 cursor-pointer"
            onClick={() => navigate("/sign-up")}
          >
            Sign up
          </span>
        </div>
      </div>
    </form>
  );
}
