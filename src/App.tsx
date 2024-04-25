import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Route, Routes } from "react-router-dom";
import { SiteNav } from "./SiteNav";
import {Provider} from "react-redux";
import {store} from "./API.ts";
import React from "react";
import {Spinner} from "react-bootstrap";
import {SpinnerBlock} from "./SpinnerBlock";

const NotifyList = React.lazy(() => import("./NotifyList"));
const NotifyForm = React.lazy(() => import("./NotifyForm"));

function App() {
  return (
    <div className="app-root">
      <HashRouter>
        <Provider store={store}>
          <SiteNav />
          <React.Suspense fallback={<SpinnerBlock />}>
            <Routes>
              <Route path="/" element={<NotifyList />} />
              <Route path="/send" element={<NotifyForm />} />
              <Route path="*" element={<p>Not found</p>} />
            </Routes>
          </React.Suspense>
        </Provider>
      </HashRouter>
    </div>
  )
}

export default App
