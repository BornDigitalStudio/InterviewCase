import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputField from "@components/InputField/InputField";
import InputFileField from "@components/InputFileField";
import { ListBox } from "@components/Dropdown/Dropdown";
import Button from "@components/Buttons/Button";
import { ROLES, STATUSES, defaultValues, schema } from "./constants";
import type { DefaultValues } from "./types";

interface AddUserFormProps {
  onSubmit: (data: DefaultValues) => void;
}

export default function AddUserForm({ onSubmit }: AddUserFormProps) {
  const { register, handleSubmit, setValue, getValues } = useForm({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleSelect =
    (field: keyof typeof defaultValues) => (value: unknown) =>
      setValue(field, value as string);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex pb-4 flex-col gap-6"
    >
      <InputFileField
        ontoInputLabel="Avatar"
        label={
          <span>
            Drop here or{" "}
            <span className="text-body3/regular text-blue-500">Browse</span>{" "}
            files
          </span>
        }
        description="Maximum file size 100MB"
        {...register("avatar", { required: true })}
      />

      <div className="flex flex-row gap-4">
        <InputField
          label="First name"
          type="text"
          inputMode="text"
          inputClassName="h-10"
          placeholder="Enter team member first name"
          {...register("firstName", { required: true })}
        />

        <InputField
          label="Last name"
          type="text"
          inputMode="text"
          inputClassName="h-10"
          placeholder="Enter team member first name"
          {...register("lastName", { required: true })}
        />
      </div>

      <InputField
        label="Email"
        type="email"
        inputMode="email"
        inputClassName="h-10"
        placeholder="Enter team member email address"
        {...register("email", { required: true })}
      />

      <div className="flex flex-row gap-4">
        <ListBox
          className="w-full"
          value={getValues("role")}
          {...register("role", { required: true })}
          required
          onChange={handleSelect("role")}
        >
          <ListBox.Label>Role</ListBox.Label>

          <ListBox.ButtonWrapper
            className="!border-gray-100 shadow-sm"
            placeholder="Enter team member role"
          >
            {getValues("role")}
          </ListBox.ButtonWrapper>

          <ListBox.OptionsWrapper>
            {ROLES.map((role) => (
              <ListBox.Option<typeof role>
                className="p-2"
                key={role}
                value={role}
              >
                {role}
              </ListBox.Option>
            ))}
          </ListBox.OptionsWrapper>
        </ListBox>

        <ListBox
          className="w-full"
          value={getValues("status")}
          placeholder="Select status"
          {...register("status", { required: true })}
          required
          onChange={handleSelect("status")}
        >
          <ListBox.Label>Status</ListBox.Label>

          <ListBox.ButtonWrapper
            className="!border-gray-100 shadow-sm"
            placeholder="Select status"
          >
            {getValues("status")}
          </ListBox.ButtonWrapper>

          <ListBox.OptionsWrapper>
            {STATUSES.map((status) => (
              <ListBox.Option<typeof status>
                className="p-2"
                key={status}
                value={status}
              >
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
    </form>
  );
}
