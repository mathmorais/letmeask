import { NewRoom } from "./pages/NewRoom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Room } from "./pages/Room";
import { RoomAdmin } from "./pages/RoomAdmin";

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Switch>
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id/admin" component={RoomAdmin} />
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
