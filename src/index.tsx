import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.scss'
import { Provider } from 'react-redux'
import { store } from './redux'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
