/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Topic } from './Topic';
import type { User } from './User';
export type Problem = {
    id: string;
    title: string;
    difficulty: Record<string, any>;
    slug: string;
    author: User;
    topics: Array<Topic>;
    status: Record<string, any>;
};

