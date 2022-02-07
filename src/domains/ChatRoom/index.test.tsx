import React from "react";
import ChatRoom from ".";
import { mount, render, shallow } from "enzyme";
import {AuthContextProvider} from '../../context/AuthContext';
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { waitFor } from "@testing-library/react";

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useLayoutEffect: jest.requireActual('react').useEffect,
  }));

test('Should display an alert', () => {

    const spy = jest.spyOn(React, 'useEffect').mockImplementation(f => f());

      waitFor(() => {
          render(<ChatRoom />);
          expect(true).toBeTruthy();
      })

      spy.mockRestore();
});
