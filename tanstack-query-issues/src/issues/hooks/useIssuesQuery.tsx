import { useQuery } from '@tanstack/react-query';
import { getIssues } from '../actions/get-ussues.action';
import { useEffect, useState } from 'react';

interface Props {
    state: string;
    selectedLabels: string[];
}

export const useIssuesQuery = ({ state, selectedLabels }: Props) => {
    ///
    const [page, setPage] = useState(1);

    const issuesQuery = useQuery({
        /// 2. se agrega el page al queryKey
        queryKey: ['issues', { state, selectedLabels, page }],
        queryFn: () => getIssues(state, selectedLabels, page),
        staleTime: 1000 * 60 * 60,
    });

    useEffect(() => {
        setPage(1); /// si cambia el estado o los labels se reinicia la pagina a 1
    }
    , [state]);

    useEffect(() => {
        setPage(1);
    }
    , [selectedLabels]);

    const issues = issuesQuery.data || [];

    /// 1. se agrega el onClick para cambiar de pagina
    const nextPage = () => {
        if (issues.length < 5) return; /// si no hay issues no se puede cambiar de pagina

        setPage(page + 1);
    };

    const previousPage = () => {
        if (page === 1) return; /// si la pagina es 1 no se puede ir a la anterior
        setPage(page - 1);
    };

    return {
        issuesQuery,
        // Getters
        page,
        // Actions
        nextPage,
        previousPage,
    };
};
