import { populateAddress } from '../addresses';
import { Address } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prepareDocumentData = (record: Record<string, any>) =>
{
  for (const key of Object.keys(record))
  {
    if (record[key] === undefined)
    {
      delete record[key];
      continue;
    }

    if (Array.isArray(record[key]))
    {
      for (const element of record[key])
      {
        if (typeof element === 'object')
        {
          prepareDocumentData(element);
        }
      }
    }
    else if (typeof record[key] === 'object')
    {
      prepareDocumentData(record[key]);
    }
  }

  // Address
  if (record.country)
  {
    delete record.display;
    delete record.location;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prepareObject = async (record: Record<string, any>, populateAddresses?: boolean) =>
{
  for (const key of Object.keys(record))
  {
    if (record[key]?.toDate)
    {
      record[key] = record[key].toDate();
    }

    if (Array.isArray(record[key]))
    {
      for (const element of record[key])
      {
        if (typeof element === 'object')
        {
          await prepareObject(element, populateAddresses);
        }
      }
    }
    else if (typeof record[key] === 'object')
    {
      await prepareObject(record[key], populateAddresses);
    }
  }

  // Address
  if (populateAddresses && record.country)
  {
    await populateAddress(record as Address);
  }
};
