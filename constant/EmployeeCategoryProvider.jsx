import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a context with default value null
export const EmployeeCategoryContext = createContext(null);

const EmployeeCategoryProvider = ({ children }) => {
  const [empCategory, setEmpCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const userInfo = await AsyncStorage.getItem('userInfo');
        if (userInfo) {
          const user = JSON.parse(userInfo);
          setEmpCategory(user.emp_category);
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchCategory();
  }, []);

  return (
    <EmployeeCategoryContext.Provider value={empCategory}>
      {children}
    </EmployeeCategoryContext.Provider>
  );
};

export default EmployeeCategoryProvider;
