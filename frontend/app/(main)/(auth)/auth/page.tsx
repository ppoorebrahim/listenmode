"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

export default function AuthPage() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [emailError, setEmailError] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setEmailError(false)
  }

  const handleOtpChange = (e, index) => {
    const value = e.target.value
    otp[index] = value.length === 1 ? value : ""
    setOtp([...otp])
    const next = value.length === 1 ? index + 1 : index - 1
    if (next >= 0 && next < 6) {
      document.getElementById(`otp-input-${next}`)?.focus()
    }
  }

  const validateEmail = () => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const valid = pattern.test(email)
    setEmailError(!valid)
    return valid
  }

  const handleNextClick = () => {
    if (step === 1 && validateEmail()) {
      setStep(2)
    }
  }

  const handleSubmit = () => {
    console.log("Submitted OTP:", otp.join(""))
  }

  const handleGoogleLogin = () => {
    console.log("Google Login")
  }

  return (
<div className="flex flex-col items-center justify-center px-4 pt-6 pb-10 w-full max-w-md md:pt-10">{/* Logo + heading */}
      <div className="flex flex-col items-center mb-6">
        <Image src="/LogoMark_40-40.svg" alt="Logo" width={56} height={56} />
        <h1 className="text-xl font-semibold text-white mt-2">Sign in</h1>
      </div>

      {/* Form box */}
      <div className="bg-[#1A1A1A] w-full p-6 rounded-xl shadow-lg">
        {step === 1 && (
          <>
            <label className="block mb-2 text-sm text-white">Enter your email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="you@example.com"
              className={`w-full p-2 rounded-md bg-gray-800 text-white text-sm placeholder:text-gray-500 ${
                emailError ? "border-2 border-red-500" : ""
              } focus:outline-none focus:border-[#4639B3]`}
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-1">Please enter a valid email</p>
            )}
            <button
              onClick={handleNextClick}
              className="w-full mt-4 py-2 bg-[#4639B3] text-white rounded-md hover:bg-[#4639B3]/90 text-sm"
            >
              Next
            </button>

            {/* Or separator */}
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="mx-3 text-xs text-gray-400">or</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full py-2 bg-[#F5F5F5] text-black rounded-md flex items-center justify-center gap-2 hover:bg-[#e2e2e2] text-sm"
            >
              <Image src="/google-logo.svg" alt="Google" width={20} height={20} />
              Continue with Google
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex items-center mb-4">
              <button
                onClick={() => setStep(1)}
                className="text-[#4639B3] flex items-center gap-2"
              >
                <ArrowLeft className="h-5 w-5 text-white" />
              </button>
              <h2 className="ml-2 text-white text-base font-medium">Enter the code</h2>
            </div>

            <div className="flex justify-between gap-2">
              {otp.map((value, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  value={value}
                  onChange={(e) => handleOtpChange(e, index)}
                  className="w-10 h-12 bg-gray-800 text-white text-center rounded-md text-lg focus:outline-none focus:border-[#4639B3]"
                  maxLength={1}
                />
              ))}
            </div>
            <button
              onClick={handleSubmit}
              className="w-full mt-6 py-2 bg-[#4639B3] text-white rounded-md hover:bg-[#4639B3]/90 text-sm"
            >
              Submit
            </button>
            <button className="w-full mt-2 text-[#33AAA4] text-sm hover:underline">
              Resend code
            </button>
          </>
        )}
      </div>

      {/* Terms text */}
      <p className="mt-6 text-xs text-gray-500 text-center">
        Terms of Service and Privacy Policy
      </p>
    </div>
  )
}
