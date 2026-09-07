import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const SignUpPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Criar uma conta</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para criar uma conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input type="text" placeholder="Digite seu nome" />
          </div>
          <div className="space-y-2">
            <Input type="text" placeholder="Digite seu sobrenome" />
          </div>
          <div className="space-y-2">
            <Input type="email" placeholder="Digite seu email" />
          </div>
          <div className="space-y-2">
            <Input type="password" placeholder="Digite sua senha" />
          </div>
          <div className="space-y-2">
            <Input type="password" placeholder="Confirme sua senha novamente" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Criar conta</Button>
        </CardFooter>
      </Card>

      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Já possui uma conta? </p>
        <Button variant="link" asChild>
          <Link to="/signin">Faça login</Link>
        </Button>
      </div>
    </div>
  );
};

export default SignUpPage;
