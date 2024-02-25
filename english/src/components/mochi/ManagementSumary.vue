<template>
  <div class="flex justify-evenly">
    <Chart type="bar" :data="chartData1" :options="chartOptions1" />
    <Chart type="pie" :data="chartData2" :options="chartOptions2" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData1: null,
      chartOptions1: null,
      chartData2: null,
      chartOptions2: null
    }
  },
  mounted() {
    this.chartData1 = this.setChartData()
    this.chartOptions1 = this.setChartOptions()
    this.chartData2 = this.setChartData2()
    this.chartOptions2 = this.setChartOptions2()
  },
  methods: {
    setChartData() {
      return {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            label: 'Sales',
            data: [540, 325, 702, 620],
            backgroundColor: [
              'rgba(249, 115, 22, 0.2)',
              'rgba(6, 182, 212, 0.2)',
              'rgb(107, 114, 128, 0.2)',
              'rgba(139, 92, 246, 0.2)'
            ],
            borderColor: [
              'rgb(249, 115, 22)',
              'rgb(6, 182, 212)',
              'rgb(107, 114, 128)',
              'rgb(139, 92, 246)'
            ],
            borderWidth: 1
          }
        ]
      }
    },
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement)
      const textColor = documentStyle.getPropertyValue('--text-color')
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border')

      return {
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          }
        }
      }
    },
    setChartData2() {
      const documentStyle = getComputedStyle(document.body)

      return {
        labels: ['A', 'B', 'C'],
        datasets: [
          {
            data: [540, 325, 702],
            backgroundColor: [
              'rgba(249, 115, 22, 0.2)',
              'rgba(6, 182, 212, 0.2)',
              'rgb(107, 114, 128, 0.2)'
            ],
            hoverBackgroundColor: [
              'rgba(249, 115, 22, 0.2)',
              'rgba(6, 182, 212, 0.2)',
              'rgb(107, 114, 128, 0.2)'
            ]
          }
        ]
      }
    },
    setChartOptions2() {
      const documentStyle = getComputedStyle(document.documentElement)
      const textColor = documentStyle.getPropertyValue('--text-color')

      return {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          }
        }
      }
    }
  }
}
</script>
