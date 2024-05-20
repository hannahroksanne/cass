import * as React from 'react';
import { Link as WouterLink } from 'wouter';
import { Link as RadixLink } from '@radix-ui/themes';

const sideBarMain = {
  color: '#ffffff',
  textDecoration: 'none',
  fontWeight: 500,
};

const sideBarSub = {
  color: '#e7e7e7',
  textDecoration: 'none',
  fontWeight: 400,
};

const basic = {
  color: '#e7e7e7',
  textDecoration: 'none',
  fontWeight: 400,
};

const styles = {
  sideBarMain,
  sideBarSub,
  basic,
};

export const Link = (props) => {
  const style = styles[props.styling];
  return <WouterLink as={RadixLink} style={style} {...props} />;
};

Link.defaultProps = {
  styling: 'basic',
};
