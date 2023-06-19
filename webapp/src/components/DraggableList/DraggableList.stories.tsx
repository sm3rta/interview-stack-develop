import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DragDropContext } from 'react-beautiful-dnd';
import DraggableList from './DraggableList';
import { Order } from '../interfaces';

export default {
    title: 'Draggable List',
    component: DraggableList,
} as ComponentMeta<typeof DraggableList>;

const Template: ComponentStory<typeof DraggableList> = (args) => (
    <DragDropContext onDragEnd={() => {}}>
        <DraggableList {...args} />
    </DragDropContext>
);

const getArgs = (OrderStatus: string) => ({
    ID: '12345',
    listTitle: 'Test List',
    removeOrder: (order: Order) => {},
    items: [
        { OrderID: 1234, CustomerID: 1234, ProductID: 123456, OrderStatus },
        { OrderID: 1235, CustomerID: 1235, ProductID: 123456, OrderStatus },
        { OrderID: 1236, CustomerID: 1236, ProductID: 123456, OrderStatus },
    ],
});

export const NotInQA = Template.bind({});
NotInQA.args = getArgs('InProgress');

export const InQA = Template.bind({});
InQA.args = getArgs('QA');