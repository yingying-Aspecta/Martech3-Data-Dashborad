import React from "react";

import {
  GitHubBanner,
  Refine,
  LegacyAuthProvider as AuthProvider,
} from "@refinedev/core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  ReadyPage,
  ErrorComponent,
} from "@refinedev/mui";
import { CssBaseline, GlobalStyles } from "@mui/material";
import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  PeopleAltOutlined,
  StarOutlineRounded,
  VillaOutlined,
} from "@mui/icons-material";

import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";
import axios, { AxiosRequestConfig } from "axios";
import { Title, Sider, Layout, Header } from "components/layout";
import { ColorModeContextProvider } from "contexts";
import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";
import { ThirdwebProvider } from "@thirdweb-dev/react";
// import { ChakraProvider } from '@chakra-ui/react'

const colors = {
  brand: {
    900: "#E55332",
    800: "#F2AE29",
  },
};

import {
  // Login,
  Home,
  Agents,
  MyProfile,
  PropertyDetails,
  AllProperties,
  CreateProperty,
  AgentProfile,
  EditProperty,
} from "pages";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  return (
    <ColorModeContextProvider>
      <ThirdwebProvider
        activeChain={{
          // === Required information for connecting to the network === \\
          chainId: 534353, // Chain ID of the network
          // Array of RPC URLs to use
          rpc: ["https://alpha-rpc.scroll.io/l2"],

          // === Information for adding the network to your wallet (how it will appear for first time users) === \\
          // Information about the chains native currency (i.e. the currency that is used to pay for gas)
          nativeCurrency: {
            decimals: 18,
            name: "ETH",
            symbol: "ETH",
          },
          shortName: "scroll", // Display value shown in the wallet UI
          slug: "scroll", // Display value shown in the wallet UI
          testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
          chain: "Scroll Alpha Testnet", // Name of the network
          name: "Scroll Alpha Testnet", // Name of the network
        }}
      >
        {/* <GitHubBanner /> */}
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider("http://149.248.11.13:8080/api/v1")}
            notificationProvider={notificationProvider}
            ReadyPage={ReadyPage}
            catchAll={<ErrorComponent />}
            resources={[
              // {
              //   name: "properties",
              //   list: AllProperties,
              //   show: PropertyDetails,
              //   create: CreateProperty,
              //   edit: EditProperty,
              //   icon: <VillaOutlined />,
              // },
              // {
              //   name: "agents",
              //   list: Agents,
              //   show: AgentProfile,
              //   icon: <PeopleAltOutlined />,
              // },
              // {
              //   name: "reviews",
              //   list: Home,
              //   icon: <StarOutlineRounded />,
              // },
              // {
              //   name: "messages",
              //   list: Home,
              //   icon: <ChatBubbleOutline />,
              // },
              {
                name: "my-profile",
                options: { label: "My Profile " },
                list: MyProfile,
                icon: <AccountCircleOutlined />,
              },
            ]}
            Title={Title}
            Sider={Sider}
            Layout={Layout}
            Header={Header}
            legacyRouterProvider={routerProvider}
            // legacyAuthProvider={authProvider}
            DashboardPage={Home}
          />
        </RefineSnackbarProvider>
      </ThirdwebProvider>
    </ColorModeContextProvider>
  );
}

export default App;
