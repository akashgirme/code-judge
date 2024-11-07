import {
  Card,
  CardContent,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@code-judge/ui';
import { ProblemDetailContainer } from 'apps/client/features/problem';
import { CreateSubmissionContainer } from '../create-submission';
import { AllSubmissionsContainer } from '../all-submissions';
import { handleComingSoonAlert } from 'apps/client/utils';
import { useState } from 'react';

export const SubmissionPanelView = () => {
  const [activeTab, setActiveTab] = useState('description');
  return (
    <div className="flex flex-col h-full px-2">
      <div className="grid grid-cols-2 gap-1 pt-1 pb-1">
        <div className="col-span-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger
                value="solutions"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default behavior
                  handleComingSoonAlert(); // Trigger your alert
                }}
              >
                Solutions
              </TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
            </TabsList>
            <TabsContent
              value="description"
              className="h-full prose prose-stone dark:prose-invert"
            >
              <ProblemDetailContainer />
            </TabsContent>
            {/* <TabsContent value="solutions" className="h-full">
              <Card>
                <CardContent className="space-y-2">
                  <Label>Solutions</Label>
                </CardContent>
              </Card>
            </TabsContent> */}
            <TabsContent value="submissions" className="h-full">
              <Card>
                <CardContent className="space-y-2">
                  <AllSubmissionsContainer />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div className="col-span-1">
          <CreateSubmissionContainer
            onSubmissionSuccess={() => setActiveTab('submissions')}
          />
        </div>
      </div>
    </div>
  );
};
