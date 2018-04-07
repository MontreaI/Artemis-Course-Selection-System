import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
    listItem: {
      secondaryTextColor: 'black'
    },
});

export default muiTheme;