"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import Modal from "@/app/components/modals/Modal";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import Button from "@/app/components/Button";

interface IGroupChatModal {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}
const GroupChatModal = ({ onClose, isOpen, users }: IGroupChatModal) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a group chat
            </h2>
            <p className="mt-1 text-sm text-gray-500 leading-6">
              Group chats are great for planning a night out, or sharing
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                label="Name"
                id="name"
                required
                disabled={isLoading}
                register={register}
                errors={errors}
              />
              <Select
                disabled={isLoading}
                label="Members"
                options={users.map((user) => ({
                  label: user.name,
                  value: user.id,
                }))}
                onChange={(value) =>
                  setValue("members", value, { shouldValidate: true })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end items-center gap-x-6">
          <Button
            disabled={isLoading}
            onClick={onClose}
            secondary
            type="button"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
