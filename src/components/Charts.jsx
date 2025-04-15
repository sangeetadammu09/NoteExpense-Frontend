import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import {
  Button, Container, Grid, Box, Card, CardHeader, CardContent, IconButton, Menu, MenuItem, MoreVertIcon,
  InputLabel, FormControl, Select,OutlinedInput} from "../utils/myMaterial";

import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 130,
    },
  },
};

function Charts({ incomeData, expenseData, labelData, handleYearChange,selectedYear}) {

  const [yearData, setYearData] = useState([]);
  const options = [
    'Income',
    'Expense',
    'Both'
  ];

  const seriesBarData = [
    { data: incomeData, label: 'Income' },
    { data: expenseData, label: 'Expense' },
  ]

  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = useState(null);
 // const [seriesData, setSeriesData] = useState(seriesBarData);
  const [barOption, setBarOption] = useState('Both');
  const open = Boolean(anchorEl);


  const { user } = useAuthStore();


  const getYearData = (startYear, endYear) => {
    const yearData = [];
    for (let i = startYear; i <= endYear; i++) {
      yearData.push(i)
    }

    setYearData(yearData)
  }

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    getYearData(currentYear - 2, currentYear + 10)
    // console.log(user)


  }, [])
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGraphChange = (option) =>{
    console.log(option);
    setBarOption(option);

    // let incomeSeriesData = [
    //   { data: incomeData, label: 'Income' },
    // ]

    // let expenseSeriesData = [
    //   { data: expenseData, label: 'Expense' },
    // ]

    // let bothSeriesData = [
    //   { data: incomeData, label: 'Income' },
    //   { data: expenseData, label: 'Expense' }
    // ]


    // option == 'Income' ? setSeriesData(incomeSeriesData) : null

  }

  useEffect(()=>{
   // handleGraphChange('Income')
  },[])


  return (

    <div>
      <Container style={{ 'marginTop': '20px' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid size={8}>
              <Card>
                <CardHeader action={
                  <div>
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      slotProps={{
                        paper: {
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                          },
                        },
                      }}
                    >
                      {options.map((option) => (
                        <MenuItem key={option} selected={option === barOption} onClick={()=>{handleClose,handleGraphChange(option)}}>
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                }
                  title="Transaction Chart" />

                <FormControl sx={{ m: 1, minWidth: 130 }} size="small">
                  <InputLabel id="demo-simple-select-label">Select Year</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={selectedYear}
                    onChange={handleYearChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                  >
                    {yearData.map((x) => (
                      <MenuItem value={x} key={x}>{x}</MenuItem>
                    ))}
                  </Select>

                </FormControl>

                <BarChart width={700} height={300}
                  series={ barOption == 'Both' ? [
                    { data: incomeData, label: 'Income' },
                    { data: expenseData, label: 'Expense' }
                  ] : barOption == 'Income' ? [
                    { data: incomeData, label: 'Income' }
                  ] : [
                    { data: expenseData, label: 'Expense' }
                  ]}
                  xAxis={[{ data: labelData, scaleType: 'band' }]}
                />

              </Card>
            </Grid>
            <Grid size={4}>
              <Card style={{ 'height': '420px' }}>            
                <CardContent>
                <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: 'series A' },
                      { id: 1, value: 15, label: 'series B' },
                      { id: 2, value: 20, label: 'series C' },
                    ],
                  },
                ]}
                margin={{ right: 0, top: 0,bottom :10 }}
                width={300}
                height={400}
                slotProps={{
                  legend: {
                    direction: 'row',
                    position: { vertical: 'bottom', horizontal: 'middle' },
                    margin:{ right: 0, top: 0 }
                  },
                }}
       
              />



                </CardContent>
            
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>

    </div>
  )
}

export default Charts