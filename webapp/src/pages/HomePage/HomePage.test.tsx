import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { INPIPELINE_URL } from "../ApiHelper";
import { render, screen, waitFor} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from "./HomePage";

describe("HomePage", () => {
    it("shouldDisplayLoadingSpinner", () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );
        expect(screen.getByTestId(`loading-spinner-container`)).toBeInTheDocument();
    });
    it("shouldDisplayPipelineContainer", async() => {
        // set up mock for axios.get
        const response = {
            data: [
                {
                  "CustomerID": 1,
                  "OrderID": 2,
                  "OrderStatus": "Queued",
                  "ProductID": 1
                },
            ],
            message: ""
        };
        const server = setupServer(
          rest.get(INPIPELINE_URL, (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(response));
          })
        );
        server.listen();
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByTestId(`pipeline-container`)).toBeInTheDocument();
        });
        server.close();
    });
    it("shouldDisplayErrorMessage", async() => {
        // set up mock for axios.get
        const response = {
            data: [],
            message: "Error"
        };
        const server = setupServer(
          rest.get(INPIPELINE_URL, (req, res, ctx) => {
            return res(ctx.status(500), ctx.json(response));
          })
        );
        server.listen();
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );
        
        await waitFor(() => {
            expect(screen.getByTestId(`error-container`)).toBeInTheDocument();
        });
        server.close();
    });
});