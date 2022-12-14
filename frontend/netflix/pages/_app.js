import '../styles/globals.css'
import {RecoilRoot} from 'recoil'
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
        <Component {...pageProps} />

        <Analytics />
    </RecoilRoot>
  ) 
}

export default MyApp
