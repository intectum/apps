import * as _firestore from '@google-cloud/firestore';
import * as admin from 'firebase-admin';

import { Document, firestoreConfig, OptionalId, WithoutId } from 'apps-core';

export const maxInValues = 30;

export const deleteDocument = async (collectionPath: string, documentPath: string, batch?: admin.firestore.WriteBatch) =>
{
  const documentRef = admin.firestore().collection(collectionPath).doc(documentPath);

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
  const snapshot = await admin.firestore()
    .collection(collectionPath)
    .doc(documentPath)
    .get();

  return fromDocument<DocumentType>(snapshot);
};

export const getDocuments = async <DocumentType extends Document>(collectionPath: string, filter?: admin.firestore.Filter | string[]) =>
{
  let query: admin.firestore.Query = admin.firestore().collection(collectionPath);

  if (filter)
  {
    if (Array.isArray(filter))
    {
      if (!filter.length)
      {
        return [];
      }

      // TODO why can't I reference this from firebase-admin?
      query = query.where(_firestore.FieldPath.documentId(), 'in', filter);
    }
    else
    {
      query = query.where(filter);
    }
  }

  const snapshot = await query.get();

  return fromDocuments<DocumentType>(snapshot.docs);
};

export const setDocument = async <DocumentType extends Document>(
  collectionPath: string,
  document: OptionalId<DocumentType>,
  batch?: admin.firestore.WriteBatch
) =>
{
  const documentRef = document.id
    ? admin.firestore().collection(collectionPath).doc(document.id)
    : admin.firestore().collection(collectionPath).doc();

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
  batch?: admin.firestore.WriteBatch
) =>
{
  const documentRef = admin.firestore().collection(collectionPath).doc(documentPath);

  if (batch)
  {
    batch.update(documentRef, await toDocument(document as DocumentType));
  }
  else
  {
    await documentRef.update(await toDocument(document as DocumentType));
  }
};

export const fromDocument = async <DocumentType extends Document>(snapshot: admin.firestore.DocumentSnapshot) =>
{
  const object = snapshot.data();
  if (!object)
  {
    return undefined;
  }

  object.id = snapshot.id;

  await firestoreConfig.transformFromDocument(object);

  return object as DocumentType;
};

const fromDocuments = async <DocumentType extends Document>(snapshots: admin.firestore.DocumentSnapshot[]) =>
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
