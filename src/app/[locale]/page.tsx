import Link from 'next/link';

import PatientForm from './components/PatientForm';
import Prescription from './components/Prescription';
import { getHerbs } from './data/herbs';

export default async function Page() {
  // const herbs = await getHerbs();

  // return <Prescription herbs={herbs} />;
  return (
    <>
      <Link href="/about">About</Link>
      <PatientForm />
    </>
  );
}
