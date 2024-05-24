import { marginInterpreter } from '@/util';

const margin = {
  m: {
    property: 'margin',
    alias: 'space',
    interpreter: marginInterpreter
  },
  mx: {
    property: ['marginLeft', 'marginRight'],
    alias: 'space',
    interpreter: marginInterpreter
  },
  my: {
    property: ['marginTop', 'marginBottom'],
    alias: 'space',
    interpreter: marginInterpreter
  },
  ml: {
    property: ['marginLeft'],
    alias: 'space',
    interpreter: marginInterpreter
  },
  mr: {
    property: ['marginRight'],
    alias: 'space',
    interpreter: marginInterpreter
  },
  mt: {
    property: ['marginTop'],
    alias: 'space',
    interpreter: marginInterpreter
  },
  mb: {
    property: ['marginBottom'],
    alias: 'space',
    interpreter: marginInterpreter
  }
};

const padding = {
  p: {
    property: 'padding',
    alias: 'space'
  },
  px: {
    property: ['paddingLeft', 'paddingRight'],
    alias: 'space'
  },
  py: {
    property: ['paddingTop', 'paddingBottom'],
    alias: 'space'
  },
  pl: {
    property: ['paddingLeft'],
    alias: 'space'
  },
  pr: {
    property: ['paddingRight'],
    alias: 'space'
  },
  pt: {
    property: ['paddingTop'],
    alias: 'space'
  },
  pb: {
    property: ['paddingBottom'],
    alias: 'space'
  }
};
const space = {
  ...margin,
  ...padding
};

export default space;
