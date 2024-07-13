import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";

import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";


import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import MobileOnlyApp from "@/components/mobileOnly";
import Navbar from "@/components/navbar";

import {
  EthersExtension,
  DynamicContextProvider,
  EthereumWalletConnectors,
} from "../lib/dynamic";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};``

const evmNetworks = [
  {
    blockExplorerUrls: ['https://jenkins.explorer.caldera.xyz/'],
    chainId: 1798,
    chainName: 'ApeChain',
    iconUrls: ["https://app.dynamic.xyz/assets/networks/polygon.svg"],
    name: 'Polygon',
    nativeCurrency: {
      decimals: 18,
      name: 'ApeCoin',
      symbol: 'APE',
    },
    networkId: 1798,
    rpcUrls: ['https://jenkins.rpc.caldera.xyz/http'],
    vanityName: 'Apechain',
  }
];

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <DynamicContextProvider
        settings={{
          environmentId: "78fb9e9b-0c28-4443-a308-355fd042671f",
          walletConnectors: [EthereumWalletConnectors],
          walletConnectorExtensions: [EthersExtension],
          overrides: { evmNetworks },
        }}
      >
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {/* <MobileOnlyApp> */}
          <Navbar />
          <main className="w-full h-full">{children}</main>
              {/* <footer className="w-full flex items-center justify-center py-3">
                <Link
                  isExternal
                  className="flex items-center gap-1 text-current"
                  href="https://ethglobal.com/brussels"
                  title="ethglobal brussels page"
                >
                  <span className="text-default-600">Made for</span>
                  <p className="text-primary">ETHGlobal Brussels</p>
                </Link>
              </footer> */}
          {/* </MobileOnlyApp> */}
          <ToastContainer />
        </Providers>
      </body>
      </DynamicContextProvider>
    </html>
  );
}
