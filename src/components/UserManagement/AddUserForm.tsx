import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputField from "@components/InputField/InputField";
import InputFileField from "@components/InputFileField";
import { ListBox } from "@components/Dropdown/Dropdown";
import Button from "@components/Buttons/Button";
import useDataUrl from "@hooks/useDataUrl";
import { ROLES, STATUSES, defaultValues, schema } from "./constants";
import type { DefaultValues } from "./types";
import { useEffect } from "react";
import Avatar from "../Avatar";

interface AddUserFormProps {
  onSubmit: (data: DefaultValues) => void;
  cancel: () => void;
}

export default function AddUserForm({ onSubmit, cancel }: AddUserFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [avatar, setFile] = useDataUrl();

  const handleOnChangeSelect =
    (field: keyof typeof defaultValues) => (value: unknown) =>
      setValue(field, value as string);

  const handleOnChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || !files.length) {
      return;
    }

    const [avatarImageFile] = files;

    setFile(avatarImageFile);
  };

  useEffect(() => {
    if (avatar) {
      setValue("avatar", avatar);
    }
  }, [avatar]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex pb-4 flex-col gap-6"
    >
      {avatar ? (
        <div>
          <p className="relative first-letter:capitalize block text-body3/medium my-2 text-gray-500  truncate whitespace-nowrap">
            Avatar
          </p>
          <Avatar src={avatar} alt="Profile picture" className="!h-16 !w-16" />
        </div>
      ) : (
        <InputFileField
          ontoInputLabel="Avatar"
          accept="image/png, image/jpeg, image/jpg"
          label={
            <span>
              Drop here or{" "}
              <span className="text-body3/regular text-blue-500">Browse</span>{" "}
              files
            </span>
          }
          description="Maximum file size 100MB"
          error={errors.avatar}
          {...register("avatar", {
            required: true,
            onChange: handleOnChangeAvatar,
          })}
        />
      )}

      <div className="flex flex-row gap-4">
        <InputField
          label="First name"
          type="text"
          inputMode="text"
          inputClassName="h-10"
          placeholder="Enter team member first name"
          error={errors.firstName}
          {...register("firstName", { required: true })}
        />

        <InputField
          label="Last name"
          type="text"
          inputMode="text"
          inputClassName="h-10"
          placeholder="Enter team member first name"
          error={errors.lastName}
          {...register("lastName", { required: true })}
        />
      </div>

      <InputField
        label="Email"
        type="email"
        inputMode="email"
        inputClassName="h-10"
        placeholder="Enter team member email address"
        error={errors.email}
        {...register("email", { required: true })}
      />

      <div className="flex flex-row gap-4">
        <ListBox
          className="w-full"
          value={getValues("role")}
          {...register("role", { required: true })}
          onChange={handleOnChangeSelect("role")}
          error={errors.role}
          required
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
          onChange={handleOnChangeSelect("status")}
          error={errors.status}
          required
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
        <Button
          type="button"
          onClick={cancel}
          btnType="secondary"
          className="w-28"
          size="md"
        >
          Cancel
        </Button>

        <Button type="submit" btnType="primary" className="w-28" size="md">
          Save
        </Button>
      </div>
    </form>
  );
}
