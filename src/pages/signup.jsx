import { Link } from 'react-router';

import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
          <Input type="text" placeholder="Digite seu nome" />
          <Input type="text" placeholder="Digite seu sobrenome" />
          <Input type="email" placeholder="Digite seu email" />
          <PasswordInput />
          <PasswordInput placeholder="Digite sua senha novamente" />
          <div className="flex items-start space-x-2">
            <Checkbox id="terms" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-muted-foreground text-xs opacity-75"
              >
                Ao clicar em "Criar conta", você aceita{' '}
                <a href="#" className="text-white underline">
                  nosso termo de uso e política de privacidade.
                </a>
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Criar conta</Button>
        </CardFooter>
      </Card>

      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Já possui uma conta? </p>
        <Button variant="link">
          <Link to="/signin">Faça login</Link>
        </Button>
      </div>
    </div>
  );
};

export default SignUpPage;
