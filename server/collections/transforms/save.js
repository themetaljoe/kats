import { Transforms } from './collection';

export default function saveTransform(transform) {
  return Transforms.upsert({ _id: transform._id || '' }, transform).insertedId;
}
