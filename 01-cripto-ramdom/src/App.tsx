import './App.css';
import useRandomQuery from './hooks/useRandomQuery';


function App() {

  /// podemos de desestructurar mas el useQuery pero asi es mas entendible por que sabemos de que consulta viene el dato
  const { randomQuery } = useRandomQuery();

    return (
        <>
            {' '}
            {randomQuery.isFetching ? (
                <h1>Cargando...</h1>
            ) : (
                <h1>Numero: {randomQuery.data}</h1>
            )}{' '}
            <div>{JSON.stringify(randomQuery.error)}</div>
            <button
                disabled={randomQuery.isFetching}
                onClick={() => randomQuery.refetch()}
            >
                Nuevo Numero
            </button>
        </>
    );
}

export default App;
