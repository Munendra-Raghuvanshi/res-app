import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserstore } from "@/store/useUserstore";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const { verifyEmail } = useUserstore();
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });
    }
    if (value !== "" && index < 5) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verificationCode = otp.join("");

    try {
      await verifyEmail(verificationCode);
      navigate("/");
    } catch (error) {
      console.error("Verification failed:", error);
      return;
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-10 border border-gray-200">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl">Verify your email</h1>
          <p className="text-sm text-gray-600">
            Enter the 6-digit code sent to your email address
          </p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="flex justify-between">
            {otp.map((_letter: string, idx: number) => (
              <Input
                key={idx}
                ref={(element) => {
                  inputRef.current[idx] = element;
                }}
                type="text"
                maxLength={1}
                value={otp[idx]} 
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>
          <Button type="submit" className="bg-orange-500 hover:bg-orange-400 mt-6 w-full">
            Verify
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
