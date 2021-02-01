import {
  addMiddleware as addMstMiddleware,
  IAnyStateTreeNode,
  IDisposer,
  IMiddlewareHandler,
} from 'mobx-state-tree';

export function addMiddleware(
  target: IAnyStateTreeNode,
  handler: IMiddlewareHandler,
  includeHooks?: boolean
): IDisposer {
  return addMstMiddleware(
    target,
    (call, next, abort) => {
      if (call.context !== target) {
        return next(call);
      }
      return handler(call, next, abort);
    },
    includeHooks
  );
}
