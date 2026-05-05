import ReactDOM from 'react-dom/client';
import { useState } from 'react';

function App() {
	const [number, setNumber] = useState(2);
	console.log(number);
	const arr =
		number % 2 === 0
			? [<li key="1">1</li>, <li key="2">2</li>, <li key="3">3</li>]
			: [<li key="3">3</li>, <li key="2">2</li>, <li key="1">1</li>];
	// return <ul onClick={() => setNumber(number + 1)}>{arr}</ul>;
	return (
		<ul onClick={() => setNumber(number + 1)}>
			<li>4</li>
			<li>5</li>
			{arr}
		</ul>
	);
}

function Child() {
	return <div>Child</div>;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<App />
);
