import React, { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import axios from "axios";

interface ChartSeriesItem {
  name: string;
  data: number[];
}

export interface ChartData {
  CategoriesArray: string[][]; //二级，用于选中一个label之后剩下的和他共有的label的数组
  DataArrays: number[][]; //二级，用于选中一个label之后剩下的和他共有的label的数据的数组
  ChartSeries: ChartSeriesItem; //一级，name是一级选中的label，data是一级的数据
  ChartCategories: string[]; //一级，一级的label
}
interface DataItem {
  label: { [key: string]: number };
  other_labels: Array<{ [key: string]: number }>;
}

let Data: number[] = [];
let ChartSeries = [{ name: "", data: Data }];
let ChartCategories: string[] = [];
let CategoriesArray: string[][] = [];
let DataArrays: number[][] = [];

export { ChartSeries, ChartCategories, CategoriesArray, DataArrays };

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
  colors: ["#FF8C00"],
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
    categories: ChartCategories,
    labels: {
      style: {
        colors: ["#FFFFFF"], // 将颜色设置为白色
      },
    },
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
    enabled: true,
    theme: "dark",
    x: {
      show: true,
    },
    y: {
      formatter: (value: number) => {
        return `${value} 人`;
      },
      title: {
        formatter: (seriesName: string) => {
          return `数量: `;
        },
      },
    },
  },
};

export const ChartOptionsArray: ApexOptions[] = CategoriesArray.map(
  (categories, index) => {
    return {
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      colors: ["#FF8C00"],
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
        labels: {
          style: {
            colors: ["#FFFFFF"], // 将颜色设置为白色
          },
        },
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
        enabled: true,
        theme: "dark",
        x: {
          show: true,
        },
        y: {
          formatter: (value: number) => {
            return `${value} 人`;
          },
          title: {
            formatter: (seriesName: string) => {
              return `数量:${seriesName}`;
            },
          },
        },
      },
    };
  }
);

export var ChartSeriesArray = ChartCategories.map((_name, index) => {
  return {
    name: _name,
    data: DataArrays[index],
  };
});

interface ResponseData {
  ChartSeries: ChartSeriesItem[];
  ChartCategories: string[];
  CategoriesArray: string[][];
  DataArrays: number[][];
  ChartSeriesArray: ChartSeriesItem[];
}

interface ChartSeriesItem {
  name: string;
  data: number[];
}

export async function fetchData(s: string): Promise<ResponseData> {
  try {
    const response = await axios.get(s);
    const data: DataItem[] = response.data;

    let updatedData: number[] = [];
    let updatedChartSeries: ChartSeriesItem[] = [];
    let updatedChartCategories: string[] = [];
    let updatedCategoriesArray: string[][] = [];
    let updatedDataArrays: number[][] = [];
    let updatedChartSeriesArray: ChartSeriesItem[] = [];

    data.forEach((item, index) => {
      const labelKey = Object.keys(item.label)[0];
      const labelValue = item.label[labelKey];

      // 更新 updatedChartSeries
      updatedData.push(labelValue);

      // 更新 updatedChartCategories
      updatedChartCategories.push(labelKey);

      // 更新 updatedCategoriesArray 和 updatedDataArrays
      if (!updatedCategoriesArray[index]) {
        updatedCategoriesArray[index] = [];
      }
      if (!updatedDataArrays[index]) {
        updatedDataArrays[index] = [];
      }

      item.other_labels.forEach((otherLabel, i) => {
        const otherLabelKey = Object.keys(otherLabel)[0];
        const otherLabelValue = otherLabel[otherLabelKey];

        updatedCategoriesArray[index][i] = otherLabelKey;
        updatedDataArrays[index][i] = otherLabelValue;
      });
    });

    updatedChartSeries.push({
      name: "Whole number",
      data: updatedData,
    });

    updatedChartSeriesArray = updatedChartCategories.map((_name, index) => {
      return {
        name: _name,
        data: updatedDataArrays[index],
      };
    });

    // 构建返回的 response 对象
    const responseData: ResponseData = {
      ChartSeries: updatedChartSeries,
      ChartCategories: updatedChartCategories,
      CategoriesArray: updatedCategoriesArray,
      DataArrays: updatedDataArrays,
      ChartSeriesArray: updatedChartSeriesArray,
    };

    console.log("responseData", responseData);
    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
