import DiscordInvite from "react-discord-invite";
import Navbar from "./navbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-full">
        <Navbar />
        {children}
        <div className="p-5">
          <DiscordInvite guild="" />
        </div>
      </div>
    </>
  );
}
