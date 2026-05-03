import ReactDOM from 'react-dom/client';
import { useState } from 'react';

function App() {
	const [number] = useState(111);
	return <div>{number}</div>;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<App />
);
