import { emptySplitApi as api } from '../config/emptyApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getData: build.query<GetDataApiResponse, GetDataApiArg>({
      query: () => ({ url: `/api` }),
    }),
    createSubmission: build.mutation<CreateSubmissionApiResponse, CreateSubmissionApiArg>(
      {
        query: (queryArg) => ({
          url: `/api/submissions/submit`,
          method: 'POST',
          body: queryArg.createSubmissionDto,
        }),
      }
    ),
    createRun: build.mutation<CreateRunApiResponse, CreateRunApiArg>({
      query: (queryArg) => ({
        url: `/api/submissions/run`,
        method: 'POST',
        body: queryArg.createSubmissionDto,
      }),
    }),
    getRunStatus: build.query<GetRunStatusApiResponse, GetRunStatusApiArg>({
      query: (queryArg) => ({
        url: `/api/submissions/status/run`,
        params: { id: queryArg.id },
      }),
    }),
    getSubmitStatus: build.query<GetSubmitStatusApiResponse, GetSubmitStatusApiArg>({
      query: (queryArg) => ({
        url: `/api/submissions/status/submit`,
        params: { id: queryArg.id },
      }),
    }),
    getSubmissions: build.query<GetSubmissionsApiResponse, GetSubmissionsApiArg>({
      query: (queryArg) => ({ url: `/api/submissions` }),
    }),
    getSubmissionById: build.query<GetSubmissionByIdApiResponse, GetSubmissionByIdApiArg>(
      {
        query: (queryArg) => ({ url: `/api/submissions/${queryArg.submissionId}` }),
      }
    ),
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
    updateProblem: build.mutation<UpdateProblemApiResponse, UpdateProblemApiArg>({
      query: (queryArg) => ({
        url: `/api/problems/${queryArg.problemId}`,
        method: 'PUT',
        body: queryArg.updateProblemDto,
      }),
    }),
    getProblem: build.query<GetProblemApiResponse, GetProblemApiArg>({
      query: (queryArg) => ({ url: `/api/problems/${queryArg.problemId}` }),
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
    getProblemForAdmin: build.query<
      GetProblemForAdminApiResponse,
      GetProblemForAdminApiArg
    >({
      query: (queryArg) => ({ url: `/api/problems/admin/${queryArg.problemId}` }),
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
    googleAuth: build.query<GoogleAuthApiResponse, GoogleAuthApiArg>({
      query: () => ({ url: `/api/auth/google` }),
    }),
    googleAuthRedirect: build.query<
      GoogleAuthRedirectApiResponse,
      GoogleAuthRedirectApiArg
    >({
      query: () => ({ url: `/api/auth/google/callback` }),
    }),
    signUp: build.mutation<SignUpApiResponse, SignUpApiArg>({
      query: (queryArg) => ({
        url: `/api/auth/sign-up`,
        method: 'POST',
        body: queryArg.signUpUserDto,
      }),
    }),
    resendVerificationEmail: build.mutation<
      ResendVerificationEmailApiResponse,
      ResendVerificationEmailApiArg
    >({
      query: (queryArg) => ({
        url: `/api/auth/resend-verification-email`,
        method: 'POST',
        body: queryArg.resendVerificationEmailDto,
      }),
    }),
    verifyEmail: build.mutation<VerifyEmailApiResponse, VerifyEmailApiArg>({
      query: (queryArg) => ({
        url: `/api/auth/verify-email`,
        method: 'POST',
        body: queryArg.verifyEmailDto,
      }),
    }),
    signIn: build.mutation<SignInApiResponse, SignInApiArg>({
      query: (queryArg) => ({
        url: `/api/auth/sign-in`,
        method: 'POST',
        body: queryArg.signInUserDto,
      }),
    }),
    requestSignInOtp: build.mutation<RequestSignInOtpApiResponse, RequestSignInOtpApiArg>(
      {
        query: (queryArg) => ({
          url: `/api/auth/request-sign-in-otp`,
          method: 'POST',
          body: queryArg.requestSignInWithOtpDto,
        }),
      }
    ),
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
    forgotPassword: build.mutation<ForgotPasswordApiResponse, ForgotPasswordApiArg>({
      query: (queryArg) => ({
        url: `/api/auth/forgot-password`,
        method: 'POST',
        body: queryArg.forgotPasswordDto,
      }),
    }),
    resetPassword: build.mutation<ResetPasswordApiResponse, ResetPasswordApiArg>({
      query: (queryArg) => ({
        url: `/api/auth/reset-password`,
        method: 'POST',
        body: queryArg.resetPasswordDto,
      }),
    }),
    refreshSession: build.query<RefreshSessionApiResponse, RefreshSessionApiArg>({
      query: () => ({ url: `/api/auth/refresh` }),
    }),
    logout: build.mutation<LogoutApiResponse, LogoutApiArg>({
      query: () => ({ url: `/api/auth/logout`, method: 'POST' }),
    }),
    checkUsernameAvailability: build.mutation<
      CheckUsernameAvailabilityApiResponse,
      CheckUsernameAvailabilityApiArg
    >({
      query: (queryArg) => ({
        url: `/api/auth/check-username`,
        method: 'POST',
        body: queryArg.checkUsernameDto,
      }),
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
export type CreateSubmissionApiResponse = /** status 201  */ CreateSubmissionResponseDto;
export type CreateSubmissionApiArg = {
  createSubmissionDto: CreateSubmissionDto;
};
export type CreateRunApiResponse = /** status 201  */ CreateSubmissionResponseDto;
export type CreateRunApiArg = {
  createSubmissionDto: CreateSubmissionDto;
};
export type GetRunStatusApiResponse = /** status 200  */ RunStatusResponseDto;
export type GetRunStatusApiArg = {
  id: string;
};
export type GetSubmitStatusApiResponse = /** status 200  */ SubmitStatusResponseDto;
export type GetSubmitStatusApiArg = {
  id: string;
};
export type GetSubmissionsApiResponse = /** status 200  */ SubmissionResponse[];
export type GetSubmissionsApiArg = {
  problemId: number;
};
export type GetSubmissionByIdApiResponse = /** status 200  */ SubmissionResponse;
export type GetSubmissionByIdApiArg = {
  submissionId: number;
};
export type CreateProblemApiResponse = /** status 201  */ AdminProblemDto;
export type CreateProblemApiArg = {
  createProblemDto: CreateProblemDto;
};
export type GetProblemsApiResponse = /** status 200  */ AllProblemsDto;
export type GetProblemsApiArg = {
  pageIndex: number;
  pageSize: number;
  order?: SortOrder;
  title?: string;
  authorId?: number;
  difficulty?: ProblemDifficulty;
  status?: ProblemStatus;
  tagIds?: number[];
};
export type UpdateProblemApiResponse = /** status 200  */ AdminProblemDto;
export type UpdateProblemApiArg = {
  problemId: number;
  updateProblemDto: UpdateProblemDto;
};
export type GetProblemApiResponse = /** status 200  */ ProblemDto;
export type GetProblemApiArg = {
  problemId: number;
};
export type GetProblemsForAdminApiResponse = /** status 200  */ AllProblemsDto;
export type GetProblemsForAdminApiArg = {
  pageIndex: number;
  pageSize: number;
  order?: SortOrder;
  title?: string;
  authorId?: number;
  difficulty?: ProblemDifficulty;
  status?: ProblemStatus;
  tagIds?: number[];
};
export type GetProblemForAdminApiResponse = /** status 200  */ AdminProblemDto;
export type GetProblemForAdminApiArg = {
  problemId: number;
};
export type CreateTagApiResponse = /** status 201  */ Tag;
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
export type GoogleAuthApiResponse = unknown;
export type GoogleAuthApiArg = void;
export type GoogleAuthRedirectApiResponse = unknown;
export type GoogleAuthRedirectApiArg = void;
export type SignUpApiResponse = /** status 200  */ VerificationEmailSentDto;
export type SignUpApiArg = {
  signUpUserDto: SignUpUserDto;
};
export type ResendVerificationEmailApiResponse =
  /** status 200  */ VerificationEmailSentDto;
export type ResendVerificationEmailApiArg = {
  resendVerificationEmailDto: ResendVerificationEmailDto;
};
export type VerifyEmailApiResponse = /** status 200  */ SignedInUserResponseDto;
export type VerifyEmailApiArg = {
  verifyEmailDto: VerifyEmailDto;
};
export type SignInApiResponse = /** status 200  */ SignedInUserResponseDto;
export type SignInApiArg = {
  signInUserDto: SignInUserDto;
};
export type RequestSignInOtpApiResponse = /** status 200  */ SuccessMessageDto;
export type RequestSignInOtpApiArg = {
  requestSignInWithOtpDto: RequestSignInWithOtpDto;
};
export type SignInWithOtpApiResponse = /** status 200  */ SignedInUserResponseDto;
export type SignInWithOtpApiArg = {
  signInWithOtpDto: SignInWithOtpDto;
};
export type SignInWithTokenApiResponse = /** status 200  */ SignedInUserResponseDto;
export type SignInWithTokenApiArg = {
  verifyTokenDto: VerifyTokenDto;
};
export type ForgotPasswordApiResponse = /** status 200  */ SuccessMessageDto;
export type ForgotPasswordApiArg = {
  forgotPasswordDto: ForgotPasswordDto;
};
export type ResetPasswordApiResponse = /** status 200  */ string;
export type ResetPasswordApiArg = {
  resetPasswordDto: ResetPasswordDto;
};
export type RefreshSessionApiResponse = /** status 200  */ RefreshedSessionDto;
export type RefreshSessionApiArg = void;
export type LogoutApiResponse = /** status 200  */ SuccessMessageDto;
export type LogoutApiArg = void;
export type CheckUsernameAvailabilityApiResponse = /** status 200  */ boolean;
export type CheckUsernameAvailabilityApiArg = {
  checkUsernameDto: CheckUsernameDto;
};
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
export type CreateSolutionApiResponse = /** status 200  */ SolutionDto;
export type CreateSolutionApiArg = {
  createSolutionDto: CreateSolutionDto;
};
export type GetAllSolutionsApiResponse = /** status 200  */ AllSolutionsDto;
export type GetAllSolutionsApiArg = {
  pageIndex: number;
  pageSize: number;
  order?: SortOrder;
  problemId: number;
  language: Languages;
};
export type GetSolutionByIdApiResponse = /** status 200  */ SolutionDto;
export type GetSolutionByIdApiArg = {
  solutionId: number;
};
export type CreateSubmissionResponseDto = {
  id: string;
};
export type Languages = 'c' | 'cpp' | 'java' | 'js' | 'go';
export type CreateSubmissionDto = {
  problemId: number;
  sourceCode: string;
  language: Languages;
};
export type Language = 'c' | 'cpp' | 'java' | 'js' | 'go';
export type SubmissionState = 'Pending' | 'Started' | 'Running' | 'Success' | 'Error';
export type ResultDto = {
  input: string;
  output: string;
  expectedOutput: string;
};
export type RunStatusResponseDto = {
  sourceCode: string;
  language: Language;
  state: SubmissionState;
  error: string;
  result: ResultDto[];
  passed: number;
  total: number;
};
export type SubmissionStatus =
  | 'Accepted'
  | 'Wrong Answer'
  | 'Compile error'
  | 'Runtime error'
  | 'Time limit exceeded'
  | 'Memory limit exceeded'
  | 'Internal Server Error';
export type SubmitStatusResponseDto = {
  sourceCode: string;
  language: Language;
  state: SubmissionState;
  error: string;
  passed: number;
  total: number;
  status: SubmissionStatus;
  memory: number;
  time: number;
  createdAt: string;
};
export type SubmissionResponse = {
  id: number;
  language: Languages;
  status: SubmissionStatus;
  totalTestCases: number;
  testCasesPassed: number;
  time: number;
  memory: number;
  createdAt: string;
  sourceCode: string;
  error: string;
};
export type ProblemDifficulty = 'easy' | 'medium' | 'hard';
export type ProblemStatus = 'unpublished' | 'approved' | 'rejected';
export type Tag = {
  id: number;
  name: string;
};
export type UserRole = 'user' | 'problem_writer' | 'problem_moderator' | 'super_admin';
export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  hasOnboarded: boolean;
  role: UserRole;
};
export type TestCaseDto = {
  input: string;
  output: string;
};
export type AdminProblemDto = {
  id: number;
  title: string;
  difficulty: ProblemDifficulty;
  status: ProblemStatus;
  internalNotes: string;
  tags: Tag[];
  author: User;
  description: string;
  exampleTestCases: TestCaseDto[];
  actualTestCases: TestCaseDto[];
};
export type CreateProblemDto = {
  title: string;
  difficulty: ProblemDifficulty;
  description: string;
  internalNotes?: string;
  tagIds?: number[];
  status?: ProblemStatus;
  exampleTestCases: TestCaseDto[];
  actualTestCases: TestCaseDto[];
};
export type Problem = {
  id: number;
  title: string;
  difficulty: ProblemDifficulty;
  status: ProblemStatus;
  internalNotes: string;
  tags: Tag[];
  author: User;
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
export type AllProblemsDto = {
  problems: Problem[];
  paginationMeta: PaginationResultDto;
};
export type SortOrder = 'ASC' | 'DESC';
export type UpdateProblemDto = {
  title: string;
  difficulty: ProblemDifficulty;
  description: string;
  internalNotes?: string;
  tagIds?: number[];
  status?: ProblemStatus;
  exampleTestCases: TestCaseDto[];
  actualTestCases: TestCaseDto[];
};
export type TestCaseType = 'example' | 'actual';
export type TestCase = {
  id: number;
  type: TestCaseType;
  input: string;
  output: string;
};
export type ProblemDto = {
  id: number;
  title: string;
  difficulty: ProblemDifficulty;
  status: ProblemStatus;
  internalNotes: string;
  tags: Tag[];
  author: User;
  description: string;
  exampleTestCases: TestCase[];
};
export type CreateTagDto = {
  tagName: string;
};
export type VerificationEmailSentDto = {
  userId: number;
  email: string;
  message: string;
};
export type SignUpUserDto = {
  username: string;
  email: string;
  password: string;
};
export type ResendVerificationEmailDto = {
  userId: number;
  email: string;
};
export type SignedInUserResponseDto = {
  accessToken: string;
  user: User;
};
export type VerifyEmailDto = {
  userId: number;
  email: string;
  otp: string;
};
export type SignInUserDto = {
  email: string;
  password: string;
};
export type SuccessMessageDto = {
  message: string;
};
export type RequestSignInWithOtpDto = {
  email: string;
};
export type SignInWithOtpDto = {
  email: string;
  otp: string;
};
export type VerifyTokenDto = {
  verificationToken: string;
};
export type ForgotPasswordDto = {
  email: string;
};
export type ResetPasswordDto = {
  password: string;
  verificationToken: string;
};
export type RefreshedSessionDto = {
  accessToken: string;
};
export type CheckUsernameDto = {
  username: string;
};
export type OnboardUserDto = {
  firstName: string;
  lastName: string;
};
export type EditProfileDto = {
  firstName: string;
  lastName: string;
};
export type AllUsersDto = {
  users: User[];
  paginationMeta: PaginationResultDto;
};
export type ChangeUserRoleDto = {
  role: UserRole;
};
export type SolutionDto = {
  id: number;
  language: Languages;
  createdAt: string;
  description: string;
};
export type CreateSolutionDto = {
  problemId: number;
  description: string;
  language: Languages;
};
export type Solution = {
  id: number;
  language: Languages;
  createdAt: string;
};
export type AllSolutionsDto = {
  solutions: Solution[];
  paginationMeta: PaginationResultDto;
};
export const {
  useGetDataQuery,
  useCreateSubmissionMutation,
  useCreateRunMutation,
  useGetRunStatusQuery,
  useGetSubmitStatusQuery,
  useGetSubmissionsQuery,
  useGetSubmissionByIdQuery,
  useCreateProblemMutation,
  useGetProblemsQuery,
  useUpdateProblemMutation,
  useGetProblemQuery,
  useGetProblemsForAdminQuery,
  useGetProblemForAdminQuery,
  useCreateTagMutation,
  useGetAllTagsQuery,
  useGetTagQuery,
  useUpdateTagMutation,
  useGoogleAuthQuery,
  useGoogleAuthRedirectQuery,
  useSignUpMutation,
  useResendVerificationEmailMutation,
  useVerifyEmailMutation,
  useSignInMutation,
  useRequestSignInOtpMutation,
  useSignInWithOtpMutation,
  useSignInWithTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRefreshSessionQuery,
  useLogoutMutation,
  useCheckUsernameAvailabilityMutation,
  useWhoAmIQuery,
  useOnboardMutation,
  useEditProfileMutation,
  useGetAllUsersQuery,
  useChangeUserRoleMutation,
  useCreateSolutionMutation,
  useGetAllSolutionsQuery,
  useGetSolutionByIdQuery,
} = injectedRtkApi;
