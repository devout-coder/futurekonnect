import React from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";

interface StatCardProps {
  iconSrc: string;
  label: string;
  value: string;
  showArrow?: boolean;
  iconWidth?: number;
  iconHeight?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  iconSrc,
  label,
  value,
  showArrow = true,
  iconWidth = 32,
  iconHeight = 32,
}) => {
  return (
    <Card
      sx={{
        backgroundColor: "#4984B5",
        color: "#fff",
        borderRadius: 2,
        height: "115px",
        display: "inline-block",
        width: "auto",
        minWidth: "200px"
      }}
    >
      <CardContent sx={{ height: "100%", padding: "16px 25px" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: showArrow ? "auto 1fr auto" : "auto 1fr",
            alignItems: "center",
            gap: 2,
            height: "100%",
          }}
        >
          <Box>
            <Image
              src={iconSrc}
              alt={`${label} icon`}
              width={iconWidth}
              height={iconHeight}
              style={{ objectFit: "contain" }}
            />
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "24px",
                letterSpacing: "0px",
                textAlign: "center",
                verticalAlign: "bottom",
                color: "#EAEAEA",
              }}
            >
              {label}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: "28px",
                lineHeight: "24px",
                letterSpacing: "0px",
                textAlign: "center",
                color: "#FFFFFF",
              }}
            >
              {value}
            </Typography>
          </Box>
          {showArrow && (
            <Box>
              <IconButton sx={{ padding: "0 0 10 0" }}>
                <ArrowForwardIosIcon sx={{ color: "#fff", fontSize: "20px" }} />
              </IconButton>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
