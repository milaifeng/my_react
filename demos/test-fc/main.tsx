// import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';

function App() {
	const [number, setNumber] = useState(0);
	useEffect(() => {
		console.log('APP mount');
	}, []);
	useEffect(() => {
		console.log('number change create', number);
		return () => {
			console.log('number change destroy', number);
		};
	}, [number]);

	return (
		<div onClick={() => setNumber(number + 1)}>
			{number === 0 ? <Child /> : 'noop'}
		</div>
	);
}

function Child() {
	useEffect(() => {
		console.log('Child mount');
		return () => console.log('Child destroy');
	}, []);
	return 'Child';
}

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
// 	<App />
// );
