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
  RunDetailsContainer,
  SubmitCode,
  SubmitDetailsContainer,
} from 'apps/client/features/submission';
import { useAppSelector } from '../../store';

// TODO: if user is not login blur the codeEditorPanel and show Login button on it like GFG
// Don't modify here so it in CodeEditorPanelView itself and after login should return to same page again
const ProblemDetailScreen = () => {
  const { runResponse } = useAppSelector((state) => state.submission);
  const { submitResponse } = useAppSelector((state) => state.submission);

  return (
    <div className="h-screen w-full overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full overflow-auto">
            <ProblemDetailContainer />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={30}>
          <ResizablePanelGroup direction="vertical" className="h-full">
            <ResizablePanel defaultSize={70} minSize={30}>
              <div className="flex flex-col h-full">
                <div className="flex-grow overflow-auto">
                  <CodeEditorPanelContainer />
                </div>
                <div className="border-t p-4 flex justify-end gap-4">
                  <RunCode />
                  <SubmitCode />
                </div>
              </div>
            </ResizablePanel>
            {(runResponse || submitResponse) && (
              <>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={30} minSize={20}>
                  <div className="h-full overflow-auto">
                    {runResponse && <RunDetailsContainer />}
                    {submitResponse && <SubmitDetailsContainer />}
                  </div>
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ProblemDetailScreen;
