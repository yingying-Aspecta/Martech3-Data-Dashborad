import React, { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export const ChartSeries = [
  {
    name: "Last Month",
    data: [183, 124, 115, 85, 143, 143, 96],
  },
];
export const ChartOptions: ApexOptions = {
  chart: {
    type: "bar",
    toolbar: {
      show: false,
    },
    events: {
      click: function (event, chartContext, config) {
        console.log(chartContext, config);
      },
    },
  },
  colors: ["#475BE8"],
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      columnWidth: "55%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    show: false,
  },
  stroke: {
    colors: ["transparent"],
    width: 4,
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  },
  yaxis: {
    title: {
      text: " k",
    },
  },
  fill: {
    opacity: 1,
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
  },
  tooltip: {
    y: {
      formatter(val: number) {
        return `${val} k`;
      },
    },
  },
};

const categoriesArray = [
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],

  // 你可以在这里添加更多的分类数组，每个数组对应一个图表的 x 轴分类
];

export const ChartOptionsArray: ApexOptions[] = categoriesArray.map(
  (categories, index) => {
    return {
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
        events: {
          click: function (event, chartContext, config) {
            console.log(chartContext, config);
          },
        },
      },
      colors: ["#475BE8"],
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
          columnWidth: "55%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: false,
      },
      stroke: {
        colors: ["transparent"],
        width: 4,
      },
      xaxis: {
        categories: categories, // 使用不同的横坐标
      },
      yaxis: {
        title: {
          text: `第 ${index + 1} 个图表 (k)`,
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
      },
      tooltip: {
        y: {
          formatter(val: number) {
            return `${val} k`;
          },
        },
      },
    };
  }
);

export const ChartSeriesArray = [
  // 第一个图表的系列
  [
    /* ... */
    {
      name: "Last Month",
      data: [183, 124, 115, 85, 143, 143, 10],
    },
  ],
  // 第二个图表的系列
  [
    /* ... */
    {
      name: "Last Month",
      data: [183, 124, 115, 85, 143, 143, 20],
    },
  ],
  // 第三个图表的系列
  [
    /* ... */
    {
      name: "This Month",
      data: [150, 180, 100, 90, 120, 170, 30],
    },
  ],
  // 第四个图表的系列
  [
    /* ... */
    {
      name: "This Month",
      data: [150, 180, 100, 90, 120, 170, 40],
    },
  ],
  // 第五个图表的系列
  [
    /* ... */
    {
      name: "This Month",
      data: [150, 180, 100, 90, 120, 170, 50],
    },
  ],
  // 第六个图表的系列
  [
    /* ... */
    {
      name: "This Month",
      data: [150, 180, 100, 90, 120, 170, 60],
    },
  ],
  // 第七个图表的系列
  [
    /* ... */
    {
      name: "This Month",
      data: [150, 180, 100, 90, 120, 170, 70],
    },
  ],
  // 第八个图表的系列
  [
    /* ... */
    {
      name: "This Month",
      data: [150, 180, 100, 90, 120, 170, 80],
    },
  ],
];
