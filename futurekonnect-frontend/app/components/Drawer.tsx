"use client";
import React, { useState } from "react";
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
} from "@mui/material";
import { useRouter } from "next/navigation";
import FutureKonnectLogo from "./Logo";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";

const Drawer = () => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState("dashboard");

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
    { id: "audit_trail", label: "Audit Trail", path: "/audit-trail" },
    { id: "billing", label: "Billing", path: "/billing" },
    { id: "admins", label: "Admins", path: "/admins" },
  ];

  const handleItemClick = (id: string, path: string) => {
    setSelectedItem(id);
    router.push(path);
  };

  return (
    <MuiDrawer
      variant="permanent"
      anchor="left"
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          position: 'relative',
          width: 'fit-content',
          boxSizing: 'border-box',
          borderRight: "none",
          overflow: "hidden",
          backgroundColor: "#1a2a3a",
          color: "#fff",
        },
      }}
    >
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          width: '100%'
        }}
      >
        <div style={{ padding: "16px", width: "100%" }}>
          <FutureKonnectLogo
            width={200}
            height={40}
            marginBottom={3}
            marginTop={2}
          />
        </div>
        <List style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                "& .MuiListItemIcon-root": {
                  minWidth: "40px",
                },
                "& .MuiTypography-root": {
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  fontSize: "18px",
                  lineHeight: "24px",
                },
              }}
            >
              <ListItemIcon>
                <Image
                  src={`/icons/${item.id}.svg`}
                  alt={`${item.label} icon`}
                  width={24}
                  height={24}
                  style={{ filter: "brightness(0) invert(1)" }}
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
            padding: "8px 16px",
            mb: 5
          }}
        >
          Create
        </Button>
        <Divider sx={{ width: '80%', margin: '0 auto', borderColor: '#C7BCBC' , mb: 3}} />
        <List sx={{ width: "100%" }}>
          <ListItem
            component="a"
            sx={{
              "& .MuiTypography-root": {
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "24px",
              },
            }}
          >
            <ListItemIcon>
              <Image
                src="/icons/account.svg"
                alt="Account icon"
                width={24}
                height={24}
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
          <ListItem
            component="a"
            sx={{
              "& .MuiTypography-root": {
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "24px",
              },
              marginBottom: '16px'
            }}
          >
            <ListItemIcon>
              <Image
                src="/icons/logout.svg"
                alt="Logout icon"
                width={24}
                height={24}
                style={{ filter: "brightness(0) invert(1)" }}
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
         