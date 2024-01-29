import { createContext } from 'react';
import { SignalRContextType } from './types';

const SignalRContext = createContext<SignalRContextType>({
  connection: null,
});

export default SignalRContext;
