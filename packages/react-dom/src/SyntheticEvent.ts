import { Props } from '@/shared/ReactTypes';
import { Container } from './hostConfig';

export const elementPropsKey = '__props';
const validEventTypeList = ['click'];
export interface DomElement extends Element {
	[elementPropsKey]: Props;
}
type EventCallback = (event: Event) => void;

interface SyntheticEvent extends Event {
	__stopPropagation: boolean;
}

interface Paths {
	capture: EventCallback[];
	bubble: EventCallback[];
}

export function updateFiberProps(node: DomElement, props: Props) {
	node[elementPropsKey] = props;
}
export function initEvent(container: Container, eventType: string) {
	if (!validEventTypeList.includes(eventType)) {
		console.warn('当前不支持的eventType', eventType);
		return;
	}
	if (__DEV__) {
		console.log('初始化事件', eventType);
	}
	container.addEventListener(eventType, (e) => {
		dispatchEvent(container, eventType, e);
	});
}

function dispatchEvent(container: Container, eventType: string, event: Event) {
	const targetElement = event.target;
	if (targetElement === null) {
		console.warn('事件目标为空', event);
		return;
	}
	// 1. 收集沿途的事件
	const { capture, bubble } = collectPaths(
		targetElement as DomElement,
		container,
		eventType
	);
	// 2. 构造合成事件
	const se = createSyntheticEvent(event);
	// 3. 遍历capture阶段的事件
	triggerEventFlow(capture, se);
	// 4. 遍历bubbling阶段的事件
	if (!se.__stopPropagation) {
		triggerEventFlow(bubble, se);
	}
}

function getEventCallbackNameFromEventType(
	eventType: string
): string[] | undefined {
	return {
		click: ['onClickCapture', 'onClick']
	}[eventType];
}

function collectPaths(
	targetElement: DomElement,
	container: Container,
	eventType: string
) {
	const paths: Paths = {
		capture: [],
		bubble: []
	};
	while (targetElement && targetElement !== container) {
		const elementProps = targetElement[elementPropsKey];
		if (elementProps) {
			const callbackNameList = getEventCallbackNameFromEventType(eventType);
			if (callbackNameList) {
				callbackNameList.forEach((callbackName, index) => {
					const eventCallback = elementProps[callbackName];
					if (eventCallback) {
						if (index === 0) {
							// capture阶段 (捕获阶段)
							paths.capture.unshift(eventCallback);
						} else {
							// bubbling阶段 (冒泡阶段)
							paths.bubble.push(eventCallback);
						}
					}
				});
			}
		}
		targetElement = targetElement.parentNode as DomElement;
	}
	return paths;
}

function createSyntheticEvent(event: Event) {
	const syntheticEvent = event as SyntheticEvent;
	syntheticEvent.__stopPropagation = false;
	const originStopPropagation = event.stopPropagation;
	syntheticEvent.stopPropagation = () => {
		syntheticEvent.__stopPropagation = true;
		if (originStopPropagation) {
			originStopPropagation();
		}
	};
	return syntheticEvent;
}

function triggerEventFlow(paths: EventCallback[], se: SyntheticEvent) {
	for (let i = 0; i < paths.length; i++) {
		const callback = paths[i];
		callback.call(null, se);

		if (se.__stopPropagation) {
			break;
		}
	}
}
