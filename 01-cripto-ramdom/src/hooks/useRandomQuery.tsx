import { useQuery } from '@tanstack/react-query';

/// esto puede que lo pasemos a un archivo de acciones o apis y que no quede en el hook es muy valido
const getCryptoNumber = async (): Promise<number> => {
    const response = await fetch(
        'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new'
    );
    const data = await response.json();
    return Number(data);
};

const useRandomQuery = () => {
    const randomQuery = useQuery({
        queryKey: ['randomNumber'],
        queryFn: getCryptoNumber,
        /// desactivar los reintentos
        retry: false,
    });

    /// lo exporto de esta manera por que puede ser que tengamos mas de un useQuery por componente
    return { randomQuery };
};

export default useRandomQuery;
