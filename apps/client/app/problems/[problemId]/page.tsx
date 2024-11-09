'use client';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@code-judge/core-design';
import { ProblemDetailContainer } from 'apps/client/features/problem';
import {
  CodeEditorPanelContainer,
  RunCode,
  SubmitCode,
} from 'apps/client/features/submission';

const ProblemDetailScreen = () => {
  return (
    <div className="h-[calc(100vh)]">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-full rounded-lg border"
      >
        <ResizablePanel defaultSize={50}>
          <ProblemDetailContainer />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex-1 overflow-auto">
            <CodeEditorPanelContainer />
          </div>
          <div className="border-t p-4 flex justify-end gap-4">
            <RunCode />
            <SubmitCode />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ProblemDetailScreen;
