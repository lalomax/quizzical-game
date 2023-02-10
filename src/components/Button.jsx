function Button({ value, holdSelection, isSelected }) {
  const styles = {
    backgroundColor: isSelected ? "#59e391" : "white",
  };
  return (
    <button
      style={styles}
      onClick={holdSelection}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}

export default Button;
