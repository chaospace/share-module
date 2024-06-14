const grid = {
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridArea: true,
  gridColumnGap: {
    property: 'gridColumnGap',
    alias: 'space'
  },
  gridRowGap: {
    property: 'gridRowGap',
    alias: 'space'
  },
  girdTemplateAreas: true,
  gridAutoRows: true,
  gridAutoColumns: true,
  placeItems: true, // align-items, justify-items 단축형
  placeContent: true, // align-content, justify-content 단축형
  placeSelf: true // align-self, justify-self 단축형
};

export default grid;
