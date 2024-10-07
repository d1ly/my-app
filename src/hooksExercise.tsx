function ClickCounter() {
    let count = 0;
  
    const handleClick = () => {
      count += 1;
      console.log('Count:', count);
    };
  
    return (
      <div>
        <p>Clicks: {count}</p>
        <button onClick={handleClick}>Click me!</button>
      </div>
    );
  }
  
  