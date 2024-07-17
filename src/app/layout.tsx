import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from './header';
import SecurityTipsFromCommunity from './securityTipsFromCommunity';
import Footer from './footer';
import { Web3Provider } from './Web3Context';
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { ContractProvider } from './actions/ContractContext';




const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Addicted's Token Factory",
  description: "Create all tokens with 1 click",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
       <body className={`${inter.className} bg-[#000000cd] text-gray-950 relative dark:bg-[#100f0f] dark:text-[#d6d6d6] m-auto text-center`}>
       <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <div className='bg-[#e7ffe1] absolute bottom-[-6rem] -z-10 right-[11rem] h-[111.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75] pt-28 dark:bg-[#1d3d15]'>
        </div>
        <div className='bg-[#c1d7fe] absolute bottom-[-1rem] -z-10 left-[-35rem] h-[111.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75] md:left[-33rem] lg:left[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#5493ff]'>
        </div>
        <Web3Provider>
          <ContractProvider>
        <Header />
        {/* <Intro /> */}
        <SecurityTipsFromCommunity />
        
       {children}
       </ContractProvider>
       </Web3Provider>
       </body>
       
       <Footer/>
      
    </html>
    </ClerkProvider>
  );
}
