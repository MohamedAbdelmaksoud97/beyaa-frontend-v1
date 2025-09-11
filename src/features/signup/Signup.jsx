import { useState } from "react";
import Form from "./Form"; // store flow (multi-step)
import UserForm from "./userForm"; // account form (single-step)

export default function Signup() {
  // step 1 = user account, step 2 = store flow
  const [step, setStep] = useState(1);

  return (
    <div className="flex min-h-screen justify-center bg-white">
      {step === 2 ? <Form /> : <UserForm setStep={setStep} />}
    </div>
  );
}
