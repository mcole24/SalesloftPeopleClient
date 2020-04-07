import React from 'react'
import styled from 'styled-components'

import { ConnectedNavBar } from '../containers/ConnectedNavBar'
import { Intro } from './Intro'
import { PeopleView } from './PeopleView';
import { CharacterCountView } from "./CharacterCountView";
import { DuplicateView } from "./DuplicateView";

const Page = styled.div`
  display: grid;
  grid-template 46px 1fr / 1fr;
  height: 100%;
  width: 100%;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const LandingPage = () => (
  <Page>
    <ConnectedNavBar />
    <FlexContainer>
      <PeopleView/>
      <CharacterCountView/>
      <DuplicateView/>
    </FlexContainer>
  </Page>
);
