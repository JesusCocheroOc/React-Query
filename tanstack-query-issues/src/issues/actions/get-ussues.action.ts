import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers/sleep";
import { GithubIssue } from "../interfaces/issue.interface";

export const getIssues = async ():Promise<GithubIssue[]> => {

    await sleep(1500); // Simulamos un tiempo de carga
    const { data } = await githubApi.get<GithubIssue[]>('/issues');

    console.log('data', data);
    return data;
}