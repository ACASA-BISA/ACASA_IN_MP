import React from "react";
import {
  Box,
  Typography,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Button,
  Link
} from "@mui/material";
import { center } from "@turf/turf";

const sections = [
  { id: "overview", label: "License Overview" },
  { id: "permits", label: "What This License Permits" },
  { id: "conditions", label: "License Conditions" },
  { id: "credit", label: "Credit and Institutional Acknowledgement" },
  { id: "scope", label: "Scope of Data Covered" },
];

const License = () => {
  return (
    <Box sx={(theme) => ({ width: "100%", backgroundColor: theme.palette.background.paper })}>

      {/* TITLE BANNER */}

      <Box
        sx={(theme) => ({
          px: { xs: 3, md: 10 },
          py: 15,
          borderBottom: "1px solid",
          borderColor: "divider",
          "backgroundColor": theme.palette.mode === "dark" ? "#61c258" : "#4ba046",
        })}
      >
        <Typography variant="h3"
          sx={(theme) =>
          ({
            fontWeight: 600,
            fontFamily: "Poppins",
            color: theme.palette.text.primary
          })}>
          ACASA Web Atlas License
        </Typography>

        <Typography variant="h5"
          sx={(theme) =>
          ({
            fontFamily: "Poppins",
            color: theme.palette.text.primary
          })}>
          Governing the use, sharing, and adaptation of ACASA data and content
        </Typography>

        <Typography sx={(theme) => ({ mt: 1, fontFamily: "Poppins", color: theme.palette.text.secondary })}>
          Last updated: March 2026
        </Typography>
      </Box>

      {/* MAIN CONTENT */}

      <Grid
        container
        sx={{
          px: { xs: 3, md: 10 },
          py: 6
        }}
        spacing={6}
      >

        {/* LEFT NAVIGATION */}

        <Grid
          item
          xs={12}
          md={3}
          sx={{
            position: "sticky",
            top: 100,
            alignSelf: "flex-start"
          }}
        >

          <Typography
            variant="subtitle2"
            fontWeight={600}
            sx={(theme) => ({
              mb: 2,
              fontFamily: "Poppins",
              color: theme.palette.text.primary,
            })}
          >
            Table of contents
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>

            {sections.map((section) => (
              <Button
                key={section.id}
                variant="text"
                onClick={() => {
                  const el = document.getElementById(section.id);
                  if (el) {
                    el.scrollIntoView({
                      behavior: "smooth",
                      block: "start"
                    });
                  }
                }}
                sx={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  textAlign: "left",
                  textTransform: "none",
                  fontFamily: "Poppins",
                  color: "text.secondary",
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 1,
                  whiteSpace: "normal",
                  lineHeight: 1.4,
                  "&:hover": {
                    backgroundColor: "action.hover",
                    color: "text.primary"
                  }
                }}
              >
                {section.label}
              </Button>
            ))}

          </Box>

        </Grid>

        {/* Content */}

        <Grid item xs={12} md={7}>

          <Section id="overview" title="License Overview">
            The Atlas of Climate Adaptation in South Asian Agriculture (ACASA)
            is made freely available under the Creative Commons
            Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0).
            <br />
            License link : CC BY-NC-SA 4.0  |  {" "}
            <Link href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
              https://creativecommons.org/licenses/by-nc-sa/4.0/
            </Link>
          </Section>

          <Section id="permits" title="What This License Permits">
            Under CC BY-NC-SA 4.0, users are permitted to:
            <List>
              <ul>•	Share — copy and redistribute the material in any medium or format</ul>
              <ul>•	Adapt — remix, transform, and build upon the material</ul>
            </List>
            These permissions apply for any purpose other than commercial use, as long as the conditions below are followed.
          </Section>

          <Section id="conditions" title="License Conditions">
            <b>Attribution</b>
            <br />
            You must give appropriate credit to the co-owning institutions, provide a
            link to the license, and indicate if any changes were made. This must be done
            in a reasonable manner, but not in any way that suggests the licensors endorse your use.
            <br /> <br />
            <i>Recommended citation: BISA, BARC, ICAR, NARC, & NRMC. (2025).
              Atlas of Climate Adaptation in South Asian Agriculture (ACASA).
              Borlaug Institute for South Asia. {" "}
              <Link href="https://www.acasa-bisa.org">https://www.acasa-bisa.org</Link></i>

            <br /> <br />

            <b>NonCommercial</b>
            <br />
            You may not use the material for commercial purposes. This means you may not sell,
            license, or otherwise use the data in a way that is primarily intended for or directed
            toward commercial advantage or monetary compensation.

            <br /> <br />

            <b>ShareAlike</b>
            <br />
            If you remix, transform, or build upon the material, you must distribute your contributions
            under the same CC BY-NC-SA 4.0 license as the original. You may not apply legal terms or
            technological measures that legally restrict others from doing anything the license permits.
          </Section>

          <Section id="credit" title="Credit and Institutional Acknowledgement">
            ACASA is co-developed and co-owned by the following regional partner institutions in South Asia:
            <List>
              <ul>•	Borlaug Institute for South Asia (BISA)</ul>
              <ul>•	Bangladesh Agricultural Research Council (BARC)</ul>
              <ul>•	Indian Council of Agricultural Research (ICAR)</ul>
              <ul>•	Nepal Agricultural Research Council (NARC)</ul>
              <ul>•	Natural Resources Management Centre (NRMC), Sri Lanka</ul>
            </List>
            The initiative is partially funded by the Bill & Melinda Gates Foundation.
            We gratefully acknowledge the contributions of scientists, data analysts,
            and technical experts across institutions who played a key role in developing
            and validating the data and methodologies presented in the Atlas.
          </Section>

          <Section id="scope" title="Scope of Data Covered">
            ACASA provides information on commodity-specific climatic hazards,
            risks, impacts, and adaptation options for 15 crops and 6 livestock
            commodities across South Asian agricultural systems. Data is provided for:
            <List>
              <ul>•	Current (baseline) conditions</ul>
              <ul>•	Future scenarios including SSP2-4.5 and SSP5-8.5</ul>
            </List>
            The methodological approach has been unanimously developed and agreed
            upon by all five co-owning institutions listed above.
          </Section>

        </Grid>

        {/* RIGHT SPACING COLUMN */}

        <Grid item md={2} />
      </Grid>
    </Box>
  );
};

const Section = ({ id, title, children }) => (
  <Box
    id={id}
    sx={{
      mb: 6,
      scrollMarginTop: "120px"
    }}
  >

    <Typography variant="h5" align="left"
      sx={(theme) => ({
        fontWeight: 600,
        fontFamily: "Poppins",
        color: theme.palette.text.primary
      })}
      gutterBottom>
      {title}
    </Typography>

    <Divider sx={{ mb: 2 }} />

    <Typography variant="body1" align="left" sx={(theme) => ({ lineHeight: 1.8, fontFamily: "Poppins", color: theme.palette.text.primary })}>
      {children}
    </Typography>

  </Box>
);

export default License;