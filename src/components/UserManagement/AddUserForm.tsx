import { useState } from "react";

import InputField from "@components/InputField/InputField";
import InputFileField from "@components/InputFileField";
import { ListBox } from "@components/Dropdown/Dropdown";
import Button from "@components/Buttons/Button";
import { ROLES, STATUSES } from "./constants";

export default function AddUserForm() {
  const [value, setValue] =
    useState<(typeof ROLES)[number]>("Booking executive");
  const [status, setStatus] = useState<(typeof STATUSES)[0]>("Active");

  return (
    <div className="flex pb-4 flex-col gap-6">
      <InputFileField
        label="Avatar"
        caption={
          <span>
            Drop here or{" "}
            <span className="text-body3/regular text-blue-500">Browse</span>{" "}
            files
          </span>
        }
        description="Maximum file size 100MB"
      />

      <div className="flex flex-row gap-4">
        <InputField
          label="First name"
          type="text"
          inputMode="text"
          inputClassName="h-10"
          placeholder="Enter team member first name"
        />

        <InputField
          label="Last name"
          type="text"
          inputMode="text"
          inputClassName="h-10"
          placeholder="Enter team member first name"
        />
      </div>

      <InputField
        label="Email"
        type="email"
        inputMode="email"
        inputClassName="h-10"
        placeholder="Enter team member email address"
      />

      <div className="flex flex-row gap-4">
        <ListBox className="w-full" value={value} onChange={setValue}>
          <ListBox.Label>Role</ListBox.Label>

          <ListBox.ButtonWrapper className="!border-gray-100 shadow-sm" placeholder="Enter team member role">
            {value}
          </ListBox.ButtonWrapper>

          <ListBox.OptionsWrapper>
            {ROLES.map((role) => (
              <ListBox.Option className="p-2" key={role} value={role}>
                {role}
              </ListBox.Option>
            ))}
          </ListBox.OptionsWrapper>
        </ListBox>

        <ListBox className="w-full" value={status} onChange={setStatus}>
          <ListBox.Label>Status</ListBox.Label>

          <ListBox.ButtonWrapper className="!border-gray-100 shadow-sm" placeholder="Select status">
            {status}
          </ListBox.ButtonWrapper>

          <ListBox.OptionsWrapper>
            {STATUSES.map((status) => (
              <ListBox.Option className="p-2" key={status} value={status}>
                {status}
              </ListBox.Option>
            ))}
          </ListBox.OptionsWrapper>
        </ListBox>
      </div>

      <div className="flex flex-row items-center mt-8 justify-end gap-3">
        <Button type="button" btnType="secondary" className="w-28" size="md">
          Cancel
        </Button>

        <Button type="button" btnType="primary" className="w-28" size="md">
          Save
        </Button>
      </div>
    </div>
  );
}
