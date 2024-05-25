import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
/*
  Pie chart for the categories of the transactions and the total amount of the transactions.
  @param categories: Array. Categories of the transactions.
  @param sumAmount: Number. Total amount of the transactions.
  @param type: Array. Types of the transactions.
  @returns {Object} - Pie chart for the categories of the transactions.

*/
export function PieChart({ categories, sumAmount, type }) {
  if (sumAmount === undefined) return "loading";

  let bg_colors;
  let names_labels;

  // If the sum of the categories is different from 0 we get the colors and the names of the categories
  if (sumAmount !== 0) {
    const bg = type.map((e) => e.color);
    const names = type.map((e) => e.categories);

    bg_colors = bg;
    names_labels = names;
  } else {
    bg_colors = ["#7A8480"];
    names_labels = [];
  }
  // Data for the pie chart of the categories of the transactions
  const data = {
    labels: names_labels,

    datasets: [
      {
        // If the sum of the categories is different from 0 we get the categories, otherwise we get 100
        data: categories.every((e) => e === 0) ? ["100"] : categories,

        backgroundColor: bg_colors,

        borderWidth: 1,
      },
    ],
  };

  // Plugins for the pie chart of the categories of the transactions and the total amount of the transactions
  const plugins = [
    {
      beforeDraw: function (chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        var fontSize = (height / 250).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";
        var text = `$${sumAmount}`,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 1.8;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];

  const config = {
    type: "pie",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Pie Chart",
        },
      },
    },
  };

  return <Doughnut data={data} plugins={plugins} config={config} />;
}
