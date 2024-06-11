const thickness = {
  s: 1,
  m: 2,
  l: 4
};

const radius = {
  s: 4,
  m: 8,
  l: 16
};

const border = {
  border: true,
  borderWidth: {
    alias: 'thickness',
    defaultAlias: thickness
  },
  btWidth: {
    property: 'borderTopWidth',
    alias: 'thickness',
    defaultAlias: thickness
  },
  bbWith: {
    property: 'borderBottomWidth',
    alias: 'thickness',
    defaultAlias: thickness
  },
  blWidth: {
    property: 'borderLeftWidth',
    alias: 'thickness',
    defaultAlias: thickness
  },
  brWidth: {
    property: 'borderRightWidth',
    alias: 'thickness',
    defaultAlias: thickness
  },
  btRadius: {
    property: ['borderTopLeftRadius', 'borderTopRightRadius'],
    alias: 'radius',
    defaultAlias: radius
  },
  bbRadius: {
    property: ['borderBottomLeftRadius', 'borderBottomRightRadius'],
    alias: 'radius',
    defaultAlias: radius
  },
  borderStyle: true,
  borderRadius: {
    alias: 'radius',
    defaultAlias: radius
  },
  borderColor: {
    property: 'borderColor',
    alias: 'colors'
  },
  btColor: {
    property: 'borderTopColor',
    alias: 'colors'
  },
  blColor: {
    property: 'borderLeftColor',
    alias: 'colors'
  },
  brColor: {
    property: 'borderRightColor',
    alias: 'colors'
  },
  bbColor: {
    property: 'borderBottomColor',
    alias: 'colors'
  },
  outline: true,
  outlineColor: {
    property: 'outlineColor',
    alias: 'colors'
  },
  outlineWidth: {
    alias: 'thickness',
    defaultAlias: thickness
  },
  outlineStyle: true
};

export default border;
