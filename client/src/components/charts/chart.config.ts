import React, { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import axios from "axios";

interface DataItem {
  label: { [key: string]: number };
  other_labels: Array<{ [key: string]: number }>;
}

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
// export var ChartSeries = [
//   {
//     name: "Last Month",
//     data: [183, 124, 115, 85, 143, 143, 96],
//   },
// ];

// export var categoriesArray = [
//   ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//   ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//   ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//   ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//   ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//   ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//   ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
// ];
// export var names = [
//   "Last Month",
//   "Last Month",
//   "This Month",
//   "This Month",
//   "This Month",
//   "This Month",
//   "This Month",
//   "This Month",
// ];
export var Chartcategories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

let Data: number[] = [];
let ChartSeries = [{ name: "", data: Data }];
let ChartCategories: string[] = [];
let CategoriesArray: string[][] = [];
let DataArrays: number[][] = [];

export { ChartSeries, ChartCategories, CategoriesArray, DataArrays };

// export var dataArrays = [];
// export var dataArrays = [
//   [183, 124, 115, 85, 143, 143, 10],
//   [183, 124, 115, 85, 143, 143, 20],
//   [150, 180, 100, 90, 120, 170, 30],
//   [150, 180, 100, 90, 120, 170, 40],
//   [150, 180, 100, 90, 120, 170, 50],
//   [150, 180, 100, 90, 120, 170, 60],
//   [150, 180, 100, 90, 120, 170, 70],
//   [150, 180, 100, 90, 120, 170, 80],
// ];

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
    categories: ChartCategories,
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

export async function fetchData(): Promise<ResponseData> {
  try {
    const response = await axios.get(
      "http://149.248.11.13:8080/api/v1/holders/getLabelAndHolder/0xdac17f958d2ee523a2206206994597c13d831ec7?_limit=3"
    );
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

    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// export async function fetchData(): Promise<void> {
//   try {
//     // console.log("fetchDataAndUpdate");
//     const response = await axios.get(
//       "http://149.248.11.13:8080/api/v1/holders/getLabelAndHolder/0xdac17f958d2ee523a2206206994597c13d831ec7?_limit=3"
//     );
//     const data: DataItem[] = response.data;
//     // console.log(data);
//     // console.log("fetchDataAndUpdate");
//     let updatedData: number[] = [];
//     let updatedChartSeries: typeof ChartSeries = [];
//     let updatedChartCategories: string[] = [];
//     let updatedCategoriesArray: string[][] = [];
//     let updatedDataArrays: number[][] = [];
//     let updatedChartSeriesArray: typeof ChartSeriesArray = [];

//     console.log("ChartSeries", ChartSeries);
//     console.log("ChartCategories", ChartCategories);
//     console.log("CategoriesArray", CategoriesArray);
//     console.log("DataArrays", DataArrays);

//     // console.log("updatedData", updatedData);
//     // console.log("updatedChartSeries", updatedChartSeries);
//     // console.log("updatedChartCategories", updatedChartCategories);
//     // console.log("updatedNames", updatedNames);
//     // console.log("updatedCategoriesArray", updatedCategoriesArray);
//     // console.log("updatedDataArrays", updatedDataArrays);

//     data.forEach((item, index) => {
//       const labelKey = Object.keys(item.label)[0];
//       const labelValue = item.label[labelKey];

//       // 更新 updatedChartSeries
//       updatedData.push(labelValue);

//       // 更新 updatedChartCategories
//       updatedChartCategories.push(labelKey);

//       //   console.log("updatedData", updatedData);
//       //   console.log("updatedChartSeries", updatedChartSeries);
//       //   console.log("updatedChartCategories", updatedChartCategories);
//       //   console.log("updatedNames", updatedNames);
//       //   console.log("updatedCategoriesArray", updatedCategoriesArray);
//       //   console.log("updatedDataArrays", updatedDataArrays);
//       // 更新 updatedCategoriesArray 和 updatedDataArrays

//       if (!updatedCategoriesArray[index]) {
//         updatedCategoriesArray[index] = [];
//       }
//       if (!updatedDataArrays[index]) {
//         updatedDataArrays[index] = [];
//       }

//       item.other_labels.forEach((otherLabel, i) => {
//         const otherLabelKey = Object.keys(otherLabel)[0];
//         const otherLabelValue = otherLabel[otherLabelKey];

//         updatedCategoriesArray[index][i] = otherLabelKey;
//         updatedDataArrays[index][i] = otherLabelValue;
//       });

//       //   console.log("updatedData", updatedData);
//       //   console.log("updatedChartSeries", updatedChartSeries);
//       //   console.log("updatedChartCategories", updatedChartCategories);
//       //   console.log("updatedNames", updatedNames);
//       //   console.log("updatedCategoriesArray", updatedCategoriesArray);
//       //   console.log("updatedDataArrays", updatedDataArrays);
//     });

//     updatedChartSeries.push({
//       name: "Whole number",
//       data: updatedData,
//     });
//     updatedChartSeriesArray = updatedChartCategories.map((_name, index) => {
//       return {
//         name: _name,
//         data: updatedDataArrays[index],
//       };
//     });
//     // 更新 ChartSeries, Chartcategories, categoriesArray, dataArrays 和 names
//     ChartSeries = updatedChartSeries;
//     ChartCategories = updatedChartCategories;
//     CategoriesArray = updatedCategoriesArray;
//     DataArrays = updatedDataArrays;
//     ChartSeriesArray = updatedChartSeriesArray;

//     console.log("ChartSeries", ChartSeries);
//     console.log("ChartCategories", ChartCategories);
//     console.log("CategoriesArray", CategoriesArray);
//     console.log("DataArrays", DataArrays);
//     console.log("ChartSeriesArray", ChartSeriesArray);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }
