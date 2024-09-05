import { ActionCreatorWithOptionalPayload, ActionCreatorWithPayload, createAction} from '@reduxjs/toolkit';

function createAsyncActions<P>(prefix: string): [
  ActionCreatorWithOptionalPayload<number | undefined>,
  ActionCreatorWithPayload<P>,
  ActionCreatorWithPayload<unknown>
] {
  const get = createAction(`${prefix}/get`, (payload?: number) => ({
    // number is for pagination
    payload,
  }));
  const success = createAction(`${prefix}/success`, (payload: P) => ({
    payload,
  }));
  const failure = createAction(`${prefix}/failure`, (payload: unknown) => ({
    payload,
  }));

  return [
    get, 
    success, 
    failure
  ];
}

export { createAsyncActions };
