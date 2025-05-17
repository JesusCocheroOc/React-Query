import LoadingSpinner from '../../shared/components/LoadingSpinner';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssuesQuery } from '../hooks/useIssuesQuery';
import { useState } from 'react';

export const ListViewInfinite = () => {
    const [state, setState] = useState<string>('all');
    const [labels, setLabels] = useState<string[]>([]);

    const { issuesQuery } = useIssuesQuery({
        state,
        selectedLabels: labels,
    });

    const issues = issuesQuery.data || [];

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
                        {/*/// cambios aca  */}
                            <button
                                className='p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all'
                                onClick={() => console.log('Cargar más')}
                            >
                                Cargar más ...
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
