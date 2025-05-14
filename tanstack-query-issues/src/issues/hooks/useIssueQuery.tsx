import { useQuery } from '@tanstack/react-query';
import { getIssue, getIssueComments } from '../actions';

export const useIssueQuery = (issueNumber: number) => {
    const issuesQuery = useQuery({
        queryKey: ['issues', issueNumber],
        queryFn: () => getIssue(issueNumber),
        staleTime: 1000 * 60 * 60,
    });

    // 1. consulta en paralelo
    /* const commentsQuery = useQuery({
        queryKey: ['issues', issueNumber, 'comments'],
        queryFn: () => getIssueComments(issueNumber),
        staleTime: 1000 * 60 * 60,
    }); */

    /// 2. consulta en dependencia, secuencial
    const commentsQuery = useQuery({
        /// para inspirarnos se uso el get .get<GithubIssue>(`/issues/${issueNumber}/comments`)
        queryKey: ['issues', issuesQuery.data?.number, 'comments'],
        queryFn: () => getIssueComments(issuesQuery.data!.number),
        staleTime: 1000 * 60 * 60,
        /// enable en false para que no se ejecute la consulta nunca sola
        enabled: issuesQuery.data !== undefined, //- aca dice que estará habilitada si el issueQuery tiene data
    });

    return { issuesQuery, commentsQuery };
};
