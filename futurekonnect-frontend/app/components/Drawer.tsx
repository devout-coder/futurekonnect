"use client";
import React, { useState, useEffect } from "react";
import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  IconButton,
  Avatar,
  Tooltip,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import FutureKonnectLogo from "./Logo";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../contexts/AuthContext";

const Drawer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout } = useAuth();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Update selected item based on current path
    const currentPath = pathname.split('/')[1] || 'dashboard';
    setSelectedItem(currentPath);
    
    // Set initial collapse state based on route and screen size
    if (isSmallScreen) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(pathname !== '/');
    }
  }, [pathname, isSmallScreen]);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", path: "/" },
    { id: "tenants", label: "Tenants", path: "/tenants" },
    { id: "fleets", label: "Fleets", path: "/fleets" },
    { id: "routers", label: "Routers", path: "/routers" },
    {
      id: "firewall_templates",
      label: "Firewall Templates",
      path: "/firewall_templates",
    },
    { id: "hotspot_users", label: "Hotspot Users", path: "/hotspot_users" },
    { id: "audit_trail", label: "Audit Trail", path: "/audit_trail" },
    { id: "billing", label: "Billing", path: "/billing" },
    { id: "admins", label: "Admins", path: "/admins" },
  ];

  const handleItemClick = (id: string, path: string) => {
    setSelectedItem(id);
    router.push(path);
  };

  const toggleDrawer = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <MuiDrawer
      variant="permanent"
      anchor="left"
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          position: 'relative',
          minHeight: '100vh',
          height: '100%',
          width: isCollapsed ? '80px' : '240px',
          boxSizing: 'border-box',
          borderRight: "none",
          backgroundColor: "#1a2a3a",
          color: "#fff",
          transition: 'width 0.3s ease-in-out',
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#1a2a3a',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#4DABF7',
            borderRadius: '4px',
          },
        },
      }}
    >
      <div
        style={{
          minHeight: '100%',
          display: "flex",
          flexDirection: "column",
          width: '100%',
          transition: 'all 0.3s ease-in-out',
          position: 'relative'
        }}
      >
        <div 
          style={{ 
            padding: "16px", 
            width: "100%",
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.3s ease-in-out'
          }}
          onClick={toggleDrawer}
        >
          {isCollapsed ? (
            <Image
              src="/images/fk_logo_small.png"
              alt="FutureKonnect Logo"
              width={24}
              height={24}
              priority
              style={{ transition: 'all 0.3s ease-in-out' }}
            />
          ) : (
            <FutureKonnectLogo
              width={200}
              height={40}
              marginBottom={3}
              marginTop={2}
            />
          )}
        </div>
        <List style={{ 
          flex: 1, 
          width: "100%", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: isCollapsed ? "center" : "flex-start",
          transition: 'all 0.3s ease-in-out'
        }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.id}
              component="a"
              onClick={() => handleItemClick(item.id, item.path)}
              sx={{
                backgroundColor:
                  selectedItem === item.id ? "#4DABF7" : "transparent",
                cursor: "pointer",
                margin: "4px 0",
                width: isCollapsed ? '100%' : '100%',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                transition: 'all 0.3s ease-in-out',
                "& .MuiListItemIcon-root": {
                  minWidth: "40px",
                  display: 'flex',
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                },
                "& .MuiTypography-root": {
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  fontSize: "18px",
                  lineHeight: "24px",
                  display: isCollapsed ? 'none' : 'block',
                  transition: 'all 0.3s ease-in-out',
                },
              }}
            >
              <ListItemIcon>
                <Image
                  src={`/icons/${item.id}.svg`}
                  alt={`${item.label} icon`}
                  width={24}
                  height={24}
                  style={{ filter: "brightness(0) invert(1)", transition: 'all 0.3s ease-in-out' }}
                />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
        <Button
          startIcon={<AddIcon />}
          sx={{
            color: "#fff",
            margin: "16px",
            backgroundColor: "#314B61",
            borderRadius: "8px",
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: "19px",
            lineHeight: "24px",
            letterSpacing: "0px",
            textAlign: "center",
            verticalAlign: "middle",
            padding: isCollapsed ? "8px" : "8px 16px",
            mb: 5,
            width: isCollapsed ? 'auto' : 'calc(100% - 32px)',
            justifyContent: isCollapsed ? 'center' : 'center',
            minWidth: isCollapsed ? 'auto' : 'unset',
            transition: 'all 0.3s ease-in-out',
            '& .MuiButton-startIcon': {
              margin: isCollapsed ? 0 : '0 8px 0 0',
              transition: 'all 0.3s ease-in-out',
            },
            '& .MuiButton-label': {
              display: isCollapsed ? 'none' : 'block',
              transition: 'all 0.3s ease-in-out',
            }
          }}
        >
          {!isCollapsed && "Create"}
        </Button>
        <Divider sx={{ 
          width: '80%', 
          margin: '0 auto', 
          borderColor: '#C7BCBC', 
          mb: 3,
          transition: 'all 0.3s ease-in-out'
        }} />
        <List sx={{ 
          width: "100%",
          transition: 'all 0.3s ease-in-out'
        }}>
          <ListItem
            component="a"
            sx={{
              "& .MuiTypography-root": {
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "24px",
                display: isCollapsed ? 'none' : 'block',
                transition: 'all 0.3s ease-in-out',
              },
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              transition: 'all 0.3s ease-in-out',
              "& .MuiListItemIcon-root": {
                minWidth: "40px",
                display: 'flex',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
              },
            }}
          >
            <ListItemIcon>
              <Image
                src="/icons/account.svg"
                alt="Account icon"
                width={24}
                height={24}
                style={{ filter: "brightness(0) invert(1)", transition: 'all 0.3s ease-in-out' }}
              />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
          <ListItem
            component="a"
            onClick={() => logout()}
            sx={{
              "& .MuiTypography-root": {
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "24px",
                display: isCollapsed ? 'none' : 'block',
                transition: 'all 0.3s ease-in-out',
              },
              marginBottom: '16px',
              cursor: 'pointer',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              transition: 'all 0.3s ease-in-out',
              "& .MuiListItemIcon-root": {
                minWidth: "40px",
                display: 'flex',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
              },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            <ListItemIcon>
              <Image
                src="/icons/logout.svg"
                alt="Logout icon"
                width={24}
                height={24}
                style={{ filter: "brightness(0) invert(1)", transition: 'all 0.3s ease-in-out' }}
              />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </div>
    </MuiDrawer>
  );
};

export default Drawer;
         