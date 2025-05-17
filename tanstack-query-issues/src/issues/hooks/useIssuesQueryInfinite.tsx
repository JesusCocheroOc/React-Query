import { useQuery } from '@tanstack/react-query';
import { getIssues } from '../actions';

interface Props {
    state: string;
    selectedLabels: string[];
}

export const useIssuesQueryInfinite = ({ state, selectedLabels }: Props) => {

    const issuesQuery = useQuery({
        queryKey: ['issues', { state, selectedLabels }],
        queryFn: () => getIssues(state, selectedLabels, 1),
        staleTime: 1000 * 60 * 60,
    });

    

    return {
        issuesQuery,
        
    };
};
