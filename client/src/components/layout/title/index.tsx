import React from "react";
import { useRouterContext, TitleProps } from "@refinedev/core";
import { Button } from "@mui/material";

import { logo, martech3_logo } from "assets";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const { Link } = useRouterContext();

    return (
        <Button fullWidth variant="text" disableRipple>
            <Link to="/">
                {collapsed ? (
                    <img src={logo} alt="martech3_logo" width="28px" />
                ) : (
                    <img src={martech3_logo} alt="Refine" width="140px" />
                )}
            </Link>
        </Button>
    );
};
