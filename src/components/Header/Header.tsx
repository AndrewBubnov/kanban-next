'use client'
import { useState } from "react";
import styles from "./Header.module.css";
import {Modal} from "@/components/Modal/Modal";
import {addTask} from "@/prismaActions/addTask";

const userId = '1';

export const Header = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const toggleOpenHandler = () => setOpenModal((prevState) => !prevState);
  const confirmHandler = async (task: { title: string; body: string }) => {
    await addTask(task, userId);
    setOpenModal(false);
  };
  return (
    <header className={styles.header}>
      <button className={styles.addButton} onClick={toggleOpenHandler}>
        Add new
      </button>
      <Modal
        open={openModal}
        onConfirm={confirmHandler}
        onCancel={toggleOpenHandler}
      />
    </header>
  );
};
