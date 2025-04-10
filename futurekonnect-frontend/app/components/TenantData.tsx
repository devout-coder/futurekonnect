"use client";

import {
  Box,
  TextField,
  Select,
  MenuItem,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Area,
  ComposedChart,
} from "recharts";

const data = [
  { date: "05 Mar", value: 1000 },
  { date: "06 Mar", value: 1100 },
  { date: "07 Mar", value: 1150 },
  { date: "08 Mar", value: 1120 },
  { date: "09 Mar", value: 1100 },
  { date: "10 Mar", value: 1080 },
  { date: "11 Mar", value: 600 },
];

const tenantData = [
  { no: 1, name: "RUDRA", usage: "22.4 GB" },
  { no: 2, name: "Vashi Office", usage: "34.5 GB" },
  { no: 3, name: "Station Satcom", usage: "64.2 GB" },
  { no: 4, name: "Station Satcom", usage: "64.2 GB" },
  { no: 5, name: "Station Satcom", usage: "64.2 GB" },
  { no: 6, name: "Station Satcom", usage: "64.2 GB" },
  { no: 7, name: "Station Satcom", usage: "64.2 GB" },
  { no: 8, name: "Station Satcom", usage: "64.2 GB" },
  
];

const TenantData = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          padding: "10px",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search for Tenant"
          InputProps={{
            startAdornment: (
              <SearchIcon style={{ color: "white", marginRight: "5px" }} />
            ),
            style: { color: "white", fontFamily: "Montserrat, sans-serif" },
          }}
          sx={{
            backgroundColor: "#172C43",
            borderRadius: "8px",
          }}
        />
        <Select
          defaultValue="30"
          IconComponent={() => (
            <Image
              src="/icons/up_down.svg"
              alt="Search icon"
              width={24}
              height={24}
              style={{ objectFit: "contain" }}
            />
          )}
          sx={{
            width: "200px",
            backgroundColor: "#172C43",
            color: "white",
            padding: "0 13px 0 0",
            borderRadius: "8px",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          <MenuItem value="30">Last 30 Days</MenuItem>
          <MenuItem value="60">Last 60 Days</MenuItem>
          <MenuItem value="90">Last 90 Days</MenuItem>
        </Select>
      </Box>

      <Box
        sx={{
          backgroundColor: "#0C1829",
          borderRadius: "16px",
          padding: "24px",
          mt: 2,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.5fr 1fr" },
            gap: 18,
          }}
        >
          {/* Graph Section */}
          <Box>
            <Card
              sx={{
                backgroundColor: "transparent",
                height: "400px",
                p: 2,
                boxShadow: 'none'
              }}
            >
              <ResponsiveContainer width="100%" height="85%">
                <ComposedChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#4DA6FF"
                        stopOpacity={0.15}
                      />
                      <stop
                        offset="20%"
                        stopColor="#FFFFFF"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="70%"
                        stopColor="#FFFFFF"
                        stopOpacity={0.7}
                      />
                      <stop
                        offset="100%"
                        stopColor="#FFFFFF"
                        stopOpacity={0.85}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    stroke="white"
                    style={{
                      fontSize: "12px",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="white"
                    style={{
                      fontSize: "12px",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    fill="url(#colorValue)"
                    stroke="none"
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#4DA6FF"
                    strokeWidth={4}
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  mt: 2,
                  fontFamily: "Montserrat, sans-serif",
                  textAlign: "center",
                }}
              >
                Tenants Data Usage Pattern
              </Typography>
            </Card>
          </Box>

          {/* Table Section */}
          <Box>
            <Card
              sx={{
                backgroundColor: "transparent",
                height: "400px",
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'none'
              }}
            >
              <TableContainer sx={{ flex: 1, overflow: 'auto' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ 
                        color: 'white', 
                        fontFamily: "Montserrat",
                        fontWeight: 600,
                        fontSize: "15px",
                        lineHeight: "26px",
                        letterSpacing: "0px",
                        borderBottom: "2px solid rgba(255,255,255,1)",
                        paddingLeft: 3
                      }}>No.</TableCell>
                      <TableCell sx={{ 
                        color: 'white', 
                        fontFamily: "Montserrat",
                        fontWeight: 600,
                        fontSize: "15px",
                        lineHeight: "26px",
                        letterSpacing: "0px",
                        borderBottom: "2px solid rgba(255,255,255,1)",
                        paddingLeft: 3
                      }}>Name</TableCell>
                      <TableCell sx={{ 
                        color: 'white', 
                        fontFamily: "Montserrat",
                        fontWeight: 600,
                        fontSize: "15px",
                        lineHeight: "26px",
                        letterSpacing: "0px",
                        borderBottom: "2px solid rgba(255,255,255,1)",
                        paddingLeft: 3
                      }}>Data Usage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tenantData.map((tenant) => (
                      <TableRow
                        key={tenant.no}
                        sx={{
                          backgroundColor: tenant.no % 2 === 0 ? "#4984B500" : "#172C43",
                          '& td': { border: 0 }
                        }}
                      >
                        <TableCell sx={{ 
                          color: 'white', 
                          fontFamily: "Montserrat",
                          fontWeight: 400,
                          fontSize: "13px",
                          lineHeight: "24px",
                          letterSpacing: "0%",
                          paddingLeft: 3
                        }}>{tenant.no}</TableCell>
                        <TableCell sx={{ 
                          color: 'white', 
                          fontFamily: "Montserrat",
                          fontWeight: 400,
                          fontSize: "13px",
                          lineHeight: "24px",
                          letterSpacing: "0%",
                          paddingLeft: 3
                        }}>{tenant.name}</TableCell>
                        <TableCell sx={{ 
                          color: 'white', 
                          fontFamily: "Montserrat",
                          fontWeight: 400,
                          fontSize: "13px",
                          lineHeight: "24px",
                          letterSpacing: "0%",
                          paddingLeft: 3
                        }}>{tenant.usage}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography
                variant="h6"
                sx={{ 
                  color: "white", 
                  mt: 2, 
                  fontFamily: "Montserrat, sans-serif",
                  textAlign: "center"
                }}
              >
                Top Tenants
              </Typography>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TenantData;
