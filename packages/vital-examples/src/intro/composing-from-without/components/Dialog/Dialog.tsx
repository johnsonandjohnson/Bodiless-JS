import React from 'react';
import type { FC, PropsWithChildren } from 'react';
import { as } from '@bodiless/fclasses';
import exampleDialog from './tokens';
import './styles.css';
import type { FancyBorderProps, DialogProps } from './types';

const FancyBorder: FC<PropsWithChildren<FancyBorderProps>> = ({ color, children }) => (
  <div className={`FancyBorder FancyBorder-${color}`}>
    {children}
  </div>
);

export const Dialog: FC<DialogProps> = ({ color, title, message })=> (
  <FancyBorder color={color}>
    <h1 className="Dialog-title">
      {title}
    </h1>
    <p className="Dialog-message">
      {message}
    </p>
  </FancyBorder>
);

// export const WelcomeDialog: FC = () => (
//   <Dialog
//     title="Welcome"
//     message="Thank you for visiting our spacecraft!"
//     color={FancyBorderColor.Blue}
//   />
// );

export const WelcomeDialog = as(exampleDialog.Welcome)(Dialog);
