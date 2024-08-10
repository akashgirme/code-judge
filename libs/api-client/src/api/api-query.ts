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
          topicIds: queryArg.topicIds,
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
          topicIds: queryArg.topicIds,
        },
      }),
    }),
    getProblemById: build.query<GetProblemByIdApiResponse, GetProblemByIdApiArg>({
      query: (queryArg) => ({ url: `/api/problems/${queryArg.problemId}` }),
    }),
    updateProblem: build.mutation<UpdateProblemApiResponse, UpdateProblemApiArg>({
      query: (queryArg) => ({
        url: `/api/problems/${queryArg.problemId}`,
        method: 'PUT',
        body: queryArg.updateProblemDto,
      }),
    }),
    createTopic: build.mutation<CreateTopicApiResponse, CreateTopicApiArg>({
      query: (queryArg) => ({
        url: `/api/topics`,
        method: 'POST',
        body: queryArg.createTopicDto,
      }),
    }),
    getAllTopics: build.query<GetAllTopicsApiResponse, GetAllTopicsApiArg>({
      query: () => ({ url: `/api/topics` }),
    }),
    getTopic: build.query<GetTopicApiResponse, GetTopicApiArg>({
      query: (queryArg) => ({ url: `/api/topics/${queryArg.topicId}` }),
    }),
    updateTopic: build.mutation<UpdateTopicApiResponse, UpdateTopicApiArg>({
      query: (queryArg) => ({
        url: `/api/topics/${queryArg.topicId}`,
        method: 'PUT',
        body: queryArg.createTopicDto,
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
    rejudgeSubmission: build.mutation<
      RejudgeSubmissionApiResponse,
      RejudgeSubmissionApiArg
    >({
      query: (queryArg) => ({
        url: `/api/submissions/rejudge/${queryArg.submissionId}`,
        method: 'POST',
      }),
    }),
    handleExecutionCallback: build.mutation<
      HandleExecutionCallbackApiResponse,
      HandleExecutionCallbackApiArg
    >({
      query: (queryArg) => ({
        url: `/api/submissions/callback`,
        method: 'POST',
        body: queryArg.updateSubmissionDto,
      }),
    }),
    getSubmissions: build.query<GetSubmissionsApiResponse, GetSubmissionsApiArg>({
      query: (queryArg) => ({ url: `/api/submissions/problem/${queryArg.problemId}` }),
    }),
    getSubmissionById: build.query<GetSubmissionByIdApiResponse, GetSubmissionByIdApiArg>(
      {
        query: (queryArg) => ({ url: `/api/submissions/${queryArg.submissionId}` }),
      }
    ),
    getSolution: build.query<GetSolutionApiResponse, GetSolutionApiArg>({
      query: (queryArg) => ({
        url: `/api/solutions`,
        params: { problemId: queryArg.problemId, language: queryArg.language },
      }),
    }),
    addSolution: build.mutation<AddSolutionApiResponse, AddSolutionApiArg>({
      query: (queryArg) => ({
        url: `/api/solutions`,
        method: 'POST',
        body: queryArg.addSolutionDto,
      }),
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
  userId: string;
  changeUserRoleDto: ChangeUserRoleDto;
};
export type CreateProblemApiResponse = /** status 200  */ Problem;
export type CreateProblemApiArg = {
  createProblemDto: CreateProblemDto;
};
export type GetProblemsApiResponse = /** status 200  */ ProblemsResponseDto;
export type GetProblemsApiArg = {
  pageIndex: number;
  pageSize: number;
  order?: SortOrder;
  title?: string;
  authorId?: string;
  difficulty?: ProblemDifficulty;
  status?: PostStatus;
  topicIds?: string[];
};
export type GetProblemsForAdminApiResponse = /** status 200  */ ProblemsResponseDto;
export type GetProblemsForAdminApiArg = {
  pageIndex: number;
  pageSize: number;
  order?: SortOrder;
  title?: string;
  authorId?: string;
  difficulty?: ProblemDifficulty;
  status?: PostStatus;
  topicIds?: string[];
};
export type GetProblemByIdApiResponse = /** status 200  */ ProblemResponseDto;
export type GetProblemByIdApiArg = {
  problemId: string;
};
export type UpdateProblemApiResponse = /** status 200  */ Problem;
export type UpdateProblemApiArg = {
  problemId: string;
  updateProblemDto: UpdateProblemDto;
};
export type CreateTopicApiResponse = /** status 200  */ Topic;
export type CreateTopicApiArg = {
  createTopicDto: CreateTopicDto;
};
export type GetAllTopicsApiResponse = /** status 200  */ Topic[];
export type GetAllTopicsApiArg = void;
export type GetTopicApiResponse = /** status 200  */ Topic;
export type GetTopicApiArg = {
  topicId: string;
};
export type UpdateTopicApiResponse = /** status 200  */ Topic;
export type UpdateTopicApiArg = {
  topicId: string;
  createTopicDto: CreateTopicDto;
};
export type CreateSubmissionApiResponse = /** status 200  */ Submission;
export type CreateSubmissionApiArg = {
  createSubmissionDto: CreateSubmissionDto;
};
export type RejudgeSubmissionApiResponse = unknown;
export type RejudgeSubmissionApiArg = {
  submissionId: string;
};
export type HandleExecutionCallbackApiResponse = unknown;
export type HandleExecutionCallbackApiArg = {
  updateSubmissionDto: UpdateSubmissionDto;
};
export type GetSubmissionsApiResponse = /** status 200  */ Submission[];
export type GetSubmissionsApiArg = {
  problemId: string;
};
export type GetSubmissionByIdApiResponse = /** status 200  */ SubmissionResponseDto;
export type GetSubmissionByIdApiArg = {
  submissionId: string;
};
export type GetSolutionApiResponse = /** status 200  */ string;
export type GetSolutionApiArg = {
  problemId: string;
  language: object;
};
export type AddSolutionApiResponse = /** status 200  */ SuccessMessageDto;
export type AddSolutionApiArg = {
  addSolutionDto: AddSolutionDto;
};
export type SuccessMessageDto = {
  message: string;
};
export type InitiateSignInDto = {
  email: string;
};
export type UserRole = 'user' | 'problem_admin' | 'super_admin';
export type User = {
  id: string;
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
export type Topic = {
  id: string;
  name: string;
};
export type Problem = {
  id: string;
  title: string;
  difficulty: object;
  slug: string;
  author: User;
  topics: Topic[];
  status: object;
};
export type ProblemDifficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type SupportedLanguages = 'c' | 'cpp' | 'java' | 'js' | 'go';
export type CreateProblemDto = {
  title: string;
  difficulty: ProblemDifficulty;
  description: string;
  solution: string;
  solutionLanguage: SupportedLanguages;
  testCasesInput: string;
  testCasesOutput: string;
  internalNotes?: string;
  topicIds: string[];
};
export type ProblemsResponseDto = {
  problems: Problem[];
  paginationMeta: PaginationResultDto;
};
export type SortOrder = 'ASC' | 'DESC';
export type PostStatus = 'unpublished' | 'approved' | 'rejected' | 'deleted';
export type ProblemResponseDto = {
  id: string;
  title: string;
  difficulty: object;
  slug: string;
  author: User;
  topics: Topic[];
  status: object;
  description: string;
};
export type ProblemStatus = 'unpublished' | 'approved' | 'rejected' | 'deleted';
export type UpdateProblemDto = {
  title?: string;
  difficulty?: ProblemDifficulty;
  description?: string;
  solution?: string;
  solutionLanguage?: SupportedLanguages;
  testCasesInput?: string;
  testCasesOutput?: string;
  internalNotes?: string;
  topicIds?: string[];
  status?: ProblemStatus;
};
export type CreateTopicDto = {
  topicName: string;
};
export type Submission = {
  id: string;
  slug: string;
  language: object;
  testCasesPassed: number;
  totalTestCases: number;
  problem: object;
  user: object;
  createdAt: string;
};
export type CreateSubmissionDto = {
  problemId: string;
  code: string;
  language: SupportedLanguages;
};
export type UpdateSubmissionDto = {};
export type SubmissionResponseDto = {
  id: string;
  slug: string;
  language: object;
  testCasesPassed: number;
  totalTestCases: number;
  problem: object;
  user: object;
  createdAt: string;
  code: string;
};
export type AddSolutionDto = {
  problemId: string;
  code: string;
  language: object;
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
  useGetProblemByIdQuery,
  useUpdateProblemMutation,
  useCreateTopicMutation,
  useGetAllTopicsQuery,
  useGetTopicQuery,
  useUpdateTopicMutation,
  useCreateSubmissionMutation,
  useRejudgeSubmissionMutation,
  useHandleExecutionCallbackMutation,
  useGetSubmissionsQuery,
  useGetSubmissionByIdQuery,
  useGetSolutionQuery,
  useAddSolutionMutation,
} = injectedRtkApi;
