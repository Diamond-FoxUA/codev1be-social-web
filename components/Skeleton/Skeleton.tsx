import styles from './Skeleton.module.css';

type Props = {
  width?: number | string;
  height?: number | string;
  circle?: boolean;
};

export default function Skeleton({
  width = '100%',
  height = 16,
  circle = false,
}: Props) {
  return (
    <div
      className={styles.skeleton}
      style={{
        width,
        height,
        borderRadius: circle ? '50%' : '6px',
      }}
    />
  );
}