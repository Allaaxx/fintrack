import { LogOutIcon } from 'lucide-react';

import { LogoIcon } from '@/assets/images';
import { useAuthContext } from '@/contexts/auth';

import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
const Header = () => {
  const { user, signout } = useAuthContext();
  return (
    <Card>
      <CardContent className="flex items-center justify-between px-8 py-4">
        <div>
          <LogoIcon className="h-8 w-auto text-white" />
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">
                {user.firstName} {user.lastName}{' '}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Meu Perfil</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button
                    variant="ghost"
                    size="small"
                    className="w-full justify-start"
                    onClick={signout}
                  >
                    <LogOutIcon />
                    Sair
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default Header;
