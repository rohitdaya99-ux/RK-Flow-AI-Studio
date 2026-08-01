
export default function Header() {
  return (
    <div className="header glass">
      <h2 style={{margin:0}}>RK Flow AI Studio</h2>

      <input
        placeholder="Ask RK AI..."
        style={{
          width:320,
          padding:"12px 18px",
          borderRadius:16,
          border:"none",
          outline:"none"
        }}
      />
    </div>
  );
}
