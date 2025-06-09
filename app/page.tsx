
import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/login');
  // Retornar null ou um componente simples é uma boa prática após redirect,
  // embora o redirect interrompa a execução.
  return null;
}
