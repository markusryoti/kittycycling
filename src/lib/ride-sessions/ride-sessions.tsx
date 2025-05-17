import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { parseStoredSessions, saveSessions } from "../storage/storage";

export type RideSession = {
  id: string;
  date: Date;
  distance: number;
};

export type RideTarget = {
  date: Date;
  distance: number;
};

export type RideSessionState = {
  sessions: RideSession[];
  rideTarget?: RideTarget;
};

type RideSessionCtx = {
  sessions: RideSession[];
  rideTarget?: RideTarget;
  addSession: (session: RideSession) => void;
  removeSession: (id: string) => void;
  setTarget: (target: RideTarget) => void;
};

const RideSessionContext = createContext<RideSessionCtx>({} as RideSessionCtx);

const storageKey = "ride-sessions";

type reducerActions =
  | { type: "add-session"; payload: { session: RideSession } }
  | { type: "remove-session"; payload: { id: string } }
  | { type: "set-ride-target"; payload: { rideTarget: RideTarget } };

export function rideSessionReducer(
  currentState: RideSessionState,
  action: reducerActions
) {
  switch (action.type) {
    case "add-session":
      const updated = [...currentState.sessions, action.payload.session];
      updated.sort((a, b) => (a.date > b.date ? 1 : -1));
      return {
        ...currentState,
        sessions: updated,
      };
    case "remove-session":
      const filtered = currentState.sessions.filter(
        (s) => s.id !== action.payload.id
      );
      return {
        ...currentState,
        sessions: filtered,
      };
    case "set-ride-target":
      return {
        ...currentState,
        rideTarget: action.payload.rideTarget,
      };
  }
  return currentState;
}

export const RideSessionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const storedSessions = parseStoredSessions(localStorage.getItem(storageKey));
  const [initialized, setInitialized] = useState(false);

  const [state, dispatch] = useReducer(rideSessionReducer, {
    sessions: storedSessions,
    rideTarget: {
      date: new Date("2025-07-03"),
      distance: 2500,
    },
  });

  useEffect(() => {
    if (!initialized) setInitialized(true);
    saveSessions(storageKey, state.sessions);
  }, [state.sessions]);

  const addSession = (session: RideSession) => {
    dispatch({ type: "add-session", payload: { session } });
  };

  const removeSession = (id: string) => {
    dispatch({ type: "remove-session", payload: { id } });
  };

  const setTarget = (target: RideTarget) => {
    dispatch({ type: "set-ride-target", payload: { rideTarget: target } });
  };

  return (
    <RideSessionContext.Provider
      value={{
        sessions: state.sessions,
        rideTarget: state.rideTarget,
        addSession,
        removeSession,
        setTarget,
      }}
    >
      {children}
    </RideSessionContext.Provider>
  );
};

export const useRides = () => {
  const { sessions, rideTarget, addSession, removeSession, setTarget } =
    useContext(RideSessionContext);

  return {
    sessions,
    rideTarget,
    addSession,
    removeSession,
    setTarget,
  };
};
