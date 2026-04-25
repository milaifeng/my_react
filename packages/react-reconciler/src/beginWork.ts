// 递归过程中的递过程
import { ReactElementType } from '@/shared/ReactTypes';
import { FiberNode } from './fiber';
import { UpdateQueue, processUpdateQueue } from './updateQueue';
import { HostRoot, HostComponent, HostText } from './workTags';
import { mountChildFibers, reconcileChildFibers } from './childFibers';

export const beginWork = (wip: FiberNode): FiberNode | null => {
	// 返回子fiberNode节点
	switch (wip.tag) {
		case HostRoot:
			return updateHostRoot(wip);
		case HostComponent:
			return updateHostComponent(wip);
		case HostText:
			return null;
		default:
			if (__DEV__) {
				console.warn(`beginwork标签未被处理：${wip.tag}`);
			}
			break;
	}
	return null;
};

const updateHostRoot = (wip: FiberNode) => {
	const baseState = wip.memoizedState;
	const updateQueue = wip.updateQueue as UpdateQueue<Element>;
	const pending = updateQueue.shared.pending;
	updateQueue.shared.pending = null;
	const { memoizedState } = processUpdateQueue(baseState, pending);
	wip.memoizedState = memoizedState;

	const nextChildren = wip.memoizedState;
	reconcileChildren(wip, nextChildren);
	return wip.child;
};

const updateHostComponent = (wip: FiberNode) => {
	const nextProps = wip.pendingProps;
	const nextChildren = nextProps.children;
	reconcileChildren(wip, nextChildren);
	return wip.child;
};

const reconcileChildren = (wip: FiberNode, children?: ReactElementType) => {
	const current = wip.alternate;
	if (current === null) {
		// 更新流程
		wip.child = reconcileChildFibers(wip, null, children);
	} else {
		// 挂载流程
		wip.child = mountChildFibers(wip, current.child, children);
	}
};
