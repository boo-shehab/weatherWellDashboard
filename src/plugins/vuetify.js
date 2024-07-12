
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    defaultFontFamily: 'Raleway',
    themes: {
      light: {
        dark: false,
        colors: {
          'primary': '#CB5A5A',
          'secondary': '#87A0C4',
          'background': '#FEFBFB',
          'primary-surface': '#F9ECEC',
          'neutral-900': '#191919',
          'orange': '#F58400',
          'yellow': '#F5CE00',
          'red': '#B80000',
        }
      }
    }
  },

})
