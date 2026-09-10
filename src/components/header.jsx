import { ChevronDownIcon, LogOutIcon } from 'lucide-react';

import { LogoIcon } from '@/assets/images';
import { useAuthContext } from '@/contexts/auth';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
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
      <CardContent className="flex items-center justify-between px-8 py-1">
        <div>
          <LogoIcon className="text-primary h-10 w-10" />
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" className="space-x-1 py-5">
                  <Avatar className="h-8 w-8">
                    <AvatarImage />
                    <AvatarFallback>
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm">
                    {user.firstName} {user.lastName}
                  </p>
                  <ChevronDownIcon />
                </Button>
              }
            ></DropdownMenuTrigger>
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
