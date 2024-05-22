import GlobalStyle from "@/styles/globalStyle";
import appTheme from "@/styles/theme";
import React from "react";
import { ThemeProvider } from "styled-components";

const StoryDecorator = (Story: any) => (
    <>
        <GlobalStyle />
        <div style={ { padding: "2rem" } }>
            <ThemeProvider theme={ appTheme } >
                <Story />
            </ThemeProvider>
        </div>
    </>
);

export default StoryDecorator;