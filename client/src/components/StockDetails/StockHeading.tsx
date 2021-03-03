import styles from "./StockDetails.module.css";

export const StockHeading = ({
  name,
  symbol,
}: {
  name: string;
  symbol: string;
}) => {
  return (
    <hgroup>
      <h2 className={styles.heading2}>{name}</h2>
      <h3>{symbol}</h3>
    </hgroup>
  );
};
