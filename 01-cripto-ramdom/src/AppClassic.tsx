import { useEffect, useState } from 'react';
import './App.css';

// https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new
function App() {
    const [number, setNumber] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    const [refreshToken, setRefreshToken] = useState(0);

    useEffect(() => {
        setLoading(true);
        /// petición http a la api de random.org
        const fetchData = async () => {
            fetch(
                'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new'
            )
                .then((resp) => {
                    return resp.json();
                })
                .then((data) => {
                  console.log(data);
                    setNumber(data);
                })
                .catch( error => {
                  setError(error);
                  setLoading(false);
                }).finally(() => setLoading(false));
        };

        fetchData();
    }, [refreshToken]);

    return (
        <>
            {' '}
            {loading ? <h1>Cargando...</h1> : <h1>Numero: {number}</h1>}{' '}

            <div>{error}</div>

            <button
                disabled={loading}
                onClick={() => setRefreshToken(refreshToken + 1)}
            >
                Nuevo Numero
            </button>
        </>
    );
}

export default App;