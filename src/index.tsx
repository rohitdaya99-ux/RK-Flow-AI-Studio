import { createRoot } from 'react-dom/client';
import { RKFlowDashboard } from './components/RKFlowDashboard';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<RKFlowDashboard />);
}