"use client";
import Modal from "@/app/components/modals/Modal";
import Image from "next/image";

interface IImageModal {
  src?: string | null;
  onClose: () => void;
  isOpen?: boolean;
}
const ImageModal = ({ src, isOpen, onClose }: IImageModal) => {
  if (!src) return null;
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="w-80 h-80 md:w-[600px] md:h-[600px]">
        <Image src={src} alt="image" className="object-cover" fill />
      </div>
    </Modal>
  );
};

export default ImageModal;
