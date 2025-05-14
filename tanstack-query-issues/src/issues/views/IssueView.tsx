import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { IssueComment } from '../components/IssueComment';
import { FiSkipBack } from 'react-icons/fi';
import { useIssueQuery } from '../hooks/useIssueQuery';
import LoadingSpinner from '../../shared/components/LoadingSpinner';

export const IssueView = () => {
    const navigate = useNavigate();

    const params = useParams();
    const issueNumber = Number(params.issueNumber || 0);

    ///1. consulta de los comentarios
    const { issuesQuery, commentsQuery } = useIssueQuery(issueNumber);

    if (issuesQuery.isLoading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <h1 className='text-2xl text-gray-500'>Cargando...</h1>
            </div>
        );
    }

    if (!issuesQuery.data) {
        return <Navigate to='/404' />;
    }

    return (
        <div className='mb-5'>
            <div className='mb-4'>
                <button
                    onClick={() => navigate(-1)}
                    className='hover:underline text-blue-400 flex items-center'
                >
                    <FiSkipBack />
                    Regresar
                </button>
            </div>

            {/* Primer comentario */}
            <IssueComment issue={issuesQuery.data} />

            {/*/// 2. Renderizá los comentarios obtenidos de este issue */}
            {commentsQuery.isLoading ? <LoadingSpinner /> : (
              commentsQuery.data?.map((comment) => (
                <IssueComment key={comment.id} issue={comment} />
              ))
            )}
        </div>
    );
};