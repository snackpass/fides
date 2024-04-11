import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Stack } from "@fidesui/react";

const PrivacyPolicy: NextPage = () => {
  return (
    <main data-testid="home">
      <Stack align="center" py={["6", "16"]} px={5} spacing={14}>
        <iframe
          src="https://legal.snackpass.co/snackpass-privacy-policy"
          title="Snackpass Privacy Policy"
        />
      </Stack>
    </main>
  );
};

export default PrivacyPolicy;
