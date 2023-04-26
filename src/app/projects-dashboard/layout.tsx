"use client";

import NavBar from "../components/navbar";
import "@rainbow-me/rainbowkit/styles.css";
import { Rainbowkit } from "../components/rainbowkit";
import "../globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Rainbowkit>
          <NavBar />
        </Rainbowkit>
        {children}
      </body>
    </html>
  );
}
