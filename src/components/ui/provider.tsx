'use client';

import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  type ThemeConfig,
} from '@chakra-ui/react';
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';

const config: ThemeConfig = {
  initialColorMode: 'light', // or 'system' if you want to match OS
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
