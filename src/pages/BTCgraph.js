import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BTCGraph = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart",
          {
            params: {
              vs_currency: "usd",
              days: "1",
              interval: "hourly",
            },
          }
        );

        const data = res.data.prices.map((price) => {
          return {
            x: new Date(price[0]),
            y: price[1],
          };
        });

        setChartData({
          labels: data.map((d) => d.x.toLocaleDateString()),
          datasets: [
            {
              label: "BTC Price in USD",
              data: data,
              borderColor: "rgba(255, 99, 132, 0.8)",
              fill: false,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : chartData.labels ? (
        <Line
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false,
              },
            },
            scales: {
              x: {
                display: false,
              },
              y: {
                display: false,
              },
            },
          }}
        />
      ) : (
        <p className={styles.noData}>No data available</p>
      )}
    </div>
  );
};

export default BTCGraph;
