import React from "react";
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from "./HomePage";
import { INPIPELINE_URL, UPDATE_STATUS_URL } from "../ApiHelper";

export default {
    title: 'Home Page',
    component: HomePage,
    decorators : [(Story) => (<MemoryRouter><Story/></MemoryRouter>)]
} as ComponentMeta<typeof HomePage>;

const Template: ComponentStory<typeof HomePage> = () => <HomePage />;

export const GetDataSuccess = Template.bind({});
GetDataSuccess.parameters = {
    mockData: [
        {
            url: INPIPELINE_URL,
            method: 'GET',
            status: 200,
            response: {
                data: [
                    {
                      "CustomerID": 1,
                      "OrderID": 2,
                      "OrderStatus": "Queued",
                      "ProductID": 1
                    },
                    {
                      "CustomerID": 2,
                      "OrderID": 3,
                      "OrderStatus": "Queued",
                      "ProductID": 1
                    },
                    {
                      "CustomerID": 3,
                      "OrderID": 4,
                      "OrderStatus": "Queued",
                      "ProductID": 1
                    },
                    {
                      "CustomerID": 3,
                      "OrderID": 5,
                      "OrderStatus": "InProgress",
                      "ProductID": 2
                    },
                    {
                      "CustomerID": 4,
                      "OrderID": 6,
                      "OrderStatus": "InProgress",
                      "ProductID": 2
                    },
                    {
                      "CustomerID": 1,
                      "OrderID": 7,
                      "OrderStatus": "InProgress",
                      "ProductID": 3
                    },
                    {
                      "CustomerID": 2,
                      "OrderID": 8,
                      "OrderStatus": "QA",
                      "ProductID": 1
                    }
                ],
                message: ""
            },
        },
        {
            url: UPDATE_STATUS_URL,
            method: 'POST',
            status: 200,
            response: {
                data: {
                    message: 'Success',
                },
            },
        },
    ],
};

export const GetDataSuccessEmpty = Template.bind({});
GetDataSuccessEmpty.parameters = {
    mockData: [
        {
            url: INPIPELINE_URL,
            method: 'GET',
            status: 200,
            response: {
                data: [],
                message: ""
            },
        },
        {
            url: UPDATE_STATUS_URL,
            method: 'POST',
            status: 200,
            response: {
                data: {
                    message: 'Success',
                },
            },
        },
    ],
};

export const GetDataError = Template.bind({});
GetDataError.parameters = {
    mockData: [
        {
            url: INPIPELINE_URL,
            method: 'GET',
            status: 500,
            response: {
                data: [],
                message: "Error"
            }
        },
        {
            url: UPDATE_STATUS_URL,
            method: 'POST',
            status: 200,
            response: {
                data: {
                    message: 'Success',
                },
            },
        },
    ],
};
