const supportedSymbols = typeof Symbol === 'function' && Symbol.for;

export const REACT_ELEMENT_TYPE = supportedSymbols
	? Symbol.for('react.element')
	: 0xeac7;
