import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getIssues } from '../actions';

interface Props {
    state: string;
    selectedLabels: string[];
}

export const useIssuesQueryInfinite = ({ state, selectedLabels }: Props) => {

    /// el useInfiniteQuery es un hook que permite paginar los resultados de una consulta
    /// y obtener más resultados a medida que el usuario se desplaza hacia abajo en la lista. eso es lo ideal pero en este ejerccio se hace con el boton obtener mas
    const issuesQuery = useInfiniteQuery({
        queryKey: ['issues', 'infinite', { state, selectedLabels }],
        // el queryFn se usa de esta forma como un objeto para poder usar el pageParam y el queryKey
        // y poder paginar los resultados. El pageParam es el número de página que se va a obtener.
        queryFn: ({ pageParam, queryKey}) => {
            console.log('pageParam', queryKey, pageParam);


            /// desestructurar el tercer elemento
            const [,,args] = queryKey;

            //- los tomamos de aca en caso de no tener acceso desde lo parámetros de la función, pero el mejor tomar los que se reciben como argumento, es lo mismo
            const { state, selectedLabels } = args as Props;

            /// ya estamos haciendo la paginación infinita
            return getIssues(state, selectedLabels, pageParam );
        },
        staleTime: 1000 * 60 * 60,
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => lastPage.length === 0 ? undefined : pages.length + 1,
    });

    

    return {
        issuesQuery,
        
    };
};
