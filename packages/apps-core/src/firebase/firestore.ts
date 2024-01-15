
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformFromDocument = async (record: Record<string, any>) =>
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
          await transformFromDocument(element);
        }
      }
    }
    else if (typeof record[key] === 'object')
    {
      await transformFromDocument(record[key]);
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformToDocument = async (record: Record<string, any>) =>
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
          await transformToDocument(element);
        }
      }
    }
    else if (typeof record[key] === 'object')
    {
      await transformToDocument(record[key]);
    }
  }
};

export const firestoreConfig =
{
  transformFromDocument,
  transformToDocument
};
