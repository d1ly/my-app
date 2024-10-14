function ToggleTheme({ toggleTheme }: { toggleTheme: () => void }) {
  return (
    <button onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
}

export default ToggleTheme;