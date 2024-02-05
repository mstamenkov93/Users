import { Box } from '@mui/material'
import React, { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Box display="flex" justifyContent="space-around" marginTop="20px">{children}</Box>
    )
}
