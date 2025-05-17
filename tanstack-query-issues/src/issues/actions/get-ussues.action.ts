import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers/sleep";
import { GithubIssue } from "../interfaces/issue.interface";

export const getIssues = async (state: string, selectedLabels: string[], page: number): Promise<GithubIssue[]> => {

    const params = new URLSearchParams();
    if (state !== 'All') {
        params.append('state', state);
    }

    if (selectedLabels.length > 0) {
        params.append('labels', selectedLabels.join(','));
    }

    /// 1. parámetros de pagination
    params.append('page', page.toString());
    params.append('per_page', '5');

    await sleep(1500);
    const { data } = await githubApi.get<GithubIssue[]>('/issues', {
        params
    });

    console.log('data', data);
    return data;
}