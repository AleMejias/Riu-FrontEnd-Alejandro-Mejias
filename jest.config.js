module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testRegex: '(/_test_/.*|(\\.|/)(spec))\\.ts?$',
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '@app/(.*)$': '<rootDir>/src/app/$1',
    '@ui/(.*)$': '<rootDir>/src/app/shared/$1'
  }
};
/* module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$",
    },
  },
}; */
// module.exports = {
//     preset: 'jest-preset-angular',
//     setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
//     testRegex: '(/_test_/.*|(\\.|/)(spec))\\.ts?$',
//     testPathIgnorePatterns: ['<rootDir>/node_modules/'],
//     moduleNameMapper: {
//       '@app/(.*)$': '<rootDir>/src/app/$1',
//       '@shared/(.*)$': '<rootDir>/src/app/shared/$1',
//       "@constants/(.*)$": '<rootDir>/src/app/constants/$1',
//       '@auth/(.*)$': '<rootDir>/src/app/auth/$1',
//       '@services/(.*)$': '<rootDir>/src/app/shared/services/$1',
//       '@core/(.*)$': '<rootDir>/src/app/core/$1',
//       "@layout/(.*)$": '<rootDir>/src/app/layout/$1',
//       "@root/(.*)$": '<rootDir>/src/app/root/$1',
//       "@datos/(.*)$": '<rootDir>/src/app/datos/$1',
//       "@metadatos/(.*)$": '<rootDir>/src/app/metadatos/$1',
//       "@elecciones/(.*)$": '<rootDir>/src/app/elecciones/$1',
//       "@usuarios/(.*)$": '<rootDir>/src/app/usuarios/$1',
//       "@portal/(.*)$": '<rootDir>/src/app/portal/$1',
//       "@pipes/(.*)$": '<rootDir>/src/app/shared/pipes/$1',
//       "@components/(.*)$": '<rootDir>/src/app/shared/components/$1',
//       "@models/(.*)$": '<rootDir>/src/app/shared/models/$1',
//       "@helpers/(.*)$": '<rootDir>/src/app/shared/helpers/$1',
//       "@animations/(.*)$": '<rootDir>/src/app/shared/animations/$1',
//       "@interface/(.*)$": '<rootDir>/src/app/shared/interface/$1',
//       "@assets/(.*)$": '<rootDir>/src/assets/$1',
//       "@env/(.*)$": '<rootDir>/src/environments/$1',
//       "@configuraciones/(.*)$": '<rootDir>/src/app/modulos/configuraciones/$1',
  
//       "@autogestion/(.*)$": '<rootDir>/src/app/modulos/autogestion/$1',
  
//       "@autoridades-mesa/(.*)$": '<rootDir>/src/app/modulos/autoridades-mesa/$1',
//       "@lugares-capacitacion/(.*)$": '<rootDir>/src/app/modulos/autoridades-mesa/lugares-capacitacion/$1',
  
//       "@modulos/(.*)$": '<rootDir>/src/app/modulos/$1',
//       "@const/(.*)$": '<rootDir>/src/app/constants/$1',
//       "^app/constants$": "<rootDir>/src/app/constants/index.ts",
//       "@reer/(.*)$": '<rootDir>/src/app/modulos/reer/$1',
//       "@reclamos/(.*)$": '<rootDir>/src/app/modulos/reclamos/$1',
  
//     }
//   };