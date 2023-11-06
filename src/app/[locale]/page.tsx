import Prescription from './components/Prescription';
import { getHerbs } from './data/herbs';

export default async function Page() {
  const herbs = await getHerbs();

  return <Prescription herbs={herbs} />;
}
