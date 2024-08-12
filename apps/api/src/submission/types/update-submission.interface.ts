export interface UpdateSubmission {
  submissionId: string;
  totalTestCases: number;
  testCasesPassed: number;
  stderr?: string;
}
