import { emptySplitApi as api } from '../config/emptyApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getData: build.query<GetDataApiResponse, GetDataApiArg>({
      query: () => ({ url: `/api` }),
    }),
    googleAuth: build.query<GoogleAuthApiResponse, GoogleAuthApiArg>({
      query: () => ({ url: `/api/auth/google` }),
    }),
    googleAuthRedirect: build.query<
      GoogleAuthRedirectApiResponse,
      GoogleAuthRedirectApiArg
    >({
      query: () => ({ url: `/api/auth/google/callback` }),
    }),
    initiateSignIn: build.mutation<InitiateSignInApiResponse, InitiateSignInApiArg>({
      query: (queryArg) => ({
        url: `/api/auth/initiate-sign-in`,
        method: 'POST',
        body: queryArg.initiateSignInDto,
      }),
    }),
    signInWithOtp: build.mutation<SignInWithOtpApiResponse, SignInWithOtpApiArg>({
      query: (queryArg) => ({
        url: `/api/auth/sign-in-with-otp`,
        method: 'POST',
        body: queryArg.signInWithOtpDto,
      }),
    }),
    signInWithToken: build.mutation<SignInWithTokenApiResponse, SignInWithTokenApiArg>({
      query: (queryArg) => ({
        url: `/api/auth/sign-in-with-token`,
        method: 'POST',
        body: queryArg.verifyTokenDto,
      }),
    }),
    refreshSession: build.query<RefreshSessionApiResponse, RefreshSessionApiArg>({
      query: () => ({ url: `/api/auth/refresh` }),
    }),
    logout: build.mutation<LogoutApiResponse, LogoutApiArg>({
      query: () => ({ url: `/api/auth/logout`, method: 'POST' }),
    }),
    whoAmI: build.query<WhoAmIApiResponse, WhoAmIApiArg>({
      query: () => ({ url: `/api/users/whoami` }),
    }),
    onboard: build.mutation<OnboardApiResponse, OnboardApiArg>({
      query: (queryArg) => ({
        url: `/api/users/onboard`,
        method: 'PUT',
        body: queryArg.onboardUserDto,
      }),
    }),
    editProfile: build.mutation<EditProfileApiResponse, EditProfileApiArg>({
      query: (queryArg) => ({
        url: `/api/users/profile/edit`,
        method: 'PUT',
        body: queryArg.editProfileDto,
      }),
    }),
    getAllUsers: build.query<GetAllUsersApiResponse, GetAllUsersApiArg>({
      query: (queryArg) => ({
        url: `/api/users/admin/users`,
        params: { pageIndex: queryArg.pageIndex, pageSize: queryArg.pageSize },
      }),
    }),
    changeUserRole: build.mutation<ChangeUserRoleApiResponse, ChangeUserRoleApiArg>({
      query: (queryArg) => ({
        url: `/api/users/admin/${queryArg.userId}/change-role`,
        method: 'PUT',
        body: queryArg.changeUserRoleDto,
      }),
    }),
    createProblem: build.mutation<CreateProblemApiResponse, CreateProblemApiArg>({
      query: (queryArg) => ({
        url: `/api/problems`,
        method: 'POST',
        body: queryArg.createProblemDto,
      }),
    }),
    getProblems: build.query<GetProblemsApiResponse, GetProblemsApiArg>({
      query: (queryArg) => ({
        url: `/api/problems`,
        params: {
          pageIndex: queryArg.pageIndex,
          pageSize: queryArg.pageSize,
          order: queryArg.order,
          title: queryArg.title,
          authorId: queryArg.authorId,
          difficulty: queryArg.difficulty,
          status: queryArg.status,
          tagIds: queryArg.tagIds,
        },
      }),
    }),
    getProblemsForAdmin: build.query<
      GetProblemsForAdminApiResponse,
      GetProblemsForAdminApiArg
    >({
      query: (queryArg) => ({
        url: `/api/problems/admin`,
        params: {
          pageIndex: queryArg.pageIndex,
          pageSize: queryArg.pageSize,
          order: queryArg.order,
          title: queryArg.title,
          authorId: queryArg.authorId,
          difficulty: queryArg.difficulty,
          status: queryArg.status,
          tagIds: queryArg.tagIds,
        },
      }),
    }),
    getProblem: build.query<GetProblemApiResponse, GetProblemApiArg>({
      query: (queryArg) => ({ url: `/api/problems/${queryArg.problemId}` }),
    }),
    updateProblem: build.mutation<UpdateProblemApiResponse, UpdateProblemApiArg>({
      query: (queryArg) => ({
        url: `/api/problems/${queryArg.problemId}`,
        method: 'PUT',
        body: queryArg.updateProblemDto,
      }),
    }),
    getProblemForAdmin: build.query<
      GetProblemForAdminApiResponse,
      GetProblemForAdminApiArg
    >({
      query: (queryArg) => ({ url: `/api/problems/admin/${queryArg.problemId}` }),
    }),
    changeProblemStatus: build.mutation<
      ChangeProblemStatusApiResponse,
      ChangeProblemStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/api/problems/${queryArg.problemId}/change-status`,
        method: 'PUT',
        body: queryArg.changeProblemStatusDto,
      }),
    }),
    addTestCasesToProblem: build.mutation<
      AddTestCasesToProblemApiResponse,
      AddTestCasesToProblemApiArg
    >({
      query: (queryArg) => ({
        url: `/api/problems/admin/add-testcases`,
        method: 'POST',
        body: queryArg.addTestCasesDto,
      }),
    }),
    createTag: build.mutation<CreateTagApiResponse, CreateTagApiArg>({
      query: (queryArg) => ({
        url: `/api/tags`,
        method: 'POST',
        body: queryArg.createTagDto,
      }),
    }),
    getAllTags: build.query<GetAllTagsApiResponse, GetAllTagsApiArg>({
      query: () => ({ url: `/api/tags` }),
    }),
    getTag: build.query<GetTagApiResponse, GetTagApiArg>({
      query: (queryArg) => ({ url: `/api/tags/${queryArg.tagId}` }),
    }),
    updateTag: build.mutation<UpdateTagApiResponse, UpdateTagApiArg>({
      query: (queryArg) => ({
        url: `/api/tags/${queryArg.tagId}`,
        method: 'PUT',
        body: queryArg.createTagDto,
      }),
    }),
    createSubmission: build.mutation<CreateSubmissionApiResponse, CreateSubmissionApiArg>(
      {
        query: (queryArg) => ({
          url: `/api/submissions`,
          method: 'POST',
          body: queryArg.createSubmissionDto,
        }),
      }
    ),
    getSubmissionsByUserAndProblem: build.query<
      GetSubmissionsByUserAndProblemApiResponse,
      GetSubmissionsByUserAndProblemApiArg
    >({
      query: (queryArg) => ({ url: `/api/submissions/user/${queryArg.problemId}` }),
    }),
    getSubmissionById: build.query<GetSubmissionByIdApiResponse, GetSubmissionByIdApiArg>(
      {
        query: (queryArg) => ({ url: `/api/submissions/${queryArg.submissionId}` }),
      }
    ),
    handleCallback: build.mutation<HandleCallbackApiResponse, HandleCallbackApiArg>({
      query: () => ({ url: `/api/execution/callback`, method: 'POST' }),
    }),
    createSolution: build.mutation<CreateSolutionApiResponse, CreateSolutionApiArg>({
      query: (queryArg) => ({
        url: `/api/solutions`,
        method: 'POST',
        body: queryArg.createSolutionDto,
      }),
    }),
    getAllSolutions: build.query<GetAllSolutionsApiResponse, GetAllSolutionsApiArg>({
      query: (queryArg) => ({
        url: `/api/solutions`,
        params: {
          pageIndex: queryArg.pageIndex,
          pageSize: queryArg.pageSize,
          order: queryArg.order,
          problemId: queryArg.problemId,
          language: queryArg.language,
        },
      }),
    }),
    getSolutionById: build.query<GetSolutionByIdApiResponse, GetSolutionByIdApiArg>({
      query: (queryArg) => ({ url: `/api/solutions/${queryArg.solutionId}` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as apiQuery };
export type GetDataApiResponse = unknown;
export type GetDataApiArg = void;
export type GoogleAuthApiResponse = unknown;
export type GoogleAuthApiArg = void;
export type GoogleAuthRedirectApiResponse = unknown;
export type GoogleAuthRedirectApiArg = void;
export type InitiateSignInApiResponse = /** status 200  */ SuccessMessageDto;
export type InitiateSignInApiArg = {
  initiateSignInDto: InitiateSignInDto;
};
export type SignInWithOtpApiResponse = /** status 200  */ SignedInUserResponseDto;
export type SignInWithOtpApiArg = {
  signInWithOtpDto: SignInWithOtpDto;
};
export type SignInWithTokenApiResponse = /** status 200  */ SignedInUserResponseDto;
export type SignInWithTokenApiArg = {
  verifyTokenDto: VerifyTokenDto;
};
export type RefreshSessionApiResponse = /** status 200  */ RefreshedSessionDto;
export type RefreshSessionApiArg = void;
export type LogoutApiResponse = unknown;
export type LogoutApiArg = void;
export type WhoAmIApiResponse = /** status 200  */ User;
export type WhoAmIApiArg = void;
export type OnboardApiResponse = /** status 200  */ User;
export type OnboardApiArg = {
  onboardUserDto: OnboardUserDto;
};
export type EditProfileApiResponse = /** status 200  */ User;
export type EditProfileApiArg = {
  editProfileDto: EditProfileDto;
};
export type GetAllUsersApiResponse = /** status 200  */ AllUsersDto;
export type GetAllUsersApiArg = {
  pageIndex: number;
  pageSize: number;
};
export type ChangeUserRoleApiResponse = /** status 200  */ User;
export type ChangeUserRoleApiArg = {
  userId: number;
  changeUserRoleDto: ChangeUserRoleDto;
};
export type CreateProblemApiResponse = /** status 200  */ Problem;
export type CreateProblemApiArg = {
  createProblemDto: CreateProblemDto;
};
export type GetProblemsApiResponse = /** status 200  */ AllProblemsDto;
export type GetProblemsApiArg = {
  pageIndex: number;
  pageSize: number;
  order?: SortOrder;
  title?: string;
  authorId?: string;
  difficulty?: ProblemDifficulty;
  status?: PostStatus;
  tagIds?: number[];
};
export type GetProblemsForAdminApiResponse = /** status 200  */ AllProblemsDto;
export type GetProblemsForAdminApiArg = {
  pageIndex: number;
  pageSize: number;
  order?: SortOrder;
  title?: string;
  authorId?: string;
  difficulty?: ProblemDifficulty;
  status?: PostStatus;
  tagIds?: number[];
};
export type GetProblemApiResponse = /** status 200  */ ProblemDto;
export type GetProblemApiArg = {
  problemId: number;
};
export type UpdateProblemApiResponse = /** status 200  */ Problem;
export type UpdateProblemApiArg = {
  problemId: number;
  updateProblemDto: UpdateProblemDto;
};
export type GetProblemForAdminApiResponse = /** status 200  */ AdminProblemDto;
export type GetProblemForAdminApiArg = {
  problemId: number;
};
export type ChangeProblemStatusApiResponse = /** status 200  */ Problem;
export type ChangeProblemStatusApiArg = {
  problemId: number;
  changeProblemStatusDto: ChangeProblemStatusDto;
};
export type AddTestCasesToProblemApiResponse = /** status 200  */ SuccessMessageDto;
export type AddTestCasesToProblemApiArg = {
  addTestCasesDto: AddTestCasesDto;
};
export type CreateTagApiResponse = /** status 200  */ Tag;
export type CreateTagApiArg = {
  createTagDto: CreateTagDto;
};
export type GetAllTagsApiResponse = /** status 200  */ Tag[];
export type GetAllTagsApiArg = void;
export type GetTagApiResponse = /** status 200  */ Tag;
export type GetTagApiArg = {
  tagId: number;
};
export type UpdateTagApiResponse = /** status 200  */ Tag;
export type UpdateTagApiArg = {
  tagId: number;
  createTagDto: CreateTagDto;
};
export type CreateSubmissionApiResponse = /** status 200  */ Submission;
export type CreateSubmissionApiArg = {
  createSubmissionDto: CreateSubmissionDto;
};
export type GetSubmissionsByUserAndProblemApiResponse = /** status 200  */ Submission[];
export type GetSubmissionsByUserAndProblemApiArg = {
  problemId: number;
};
export type GetSubmissionByIdApiResponse = /** status 200  */ SubmissionDto;
export type GetSubmissionByIdApiArg = {
  submissionId: number;
};
export type HandleCallbackApiResponse = unknown;
export type HandleCallbackApiArg = void;
export type CreateSolutionApiResponse = /** status 200  */ SolutionDto;
export type CreateSolutionApiArg = {
  createSolutionDto: CreateSolutionDto;
};
export type GetAllSolutionsApiResponse = /** status 200  */ string;
export type GetAllSolutionsApiArg = {
  pageIndex: number;
  pageSize: number;
  order?: SortOrder;
  problemId: number;
  language: SupportedLanguages;
};
export type GetSolutionByIdApiResponse = /** status 200  */ SolutionDto;
export type GetSolutionByIdApiArg = {
  solutionId: number;
};
export type SuccessMessageDto = {
  message: string;
};
export type InitiateSignInDto = {
  email: string;
};
export type UserRole = 'user' | 'problem_admin' | 'super_admin';
export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  hasOnboarded: boolean;
  role: UserRole;
};
export type SignedInUserResponseDto = {
  accessToken: string;
  user: User;
};
export type SignInWithOtpDto = {
  email: string;
  otp: string;
};
export type VerifyTokenDto = {
  verificationToken: string;
};
export type RefreshedSessionDto = {
  accessToken: string;
};
export type OnboardUserDto = {
  firstName: string;
  lastName: string;
};
export type EditProfileDto = {
  firstName: string;
  lastName: string;
};
export type PaginationResultDto = {
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  itemsOnPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
};
export type AllUsersDto = {
  users: User[];
  paginationMeta: PaginationResultDto;
};
export type ChangeUserRoleDto = {
  role: UserRole;
};
export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard';
export type ProblemStatus = 'unpublished' | 'approved' | 'rejected';
export type Tag = {
  id: number;
  name: string;
};
export type Problem = {
  id: number;
  title: string;
  difficulty: ProblemDifficulty;
  status: ProblemStatus;
  hasTestCases: boolean;
  tags: Tag[];
  author: User;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
export type CreateProblemDto = {
  title: string;
  difficulty: ProblemDifficulty;
  description: string;
  tagIds?: number[];
};
export type AllProblemsDto = {
  problems: Problem[];
  paginationMeta: PaginationResultDto;
};
export type SortOrder = 'ASC' | 'DESC';
export type PostStatus = 'unpublished' | 'approved' | 'rejected';
export type ProblemDto = {
  id: number;
  title: string;
  difficulty: ProblemDifficulty;
  status: ProblemStatus;
  hasTestCases: boolean;
  tags: Tag[];
  author: User;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  description: string;
};
export type UpdateProblemDto = {
  title?: string;
  difficulty?: ProblemDifficulty;
  description?: string;
  tagIds?: number[];
};
export type AdminProblemDto = {
  id: number;
  title: string;
  difficulty: ProblemDifficulty;
  status: ProblemStatus;
  hasTestCases: boolean;
  tags: Tag[];
  author: User;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  description: string;
  testCasesInput: string;
  testCasesOutput: string;
};
export type ChangeProblemStatusDto = {
  status: ProblemStatus;
};
export type AddTestCasesDto = {
  problemId: number;
  input: string;
  output: string;
};
export type CreateTagDto = {
  tagName: string;
};
export type Submission = {
  id: number;
  language: 'c' | 'cpp' | 'java' | 'js' | 'go';
  state: 'Pending' | ' Started' | 'Running' | 'Success' | 'Error';
  statusMessage:
    | 'Null'
    | 'Accepted'
    | 'Wrong Answer'
    | 'Rejected'
    | 'Compile error'
    | 'Execution error'
    | 'Runtime error'
    | 'Time limit exceeded'
    | 'Memory limit exceeded'
    | 'Unexpected error';
  totalTestCases: number;
  testCasesPassed: number;
  time: number;
  memory: number;
  finished: boolean;
  problem: Problem;
  user: User;
  createdAt: string;
};
export type SupportedLanguages = 'c' | 'cpp' | 'java' | 'js' | 'go';
export type CreateSubmissionDto = {
  problemId: number;
  code: string;
  language: SupportedLanguages;
};
export type SubmissionDto = {
  id: number;
  language: 'c' | 'cpp' | 'java' | 'js' | 'go';
  state: 'Pending' | ' Started' | 'Running' | 'Success' | 'Error';
  statusMessage:
    | 'Null'
    | 'Accepted'
    | 'Wrong Answer'
    | 'Rejected'
    | 'Compile error'
    | 'Execution error'
    | 'Runtime error'
    | 'Time limit exceeded'
    | 'Memory limit exceeded'
    | 'Unexpected error';
  totalTestCases: number;
  testCasesPassed: number;
  time: number;
  memory: number;
  finished: boolean;
  problem: Problem;
  user: User;
  createdAt: string;
  code: string;
  stderr: string;
};
export type SolutionDto = {
  id: number;
  language: 'c' | 'cpp' | 'java' | 'js' | 'go';
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  description: string;
};
export type Languages = 'c' | 'cpp' | 'java' | 'js' | 'go';
export type CreateSolutionDto = {
  problemId: number;
  description: string;
  language: Languages;
};
export const {
  useGetDataQuery,
  useGoogleAuthQuery,
  useGoogleAuthRedirectQuery,
  useInitiateSignInMutation,
  useSignInWithOtpMutation,
  useSignInWithTokenMutation,
  useRefreshSessionQuery,
  useLogoutMutation,
  useWhoAmIQuery,
  useOnboardMutation,
  useEditProfileMutation,
  useGetAllUsersQuery,
  useChangeUserRoleMutation,
  useCreateProblemMutation,
  useGetProblemsQuery,
  useGetProblemsForAdminQuery,
  useGetProblemQuery,
  useUpdateProblemMutation,
  useGetProblemForAdminQuery,
  useChangeProblemStatusMutation,
  useAddTestCasesToProblemMutation,
  useCreateTagMutation,
  useGetAllTagsQuery,
  useGetTagQuery,
  useUpdateTagMutation,
  useCreateSubmissionMutation,
  useGetSubmissionsByUserAndProblemQuery,
  useGetSubmissionByIdQuery,
  useHandleCallbackMutation,
  useCreateSolutionMutation,
  useGetAllSolutionsQuery,
  useGetSolutionByIdQuery,
} = injectedRtkApi;
