import React, { createContext, useContext, useState } from 'react';

const SelectedProfileContext = createContext();

export function SelectedProfileProvider({ children }) {
    const [selectedProfile, setSelectedProfile] = useState(null);

    return (
        <SelectedProfileContext.Provider value={{ selectedProfile, setSelectedProfile }}>
            {children}
        </SelectedProfileContext.Provider>
    );
}

export function useSelectedProfile() {
    const context = useContext(SelectedProfileContext);
    if (!context) {
        throw new Error('useSelectedProfile must be used within a SelectedProfileProvider');
    }
    return context;
}
