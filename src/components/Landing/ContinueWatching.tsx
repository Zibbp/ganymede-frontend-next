import { Container, createStyles } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useApi } from "../../hooks/useApi";
import GanymedeLoader from "../Utils/GanymedeLoader";
import { VodCard } from "../Vod/Card";

const useStyles = createStyles((theme) => ({
  vodSection: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
    // small screen wrap
    [theme.fn.smallerThan("lg")]: {
      flexDirection: "column",
    },
  },
  vodItem: {
    margin: theme.spacing.md,
    width: "640px",
    [theme.fn.smallerThan("lg")]: {
      width: "100%",
    },
  },
}));

const LandingContinueWatching = () => {
  const { classes } = useStyles();
  const { isLoading, error, data } = useQuery({
    queryKey: ["landing-continue-watching"],
    queryFn: async () =>
      useApi(
        {
          method: "GET",
          url: "/api/v1/playback/last?limit=4",
          withCredentials: true,
        },
        false
      ).then((res) => {
        return res?.data;
      }),
  });

  if (error) return <div>failed to load</div>;
  if (isLoading) return <GanymedeLoader />;

  return (
    <div>
      <Container size="2xl">
        <div className={classes.vodSection}>
          {data?.data?.map((item: any) => (
            <div className={classes.vodItem} key={item.vod.id}>
              <VodCard vod={item.vod} playback={data?.playback}></VodCard>
            </div>
          ))}
          {[...Array(4 - data?.data?.length)].map((_, index) => (
            <div className={classes.vodItem} key={index} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default LandingContinueWatching;
