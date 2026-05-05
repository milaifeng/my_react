const supportedSymbols = typeof Symbol === 'function' && Symbol.for;

export const REACT_ELEMENT_TYPE = supportedSymbols
	? Symbol.for('react.element')
	: 0xeac7;

export const REACT_FRAGMENT_TYPE = supportedSymbols
	? Symbol.for('react.fragment')
	: 0xeacb;
