/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddSolutionDto } from '../models/AddSolutionDto';
import type { AllUsersDto } from '../models/AllUsersDto';
import type { ChangeUserRoleDto } from '../models/ChangeUserRoleDto';
import type { CreateProblemDto } from '../models/CreateProblemDto';
import type { CreateSubmissionDto } from '../models/CreateSubmissionDto';
import type { CreateTopicDto } from '../models/CreateTopicDto';
import type { EditProfileDto } from '../models/EditProfileDto';
import type { OnboardUserDto } from '../models/OnboardUserDto';
import type { PostStatus } from '../models/PostStatus';
import type { Problem } from '../models/Problem';
import type { ProblemDifficulty } from '../models/ProblemDifficulty';
import type { ProblemResponseDto } from '../models/ProblemResponseDto';
import type { ProblemsResponseDto } from '../models/ProblemsResponseDto';
import type { SignedInUserResponseDto } from '../models/SignedInUserResponseDto';
import type { SignInDto } from '../models/SignInDto';
import type { SignInWithOtpDto } from '../models/SignInWithOtpDto';
import type { SortOrder } from '../models/SortOrder';
import type { Submission } from '../models/Submission';
import type { SubmissionResponseDto } from '../models/SubmissionResponseDto';
import type { SuccessMessageDto } from '../models/SuccessMessageDto';
import type { Topic } from '../models/Topic';
import type { UpdateProblemDto } from '../models/UpdateProblemDto';
import type { UpdateSubmissionDto } from '../models/UpdateSubmissionDto';
import type { User } from '../models/User';
import type { VerifyTokenDto } from '../models/VerifyTokenDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static getData(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static googleAuth(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/google',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static googleAuthRedirect(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/google/callback',
        });
    }
    /**
     * @param requestBody
     * @returns SuccessMessageDto
     * @throws ApiError
     */
    public static initiateSignIn(
        requestBody: SignInDto,
    ): CancelablePromise<SuccessMessageDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/initiate-sign-in',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns SignedInUserResponseDto
     * @throws ApiError
     */
    public static signInWithOtp(
        requestBody: SignInWithOtpDto,
    ): CancelablePromise<SignedInUserResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/sign-in-with-otp',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns SignedInUserResponseDto
     * @throws ApiError
     */
    public static signInWithToken(
        requestBody: VerifyTokenDto,
    ): CancelablePromise<SignedInUserResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/sign-in-with-token',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns SignedInUserResponseDto
     * @throws ApiError
     */
    public static refreshSession(): CancelablePromise<SignedInUserResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/refresh',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static logout(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/logout',
        });
    }
    /**
     * @returns User
     * @throws ApiError
     */
    public static whoAmI(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/whoami',
        });
    }
    /**
     * @param requestBody
     * @returns User
     * @throws ApiError
     */
    public static onboard(
        requestBody: OnboardUserDto,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/users/onboard',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns User
     * @throws ApiError
     */
    public static editProfile(
        requestBody: EditProfileDto,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/users/profile/edit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param pageIndex
     * @param pageSize
     * @returns AllUsersDto
     * @throws ApiError
     */
    public static getAllUsers(
        pageIndex: number,
        pageSize: number,
    ): CancelablePromise<AllUsersDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/admin/users',
            query: {
                'pageIndex': pageIndex,
                'pageSize': pageSize,
            },
        });
    }
    /**
     * @param userId
     * @param requestBody
     * @returns User
     * @throws ApiError
     */
    public static changeUserRole(
        userId: string,
        requestBody: ChangeUserRoleDto,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/users/admin/{userId}/change-role',
            path: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns Problem
     * @throws ApiError
     */
    public static createProblem(
        requestBody: CreateProblemDto,
    ): CancelablePromise<Problem> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/problems',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param pageIndex
     * @param pageSize
     * @param order
     * @param title
     * @param authorId
     * @param difficulty
     * @param status
     * @param topicIds
     * @returns ProblemsResponseDto
     * @throws ApiError
     */
    public static getProblems(
        pageIndex: number,
        pageSize: number,
        order?: SortOrder,
        title?: string,
        authorId?: string,
        difficulty?: ProblemDifficulty,
        status?: PostStatus,
        topicIds?: Array<string>,
    ): CancelablePromise<ProblemsResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/problems',
            query: {
                'pageIndex': pageIndex,
                'pageSize': pageSize,
                'order': order,
                'title': title,
                'authorId': authorId,
                'difficulty': difficulty,
                'status': status,
                'topicIds': topicIds,
            },
        });
    }
    /**
     * @param pageIndex
     * @param pageSize
     * @param order
     * @param title
     * @param authorId
     * @param difficulty
     * @param status
     * @param topicIds
     * @returns ProblemsResponseDto
     * @throws ApiError
     */
    public static getProblemsForAdmin(
        pageIndex: number,
        pageSize: number,
        order?: SortOrder,
        title?: string,
        authorId?: string,
        difficulty?: ProblemDifficulty,
        status?: PostStatus,
        topicIds?: Array<string>,
    ): CancelablePromise<ProblemsResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/problems/admin',
            query: {
                'pageIndex': pageIndex,
                'pageSize': pageSize,
                'order': order,
                'title': title,
                'authorId': authorId,
                'difficulty': difficulty,
                'status': status,
                'topicIds': topicIds,
            },
        });
    }
    /**
     * @param problemId
     * @returns ProblemResponseDto
     * @throws ApiError
     */
    public static getProblemById(
        problemId: string,
    ): CancelablePromise<ProblemResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/problems/{problemId}',
            path: {
                'problemId': problemId,
            },
        });
    }
    /**
     * @param problemId
     * @param requestBody
     * @returns Problem
     * @throws ApiError
     */
    public static updateProblem(
        problemId: string,
        requestBody: UpdateProblemDto,
    ): CancelablePromise<Problem> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/problems/{problemId}',
            path: {
                'problemId': problemId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns Topic
     * @throws ApiError
     */
    public static createTopic(
        requestBody: CreateTopicDto,
    ): CancelablePromise<Topic> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/topics',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns Topic
     * @throws ApiError
     */
    public static getAllTopics(): CancelablePromise<Array<Topic>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/topics',
        });
    }
    /**
     * @param topicId
     * @returns Topic
     * @throws ApiError
     */
    public static getTopic(
        topicId: string,
    ): CancelablePromise<Topic> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/topics/{topicId}',
            path: {
                'topicId': topicId,
            },
        });
    }
    /**
     * @param topicId
     * @param requestBody
     * @returns Topic
     * @throws ApiError
     */
    public static updateTopic(
        topicId: string,
        requestBody: CreateTopicDto,
    ): CancelablePromise<Topic> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/topics/{topicId}',
            path: {
                'topicId': topicId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns Submission
     * @throws ApiError
     */
    public static createSubmission(
        requestBody: CreateSubmissionDto,
    ): CancelablePromise<Submission> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/submissions',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param submissionId
     * @returns any
     * @throws ApiError
     */
    public static rejudgeSubmission(
        submissionId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/submissions/rejudge/{submissionId}',
            path: {
                'submissionId': submissionId,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static handleExecutionCallback(
        requestBody: UpdateSubmissionDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/submissions/callback',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param problemId
     * @returns Submission
     * @throws ApiError
     */
    public static getSubmissions(
        problemId: string,
    ): CancelablePromise<Array<Submission>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/submissions/problem/{problemId}',
            path: {
                'problemId': problemId,
            },
        });
    }
    /**
     * @param submissionId
     * @returns SubmissionResponseDto
     * @throws ApiError
     */
    public static getSubmissionById(
        submissionId: string,
    ): CancelablePromise<SubmissionResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/submissions/{submissionId}',
            path: {
                'submissionId': submissionId,
            },
        });
    }
    /**
     * @param problemId
     * @param language
     * @returns string
     * @throws ApiError
     */
    public static getSolution(
        problemId: string,
        language: Record<string, any>,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/solutions',
            query: {
                'problemId': problemId,
                'language': language,
            },
        });
    }
    /**
     * @param requestBody
     * @returns SuccessMessageDto
     * @throws ApiError
     */
    public static addSolution(
        requestBody: AddSolutionDto,
    ): CancelablePromise<SuccessMessageDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/solutions',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
