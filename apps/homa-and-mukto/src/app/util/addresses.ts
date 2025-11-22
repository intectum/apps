import { Address, AddressComponent } from '../../types';

export const addresses: Address[] = [];

export const getMatchingAddressComponents = (a: AddressComponent[], b: AddressComponent[]) =>
{
  const aReversed = a.slice().reverse();
  const bReversed = b.slice().reverse();

  const count = Math.min(aReversed.length, bReversed.length);
  for (let index = 0; index < count; index++)
  {
    if (aReversed[index].short_name !== bReversed[index].short_name)
    {
      return a.slice(a.length - index);
    }
  }

  return a.length > b.length ? b : a;
};
