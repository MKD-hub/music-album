import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction} from '@reduxjs/toolkit';



function createAsyncActions<P>(prefix: string): [
  ActionCreatorWithoutPayload,
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload<P>,
  ActionCreatorWithPayload<unknown>
] {
  const get = createAction(`${prefix}/get`);
  const pending = createAction(`${prefix}/pending`);
  const success = createAction(`${prefix}/success`, (payload: P) => ({
    payload,
  }));
  const failure = createAction(`${prefix}/failure`, (payload: unknown) => ({
    payload,
  }));

  return [get, pending, success, failure];
}

export { createAsyncActions };
