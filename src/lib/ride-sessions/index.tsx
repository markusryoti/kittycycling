import { createContext, useContext, useEffect, useState } from "react";

type RideSession = {
  id: string;
  date: Date;
  distance: number;
};

type RideSessionCtx = {
  sessions: RideSession[];
  addSession: (session: RideSession) => void;
  removeSession: (id: string) => void;
};

function getStoredSessions() {
  try {
    const storedSessions = localStorage.getItem("ride-sessions");
    const initialSessions: RideSession[] = storedSessions
      ? JSON.parse(storedSessions)
      : [];
    const converted = initialSessions.map((s) => {
      return { ...s, date: new Date(s.date) };
    });
    return converted;
  } catch (error) {
    return [];
  }
}

function saveSessions(sessions: RideSession[]) {
  localStorage.setItem("ride-sessions", JSON.stringify(sessions));
}

const RideSessionContext = createContext<RideSessionCtx>({} as RideSessionCtx);

export const RideSessionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [initialized, setInitialized] = useState(false);
  const [sessions, setSessions] = useState<RideSession[]>(getStoredSessions());

  useEffect(() => {
    if (!initialized) setInitialized(true);
    saveSessions(sessions);
  }, [sessions]);

  const addSession = (session: RideSession) => {
    const updated = [...sessions, session];
    updated.sort((a, b) => (a.date > b.date ? 1 : -1));
    setSessions(updated);
  };

  const removeSession = (id: string) => {
    const filtered = sessions.filter((s) => s.id !== id);
    setSessions(filtered);
  };

  return (
    <RideSessionContext.Provider
      value={{
        sessions,
        addSession,
        removeSession,
      }}
    >
      {children}
    </RideSessionContext.Provider>
  );
};

export const useRides = () => {
  const { sessions, addSession, removeSession } =
    useContext(RideSessionContext);

  return {
    sessions,
    addSession,
    removeSession,
  };
};
