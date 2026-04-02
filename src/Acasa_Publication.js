import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Checkbox,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  MenuItem,
  Select,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useTheme } from "@mui/material/styles";

const Publications = () => {
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);

  const publicationTypes = [
    "Journal Article",
    "Working Paper",
    "Brochure",
    "Data Brief",
    "News",
    "Interview",
  ];

  const publicationStatus =
    [
      "Published",
      "Preprint"
    ]

  const publications = [
    {
      title: "Hotspots of climate-smart agriculture and climatic risks in India",
      author: "Kaushik Bora, Paresh B. Shirsath, Pramod K. Aggarwal",
      year: "2025",
      type: "Journal Article",
      status: "Published",
      journal: "Regional Environmental Change",
      link: "https://doi.org/10.1007/s10113-025-02456-z",
      medium: "Read",
    },
    {
      title: "Climate-smart and risk-resilient adaptation strategies for potato production: a meta-analysis for South Asia",
      author: "M.A. Ansari, Himanshu Joshi, Priyanka Mehta, Aniket Deo, Kaushik Bora, C.A. Rama Rao, V.K. Singh, N. Ravisankar, Sunil Kumar, Raghavendra Singh, S.K. Bandyopadhyay, Pramod K. Aggarwal",
      year: "2025",
      type: "Journal Article",
      status: "Published",
      journal: "Environmental Challenges",
      link: "https://www.sciencedirect.com/science/article/pii/S2667010025001027",
      medium: "Read",
    },
    {
      title: "Adapting sorghum and other millets to climate challenges: An integrated bibliometric and meta-analysis of global literature",
      author: "V. Visha Kumari, Aniket Deo, Kaushik Bora, C.A. Rama Rao, B.M.K. Raju, M.A. Sarath Chandran, K. Sriram, V.K. Singh, Pramod K. Aggarwal",
      year: "2025",
      type: "Journal Article",
      status: "Published",
      journal: "Journal of Agriculture and Food Research",
      link: "https://www.sciencedirect.com/science/article/pii/S2666154325003588",
      medium: "Read",
    },
    {
      title: "Identifying resource-conscious and low-carbon agricultural development pathways through land use modelling",
      author: "Aniket Deo, Paresh B. Shirsath, Pramod K. Aggarwal",
      year: "2024",
      type: "Journal Article",
      status: "Published",
      journal: "Land Use Policy",
      link: "https://doi.org/10.1016/j.landusepol.2024.107208",
      medium: "Read",
    },
    {
      title: "Climate Hazard Linked Adaptation Options for Soybean in South Asian Region – A Meta-Analysis",
      author: "Boopathi Gopalakrishnan, Eshwarayya Bhavani, V. Visha Kumari, Niveta Jain, Nobin Chandra Paul, Aniket Deo, Roshan Babu Ojha, C. A. Rama Rao, Pramod Kumar Aggarwal",
      year: "2026",
      type: "Journal Article",
      status: "Published",
      journal: "Soil Science and Plant Nutrition",
      link: "https://link.springer.com/article/10.1007/s42729-025-02853-7",
      medium: "Read",
    },
    {
      title: "Effect of climate change adaptation options on maize yield across different agro-climatic zones in South Asia. A meta-analysis",
      author: "Niveta Jain, Himanshi Verma, Aniket Deo, Kaushik Bora, Prashant Narayan Vishwakarma, Arti Bhatia, Bidisha Chakrabarti, V. Visha Kumari, C. A. Rama Rao, Pramod K. Aggarwal",
      year: "2025",
      type: "Journal Article",
      status: "Published",
      journal: "Agronomy for Sustainable Development",
      link: "https://link.springer.com/article/10.1007/s13593-025-01075-6",
      medium: "Read",
    },
    {
      title: "Climatic stresses and adaptation options for South Asian wheat: A systematic literature review",
      author: "Bidisha Chakrabarti, Arti Bhatia, Aniket Deo, Maitreya, Niveta Jain, V. Visha Kumari, C. A. Rama Rao, Pramod K. Aggarwal",
      year: "2025",
      type: "Journal Article",
      status: "Published",
      journal: "Frontiers in Agronomy",
      link: "https://www.frontiersin.org/journals/agronomy/articles/10.3389/fagro.2025.1670235/full",
      medium: "Read",
    },
    {
      title: "Who adopts what? A systematic global review of gender dynamics in climate-smart agriculture",
      author: "Riya Gupta, Kaushik Bora, Prasun K. Gangopadhyay, Pramod K. Aggarwal",
      year: "2026",
      type: "Journal Article",
      status: "Published",
      journal: "Agricultural Systems",
      link: "https://www.sciencedirect.com/science/article/pii/S0308521X26000569?dgcid=coauthor",
      medium: "Read",
    },
    {
      title: "Gender Responsive Technology Assessment Index: Scaling Inclusive Climate Smart Interventions in Data-Limited Settings",
      author: "Kaushik Bora, Riya Gupta, Prasun K. Gangopadhyay, C.A. Rama Rao, B.M.K. Raju, Bibek Sapkota, Pramod K. Aggarwal",
      year: "2025",
      type: "Working Paper",
      status: "Preprint",
      journal: "VeriXiv",
      link: "https://doi.org/10.12688/verixiv.2269.1",
      medium: "Read",
    },
    {
      title: "ACASA: An Open-Source Gridded Atlas of Climate Hazards and Adaptation Options for Agricultural Commodities in South Asia",
      author: "Pramod K. Aggarwal, Paresh B. Shirsath, Prasun K. Gangopadhyay, Hamidur Rahman, C.A. Rama Rao, Roshan B Ojha, Upul K. Rathnayake, Sanjit Maiti, Anasuya Barik, Aniket Deo, Kaushik Bora, S.K. Bandyopadhyay, Saumya Singh, Uttam Puri Goswami, Purvanii Pragya, Riya Gupta",
      year: "2025",
      type: "Working Paper",
      status: "Preprint",
      journal: "VeriXiv",
      link: "https://doi.org/10.12688/verixiv.2121.1",
      medium: "Read",
    },
    {
      title: "Climate Adaptation in South Asian Livestock Production Systems: Emerging Trends and Contextual Insights for Policy Imperatives",
      author: "Sanjit Maiti, Amitava Panja, Aniket Deo, Kaushik Bora, Sanchita Garai, Paresh Shirsath, C.A. Rama Rao, Pramod K. Aggarwal",
      year: "2025",
      type: "Working Paper",
      status: "Preprint",
      journal: "VeriXiv",
      link: "https://doi.org/10.12688/verixiv.2338.1",
      medium: "Read",
    },
    {
      title: "Identifying Climatic Risk Hotspots for the Dairy Production System of South Asia: An Integrated Analysis with Projections for 2050s and 2080s",
      author: "Sanjit Maiti, Kaushik Bora, Siddhesh Zade, Brijesh Yadav, Sunita Sanjyal, Paresh Shirsath, Sanchita Garai, Rukhsana Amin Runa, WMPB Weerasinghe, Philip Thorton, Pramod K. Aggarwal",
      year: "2026",
      type: "Working Paper",
      status: "Preprint",
      journal: "VeriXiv",
      link: "https://doi.org/10.12688/verixiv.2806.1",
      medium: "Read",
    },
    {
      title: "Climate risks and adaptation options for oilseed crops in South Asia",
      //author: "",
      year: "2025",
      type: "Data Brief",
      //status: "",
      //journal: "",
      link: "https://hdl.handle.net/10883/35931",
      medium: "Read",
    },
    {
      title: "Climate risk and adaptation options for cattle in South Asia",
      //author: "",
      year: "2025",
      type: "Data Brief",
      //status: "",
      //journal: "",
      link: "https://hdl.handle.net/10883/35470",
      medium: "Read",
    },
    {
      title: "ACASA: risk characterisation and adaptation technology for rice in South Asia",
      //author: "",
      year: "2024",
      type: "Data Brief",
      //status: "",
      //journal: "",
      link: "https://hdl.handle.net/10883/34565",
      medium: "Read",
    },
    {
      title: "South Asia Gets Its First Climate Adaptation Atlas for Resilient Agriculture",
      //author: "",
      year: "2025",
      type: "News",
      //status: "",
      journal: "CIMMYT-News",
      link: "https://www.cimmyt.org/news/south-asia-gets-its-first-climate-adaptation-atlas-for-resilient-agriculture/",
      medium: "Read",
    },
    {
      title: "Experts stress joint public-private efforts for climate-resilient agriculture",
      //author: "",
      year: "2025",
      type: "News",
      //status: "",
      journal: "Dhaka Tribune",
      link: "https://www.dhakatribune.com/bangladesh/agriculture/384332/experts-stress-joint-public-private-efforts-for",
      medium: "Read",
    },
    {
      title: "ACASA will strengthen Nepal's commitment towards climate-resilient agriculture",
      //author: "",
      year: "2023",
      type: "Interview",
      //status: "",
      journal: "TV Today",
      link: "https://www.facebook.com/watch/?v=368122882369588",
      medium: "Watch",
    },
    {
      title: "काठमाडौंमा सार्कका कृषि वैज्ञानिकहरुको सम्मेलन",
      //author: "",
      year: "2023",
      type: "News",
      //status: "",
      journal: "Kantipur TV",
      link: "https://kantipurtv.com/business/2023/12/12/1702374469.html",
      medium: "Read",
    },
    {
      title: "NARC collaborates with BISA to foster Nepal's commitment towards climate-resilient agriculture",
      //author: "",
      year: "2023",
      type: "Interview",
      //status: "",
      journal: "Ujjyalo",
      link: "https://ujyaaloonline.com/show/23438",
      medium: "Listen",
    },
    {
      title: "South Asia to get its first Climate Adaptation Atlas in Agriculture",
      //author: "",
      year: "2023",
      type: "News",
      //status: "",
      journal: "AgroSpectrum Asia",
      link: "https://agrospectrumasia.com/2023/04/26/south-asia-to-get-its-first-climate-adaptation-atlas-in-agriculture.html",
      medium: "Read",
    },
    {
      title: "ICAR– Borlaug Institute for South Asia Jointly Organise NICRA Review and ACASA–India Launch Workshop",
      //author: "",
      year: "2026",
      type: "News",
      //status: "",
      journal: "Press Information Bureau, Govt of India",
      link: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2217675&reg=3&lang=1",
      medium: "Read",
    },
    {
      title: "Govt launches digital climate atlas as 15-yr resilience programme reaches 'critical juncture'",
      //author: "",
      year: "2026",
      type: "News",
      //status: "",
      journal: "The Economic Times",
      link: "https://m.economictimes.com/news/india/govt-launches-digital-climate-atlas-as-15-yr-resilience-programme-reaches-critical-juncture/amp_articleshow/127295184.cms",
      medium: "Read",
    },
    {
      title: "ICAR launches ACASA website to promote climate-resilient agriculture",
      //author: "",
      year: "2026",
      type: "News",
      //status: "",
      journal: "Tribune India",
      link: "https://www.tribuneindia.com/news/science-technology/icar-launches-acasa-website-to-promote-climate-resilient-agriculture/amp",
      medium: "Read",
    },
  ];

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();

  const allAuthors = React.useMemo(() => {
    const authorsMap = new Map(); // normalized → display value

    publications.forEach((pub) => {
      if (!pub.author) return;

      pub.author.split(",").forEach((raw) => {
        const clean = raw.trim();
        const key = normalize(clean);

        if (!authorsMap.has(key)) {
          authorsMap.set(key, clean); // preserve original casing
        }
      });
    });

    return Array.from(authorsMap.values()).sort();
  }, [publications]);

  const authorCounts = React.useMemo(() => {
    const counts = {};

    publications.forEach((pub) => {
      pub.author?.split(",").forEach((a) => {
        const key = normalize(a);
        counts[key] = (counts[key] || 0) + 1;
      });
    });

    return counts;
  }, [publications]);

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleAuthorChange = (author) => {
    setSelectedAuthors((prev) =>
      prev.includes(author)
        ? prev.filter((a) => a !== author)
        : [...prev, author]
    );
  };

  const filteredPublications = publications.filter((pub) => {
    // Type filter
    if (
      selectedTypes.length > 0 &&
      !selectedTypes.includes(pub.type)
    ) {
      return false;
    }

    // Author filter
    if (selectedAuthors.length > 0) {
      const pubAuthors = pub.author
        ? pub.author.split(",").map((a) => normalize(a))
        : [];

      const hasMatch = selectedAuthors.some((a) =>
        pubAuthors.includes(normalize(a))
      );

      if (!hasMatch) return false;
    }

    // Search filter
    if (
      searchQuery &&
      !pub.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        py: 6,
        px: { xs: 2, md: 8 },
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      {/* Sidebar Filters */}
      <Box
        sx={{
          flexBasis: { xs: "100%", md: "25%" },
          borderRight: { md: `1px solid ${theme.palette.divider}` },
          pr: { md: 4 },
          mb: { xs: 4, md: 0 },
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontFamily: "Poppins" }}>
          Filters
        </Typography>

        {/* Type filter */}
        <Accordion
          disableGutters
          elevation={0}
          sx={{
            "&:before": { display: "none" },
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600, fontFamily: "Poppins" }}>
              Type
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {publicationTypes.map((type) => (
              <FormControlLabel
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  fontFamily: "Poppins",
                  "& .MuiCheckbox-root": { py: 0.5 },
                }}
                key={type}
                control={
                  <Checkbox
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                    sx={{fontFamily: "Poppins"}}
                  />
                }
                label={type}
              />
            ))}
          </AccordionDetails>
        </Accordion>

        {/* Author filter */}
        {/*  
        <Accordion
          disableGutters
          elevation={0}
          sx={{
            "&:before": { display: "none" },
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600 }}>
              Author
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {allAuthors.map((author) => (
              <FormControlLabel
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  "& .MuiCheckbox-root": { py: 0.5 },
                }}
                key={author}
                control={
                  <Checkbox
                    checked={selectedAuthors.includes(author)}
                    onChange={() => handleAuthorChange(author)}
                  />
                }
                label={`${author} (${authorCounts[normalize(author)]})`}
              />
            ))}
          </AccordionDetails>
        </Accordion>*/}

        {/* Keyword filter */}
        <Accordion
          disableGutters
          elevation={0}
          sx={{
            "&:before": { display: "none" },
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600, fontFamily: "Poppins" }}>
              Keyword
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx = {{fontFamily:'Poppins',}}>
              (Coming soon)
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, pl: { md: 4 } }}>
        {/* Search and Sort */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <TextField
            placeholder="Search all publications"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: { xs: "100%", sm: "300px" } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2">Sort by:</Typography>
            <Select
              size="small"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <FilterListIcon fontSize="small" sx={{ fontFamily: 'Poppins' }} />
                </InputAdornment>
              }
              sx={{ fontFamily: 'Poppins' }}>
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="title">Title</MenuItem>
            </Select>
          </Box>
        </Box>

        {/* Total count and copy button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary" sx = {{fontFamily:'Poppins',}}>
            Showing <strong>{filteredPublications.length}</strong> records
          </Typography>

          {/*<Button
            variant="contained"
            sx={{
              backgroundColor: "#f9d857",
              color: "#000",
              fontWeight: 600,
              "&:hover": { backgroundColor: "#f5cf4f" },
            }}
          >
            + COPY ALL CITATIONS
          </Button>*/}
        </Box>

        {/* Publications List */}
        <Grid container spacing={3}>
          {filteredPublications.map((pub, index) => (
            <Grid item xs={12} key={index}>
              <Card
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  p: 2,
                  boxShadow: "none",
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  {/* Type */}
                  <Typography
                    variant="caption"
                    sx={{
                      display: "inline-block",
                      mb: 0.75,
                      px: 1,
                      py: 0.25,
                      borderRadius: 1,
                      backgroundColor: theme.palette.action.selected,
                      color: theme.palette.text.secondary,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 0.6,
                      fontFamily: "Poppins"
                    }}
                  >
                    {pub.type}
                  </Typography>


                  {/* Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      lineHeight: 1.3,
                      mt: 0.5,
                      mb: 0.75,
                      fontFamily: "Poppins"
                    }}
                  >
                    {pub.title}
                  </Typography>

                  {/* Authors */}
                  <Typography variant="body2" color="text.secondary" sx = {{fontFamily:'Poppins',}}>
                    {pub.author}
                  </Typography>

                  {/* Year / Journal */}
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontStyle: "italic", display: "block", mt: 0.25, fontFamily: "Poppins" }}
                  >
                    {pub.year}
                    {pub.journal && ` · ${pub.journal}`}
                  </Typography>

                  {/* Action */}
                  <Button
                    href={pub.link}
                    target="_blank"
                    size="small"
                    sx={{
                      mt: 1.5,
                      px: 0,
                      fontWeight: 600,
                      fontFamily: "Poppins",
                      textTransform: "none",
                      color: theme.palette.primary.main,
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                  >
                    {pub.medium} →
                  </Button>
                </CardContent>

              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Publications;
