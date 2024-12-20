import ReactDOM from 'react-dom/client';
import 'react-photo-view/dist/react-photo-view.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './satoshi.css';
import { PhotoProvider } from 'react-photo-view';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <PhotoProvider
    speed={() => 800}
    easing={(type) =>
      type === 2
        ? 'cubic-bezier(0.36, 0, 0.66, -0.56)'
        : 'cubic-bezier(0.34, 1.56, 0.64, 1)'
    }
  >
    <Router>
      <App />
    </Router>
  </PhotoProvider>,
);
