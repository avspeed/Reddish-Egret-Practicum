import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import Jobs from "../Jobs"

const Cardmedia = () => {
 return (
  <Container>
   <Grid container spacing={7}>
    <Grid item >
    <Link  href={"/mainPageSections/jobs"} passHref>
     <Card sx={{ maxWidth: 345 }}>
      <CardMedia
       component="img"
       alt="green iguana"
       height="140"
       image="./images/jobs.jpg"
      />
      <CardContent>
       <Typography gutterBottom variant="h4" component="div">
       Jobs and Career
       </Typography>
       <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
       </Typography>
      </CardContent>
      <CardActions>
       <Button size="small">Learn More</Button>
      </CardActions>
     </Card>
     </Link>
    </Grid>
    <Grid item >
    <Link href={"/mainPageSections/housingfood"} passHref>
     <Card sx={{ maxWidth: 345 }}>
      <CardMedia
       component="img"
       alt="green iguana"
       height="140"
       image="./images/housing.jpg"
      />
      <CardContent>
       <Typography gutterBottom variant="h4" component="div">
       Housing And Food
       </Typography>
       <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
       </Typography>
      </CardContent>
      <CardActions>
       <Button size="small">Learn More</Button>
      </CardActions>
     </Card>
     </Link>
    </Grid>
    <Grid item >
    <Link href={"/mainPageSections/educationlanguage"} passHref>
     <Card sx={{ maxWidth: 345 }}>
      <CardMedia
       component="img"
       alt="green iguana"
       height="140"
       image="./images/education.jpg"
      />
      <CardContent>
       <Typography gutterBottom variant="h5" component="div">
       Education and Language
       </Typography>
       <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
       </Typography>
      </CardContent>
      <CardActions>
       <Button size="small">Learn More</Button>
      </CardActions>
     </Card>
     </Link>
    </Grid>
   </Grid>
  </Container>

 )
}

export default Cardmedia;


















// <Link  href={"/mainPageSections/jobs"} passHref>
// <h3>Jobs and Career</h3>
// </Link>

// <Link href={"/mainPageSections/housingfood"} passHref>
// <h3>Housing And Food</h3>
// </Link>

// <Link href={"/mainPageSections/educationlanguage"} passHref>
// <h3>Education and Language</h3>
// </Link>