import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';

import { Document, firestoreConfig, OptionalId, WithoutId } from 'apps-core';

export const deleteDocument = async (collectionPath: string, documentPath: string, batch?: FirebaseFirestoreTypes.WriteBatch) =>
{
  const documentRef = firestore().collection(collectionPath).doc(documentPath);

  if (batch)
  {
    batch.delete(documentRef);
  }
  else
  {
    await documentRef.delete();
  }
};

export const getDocument = async <DocumentType extends Document>(collectionPath: string, documentPath: string) =>
{
  const snapshot = await firestore()
    .collection<DocumentType>(collectionPath)
    .doc(documentPath)
    .get();

  return fromDocument(snapshot);
};

export const getDocuments = async <DocumentType extends Document>(
  collectionPath: string,
  filter?: FirebaseFirestoreTypes.QueryFilterConstraint | FirebaseFirestoreTypes.QueryCompositeFilterConstraint | string[]
) =>
{
  let query: FirebaseFirestoreTypes.Query<DocumentType> = firestore().collection<DocumentType>(collectionPath);

  if (filter)
  {
    if (Array.isArray(filter))
    {
      if (!filter.length)
      {
        return [];
      }

      query = query.where(firestore.FieldPath.documentId(), 'in', filter);
    }
    else
    {
      query = query.where(filter);
    }
  }

  const snapshot = await query.get();

  return fromDocuments(snapshot.docs);
};

export const setDocument = async <DocumentType extends Document>(
  collectionPath: string,
  document: OptionalId<DocumentType>,
  batch?: FirebaseFirestoreTypes.WriteBatch
) =>
{
  const documentRef = document.id
    ? firestore().collection(collectionPath).doc(document.id)
    : firestore().collection(collectionPath).doc();

  if (batch)
  {
    batch.set(documentRef, await toDocument(document));
  }
  else
  {
    await documentRef.set(await toDocument(document));
  }

  return documentRef.id;
};

export const updateDocument = async <DocumentType extends Document>(
  collectionPath: string,
  documentPath: string,
  document: Partial<DocumentType>,
  batch?: FirebaseFirestoreTypes.WriteBatch
) =>
{
  const documentRef = firestore().collection(collectionPath).doc(documentPath);

  if (batch)
  {
    batch.update(documentRef, await toDocument(document as DocumentType));
  }
  else
  {
    await documentRef.update(await toDocument(document as DocumentType));
  }
};

export const useDocument = <DocumentType extends Document>(collectionPath: string, documentPath?: string) =>
{
  const [ theDocument, setTheDocument ] = useState<DocumentType>();

  useEffect(() =>
  {
    if (!collectionPath || !documentPath)
    {
      setTheDocument(undefined);
      return;
    }

    return firestore()
      .collection<DocumentType>(collectionPath)
      .doc(documentPath)
      .onSnapshot(
        snapshot => fromDocument(snapshot).then(setTheDocument),
        error => onError(`useDocument for ${collectionPath}/${documentPath}`, error)
      );
  }, [ collectionPath, documentPath ]);

  return theDocument;
};

export const useDocuments = <DocumentType extends Document>(collectionPath: string, filter?: FirebaseFirestoreTypes.QueryFilterConstraint | FirebaseFirestoreTypes.QueryCompositeFilterConstraint | string[]) =>
{
  const [ documents, setDocuments ] = useState<DocumentType[]>();

  useEffect(() =>
  {
    if (!collectionPath)
    {
      setDocuments(undefined);
      return;
    }

    if (Array.isArray(filter) && !filter.length)
    {
      setDocuments([]);
      return;
    }

    let query: FirebaseFirestoreTypes.Query<DocumentType> = firestore().collection<DocumentType>(collectionPath);

    if (filter)
    {
      if (Array.isArray(filter))
      {
        query = query.where(firestore.FieldPath.documentId(), 'in', filter);
      }
      else
      {
        query = query.where(filter);
      }
    }

    return query.onSnapshot(
      snapshot => fromDocuments(snapshot.docs).then(setDocuments),
      error => onError(`useDocuments for ${collectionPath}`, error)
    );
  }, [ collectionPath, filter ]);

  return documents;
};

const fromDocument = async <DocumentType extends Document>(snapshot: FirebaseFirestoreTypes.DocumentSnapshot<DocumentType>) =>
{
  const object = snapshot.data();
  if (!object)
  {
    return undefined;
  }

  object.id = snapshot.id;

  await firestoreConfig.transformFromDocument(object);

  return object;
};

const fromDocuments = async <DocumentType extends Document>(snapshots: FirebaseFirestoreTypes.DocumentSnapshot<DocumentType>[]) =>
{
  const preparePromises: Promise<DocumentType | undefined>[] = [];
  for (const snapshot of snapshots)
  {
    preparePromises.push(fromDocument(snapshot));
  }

  return (await Promise.all(preparePromises)).filter(object => !!object) as DocumentType[];
};

export const toDocument = async <DocumentType extends Document>(document: OptionalId<DocumentType>): Promise<WithoutId<DocumentType>> =>
{
  const doc = { ...document };
  delete doc.id;

  await firestoreConfig.transformToDocument(doc);

  return doc;
};

const onError = (operation: string, error: Error) =>
{
  console.error(`Error performing firestore operation ${operation}`);
  console.error(error);
};
