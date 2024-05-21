const margin = {
    m: {
        property: 'margin',
        alias: 'space'
    },
    mx: {
        property: ['marginLeft', 'marginRight'],
        alias: 'space'
    },
    my: {
        property: ['marginTop', 'marginBottom'],
        alias: 'space'
    },
    ml: {
        property: ['marginLeft'],
        alias: 'space'
    },
    mr: {
        property: ['marginRight'],
        alias: 'space'
    },
    mt: {
        property: ['marginTop'],
        alias: 'space'
    },
    mb: {
        property: ['marginBottom'],
        alias: 'space'
    }
}


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
}
const space = {
    ...margin,
    ...padding
}

export default space;