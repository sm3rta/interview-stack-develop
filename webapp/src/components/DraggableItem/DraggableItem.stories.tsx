import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import type { DraggableProvided } from 'react-beautiful-dnd';
import { Order } from '../interfaces';
import DraggableItem from './DraggableItem';

export default {
    title: 'Draggable Item',
    component: DraggableItem,
} as ComponentMeta<typeof DraggableItem>;

const Template: ComponentStory<typeof DraggableItem> = (args) => <DraggableItem {...args} />;

const draggableProvided: DraggableProvided = ({
    innerRef: () => {},
    draggableProps: {
        'data-rbd-draggable-context-id': '1',
        'data-rbd-draggable-id': '1',
    },
    dragHandleProps: null,
}); 

const getArgs = (OrderStatus: string) => ({
    OrderID: 1234,
    CustomerID: 2345,
    ProductID: 3456,
    OrderStatus, 
    draggableProvided,
    removeOrder: (order: Order) => {},
});

export const NotInQA = Template.bind({});
NotInQA.args = getArgs('InProgress');

export const InQA = Template.bind({});
InQA.args = getArgs('QA');