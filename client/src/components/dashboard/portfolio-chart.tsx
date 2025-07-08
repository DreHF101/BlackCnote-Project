import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface PortfolioChartProps {
  data: Array<{ month: string; value: number }>;
}

export default function PortfolioChart({ data }: PortfolioChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map(item => item.month),
        datasets: [{
          label: "Portfolio Value",
          data: data.map(item => item.value),
          borderColor: "hsl(217, 91%, 60%)",
          backgroundColor: "hsla(217, 91%, 60%, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              color: "hsl(215, 16%, 20%)",
            },
            ticks: {
              color: "hsl(215, 20%, 65%)",
            },
          },
          y: {
            grid: {
              color: "hsl(215, 16%, 20%)",
            },
            ticks: {
              color: "hsl(215, 20%, 65%)",
              callback: function(value) {
                return "$" + (value as number).toLocaleString();
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="bg-[var(--dark-card)] rounded-xl p-6 border border-[var(--dark-border)] mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          Portfolio Performance
        </h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm bg-[var(--accent-blue)] text-white rounded-md">
            1M
          </button>
          <button className="px-3 py-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            3M
          </button>
          <button className="px-3 py-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            1Y
          </button>
          <button className="px-3 py-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            ALL
          </button>
        </div>
      </div>
      <div className="h-80">
        <canvas ref={chartRef} className="w-full h-full"></canvas>
      </div>
    </div>
  );
}
