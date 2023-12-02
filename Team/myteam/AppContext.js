import React, { createContext, useReducer, useContext } from 'react';

const AppContext = createContext();

const initialState = {
  students: [],
  formedTeams: [],
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_STUDENT':
      return { ...state, students: [...state.students, action.payload] };
    case 'FORM_TEAMS':
      // Your logic for forming teams
      const formTeams = () => {
        const teams = [];
        const countriesUsed = new Set();
    
        state.students.forEach((student) => {
          if (!countriesUsed.has(student.country)) {
            countriesUsed.add(student.country);
    
            const team = [];
            team.push(student);
    
            const otherCountries = Array.from(countriesUsed.values()).filter(
              (country) => country !== student.country
            );
    
            otherCountries.forEach((country) => {
              const studentFromOtherCountry = state.students.find(
                (s) => s.country === country && !team.includes(s)
              );
    
              if (studentFromOtherCountry) {
                team.push(studentFromOtherCountry);
                countriesUsed.add(country);
              }
            });
    
            if (team.length >= 2) {
              teams.push(team);
            }
          }
        });
    
        return teams;
      };

      return { ...state, formedTeams: formTeams() };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export { AppProvider, useAppContext };
