import { GetProblemApiArg, GetProblemApiResponse } from './api-query';
import { fetcher } from './fetcher';

class ServerService {
  getProblemByProblemId(params: GetProblemApiArg) {
    return fetcher<GetProblemApiArg, GetProblemApiResponse>({
      endpoint: `/api/problems/${params.problemId}`,
      options: { next: { tags: [`post-${params.problemId}`] } },
    });
  }
}

export const API = new ServerService();
