import { createContext } from "react";

interface IReaderContext {
  fontSize: number;
  setFontSize: (value: number) => void;
}

const ReaderContext = createContext<IReaderContext>({
  fontSize: 16,
  setFontSize() {},
});

export default ReaderContext;
