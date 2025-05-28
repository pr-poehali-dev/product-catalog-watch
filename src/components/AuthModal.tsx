import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => boolean;
}

const AuthModal = ({ isOpen, onClose, onLogin }: AuthModalProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(username, password);
    if (!success) {
      setError("Неверные данные для входа");
    } else {
      setUsername("");
      setPassword("");
      setError("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Вход в систему</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Имя пользователя</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите имя пользователя"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="text-xs text-gray-500">Пароль админа: admin123</div>
          <Button type="submit" className="w-full">
            Войти
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
