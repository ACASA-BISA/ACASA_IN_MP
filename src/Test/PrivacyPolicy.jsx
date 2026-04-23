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
  { id: "intro", label: "Introduction" },
  { id: "collect", label: "Data We Collect" },
  { id: "why", label: "Why We Collect This Data" },
  { id: "security", label: "Data Storage and Security" },
  { id: "cookies", label: "Cookies and Tracking Technologies" },
  { id: "rights", label: "Your Rights" },
  { id: "retention", label: "Retention and Updates" },
  { id: "contact", label: "Contact and Data Enquiries" }
];

const PrivacyPolicy = () => {
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
          Privacy Policy
        </Typography>

        <Typography variant="h5"
          sx={(theme) =>
          ({
            fontFamily: "Poppins",
            color: theme.palette.text.primary
          })}>
          How ACASA collects, uses, stores, and protects your personal information
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

          <Section id="intro" title="Introduction">
            The ACASA portal is committed to protecting the privacy of its users.
            This Privacy Policy explains what personal data we collect, why we collect it,
            how it is stored and used, and your rights in relation to that data.
            <br /><br />
            This Policy applies to all users of the Portal globally. Where users
            are based in India, the European Union, or the United States,
            ACASA endeavors to comply with applicable regional data protection frameworks
            including India's Digital Personal Data Protection Act 2023 (DPDPA),
            the EU General Data Protection Regulation (GDPR), and the
            California Consumer Privacy Act (CCPA), where relevant.
          </Section>

          <Section id="collect" title="Data We Collect">
            <b>At Registration</b>
            <br />
            When you create an account to access downloadable data, we collect:
            <List sx={{ listStyleType: "disc", pl: 4 }}>

              <ListItem sx={{ display: "list-item" }}>
                Full name
              </ListItem>

              <ListItem sx={{ display: "list-item" }}>
                Email address
              </ListItem>

              <ListItem sx={{ display: "list-item" }}>
                Password (stored in encrypted/hashed form — never in plain text)
              </ListItem>

              <ListItem sx={{ display: "list-item" }}>
                Stated purpose of use
              </ListItem>

            </List>

            <br />
            <b>Automatically Collected</b>
            <br />
            When you use the Portal, we automatically collect certain technical information:
            <List sx={{ listStyleType: "disc", pl: 4 }}>

              <ListItem sx={{ display: "list-item" }}>
                IP address and approximate geographic location
              </ListItem>

              <ListItem sx={{ display: "list-item" }}>
                Browser type, device type, and operating system
              </ListItem>

              <ListItem sx={{ display: "list-item" }}>
                Pages visited, session duration and interaction logs
              </ListItem>

            </List>

            <br />
            <b>What We Do Not Collect</b>
            <br />
            <List sx={{ listStyleType: "disc", pl: 4 }}>
              <ListItem sx={{ display: "list-item" }}>
                Payment or financial information
              </ListItem>

              <ListItem sx={{ display: "list-item" }}>
                Phone numbers or physical addresses
              </ListItem>

              <ListItem sx={{ display: "list-item" }}>
                Sensitive personal data as defined under applicable law (e.g., health, religion, biometric data)
              </ListItem>

            </List>
          </Section>

          <Section id="why" title="Why We Collect This Data">
            Your data is used to authenticate your account, understand how and
            by whom the data is used, improve the Portal, and send important notices
            about data updates or policy changes. It is not used for advertising or
            commercial profiling.
          </Section>

          <Section id="security" title="Data Storage and Security">
            Passwords are stored using industry-standard hashing. Data is held
            on secured servers with restricted access. We do not sell your data.
            It may be shared only with service providers under confidentiality obligations,
            or with authorities when required by law. Aggregate, anonymized usage
            statistics may be reported for institutional purposes.
            <br/><br/>

            <i>
              No method of transmission over the internet or electronic storage is
              completely secure. While we apply commercially reasonable measures to protect
              your data, we cannot guarantee absolute security.
            </i>

          </Section>

          <Section id="cookies" title="Cookies and Tracking Technologies">
            The Portal uses cookies and similar tracking technologies for the following purposes:

            <List sx={{ listStyleType: "disc", pl: 4 }}>
              <ListItem sx={{ display: "list-item" }}>
                Maintaining your login session across pages
              </ListItem>

              <ListItem sx={{ display: "list-item" }}>
                Storing user preferences
              </ListItem>

              <ListItem sx={{ display: "list-item" }}>
                Analyzing aggregate traffic and usage patterns to improve the Portal
              </ListItem>
            </List>

            You may disable cookies via your browser settings. Note that disabling cookies
            may limit certain Portal functionalities, including login persistence.
            We do not use third-party advertising cookies or cross-site tracking.

          </Section>

          <Section id="rights" title="Your Rights">
            You may request access to, correction, or deletion of your personal 
            data at any time by contacting us via <Link href = "https://www.acasa-bisa.org">https://www.acasa-bisa.org</Link>. 
            We will respond within 30 days. Users in India, the EU, and the US have 
            additional rights under applicable regional law (DPDPA, GDPR, CCPA respectively), 
            which we endeavor to honor.

          </Section>

          <Section id="retention" title="Retention and Updates">
            Personal data is retained while your account is active and deleted within 
            30 days of an account deletion request. Anonymized download logs may be 
            kept for up to 24 months. This Policy may be updated periodically; continued 
            use after notification of changes constitutes acceptance.
          </Section>

          <Section id="contact" title="Contact and Data Enquiries">
            If you have questions regarding this policy, please contact: {" "}
            <Link href="mailto:bisaacasa@gmail.com">bisaacasa@gmail.com</Link>.
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

export default PrivacyPolicy;