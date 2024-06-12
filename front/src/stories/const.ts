const variantOption = ['default', 'info', 'primary', 'success', 'warning', 'danger'];

const variantArgTypes = {
  variant: {
    options: variantOption,
    control: { type: 'select' },
    description: '컬러 variant'
  },
  accentVariant: {
    options: variantOption,
    control: { type: 'select' },
    description: '컬러 variant'
  }
};

export { variantArgTypes, variantOption };
