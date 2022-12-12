import { useEffect, useState } from 'react';
import { AuthContext } from '../shared/context/auth';
import '../styles/style.css';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));

    setUser(currentUser);
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}

export default MyApp
