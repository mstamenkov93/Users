import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ErrorProvider } from './providers'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorProvider>
    <App />
  </ErrorProvider>,
)
