import { useEffect, useRef, useState } from "react";

import Divider from "@components/Divider";
import Icon from "@components/IcomoonIcon/Icon";
import { Table, Tbody } from "@components/Table/Table";
import { Thead } from "@components/Table/Table";
import { Tr } from "@components/Table/Table";
import { Th } from "@components/Table/Table";
import { Td } from "@components/Table/Table";
import { Modal, useModal } from "@components/Modal/Modal";
import Avatar from "@components/Avatar";
import { formatDateTo, formatTime } from "@utils/functions/utils";
import AddUserForm from "./AddUserForm";
import { USER_DATA, STATUS_ICON } from "./constants";
import { ToastPortal } from "@components/Toast/ToastPortal";
import type { ToastType } from "@components/Toast/ToastPortal";
import type { DefaultValues } from "./types";

const DAY_IN_MILLISECONDS = 86400000;

export default function UserManagement() {
  const [users, setUsers] = useState(USER_DATA);
  const ref = useRef<ToastType>();

  const { closeModal, isOpen, openModal } = useModal();

  const handleDelete = (id: number) => () => console.log(`Delete: ${id}`);

  const handleEdit = (id: number) => () => console.log(`Edit: ${id}`);

  const handleSubmit = ({
    avatar,
    email,
    firstName,
    lastName,
    role,
    status,
  }: DefaultValues) => {
    const currentTime = new Date().getTime();
    const newUser: (typeof users)[0] = {
      dateAdded: formatDateTo(currentTime),
      email,
      id: users.length + 1,
      image: avatar,
      lastActive: `${formatDateTo(
        currentTime + DAY_IN_MILLISECONDS
      )} ${formatTime(currentTime + DAY_IN_MILLISECONDS)}`,
      name: `${firstName} ${lastName}`,
      role,
      status,
    };

    setUsers((prev) => [...prev, newUser]);

    closeModal();

    ref.current?.addToast({
      message: "You have successfully added new team member",
      type: "alert",
      cloasable: true,
      position: "top-left",
    });

    console.log({
      payload: {
        avatar,
        email,
        firstName,
        lastName,
        role,
        status,
      },
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal} openModal={openModal}>
        <Modal.Background className=" backdrop-blur-0 bg-opacity-70" />

        <Modal.ContentWrapper className="my-5 px-5 sm:mt-20">
          <Modal.Title>Add team member</Modal.Title>

          <AddUserForm onSubmit={handleSubmit} cancel={closeModal} />
        </Modal.ContentWrapper>
      </Modal>

      <ToastPortal ref={ref} autoClose autoCloseTimeout={3000} />

      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div>
          <h2 className="text-h4">Update authorized people</h2>

          <p className="text-gray-500 my-4 sm:my-2">
            Manage your team member and their account permissions here.
          </p>
        </div>

        <Modal.OpenModalButton
          btnType="secondary"
          prefix={<Icon size={14} icon="plus" />}
          type="button"
          openModal={openModal}
          size="md"
        >
          Add team member
        </Modal.OpenModalButton>
      </div>

      <Divider />

        <div className="relative overflow-x-auto">
          <Table className="border-collapse w-full border-transparent text-sm text-left text-gray-500">
            <Thead>
              <Tr className="bg-gray-50 table-row border-transparent sm:block">
                <Th className="w-auto !bg-gray-50 border-0 border-transparent rounded-tl-lg">
                  {""}
                </Th>
                <Th className="w-auto !bg-gray-50">Name</Th>
                <Th className="w-auto !bg-gray-50">Date added</Th>
                <Th className="w-auto !bg-gray-50">Role</Th>
                <Th className="w-auto !bg-gray-50">Last active</Th>
                <Th className="w-auto !bg-gray-50">Status</Th>
                <Th className="w-auto !bg-gray-50 !rounded-tr-lg">{""}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map(
                ({
                  dateAdded,
                  id,
                  image,
                  lastActive,
                  name,
                  role,
                  status,
                  email,
                }) => (
                  <Tr key={id} className="table-row sm:block border-none">
                    <Td className="border-b w-16 !p-0 !text-body2/regular border-gray-100">
                      <Avatar className="w-8 !h-8" src={image} alt={`${name}'s profile picture`} />
                    </Td>

                    <Td className="border-b !text-body2/regular border-gray-100">
                      <p>{name}</p>
                      <p className="text-gray-500">{email}</p>
                    </Td>

                    <Td className="border-b !text-body2/regular border-gray-100">
                      {dateAdded}
                    </Td>

                    <Td className="border-b !text-body2/regular border-gray-100">
                      {role}
                    </Td>

                    <Td className="border-b !text-body2/regular border-gray-100">
                      {lastActive}
                    </Td>

                    <Td className="border-b !text-body2/regular border-gray-100">
                      <div className="flex flex-row gap-1.5">
                        <Icon icon={STATUS_ICON[status]} size={12.5} /> {status}
                      </div>
                    </Td>

                    <Td className="border-b !text-body2/regular border-gray-100">
                      <div className="flex flex-row gap-5">
                        <Icon
                          icon="Pen"
                          size={14}
                          color="gray"
                          onClick={handleEdit(id)}
                        />

                        <Icon
                          icon="Delete"
                          size={14}
                          color="gray"
                          onClick={handleDelete(id)}
                        />
                      </div>
                    </Td>
                  </Tr>
                )
              )}
            </Tbody>
          </Table>
        </div>
    </>
  );
}
