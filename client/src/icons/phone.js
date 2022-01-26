import { createSvgIcon } from '@mui/material/utils';

export const Phone = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 2 22 28"
        fill="currentColor"
    >
        <path
            d="M 18 14
            v 6
            a 2 2 0 0 1 -2 2
            H 6
            a 2 2 0 0 1 -2 -2
            V 10
            a 2 2 0 0 1 2 -2
            H 12"
        />
        <line x1="12" y1="14" x2="20" y2="6" />
        <polyline points="16 5.5, 20 5.5, 20 9.5" />
    </svg>,
    'Phone'
);
