'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'apps/client/app/store';
import { removeSubmitResponse } from '../services';
import { SubmitDetailsView } from './submit-details-view';

export const SubmitDetailsContainer = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const dispatch = useAppDispatch();
  const { submitResponse } = useAppSelector((state) => state.submission);

  const handleOnBack = () => {
    dispatch(removeSubmitResponse());
  };

  useEffect(() => {
    if (submitResponse) {
      setShouldRender(true);
    } else {
      setShouldRender(false);
    }
  }, [submitResponse]);

  return shouldRender && submitResponse ? (
    <SubmitDetailsView data={submitResponse} handleOnBack={handleOnBack} />
  ) : null;
};
