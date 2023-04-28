"use client";

/* import type { AppProps } from "next/app";
import * as React from "react";


import { AragonProvider } from "@daobox/use-aragon";
import { chains, client } from "../config/wagmiConfig";
import AppShell from "../components/layout/AppShell";
import { Toaster } from "react-hot-toast";
import { useIsMounted } from "hooks"; */

import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, gnosis } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import NavBar from "./components/navbar";
import { AragonSDKWrapper } from "./context/AragonSDK";
import { useIsMounted } from "./hooks/useIsMounted";
import { AragonProvider } from "@daobox/use-aragon";
import AppShell from "./components/AppShell";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMounted = useIsMounted();

  const { chains, provider } = configureChains(
    [mainnet, polygon, gnosis],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "DBrains",
    projectId: "c2faee134926d6993802a83edd63d750",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  interface Props {
    children: React.ReactNode;
  }

  return (
    <html lang="en">
      <body>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <AragonProvider>
              {" "}
              {isMounted && <AppShell>{children}</AppShell>}
            </AragonProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
