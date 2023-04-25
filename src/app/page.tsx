"use client";
import { Rainbowkit } from "./components/rainbowkit";
import NavBar from "./components/navbar";

export default function Home() {
  return (
    <Rainbowkit>
      <NavBar />
      <main>
        <h1 className="mt-5 text-2xl p-5">DBrains Home Page</h1>
      </main>
    </Rainbowkit>
  );
}
