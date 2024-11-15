'use client';
import { CodeEditorPanelLogic, CodeEditorPanelModel } from './code-editor-panel-logic';

export const CodeEditorPanelContainer = () => {
  const defaultValues: CodeEditorPanelModel = {
    sourceCode: '',
    language: 'cpp',
  };
  return <CodeEditorPanelLogic defaultValues={defaultValues} />;
};
