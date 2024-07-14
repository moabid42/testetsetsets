"use client";

import { getCsrfToken, getSession } from "next-auth/react";

import { DynamicContextProvider } from "../lib/dynamic";
import { EthereumWalletConnectors } from "../lib/dynamic";

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

export default function ProviderWrapper({ children }: React.PropsWithChildren) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "78fb9e9b-0c28-4443-a308-355fd042671f",
        walletConnectors: [EthereumWalletConnectors],
        eventsCallbacks: {
          onAuthSuccess: async (event) => {
            const { authToken } = event;

            const csrfToken = await getCsrfToken();

            fetch("/api/auth/callback/credentials", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: `csrfToken=${encodeURIComponent(
                csrfToken
              )}&token=${encodeURIComponent(authToken)}`,
            })
              .then((res) => {
                if (res.ok) {
                  getSession();
                } else {
                  console.error("Failed to log in");
                }
              })
              .catch((error) => {
                // Handle any exceptions
                console.error("Error logging in", error);
              });
          },
        },
        overrides: { evmNetworks },
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}
