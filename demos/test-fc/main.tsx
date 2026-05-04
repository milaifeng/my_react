import ReactDOM from 'react-dom/client';
import { useState } from 'react';

function App() {
	const [number, setNumber] = useState(97);
	return (
		<div onClick={() => setNumber(number + 1)}>
			{number > 100 ? <Child /> : number}
		</div>
	);
}

function Child() {
	return <div>Child</div>;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<App />
);
