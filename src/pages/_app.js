import { useState, useEffect } from 'react';
import '../styles/globals.css';
import { Web3Provider } from '../context/Web3Context';
import Head from 'next/head';
import LoadingScreen from '../components/LoadingScreen';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Handle initial page load
    const initialLoadTimer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    // Handle page navigation events
    const handleRouteChangeStart = () => {
      setLoading(true);
    };
    
    const handleRouteChangeComplete = () => {
      setLoading(false);
    };
    
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeComplete);
    
    // Handle beforeunload to show loading on page refresh
    const handleBeforeUnload = () => {
      setLoading(true);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      clearTimeout(initialLoadTimer);
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeComplete);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router]);

  // Prevent body scroll when loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [loading]);

  return (
    <Web3Provider>
      <Head>
        <link rel="icon" href="/images/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {loading && <LoadingScreen />}
      <Component {...pageProps} />
    </Web3Provider>
  );
}

export default MyApp; 