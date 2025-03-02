import { Hero } from "@models/heroes.model";

const filterHeroes = ( options: Hero[] , currentInputvalue: string ): Hero[] => {
    let result: Hero[] = [];
    const inputValueWithoutSymbols = removeAccentsAndSymbols( currentInputvalue );
    result = options.filter(( option ) =>   removeAccentsAndSymbols( option.name ).includes( inputValueWithoutSymbols ) /* ||
                                            removeAccentsAndSymbols( option.biography ).includes( inputValueWithoutSymbols ) || 
                                            removeAccentsAndSymbols( option.universe ).includes( inputValueWithoutSymbols ) */
    );


    return result;
}


const removeAccentsAndSymbols = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .toLowerCase()
    .trim();
};

export const InputTextHelpers = {
    filterHeroes,
    removeAccentsAndSymbols
};
