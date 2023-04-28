import BTCGraph from "./BTCgraph";
import styles from "../styles/Home.module.css";

const Widget = ({ btcData }) => {
  return (
    <div className={styles.btcGraphContainer}>
      <div className={styles.header}>
        <span>
          <strong>BTC/USD</strong>
        </span>
        <span
          className={
            btcData?.priceChange >= 0 ? styles.positive : styles.negative
          }
        >
          <strong>{btcData?.priceChange}%</strong>
        </span>
      </div>
      <div className={styles.medContainer}>
        <table>
          <tbody>
            <tr>
              <td>Market Cap:</td>
              <td>{btcData?.marketCap}B</td>
            </tr>
            <tr>
              <td>Volume:</td>
              <td>{btcData?.volume}M</td>
            </tr>
            <tr>
              <td>Price Range</td>
              <td>{btcData?.priceChangeRange.low}-{btcData?.priceChangeRange.high}</td>
            </tr>
          </tbody>
        </table>
        <BTCGraph />
      </div>
      <p className={styles.footer}>
        <a href="https://bitcoin.org/"> More About BTC/USD</a>
      </p>
    </div>
  );
};

export default Widget;
