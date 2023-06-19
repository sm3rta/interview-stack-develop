import React from 'react';
import { ComponentMeta } from '@storybook/react';
import MainIcon from './MainIcon';

export default {
    title: 'MainIcon',
    component: MainIcon,
} as ComponentMeta<typeof MainIcon>;

export const mainIcon = () => <MainIcon />;