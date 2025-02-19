import SendTransaction from "./components/sendTransaction";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <SendTransaction />
    </main>
  );
}
