import React from "react";
import { Button, Container, Grid, Box, Card, CardContent, Typography,} from "../utils/myMaterial";
import "../style/card.css";

function Cards({showExpenseModal,showIncomeModal,income,expense,currentBalance}) {
  return (
    <div>
      <Container style={{'marginTop' : '20px'}}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid size={4}>     
              <Card style={{'height' : '150px'}}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Current Balance
                    {/* <a href="phonepe://pay?pa=upiaddress@okhdfcbank&pn=JohnDoe&cu=INR" class="upi-pay1">Pay Now !</a> */}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  ₹ {currentBalance}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={4}>
              <Card style={{'height' : '150px'}}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Total Income
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    ₹ {income}
                  </Typography>
                  <Button className='buttoncolor' variant="contained" onClick={showIncomeModal}>
                      Add Income
                    </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={4}>
              <Card style={{'height' : '150px'}}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Total Expense
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  ₹ {expense}
                  </Typography>
                  <Button className='buttoncolor' variant="contained" onClick={showExpenseModal}>
                    Add Expense
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    
    </div>
  );
}

export default Cards;
