import { Navigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/auth';

const HomePage = () => {
  const { user, isInitializing, signout } = useAuthContext();
  if (isInitializing) return null;
  if (!user) {
    return <Navigate to="/signin" />;
  }
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="w-56 text-center">
        <h1>Olá, {user.first_name} </h1>
        <Button onClick={signout} className="w-full">
          Sair
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
