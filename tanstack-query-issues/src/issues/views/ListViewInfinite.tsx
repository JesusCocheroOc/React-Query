import LoadingSpinner from '../../shared/components/LoadingSpinner';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useState } from 'react';
import { useIssuesQueryInfinite } from '../hooks/useIssuesQueryInfinite';

export const ListViewInfinite = () => {
    const [state, setState] = useState<string>('all');
    const [labels, setLabels] = useState<string[]>([]);

    /// Usar aca el infinity
    const { issuesQuery } = useIssuesQueryInfinite({
        state,
        selectedLabels: labels,
    });

    /// el useInfiniteQuery es un hook que permite paginar los resultados de una consulta
    const issues = issuesQuery.data?.pages.flat() || [];

    const onLabelsSelected = (label: string) => {
        if (labels.includes(label)) {
            setLabels(labels.filter((l: string) => l !== label));
        } else {
            setLabels([...labels, label]);
        }
    };

    return (
        <div className='grid grid-cols-1 sm:grid-cols-3 mt-5'>
            <div className='col-span-1 sm:col-span-2'>
                {issuesQuery.isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div className='flex flex-col justify-center'>
                        <IssueList
                            issues={issues}
                            onStateChange={(state) => setState(state)}
                            state={state}
                        />
                        {/*/// cambios aca, solo queda un botón para simular desplazamiento  */}
                            <button
                                className='p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all'
                                /// ya solo con esto obtenemos la demás data
                                onClick={() => issuesQuery.fetchNextPage()}
                                disabled={!issuesQuery.hasNextPage || issuesQuery.isFetchingNextPage}
                            >
                                {/* //- podemos poner un loandin por aca */}
                                {
                                    issuesQuery.isFetchingNextPage ? (
                                        'Cargando...'
                                    ) : (
                                        'Obtener más'
                                    )
                                }
                            </button>
                    </div>
                )}
            </div>

            <div className='col-span-1 px-2'>
                <LabelPicker
                    onLabelsSelected={onLabelsSelected}
                    labels={labels}
                />
            </div>
        </div>
    );
};
