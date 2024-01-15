import { RefObject, useEffect, useState } from 'react';
import { SectionList } from 'react-native';

import { Length, SectionListData, SectionListFlatItem, SectionListItem, SectionListLengths } from './types';

export const toSections = <T>(data: T[], getTitle: (value: T) => string) =>
  data.reduce<SectionListData<T>[]>(
    (previousValue, currentValue, currentIndex) =>
    {
      const title = getTitle(currentValue);

      let section = previousValue.find(theSection => theSection.title === title);
      if (!section)
      {
        section = { title, data: [] };
        previousValue.push(section);
      }

      section.data.push(
        {
          ...currentValue,
          itemCount: data.length,
          itemIndex: currentIndex,
          sectionIndex: previousValue.indexOf(section),
          sectionItemIndex: section.data.length
        }
      );

      return previousValue;
    },
    []
  );

export const toFlat = <T>(data?: SectionListData<T>[]) =>
{
  if (!data?.length)
  {
    return [];
  }

  const itemCount = data[0].data[0].itemCount;
  let rowIndex = 0;

  return data.reduce<SectionListFlatItem<T>[]>((previousValue, currentValue, currentIndex) =>
  {
    const flatData: SectionListFlatItem<T>[] =
    [
      ...previousValue,
      {
        meta:
        {
          itemCount,
          itemIndex: -1,
          flatIndex: rowIndex,
          sectionIndex: currentIndex,
          sectionItemIndex: -1
        }
      },
      ...currentValue.data.map((item, index) =>
        ({
          item,
          meta:
          {
            itemCount,
            itemIndex: item.itemIndex,
            flatIndex: rowIndex + 1 + index,
            sectionIndex: item.sectionIndex,
            sectionItemIndex: item.sectionItemIndex
          }
        })
      ),
      {
        meta:
        {
          itemCount,
          itemIndex: -1,
          flatIndex: rowIndex + 1 + currentValue.data.length,
          sectionIndex: currentIndex,
          sectionItemIndex: currentValue.data.length
        }
      }
    ];

    rowIndex += 1 + currentValue.data.length + 1;

    return flatData;
  }, []);
};

export const getFlatListItemLayout = <T>(itemLength: Length<T>) =>
  (data: ArrayLike<T> | null | undefined, index: number) =>
  {
    if (!data)
    {
      return {
        length: 0,
        offset: 0,
        index: index
      };
    }

    const item = data[index];

    let offset = 0;
    for (let beforeIndex = 0; beforeIndex < data.length; beforeIndex++)
    {
      const itemBefore = data[beforeIndex];
      if (itemBefore === item)
      {
        break;
      }

      offset += getLength(itemBefore, itemLength);
    }

    return {
      length: getLength(item, itemLength),
      offset,
      index: index
    };
  };

export const getSectionListItemLayout = <T>(
  sectionsFlat: SectionListFlatItem<T>[],
  lengths: SectionListLengths<T>
) =>
    (data: SectionListData<T>[] | null, index: number) =>
    {
      const flatItem = sectionsFlat[index];

      let offset = 0;
      for (const flatItemBefore of sectionsFlat)
      {
        if (flatItemBefore === flatItem)
        {
          break;
        }

        offset += getSectionListLength(flatItemBefore, lengths);
      }

      return {
        length: getSectionListLength(flatItem, lengths),
        offset,
        index: index
      };
    };

export const useSectionListInitialScroll = <T>(ref: RefObject<SectionList<SectionListItem<T>, SectionListData<T>>>, sectionsFlat: SectionListFlatItem<T>[], itemIndex?: number) =>
{
  const [ applied, setApplied ] = useState(false);

  useEffect(() =>
  {
    if (applied)
    {
      return;
    }

    setApplied(true);

    if (itemIndex === undefined)
    {
      return;
    }

    for (const flatItem of sectionsFlat)
    {
      if (flatItem.meta.itemIndex === itemIndex)
      {
        ref.current?.scrollToLocation({ sectionIndex: flatItem.meta.sectionIndex, itemIndex: flatItem.meta.sectionItemIndex + 1 });
        break;
      }
    }
  }, [ applied, itemIndex, ref, sectionsFlat ]);
};

const getSectionListLength = <T>(
  item: SectionListFlatItem<T>,
  lengths: SectionListLengths<T>
) =>
{
  if (item.item)
  {
    return getLength(item, lengths.itemLength);
  }

  if (item.meta.sectionItemIndex === -1)
  {
    return getLength(item, lengths.sectionHeaderLength);
  }

  return getLength(item, lengths.sectionFooterLength);
};

const getLength = <T>(value: T, length?: Length<T>) =>
{
  if (!length)
  {
    return 0;
  }

  if (typeof length === 'number')
  {
    return length;
  }

  return length(value);
};
