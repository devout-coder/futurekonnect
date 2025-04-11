"use client";

import Layout from "../components/Layout";
import Image from "next/image";
import {
  Typography,
  Box,
  Card,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  TextField,
  IconButton,
  FormGroup,
  Divider,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_AUDIT_TRAIL = gql`
  query GetAuditTrail($where: audit_trail_bool_exp) {
    audit_trail(where: $where, order_by: {time: desc}) {
      id
      time
      description
      event
      category
      performed_by
    }
  }
`;

type ActionType = 'create' | 'delete' | 'update' | 'download';

interface Actions {
  create: boolean;
  delete: boolean;
  update: boolean;
  download: boolean;
}

export default function AuditTrail() {
  const [category, setCategory] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [actions, setActions] = useState<Actions>({
    create: false,
    delete: false,
    update: false,
    download: false,
  });
  const [searchUser, setSearchUser] = useState('');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleActionChange = (action: ActionType) => {
    setActions(prev => ({
      ...prev,
      [action]: !prev[action]
    }));
  };

  // Build the where clause for the GraphQL query
  const buildWhereClause = () => {
    const where: any = {};

    if (category) {
      where.category = { _eq: category };
    }

    if (startDate || endDate) {
      where.time = {};
      if (startDate) {
        where.time._gte = startDate.toISOString();
      }
      if (endDate) {
        where.time._lte = endDate.toISOString();
      }
    }

    if (searchUser) {
      where.performed_by = { _ilike: `%${searchUser}%` };
    }

    const selectedActions = Object.entries(actions)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    if (selectedActions.length > 0) {
      where.event = { _in: selectedActions };
    }

    return where;
  };

  const { data } = useQuery(GET_AUDIT_TRAIL, {
    variables: {
      where: buildWhereClause()
    }
  });

  const auditTrailData = data?.audit_trail || [];
  const currentPageData = auditTrailData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Layout>
      <div style={{ width: '100%' }}>
        <h1 style={{
          fontFamily: "Montserrat",
          fontWeight: 500,
          fontSize: "36px",
          lineHeight: "48px",
          letterSpacing: "0px",
          marginBottom: '24px'
        }}>Audit Trail</h1>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Montserrat',
            fontWeight: 500,
            fontSize: '15px',
            lineHeight: '24px',
            letterSpacing: '0%'
          }}>
            <Image
              src="/icons/download.svg"
              alt="Download icon"
              width={20}
              height={20}
            />
            Download logs
          </button>
        </div>

        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ width: '280px' }}>
            <FormControl fullWidth sx={{ marginBottom: '24px' }}>
              <Typography
                sx={{
                  color: '#fff',
                  fontFamily: 'Montserrat',
                  fontWeight: 600,
                  fontSize: '15px',
                  lineHeight: '26px',
                  letterSpacing: '0px',
                  marginBottom: '8px'
                }}
              >
                Category
              </Typography>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                displayEmpty
                sx={{
                  backgroundColor: '#0C1829',
                  color: '#fff',
                  '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                  '& .MuiSelect-select': {
                    fontFamily: 'Montserrat',
                    fontSize: '14px'
                  },
                  '& .MuiSelect-icon': {
                    color: '#8D9299'
                  }
                }}
              >
                <MenuItem value="">
                  <Typography sx={{ color: '#8D9299', fontFamily: 'Montserrat' }}>
                    Select an option
                  </Typography>
                </MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Firewall Rule">Firewall Rule</MenuItem>
                <MenuItem value="Router Certificate">Router Certificate</MenuItem>
                <MenuItem value="Hotspot User">Hotspot User</MenuItem>
                <MenuItem value="Firewall Template">Firewall Template</MenuItem>
                <MenuItem value="Router">Router</MenuItem>
              </Select>
            </FormControl>

            <Divider sx={{ backgroundColor: '#8D9299', marginBottom: '24px' }} />

            <Typography
              sx={{
                color: '#fff',
                fontFamily: 'Montserrat',
                fontWeight: 600,
                fontSize: '15px',
                lineHeight: '26px',
                letterSpacing: '0px',
                marginBottom: '8px'
              }}
            >
              Action
            </Typography>
            <FormGroup sx={{ marginBottom: '24px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={actions.create}
                    onChange={() => handleActionChange('create')}
                    sx={{
                      color: '#fff',
                      '&.Mui-checked': {
                        color: '#4DABF7',
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: '#fff', fontFamily: 'Montserrat', fontSize: '14px' }}>
                    Create
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={actions.delete}
                    onChange={() => handleActionChange('delete')}
                    sx={{
                      color: '#fff',
                      '&.Mui-checked': {
                        color: '#4DABF7',
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: '#fff', fontFamily: 'Montserrat', fontSize: '14px' }}>
                    Delete
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={actions.update}
                    onChange={() => handleActionChange('update')}
                    sx={{
                      color: '#fff',
                      '&.Mui-checked': {
                        color: '#4DABF7',
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: '#fff', fontFamily: 'Montserrat', fontSize: '14px' }}>
                    Update
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={actions.download}
                    onChange={() => handleActionChange('download')}
                    sx={{
                      color: '#fff',
                      '&.Mui-checked': {
                        color: '#4DABF7',
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: '#fff', fontFamily: 'Montserrat', fontSize: '14px' }}>
                    Download
                  </Typography>
                }
              />
            </FormGroup>

            <Divider sx={{ backgroundColor: '#8D9299', marginBottom: '24px' }} />

            <FormControl fullWidth sx={{ marginBottom: '24px' }}>
              <Typography
                sx={{
                  color: '#fff',
                  fontFamily: 'Montserrat',
                  fontWeight: 600,
                  fontSize: '15px',
                  lineHeight: '26px',
                  letterSpacing: '0px',
                  marginBottom: '8px'
                }}
              >
                User
              </Typography>
              <TextField
                fullWidth
                placeholder="Search user"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#8D9299' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#0C1829',
                    '& fieldset': { border: 'none' },
                    '& input': {
                      color: '#fff',
                      fontFamily: 'Montserrat',
                      fontSize: '14px',
                      '&::placeholder': {
                        color: '#9BA0A8',
                        opacity: 1
                      }
                    }
                  }
                }}
              />
            </FormControl>

            <Divider sx={{ backgroundColor: '#8D9299', marginBottom: '24px' }} />

            <Typography
              sx={{
                color: '#fff',
                fontFamily: 'Montserrat',
                fontWeight: 600,
                fontSize: '15px',
                lineHeight: '26px',
                letterSpacing: '0px',
                marginBottom: '8px'
              }}
            >
              Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div style={{ marginBottom: '16px' }}>
                <Typography
                  sx={{
                    color: '#fff',
                    fontFamily: 'Montserrat',
                    fontSize: '14px',
                    marginBottom: '8px'
                  }}
                >
                  Start date
                </Typography>
                <DatePicker
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  format="dd-MM-yyyy"
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#0C1829',
                      color: '#fff',
                      '& fieldset': { border: 'none' },
                      '& input': {
                        color: '#fff',
                        fontFamily: 'Montserrat',
                        fontSize: '14px',
                        '&::placeholder': {
                          color: '#9BA0A8',
                          opacity: 1
                        }
                      }
                    },
                    '& .MuiIconButton-root': {
                      color: '#8D9299'
                    }
                  }}
                  slotProps={{
                    textField: {
                      FormHelperTextProps: {
                        sx: {
                          display: 'none'
                        }
                      }
                    }
                  }}
                />
              </div>
              <div>
                <Typography
                  sx={{
                    color: '#fff',
                    fontFamily: 'Montserrat',
                    fontSize: '14px',
                    marginBottom: '8px'
                  }}
                >
                  End date
                </Typography>
                <DatePicker
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  format="dd-MM-yyyy"
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#0C1829',
                      color: '#fff',
                      '& fieldset': { border: 'none' },
                      '& input': {
                        color: '#fff',
                        fontFamily: 'Montserrat',
                        fontSize: '14px',
                        '&::placeholder': {
                          color: '#9BA0A8',
                          opacity: 1
                        }
                      }
                    },
                    '& .MuiIconButton-root': {
                      color: '#8D9299'
                    }
                  }}
                  slotProps={{
                    textField: {
                      FormHelperTextProps: {
                        sx: {
                          display: 'none'
                        }
                      }
                    }
                  }}
                />
              </div>
            </LocalizationProvider>
          </div>

          <div style={{ flex: 1 }}>
            <Card sx={{
              backgroundColor: "#0C1829",
              borderRadius: "0px",
              boxShadow: 'none'
            }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#09111B" }}>
                      <TableCell sx={{ 
                        color: 'white', 
                        fontFamily: "Montserrat",
                        fontWeight: 600,
                        fontSize: "15px",
                        lineHeight: "26px",
                        letterSpacing: "0px",
                        borderBottom: "2px solid rgba(255,255,255,1)",
                        paddingLeft: 3
                      }}>Time</TableCell>
                      <TableCell sx={{ 
                        color: 'white', 
                        fontFamily: "Montserrat",
                        fontWeight: 600,
                        fontSize: "15px",
                        lineHeight: "26px",
                        letterSpacing: "0px",
                        borderBottom: "2px solid rgba(255,255,255,1)",
                        paddingLeft: 3
                      }}>Description</TableCell>
                      <TableCell sx={{ 
                        color: 'white', 
                        fontFamily: "Montserrat",
                        fontWeight: 600,
                        fontSize: "15px",
                        lineHeight: "26px",
                        letterSpacing: "0px",
                        borderBottom: "2px solid rgba(255,255,255,1)",
                        paddingLeft: 3
                      }}>Event</TableCell>
                      <TableCell sx={{ 
                        color: 'white', 
                        fontFamily: "Montserrat",
                        fontWeight: 600,
                        fontSize: "15px",
                        lineHeight: "26px",
                        letterSpacing: "0px",
                        borderBottom: "2px solid rgba(255,255,255,1)",
                        paddingLeft: 3
                      }}>Category</TableCell>
                      <TableCell sx={{ 
                        color: 'white', 
                        fontFamily: "Montserrat",
                        fontWeight: 600,
                        fontSize: "15px",
                        lineHeight: "26px",
                        letterSpacing: "0px",
                        borderBottom: "2px solid rgba(255,255,255,1)",
                        paddingLeft: 3
                      }}>Performed By</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentPageData.map((row: any, index: number) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          backgroundColor: index % 2 === 0 ? "#4984B500" : "#172C43",
                          '& td': { border: 0 },
                          '&:not(:last-child)': {
                            borderBottom: '1px solid #505A68'
                          }
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
                        }}>{new Date(row.time).toLocaleString()}</TableCell>
                        <TableCell sx={{ 
                          color: 'white', 
                          fontFamily: "Montserrat",
                          fontWeight: 400,
                          fontSize: "13px",
                          lineHeight: "24px",
                          letterSpacing: "0%",
                          paddingLeft: 3
                        }}>{row.description}</TableCell>
                        <TableCell sx={{ 
                          color: 'white', 
                          fontFamily: "Montserrat",
                          fontWeight: 400,
                          fontSize: "13px",
                          lineHeight: "24px",
                          letterSpacing: "0%",
                          paddingLeft: 3
                        }}>{row.event}</TableCell>
                        <TableCell sx={{ 
                          color: 'white', 
                          fontFamily: "Montserrat",
                          fontWeight: 400,
                          fontSize: "13px",
                          lineHeight: "24px",
                          letterSpacing: "0%",
                          paddingLeft: 3
                        }}>{row.category}</TableCell>
                        <TableCell sx={{ 
                          color: 'white', 
                          fontFamily: "Montserrat",
                          fontWeight: 400,
                          fontSize: "13px",
                          lineHeight: "24px",
                          letterSpacing: "0%",
                          paddingLeft: 3
                        }}>{row.performed_by}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  component="div"
                  count={auditTrailData.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[8, 16, 24]}
                  sx={{
                    color: 'white',
                    '.MuiTablePagination-select': {
                      color: 'white'
                    },
                    '.MuiTablePagination-selectIcon': {
                      color: 'white'
                    },
                    '.MuiTablePagination-displayedRows': {
                      fontFamily: 'Montserrat'
                    },
                    '.MuiTablePagination-selectLabel': {
                      fontFamily: 'Montserrat'
                    }
                  }}
                />
              </TableContainer>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
} 