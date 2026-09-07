import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { Input } from './ui/input';
const PasswordInput = ({ placeholder = 'Digite sua senha' }) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  return (
    <div className="relative">
      <Input
        type={passwordIsVisible ? 'text' : 'password'}
        placeholder={placeholder}
      />
      <Button
        variant="ghost"
        className="text-muted-foreground absolute top-0 right-0 bottom-0 my-auto h-8 w-8"
        onClick={() => setPasswordIsVisible((prev) => !prev)}
      >
        {passwordIsVisible ? <EyeOffIcon /> : <EyeIcon />}
      </Button>
    </div>
  );
};

export default PasswordInput;
