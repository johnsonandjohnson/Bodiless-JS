import React from 'react';
import GitHubButton from 'react-github-btn';

export const GitStar = () => (
  <GitHubButton
    href="https://github.com/johnsonandjohnson/Bodiless-JS"
    data-size="large"
    data-show-count="true"
    aria-label="Star johnsonandjohnson/Bodiless-JS on GitHub"
  >
    Star

  </GitHubButton>
);

export const GitDiscuss = () => (

  <GitHubButton
    href="https://github.com/johnsonandjohnson/Bodiless-JS/discussions"
    data-size="large"
    aria-label="Discuss johnsonandjohnson/Bodiless-JS on GitHub"
  >
    Discuss

  </GitHubButton>
);

export const GitButtons = () => (
  <div>
    <GitStar />
    <span className="p-2" />
    <GitDiscuss />
  </div>
);
