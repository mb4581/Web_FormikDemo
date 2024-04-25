import 'bootstrap/dist/css/bootstrap.min.css';
import { NotifyForm } from "./NotifyForm";
import { HashRouter, Route, Routes } from "react-router-dom";
import { SiteNav } from "./SiteNav";
import { NotifyList } from "./NotifyList";
import {Provider} from "react-redux";
import {store} from "./API.ts";

function App() {
  return (
    <div className="app-root">
      <HashRouter>
        <Provider store={store}>
          <SiteNav />
          <Routes>
            <Route path="/" element={<NotifyList />} />
            <Route path="/send" element={<NotifyForm />} />
            <Route path="*" element={<p>Not found</p>} />
          </Routes>
        </Provider>
      </HashRouter>
    </div>
  )
}

export default App
