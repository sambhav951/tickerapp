import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Widget from "./Widget";

const Article = () => {
  const [btcData, setBtcData] = useState(null);
  const [showGraph, setShowGraph] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Bitcoin data");
        }
        const data = await response.json();
        setBtcData({
          volume: (data.market_data.total_volume.usd / 1_000_000).toFixed(3),
          marketCap: (data.market_data.market_cap.usd / 1_000_000_000).toFixed(
            3
          ),
          priceChange: data.market_data.price_change_percentage_24h,
          priceChangeRange: {
            low: data.market_data.low_24h.usd,
            high: data.market_data.high_24h.usd,
          },
        });
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const handleMouseOver = () => {
    setShowGraph(true);
  };

  const handleMouseLeave = () => {
    setShowGraph(false);
  };

  return (
    <>
      <Head>
        <title>Bitcoin - A Brief Introduction</title>
      </Head>
      <div className={styles.container}>
        <div>
          <h1>Bitcoin - A Brief Introduction</h1>
          <div>
            Bitcoin is a decentralized digital currency that operates on a
            peer-to-peer network. It was created in 2009 by an unknown person
            using the name Satoshi Nakamoto. Bitcoin transactions are verified
            by network nodes through cryptography and recorded in a public
            distributed ledger called a <strong>blockchain</strong>.
          </div>
          <br />
          <div>
            <strong>Bitcoin</strong>{" "}
            <div
              className={`${styles.priceChange} ${
                btcData
                  ? btcData?.priceChange >= 0
                    ? styles.lightGreen
                    : styles.lightRed
                  : null
              }`}
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            >
              <span className={styles.downTriangle}></span>
              <strong>BTC/USD</strong>{" "}
              <span
                className={
                  btcData
                    ? btcData?.priceChange > 0
                      ? styles.positive
                      : styles.negative
                    : null
                }
              >
                <strong>{btcData?.priceChange}%</strong>
              </span>
              {showGraph && btcData && <Widget btcData={btcData} />}
            </div>
            <div style={{ display: "inline" }}>
              has grown significantly over the years, and it is now accepted by
              several major companies and merchants worldwide. While it has
              faced its fair share of controversies and criticisms, Bitcoin
              remains one of the most popular and valuable cryptocurrencies in
              the world.
            </div>
          </div>
          <br/>
            <div>
              It is often referred to as the "digital gold" due to its
              limited supply and its ability to serve as a store of value.
              Unlike traditional currencies, which are controlled by governments
              and financial institutions, Bitcoin is decentralized and operates
              independently of any central authority.
            </div>
          {error && <p style={{ color: "red" }}>{error} the live data</p>}
        </div>
      </div>
    </>
  );
};

export default Article;
