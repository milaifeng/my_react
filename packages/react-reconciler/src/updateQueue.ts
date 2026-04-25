import { Action } from '@/shared/ReactTypes';

export interface Update<State> {
	action: Action<State>;
}
export interface UpdateQueue<State> {
	shared: { pending: Update<State> | null };
}
// 创建Update
export function createUpdate<State>(action: Action<State>): Update<State> {
	return {
		action
	};
}
// 创建UpdateQueue更新队列
export const createUpdateQueue = <State>() => {
	return {
		shared: { pending: null }
	} as UpdateQueue<State>;
};
// 入队更新 向UpdateQueue中添加更新的方法
export const enqueueUpdate = <State>(
	updateQueue: UpdateQueue<State>,
	update: Update<State>
) => {
	updateQueue.shared.pending = update;
};
// 处理更新队列 执行UpdateQueue中的更新方法
export const processUpdateQueue = <State>(
	baseState: State,
	pendingUpdate: Update<State> | null
): { memoizedState: State } => {
	const result: ReturnType<typeof processUpdateQueue<State>> = {
		memoizedState: baseState
	};
	if (pendingUpdate !== null) {
		const action = pendingUpdate.action;
		if (action instanceof Function) {
			// baseState 1 update (x) => 4x -> memoizedState 4
			result.memoizedState = action(baseState);
		} else {
			// baseState 1 update 2 -> memoizedState 2
			result.memoizedState = action;
		}
	}
	return result;
};
