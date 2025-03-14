import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WalletProvider from '../components/WalletProvider';
import Navbar from '../components/Navbar';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Bitcoin NFT Minting dApp',
  description: 'Mint NFTs using Bitcoin',
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WalletProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <footer className="bg-bitcoin-gray text-white p-4 text-center">
              <p>© 2025 Bitcoin NFT Minting dApp - Built with Mezo Passport</p>
            </footer>
          </div>
        </WalletProvider>

      </body>
    </html>
  );
}
