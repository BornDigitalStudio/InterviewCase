import { useState } from "react";

import Button from "@components/Buttons/Button";
import Divider from "@components/Divider";
import Icon from "@components/IcomoonIcon/Icon";
import InputField from "@components/InputField/InputField";

export default function GeneralForm() {
  const [isPasswordShown, setIsPasswordShown] = useState({
    password: false,
    newPassword: false,
  });

  const handleShowPassword = (type: "password" | "newPassword") => () => {
    setIsPasswordShown((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div>
          <h2 className="text-h4">General</h2>

          <p className="text-gray-500 my-2">
            Here you can change your email and password
          </p>
        </div>

        <div>
          <div className="flex flex-row gap-2">
            <Button btnType="secondary" type="button" size="md">
              Cancel
            </Button>

            <Button disabled btnType="secondary" type="button" size="md">
              Update details
            </Button>
          </div>
        </div>
      </div>

      <Divider />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-end flex-col gap-5">
          <p>Email</p>
          <InputField
            type="email"
            label="Email"
            placeholder="Enter your email"
            contstyle="rounded"
            inputClassName="h-10 focus:border-gray-500"
            // prefix={<Icon icon="search" size={16} color="gray" />}
            inputMode="email"
          />
        </div>

        <div className="flex justify-end flex-col">
          <InputField
            type="email"
            label="New email"
            placeholder="Enter your new email"
            contstyle="rounded"
            inputClassName="h-10 focus:border-gray-500"
            // prefix={<Icon icon="search" size={16} color="gray" />}
            inputMode="email"
          />
        </div>

        <div className="flex justify-end flex-col gap-5">
          <p>Password</p>
          <InputField
            type="password"
            label="Password"
            placeholder="Enter your password"
            contstyle="rounded"
            inputClassName="h-10 focus:border-gray-500"
            shouldSufixButtonWork
            sufix={
              <Icon
                icon={isPasswordShown.password ? "eye" : "eye-blocked"}
                size={16}
                color="gray"
                onClick={handleShowPassword("password")}
              />
            }
            inputMode="text"
          />
        </div>

        <div className="flex justify-end flex-col">
          <InputField
            type="password"
            label="New password"
            placeholder="Enter your new password"
            contstyle="rounded"
            inputClassName="h-10 focus:border-gray-500"
            shouldSufixButtonWork
            sufix={
              <Icon
                icon={isPasswordShown.newPassword ? "eye" : "eye-blocked"}
                size={16}
                color="gray"
                onClick={handleShowPassword("newPassword")}
              />
            }
            inputMode="text"
          />
        </div>
      </div>
    </>
  );
}
