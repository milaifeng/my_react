export type WorkTag =
	| typeof FunctionComponent
	| typeof HostRoot
	| typeof HostComponent
	| typeof HostText
	| typeof Fragment;

export const FunctionComponent = 0; // 函数组件
export const HostRoot = 3; // 挂载的根节点
export const HostComponent = 5; // 挂载的组件
export const HostText = 6; // 挂载的文本
export const Fragment = 7; // 挂载的文本
