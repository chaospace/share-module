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
  borderStyle: true,
  borderRadius: {
    alias: 'radius',
    defaultAlias: radius
  },
  borderColor: {
    property: 'borderColor',
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
