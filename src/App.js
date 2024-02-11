import "./App.css";
import SetupRouter from "./router";
import { Provider } from "react-redux";
import store from "./store";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <SetupRouter />
            </Provider>
        </div>
    );
}

export default App;
