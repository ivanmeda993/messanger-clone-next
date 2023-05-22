"use client";
import { User } from ".prisma/client";
import { Conversation } from "@prisma/client";
import useConversation from "@/app/hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "@/app/conversations/[conversationId]/components/MessageInput";
import { CldUploadButton } from "next-cloudinary";

interface IMessageFormProps {}
const MessageForm = ({}: IMessageFormProps) => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handleUpload = async (result: any) => {
    await axios.post("/api/messages", {
      image: result.info.secure_url,
      conversationId,
    });
  };

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="dt4ru9tb"
      >
        <HiPhoto
          size={30}
          className="text-sky-500 hover:text-sky-600 cursor-pointer transition"
        />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex items-center gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="rounded-full p-2 bg-sky-500 hover:bg-sky-600 transition"
        >
          <HiPaperAirplane size={16} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
