"use client";

import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygonMumbai, goerli, polygon, gnosis } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { AragonSDKWrapper } from "./context/AragonSDK";
import { useIsMounted } from "./hooks/useIsMounted";
import { AragonProvider } from "@daobox/use-aragon";
import AppShell from "./components/appShell";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMounted = useIsMounted();

  const { chains, provider } = configureChains(
    [mainnet, polygonMumbai, goerli, polygon, gnosis],
    [
      alchemyProvider({
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_KEY || "",
        priority: 0,
      }),
      publicProvider({ priority: 1 }),
    ]
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
            {isMounted && (
              <AragonSDKWrapper>
                <AragonProvider>
                  <AppShell>{children}</AppShell>
                </AragonProvider>
              </AragonSDKWrapper>
            )}
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
