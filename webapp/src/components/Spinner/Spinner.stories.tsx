import React from 'react';
import { ComponentMeta } from '@storybook/react';
import Spinner from './Spinner';

export default {
    title: 'Spinner',
    component: Spinner,
} as ComponentMeta<typeof Spinner>;

export const spinner = () => <Spinner />;