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
  categoriesArray: string[][];
  dataArrays: number[][];
  names: string[];
  ChartSeries: ChartSeriesItem[];
  Chartcategories: string[];
}
export var ChartSeries = [
  {
    name: "Last Month",
    data: [183, 124, 115, 85, 143, 143, 96],
  },
];
export var Chartcategories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

export var categoriesArray = [
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
];
export var names = [
  "Last Month",
  "Last Month",
  "This Month",
  "This Month",
  "This Month",
  "This Month",
  "This Month",
  "This Month",
];
// export var dataArrays = [];
export var dataArrays = [
  [183, 124, 115, 85, 143, 143, 10],
  [183, 124, 115, 85, 143, 143, 20],
  [150, 180, 100, 90, 120, 170, 30],
  [150, 180, 100, 90, 120, 170, 40],
  [150, 180, 100, 90, 120, 170, 50],
  [150, 180, 100, 90, 120, 170, 60],
  [150, 180, 100, 90, 120, 170, 70],
  [150, 180, 100, 90, 120, 170, 80],
];

export var ChartOptions: ApexOptions = {
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
    categories: Chartcategories,
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

export var ChartOptionsArray: ApexOptions[] = categoriesArray.map(
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
              return `数量:`;
            },
          },
        },
      },
    };
  }
);

export var ChartSeriesArray = names.map((name, index) => {
  return {
    name: name,
    data: dataArrays[index],
  };
});

export async function fetchDataAndUpdate(): Promise<void> {
  try {
    // console.log("fetchDataAndUpdate");
    const response = await axios.get(
      "http://149.248.11.13:8080/api/v1/holders/getLabelAndHolder/0xdac17f958d2ee523a2206206994597c13d831ec7?_limit=3"
    );
    const data: DataItem[] = response.data;
    console.log(data);
    // console.log("fetchDataAndUpdate");
    let updatedData: number[] = [];
    let updatedChartSeries: typeof ChartSeries = [];
    let updatedChartCategories: string[] = [];
    let updatedNames: string[] = [];
    let updatedCategoriesArray: string[][] = [];
    let updatedDataArrays: number[][] = [];

    console.log("ChartSeries", ChartSeries);
    console.log("Chartcategories", Chartcategories);
    console.log("categoriesArray", categoriesArray);
    console.log("dataArrays", dataArrays);
    console.log("names", names);

    // console.log("updatedData", updatedData);
    // console.log("updatedChartSeries", updatedChartSeries);
    // console.log("updatedChartCategories", updatedChartCategories);
    // console.log("updatedNames", updatedNames);
    // console.log("updatedCategoriesArray", updatedCategoriesArray);
    // console.log("updatedDataArrays", updatedDataArrays);

    data.forEach((item, index) => {
      const labelKey = Object.keys(item.label)[0];
      const labelValue = item.label[labelKey];

      // 更新 updatedChartSeries
      updatedData.push(labelValue);

      // 更新 updatedChartCategories
      updatedChartCategories.push(labelKey);

      // 更新 updatedNames
      updatedNames.push(labelKey);
      //   console.log("updatedData", updatedData);
      //   console.log("updatedChartSeries", updatedChartSeries);
      //   console.log("updatedChartCategories", updatedChartCategories);
      //   console.log("updatedNames", updatedNames);
      //   console.log("updatedCategoriesArray", updatedCategoriesArray);
      //   console.log("updatedDataArrays", updatedDataArrays);
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
      //   console.log("updatedData", updatedData);
      //   console.log("updatedChartSeries", updatedChartSeries);
      //   console.log("updatedChartCategories", updatedChartCategories);
      //   console.log("updatedNames", updatedNames);
      //   console.log("updatedCategoriesArray", updatedCategoriesArray);
      //   console.log("updatedDataArrays", updatedDataArrays);
    });

    updatedChartSeries.push({
      name: "Whole number", // 根据需要修改name
      data: updatedData,
    });

    // 更新 ChartSeries, Chartcategories, categoriesArray, dataArrays 和 names
    ChartSeries = updatedChartSeries;
    Chartcategories = updatedChartCategories;
    categoriesArray = updatedCategoriesArray;
    dataArrays = updatedDataArrays;
    names = updatedNames;
    console.log("ChartSeries", ChartSeries);
    console.log("Chartcategories", Chartcategories);
    console.log("categoriesArray", categoriesArray);
    console.log("dataArrays", dataArrays);
    console.log("names", names);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
