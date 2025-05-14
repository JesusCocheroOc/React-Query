import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers/sleep";
import { GithubLabel } from "../interfaces/label.interface";

/// Obtener etiquetas de github con axios y tipar
export const getLabels = async (): Promise<GithubLabel[]> => {

    await sleep(1500); // Simulamos un tiempo de carga

    const { data } = await githubApi.get<GithubLabel[]>('/labels');

    return data;
};
