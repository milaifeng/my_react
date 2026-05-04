import { Props, Key, Ref, ReactElementType } from 'shared/ReactTypes';
import { FunctionComponent, HostComponent, WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';
import { Container } from 'hostConfig';
export class FiberNode {
	tag: WorkTag;
	key: Key;
	stateNode: any;
	type: any;

	return: FiberNode | null;
	child: FiberNode | null;
	sibling: FiberNode | null;
	index: number;
	ref: Ref;

	pendingProps: Props;
	memoizedProps: Props | null;
	memoizedState: any;
	alternate: FiberNode | null;
	flags: Flags;
	subtreeFlags: Flags;
	updateQueue: unknown | null;
	deletions: FiberNode[] | null;
	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		this.tag = tag;
		this.key = key;
		this.stateNode = null;
		this.type = null;

		// 构成树状的属性
		this.return = null; // 指向父节点
		this.child = null; // 指向第一个子节点
		this.sibling = null; // 指向下一个兄弟节点
		this.index = 0; // 用于在兄弟节点中定位当前节点

		this.ref = null;

		// 作为工作单元
		this.pendingProps = pendingProps; //刚开始工作的props
		this.memoizedProps = null; // 完成工作的props
		this.memoizedState = null; // 完成工作的状态
		this.updateQueue = null; // 用于更新状态的队列

		this.alternate = null; // 指向另一个版本的Fiber节点，用于协调算法
		this.flags = NoFlags; //标记当前节点的操作类型（副作用）
		this.subtreeFlags = NoFlags; //标记当前节点的子树的操作类型（副作用）
		this.deletions = null; // 记录需要删除的子节点
	}
}

export class FiberRootNode {
	container: Container; // 宿主环境中的根节点
	current: FiberNode; // 当前正在处理的Fiber节点
	finishedWork: FiberNode | null; // 最后完成的工作Fiber节点
	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishedWork = null;
	}
}

export function createWorkinProgress(
	current: FiberNode,
	pendingProps: Props
): FiberNode {
	let wip = current.alternate;
	if (wip === null) {
		// 挂载
		wip = new FiberNode(current.tag, pendingProps, current.key);
		wip.stateNode = current.stateNode;
		wip.alternate = current;
		current.alternate = wip;
	} else {
		// 更新
		wip.pendingProps = pendingProps;
		wip.flags = NoFlags;
		wip.subtreeFlags = NoFlags;
		wip.deletions = null;
	}
	wip.type = current.type;
	wip.updateQueue = current.updateQueue;
	wip.child = current.child;
	wip.memoizedState = current.memoizedState;
	wip.memoizedProps = current.memoizedProps;
	return wip;
}

export function createFiberFromElement(element: ReactElementType) {
	const { type, key, props } = element;
	let fiberTag: WorkTag = FunctionComponent;
	if (typeof type === 'string') {
		fiberTag = HostComponent;
	} else if (typeof type !== 'function') {
		console.warn('createFiberFromElement 函数组件未被处理');
	}
	const fiber = new FiberNode(fiberTag, props, key);
	fiber.type = type;
	return fiber;
}
