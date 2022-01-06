import styles from "./styles.module.scss";

interface InputProps {
  id: string;
  label: string;
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export function Input({
  id,
  label,
  value,
  onChange,
  name,
  type = "text",
}: InputProps) {
  return (
    <>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.input}
        id={id}
        value={value}
        onChange={onChange}
        name={name}
        type={type}
      />
    </>
  );
}
