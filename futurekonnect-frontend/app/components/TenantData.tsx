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
import { useQuery } from '@apollo/client';
import { GET_WEEKLY_DATA_USAGE, GET_TENANT_DATA_USAGE } from '../queries/tenantQueries';
import { useState } from 'react';
import { hasuraClient } from '../../lib/apollo-client';

const TenantData = () => {
  const [selectedDays, setSelectedDays] = useState(30);
  const [searchTerm, setSearchTerm] = useState('%%');

  const getStartDate = (daysAgo: number) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split('T')[0];
  };

  const { data: weeklyData, loading: weeklyLoading } = useQuery(GET_WEEKLY_DATA_USAGE, {
    variables: { 
      startDate: getStartDate(selectedDays),
      searchTerm: searchTerm
    },
    client: hasuraClient
  });

  const { data: tenantData, loading: tenantLoading } = useQuery(GET_TENANT_DATA_USAGE, {
    variables: { 
      startDate: getStartDate(selectedDays),
      searchTerm: searchTerm
    },
    client: hasuraClient
  });

  const handleDaysChange = (event: any) => {
    setSelectedDays(Number(event.target.value));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value ? `%${value}%` : '%%');
  };

  const chartData = weeklyData?.tenants?.reduce((acc: any[], curr: any) => {
    const existingDate = acc.find(item => item.date === curr.date);
    if (existingDate) {
      existingDate.value += curr.data_usage;
      if (!existingDate.tenants) {
        existingDate.tenants = [];
      }
      existingDate.tenants.push({
        name: curr.name,
        usage: curr.data_usage
      });
    } else {
      acc.push({
        date: curr.date,
        value: curr.data_usage,
        tenants: [{
          name: curr.name,
          usage: curr.data_usage
        }]
      });
    }
    return acc;
  }, [])?.map((node: any) => ({
    date: new Date(node.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
    value: node.value,
    tenants: node.tenants
  })) || [];

  const tableData = tenantData?.tenants?.reduce((acc: any[], curr: any) => {
    const existingTenant = acc.find(item => item.name === curr.name);
    if (existingTenant) {
      existingTenant.usage += curr.data_usage;
    } else {
      acc.push({
        name: curr.name,
        usage: curr.data_usage
      });
    }
    return acc;
  }, [])
    ?.sort((a: any, b: any) => b.usage - a.usage)
    ?.map((node: any, index: number) => ({
      no: index + 1,
      name: node.name,
      usage: `${node.usage.toFixed(1)} GB`
    })) || [];


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
          onChange={handleSearchChange}
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
          value={selectedDays}
          onChange={handleDaysChange}
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
          <MenuItem value={7}>Last 7 Days</MenuItem>
          <MenuItem value={30}>Last 30 Days</MenuItem>
          <MenuItem value={60}>Last 60 Days</MenuItem>
          <MenuItem value={90}>Last 90 Days</MenuItem>
        </Select>
      </Box>

      <Box
        sx={{
          backgroundColor: "#0C1829",
          borderRadius: "16px",
          padding: "24px",
          mt: 2,
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#172C43',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#4DA6FF',
            borderRadius: '4px',
          },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.5fr 1fr" },
            gap: { xs: 4, md: 18 },
            minWidth: { xs: "800px", md: "auto" },
          }}
        >
          {/* Graph Section */}
          <Box>
            <Card
              sx={{
                backgroundColor: "transparent",
                height: { xs: "300px", md: "400px" },
                p: 2,
                boxShadow: 'none'
              }}
            >
              <ResponsiveContainer width="100%" height="85%">
                <ComposedChart data={chartData}>
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
                height: { xs: "300px", md: "400px" },
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
                    {tableData.map((tenant: any) => (
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
