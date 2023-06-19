import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

export default {
    title: 'Header',
    component: Header,
    decorators : [(Story) => (<MemoryRouter><Story/></MemoryRouter>)]
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const OneLink = Template.bind({});
OneLink.args = { links: [{ label: 'test', url: '/test/' }] };

export const TwoLinks = Template.bind({});
TwoLinks.args = {
    links: [{ label: 'test', url: '/test/' }, { label: 'test1', url: '/test1/' }]
};
