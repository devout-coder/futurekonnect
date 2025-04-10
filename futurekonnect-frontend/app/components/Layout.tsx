import { Box } from "@mui/material";
import Drawer from "./Drawer";
import TopBar from "./TopBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Box sx={{ flexShrink: 0 }}>
        <Drawer />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          overflow: "auto",
        }}
      >
        <TopBar />
        <Box
          sx={{
            flex: 1,
            padding: "24px",
            marginTop: "16px",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout; 