import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
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
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
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
          <Input type="text" placeholder="Digite seu nome" />
          <Input type="text" placeholder="Digite seu sobrenome" />
          <Input type="email" placeholder="Digite seu email" />
          <div className="relative">
            <Input
              type={passwordIsVisible ? 'text' : 'password'}
              placeholder="Digite sua senha"
            />
            <Button
              variant="ghost"
              className="text-muted-foreground absolute top-0 right-0 bottom-0 my-auto h-8 w-8"
              onClick={() => setPasswordIsVisible((prev) => !prev)}
            >
              {passwordIsVisible ? <EyeOffIcon /> : <EyeIcon />}
            </Button>
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
