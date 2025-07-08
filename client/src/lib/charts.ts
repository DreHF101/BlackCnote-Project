import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export const createPortfolioChart = (canvas: HTMLCanvasElement, data: any[]) => {
  return new Chart(canvas, {
    type: 'line',
    data: {
      labels: data.map(item => item.month),
      datasets: [{
        label: 'Portfolio Value',
        data: data.map(item => item.value),
        borderColor: 'hsl(217, 91%, 60%)',
        backgroundColor: 'hsla(217, 91%, 60%, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          grid: {
            color: 'hsl(215, 16%, 20%)'
          },
          ticks: {
            color: 'hsl(215, 20%, 65%)'
          }
        },
        y: {
          grid: {
            color: 'hsl(215, 16%, 20%)'
          },
          ticks: {
            color: 'hsl(215, 20%, 65%)',
            callback: function(value) {
              return '$' + (value as number).toLocaleString();
            }
          }
        }
      }
    }
  });
};

export { Chart };
