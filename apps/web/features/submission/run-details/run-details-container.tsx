'use client';
import React, { useEffect, useState } from 'react';
import { RunDetailsView } from './run-details-view';

import { removeRunResponse, removeSubmitResponse } from '../services';
import { useAppDispatch, useAppSelector } from 'apps/web/app/store';

export const RunDetailsContainer = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const dispatch = useAppDispatch();
  const { runResponse } = useAppSelector((state) => state.submission);

  const handleOnBack = () => {
    dispatch(removeRunResponse());
  };

  useEffect(() => {
    if (runResponse) {
      setShouldRender(true);
    } else {
      setShouldRender(false);
    }
  }, [runResponse]);

  return shouldRender && runResponse ? (
    <RunDetailsView data={runResponse} handleOnBack={handleOnBack} />
  ) : null;
};
