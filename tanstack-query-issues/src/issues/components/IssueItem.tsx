import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { GithubIssue } from '../interfaces/issue.interface';
import { useQueryClient } from '@tanstack/react-query';
import { getIssue, getIssueComments } from '../actions';
import { timeSince } from '../../helpers/time-since';

interface IssueItemProps {
    issue: GithubIssue;
}
export const IssueItem = ({ issue }: IssueItemProps) => {
    const navigate = useNavigate();


    const queryClient = useQueryClient();

    const prefetchData = () => {
        console.log('Prefetching data...');

        queryClient.prefetchQuery({
            queryKey: ['issues', issue.number],
            queryFn: () => getIssue(issue.number),
            staleTime: 1000 * 60 * 60,
        });

        //- ESTA LÓGICA LA PODEMOS ORGANIZAR EN EL CUSTOM HOOK

        queryClient.prefetchQuery({
            queryKey: ['issues', issue.number, 'comments'],
            queryFn: () => getIssueComments(issue.number),
            staleTime: 1000 * 60 * 60,
        });
    };


    /// el prefetchData se ejecuta cuando el mouse entra en el componente como es la misma info entonces se carga esta info y ya no se consulta
    const presetData = () => {
        
        /// primero ponemos la llave de la query y luego el valor que queremos que tenga
        queryClient.setQueryData(['issues', issue.number], issue);

    };

    return (
        <div
        /*/// usar  */
            onMouseEnter={presetData}
            className='animate-fadeIn flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800'
        >
            {issue.state === 'open' ? (
                <FiCheckCircle size={30} color='green' />
            ) : (
                <FiInfo size={30} color='red' className='min-w-10' />
            )}

            <div className='flex flex-col flex-grow px-2'>
                <a
                    onClick={() => navigate(`/issues/issue/${issue.number}`)}
                    className='hover:underline'
                >
                    {issue.title}
                </a>
                <span className='text-gray-500'>
                    #{issue.number} opened {timeSince(issue.created_at)} ago by{' '}
                    <span className='font-bold'>{issue.user.login}</span>
                </span>
            </div>

            {/*/// mostrar las etiquetas  */}
            <div className='flex flex-wrap'>
                {issue.labels.map((label) => (
                    <span
                        key={label.id}
                        className='animate-fadeIn px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer'
                        style={{
                            border: `1px solid #${label.color}`,
                            color: `#${label.color}`,
                        }}
                    >
                        {label.name}
                    </span>
                ))}
            </div>

            <img
                src={issue.user.avatar_url}
                alt='User Avatar'
                className='w-8 h-8 rounded-full'
            />
            <div className='flex flex-col mx-2 items-center'>
                <FiMessageSquare size={30} className='min-w-5' color='gray' />
                <span className='px-4 text-gray-400'>{issue.comments}</span>
            </div>
        </div>
    );
};
