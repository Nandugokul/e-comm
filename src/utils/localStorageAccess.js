// Helper functions to interact with localStorage
export const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cartData");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.warn("Error loading from localStorage", e);
    return undefined;
  }
};

export const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cartData", serializedState);
  } catch (e) {
    console.warn("Error saving to localStorage", e);
  }
};
