import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import { useUser } from './User';

export default function Cart() {
  const me = useUser();
  if (!me) return null;
  return (
    <CartStyles open>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
      </header>
    </CartStyles>
  );
}
