import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis'
import Moralis from 'moralis';

// const Parse = require('parse/node');

const NoSSR = ({ children }: any) => (
  <>
    <div className="w-full h-full overflow-hidden" suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  </>
)

const MoralisStart = () => {
  Moralis.start({
    appId:process.env.NEXT_PUBLIC_APP_ID, 
    serverUrl: process.env.NEXT_PUBLIC_SERVER_URL
  });

  return (<></>)
}

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <MoralisProvider appId={process.env.NEXT_PUBLIC_APP_ID!} serverUrl={process.env.NEXT_PUBLIC_SERVER_URL!}>
      <NoSSR>
        <MoralisStart />
        <Component {...pageProps} />
      </NoSSR>
    </MoralisProvider>
  )
}

export default MyApp
