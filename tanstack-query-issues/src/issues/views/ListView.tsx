import LoadingSpinner from '../../shared/components/LoadingSpinner';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssuesQuery } from '../hooks/useIssuesQuery';

export const ListView = () => {
    /// Obtener los issues de la API
    const { issuesQuery } = useIssuesQuery();

    const issues = issuesQuery.data || [];

    return (
        <div className='grid grid-cols-1 sm:grid-cols-3 mt-5'>
            <div className='col-span-1 sm:col-span-2'>
                {/*/// pasar las issues por aca  */}
                {issuesQuery.isLoading ? <LoadingSpinner /> : <IssueList  issues={issues}/>}
            </div>

            <div className='col-span-1 px-2'>
                <LabelPicker />
            </div>
        </div>
    );
};
