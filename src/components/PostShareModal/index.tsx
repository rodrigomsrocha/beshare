import { addDoc, collection } from "firebase/firestore";
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { useModalContext } from "../../contexts/ModalContext";
import { db } from "../../firebase/client";
import styles from "./styles.module.scss";

export function PostShareModal() {
  const { isOpen, setIsOpen } = useModalContext();
  const [preview, setPreview] = useState("");
  const [sub, setSub] = useState("");

  const { user } = useGlobalContext();

  function handleOutsideClick(e: FormEvent) {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
      setPreview("");
      setSub("");
    }
  }

  function handleSelectedFile(e: FormEvent) {
    const file = (e.target as HTMLInputElement).files![0];
    const reader = new FileReader();
    if (file.type.includes("image") && file.size < 900000) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select an image file less than 1MB");
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const shareRef = collection(db, "shares");
      await addDoc(shareRef, {
        sub,
        image: preview,
        createdAt: String(new Date()),
        sharer: {
          id: user.uid,
          username: user.username,
          avatar: user.avatar,
        },
      });
      setIsOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
    setPreview("");
    setSub("");
  }

  return (
    <div
      className={`${styles.backdrop} ${
        isOpen ? styles.active : styles.inactive
      }`}
      onClick={handleOutsideClick}
    >
      <Toaster position="top-center" />
      <div className={styles.content}>
        <h1>Post a share</h1>
        <div className={styles.imagePreview}>
          {preview ? (
            <img src={preview} alt="preview" />
          ) : (
            <span>No image selected</span>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="share" className={styles.fileLabel}>
            <AiOutlineCamera size="24px" fill="#7371FC" />
          </label>
          <input
            type="file"
            name="share"
            id="share"
            className={styles.fileInput}
            onChange={handleSelectedFile}
          />
          <label htmlFor="sub">
            <input
              type="text"
              name="sub"
              id="sub"
              placeholder="Subtitle"
              className={styles.subInput}
              onChange={(e) => setSub(e.target.value)}
              value={sub}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
