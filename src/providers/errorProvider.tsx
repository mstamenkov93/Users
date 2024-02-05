import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ErrorContextType {
    errorMessage: string | null;
    handleError: (errorMessage: string) => void;
    clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

interface ErrorProviderProps {
    children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleError = (errorMessage: string) => {
        setErrorMessage(errorMessage);
    };

    const clearError = () => {
        setErrorMessage(null);
    };

    const value: ErrorContextType = {
        errorMessage,
        handleError,
        clearError,
    };

    return (
        <ErrorContext.Provider value={value}>
            {children}
        </ErrorContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useError = (): ErrorContextType => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error('useError must be used within an ErrorProvider');
    }
    return context;
};