import { useForm } from "react-hook-form";
import InputField from "../InputField/InputField";
import { useEffect } from "react";

type FormData = {
  currentMail: string;
  newMail: string;
  currentPass: string;
  newPass: string;
};

type Props = {
  callSubmit?: any;
  setSubmitBtnDisabled: (e?: any) => void;
  shouldFormReset: any;
}

export default function FormUserUpdate({callSubmit, setSubmitBtnDisabled, shouldFormReset}: Props) {
  const { register, setValue, watch, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = handleSubmit(data => {
    console.log(data)
    resetForm()
    setSubmitBtnDisabled(true)
  });

  useEffect(()=>{
    console.log("RESET")
    resetForm()
  },[shouldFormReset])

  useEffect(()=>{
    console.log("SUBMIT")
    onSubmit()
  },[callSubmit])

  const tryValidate = () => {
    const currentFieldsState = Object.values(watch());
    setSubmitBtnDisabled(currentFieldsState.includes(''))
  }

  const resetForm = () => {
    const currentFieldsState = watch();

    for (const [key, value] of Object.entries(currentFieldsState)) {
      //console.log(`${key}: ${value}`);
      setValue(key as any, "")
    }
  }

  return (
    <form onSubmit={onSubmit} onKeyUp={tryValidate}>
        <fieldset className="mt-6">
            <legend className="pb-5 font-medium text-base">Email</legend>
            <div className="flex gap-4">
                <InputField label={'Email'} placeholder={"Enter your email"} divInputWrapper={'border border-custom-border rounded px-3 py-[10px]'} inputClassName={"focus:outline-none"} type="mail" {...register("currentMail")}/>
                <InputField label={'New email'} placeholder={"Enter your new email"} divInputWrapper={'border border-custom-border rounded px-3 py-[10px]'} inputClassName={"focus:outline-none"} type="mail" {...register("newMail")}/>
            </div>
        </fieldset>
        
        <fieldset className="mt-6">
            <legend className="pb-5 font-medium text-base">Password</legend>
            <div className="flex gap-4">
                <InputField label={'Password'} placeholder={"Enter your password"} divInputWrapper={'border border-custom-border rounded px-3 py-[10px]'} inputClassName={"focus:outline-none"} type="password" {...register("currentPass")}/>
                <InputField label={'New password'} placeholder={"Enter your new password"} divInputWrapper={'border border-custom-border rounded px-3 py-[10px]'} inputClassName={"focus:outline-none"} {...register("newPass")}/>
            </div>
        </fieldset>
    </form>
  );
}