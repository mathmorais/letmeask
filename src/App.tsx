import { NewRoom } from "./pages/NewRoom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { UserContextProvider } from "./contexts/UserContext";
import { Room } from "./pages/Room";
import { RoomAdmin } from "./pages/RoomAdmin";
import { ModalContextProvider } from "./contexts/ModalContext";
import "./styles/Global.scss";

export function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <ModalContextProvider>
          <Route path="/" exact component={Home} />
          <Switch>
            <Route path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id/admin" component={RoomAdmin} />
            <Route path="/rooms/:id" component={Room} />
          </Switch>
        </ModalContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
}
