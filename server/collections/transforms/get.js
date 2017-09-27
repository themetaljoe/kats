import { Transforms } from './collection';

export default function getTransforms() {
  return Transforms.find().fetch();
}
