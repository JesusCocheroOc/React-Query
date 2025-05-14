import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers/sleep";
import { GithubIssue } from "../interfaces/issue.interface";


export const getIssue = async (issueNumber : number):Promise<GithubIssue> => {

    await sleep(1500); // Simulamos un tiempo de carga
    const { data } = await githubApi.get<GithubIssue>(`/issues/${issueNumber}`);

    return data;
}


/// 1 Obtener los comentarios de un issue de github con axios y tipar
export const getIssueComments = async (issueNumber: number): Promise<GithubIssue[]> => {

    await sleep(1500); // Simulamos un tiempo de carga
    const { data } = await githubApi.get<GithubIssue[]>(`/issues/${issueNumber}/comments`);

    console.log('data', data);
    return data;
}
