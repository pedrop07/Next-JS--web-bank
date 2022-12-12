import { useState } from 'react';
import { AuthContext } from '../shared/context/auth';
import '../styles/style.css';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}

export default MyApp
