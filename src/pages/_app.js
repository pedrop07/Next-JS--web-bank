import { useEffect, useState } from 'react';
import { AuthContext } from '../shared/context/auth';
import '../styles/style.css';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));

    if(!currentUser && !window.location.href.includes('login') && !window.location.href.includes('register')) window.location.href = "/login";

    setUser(currentUser);
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}

export default MyApp
