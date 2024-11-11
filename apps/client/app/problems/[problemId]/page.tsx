'use client';
import {
  Button,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@code-judge/core-design';
import { ProblemDetailContainer } from 'apps/client/features/problem';
import {
  AllSubmissionsContainer,
  CodeEditorPanelContainer,
  RunCode,
  RunDetailsContainer,
  SubmitCode,
  SubmitDetailsContainer,
} from 'apps/client/features/submission';
import { useAppSelector } from '../../store';
import { useRouter } from 'next/navigation';

const ProblemDetailScreen = () => {
  const { runResponse } = useAppSelector((state) => state.submission);
  const { submitResponse } = useAppSelector((state) => state.submission);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/auth/sign-in');
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] w-full overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50} minSize={30}>
          <Tabs defaultValue="description" className="flex flex-col h-full w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="submissions">Submission</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="flex-1 h-0">
              <div className="h-full overflow-y-auto">
                <ProblemDetailContainer />
              </div>
            </TabsContent>
            <TabsContent value="submissions" className="flex-1 h-0">
              <div className="h-full overflow-y-auto">
                <AllSubmissionsContainer />
              </div>
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={30}>
          <ResizablePanelGroup direction="vertical" className="h-full">
            <ResizablePanel defaultSize={70} minSize={30}>
              <div className="flex flex-col h-full relative">
                <div className="flex-grow">
                  <CodeEditorPanelContainer />
                </div>
                <div className="border-t p-4 flex justify-end gap-4">
                  <RunCode />
                  <SubmitCode />
                </div>
                {!isAuthenticated && (
                  <div className="absolute inset-0 backdrop-blur-md bg-black/30 flex flex-col items-center justify-center">
                    <h3 className="text-white text-xl font-semibold mb-4">
                      Please login to access the code editor
                    </h3>
                    <Button onClick={handleLoginClick} variant="primary" isActive>
                      Login
                    </Button>
                  </div>
                )}
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
