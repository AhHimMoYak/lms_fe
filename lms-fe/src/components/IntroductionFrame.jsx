import { Outlet } from "react-router-dom";

function IntrodcutionFrame() {
  const containerStyle = {
    height: "100vh",
  };

  return (
    <div style={containerStyle}>
      {/* <TabStrip /> */}
      <Outlet />
    </div>
  );
}

export default IntrodcutionFrame;
