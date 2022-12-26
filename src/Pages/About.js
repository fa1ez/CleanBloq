import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Navbar from "../components/Navbar";

export default function About({login}) {
  return (
    <div>
      <Navbar showLoginButton={!login}/>
      {/* <Grid container justify="center" padding={3} marginTop={3}> */}
      <Container>
      <Typography variant="h3" marginTop={5}>
          About us:
        </Typography>
        <Typography
          width="100%"
          align="center"
          variant="p"
          alignItems="center"
          direction="column"
        >
          Payat campaigns make ideas into reality. It's where creators share new
          visions for creative work with the communities that will come together
          to fund them.
          No matter what, creators always control how the work comes together—no
          100-page grant applications, no donors demanding you modify your
          message, no last-minute edits from investors. When backers chip in
          funding and help spread the word, they too become part of these
          independent works.
        </Typography>
        </Container>
        <Container>
          <Typography variant="h3" marginTop={5}>
            Our community:
          </Typography>
          <Typography
            width="100%"
            align="center"
            variant="p"
            alignItems="center"
            direction="column"
            justifyContent="center"
          >
            Tapping into our community starts with activating your own. Most
            successful projects build a snowball effect, winning over friends
            and early supporters who then share the idea with their networks,
            and signal their support to the wider Kickstarter community. The
            snowball can get pretty big. Over 22 million people, from every
            continent on earth, have helped fund Kickstarter projects.
          </Typography>
        </Container>
      {/* </Grid> */}
    </div>
  );
}