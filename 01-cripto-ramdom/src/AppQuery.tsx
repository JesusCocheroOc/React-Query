import './App.css';
import { useQuery } from '@tanstack/react-query';

const getCryptoNumber = async (): Promise<number> => {
  
    const response = await fetch(
        'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new'
    );
    const data = await response.json();
    return Number(data);
};
function App() {
    const {
        isFetching,
        data: number,
        error,
        refetch,
    } = useQuery({
        queryKey: ['randomNumber'],
        queryFn: getCryptoNumber,
        /// desactivar los reintentos
        retry: false,

    });

    return (
        <>
            {' '}
            {isFetching ? <h1>Cargando...</h1> : <h1>Numero: {number}</h1>}{' '}

            <div>{JSON.stringify(error)}</div>
            <button disabled={isFetching} onClick={() => refetch()}>
                Nuevo Numero
            </button>
        </>
    );
}

export default App;
