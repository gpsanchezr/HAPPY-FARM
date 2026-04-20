import { createContext, useContext, useReducer, ReactNode } from 'react';

type CowAction = 
  | { type: 'SET_STATE'; payload: string }
  | { type: 'SHOW_MESSAGE'; payload: { text: string; duration: number } };

type CowState = {
  currentState: string;
  messages: Array<{ text: string; duration: number }>;
  cartCount: number;
};

const initialState: CowState = {
  currentState: 'idle',
  messages: [],
  cartCount: 0,
};

const cowReducer = (state: CowState, action: CowAction): CowState => {
  switch (action.type) {
    case 'SET_STATE':
      return { ...state, currentState: action.payload };
    case 'SHOW_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};

interface CowContextType {
  state: CowState;
  dispatch: React.Dispatch<CowAction>;
}

const CowContext = createContext<CowContextType | null>(null);

export function CowProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cowReducer, initialState);
  
  return (
    <CowContext.Provider value={{ state, dispatch }}>
      {children}
    </CowContext.Provider>
  );
}

export const useCow = () => {
  const context = useContext(CowContext);
  if (!context) throw new Error('useCow debe usarse dentro de CowProvider');
  return context;
};
