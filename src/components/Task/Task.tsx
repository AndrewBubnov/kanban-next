import { TaskContent } from "types.ts";
import styles from "./Task.module.css";

export const Task = ({ title, body }: TaskContent) => (
  <div className={styles.card}>
    <div>{title}</div>
    <div>{body}</div>
  </div>
);
