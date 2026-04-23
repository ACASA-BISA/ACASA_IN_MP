import React from "react";
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Link,
  Button
} from "@mui/material";

const sections = [
  { id: "terms", label: "Acceptance of Terms" },
  { id: "account", label: "Account Registration and Downloads" },
  { id: "use", label: "Acceptable Use" },
  { id: "amends", label: "Modifications and Availability" },
  { id: "neutral", label: "Territorial and Political Neutrality" },
  { id: "disclaimer", label: "Disclaimers and Limitation of Liability" },
  { id: "contact", label: "Contact Us" }
];

const TermsOfService = () => {
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
          Terms Of Service
        </Typography>

        <Typography variant="h5"
          sx={(theme) =>
          ({
            fontFamily: "Poppins",
            color: theme.palette.text.primary
          })}>
          Governing access to and use of the ACASA web portal and its datasets
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

          <Section id="terms" title="Acceptance of Terms">
            By accessing, browsing, or downloading data from the ACASA web portal
            (hereinafter "the Portal"), you acknowledge that you have read, understood,
            and agree to be bound by these Terms of Service. If you do not agree,
            you must discontinue use of the Portal immediately.
            <br /><br />
            These Terms apply to all user categories, including but not limited to:
            general public users, academic researchers, government planners,
            non-governmental organizations, and private sector users.
          </Section>

          <Section id="account" title="Account Registration and Downloads">
            Downloading data requires a registered account. By registering, you agree to 
            provide accurate details — including your name, email address, and intended purpose 
            of use — and to keep your credentials confidential. You are responsible for all activity under your account.
          </Section>

          <Section id="use" title="Acceptable Use">
            Users agree to use the Portal and its data only for lawful, non-commercial purposes
            consistent with the CC BY-NC-SA 4.0 license (Section 1). Users must not:
             <List sx={{ listStyleType: "disc", pl: 4 }}>
              <ListItem sx={{ display: "list-item" }}>
                Use automated tools or scripts to bulk-download data without prior written consent
              </ListItem>

              <ListItem sx={{ display: "list-item" }}>
                Attempt unauthorized access to the Portal or its underlying systems
              </ListItem>

              <ListItem sx={{ display: "list-item" }}>
                Remove or misrepresent attribution markers in downloaded files
              </ListItem>

               <ListItem sx={{ display: "list-item" }}>
                Use the data in violation of applicable law
              </ListItem>
            </List>
          </Section>

          <Section id="amends" title="Modifications and Availability">
            BISA and research partners (BISA, BARC, ICAR, NARC, and NRMC) reserve the right to 
            modify, suspend, or discontinue any part of the Portal — including data, features, 
            or access — at any time, with or without notice. Continued use following any posted 
            amendment to these Terms constitutes acceptance. 
          </Section>

          <Section id="neutral" title="Territorial and Political Neutrality">
            Designations and material in the ACASA Atlas do not imply any opinion on the legal 
            or development status of any country, territory, or authority, nor on the delimitation 
            of any frontiers or boundaries.
          </Section>

          <Section id="disclaimer" title="Disclaimers and Limitation of Liability">
            BISA and research partners make no warranties — express or implied — regarding 
            the accuracy, completeness, timeliness, or uninterrupted availability of the 
            Portal or its data. Under no circumstances shall BISA, its research partners, 
            vendors, or representatives be liable for any loss or damage arising from use of, 
            or reliance on, the Portal — including errors in data, service interruptions, 
            or software and connectivity failures.
          </Section>

          <Section id="contact" title="Contact Us">
            For questions or concerns regarding these Terms of Service, please contact the ACASA team via 
            the contact details available at: {" "} <Link href="https://www.acasa-bisa.org">https://www.acasa-bisa.org</Link>
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

export default TermsOfService;